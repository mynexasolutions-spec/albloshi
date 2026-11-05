// Post-build static prerender: renders each public route in headless Chrome and saves the
// resulting HTML, so crawlers (and no-JS clients) get real page text, <title>, meta and canonical.
//
// FAIL-OPEN BY DESIGN: if Chrome / the optional packages are missing or anything errors, this
// script logs a warning and exits 0 - the normal client-side-rendered site is still deployed.
// Set SKIP_PRERENDER=1 to disable. Set CHROME_PATH to use a local Chrome/Edge (Windows/macOS).
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// Keep in sync with api/sitemap.js. Admin pages are intentionally NOT prerendered.
const ROUTES = [
  '/', '/about', '/contact', '/blog',
  '/intelligent-chemicals', '/tellabs-chemicals', '/industrial-services',
  '/food-services', '/rice-products', '/oil-products', '/manpower-supply',
  '/privacy-policy', '/terms',
  '/lp/chemicals', '/lp/food', '/lp/industrial', '/lp/manpower',
  '/lp/rice', '/lp/palmoil', '/lp/watertreatment',
];
const MAX_POSTS = 200;
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY) || 4;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

const log = (...a) => console.log('[prerender]', ...a);

function loadEnv() {
  try { process.loadEnvFile?.(path.join(root, '.env')); } catch { /* no .env (CI): env is already set */ }
}

async function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] };
  }
  if (process.platform === 'linux') {
    try {
      const { default: chromium } = await import('@sparticuz/chromium');
      return { executablePath: await chromium.executablePath(), args: chromium.args, headless: 'shell' };
    } catch (e) { log('bundled chromium unavailable:', e.message); }
  }
  const local = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].find(existsSync);
  return local ? { executablePath: local, args: ['--no-sandbox'] } : null;
}

async function blogSlugs() {
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return [];
  try {
    const r = await fetch(`${url}/rest/v1/blogs?select=slug&status=eq.published&order=published_at.desc&limit=${MAX_POSTS}`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
      signal: AbortSignal.timeout(8000),
    });
    const rows = r.ok ? await r.json() : [];
    return rows.map(p => p.slug).filter(s => typeof s === 'string' && /^[\w-]+$/.test(s));
  } catch { return []; }
}

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = path.join(dist, urlPath);
      if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
      const isFile = await stat(file).then(s => s.isFile(), () => false);
      if (!isFile) file = path.join(dist, 'spa-shell.html'); // SPA fallback
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' }).end(body);
    } catch { res.writeHead(500).end(); }
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function main() {
  if (process.env.SKIP_PRERENDER) return log('skipped (SKIP_PRERENDER set)');
  if (!existsSync(path.join(dist, 'spa-shell.html'))) return log('dist/spa-shell.html missing - run `vite build` first; skipping');
  loadEnv();

  const chrome = await findChrome();
  if (!chrome) return log('no Chrome found - skipping prerender (site still works as a normal SPA)');

  let puppeteer;
  try { puppeteer = (await import('puppeteer-core')).default; }
  catch (e) { return log('puppeteer-core not installed - skipping:', e.message); }

  const routes = [...ROUTES, ...(await blogSlugs()).map(s => `/blog/${s}`)];
  const server = await startServer();
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({
    headless: chrome.headless ?? true,
    executablePath: chrome.executablePath,
    args: [...(chrome.args || []), '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'],
  });
  let done = 0;
  let retrying = false;
  const failed = [];
  const queue = [...routes];
  // Render several pages at once (CPU-bound on the build machine, so keep it modest).
  const worker = async () => {
    for (let route = queue.shift(); route; route = queue.shift()) {
      const page = await browser.newPage();
      try {
        // Background tabs get timers / requestAnimationFrame paused by Chrome, and Helmet flushes <head> in rAF,
        // so make every page believe it is focused and visible.
        const cdp = await page.createCDPSession();
        await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true }).catch(() => {});
        await page.setRequestInterception(true);
        page.on('request', r => (['image', 'font', 'media'].includes(r.resourceType()) ? r.abort() : r.continue()));
        await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.waitForSelector('h1', { timeout: 10000 });
        await page.waitForSelector('link[rel="canonical"]', { timeout: 15000 }); // Helmet has flushed <head>
        await new Promise(r => setTimeout(r, 300));
        let html = await page.content();
        // /async-css.js flipped media to "all" in the live DOM; restore it so the saved HTML stays non-blocking
        html = html.replace(/<link[^>]*data-async-css[^>]*>/g, tag => tag.replace(/media="all"/, 'media="print"'));
        // same reason for the icon font flag: the browser sets it again once the icon CSS has loaded
        html = html.replace(/<html[^>]*>/, tag => tag.replace(/\sclass="([^"]*)"/, (m, cls) => {
          const keep = cls.split(/\s+/).filter(c => c && c !== 'icons-ready' && c !== 'bg-ready' && c !== 'no-cv');
          return keep.length ? ` class="${keep.join(' ')}"` : '';
        }));
        // Card photos below the fold are re-applied by React after startup; keep them out of the first-paint HTML
        html = html.replace(/<div[^>]*img-bento[^>]*>/g, tag => tag.replace(/\sstyle="[^"]*background-image[^"]*"/, ''));
        if (!/<h1[\s>]/.test(html) || !html.includes('rel="canonical"')) throw new Error('rendered page looks incomplete');
        const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
        await mkdir(path.dirname(out), { recursive: true });
        await writeFile(out, '<!DOCTYPE html>' + html.replace(/^<!DOCTYPE html>/i, ''));
        done++;
      } catch (e) {
        if (!retrying) failed.push(route); // one calm sequential retry below
        else log(`skipped ${route}:`, e.message); // that route simply stays client-rendered
      } finally {
        await page.close().catch(() => {});
      }
    }
  };
  try {
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, routes.length) }, worker));
    if (failed.length) {
      log(`retrying ${failed.length} route(s) one at a time`);
      retrying = true;
      queue.push(...failed);
      await worker();
    }
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
  log(`prerendered ${done}/${routes.length} routes`);
}

main()
  .catch(e => { console.warn('[prerender] failed, continuing without it:', e?.message); })
  .finally(() => process.exit(0));

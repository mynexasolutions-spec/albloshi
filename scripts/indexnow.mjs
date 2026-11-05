// Tells Bing, Yandex and other IndexNow search engines which URLs are new or changed.
// (Google does not support IndexNow: use Search Console + the sitemap for Google.)
//
// Run it AFTER a deploy, once https://www.albloshi.co/<key>.txt is live:
//   npm run indexnow            -> dry run: lists the URLs it WOULD send, sends nothing
//   npm run indexnow -- --submit -> actually submits them to api.indexnow.org
//
// URLs come from the live sitemap (/sitemap.xml), so new blog posts are included automatically.
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.albloshi.co';
const SITE = `https://${HOST}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// The key is the name of the 32-hex .txt file in /public (the file's content is the same key).
const keyFile = readdirSync(path.join(root, 'public')).find(f => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) { console.error('No IndexNow key file found in /public (expected <32 hex chars>.txt).'); process.exit(1); }
const KEY = keyFile.replace('.txt', '');
const keyLocation = `${SITE}/${keyFile}`;
const submit = process.argv.includes('--submit');

async function main() {
  // 1. The key file must be publicly readable, otherwise IndexNow rejects the submission.
  const kr = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) }).catch(() => null);
  const keyBody = kr && kr.ok ? (await kr.text()).trim() : '';
  if (keyBody !== KEY) {
    console.error(`Key file is not live yet at ${keyLocation} (deploy first). Nothing was sent.`);
    process.exitCode = 1;
    return;
  }

  // 2. URLs from the live sitemap (only our own host, https, no duplicates).
  const sr = await fetch(`${SITE}/sitemap.xml`, { signal: AbortSignal.timeout(15000) }).catch(() => null);
  const xml = sr && sr.ok ? await sr.text() : '';
  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim()))]
    .filter(u => u.startsWith(`${SITE}/`) || u === SITE);
  if (!urls.length) {
    console.error('No URLs found in the live sitemap (is /sitemap.xml deployed?). Nothing was sent.');
    process.exitCode = 1;
    return;
  }

  console.log(`${urls.length} URL(s) from the sitemap:`);
  urls.forEach(u => console.log('  ' + u));
  if (!submit) { console.log('\nDry run only. Re-run with  npm run indexnow -- --submit  to send them.'); return; }

  // 3. Submit (one request, max 10,000 URLs per the IndexNow protocol).
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: urls.slice(0, 10000) }),
    signal: AbortSignal.timeout(20000),
  });
  console.log(`\nIndexNow response: HTTP ${res.status} (200/202 = accepted, 422/403 = key or URL problem)`);
  if (!(res.status === 200 || res.status === 202)) process.exitCode = 1;
}

main().catch(e => { console.error('IndexNow failed:', e.message); process.exitCode = 1; });

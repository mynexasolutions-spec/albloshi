import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';

// DEV ONLY: serves the /api/*.js serverless functions from `npm run dev`, so forms, the CAPTCHA and
// uploads work locally without the Vercel CLI. Production (Vercel) runs the same files natively.
function apiDev() {
  return {
    name: 'api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv('development', process.cwd(), '');
      for (const [k, v] of Object.entries(env)) if (process.env[k] === undefined) process.env[k] = v;

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const m = /^\/api\/([a-z0-9-]+)$/i.exec(url.pathname);
        if (!m || !existsSync(`api/${m[1]}.js`)) return next();
        // The dev API runs with your real .env (incl. service-role key): refuse requests that come from
        // another website open in your browser (cross-site), only same-origin / direct calls are served.
        const origin = req.headers.origin;
        if ((origin && new URL(origin).host !== req.headers.host) || req.headers['sec-fetch-site'] === 'cross-site') {
          res.statusCode = 403;
          return res.end('forbidden');
        }
        try {
          const mod = await server.ssrLoadModule(`/api/${m[1]}.js`);
          let raw = '';
          for await (const chunk of req) raw += chunk;
          try { req.body = raw ? JSON.parse(raw) : undefined; } catch { req.body = raw; }
          req.query = Object.fromEntries(url.searchParams);
          res.status = (c) => { res.statusCode = c; return res; };
          res.json = (b) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(b)); return res; };
          res.send = (b) => { res.end(b); return res; };
          await mod.default(req, res);
        } catch (e) {
          console.error('[api-dev]', e);
          res.statusCode = 500;
          res.end('api error');
        }
      });
    },
  };
}

let spaShellOutDir = 'dist';

export default defineConfig({
  plugins: [
    react(),
    apiDev(),
    {
      // Untouched SPA shell: unknown routes are rewritten to this (not to the prerendered home page).
      name: 'spa-shell',
      apply: 'build',
      configResolved(config) { spaShellOutDir = config.build.outDir; },
      closeBundle() { copyFileSync(`${spaShellOutDir}/index.html`, `${spaShellOutDir}/spa-shell.html`); },
    },
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

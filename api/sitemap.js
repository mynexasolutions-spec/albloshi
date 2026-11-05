// Dynamic sitemap.xml (rewritten from /sitemap.xml in vercel.json).
// Static pages + every published blog post, so new posts are discoverable without a redeploy.
const SITE = 'https://www.albloshi.co';

const STATIC_PAGES = [
  ['/', '1.0'],
  ['/about', '0.8'],
  ['/contact', '0.8'],
  ['/blog', '0.8'],
  ['/intelligent-chemicals', '0.9'],
  ['/tellabs-chemicals', '0.9'],
  ['/industrial-services', '0.9'],
  ['/food-services', '0.9'],
  ['/rice-products', '0.7'],
  ['/oil-products', '0.7'],
  ['/manpower-supply', '0.9'],
  ['/privacy-policy', '0.3'],
  ['/terms', '0.3'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

async function fetchPosts() {
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return [];
  try {
    const r = await fetch(`${url}/rest/v1/blogs?select=slug,published_at,created_at&status=eq.published&order=published_at.desc&limit=1000`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return [];
    const rows = await r.json();
    return Array.isArray(rows) ? rows.filter(p => typeof p.slug === 'string' && /^[\w-]+$/.test(p.slug)) : [];
  } catch (err) {
    console.error('sitemap: could not load blog posts:', err?.message);
    return []; // still serve the static pages
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const posts = await fetchPosts();
  const urls = [
    ...STATIC_PAGES.map(([path, priority]) => `  <url><loc>${esc(SITE + path)}</loc><priority>${priority}</priority></url>`),
    ...posts.map(p => {
      const d = p.published_at || p.created_at;
      const lastmod = d && !Number.isNaN(Date.parse(d)) ? `<lastmod>${new Date(d).toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${esc(`${SITE}/blog/${p.slug}`)}</loc>${lastmod}<priority>0.6</priority></url>`;
    }),
  ];
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
}

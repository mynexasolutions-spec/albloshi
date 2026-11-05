// Links that come from the database (admin-editable CTAs, website field, ...) must never be able to
// run script via a `javascript:` / `data:` URL, or redirect via `/\evil.com`-style tricks.
// Only relative paths, hashes, http(s), mailto and tel pass.
const SAFE = /^(\/(?![/\\])|#|https?:\/\/|mailto:|tel:)/i;

export function safeUrl(url, fallback = '/') {
  const v = typeof url === 'string' ? url.trim() : '';
  return SAFE.test(v) && !v.includes('\\') && !/[\u0000-\u001f]/.test(v) ? v : fallback;
}

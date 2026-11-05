// Cloudinary delivery optimisation: serves a right-sized, modern-format (avif/webp via f_auto),
// auto-quality version instead of the multi-MB original. Non-Cloudinary URLs pass through untouched.
const CLOUDINARY = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/;
const HAS_TRANSFORM = /^[a-z]{1,4}_[^/,]+(,[a-z]{1,4}_[^/,]+)*\//; // e.g. "f_auto,q_auto/" - version "v123/" does not match

export function cdn(url, width) {
  if (typeof url !== 'string') return url;
  const m = CLOUDINARY.exec(url);
  if (!m || HAS_TRANSFORM.test(m[2])) return url;
  const size = width ? `,c_limit,w_${width}` : '';
  return `${m[1]}f_auto,q_auto${size}/${m[2]}`;
}

// Same, for CSS background-image url(...) values.
export const cdnBg = (url, width) => cdn(url, width);

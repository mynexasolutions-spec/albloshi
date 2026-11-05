// Vercel serverless function: issues a short-lived, signed Cloudinary upload
// signature to authenticated admins only. Replaces the old unsigned upload
// preset (which anyone could abuse because it was inlined in the public bundle).
//
// Required server-side env vars (NEVER prefix with VITE_):
//   CLOUDINARY_API_SECRET  (+ CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME)
//   or the single CLOUDINARY_URL=cloudinary://key:secret@cloud_name
//   SUPABASE_URL / SUPABASE_ANON_KEY (falls back to the VITE_ ones, which are public by design)
//   ADMIN_EMAILS (optional, comma-separated) - if set, only these accounts may upload.
import { createHash } from 'node:crypto';

// Only these folders can be written to. Must match the FOLDER constants in src/pages/admin/*.
const ALLOWED_FOLDERS = new Set([
  'albloshi/blogs',
  'albloshi/about',
  'albloshi/chemicals',
  'albloshi/contact',
  'albloshi/food',
  'albloshi/home',
  'albloshi/industrial',
  'albloshi/manpower',
  'albloshi/tellabs',
  'albloshi/team',
]);

// Enforced by Cloudinary because it is part of the signed parameters. SVG is deliberately excluded.
const ALLOWED_FORMATS = 'jpg,jpeg,png,webp,gif,avif';

function cloudinaryCreds() {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;

  if ((!apiKey || !apiSecret || !cloudName) && process.env.CLOUDINARY_URL) {
    const m = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(process.env.CLOUDINARY_URL);
    if (m) {
      apiKey = apiKey || m[1];
      apiSecret = apiSecret || m[2];
      cloudName = cloudName || m[3];
    }
  }
  return apiKey && apiSecret && cloudName ? { cloudName, apiKey, apiSecret } : null;
}

// Validates the Supabase access token by asking Supabase Auth who it belongs to.
async function getAuthedUser(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const res = await fetch(`${url.replace(/\/$/, '')}/auth/v1/user`, {
    headers: { apikey: anon, Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const user = await res.json();
  return user?.id ? user : null;
}

// Asks the database whether this user is in admin_users (public.is_admin(), see supabase/admin_only_policies.sql),
// using the USER's own token so the answer cannot be forged. true / false = definitive; null = function not installed yet.
async function isDbAdmin(req) {
  const token = (req.headers.authorization || '').slice(7).trim();
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  try {
    const r = await fetch(`${url}/rest/v1/rpc/is_admin`, {
      method: 'POST',
      headers: { apikey: anon, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    return (await r.json()) === true;
  } catch { return null; }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getAuthedUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const admins = (process.env.ADMIN_EMAILS || '')
      .split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (admins.length) {
      if (!admins.includes(String(user.email || '').toLowerCase())) return res.status(403).json({ error: 'Forbidden' });
    } else {
      // No email allow-list: require membership of admin_users once supabase/admin_only_policies.sql has been run.
      // Fails CLOSED: a self-registered Supabase account must never get an upload signature.
      const dbAdmin = await isDbAdmin(req);
      if (dbAdmin !== true) {
        if (dbAdmin === null) console.error('cloudinary-sign: no admin check configured. Set ADMIN_EMAILS or run supabase/admin_only_policies.sql.');
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    const creds = cloudinaryCreds();
    if (!creds) {
      console.error('cloudinary-sign: Cloudinary credentials are not configured');
      return res.status(500).json({ error: 'Upload service is not configured' });
    }

    const folder = typeof req.body?.folder === 'string' ? req.body.folder : '';
    if (!ALLOWED_FOLDERS.has(folder)) {
      return res.status(400).json({ error: 'Invalid folder' });
    }

    // Cloudinary signature: SHA-1 of the sorted "k=v&k=v" string of signed params + api_secret.
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `allowed_formats=${ALLOWED_FORMATS}&folder=${folder}&timestamp=${timestamp}`;
    const signature = createHash('sha1').update(toSign + creds.apiSecret).digest('hex');

    return res.status(200).json({
      cloudName: creds.cloudName,
      apiKey: creds.apiKey, // public identifier, safe to return; the secret never leaves the server
      timestamp,
      signature,
      folder,
      allowedFormats: ALLOWED_FORMATS,
    });
  } catch (err) {
    console.error('cloudinary-sign failed:', err?.message);
    return res.status(500).json({ error: 'Could not authorize upload' });
  }
}

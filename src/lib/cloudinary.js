import { supabase } from './supabase';

// Uploads are SIGNED: the browser asks our backend (/api/cloudinary-sign) for a
// short-lived signature, which is only issued to a logged-in admin. No upload
// preset or secret is shipped in the public bundle.

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export async function uploadImage(file, folder = 'albloshi/blogs') {
  if (!supabase) throw new Error('Not configured: Supabase is unavailable.');
  if (!file || !ALLOWED_TYPES.includes(file.type)) throw new Error('Only JPG, PNG, WebP, GIF or AVIF images are allowed.');
  if (file.size > MAX_BYTES) throw new Error('Image must be under 10 MB.');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Please sign in again to upload images.');

  const signRes = await fetch('/api/cloudinary-sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ folder }),
  });
  if (!signRes.ok) {
    throw new Error(signRes.status === 401 || signRes.status === 403
      ? 'You are not authorized to upload images.'
      : 'Could not authorize upload. Please try again.');
  }
  const { cloudName, apiKey, timestamp, signature, folder: signedFolder, allowedFormats } = await signRes.json();

  const formData = new FormData();
  formData.append('file',            file);
  formData.append('api_key',         apiKey);
  formData.append('timestamp',       String(timestamp));
  formData.append('signature',       signature);
  formData.append('folder',          signedFolder);
  formData.append('allowed_formats', allowedFormats);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? 'Upload failed.');
  }

  const data = await res.json();
  return data.secure_url;
}

export const cloudinaryConfigured = !!supabase;

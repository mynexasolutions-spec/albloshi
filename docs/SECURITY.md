# Security checklist (what code cannot do for you)

Status was verified against the live Supabase project and Cloudinary account with read-only probes (public anon key,
invalid test file). Re-run those checks after each step.

## Do in this order

1. **Deploy** the current code (signed uploads, `api/submit-lead.js`, `api/cloudinary-sign.js`).
2. **Vercel env (server-side only, never `VITE_`)**: `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_URL`, `CAPTCHA_SECRET`
   (or Turnstile keys), optionally `ADMIN_EMAILS=you@company.com`.
3. **Cloudinary -> Settings -> Upload -> Upload presets: DELETE `albloshi_blogs`** (or switch it to *Signed*).
   The old bundle published it, and as of the last probe it still accepted unsigned uploads. Also turn on
   Settings -> Security -> "Restricted media types" / strict transformations if you do not need SVG/PDF delivery.
   **Image uploads are now fail-closed**: `/api/cloudinary-sign` returns 403 unless `ADMIN_EMAILS` contains the caller or the
   `is_admin()` database function says yes. Until step 4 is done, set `ADMIN_EMAILS` or admin image uploads will be refused.
4. **Supabase SQL editor**: first create your admin user in Authentication -> Users, then check the admin email
   (`admin@albloshi.com`) in STEP 1 of BOTH files matches that user exactly. Both abort without changing anything if no admin row exists.
   Run once each, in this order:
   - `supabase/leads_lockdown.sql`: creates `admin_users` + `is_admin()`, anon loses all access to `leads`, and only admins
     (not every signed-in user) can use it. The contact form then works only through `/api/submit-lead`.
     Run only AFTER step 1-2, or the contact form stops working.
   - `supabase/admin_only_policies.sql`: same admin-only rule for the content tables and blogs, so a self-registered
     account cannot edit the site.
5. **Supabase -> Authentication -> Providers -> Email: disable "Allow new users to sign up"** (admins are created manually),
   and enable leaked-password protection.
6. Rotate the Supabase anon key only if you ever shipped the service-role key to the browser (it is not in the current bundle).

## Verify (should all be denied after step 4)

- `anon` read of `leads` -> 401/403 (not 200), `anon` PATCH on any content table -> 401/403 (not 204), `admin_users` readable by nobody.
- Unsigned upload with `upload_preset=albloshi_blogs` -> "Upload preset not found".
- A signed-in non-admin calling `/api/cloudinary-sign` -> 403.

## Already in place

- Admin screens are a lazy chunk (`AdminRoutes`); the public bundle only holds the `/admin/*` mount point. The admin chunk file itself is
  still downloadable by URL (unavoidable for an SPA): protection is authentication + RLS, not hiding the code.
- `vercel.json` sends CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy,
  and a single-origin `Access-Control-Allow-Origin` (https://www.albloshi.co), never `*`.
- Browser -> database is by design for public content (anon key + RLS). Sensitive data (leads) is server-only after step 4.

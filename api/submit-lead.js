// Vercel serverless function: the ONLY way a visitor can create a lead.
// The browser never talks to the `leads` table (anon has no grants - see supabase/leads_lockdown.sql).
//
// Anti-abuse layers: consent required, honeypot, minimum fill time, optional Cloudflare Turnstile,
// per-IP throttle (best effort), and a DURABLE duplicate check against the database.
//
// Server-side env vars (NEVER prefix with VITE_):
//   SUPABASE_SERVICE_ROLE_KEY   (bypasses RLS - only used here, for a fixed INSERT + duplicate lookup)
//   SUPABASE_URL                (falls back to VITE_SUPABASE_URL)
//   TURNSTILE_SECRET_KEY        (optional; when set, a valid Cloudflare Turnstile token is mandatory)
//   CAPTCHA_SECRET              (optional; when set and Turnstile is not, a self-hosted proof-of-work solution is mandatory)

import { verifySolution, powEnabled } from './_pow.js';

const SERVICES = new Set([
  'TELLABS Chemicals',
  'Food Distribution',
  'Industrial Materials',
  'Manpower Supply',
]);

const EMAIL_RE = /^[^\s@,()"<>\\]{1,64}@[^\s@,()"<>\\]{1,255}\.[^\s@,()"<>\\]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,30}$/;
const SOURCE_RE = /^(contact_form|lp_[a-z]{3,20})(:[a-z0-9_./\-]{1,60})?$/;
const MIN_FILL_MS = 2500;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
// Global flood cap, shared by every server instance (stored in the DB). Real inquiry volume is far below this.
const MAX_LEADS_PER_WINDOW = 40;

// Best-effort per-IP throttle (in-memory = per warm instance only; the DB duplicate check is the durable one).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
function throttled(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!token || token.length > 2048) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = await r.json();
    return data?.success === true;
  } catch (err) {
    console.error('submit-lead: turnstile verification failed:', err?.message);
    return false;
  }
}

// Turnstile takes priority when configured, else the self-hosted proof-of-work, else no CAPTCHA yet.
async function verifyCaptcha(token, ip) {
  if (process.env.TURNSTILE_SECRET_KEY) return token.startsWith('ts:') && verifyTurnstile(token.slice(3), ip);
  if (powEnabled()) return token.startsWith('pow:') && verifySolution(token.slice(4));
  // Nothing configured: keep the form working, but make the gap loud in the production logs.
  if (process.env.VERCEL_ENV === 'production') console.error('submit-lead: NO CAPTCHA CONFIGURED in production. Set CAPTCHA_SECRET (or TURNSTILE_SECRET_KEY).');
  return true;
}

// Same email or phone already submitted in the last 10 minutes? (survives cold starts, unlike memory)
async function isRecentDuplicate(url, key, email, phone) {
  try {
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
    const filter = `(email.eq."${email}",phone.eq."${phone}")`;
    const r = await fetch(`${url}/rest/v1/leads?select=id&created_at=gte.${encodeURIComponent(since)}&or=${encodeURIComponent(filter)}&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) return false;
    const rows = await r.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch { return false; } // never block a real lead because the check failed
}

// How many leads arrived in the last 10 minutes, from any visitor. Fails open (never blocks on a check error).
async function recentLeadCount(url, key) {
  try {
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
    const r = await fetch(`${url}/rest/v1/leads?select=id&created_at=gte.${encodeURIComponent(since)}&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: 'count=exact' },
      signal: AbortSignal.timeout(6000),
    });
    const total = Number((r.headers.get('content-range') || '').split('/')[1]);
    return Number.isFinite(total) ? total : 0;
  } catch { return 0; }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const b = req.body && typeof req.body === 'object' ? req.body : {};

    // Bots: honeypot filled, or form submitted faster than a human could. Pretend success.
    if (str(b.website, 200)) return res.status(200).json({ ok: true });
    // The field is mandatory: a bot that simply omits it must not skip the check. (Real clients always send it.)
    if (typeof b.elapsed !== 'number' || !Number.isFinite(b.elapsed) || b.elapsed < MIN_FILL_MS) return res.status(200).json({ ok: true });

    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    if (throttled(ip)) return res.status(429).json({ error: 'Too many requests. Please try again later.' });

    if (b.consent !== true) return res.status(400).json({ error: 'Please accept the Privacy Policy to continue.' });

    const name = str(b.name, 120);
    const email = str(b.email, 254);
    const phone = str(b.phone, 30);
    const service = str(b.service, 60);
    const message = str(b.message, 3000);
    const rawSource = str(b.source, 100).toLowerCase();
    const source = SOURCE_RE.test(rawSource) ? rawSource : 'contact_form';

    if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !SERVICES.has(service)) {
      return res.status(400).json({ error: 'Please check the form fields and try again.' });
    }

    // Link-stuffed text is SEO/phishing spam, never a real quote request. Drop silently (bot sees "success").
    if ((`${name} ${message}`.match(/https?:\/\/|www\./gi) || []).length >= 3) return res.status(200).json({ ok: true });

    if (!(await verifyCaptcha(str(b.captchaToken, 2100), ip))) {
      return res.status(403).json({ error: 'Verification failed. Please refresh and try again.' });
    }

    const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error('submit-lead: Supabase server credentials are not configured');
      return res.status(500).json({ error: 'Could not submit your inquiry right now.' });
    }

    // Silent drops answer { ok: true } WITHOUT `recorded`, so the browser does not fire a conversion for them.
    if (await isRecentDuplicate(url, key, email, phone)) return res.status(200).json({ ok: true });

    if ((await recentLeadCount(url, key)) >= MAX_LEADS_PER_WINDOW) {
      console.error('submit-lead: global flood cap reached, rejecting');
      return res.status(429).json({ error: 'We are receiving a high volume of requests. Please try again in a few minutes.' });
    }

    // Fixed column list: the client can never set status/read or any other column.
    const r = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ name, email, phone, service, message, status: 'new', read: false, source }),
      signal: AbortSignal.timeout(8000),
    });

    if (!r.ok) {
      console.error('submit-lead: insert failed with status', r.status);
      return res.status(502).json({ error: 'Could not submit your inquiry right now.' });
    }
    return res.status(200).json({ ok: true, recorded: true });
  } catch (err) {
    console.error('submit-lead failed:', err?.message);
    return res.status(500).json({ error: 'Could not submit your inquiry right now.' });
  }
}

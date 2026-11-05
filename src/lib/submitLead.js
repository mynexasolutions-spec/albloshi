import { trackLead, getAttribution } from './analytics';

const COOLDOWN_MS = 30 * 1000;
const LAST_KEY = 'albloshi_last_lead';

// Single client entry point for lead forms (contact page + landing pages).
export async function submitLead({ name, email, phone, service, message, source, website, captchaToken, startedAt }) {
  // Client-side cooldown: stops accidental double-clicks and trivial scripted resubmits from the same browser.
  try {
    const last = Number(sessionStorage.getItem(LAST_KEY) || 0);
    if (Date.now() - last < COOLDOWN_MS) throw new Error('Please wait a few seconds before sending another inquiry.');
  } catch (e) { if (e.message.startsWith('Please wait')) throw e; }
  const attribution = getAttribution();
  const res = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, email, phone, service, message,
      source: attribution ? `${source}:${attribution}` : source,
      website,                                   // honeypot, must be empty
      elapsed: Date.now() - startedAt,           // bots submit instantly
      captchaToken: captchaToken || '',
      consent: true,                             // the form blocks submit without the checkbox
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || 'Could not submit your inquiry right now.');
  }
  try { sessionStorage.setItem(LAST_KEY, String(Date.now())); } catch { /* ignore */ }
  // Only count a conversion when the server really stored the lead (not for silently dropped spam / duplicates).
  const data = await res.json().catch(() => ({}));
  if (data?.recorded === true) trackLead({ source, service });
}

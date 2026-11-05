// Consent-gated tracking. Nothing third-party is loaded until the visitor clicks "Accept".
// Configure in Vercel / .env (these IDs are public by design):  VITE_GTM_ID=GTM-XXXXXXX
// Inside GTM you then add Google Ads conversion, GA4, Meta Pixel, LinkedIn Insight tags
// and trigger the conversion tags on the `generate_lead` event pushed by track() below.

const CONSENT_KEY = 'albloshi_cookie_consent'; // 'granted' | 'denied'
const ATTR_KEY = 'albloshi_attribution';
const GTM_ID = import.meta.env.VITE_GTM_ID;

let gtmLoaded = false;

function gtag() { window.dataLayer.push(arguments); } // GTM needs the `arguments` object, not an array

export const getConsent = () => {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
};

function loadGtm() {
  if (gtmLoaded || !GTM_ID || !/^GTM-[A-Z0-9]{4,12}$/.test(GTM_ID)) return;
  gtmLoaded = true;
  gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* private mode */ }
  if (value === 'granted') loadGtm();
  else if (gtmLoaded) gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
}

// Ad-platform click IDs that arrive on the landing URL. Kept for the session so they can be
// attached to the conversion event (needed for offline conversion import / server-side matching).
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'li_fat_id', 'msclkid'];
const CLICK_ID_STORE = 'albloshi_click_ids';

// Remember where the visitor came from (UTM tags + click IDs on ad URLs) for the lead's `source` field.
function captureAttribution() {
  try {
    const q = new URLSearchParams(window.location.search);
    const pick = (k) => (q.get(k) || '').toLowerCase().replace(/[^a-z0-9_.\-]/g, '').slice(0, 30);
    const src = pick('utm_source'); const med = pick('utm_medium'); const camp = pick('utm_campaign');
    if (src || med || camp) sessionStorage.setItem(ATTR_KEY, [src, med, camp].filter(Boolean).join('/'));

    const ids = {};
    for (const k of CLICK_ID_KEYS) {
      const v = q.get(k);
      if (v && /^[\w\-.]{4,200}$/.test(v)) ids[k] = v; // case-sensitive: never lowercase click IDs
    }
    if (Object.keys(ids).length) sessionStorage.setItem(CLICK_ID_STORE, JSON.stringify(ids));
  } catch { /* ignore */ }
}

export const getAttribution = () => {
  try { return sessionStorage.getItem(ATTR_KEY) || ''; } catch { return ''; }
};

const getClickIds = () => {
  try { return JSON.parse(sessionStorage.getItem(CLICK_ID_STORE) || '{}'); } catch { return {}; }
};

// Phone / WhatsApp / email clicks are conversions for a B2B lead site. One delegated listener covers every
// link on the site (header, footer, floating button, landing pages). The number / address is NOT sent.
function trackContactClicks() {
  document.addEventListener('click', (e) => {
    if (window.location.pathname.startsWith('/admin')) return;
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    let event = '';
    if (href.startsWith('tel:')) event = 'click_to_call';
    else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) event = 'click_whatsapp';
    else if (href.startsWith('mailto:')) event = 'click_email';
    if (event) track(event, { page_path: window.location.pathname, ...getClickIds() });
  }, true);
}

let initialised = false;
export function initAnalytics() {
  if (initialised) return; // React StrictMode runs effects twice in dev
  initialised = true;
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
  gtag('set', 'ads_data_redaction', true); // redact ad click IDs in requests while ad_storage is denied
  captureAttribution();
  trackContactClicks();
  if (getConsent() === 'granted') loadGtm();
}

// Push a custom event (e.g. 'generate_lead') for GTM triggers. Only pushed once GTM is loaded (i.e. the visitor
// accepted cookies) so events from before consent are never replayed into ad platforms later.
export function track(event, params = {}) {
  if (!gtmLoaded) return;
  window.dataLayer.push({ event, ...params });
}

// SPA route change. The first page view is reported by GTM itself when it loads, so call this for navigations only.
export function trackPageView(path) {
  // Wait a tick so react-helmet has updated document.title before GTM reads it.
  setTimeout(() => track('virtual_page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  }), 150);
}

// Conversion event for form submissions. Click IDs ride along for offline-conversion / server-side matching.
export function trackLead({ source, service }) {
  track('generate_lead', { lead_source: source, lead_service: service, currency: 'SAR', ...getClickIds() });
}

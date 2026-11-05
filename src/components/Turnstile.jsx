import { useEffect, useRef } from 'react';

// Cloudflare Turnstile (free, privacy-friendly CAPTCHA). Renders nothing unless
// VITE_TURNSTILE_SITE_KEY is set; the server (api/submit-lead.js) enforces it when
// TURNSTILE_SECRET_KEY is set. The site key is public by design; the secret never reaches the browser.
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
export const turnstileEnabled = !!SITE_KEY;

let scriptPromise;
function loadScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export default function Turnstile({ onToken, resetKey = 0 }) {
  const ref = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    if (!SITE_KEY) return undefined;
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !ref.current || !window.turnstile) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        callback: (t) => onToken(t),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    }).catch(() => onToken(''));
    return () => {
      cancelled = true;
      if (widgetId.current != null && window.turnstile) window.turnstile.remove(widgetId.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetKey && widgetId.current != null && window.turnstile) { window.turnstile.reset(widgetId.current); onToken(''); }
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!SITE_KEY) return null;
  return <div ref={ref} className="turnstile-box" />;
}

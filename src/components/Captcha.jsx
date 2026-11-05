import { useEffect, useRef, useState } from 'react';
import Turnstile, { turnstileEnabled } from './Turnstile';

// One CAPTCHA slot for every lead form.
//  - VITE_TURNSTILE_SITE_KEY set  -> Cloudflare Turnstile (strongest, needs a free Cloudflare account)
//  - otherwise                    -> self-hosted proof-of-work (needs only CAPTCHA_SECRET on the server)
//  - neither configured           -> nothing is shown and nothing is required
// Reports the token to the form as "ts:<token>" or "pow:<token>", and whether one is required.

const toHex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

async function solve({ challenge, salt, maxnumber }, isCancelled) {
  const enc = new TextEncoder();
  for (let n = 0; n <= maxnumber; n++) {
    const hash = toHex(await crypto.subtle.digest('SHA-256', enc.encode(salt + n)));
    if (hash === challenge) return n;
    if (n % 2000 === 0) {
      if (isCancelled()) return null;
      await new Promise(r => setTimeout(r, 0)); // keep the page responsive
    }
  }
  return null;
}

function PowCaptcha({ onToken, onRequired, resetKey }) {
  const [status, setStatus] = useState('idle'); // idle | working | done
  const runId = useRef(0);

  const run = async () => {
    const id = ++runId.current;
    onToken('');
    try {
      const r = await fetch('/api/captcha-challenge', { cache: 'no-store' });
      if (r.status === 204 || !r.ok) { onRequired(false); setStatus('idle'); return; }  // not configured: no CAPTCHA
      const ch = await r.json().catch(() => null);   // dev server without /api returns HTML, not JSON
      if (!ch || !ch.challenge || !ch.salt) { onRequired(false); setStatus('idle'); return; }
      onRequired(true);
      setStatus('working');
      const number = await solve(ch, () => id !== runId.current);
      if (id !== runId.current || number === null) return;
      onToken('pow:' + btoa(JSON.stringify({ algorithm: ch.algorithm, challenge: ch.challenge, salt: ch.salt, signature: ch.signature, number })));
      setStatus('done');
    } catch { onRequired(false); setStatus('idle'); }
  };

  useEffect(() => { run(); return () => { runId.current++; }; }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (resetKey) run(); }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'idle') return null;
  return (
    <p className="pow-status" role="status" aria-live="polite">
      <span className="material-icons" style={{ fontSize: '1.1rem', verticalAlign: 'middle', marginInlineEnd: '0.35rem' }}>
        {status === 'done' ? 'verified_user' : 'hourglass_top'}
      </span>
      {status === 'done' ? 'Verified' : 'Verifying you are human…'}
    </p>
  );
}

export default function Captcha({ onToken, onRequired, resetKey }) {
  useEffect(() => { if (turnstileEnabled) onRequired(true); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (turnstileEnabled) return <Turnstile onToken={(t) => onToken(t ? 'ts:' + t : '')} resetKey={resetKey} />;
  return <PowCaptcha onToken={onToken} onRequired={onRequired} resetKey={resetKey} />;
}

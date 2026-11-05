// Self-hosted proof-of-work CAPTCHA (no third party, no account). Files starting with "_" are not API routes.
//
// How it works: the server hands out a challenge = SHA-256(salt + secretNumber) plus an HMAC signature of it.
// The browser must brute-force secretNumber (about 1-3 seconds of CPU), then sends it back.
// The server checks the HMAC (so challenges can't be forged), recomputes the hash, and checks the expiry.
// Cost to a spammer: CPU time per submission. It stops scripts and cheap bots, not a determined human-like attacker.
//
// Server env var (any long random string you generate yourself; NEVER prefix with VITE_):  CAPTCHA_SECRET
import { createHmac, createHash, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';

const MAX_NUMBER = 75000;          // average ~37k hashes for the browser
const TTL_SECONDS = 5 * 60;        // a solved challenge is valid for 5 minutes

export const powEnabled = () => !!process.env.CAPTCHA_SECRET;

const hmac = (data) => createHmac('sha256', process.env.CAPTCHA_SECRET).update(data).digest('hex');
const sha256 = (data) => createHash('sha256').update(data).digest('hex');

export function createChallenge() {
  const expires = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const salt = `${randomBytes(12).toString('hex')}?expires=${expires}`;
  const number = randomInt(0, MAX_NUMBER + 1);
  const challenge = sha256(salt + number);
  return { algorithm: 'SHA-256', challenge, salt, signature: hmac(challenge), maxnumber: MAX_NUMBER };
}

// Best-effort replay protection (per warm instance). The DB duplicate check and flood cap cover the rest.
const used = new Map();

export function verifySolution(token) {
  try {
    if (!powEnabled() || typeof token !== 'string' || token.length > 2048) return false;
    const p = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    const { challenge, salt, signature, number } = p;
    if (p.algorithm !== 'SHA-256' || typeof challenge !== 'string' || typeof salt !== 'string'
      || typeof signature !== 'string' || !Number.isInteger(number) || number < 0 || number > MAX_NUMBER) return false;

    const expected = Buffer.from(hmac(challenge));
    const given = Buffer.from(signature);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;   // forged challenge

    const expires = Number(new URLSearchParams(salt.split('?')[1] || '').get('expires'));
    if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;     // expired

    if (sha256(salt + number) !== challenge) return false;                                      // wrong answer

    const now = Date.now();
    for (const [k, t] of used) if (now - t > TTL_SECONDS * 1000) used.delete(k);
    if (used.has(signature)) return false;                                                      // replayed
    used.set(signature, now);
    return true;
  } catch { return false; }
}

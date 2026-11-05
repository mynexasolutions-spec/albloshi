// Issues a proof-of-work challenge for the lead forms. 204 = CAPTCHA not configured (forms skip it).
import { createChallenge, powEnabled } from './_pow.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!powEnabled()) return res.status(204).end();
  try {
    return res.status(200).json(createChallenge());
  } catch (err) {
    console.error('captcha-challenge failed:', err?.message);
    return res.status(500).json({ error: 'Could not create challenge' });
  }
}

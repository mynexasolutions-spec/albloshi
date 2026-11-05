import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getConsent, setConsent } from '../lib/analytics';

// Opt-in banner: Accept and Reject are equally prominent. Footer "Cookie Settings" reopens it.
export default function CookieConsent() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  if (!open) return null;
  const choose = (v) => { setConsent(v); setOpen(false); };

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t('cookie_settings')}>
      <p>
        {t('cookie_text')}{' '}
        <Link to="/privacy-policy">{t('privacy_policy')}</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => choose('denied')}>{t('cookie_reject')}</button>
        <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => choose('granted')}>{t('cookie_accept')}</button>
      </div>
    </div>
  );
}

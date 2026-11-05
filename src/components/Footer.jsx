import { useState, useEffect } from 'react';
import { cdn } from '../lib/img';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { DEFAULTS, fetchSiteSettings, BRANDING_DEFAULTS, fetchBranding } from '../lib/siteSettingsDefaults';

export default function Footer() {
  const { t, language } = useLanguage();

  const [settings, setSettings] = useState(DEFAULTS);
  const [branding, setBranding] = useState(BRANDING_DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(supabase).then(s => { if (!cancelled) setSettings(s); });
    fetchBranding(supabase).then(b => { if (!cancelled) setBranding(b); });
    return () => { cancelled = true; };
  }, []);

  return (
    <footer className="bg-dark-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link to="/" className="logo-container">
                <img src={cdn(branding.logo, 300)} alt="ALBLOSHI" className="footer-logo" width="818" height="447" loading="lazy" style={{ filter: 'brightness(0) invert(1)' }} />
              </Link>
              <p>{t('footer_desc')}</p>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{t('cr_number')}: {settings.cr_number}</span>
            </div>

            <div className="footer-col">
              <h3>{t('business_segments')}</h3>
              <ul className="footer-links">
                <li><Link to="/industrial-services">{t('industrial_materials')}</Link></li>
                <li><Link to="/intelligent-chemicals">{t('tellabs_chemicals')}</Link></li>
                <li><Link to="/food-services">{t('food_distribution')}</Link></li>
                <li><Link to="/manpower-supply">{t('manpower_supply')}</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>{t('products_catalog')}</h3>
              <ul className="footer-links">
                <li><Link to="/industrial-services#products">{t('seamless_pipes')}</Link></li>
                <li><Link to="/industrial-services#products">{t('valves_flanges_short')}</Link></li>
                <li><Link to="/intelligent-chemicals">{t('water_polymers')}</Link></li>
                <li><Link to="/food-services#products">{t('basmati_rice_short')}</Link></li>
                <li><Link to="/food-services#products">{t('refined_palm_oil_short')}</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>{t('corporate_offices')}</h3>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">phone_in_talk</span>
                <p className="footer-contact-text">
                  <a href={`tel:${settings.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{settings.phone_display}</a>
                </p>
              </div>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">mail_outline</span>
                <p className="footer-contact-text">
                  <a href={`mailto:${settings.email_admin}`}>{settings.email_admin}</a><br />
                  <a href={`mailto:${settings.email_sales}`}>{settings.email_sales}</a>
                </p>
              </div>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">location_on</span>
                <p className="footer-contact-text">
                  {language === 'ar'
                    ? `${settings.address_line1_ar} ${settings.address_line2_ar}`
                    : `${settings.address_line1_en} ${settings.address_line2_en}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {t('all_rights_reserved')}</p>
          <div className="footer-bottom-links">
            <Link to="/blog">{t('company_blog')}</Link>
            <Link to="/terms">{t('terms_of_service')}</Link>
            <Link to="/privacy-policy">{t('privacy_policy')}</Link>
            <button type="button" className="footer-link-btn" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>{t('cookie_settings')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

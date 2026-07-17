import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function MobileFooterBar() {
  const { t } = useLanguage();

  return (
    <nav className="mobile-footer-bar" aria-label="Quick navigation">
      <Link to="/intelligent-chemicals" className="mfb-item">
        <span className="material-icons mfb-icon">science</span>
        <span className="mfb-label">{t('mfb_chemicals')}</span>
      </Link>
      <Link to="/industrial-services" className="mfb-item">
        <span className="material-icons mfb-icon">precision_manufacturing</span>
        <span className="mfb-label">{t('mfb_industrial')}</span>
      </Link>
      <Link to="/food-services" className="mfb-item">
        <span className="material-icons mfb-icon">restaurant</span>
        <span className="mfb-label">{t('mfb_food')}</span>
      </Link>
      <a href="/contact" className="mfb-item">
        <span className="material-icons mfb-icon">groups</span>
        <span className="mfb-label">{t('mfb_manpower')}</span>
      </a>
    </nav>
  );
}

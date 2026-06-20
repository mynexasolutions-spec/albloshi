import { Link } from 'react-router-dom';

export default function MobileFooterBar() {
  return (
    <nav className="mobile-footer-bar" aria-label="Quick navigation">
      <Link to="/intelligent-chemicals" className="mfb-item">
        <span className="material-icons mfb-icon">science</span>
        <span className="mfb-label">Chemicals</span>
      </Link>
      <Link to="/industrial-services" className="mfb-item">
        <span className="material-icons mfb-icon">precision_manufacturing</span>
        <span className="mfb-label">Industrial</span>
      </Link>
      <Link to="/food-services" className="mfb-item">
        <span className="material-icons mfb-icon">restaurant</span>
        <span className="mfb-label">Food</span>
      </Link>
      <a href="/contact" className="mfb-item">
        <span className="material-icons mfb-icon">groups</span>
        <span className="mfb-label">Manpower</span>
      </a>
    </nav>
  );
}

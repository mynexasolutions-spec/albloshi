import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hashLink = (hash) => isHome ? hash : `/${hash}`;

  return (
    <footer className="bg-dark-section" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link to="/" className="logo-container">
                <img src="/logo-png.png" alt="ALBLOSHI" className="footer-logo" style={{ filter: 'brightness(0) invert(1)' }} />
              </Link>
              <p>A premium multi-industry Saudi enterprise operating dynamic supply operations across industrial materials, food commodities, specialty chemicals, and professional manpower supply.</p>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>CR Number: 7049763092</span>
            </div>

            <div className="footer-col">
              <h4>Business Segments</h4>
              <ul className="footer-links">
                <li><Link to="/industrial-services">Industrial Materials</Link></li>
                <li><Link to="/intelligent-chemicals">TELLABS Chemicals</Link></li>
                <li><Link to="/food-services">Food Distribution</Link></li>
                <li><a href={hashLink('#contact')}>Manpower Supply</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Products Catalog</h4>
              <ul className="footer-links">
                <li><Link to="/industrial-services#products">Seamless Pipes</Link></li>
                <li><Link to="/industrial-services#products">Valves and Flanges</Link></li>
                <li><Link to="/intelligent-chemicals">Water Polymers</Link></li>
                <li><Link to="/food-services#products">Basmati Rice</Link></li>
                <li><Link to="/food-services#products">Refined Palm Oil</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Corporate Offices</h4>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">phone_in_talk</span>
                <p className="footer-contact-text">+966 54 958 1547</p>
              </div>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">mail_outline</span>
                <p className="footer-contact-text"><a href="mailto:sales@albloshi.co">sales@albloshi.co</a></p>
              </div>
              <div className="footer-contact-item">
                <span className="material-icons footer-contact-icon">location_on</span>
                <p className="footer-contact-text">5250, Al Nidal 7372, Ash Shulah Dist., Dammam 34261, KSA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Mohammad Abdulla Albloshi Trading Co. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/blog">Company Blog</Link>
            <a href={hashLink('#faq')}>Terms of Sourcing</a>
            <a href={hashLink('#contact')}>Compliance and Certifications</a>
            <a href={hashLink('#faq')}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

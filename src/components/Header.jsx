import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    setOpenNestedSubmenu(null);
    document.body.classList.remove('no-scroll');
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.classList.toggle('no-scroll', !prev);
      return !prev;
    });
  };

  const toggleSubmenu = (e, name) => {
    e.preventDefault();
    if (window.innerWidth <= 1200) {
      setOpenSubmenu(prev => (prev === name ? null : name));
      setOpenNestedSubmenu(null);
    }
  };

  const toggleNestedSubmenu = (e, name) => {
    if (window.innerWidth <= 1200) {
      e.preventDefault();
      e.stopPropagation();
      setOpenNestedSubmenu(prev => (prev === name ? null : name));
    }
  };

  const isHome = location.pathname === '/';

  const hashLink = (hash) => isHome ? hash : `/${hash}`;

  return (
    <header className={`main-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo-container">
          <img src="/logo-png.png" alt="ALBLOSHI" className="nav-logo" />
        </Link>

        <nav className="nav-menu-wrapper" ref={menuRef}>
          <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>

            {/* Business Verticals */}
            <li className={`nav-item${openSubmenu === 'divisions' ? ' open-mobile-submenu' : ''}`}>
              <a
                href={hashLink('#segments')}
                className="nav-link nav-link-dropdown"
                onClick={(e) => toggleSubmenu(e, 'divisions')}
              >
                {t('business_verticals')}
              </a>
              <ul className="dropdown-menu">
                <li className={`dropdown-submenu${openNestedSubmenu === 'chemicals' ? ' open-mobile-nested-submenu' : ''}`}>
                  <Link
                    to="/intelligent-chemicals"
                    className="dropdown-item"
                    onClick={(e) => toggleNestedSubmenu(e, 'chemicals')}
                  >
                    <span className="material-icons">science</span>
                    <span className="dropdown-text">{t('intelligent_chemicals')}</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/intelligent-chemicals#water-treatment" className="dropdown-item">
                        <span className="dropdown-text">{t('industrial_water_treatment')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#polymers" className="dropdown-item">
                        <span className="dropdown-text">{t('polymers_coagulants')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#defoamers" className="dropdown-item">
                        <span className="dropdown-text">{t('silicone_organic_defoamers')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#fuel-additives" className="dropdown-item">
                        <span className="dropdown-text">{t('fuel_additives')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#activated-carbon" className="dropdown-item">
                        <span className="dropdown-text">{t('activated_carbon_solutions')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#cleaning-disinfection" className="dropdown-item">
                        <span className="dropdown-text">{t('cleaning_disinfection')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#pulp-paper" className="dropdown-item">
                        <span className="dropdown-text">{t('pulp_paper_solutions')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#sugar-industry" className="dropdown-item">
                        <span className="dropdown-text">{t('sugar_industry_solutions')}</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className={`dropdown-submenu${openNestedSubmenu === 'industrial' ? ' open-mobile-nested-submenu' : ''}`}>
                  <Link
                    to="/industrial-services"
                    className="dropdown-item"
                    onClick={(e) => toggleNestedSubmenu(e, 'industrial')}
                  >
                    <span className="material-icons">precision_manufacturing</span>
                    <span className="dropdown-text">{t('industrial_materials')}</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/industrial-services#steel-pipes" className="dropdown-item">
                        <span className="dropdown-text">{t('steel_pipes')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#valves-flanges" className="dropdown-item">
                        <span className="dropdown-text">{t('valves_flanges')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#cable-trays" className="dropdown-item">
                        <span className="dropdown-text">{t('cable_trays')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#welding-safety" className="dropdown-item">
                        <span className="dropdown-text">{t('welding_safety')}</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className={`dropdown-submenu${openNestedSubmenu === 'food' ? ' open-mobile-nested-submenu' : ''}`}>
                  <Link
                    to="/food-services"
                    className="dropdown-item"
                    onClick={(e) => toggleNestedSubmenu(e, 'food')}
                  >
                    <span className="material-icons">restaurant</span>
                    <span className="dropdown-text">{t('food_distribution')}</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/food-services#basmati-rice" className="dropdown-item">
                        <span className="dropdown-text">{t('premium_basmati_rice')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#cooking-oil" className="dropdown-item">
                        <span className="dropdown-text">{t('refined_palm_cooking_oil')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#restaurant-essentials" className="dropdown-item">
                        <span className="dropdown-text">{t('restaurant_essentials')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#wholesale-grain" className="dropdown-item">
                        <span className="dropdown-text">{t('wholesale_grain_sugar')}</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/contact" className="dropdown-item">
                    <span className="material-icons">groups</span>
                    <span className="dropdown-text">{t('manpower_supply')}</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Partnerships */}
            <li className={`nav-item${openSubmenu === 'partners' ? ' open-mobile-submenu' : ''}`}>
              <a
                href={hashLink('#partner')}
                className="nav-link nav-link-dropdown"
                onClick={(e) => toggleSubmenu(e, 'partners')}
              >
                {t('partnerships')}
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/tellabs-chemicals" className="dropdown-item"><span className="material-icons">biotech</span><span className="dropdown-text">{t('tellabs_chemicals')}</span></Link></li>
                <li><a href={hashLink('#why-choose-us')} className="dropdown-item"><span className="material-icons">public</span><span className="dropdown-text">{t('sourcing_brands')}</span></a></li>
              </ul>
            </li>

            {/* Blog */}
            <li className="nav-item">
              <Link to="/blog" className={`nav-link${location.pathname === '/blog' ? ' active' : ''}`}>{t('blogs')}</Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>{t('about')}</Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' active' : ''}`}>{t('contact')}</Link>
            </li>

            {/* CTA */}
            <li className="nav-cta">
              <Link to="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.94rem' }}>
                {t('request_quote')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-right-actions">
          <button onClick={toggleLanguage} className="lang-switch-btn" aria-label="Switch Language">
            <span className="material-icons">language</span>
            <span className="lang-text">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            className={`mobile-nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

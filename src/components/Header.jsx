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
                  <ul className="submenu industrial-submenu-grid">
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
                    <li>
                      <Link to="/industrial-services#cs-flanges" className="dropdown-item">
                        <span className="dropdown-text">CS Flanges</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#ss-flanges" className="dropdown-item">
                        <span className="dropdown-text">SS Flanges</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#cs-buttweld-fittings" className="dropdown-item">
                        <span className="dropdown-text">Carbon Steel Buttweld Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#ss-buttweld-fittings" className="dropdown-item">
                        <span className="dropdown-text">Stainless Steel Buttweld Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#forged-cs-fittings" className="dropdown-item">
                        <span className="dropdown-text">Forged Carbon Steel Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#forged-ss-fittings" className="dropdown-item">
                        <span className="dropdown-text">Forged Stainless Steel Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#malleable-iron-fittings" className="dropdown-item">
                        <span className="dropdown-text">Forged Malleable Iron Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#fire-hydrant-grooved-fittings" className="dropdown-item">
                        <span className="dropdown-text">Fire Hydrant & Grooved Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#instrumentation-accessories-tube-fittings" className="dropdown-item">
                        <span className="dropdown-text">Instrumentation Accessories & Tube Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#valves" className="dropdown-item">
                        <span className="dropdown-text">Valves</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#fasteners-stud-bolts" className="dropdown-item">
                        <span className="dropdown-text">Fasteners & Stud Bolts</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#gasket-insulation-kits" className="dropdown-item">
                        <span className="dropdown-text">Gasket & Insulation Kits</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#industrial-electrical-materials" className="dropdown-item">
                        <span className="dropdown-text">Industrial Electrical Materials</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#industrial-telecom" className="dropdown-item">
                        <span className="dropdown-text">Industrial Telecom</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#cable-tray-ladder-support" className="dropdown-item">
                        <span className="dropdown-text">Cable Tray & Ladder Support</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#earthing-support" className="dropdown-item">
                        <span className="dropdown-text">Earthing Support</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#welding-materials-accessories" className="dropdown-item">
                        <span className="dropdown-text">Welding Materials & Accessories</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#industrial-safety-materials-tools" className="dropdown-item">
                        <span className="dropdown-text">Industrial Safety Materials & Tools</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#construction-chemicals" className="dropdown-item">
                        <span className="dropdown-text">Construction Chemicals</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#sanitary-products" className="dropdown-item">
                        <span className="dropdown-text">Sanitary Products</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#drains" className="dropdown-item">
                        <span className="dropdown-text">Drains</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#pvc-cpvc-cement" className="dropdown-item">
                        <span className="dropdown-text">PVC / CPVC Cement</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#pvc-cpvc-upvc-hdpe-pvdf-pipes" className="dropdown-item">
                        <span className="dropdown-text">PVC / CPVC / uPVC / HDPE / PVDF Pipes</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#ppr-pipes-fittings" className="dropdown-item">
                        <span className="dropdown-text">PPR Pipes & Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#electrical-coated-conduit-fittings" className="dropdown-item">
                        <span className="dropdown-text">Electrical Coated Conduit & Fittings</span>
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
                  <ul className="submenu food-submenu-grid">
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
                    <li>
                      <Link to="/food-services#white-sugar" className="dropdown-item">
                        <span className="dropdown-text">Premium Refined White Sugar</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#spices" className="dropdown-item">
                        <span className="dropdown-text">Premium Whole & Ground Spices</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#food-supply" className="dropdown-item">
                        <span className="dropdown-text">Premium Packaged Food Products</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#custom-basmati" className="dropdown-item">
                        <span className="dropdown-text">Custom Branded Basmati Rice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#palm-olein" className="dropdown-item">
                        <span className="dropdown-text">Premium Refined Palm Olein Oil</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#steam-basmati" className="dropdown-item">
                        <span className="dropdown-text">1121 XXXL Steam Basmati Rice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#golden-sella" className="dropdown-item">
                        <span className="dropdown-text">1121 XXXL Golden Sella Basmati Rice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#premium-1121" className="dropdown-item">
                        <span className="dropdown-text">Premium 1121 Basmati Rice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#honey" className="dropdown-item">
                        <span className="dropdown-text">Pure Natural Honey</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#grains-pulses" className="dropdown-item">
                        <span className="dropdown-text">Premium Grains & Pulses</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#chicken" className="dropdown-item">
                        <span className="dropdown-text">Fresh & Frozen Chicken</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#eggs" className="dropdown-item">
                        <span className="dropdown-text">Farm Fresh Table Eggs</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#coffee" className="dropdown-item">
                        <span className="dropdown-text">Premium Coffee Beans</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className={`dropdown-submenu${openNestedSubmenu === 'manpower' ? ' open-mobile-nested-submenu' : ''}`}>
                  <Link
                    to="/manpower-supply"
                    className="dropdown-item"
                    onClick={(e) => toggleNestedSubmenu(e, 'manpower')}
                  >
                    <span className="material-icons">groups</span>
                    <span className="dropdown-text">{t('manpower_supply')}</span>
                  </Link>
                  <ul className="submenu manpower-submenu-grid">
                    <li>
                      <Link to="/manpower-supply#engineers-supervisors-foremen" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item1')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#electricians-instrument-technicians" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item2')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#welders-fabricators-pipefitters" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item3')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#plumbers-hvac-technicians" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item4')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#riggers-scaffolders-operators" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item5')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#safety-storekeepers-timekeepers" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_skilled_item6')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#general-labour-helpers" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item1')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#loading-unloading-material-handling" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item2')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#site-cleaning-housekeeping" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item3')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#packing-sorting-warehouse" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item4')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#construction-support-civil-helpers" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item5')}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/manpower-supply#shutdown-mobilization-crews" className="dropdown-item">
                        <span className="dropdown-text">{t('mp_unskilled_item6')}</span>
                      </Link>
                    </li>
                  </ul>
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
      <style>{`
        @media (min-width: 1201px) {
          .food-submenu-grid, .industrial-submenu-grid, .manpower-submenu-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1.25rem;
            width: 730px !important;
            padding: 0.6rem;
            max-height: 65vh;
            overflow-y: auto;
          }
          .food-submenu-grid::-webkit-scrollbar, .industrial-submenu-grid::-webkit-scrollbar, .manpower-submenu-grid::-webkit-scrollbar {
            width: 6px;
          }
          .food-submenu-grid::-webkit-scrollbar-track, .industrial-submenu-grid::-webkit-scrollbar-track, .manpower-submenu-grid::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
          }
          .food-submenu-grid::-webkit-scrollbar-thumb, .industrial-submenu-grid::-webkit-scrollbar-thumb, .manpower-submenu-grid::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          .food-submenu-grid li, .industrial-submenu-grid li, .manpower-submenu-grid li {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}

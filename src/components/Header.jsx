import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
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
                Business Verticals
              </a>
              <ul className="dropdown-menu">
                <li className={`dropdown-submenu${openNestedSubmenu === 'chemicals' ? ' open-mobile-nested-submenu' : ''}`}>
                  <Link
                    to="/intelligent-chemicals"
                    className="dropdown-item"
                    onClick={(e) => toggleNestedSubmenu(e, 'chemicals')}
                  >
                    <span className="material-icons">science</span>
                    <span className="dropdown-text">Intelligent Chemicals</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/intelligent-chemicals#water-treatment" className="dropdown-item">
                        <span className="dropdown-text">Industrial Water Treatment</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#polymers" className="dropdown-item">
                        <span className="dropdown-text">Polymers (Coagulants &amp; Flocculants)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#defoamers" className="dropdown-item">
                        <span className="dropdown-text">Silicone &amp; Organic Defoamers</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#fuel-additives" className="dropdown-item">
                        <span className="dropdown-text">Fuel Additives</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#activated-carbon" className="dropdown-item">
                        <span className="dropdown-text">Activated Carbon Solutions</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#cleaning-disinfection" className="dropdown-item">
                        <span className="dropdown-text">Cleaning &amp; Disinfection</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#pulp-paper" className="dropdown-item">
                        <span className="dropdown-text">Pulp &amp; Paper Solutions</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/intelligent-chemicals#sugar-industry" className="dropdown-item">
                        <span className="dropdown-text">Sugar Industry Solutions</span>
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
                    <span className="dropdown-text">Industrial Materials</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/industrial-services#steel-pipes" className="dropdown-item">
                        <span className="dropdown-text">Steel Pipes</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#valves-flanges" className="dropdown-item">
                        <span className="dropdown-text">Valves &amp; Flanges</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#cable-trays" className="dropdown-item">
                        <span className="dropdown-text">Cable Trays &amp; Fittings</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/industrial-services#welding-safety" className="dropdown-item">
                        <span className="dropdown-text">Welding &amp; Safety Gear</span>
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
                    <span className="dropdown-text">Food Distribution</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/food-services#basmati-rice" className="dropdown-item">
                        <span className="dropdown-text">Premium Basmati Rice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#cooking-oil" className="dropdown-item">
                        <span className="dropdown-text">Refined Palm Cooking Oil</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#restaurant-essentials" className="dropdown-item">
                        <span className="dropdown-text">Restaurant Essentials</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/food-services#wholesale-grain" className="dropdown-item">
                        <span className="dropdown-text">Wholesale Grain &amp; Sugar</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/contact" className="dropdown-item">
                    <span className="material-icons">groups</span>
                    <span className="dropdown-text">Manpower Supply</span>
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
                Partnerships
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/tellabs-chemicals" className="dropdown-item"><span className="material-icons">biotech</span><span className="dropdown-text">TELLABS Chemicals</span></Link></li>
                <li><a href={hashLink('#why-choose-us')} className="dropdown-item"><span className="material-icons">public</span><span className="dropdown-text">Sourcing Brands</span></a></li>
              </ul>
            </li>

            {/* Blog */}
            <li className="nav-item">
              <Link to="/blog" className={`nav-link${location.pathname === '/blog' ? ' active' : ''}`}>Blogs</Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>About</Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' active' : ''}`}>Contact</Link>
            </li>

            {/* CTA */}
            <li className="nav-cta">
              <Link to="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.94rem' }}>
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

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
    </header>
  );
}

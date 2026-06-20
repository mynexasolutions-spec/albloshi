import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
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
    document.body.classList.remove('no-scroll');
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.classList.toggle('no-scroll', !prev);
      return !prev;
    });
  };

  const toggleSubmenu = (name) => {
    if (window.innerWidth <= 1200) {
      setOpenSubmenu(prev => (prev === name ? null : name));
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

            {/* Business Divisions */}
            <li className={`nav-item${openSubmenu === 'divisions' ? ' open-mobile-submenu' : ''}`}>
              <a
                href={hashLink('#segments')}
                className="nav-link nav-link-dropdown"
                onClick={() => toggleSubmenu('divisions')}
              >
                Business Divisions
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/industrial-services" className="dropdown-item"><span className="material-icons">precision_manufacturing</span><span className="dropdown-text">Industrial Materials</span></Link></li>
                <li><Link to="/food-services" className="dropdown-item"><span className="material-icons">restaurant</span><span className="dropdown-text">Food Distribution</span></Link></li>
                <li><Link to="/intelligent-chemicals" className="dropdown-item"><span className="material-icons">science</span><span className="dropdown-text">Intelligent Chemicals</span></Link></li>
                <li><a href={hashLink('#contact')} className="dropdown-item"><span className="material-icons">groups</span><span className="dropdown-text">Manpower Supply</span></a></li>
              </ul>
            </li>

            {/* Products Catalog */}
            <li className={`nav-item${openSubmenu === 'products' ? ' open-mobile-submenu' : ''}`}>
              <a
                href={hashLink('#segments')}
                className="nav-link nav-link-dropdown"
                onClick={() => toggleSubmenu('products')}
              >
                Products Catalog
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/industrial-services#products" className="dropdown-item"><span className="material-icons">water_damage</span><span className="dropdown-text">Steel Pipes</span></Link></li>
                <li><Link to="/industrial-services#products" className="dropdown-item"><span className="material-icons">plumbing</span><span className="dropdown-text">Valves &amp; Flanges</span></Link></li>
                <li><Link to="/food-services#products" className="dropdown-item"><span className="material-icons">rice_bowl</span><span className="dropdown-text">Basmati Rice</span></Link></li>
                <li><Link to="/food-services#products" className="dropdown-item"><span className="material-icons">oil_barrel</span><span className="dropdown-text">Cooking Oil</span></Link></li>
                <li><Link to="/intelligent-chemicals" className="dropdown-item"><span className="material-icons">water_drop</span><span className="dropdown-text">Water Chemicals</span></Link></li>
                <li><Link to="/intelligent-chemicals" className="dropdown-item"><span className="material-icons">eco</span><span className="dropdown-text">Activated Carbon</span></Link></li>
              </ul>
            </li>

            {/* Partnerships */}
            <li className={`nav-item${openSubmenu === 'partners' ? ' open-mobile-submenu' : ''}`}>
              <a
                href={hashLink('#partner')}
                className="nav-link nav-link-dropdown"
                onClick={() => toggleSubmenu('partners')}
              >
                Partnerships
              </a>
              <ul className="dropdown-menu">
                <li><a href={hashLink('#partner')} className="dropdown-item"><span className="material-icons">biotech</span><span className="dropdown-text">TELLABS Chemicals</span></a></li>
                <li><a href={hashLink('#partner')} className="dropdown-item"><span className="material-icons">public</span><span className="dropdown-text">Sourcing Brands</span></a></li>
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
              <a href={hashLink('#contact')} className="nav-link">Contact</a>
            </li>

            {/* CTA */}
            <li className="nav-cta">
              <a href={hashLink('#contact')} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.94rem' }}>
                Request a Quote
              </a>
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

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';

const STATS = [
  { value: '8+', label: 'Years of Experience' },
  { value: '100+', label: 'Containers Imported' },
  { value: '5+', label: 'Cities Served' },
  { value: '4', label: 'Business Divisions' },
];

const VALUES = [
  {
    icon: 'verified',
    title: 'Quality First',
    desc: 'Every product we supply — from carbon steel pipes to specialty chemicals — comes with full traceability documentation, mill certificates, and compliance to international standards including ASTM, ASME, SASO, and SFDA.',
  },
  {
    icon: 'handshake',
    title: 'Long-Term Partnerships',
    desc: 'We build relationships, not transactions. Our clients in oil & gas, construction, hospitality, and manufacturing trust us as a single, reliable vendor because we consistently deliver on commitments.',
  },
  {
    icon: 'local_shipping',
    title: 'Operational Excellence',
    desc: 'Backed by a dedicated logistics fleet and centralized warehousing in Dammam, we ensure goods reach project sites across the Eastern Province and beyond on schedule — every time.',
  },
  {
    icon: 'groups',
    title: 'People-Driven',
    desc: 'From our leadership team to our field technicians and account managers, every person at Albloshi is committed to the mission of empowering industries with the resources they need to thrive.',
  },
  {
    icon: 'eco',
    title: 'Sustainability',
    desc: 'Through our partnership with TELLABS, we promote environmentally responsible chemical solutions that reduce industrial waste, lower emissions, and support Saudi Arabia\'s Green Initiative.',
  },
  {
    icon: 'emoji_events',
    title: 'Proven Track Record',
    desc: 'With projects delivered across Jubail, Dammam, Riyadh, and Jeddah, our portfolio speaks for itself. We have supported shutdowns, large-scale builds, and everyday operations for over a decade.',
  },
];


export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll('.about-reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('about-reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Mohammad Abdulla Albloshi Trading Co.</title>
        <meta name="description" content="Learn about Mohammad Abdulla Albloshi Trading Co. — a Dammam-based multi-industry enterprise supplying industrial materials, food commodities, TELLABS specialty chemicals, and skilled manpower across Saudi Arabia since 2008." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="about-page-hero">
        <div className="about-page-hero-overlay"></div>
        <div className="container">
          <div className="about-page-hero-content">
            <h1>Mohammad Abdulla<br />Albloshi Trading Co.</h1>
            <p>A premier multi-industry enterprise supplying industrial materials, specialty chemicals, food commodities, and skilled manpower to businesses across the Kingdom of Saudi Arabia.</p>
            <div className="about-hero-actions">
              <a href="#our-story" className="btn btn-primary">Our Story</a>
              <a href="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}>Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="about-stat-item">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section id="our-story" className="section-padding">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-img-col about-reveal">
              <div className="about-story-img-wrapper">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80" alt="Albloshi industrial supply" />
                <div className="about-story-badge">
                  <span className="material-icons">verified</span>
                  <div>
                    <strong>CR No.</strong>
                    <span>7049763092</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-story-text-col about-reveal">
              <span className="focus-label">OUR STORY</span>
              <p className="large-para">Founded in 2017 in Dammam, Albloshi began as a premium food distribution enterprise and has grown into a four-division company serving hospitality, industrial, chemical, and manpower sectors across the Kingdom.</p>
              <p className="large-para">Today we are the exclusive regional distributor for <strong>TELLABS Intelligent Chemicals</strong> across Saudi Arabia and the UAE — delivering food commodities, industrial materials, specialty chemicals, and skilled manpower under one trusted name.</p>
              <div className="about-story-highlights">
                {[
                  'Headquartered in Dammam — Eastern Province commercial hub',
                  'Exclusive TELLABS distributor across Saudi Arabia, UAE & GCC',
                  'SFDA, SASO, ASTM & ISO compliant supply chain',
                  'Serving Dammam, Al Khobar, Qatif, Jubail & Al Hassa',
                ].map(h => (
                  <div key={h} className="about-story-highlight-item">
                    <span className="material-icons" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>check_circle</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mv-section section-padding">
        <div className="container">
          <div className="about-mv-grid">
            <div className="about-mv-card about-reveal">
              <div className="about-mv-icon"><span className="material-icons">flag</span></div>
              <h3>Our Mission</h3>
              <p>To empower Saudi Arabia's industrial, commercial, and hospitality sectors by delivering a unified, high-quality supply of materials, chemicals, food commodities, and skilled workforce — backed by technical expertise, strict compliance, and uncompromising reliability.</p>
            </div>
            <div className="about-mv-card about-mv-card--vision about-reveal">
              <div className="about-mv-icon"><span className="material-icons">visibility</span></div>
              <h3>Our Vision</h3>
              <p>To be recognized as one of the most trusted and efficient supply companies in the Kingdom of Saudi Arabia — offering quality products from around the world, delivered with excellence across food, industrial, chemical, and manpower divisions.</p>
            </div>
            <div className="about-mv-card about-reveal">
              <div className="about-mv-icon"><span className="material-icons">star</span></div>
              <h3>Our Promise</h3>
              <p>Every order, every delivery, every client interaction reflects our fundamental commitment: that choosing Albloshi means choosing a partner who understands your industry, respects your timelines, and stands behind every product with full documentation and after-sales support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--color-light)' }}>
        <div className="container">
          <div className="text-center">
            <span className="focus-label">WHAT WE STAND FOR</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>Our Core Values</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>These principles define how we operate, how we serve our clients, and how we make decisions at every level of the business.</p>
          </div>
          <div className="about-values-grid">
            {VALUES.map(v => (
              <div key={v.title} className="about-value-card about-reveal">
                <div className="about-value-icon"><span className="material-icons">{v.icon}</span></div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="team-section section-padding">
        <div className="container">
          <div className="text-center">
            <span className="focus-label">OUR LEADERSHIP</span>
            <h2 className="section-title center">Executive Management Team</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>Our leadership team steers Albloshi toward sustainable industrial innovation and robust supply chain solutions across Saudi Arabia.</p>
          </div>
          <div className="team-grid">
            {[
              { id: 1, name: 'Mohammad Abdulla Albloshi', role: 'Chairman & Founder', bio: 'Steering the strategic vision and long-term growth of the company across KSA\'s key industrial sectors.' },
              { id: 2, name: 'Mohammad Riaz', role: 'Business Development Manager', bio: 'Leading enterprise growth and strategic partnerships, including our exclusive alliance with TELLABS chemicals.' },
              { id: 3, name: 'Eng. Fahad Al-Mutairi', role: 'Director of Operations & Logistics', bio: 'Directing logistics operations, warehousing networks, and quality compliance logs across all supply divisions.' },
            ].map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`avatarGradAbout${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                      <linearGradient id={`primaryGradAbout${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1B5FAF" />
                        <stop offset="100%" stopColor="#0b2246" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="100" fill={`url(#avatarGradAbout${m.id})`} />
                    <circle cx="50" cy="40" r="18" fill={`url(#primaryGradAbout${m.id})`} opacity="0.85" />
                    <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradAbout${m.id})`} opacity="0.85" />
                  </svg>
                </div>
                <div className="team-info">
                  <h3>{m.name}</h3>
                  <div className="team-role">{m.role}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Network — same as Home page */}
      <section id="network" className="network-hero bg-dark-section">
        <div className="container relative z-10 text-center">
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>Robust Saudi Distribution Network</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>Headquartered strategically in Dammam to support the industrial heartland of the Eastern Province, Albloshi operates comprehensive localized fulfillment pipelines across primary commercial hubs.</p>
          <div className="network-interactive-map">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {[
              { cls: 'card-dammam', title: 'Dammam (HQ)', sub: 'Corporate Hub & Central Distribution' },
              { cls: 'card-khobar', title: 'Al Khobar · Qatif', sub: 'Sales Office & Client Services' },
              { cls: 'card-jubail', title: 'Jubail · Al Hassa', sub: 'Industrial & Regional Supply' },
              { cls: 'card-other', title: 'Expanding Across KSA', sub: 'Riyadh · Jeddah · Madinah · Makkah · Abha' },
            ].map(c => (
              <div key={c.cls} className={`map-floating-card ${c.cls}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{c.title}</h4>
                  <span>{c.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>Ready to Partner with Albloshi?</h2>
                <p>Whether you need industrial materials for a shutdown, chemicals for a water plant, food products for a hotel chain, or a certified manpower team — we have the resources and the expertise to deliver.</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">Send Us an Inquiry</Link>
                <Link to="/#segments" className="btn btn-outline">Explore Our Verticals</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

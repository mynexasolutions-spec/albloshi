import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function TellabsChemicals() {
  return (
    <>
      <Helmet>
        <title>TELLABS Chemicals Partnership | ALBLOSHI</title>
        <meta name="description" content="Mohammad Abdulla Albloshi Trading Co. is the official regional partner and distributor for TELLABS specialty chemicals across Saudi Arabia and the GCC." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero tellabs-hero" style={{
        backgroundImage: "linear-gradient(135deg, rgba(5,25,55,0.9) 0%, rgba(14,108,196,0.75) 100%), url('https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80')"
      }}>
        <div className="container">
          <h1>TELLABS Chemicals Alliance</h1>
          <p>Official regional distribution partnership delivering advanced, European-technology chemical formulations across Saudi Arabia &amp; the GCC.</p>
        </div>
      </section>

      {/* About & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="tc-split-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 className="section-title text-left" style={{ marginBottom: '1.5rem' }}>Intelligent Chemical Solutions</h2>
              <p className="large-para" style={{ marginBottom: '1.5rem' }}>
                TELLABS Specialty Chemicals is a pioneer in Intelligent Chemicals, with advanced technology from leading research centers in <strong>France, Netherlands, &amp; Spain</strong> — delivering world-class specialty formulations for complex industrial operations.
              </p>
              <p className="large-para" style={{ marginBottom: 0 }}>
                All facilities hold <strong>ISO 9001</strong> certification, backed by 153 researchers, sales engineers, and chemical technicians focused on eco-friendly, performance-driven process chemistries.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(145deg, #0b2246 0%, #1e3a60 100%)',
              padding: '3rem',
              borderRadius: '24px',
              color: 'white',
              boxShadow: '0 20px 40px rgba(11,34,70,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>Our Business Philosophy</h3>

              {[
                { icon: 'architecture', title: 'Problem Solving',          desc: 'We engineer bespoke solutions to resolve scaling, foam, and separation blocks — succeeding where others fail.' },
                { icon: 'trending_up', title: 'Real Return on Investment', desc: 'Every program is validated by return logs to ensure concrete energy, water, and material cost savings.' },
                { icon: 'school',      title: 'Continuous Learning',       desc: 'We integrate the latest chemical technologies and process models to stay ahead and deliver smarter solutions.' },
              ].map((item, i) => (
                <div key={item.title} style={{ marginBottom: i < 2 ? '1.75rem' : 0 }}>
                  <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)' }}>
                    <span className="material-icons">{item.icon}</span> {item.title}
                  </h4>
                  <p className="large-para" style={{ color: 'white', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="focus-label">CAPABILITIES</span>
            <h2 className="section-title center">Specialty Chemistry Segments</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>Delivering highly optimized formulations across key industrial processing and water systems.</p>
          </div>

          <div className="tc-segments-grid">
            {[
              { title: 'Water Treatment',  icon: 'water_drop', desc: 'Scale/corrosion inhibitors, boiler/cooling tower chemicals, RO antiscalants, and wastewater polymers.' },
              { title: 'Metal Treatment',  icon: 'build',      desc: 'Process chemistry for surface pre-treatment, rust prevention, cleaning, and electroplating.' },
              { title: 'Pulp & Paper',     icon: 'waves',      desc: 'Retention and drainage polymers, pulp defoamers, coating aids, and stickies control formulations.' },
              { title: 'Activated Carbon', icon: 'filter_alt', desc: 'High-iodine granular and powdered carbon products for air/water purification and municipal filtration.' },
              { title: 'Wood Treatment',   icon: 'forest',     desc: 'Specialized additives and chemical formulations for wood preservation, protection, and processing.' },
            ].map(seg => (
              <Link key={seg.title} to="/intelligent-chemicals" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'center', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(27,95,175,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: 'rgba(27,95,175,0.08)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.6rem' }}>{seg.icon}</span>
                  </div>
                  <h3 style={{ color: 'var(--color-dark)', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', fontWeight: 700, marginBottom: '0.75rem' }}>{seg.title}</h3>
                  <p className="large-para" style={{ margin: 0 }}>{seg.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="focus-label">GLOBAL COLLABORATORS</span>
            <h2 className="section-title center">Technology Transfers &amp; Partnerships</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>
              TELLABS collaborators and technology transfers include major multinational corporations, chosen specifically for their world leadership position and technological superiority.
            </p>
          </div>

          <div className="tc-collab-grid">
            {[
              { name: 'Alma Ingenierie, France', specialty: 'Advanced chemical engineering & process design.' },
              { name: 'Dresser Wayne, USA',       specialty: 'Precision liquid metering & fluid control systems.' },
              { name: 'Buckman, USA',             specialty: 'Pulp & paper process polymers & cooling biocide systems.' },
              { name: 'Degussa, Germany',         specialty: 'Specialty catalyst development & industrial adsorbents.' },
              { name: 'Whessoe-Varec, UK',        specialty: 'Liquid storage safety instrumentation & tank telemetry.' },
              { name: 'Avery Hardoll, UK',        specialty: 'High-flow bulk aviation fueling equipment & filtration.' },
            ].map(collab => (
              <div key={collab.name} style={{ background: 'var(--color-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-dark)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', marginBottom: '0.5rem' }}>{collab.name}</h4>
                <p className="large-para" style={{ margin: 0 }}>{collab.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Clients */}
      <section className="section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container">
          <div className="tc-split-grid">

            {/* Left: Quotes */}
            <div>
              <span className="focus-label">WHAT CUSTOMERS SAY</span>
              <h2 className="section-title text-left" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>Industry Trust</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { quote: '"The problem has no solution, if TELLABS has no solutions to offer."', cite: 'Century Pulp & Paper Mills' },
                  { quote: '"TELLABS is the latest resort for any non-solvable specialty chemical problems."', cite: 'Anonymous Client Corporation' },
                ].map(({ quote, cite }) => (
                  <blockquote key={cite} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)', margin: 0 }}>
                    <p className="large-para" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{quote}</p>
                    <cite style={{ fontWeight: 700, color: 'var(--color-primary)', fontStyle: 'normal' }}>— {cite}</cite>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Right: Key Clients */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0,0,0,0.04)' }}>
              <span className="focus-label">GLOBAL CLIENT FOOTPRINT</span>
              <h3 style={{ color: 'var(--color-dark)', fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>Trusted in Primary Sectors</h3>
              <div className="tc-clients-grid">
                {['BASF (India) Limited', 'Tata Chemicals', 'IOCL (Indian Oil Corp.)', 'Aditya Birla Group', 'Everest Industries', 'Aryan Coal'].map(client => (
                  <div key={client} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontWeight: 600, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>verified</span>
                    <span className="large-para" style={{ margin: 0 }}>{client}</span>
                  </div>
                ))}
              </div>
              <p className="large-para" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
                Through Mohammad Abdulla Albloshi Trading Co., regional Saudi and GCC enterprises access this global supplier network and technical engineering resources locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>Ready to Elevate Your Operations?</h2>
                <p>Partner with TELLABS Chemicals for industry-leading specialty solutions, sustainable technologies, and exceptional technical support.</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">Contact Our Experts</Link>
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

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
        position: 'relative',
        padding: '8rem 0',
        backgroundImage: "url('https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(5, 25, 55, 0.9) 0%, rgba(14, 108, 196, 0.75) 100%)',
          zIndex: 1
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>TELLABS Chemicals Alliance</h1>
          <p className="hero-subtitle" style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Official regional distribution partnership delivering advanced, European-technology chemical formulations across Saudi Arabia &amp; the GCC.
          </p>
        </div>
      </section>

      {/* About & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="about-partner-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="about-content">
              <span className="focus-label">ABOUT TELLABS</span>
              <h2 className="section-title text-left" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Intelligent Chemical Solutions</h2>
              <p className="large-para" style={{ marginBottom: '1.5rem', color: 'var(--color-body)', lineHeight: 1.7 }}>
                TELLABS Specialty Chemicals is a pioneer in the business of Intelligent Chemicals. With advanced technology sourced from leading research centers in <strong>France, Netherlands, &amp; Spain</strong>, TELLABS offers world-class specialty formulations designed to optimize complex industrial operations.
              </p>
              <p style={{ marginBottom: 0, color: 'var(--color-body)', lineHeight: 1.7 }}>
                All manufacturing facilities are certified to strict <strong>ISO 9001</strong> standards. Supported by a 153-strong team of researchers, sales engineers, and chemical technicians, TELLABS works continuously to create eco-friendly and performance-driven process chemistries.
              </p>
            </div>

            <div className="philosophy-box" style={{
              background: 'linear-gradient(145deg, #0b2246 0%, #1e3a60 100%)',
              padding: '3rem',
              borderRadius: '24px',
              color: 'white',
              boxShadow: '0 20px 40px rgba(11,34,70,0.15)'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>Our Business Philosophy</h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}><span className="material-icons">architecture</span> Problem Solving</h4>
                <p style={{ opacity: 0.85, fontSize: '0.94rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  Our primary focus is solving chronic system problems. <strong>We succeed where others fail.</strong> We diagnose system failures and engineer bespoke chemical solutions to resolve scaling, foam, or separation blocks.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}><span className="material-icons">trending_up</span> Real Return on Investment</h4>
                <p style={{ opacity: 0.85, fontSize: '0.94rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  <strong>We make profit for our customers or do not do business.</strong> Every program we deploy is validated by financial and operational return logs to ensure concrete energy, water, or material cost savings.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}><span className="material-icons">school</span> Continuous Learning</h4>
                <p style={{ opacity: 0.85, fontSize: '0.94rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  We keep ahead by integrating continuous learning in the latest chemical technologies, process models, and management effectiveness tools.
                </p>
              </div>
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
            <p className="large-para" style={{ maxWidth: '700px', margin: '0.5rem auto 0' }}>Delivering highly optimized formulations across key industrial processing and water systems.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Water Treatment', icon: 'water_drop', desc: 'Scale/corrosion inhibitors, boiler/cooling tower chemicals, RO antiscalants, and wastewater polymers.' },
              { title: 'Metal Treatment', icon: 'build', desc: 'Process chemistry for surface pre-treatment, rust prevention, cleaning, and electroplating.' },
              { title: 'Pulp & Paper', icon: 'waves', desc: 'Retention and drainage polymers, pulp defoamers, coating aids, and stickies control formulations.' },
              { title: 'Activated Carbon', icon: 'filter_alt', desc: 'High-iodine granular and powdered carbon products for air/water purification and municipal filtration.' },
              { title: 'Wood Treatment', icon: 'forest', desc: 'Specialized additives and chemical formulations for wood preservation, protection, and processing.' },
            ].map(seg => (
              <div key={seg.title} style={{
                background: 'white',
                padding: '2.5rem 1.75rem',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.03)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(27,95,175,0.08)',
                  color: 'var(--color-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <span className="material-icons" style={{ fontSize: '1.6rem' }}>{seg.icon}</span>
                </div>
                <h3 style={{ color: 'var(--color-dark)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{seg.title}</h3>
                <p style={{ color: 'var(--color-body)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{seg.desc}</p>
              </div>
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
            <p className="large-para" style={{ maxWidth: '800px', margin: '0.5rem auto 0' }}>
              TELLABS collaborators and technology transfers include major multinational corporations, chosen specifically for their world leadership position and technological superiority.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Alma Ingenierie, France', specialty: 'Advanced chemical engineering & process design.' },
              { name: 'Dresser Wayne, USA', specialty: 'Precision liquid metering & fluid control systems.' },
              { name: 'Buckman, USA', specialty: 'Pulp & paper process polymers & cooling biocide systems.' },
              { name: 'Degussa, Germany', specialty: 'Specialty catalyst development & industrial adsorbents.' },
              { name: 'Whessoe-Varec, UK', specialty: 'Liquid storage safety instrumentation & tank telemetry.' },
              { name: 'Avery Hardoll, UK', specialty: 'High-flow bulk aviation fueling equipment & filtration.' },
            ].map(collab => (
              <div key={collab.name} style={{
                background: 'var(--color-light)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid var(--color-border)'
              }}>
                <h4 style={{ color: 'var(--color-dark)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{collab.name}</h4>
                <p style={{ color: 'var(--color-body)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{collab.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Clients */}
      <section className="section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
            
            {/* Left: Quotes */}
            <div>
              <span className="focus-label">WHAT CUSTOMERS SAY</span>
              <h2 className="section-title text-left" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>Industry Trust</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <blockquote style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.03)',
                  margin: 0
                }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-dark)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    "The problem has no solution, if TELLABS has no solutions to offer."
                  </p>
                  <cite style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.92rem', fontStyle: 'normal' }}>
                    — Century Pulp &amp; Paper Mills
                  </cite>
                </blockquote>

                <blockquote style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.03)',
                  margin: 0
                }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-dark)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    "TELLABS is the latest resort for any non-solvable specialty chemical problems."
                  </p>
                  <cite style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.92rem', fontStyle: 'normal' }}>
                    — Anonymous Client Corporation
                  </cite>
                </blockquote>
              </div>
            </div>

            {/* Right: Key Clients */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0,0,0,0.04)' }}>
              <span className="focus-label">GLOBAL CLIENT FOOTPRINT</span>
              <h3 style={{ color: 'var(--color-dark)', fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>Trusted in Primary Sectors</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  'BASF (India) Limited',
                  'Tata Chemicals',
                  'IOCL (Indian Oil Corp.)',
                  'Aditya Birla Group',
                  'Everest Industries',
                  'Aryan Coal',
                ].map(client => (
                  <div key={client} style={{
                    padding: '1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span className="material-icons" style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>verified</span>
                    {client}
                  </div>
                ))}
              </div>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--color-body)', marginTop: '2rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                Through Mohammad Abdulla Albloshi Trading Co., regional Saudi and GCC enterprises access this global supplier network and technical engineering resources locally.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
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

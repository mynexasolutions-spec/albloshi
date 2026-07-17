import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const PHILOSOPHY = [
  { icon: 'architecture', titleKey: 'tc_phil1_title', descKey: 'tc_phil1_desc' },
  { icon: 'trending_up', titleKey: 'tc_phil2_title', descKey: 'tc_phil2_desc' },
  { icon: 'school', titleKey: 'tc_phil3_title', descKey: 'tc_phil3_desc' },
];

const SEGMENTS = [
  { titleKey: 'tc_seg1_title', icon: 'water_drop', descKey: 'tc_seg1_desc' },
  { titleKey: 'tc_seg2_title', icon: 'build', descKey: 'tc_seg2_desc' },
  { titleKey: 'tc_seg3_title', icon: 'waves', descKey: 'tc_seg3_desc' },
  { titleKey: 'tc_seg4_title', icon: 'filter_alt', descKey: 'tc_seg4_desc' },
  { titleKey: 'tc_seg5_title', icon: 'forest', descKey: 'tc_seg5_desc' },
];

const COLLABORATORS = [
  { name: 'Alma Ingenierie, France', specialtyKey: 'tc_collab1_specialty' },
  { name: 'Dresser Wayne, USA', specialtyKey: 'tc_collab2_specialty' },
  { name: 'Buckman, USA', specialtyKey: 'tc_collab3_specialty' },
  { name: 'Degussa, Germany', specialtyKey: 'tc_collab4_specialty' },
  { name: 'Whessoe-Varec, UK', specialtyKey: 'tc_collab5_specialty' },
  { name: 'Avery Hardoll, UK', specialtyKey: 'tc_collab6_specialty' },
];

const CLIENTS = ['BASF (India) Limited', 'Tata Chemicals', 'IOCL (Indian Oil Corp.)', 'Aditya Birla Group', 'Everest Industries', 'Aryan Coal'];

export default function TellabsChemicals() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('tc_meta_title')}</title>
        <meta name="description" content={t('tc_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero tellabs-hero" style={{
        backgroundImage: "linear-gradient(135deg, rgba(5,25,55,0.9) 0%, rgba(14,108,196,0.75) 100%), url('https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80')"
      }}>
        <div className="container">
          <h1>{t('tc_hero_title')}</h1>
          <p>{t('tc_hero_desc')}</p>
        </div>
      </section>

      {/* About & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="tc-split-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 className="section-title text-left" style={{ marginBottom: '1.5rem' }}>{t('tc_about_title')}</h2>
              <p className="large-para" style={{ marginBottom: '1.5rem' }}>
                {t('tc_about_p1_before')} <strong>{t('tc_about_p1_strong')}</strong> {t('tc_about_p1_after')}
              </p>
              <p className="large-para" style={{ marginBottom: 0 }}>
                {t('tc_about_p2_before')} <strong>{t('tc_about_p2_strong')}</strong> {t('tc_about_p2_after')}
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
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>{t('tc_philosophy_title')}</h3>

              {PHILOSOPHY.map((item, i) => (
                <div key={item.titleKey} style={{ marginBottom: i < 2 ? '1.75rem' : 0 }}>
                  <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)' }}>
                    <span className="material-icons">{item.icon}</span> {t(item.titleKey)}
                  </h4>
                  <p className="large-para" style={{ color: 'white', margin: 0 }}>{t(item.descKey)}</p>
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
            <span className="focus-label">{t('tc_capabilities_label')}</span>
            <h2 className="section-title center">{t('tc_segments_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('tc_segments_desc')}</p>
          </div>

          <div className="tc-segments-grid">
            {SEGMENTS.map(seg => (
              <Link key={seg.titleKey} to="/intelligent-chemicals" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'center', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(27,95,175,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: 'rgba(27,95,175,0.08)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.6rem' }}>{seg.icon}</span>
                  </div>
                  <h3 style={{ color: 'var(--color-dark)', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', fontWeight: 700, marginBottom: '0.75rem' }}>{t(seg.titleKey)}</h3>
                  <p className="large-para" style={{ margin: 0 }}>{t(seg.descKey)}</p>
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
            <span className="focus-label">{t('tc_collab_label')}</span>
            <h2 className="section-title center">{t('tc_collab_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>
              {t('tc_collab_desc')}
            </p>
          </div>

          <div className="tc-collab-grid">
            {COLLABORATORS.map(collab => (
              <div key={collab.name} style={{ background: 'var(--color-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-dark)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', marginBottom: '0.5rem' }}>{collab.name}</h4>
                <p className="large-para" style={{ margin: 0 }}>{t(collab.specialtyKey)}</p>
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
              <span className="focus-label">{t('tc_customers_label')}</span>
              <h2 className="section-title text-left" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>{t('tc_trust_title')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { quoteKey: 'tc_quote1', citeKey: 'tc_quote1_cite' },
                  { quoteKey: 'tc_quote2', citeKey: 'tc_quote2_cite' },
                ].map(({ quoteKey, citeKey }) => (
                  <blockquote key={quoteKey} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)', margin: 0 }}>
                    <p className="large-para" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{t(quoteKey)}</p>
                    <cite style={{ fontWeight: 700, color: 'var(--color-primary)', fontStyle: 'normal' }}>— {t(citeKey)}</cite>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Right: Key Clients */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0,0,0,0.04)' }}>
              <span className="focus-label">{t('tc_clients_label')}</span>
              <h3 style={{ color: 'var(--color-dark)', fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{t('tc_clients_title')}</h3>
              <div className="tc-clients-grid">
                {CLIENTS.map(client => (
                  <div key={client} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontWeight: 600, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>verified</span>
                    <span className="large-para" style={{ margin: 0 }}>{client}</span>
                  </div>
                ))}
              </div>
              <p className="large-para" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
                {t('tc_clients_footer_text')}
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
                <h2>{t('tc_cta_title')}</h2>
                <p>{t('tc_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('tc_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('tc_cta_btn2')}</Link>
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

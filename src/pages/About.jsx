import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const STATS = [
  { value: '8+', labelKey: 'about_stat_years_label' },
  { value: '100+', labelKey: 'about_stat_containers_label' },
  { value: '5+', labelKey: 'about_stat_cities_label' },
  { value: '4', labelKey: 'about_stat_divisions_label' },
];

const VALUES = [
  { icon: 'verified', titleKey: 'about_value_quality_title', descKey: 'about_value_quality_desc' },
  { icon: 'handshake', titleKey: 'about_value_partnerships_title', descKey: 'about_value_partnerships_desc' },
  { icon: 'local_shipping', titleKey: 'about_value_excellence_title', descKey: 'about_value_excellence_desc' },
  { icon: 'groups', titleKey: 'about_value_people_title', descKey: 'about_value_people_desc' },
  { icon: 'eco', titleKey: 'about_value_sustainability_title', descKey: 'about_value_sustainability_desc' },
  { icon: 'emoji_events', titleKey: 'about_value_trackrecord_title', descKey: 'about_value_trackrecord_desc' },
];

const TEAM = [
  { id: 1, name: 'Mohammad Abdulla Albloshi', roleKey: 'about_team_1_role', bioKey: 'about_team_1_bio' },
  { id: 2, name: 'Mohammad Riaz', roleKey: 'about_team_2_role', bioKey: 'about_team_2_bio' },
  { id: 3, name: 'Eng. Fahad Al-Mutairi', roleKey: 'about_team_3_role', bioKey: 'about_team_3_bio' },
];

const NETWORK_CARDS = [
  { cls: 'card-dammam', titleKey: 'about_network_dammam_title', subKey: 'about_network_dammam_sub' },
  { cls: 'card-khobar', titleKey: 'about_network_khobar_title', subKey: 'about_network_khobar_sub' },
  { cls: 'card-jubail', titleKey: 'about_network_jubail_title', subKey: 'about_network_jubail_sub' },
  { cls: 'card-other', titleKey: 'about_network_other_title', subKey: 'about_network_other_sub' },
];

const HIGHLIGHT_KEYS = ['about_story_highlight_1', 'about_story_highlight_2', 'about_story_highlight_3', 'about_story_highlight_4'];

export default function About() {
  const { t } = useLanguage();

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
        <title>{t('about_meta_title')}</title>
        <meta name="description" content={t('about_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="about-page-hero">
        <div className="about-page-hero-overlay"></div>
        <div className="container">
          <div className="about-page-hero-content">
            <h1>{t('about_hero_title_l1')}<br />{t('about_hero_title_l2')}</h1>
            <p>{t('about_hero_desc')}</p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {STATS.map(s => (
              <div key={s.labelKey} className="about-stat-item">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{t(s.labelKey)}</span>
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
                    <strong>{t('about_story_cr_label')}</strong>
                    <span>7049763092</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-story-text-col about-reveal">
              <span className="focus-label">{t('about_story_label')}</span>
              <p className="large-para">{t('about_story_p1')}</p>
              <p className="large-para">{t('about_story_p2_before')} <strong>{t('about_story_p2_strong')}</strong> {t('about_story_p2_after')}</p>
              <div className="about-story-highlights">
                {HIGHLIGHT_KEYS.map(k => (
                  <div key={k} className="about-story-highlight-item">
                    <span className="material-icons" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>check_circle</span>
                    <span>{t(k)}</span>
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
              <h3>{t('about_mv_mission_title')}</h3>
              <p>{t('about_mv_mission_desc')}</p>
            </div>
            <div className="about-mv-card about-mv-card--vision about-reveal">
              <div className="about-mv-icon"><span className="material-icons">visibility</span></div>
              <h3>{t('about_mv_vision_title')}</h3>
              <p>{t('about_mv_vision_desc')}</p>
            </div>
            <div className="about-mv-card about-reveal">
              <div className="about-mv-icon"><span className="material-icons">star</span></div>
              <h3>{t('about_mv_promise_title')}</h3>
              <p>{t('about_mv_promise_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--color-light)' }}>
        <div className="container">
          <div className="text-center">
            <span className="focus-label">{t('about_values_label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{t('about_values_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>{t('about_values_desc')}</p>
          </div>
          <div className="about-values-grid">
            {VALUES.map(v => (
              <div key={v.titleKey} className="about-value-card about-reveal">
                <div className="about-value-icon"><span className="material-icons">{v.icon}</span></div>
                <h4>{t(v.titleKey)}</h4>
                <p>{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="team-section section-padding">
        <div className="container">
          <div className="text-center">
            <span className="focus-label">{t('about_team_label')}</span>
            <h2 className="section-title center">{t('about_team_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>{t('about_team_desc')}</p>
          </div>
          <div className="team-grid">
            {TEAM.map(m => (
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
                  <div className="team-role">{t(m.roleKey)}</div>
                  <p className="team-bio">{t(m.bioKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Network — same as Home page */}
      <section id="network" className="network-hero bg-dark-section">
        <div className="container relative z-10 text-center">
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>{t('about_network_title')}</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{t('about_network_desc')}</p>
          <div className="network-interactive-map">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {NETWORK_CARDS.map(c => (
              <div key={c.cls} className={`map-floating-card ${c.cls}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{t(c.titleKey)}</h4>
                  <span>{t(c.subKey)}</span>
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
                <h2>{t('about_cta_title')}</h2>
                <p>{t('about_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('about_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('about_cta_btn2')}</Link>
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

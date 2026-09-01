import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { fetchTeamMembers, DEFAULT_TEAM } from '../lib/teamDefaults';
import { fetchVerticalContent } from '../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../lib/verticalDefaults/about';
import { DEFAULTS as SETTINGS_DEFAULTS, fetchSiteSettings } from '../lib/siteSettingsDefaults';

export default function About() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];

  const [team, setTeam] = useState(DEFAULT_TEAM);
  useEffect(() => {
    let cancelled = false;
    fetchTeamMembers(supabase).then(data => { if (!cancelled) setTeam(data); });
    return () => { cancelled = true; };
  }, []);

  const [content, setContent] = useState(DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchVerticalContent(supabase, 'about', DEFAULTS, SECTIONS).then(merged => {
      if (!cancelled) setContent(merged);
    });
    return () => { cancelled = true; };
  }, []);

  const [settings, setSettings] = useState(SETTINGS_DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(supabase).then(s => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

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

  const [activeVertical, setActiveVertical] = useState('all');
  const filteredTeam = activeVertical === 'all'
    ? team
    : team.filter(m => m.categories?.includes(activeVertical));

  return (
    <>
      <Helmet>
        <title>{t('about_meta_title')}</title>
        <meta name="description" content={t('about_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="about-page-hero" style={{ backgroundImage: `url('${content.hero.image}')` }}>
        <div className="about-page-hero-overlay"></div>
        <div className="container">
          <div className="about-page-hero-content">
            <h1>{L(content.hero, 'title_l1')}<br />{L(content.hero, 'title_l2')}</h1>
            <p>{L(content.hero, 'desc')}</p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {content.stats.map((s, i) => (
              <div key={i} className="about-stat-item">
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{L(s, 'label')}</span>
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
                <img src={content.story.image} alt="Albloshi industrial supply" />
                <div className="about-story-badge">
                  <span className="material-icons">verified</span>
                  <div>
                    <strong>{L(content.story, 'cr_label')}</strong>
                    <span>{settings.cr_number}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-story-text-col about-reveal">
              <span className="focus-label">{L(content.story, 'label')}</span>
              <p className="large-para">{L(content.story, 'p1')}</p>
              <p className="large-para">{L(content.story, 'p2_before')} <strong>{L(content.story, 'p2_strong')}</strong> {L(content.story, 'p2_after')}</p>
              <div className="about-story-highlights">
                {content.story.highlights.map((h, i) => (
                  <div key={i} className="about-story-highlight-item">
                    <span className="material-icons" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>check_circle</span>
                    <span>{h[language]}</span>
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
              <h3>{L(content.mv, 'mission_title')}</h3>
              <p>{L(content.mv, 'mission_desc')}</p>
            </div>
            <div className="about-mv-card about-mv-card--vision about-reveal">
              <div className="about-mv-icon"><span className="material-icons">visibility</span></div>
              <h3>{L(content.mv, 'vision_title')}</h3>
              <p>{L(content.mv, 'vision_desc')}</p>
            </div>
            <div className="about-mv-card about-reveal">
              <div className="about-mv-icon"><span className="material-icons">star</span></div>
              <h3>{L(content.mv, 'promise_title')}</h3>
              <p>{L(content.mv, 'promise_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--color-light)' }}>
        <div className="container">
          <div className="text-center">
            <span className="focus-label">{L(content.values, 'label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{L(content.values, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>{L(content.values, 'desc')}</p>
          </div>
          <div className="about-values-grid">
            {content.values.items.map((v, i) => (
              <div key={i} className="about-value-card about-reveal">
                <div className="about-value-icon"><span className="material-icons">{v.icon}</span></div>
                <h4>{L(v, 'title')}</h4>
                <p>{L(v, 'desc')}</p>
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
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 2.5rem' }}>{t('about_team_desc')}</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mp-filter-tabs" style={{ marginBottom: '3rem' }}>
            <button
              className={`mp-tab-btn ${activeVertical === 'all' ? 'active' : ''}`}
              onClick={() => setActiveVertical('all')}
            >
              <span className="material-icons">apps</span>
              <span>{t('about_team_vertical_all')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeVertical === 'chemical' ? 'active' : ''}`}
              onClick={() => setActiveVertical('chemical')}
            >
              <span className="material-icons">science</span>
              <span>{t('about_team_vertical_chemical')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeVertical === 'industrial' ? 'active' : ''}`}
              onClick={() => setActiveVertical('industrial')}
            >
              <span className="material-icons">settings</span>
              <span>{t('about_team_vertical_industrial')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeVertical === 'food' ? 'active' : ''}`}
              onClick={() => setActiveVertical('food')}
            >
              <span className="material-icons">restaurant</span>
              <span>{t('about_team_vertical_food')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeVertical === 'manpower' ? 'active' : ''}`}
              onClick={() => setActiveVertical('manpower')}
            >
              <span className="material-icons">engineering</span>
              <span>{t('about_team_vertical_manpower')}</span>
            </button>
          </div>

          <div className="team-grid">
            {filteredTeam.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  {m.image ? (
                    <img src={m.image} alt={L(m, 'name')} className="team-img" style={{ objectFit: 'cover' }} />
                  ) : (
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
                  )}
                </div>
                <div className="team-info">
                  <h3>{L(m, 'name')}</h3>
                  <div className="team-role">{L(m, 'role')}</div>
                  <p className="team-bio">{L(m, 'bio')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Network — same as Home page */}
      <section id="network" className="network-hero bg-dark-section">
        <div className="container relative z-10 text-center">
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>{L(content.network, 'title')}</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{L(content.network, 'desc')}</p>
          <div className="network-interactive-map">
            <img src={content.network.map_image} alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {content.network.cards.map((c, i) => (
              <div key={c.position_class ?? i} className={`map-floating-card ${c.position_class}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{L(c, 'title')}</h4>
                  <span>{L(c, 'sub')}</span>
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
                <h2>{L(content.cta, 'title')}</h2>
                <p>{L(content.cta, 'desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to={content.cta.btn1_href} className="btn btn-primary">{L(content.cta, 'btn1')}</Link>
                <Link to={content.cta.btn2_href} className="btn btn-outline">{L(content.cta, 'btn2')}</Link>
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

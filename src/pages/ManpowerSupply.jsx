import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { fetchVerticalContent } from '../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../lib/verticalDefaults/manpower';
import { DEFAULTS as SETTINGS_DEFAULTS, fetchSiteSettings } from '../lib/siteSettingsDefaults';

const MANPOWER_TEAM = [
  { id: 9, name: 'Ahsan Jafri', roleKey: 'team_manpower_ahsan_role', bioKey: 'team_manpower_ahsan_bio', img: '/images/team/Ahsan Jafri.jpg' },
];

export default function ManpowerSupply() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [content, setContent] = useState(DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchVerticalContent(supabase, 'manpower', DEFAULTS, SECTIONS).then(merged => {
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

  const manpowerItems = content.items;

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('mp-card-highlight');
          setTimeout(() => element.classList.remove('mp-card-highlight'), 2500);
        }, 300);
      }
    }
  }, [location]);

  const filteredItems = activeTab === 'all'
    ? manpowerItems
    : manpowerItems.filter(item => item.category === activeTab);

  const features = content.features.items;

  return (
    <div className="manpower-page">
      <Helmet>
        <title>Manpower Solutions | Mohammed Abdulla Al Bloshi Co</title>
        <meta
          name="description"
          content="Albloshi supports industrial, construction and maintenance projects with flexible manpower supply for short-term, long-term and shutdown requirements across KSA."
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="mp-hero-wrapper">
        <div className="container">
          <div className="mp-hero-grid">
            <div className="mp-hero-text">
              <div className="mp-subtitle-badge">
                <span className="mp-subtitle-dash"></span>
                <span>{L(content.hero, 'badge')}</span>
              </div>
              <h1 className="mp-hero-title">
                {L(content.hero, 'title1')}{' '}
                <span>{L(content.hero, 'title2')}</span>
              </h1>
              <p className="mp-hero-desc">
                {L(content.hero, 'desc')}
              </p>
              <div className="mp-hero-actions">
                <a href={`tel:${settings.phone}`} className="mp-phone-pill">
                  <span className="material-icons">phone_in_talk</span>
                  <span>{settings.phone_display}</span>
                </a>
              </div>
            </div>

            <div className="mp-hero-img-card">
              <img
                src={content.hero.image}
                alt="Manpower Solutions"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main 12 Cards Grid Section */}
      <section className="mp-main-cards-section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="mp-filter-tabs">
            <button
              className={`mp-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span className="material-icons">apps</span>
              <span>All Manpower Solutions</span>
            </button>
            <button
              className={`mp-tab-btn ${activeTab === 'skilled' ? 'active' : ''}`}
              onClick={() => setActiveTab('skilled')}
            >
              <span className="material-icons">construction</span>
              <span>{L(content.hero, 'skilled_label')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeTab === 'unskilled' ? 'active' : ''}`}
              onClick={() => setActiveTab('unskilled')}
            >
              <span className="material-icons">groups</span>
              <span>{L(content.hero, 'unskilled_label')}</span>
            </button>
          </div>

          {/* Responsive Cards Grid */}
          <div className="products-grid mp-12-cards-grid">
            {filteredItems.map((item) => (
              <div key={item.id} id={item.id} className="product-block">
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={L(item, 'title')}
                    className="product-block-img"
                    loading="lazy"
                  />
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">
                    {item.category === 'skilled' ? L(content.hero, 'skilled_label') : L(content.hero, 'unskilled_label')}
                  </span>
                  <h3>{L(item, 'title')}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                    <button
                      onClick={() => setSelectedProduct({
                        title: L(item, 'title'),
                        desc: L(item, 'desc'),
                        tag: item.category === 'skilled' ? L(content.hero, 'skilled_label') : L(content.hero, 'unskilled_label'),
                        img: item.image,
                        specs: item[`specs_${language}`] ?? [],
                      })}
                      className="product-block-btn"
                      style={{
                        background: 'transparent',
                        color: 'var(--color-primary)',
                        border: '1.5px solid var(--color-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '1 1 0%',
                        padding: '0.5rem',
                        fontSize: '0.85rem'
                      }}>
                      Read More
                    </button>
                    <a
                      href="/contact"
                      className="product-block-btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '1 1 0%',
                        padding: '0.5rem',
                        fontSize: '0.85rem'
                      }}>
                      <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                      {t('food_get_quote') || 'Get Quote'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Row */}
      <section className="mp-features-section">
        <div className="container">
          <div className="mp-features-grid">
            {features.map((feat, i) => (
              <div key={i} className="mp-feature-card">
                <div className="mp-feature-icon-badge">
                  <span className="material-icons">{feat.icon}</span>
                </div>
                <h3 className="mp-feature-title">{L(feat, 'title')}</h3>
                <div className="mp-feature-line"></div>
                <p className="mp-feature-desc">{L(feat, 'desc')}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <section className="team-section section-padding" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)', marginTop: '4rem' }}>
            <div className="container">
              <div className="text-center" style={{ marginBottom: '3.5rem' }}>
                <span className="focus-label">{t('about_team_label')}</span>
                <h2 className="section-title center">{t('manpower_team_title')}</h2>
                <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('manpower_team_desc')}</p>
              </div>
              <div className="team-grid">
                {MANPOWER_TEAM.map(m => (
                  <div key={m.id} className="team-card">
                    <div className="team-img-wrapper">
                      {m.img ? (
                        <img src={m.img} alt={m.name} className="team-img" style={{ objectFit: 'cover' }} />
                      ) : (
                        <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id={`avatarGradMan${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f8fafc" />
                              <stop offset="100%" stopColor="#cbd5e1" />
                            </linearGradient>
                            <linearGradient id={`primaryGradMan${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#1B5FAF" />
                              <stop offset="100%" stopColor="#0b2246" />
                            </linearGradient>
                          </defs>
                          <rect width="100" height="100" fill={`url(#avatarGradMan${m.id})`} />
                          <circle cx="50" cy="40" r="18" fill={`url(#primaryGradMan${m.id})`} opacity="0.85" />
                          <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradMan${m.id})`} opacity="0.85" />
                        </svg>
                      )}
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

          {/* Contact CTA */}
          <div className="blog-cta-card" style={{ marginTop: '4rem' }}>
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{L(content.cta, 'title')}</h2>
                <p>{L(content.cta, 'desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <a href={content.cta.btn1_href} className="btn btn-primary">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>phone</span>
                  {t('global_cta_call')}
                </a>
                <a href={content.cta.btn2_href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>chat</span>
                  {t('global_cta_whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }} onClick={() => setSelectedProduct(null)}>
          <style>{`
            .modern-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .modern-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.05); 
              border-radius: 10px;
              margin: 4px;
            }
            .modern-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.2); 
              border-radius: 10px;
            }
            .modern-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.35); 
            }
            @media (max-width: 768px) {
              .product-block-body h3 {
                font-size: 1.12rem !important;
              }
            }
          `}</style>
          <div className="modern-scrollbar" style={{
            background: '#fff', borderRadius: '16px', overflow: 'hidden',
            maxWidth: '600px', width: '100%', maxHeight: '90vh',
            overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(255, 255, 255, 0.9)', border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <span className="material-icons" style={{ color: '#333' }}>close</span>
            </button>
            <div style={{ padding: '2rem' }}>
              <span className="product-block-tag" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{selectedProduct.tag}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>{selectedProduct.title}</h3>
              <p style={{ color: 'var(--color-body)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{selectedProduct.desc}</p>

              {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '0.75rem' }}>Specifications & Features</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedProduct.specs.map((sk, idx) => <span key={idx} className="spec-chip" style={{ margin: 0 }}>{sk}</span>)}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <a href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem 3rem' }}>
                  <span className="material-icons" style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>mail_outline</span>
                  {t('food_get_quote') || 'Get Quote'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { fetchVerticalContent } from '../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../lib/verticalDefaults/industrial';

const INDUSTRIAL_TEAM = [
  { id: 7, name: 'Mohammed Riaz', roleKey: 'about_team_2_role', bioKey: 'about_team_2_bio', img: '/images/team/MOHAMMED Riaz.jpg' },
  { id: 8, name: 'Mr. T.A. Khan', roleKey: 'team_industrial_khan_role', bioKey: 'team_industrial_khan_bio' },
];

export default function IndustrialServices() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [content, setContent] = useState(DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchVerticalContent(supabase, 'industrial', DEFAULTS, SECTIONS).then(merged => {
      if (!cancelled) setContent(merged);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('ind_meta_title')}</title>
        <meta name="description" content={t('ind_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(9, 20, 45, 0.88) 0%, rgba(14, 108, 196, 0.72) 100%), url(${content.hero.image})` }}>
        <div className="container">
          <h1>{L(content.hero, 'title_l1')}<br />{L(content.hero, 'title_l2')}</h1>
          <p>{L(content.hero, 'desc')}</p>
        </div>
      </section>

      {/* Stat Strip */}
      <div className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            {content.stats.map((s, i) => (
              <div key={i} className="stat-strip-item">
                <span className="stat-strip-num">{s.num}</span>
                <span className="stat-strip-label">{L(s, 'label')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{t('ind_products_title')}</h2>
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>{t('ind_products_desc')}</p>
          </div>
          <div className="products-grid">
            {content.products.map(p => (
              <div key={p.id} className="product-block" id={p.id}>
                <div style={{ position: 'relative' }}>
                  <img src={p.image} alt={L(p, 'title')} className="product-block-img" style={{ aspectRatio: '1/1' }} />
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">{L(p, 'tag')}</span>
                  <h3>{L(p, 'title')}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                    <button
                      onClick={() => setSelectedProduct({
                        title: L(p, 'title'),
                        desc: L(p, 'desc'),
                        tag: L(p, 'tag'),
                        specs: p[`specs_${language}`] ?? [],
                      })}
                      className="product-block-btn"
                      style={{ background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      Read More
                    </button>
                    <a href="/contact" className="product-block-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                      {t('ind_get_quote')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="capabilities-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{L(content.capabilities, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{L(content.capabilities, 'desc')}</p>
          </div>
          <div className="capabilities-grid">
            {content.capabilities.items.map((c, i) => (
              <div key={i} className="capability-card">
                <div className="capability-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{L(c, 'title')}</h3>
                <p>{L(c, 'desc')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section-padding" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="focus-label">{t('about_team_label')}</span>
            <h2 className="section-title center">{t('ind_team_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('ind_team_desc')}</p>
          </div>
          <div className="team-grid">
            {INDUSTRIAL_TEAM.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  {m.img ? (
                    <img src={m.img} alt={m.name} className="team-img" style={{ objectFit: 'cover' }} />
                  ) : (
                    <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`avatarGradInd${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>
                        <linearGradient id={`primaryGradInd${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1B5FAF" />
                          <stop offset="100%" stopColor="#0b2246" />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill={`url(#avatarGradInd${m.id})`} />
                      <circle cx="50" cy="40" r="18" fill={`url(#primaryGradInd${m.id})`} opacity="0.85" />
                      <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradInd${m.id})`} opacity="0.85" />
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

      {selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem'
        }}>
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
          }}>
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
                    {selectedProduct.specs.map(sk => <span key={sk} className="spec-chip" style={{ margin: 0 }}>{sk}</span>)}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <a href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem 3rem' }}>
                  <span className="material-icons" style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>mail_outline</span>
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

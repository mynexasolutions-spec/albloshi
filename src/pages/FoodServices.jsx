import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const STATS = [
  { num: '100+', labelKey: 'food_stat1_label' },
  { num: '5', labelKey: 'food_stat2_label' },
  { num: 'SFDA', labelKey: 'food_stat3_label' },
  { num: '2017', labelKey: 'food_stat4_label' },
];

const PRODUCTS = [
  {
    id: 'basmati-rice',
    img: '/images/products/premium_basmati_rice.webp',
    tagKey: 'food_prod1_tag',
    titleKey: 'food_prod1_title',
    descKey: 'food_prod1_desc',
    specKeys: ['food_prod1_spec1', 'food_prod1_spec2', 'food_prod1_spec3', 'food_prod1_spec4'],
  },
  {
    id: 'cooking-oil',
    img: '/images/products/refined_palm_cooking_oil.webp',
    tagKey: 'food_prod2_tag',
    titleKey: 'food_prod2_title',
    descKey: 'food_prod2_desc',
    specKeys: ['food_prod2_spec1', 'food_prod2_spec2', 'food_prod2_spec3', 'food_prod2_spec4'],
  },
  {
    id: 'restaurant-essentials',
    img: '/images/products/restaurant_essentials.webp',
    tagKey: 'food_prod3_tag',
    titleKey: 'food_prod3_title',
    descKey: 'food_prod3_desc',
    specKeys: ['food_prod3_spec1', 'food_prod3_spec2', 'food_prod3_spec3', 'food_prod3_spec4'],
  },
  {
    id: 'wholesale-grain',
    img: '/images/products/wholesale_grain_and_sugar.webp',
    tagKey: 'food_prod4_tag',
    titleKey: 'food_prod4_title',
    descKey: 'food_prod4_desc',
    specKeys: ['food_prod4_spec1', 'food_prod4_spec2', 'food_prod4_spec3', 'food_prod4_spec4'],
  },
  {
    id: 'pakistani-spices',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    tagKey: 'food_prod5_tag',
    titleKey: 'food_prod5_title',
    descKey: 'food_prod5_desc',
    specKeys: ['food_prod5_spec1', 'food_prod5_spec2', 'food_prod5_spec3', 'food_prod5_spec4'],
  },
];

const NEW_PRODUCTS = [
  {
    id: 'white-sugar',
    img: '/images/food_services/sugar.webp',
    tagKey: 'food_prod6_tag',
    titleKey: 'food_prod6_title',
    descKey: 'food_prod6_desc',
    specKeys: ['food_prod6_spec1', 'food_prod6_spec2', 'food_prod6_spec3', 'food_prod6_spec4']
  },
  {
    id: 'spices',
    img: '/images/food_services/spices.webp',
    tagKey: 'food_prod7_tag',
    titleKey: 'food_prod7_title',
    descKey: 'food_prod7_desc',
    specKeys: ['food_prod7_spec1', 'food_prod7_spec2', 'food_prod7_spec3', 'food_prod7_spec4']
  },
  {
    id: 'basmati-rice-new',
    img: '/images/food_services/Basmati_Rice.webp',
    tagKey: 'food_prod8_tag',
    titleKey: 'food_prod8_title',
    descKey: 'food_prod8_desc',
    specKeys: ['food_prod8_spec1', 'food_prod8_spec2', 'food_prod8_spec3', 'food_prod8_spec4']
  },
  {
    id: 'food-supply',
    img: '/images/food_services/FOOD_SUPPLY.webp',
    tagKey: 'food_prod9_tag',
    titleKey: 'food_prod9_title',
    descKey: 'food_prod9_desc',
    specKeys: ['food_prod9_spec1', 'food_prod9_spec2', 'food_prod9_spec3', 'food_prod9_spec4']
  },
  {
    id: 'custom-basmati',
    img: '/images/food_services/rice.webp',
    tagKey: 'food_prod10_tag',
    titleKey: 'food_prod10_title',
    descKey: 'food_prod10_desc',
    specKeys: ['food_prod10_spec1', 'food_prod10_spec2', 'food_prod10_spec3', 'food_prod10_spec4']
  },
  {
    id: 'palm-olein',
    img: '/images/food_services/Palm_Olein_Oil.webp',
    tagKey: 'food_prod11_tag',
    titleKey: 'food_prod11_title',
    descKey: 'food_prod11_desc',
    specKeys: ['food_prod11_spec1', 'food_prod11_spec2', 'food_prod11_spec3', 'food_prod11_spec4']
  },
  {
    id: 'steam-basmati',
    img: '/images/food_services/Steam_Basmati_Ric.webp',
    tagKey: 'food_prod12_tag',
    titleKey: 'food_prod12_title',
    descKey: 'food_prod12_desc',
    specKeys: ['food_prod12_spec1', 'food_prod12_spec2', 'food_prod12_spec3', 'food_prod12_spec4']
  },
  {
    id: 'golden-sella',
    img: '/images/food_services/Golden_Sell_Basmati_Rice.webp',
    tagKey: 'food_prod13_tag',
    titleKey: 'food_prod13_title',
    descKey: 'food_prod13_desc',
    specKeys: ['food_prod13_spec1', 'food_prod13_spec2', 'food_prod13_spec3', 'food_prod13_spec4']
  },
  {
    id: 'premium-1121',
    img: '/images/food_services/Premium_Basmati_Rice.webp',
    tagKey: 'food_prod14_tag',
    titleKey: 'food_prod14_title',
    descKey: 'food_prod14_desc',
    specKeys: ['food_prod14_spec1', 'food_prod14_spec2', 'food_prod14_spec3', 'food_prod14_spec4']
  },
  {
    id: 'honey',
    img: '/images/food_services/Pure_Natural_Honey.webp',
    tagKey: 'food_prod15_tag',
    titleKey: 'food_prod15_title',
    descKey: 'food_prod15_desc',
    specKeys: ['food_prod15_spec1', 'food_prod15_spec2', 'food_prod15_spec3', 'food_prod15_spec4']
  },
  {
    id: 'grains-pulses',
    img: '/images/food_services/Premium_Grains_&_Pulses.webp',
    tagKey: 'food_prod16_tag',
    titleKey: 'food_prod16_title',
    descKey: 'food_prod16_desc',
    specKeys: ['food_prod16_spec1', 'food_prod16_spec2', 'food_prod16_spec3', 'food_prod16_spec4']
  },
  {
    id: 'chicken',
    img: '/images/food_services/Fresh_&_Frozen_Chicken.webp',
    tagKey: 'food_prod17_tag',
    titleKey: 'food_prod17_title',
    descKey: 'food_prod17_desc',
    specKeys: ['food_prod17_spec1', 'food_prod17_spec2', 'food_prod17_spec3', 'food_prod17_spec4']
  },
  {
    id: 'eggs',
    img: '/images/food_services/Farm_Fresh_Table_Eggs.webp',
    tagKey: 'food_prod18_tag',
    titleKey: 'food_prod18_title',
    descKey: 'food_prod18_desc',
    specKeys: ['food_prod18_spec1', 'food_prod18_spec2', 'food_prod18_spec3', 'food_prod18_spec4']
  },
  {
    id: 'coffee',
    img: '/images/food_services/Premium_Coffee_Beans.webp',
    tagKey: 'food_prod19_tag',
    titleKey: 'food_prod19_title',
    descKey: 'food_prod19_desc',
    specKeys: ['food_prod19_spec1', 'food_prod19_spec2', 'food_prod19_spec3', 'food_prod19_spec4']
  }
];

const CAPABILITIES = [
  { icon: 'verified', titleKey: 'food_cap1_title', descKey: 'food_cap1_desc' },
  { icon: 'ac_unit', titleKey: 'food_cap2_title', descKey: 'food_cap2_desc' },
  { icon: 'local_shipping', titleKey: 'food_cap3_title', descKey: 'food_cap3_desc' },
  { icon: 'trending_down', titleKey: 'food_cap4_title', descKey: 'food_cap4_desc' },
  { icon: 'mosque', titleKey: 'food_cap5_title', descKey: 'food_cap5_desc' },
  { icon: 'support_agent', titleKey: 'food_cap6_title', descKey: 'food_cap6_desc' },
];

const STRENGTHS = [
  { icon: 'location_on', titleKey: 'food_partner1_title', descKey: 'food_partner1_desc' },
  { icon: 'groups', titleKey: 'food_partner2_title', descKey: 'food_partner2_desc' },
  { icon: 'inventory_2', titleKey: 'food_partner3_title', descKey: 'food_partner3_desc' },
  { icon: 'emoji_events', titleKey: 'food_partner4_title', descKey: 'food_partner4_desc' },
  { icon: 'handshake', titleKey: 'food_partner5_title', descKey: 'food_partner5_desc' },
];

const STANDARD_KEYS = ['food_standard1', 'food_standard2', 'food_standard3', 'food_standard4', 'food_standard5', 'food_standard6'];

const FOOD_TEAM = [
  { id: 11, name: 'Mohammed Abdulla Al Balushi', roleKey: 'about_team_1_role', bioKey: 'about_team_1_bio' },
  { id: 12, name: 'Raj Kumar Soni', roleKey: 'team_food_soni_role', bioKey: 'team_food_soni_bio' },
  { id: 13, name: 'I Akhter', roleKey: 'team_food_akhter_role', bioKey: 'team_food_akhter_bio' },
];

export default function FoodServices() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Helmet>
        <title>{t('food_meta_title')}</title>
        <meta name="description" content={t('food_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.85) 0%, rgba(5, 80, 50, 0.70) 100%), url(https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <h1>{t('food_hero_title_l1')}<br />{t('food_hero_title_l2')}</h1>
          <p>{t('food_hero_desc')}</p>
        </div>
      </section>

      {/* Stat Strip */}
      <div className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            {STATS.map(s => (
              <div key={s.labelKey} className="stat-strip-item">
                <span className="stat-strip-num">{s.num}</span>
                <span className="stat-strip-label">{t(s.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Our Food Product Range</h2>
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>{t('food_products_desc')}</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.titleKey} className="product-block" id={p.id} style={p.comingSoon ? { opacity: 0.85 } : {}}>
                <div style={{ position: 'relative' }}>
                  <img src={p.img} alt={t(p.titleKey)} className="product-block-img" style={{ aspectRatio: '1/1', ...(p.comingSoon ? { filter: 'brightness(0.75)' } : {}) }} />
                  {p.comingSoon && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-primary)', color: 'white', fontSize: '0.78rem', fontWeight: '700', padding: '0.35rem 0.9rem', borderRadius: '50px', letterSpacing: '0.5px' }}>
                      {t('food_coming_soon_badge')}
                    </div>
                  )}
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">{t(p.tagKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  {!p.comingSoon && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                      <button 
                        onClick={() => setSelectedProduct({
                          title: t(p.titleKey),
                          desc: t(p.descKey),
                          tag: t(p.tagKey),
                          img: p.img,
                          specs: p.specKeys.map(sk => t(sk))
                        })}
                        className="product-block-btn" 
                        style={{ background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                        Read More
                      </button>
                      <a href="/contact" className="product-block-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                        <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                        {t('food_get_quote')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {NEW_PRODUCTS.map(p => (
              <div key={p.titleKey} className="product-block" id={p.id}>
                <div style={{ position: 'relative' }}>
                  <img src={p.img} alt={t(p.titleKey)} className="product-block-img" style={{ aspectRatio: '1/1' }} />
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">{t(p.tagKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                    <button 
                      onClick={() => setSelectedProduct({
                        title: t(p.titleKey),
                        desc: t(p.descKey),
                        tag: t(p.tagKey),
                        img: p.img,
                        specs: p.specKeys.map(sk => t(sk))
                      })}
                      className="product-block-btn" 
                      style={{ background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      Read More
                    </button>
                    <a href="/contact" className="product-block-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                      {t('food_get_quote')}
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
            <h2 className="section-title center">{t('food_cap_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('food_cap_desc')}</p>
          </div>
          <div className="capabilities-grid">
            {CAPABILITIES.map(c => (
              <div key={c.titleKey} className="capability-card">
                <div className="capability-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{t(c.titleKey)}</h3>
                <p>{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center">
            <span className="focus-label">{t('food_strengths_label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{t('food_partner_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>{t('food_partner_desc')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
            {STRENGTHS.map(c => (
              <div key={c.titleKey} style={{ background: 'var(--color-light)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(27,95,175,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <span className="material-icons" style={{ color: 'var(--color-primary)', fontSize: '1.75rem' }}>{c.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '0.65rem' }}>{t(c.titleKey)}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: '1.65', margin: 0 }}>{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Strip */}
      <section className="quality-section">
        <div className="container">
          <p className="standards-label" style={{ color: 'white' }}>{t('food_quality_label')}</p>
          <div className="standards-grid">
            {STANDARD_KEYS.map(k => (
              <span key={k} className="standard-badge">{t(k)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section-padding" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="focus-label">{t('about_team_label')}</span>
            <h2 className="section-title center">{t('food_team_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('food_team_desc')}</p>
          </div>
          <div className="team-grid">
            {FOOD_TEAM.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  {m.img ? (
                    <img src={m.img} alt={m.name} className="team-img" style={{ objectFit: 'cover' }} />
                  ) : (
                    <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`avatarGradFood${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>
                        <linearGradient id={`primaryGradFood${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1B5FAF" />
                          <stop offset="100%" stopColor="#0b2246" />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill={`url(#avatarGradFood${m.id})`} />
                      <circle cx="50" cy="40" r="18" fill={`url(#primaryGradFood${m.id})`} opacity="0.85" />
                      <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradFood${m.id})`} opacity="0.85" />
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
                <h2>{t('food_cta_title')}</h2>
                <p>{t('food_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('food_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('food_cta_btn2')}</Link>
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
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '0.75rem' }}>Specifications & Features</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProduct.specs.map(sk => <span key={sk} className="spec-chip" style={{ margin: 0 }}>{sk}</span>)}
                </div>
              </div>

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

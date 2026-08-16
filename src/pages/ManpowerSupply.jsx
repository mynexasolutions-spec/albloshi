import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const MANPOWER_TEAM = [
  { id: 9, name: 'Ahsan Jafri', roleKey: 'team_manpower_ahsan_role', bioKey: 'team_manpower_ahsan_bio' },
  { id: 10, name: 'Iqbal Jafri', roleKey: 'team_manpower_iqbal_role', bioKey: 'team_manpower_iqbal_bio' },
];

export default function ManpowerSupply() {
  const { t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const manpowerItems = [
    {
      id: 'engineers-supervisors-foremen',
      titleKey: 'mp_skilled_item1',
      image: '/images/manpower/engineers-supervisors-foremen.webp',
      category: 'skilled',
      desc: 'Highly qualified civil, mechanical, electrical, and instrument engineers, site supervisors, and foremen with extensive field experience across major Saudi industrial and construction projects.',
      specs: ['Certified Engineers', 'Site Supervision', 'QA/QC Supervision', 'Project Leadership']
    },
    {
      id: 'electricians-instrument-technicians',
      titleKey: 'mp_skilled_item2',
      image: '/images/manpower/Electricians and Instrument technicians.webp',
      category: 'skilled',
      desc: 'Certified industrial electricians, instrument technicians, and PLC calibrators trained for power plants, oil & gas facilities, and manufacturing plants.',
      specs: ['Industrial Wiring', 'PLC & Instrument Calibration', 'High Voltage Certified', 'Troubleshooting']
    },
    {
      id: 'welders-fabricators-pipefitters',
      titleKey: 'mp_skilled_item3',
      image: '/images/manpower/Welders, fabricator and pipe fitters.webp',
      category: 'skilled',
      desc: '6G certified welders (TIG, MIG, ARC), experienced structural fabricators, and precision pipefitters for plant piping and heavy steel structures.',
      specs: ['6G Certified Welders', 'Pipe Fabricators', 'Structural Assembly', 'ASME & API Standards']
    },
    {
      id: 'plumbers-hvac-technicians',
      titleKey: 'mp_skilled_item4',
      image: '/images/manpower/Plumbers and HVAC technicians.webp',
      category: 'skilled',
      desc: 'Reliable HVAC specialists delivering central cooling, duct installation, chilled water piping, and industrial plumbing services.',
      specs: ['Chilled Water Systems', 'Plumbing Maintenance', 'HVAC Diagnostics']
    },
    {
      id: 'riggers-scaffolders-operators',
      titleKey: 'mp_skilled_item5',
      image: '/images/manpower/Riggers, scaffolders and equipment operators.webp',
      category: 'skilled',
      desc: 'TUV & Aramco certified riggers, certified scaffolders for heavy plant structures, and licensed operators for cranes, forklifts, and excavators.',
      specs: ['Aramco / TUV Certified', 'Heavy Lifting Operations', 'Certified Scaffold Erection', 'Equipment Safety']
    },
    {
      id: 'safety-storekeepers-timekeepers',
      titleKey: 'mp_skilled_item6',
      image: '/images/manpower/Safety officers, storekeepers and timekeepers.webp',
      category: 'skilled',
      desc: 'NEBOSH/OSHA certified safety officers, warehouse storekeepers, material managers, and digital timekeepers for workforce attendance tracking.',
      specs: ['NEBOSH / OSHA Certified', 'Site HSE Audit', 'Store & Material Management', 'Automated Timekeeping']
    },
    {
      id: 'general-labour-helpers',
      titleKey: 'mp_unskilled_item1',
      image: '/images/manpower/General labour and helpers.webp',
      category: 'unskilled',
      desc: 'Energetic and safety-trained general labourers and site helpers for daily construction, industrial plant support, and routine site duties.',
      specs: ['Physically Fit', 'Safety Induction Done', 'Daily Site Helper', 'Rapid Deployment']
    },
    {
      id: 'loading-unloading-material-handling',
      titleKey: 'mp_unskilled_item2',
      image: '/images/manpower/Loading, unloading and material handling.webp',
      category: 'unskilled',
      desc: 'Experienced material handling teams for heavy cargo loading, unloading container shipments, and internal factory logistics.',
      specs: ['Heavy Cargo Handling', 'Container Stacking', 'Warehouse Logistics', 'Safe Handling Protocols']
    },
    {
      id: 'site-cleaning-housekeeping',
      titleKey: 'mp_unskilled_item3',
      image: '/images/manpower/Site cleaning and housekeeping teams.webp',
      category: 'unskilled',
      desc: 'Professional housekeeping crews for post-construction site cleaning, industrial debris removal, and ongoing site sanitation.',
      specs: ['Post-Construction Cleanup', 'Industrial Debris Removal', 'Environmental Sanitation', 'Daily Upkeep']
    },
    {
      id: 'packing-sorting-warehouse',
      titleKey: 'mp_unskilled_item4',
      image: '/images/manpower/Packing, sorting and warehouse support.webp',
      category: 'unskilled',
      desc: 'Reliable warehouse assistants for goods sorting, order packing, labeling, palletization, and dispatch management.',
      specs: ['Goods Sorting & Packing', 'Palletization', 'Barcode Labeling', 'Dispatch Support']
    },
    {
      id: 'construction-support-civil-helpers',
      titleKey: 'mp_unskilled_item5',
      image: '/images/manpower/Construction support and civil helpers.webp',
      category: 'unskilled',
      desc: 'Dedicated civil helpers for concrete works, masonry assistance, trench digging, formwork support, and foundation preparation.',
      specs: ['Civil Works Helper', 'Concrete Pour Support', 'Formwork Assistance', 'Trenching & Prep']
    },
    {
      id: 'shutdown-mobilization-crews',
      titleKey: 'mp_unskilled_item6',
      image: '/images/manpower/Shutdown and project mobilization crews.webp',
      category: 'unskilled',
      desc: 'Turnaround and shutdown mobilization teams capable of 24/7 rotational shifts for urgent refinery, petrochemical, and industrial plant maintenance.',
      specs: ['24/7 Rotational Shift', 'Rapid Plant Mobilization', 'Shutdown Specialist', 'Turnaround Support']
    },
  ];

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

  const features = [
    {
      icon: 'local_shipping',
      titleKey: 'mp_feat1_title',
      descKey: 'mp_feat1_desc',
    },
    {
      icon: 'assignment',
      titleKey: 'mp_feat2_title',
      descKey: 'mp_feat2_desc',
    },
    {
      icon: 'verified_user',
      titleKey: 'mp_feat3_title',
      descKey: 'mp_feat3_desc',
    },
    {
      icon: 'support_agent',
      titleKey: 'mp_feat4_title',
      descKey: 'mp_feat4_desc',
    },
  ];

  return (
    <div className="manpower-page">
      <Helmet>
        <title>Industrial Manpower Solutions | Mohammad Abdulla Albloshi Trading Co.</title>
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
                <span>{t('mp_badge')}</span>
              </div>
              <h1 className="mp-hero-title">
                {t('mp_hero_title1')}
                <span>{t('mp_hero_title2')}</span>
              </h1>
              <p className="mp-hero-desc">
                {t('mp_hero_desc')}
              </p>
              <div className="mp-hero-actions">
                <a href="tel:+966543188882" className="mp-phone-pill">
                  <span className="material-icons">phone_in_talk</span>
                  <span>+966 54 318 8882</span>
                </a>
              </div>
            </div>

            <div className="mp-hero-img-card">
              <img
                src="/images/manpower/manpower_hero.png"
                alt="Industrial Manpower Solutions"
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
              <span>{t('mp_skilled_title')}</span>
            </button>
            <button
              className={`mp-tab-btn ${activeTab === 'unskilled' ? 'active' : ''}`}
              onClick={() => setActiveTab('unskilled')}
            >
              <span className="material-icons">groups</span>
              <span>{t('mp_unskilled_title')}</span>
            </button>
          </div>

          {/* Responsive Cards Grid */}
          <div className="products-grid mp-12-cards-grid">
            {filteredItems.map((item) => (
              <div key={item.id} id={item.id} className="product-block">
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="product-block-img"
                    loading="lazy"
                  />
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">
                    {item.category === 'skilled' ? t('mp_skilled_title') : t('mp_unskilled_title')}
                  </span>
                  <h3>{t(item.titleKey)}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                    <button 
                      onClick={() => setSelectedProduct({
                        title: t(item.titleKey),
                        desc: item.desc,
                        tag: item.category === 'skilled' ? t('mp_skilled_title') : t('mp_unskilled_title'),
                        img: item.image,
                        specs: item.specs
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
                <h3 className="mp-feature-title">{t(feat.titleKey)}</h3>
                <div className="mp-feature-line"></div>
                <p className="mp-feature-desc">{t(feat.descKey)}</p>
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

          {/* CTA Box */}
          <div className="mp-cta-section">
            <div className="mp-cta-box">
              <h2>{t('mp_cta_title')}</h2>
              <p>{t('mp_cta_desc')}</p>
              <div className="mp-cta-actions">
                <Link to="/contact" className="mp-cta-btn">
                  <span>{t('mp_cta_btn')}</span>
                  <span className="material-icons">arrow_forward</span>
                </Link>
                <a href="tel:+966543188882" className="mp-cta-phone-btn">
                  <span className="material-icons">phone_in_talk</span>
                  <span>+966 54 318 8882</span>
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



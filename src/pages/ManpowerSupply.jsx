import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

export default function ManpowerSupply() {
  const { t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  const manpowerItems = [
    {
      id: 'engineers-supervisors-foremen',
      titleKey: 'mp_skilled_item1',
      image: '/images/manpower/engineers-supervisors-foremen.webp',
      category: 'skilled',
    },
    {
      id: 'electricians-instrument-technicians',
      titleKey: 'mp_skilled_item2',
      image: '/images/manpower/Electricians and Instrument technicians.webp',
      category: 'skilled',
    },
    {
      id: 'welders-fabricators-pipefitters',
      titleKey: 'mp_skilled_item3',
      image: '/images/manpower/Welders, fabricator and pipe fitters.webp',
      category: 'skilled',
    },
    {
      id: 'plumbers-hvac-technicians',
      titleKey: 'mp_skilled_item4',
      image: '/images/manpower/Plumbers and HVAC technicians.webp',
      category: 'skilled',
    },
    {
      id: 'riggers-scaffolders-operators',
      titleKey: 'mp_skilled_item5',
      image: '/images/manpower/Riggers, scaffolders and equipment operators.webp',
      category: 'skilled',
    },
    {
      id: 'safety-storekeepers-timekeepers',
      titleKey: 'mp_skilled_item6',
      image: '/images/manpower/Safety officers, storekeepers and timekeepers.webp',
      category: 'skilled',
    },
    {
      id: 'general-labour-helpers',
      titleKey: 'mp_unskilled_item1',
      image: '/images/manpower/General labour and helpers.webp',
      category: 'unskilled',
    },
    {
      id: 'loading-unloading-material-handling',
      titleKey: 'mp_unskilled_item2',
      image: '/images/manpower/Loading, unloading and material handling.webp',
      category: 'unskilled',
    },
    {
      id: 'site-cleaning-housekeeping',
      titleKey: 'mp_unskilled_item3',
      image: '/images/manpower/Site cleaning and housekeeping teams.webp',
      category: 'unskilled',
    },
    {
      id: 'packing-sorting-warehouse',
      titleKey: 'mp_unskilled_item4',
      image: '/images/manpower/Packing, sorting and warehouse support.webp',
      category: 'unskilled',
    },
    {
      id: 'construction-support-civil-helpers',
      titleKey: 'mp_unskilled_item5',
      image: '/images/manpower/Construction support and civil helpers.webp',
      category: 'unskilled',
    },
    {
      id: 'shutdown-mobilization-crews',
      titleKey: 'mp_unskilled_item6',
      image: '/images/manpower/Shutdown and project mobilization crews.webp',
      category: 'unskilled',
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

          {/* Responsive 12 Cards Grid */}
          <div className="mp-12-cards-grid">
            {filteredItems.map((item) => (
              <div key={item.id} id={item.id} className="mp-grid-card">
                <div className="mp-grid-card-img-wrapper">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    loading="lazy"
                  />
                </div>
                <div className="mp-grid-card-body">
                  <h3 className="mp-grid-card-title">{t(item.titleKey)}</h3>
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

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </div>
  );
}


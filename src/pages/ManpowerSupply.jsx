import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

export default function ManpowerSupply() {
  const { t } = useLanguage();

  const skilledItems = [
    t('mp_skilled_item1'),
    t('mp_skilled_item2'),
    t('mp_skilled_item3'),
    t('mp_skilled_item4'),
    t('mp_skilled_item5'),
    t('mp_skilled_item6'),
  ];

  const unskilledItems = [
    t('mp_unskilled_item1'),
    t('mp_unskilled_item2'),
    t('mp_unskilled_item3'),
    t('mp_unskilled_item4'),
    t('mp_unskilled_item5'),
    t('mp_unskilled_item6'),
  ];

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

      {/* Main 2 Cards (Skilled & Non-Skilled) */}
      <section className="mp-main-cards-section">
        <div className="container">
          <div className="mp-main-cards-grid">
            {/* Skilled Manpower Card */}
            <div className="mp-bento-card">
              <div className="mp-card-img-col">
                <img
                  src="/images/manpower/manpower_skilled.png"
                  alt="Skilled Manpower"
                  loading="lazy"
                />
              </div>
              <div className="mp-card-content-col">
                <div className="mp-card-header">
                  <div className="mp-card-icon-badge">
                    <span className="material-icons">construction</span>
                  </div>
                  <div className="mp-card-header-text">
                    <h2 className="mp-card-title">{t('mp_skilled_title')}</h2>
                    <div className="mp-card-title-dash"></div>
                  </div>
                </div>

                <ul className="mp-card-list">
                  {skilledItems.map((item, idx) => (
                    <li key={idx} className="mp-card-list-item">
                      <span className="mp-check-icon">
                        <span className="material-icons">check</span>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Non-Skilled Labour Card */}
            <div className="mp-bento-card">
              <div className="mp-card-img-col">
                <img
                  src="/images/manpower/manpower_unskilled.png"
                  alt="Non-Skilled Labour"
                  loading="lazy"
                />
              </div>
              <div className="mp-card-content-col">
                <div className="mp-card-header">
                  <div className="mp-card-icon-badge">
                    <span className="material-icons">groups</span>
                  </div>
                  <div className="mp-card-header-text">
                    <h2 className="mp-card-title">{t('mp_unskilled_title')}</h2>
                    <div className="mp-card-title-dash"></div>
                  </div>
                </div>

                <ul className="mp-card-list">
                  {unskilledItems.map((item, idx) => (
                    <li key={idx} className="mp-card-list-item">
                      <span className="mp-check-icon">
                        <span className="material-icons">check</span>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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

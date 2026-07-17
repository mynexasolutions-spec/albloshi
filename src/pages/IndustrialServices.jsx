import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const STATS = [
  { num: '500+', labelKey: 'ind_stat1_label' },
  { num: '36″', labelKey: 'ind_stat2_label' },
  { num: 'ASTM', labelKey: 'ind_stat3_label' },
  { num: '48h', labelKey: 'ind_stat4_label' },
];

const PRODUCTS = [
  {
    id: 'steel-pipes',
    img: '/images/products/CS_and_SS_pipes.webp',
    tagKey: 'ind_prod1_tag',
    titleKey: 'ind_prod1_title',
    descKey: 'ind_prod1_desc',
    specKeys: ['ind_prod1_spec1', 'ind_prod1_spec2', 'ind_prod1_spec3', 'ind_prod1_spec4'],
  },
  {
    id: 'valves-flanges',
    img: '/images/products/valves_and_flanges.webp',
    tagKey: 'ind_prod2_tag',
    titleKey: 'ind_prod2_title',
    descKey: 'ind_prod2_desc',
    specKeys: ['ind_prod2_spec1', 'ind_prod2_spec2', 'ind_prod2_spec3', 'ind_prod2_spec4'],
  },
  {
    id: 'cable-trays',
    img: '/images/products/cable_trays_and_fittings.webp',
    tagKey: 'ind_prod3_tag',
    titleKey: 'ind_prod3_title',
    descKey: 'ind_prod3_desc',
    specKeys: ['ind_prod3_spec1', 'ind_prod3_spec2', 'ind_prod3_spec3', 'ind_prod3_spec4'],
  },
  {
    id: 'welding-safety',
    img: '/images/products/welding_and_safety_gears.webp',
    tagKey: 'ind_prod4_tag',
    titleKey: 'ind_prod4_title',
    descKey: 'ind_prod4_desc',
    specKeys: ['ind_prod4_spec1', 'ind_prod4_spec2', 'ind_prod4_spec3', 'ind_prod4_spec4'],
  },
];

const CAPABILITIES = [
  { icon: 'verified', titleKey: 'ind_cap1_title', descKey: 'ind_cap1_desc' },
  { icon: 'inventory_2', titleKey: 'ind_cap2_title', descKey: 'ind_cap2_desc' },
  { icon: 'local_shipping', titleKey: 'ind_cap3_title', descKey: 'ind_cap3_desc' },
  { icon: 'engineering', titleKey: 'ind_cap4_title', descKey: 'ind_cap4_desc' },
  { icon: 'gavel', titleKey: 'ind_cap5_title', descKey: 'ind_cap5_desc' },
  { icon: 'handshake', titleKey: 'ind_cap6_title', descKey: 'ind_cap6_desc' },
];

const STANDARDS = ['ASTM A106', 'ASTM A312', 'API 5L / API 600', 'ASME B16.5', 'ASME B16.9', 'IEC 61537', 'SASO', 'Saudi Aramco SAES', 'AWS D1.1'];

export default function IndustrialServices() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('ind_meta_title')}</title>
        <meta name="description" content={t('ind_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.88) 0%, rgba(14, 108, 196, 0.72) 100%), url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <h1>{t('ind_hero_title_l1')}<br />{t('ind_hero_title_l2')}</h1>
          <p>{t('ind_hero_desc')}</p>
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
            <h2 className="section-title center">{t('ind_products_title')}</h2>
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>{t('ind_products_desc')}</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.titleKey} className="product-block" id={p.id}>
                <img src={p.img} alt={t(p.titleKey)} className="product-block-img" />
                <div className="product-block-body">
                  <span className="product-block-tag">{t(p.tagKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  <p>{t(p.descKey)}</p>
                  <div className="product-block-specs">
                    {p.specKeys.map(sk => <span key={sk} className="spec-chip">{t(sk)}</span>)}
                  </div>
                  <a href="/contact" className="product-block-btn">
                    <span className="material-icons" style={{ fontSize: '1rem' }}>mail_outline</span>
                    {t('ind_get_quote')}
                  </a>
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
            <h2 className="section-title center">{t('ind_cap_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('ind_cap_desc')}</p>
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

      {/* Standards */}
      <section className="standards-section">
        <div className="container">
          <p className="standards-label">{t('ind_standards_label')}</p>
          <div className="standards-grid">
            {STANDARDS.map(s => (
              <span key={s} className="standard-badge">{s}</span>
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
                <h2>{t('ind_cta_title')}</h2>
                <p>{t('ind_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('ind_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('ind_cta_btn2')}</Link>
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

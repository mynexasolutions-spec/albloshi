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
    comingSoon: true,
  },
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

export default function FoodServices() {
  const { t } = useLanguage();

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
            <h2 className="section-title center">{t('food_products_title')}</h2>
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>{t('food_products_desc')}</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.titleKey} className="product-block" id={p.id} style={p.comingSoon ? { opacity: 0.85 } : {}}>
                <div style={{ position: 'relative' }}>
                  <img src={p.img} alt={t(p.titleKey)} className="product-block-img" style={p.comingSoon ? { filter: 'brightness(0.75)' } : {}} />
                  {p.comingSoon && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-primary)', color: 'white', fontSize: '0.78rem', fontWeight: '700', padding: '0.35rem 0.9rem', borderRadius: '50px', letterSpacing: '0.5px' }}>
                      {t('food_coming_soon_badge')}
                    </div>
                  )}
                </div>
                <div className="product-block-body">
                  <span className="product-block-tag">{t(p.tagKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  <p>{t(p.descKey)}</p>
                  <div className="product-block-specs">
                    {p.specKeys.map(sk => <span key={sk} className="spec-chip">{t(sk)}</span>)}
                  </div>
                  {!p.comingSoon && (
                    <a href="/contact" className="product-block-btn">
                      <span className="material-icons" style={{ fontSize: '1rem' }}>mail_outline</span>
                      {t('food_get_quote')}
                    </a>
                  )}
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
    </>
  );
}

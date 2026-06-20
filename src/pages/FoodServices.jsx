import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function FoodServices() {
  return (
    <>
      <Helmet>
        <title>Food Distribution & Wholesale Supply | ALBLOSHI</title>
        <meta name="description" content="Albloshi provides premium wholesale food distribution across Saudi Arabia — bulk Basmati rice, refined palm cooking oil, restaurant essentials, and grain commodities for the hospitality and foodservice industry." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.85) 0%, rgba(5, 80, 50, 0.70) 100%), url(https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <span className="page-hero-badge" style={{ color: '#86EFAC' }}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>restaurant</span>
            Division II — Food Distribution
          </span>
          <h1>Premium Food Distribution<br />Across Saudi Arabia</h1>
          <p>Enterprise-scale wholesale supply of Basmati rice, refined cooking oils, restaurant essentials, and bulk commodities — delivered reliably to hotels, restaurants, and central kitchens.</p>
          <div className="page-hero-actions">
            <a href="/#contact" className="btn btn-primary">Request a Quote</a>
            <a href="#products" className="btn-outline-white">View Products</a>
          </div>
        </div>
      </section>

      {/* Stat Strip */}
      <div className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            {[
              { num: '50+', label: 'Restaurant Partners' },
              { num: 'Bulk', label: 'Volume Pricing' },
              { num: 'SFDA', label: 'Compliant Supply' },
              { num: 'KSA', label: 'Kingdom-Wide Delivery' },
            ].map(s => (
              <div key={s.label} className="stat-strip-item">
                <span className="stat-strip-num">{s.num}</span>
                <span className="stat-strip-label">{s.label}</span>
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
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>Quality-assured wholesale food products sourced from trusted international suppliers and distributed across the Kingdom's foodservice and hospitality industry.</p>
          </div>
          <div className="products-grid">
            {[
              {
                img: '/images/products/premium_basmati_rice.webp',
                tag: 'Rice Division',
                title: 'Premium Basmati Rice',
                desc: 'Select long-grain, aged Basmati rice imported directly from the finest certified crops in Pakistan and India. Superior aroma, exceptional grain elongation on cooking, and consistent quality assured across every bulk shipment.',
                specs: ['Long-Grain Aged', '25kg / 50kg Bags', 'SFDA Certified', 'Halal'],
              },
              {
                img: '/images/products/refined_palm_cooking_oil.webp',
                tag: 'Bulk Oils',
                title: 'Refined Palm Cooking Oil',
                desc: 'Double fractionated, high-smoke-point palm olein oil with a neutral taste ideal for deep frying and commercial cooking. Packed in commercial restaurant canisters, drums, and bulk tankers to suit every scale of operation.',
                specs: ['Double Fractionated', '5L / 10L / 16L Tins', '200L Drums', 'Halal Certified'],
              },
              {
                img: '/images/products/restaurant_essentials.webp',
                tag: 'Hospitality Supply',
                title: 'Restaurant Essentials',
                desc: 'Comprehensive supply of packaging materials, disposable food containers, aluminum foil trays, bulk dry spices and condiments, and food-safe kitchen sanitizers for restaurant chains, catering companies, and central kitchens.',
                specs: ['Food-Safe Packaging', 'Bulk Spices', 'Disposables', 'Cleaning Supplies'],
              },
              {
                img: '/images/products/wholesale_grain_and_sugar.webp',
                tag: 'Commodities',
                title: 'Wholesale Grain and Sugar',
                desc: 'Enterprise-scale supply of high-grade refined white sugar, lentils, chickpeas, and assorted grain commodities packed in commercial formats specifically designed for central kitchens, food factories, and large-scale catering operations.',
                specs: ['Refined White Sugar', 'Lentils & Pulses', '25kg / 50kg Bags', 'SFDA Certified'],
              },
            ].map(p => (
              <div key={p.title} className="product-block">
                <img src={p.img} alt={p.title} className="product-block-img" />
                <div className="product-block-body">
                  <span className="product-block-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="product-block-specs">
                    {p.specs.map(s => <span key={s} className="spec-chip">{s}</span>)}
                  </div>
                  <a href="/#contact" className="product-block-btn">
                    <span className="material-icons" style={{ fontSize: '1rem' }}>mail_outline</span>
                    Get Quote
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
            <h2 className="section-title center">Why Choose Albloshi for Food Supply</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>Our food distribution division is built on consistent quality, SFDA-compliant sourcing, and a reliable delivery network across the Kingdom.</p>
          </div>
          <div className="capabilities-grid">
            {[
              { icon: 'verified', title: 'SFDA Compliant', desc: 'All food products are sourced and imported under full Saudi Food and Drug Authority compliance, with complete traceability documentation available on request.' },
              { icon: 'ac_unit', title: 'Quality-Controlled Storage', desc: 'Dedicated dry-goods storage facilities maintained at optimal temperature and humidity to preserve product freshness and shelf life throughout the supply chain.' },
              { icon: 'local_shipping', title: 'Reliable Scheduled Delivery', desc: 'Scheduled weekly delivery routes covering Dammam, Al Khobar, Jubail, Riyadh, and Jeddah — ensuring your kitchen never runs short on critical supplies.' },
              { icon: 'trending_down', title: 'Bulk Volume Pricing', desc: 'Competitive wholesale pricing tiers available for high-volume buyers, hotel chains, catering groups, and food manufacturers with monthly volume commitments.' },
              { icon: 'mosque', title: 'Halal Certified Products', desc: 'All food commodities distributed by Albloshi carry valid Halal certifications from internationally recognized bodies, ensuring compliance with KSA regulatory requirements.' },
              { icon: 'support_agent', title: 'Dedicated Account Manager', desc: 'Every client receives a dedicated account coordinator who manages orders, schedules, invoicing, and urgent supply requests with direct communication access.' },
            ].map(c => (
              <div key={c.title} className="capability-card">
                <div className="capability-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Strip */}
      <section className="quality-section">
        <div className="container">
          <p className="standards-label">Certifications &amp; Compliance</p>
          <div className="standards-grid">
            {['SFDA Approved', 'Halal Certified', 'ISO 22000', 'HACCP', 'Saudi Standards (SASO)', 'GCC Conformity'].map(s => (
              <span key={s} className="standard-badge">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title center" style={{ color: 'white' }}>Ready to Place a Food Order?</h2>
          <p>Share your product list and monthly volume requirements. Our food distribution team will send you a personalised wholesale pricing sheet within 24 hours.</p>
          <a href="/#contact" className="btn btn-primary" style={{ background: 'white', color: 'var(--color-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>Send Your Requirements</a>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

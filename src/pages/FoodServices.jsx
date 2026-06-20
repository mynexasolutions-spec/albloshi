import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
          <h1>Premium Food Distribution<br />Across Saudi Arabia</h1>
          <p>Enterprise-scale wholesale supply of Basmati rice, refined cooking oils, restaurant essentials, and bulk commodities — delivered reliably to hotels, restaurants, and central kitchens.</p>
          <div className="page-hero-actions">
            <a href="/contact" className="btn btn-primary">Request a Quote</a>
            <a href="#products" className="btn-outline-white">View Products</a>
          </div>
        </div>
      </section>

      {/* Stat Strip */}
      <div className="stat-strip">
        <div className="container">
          <div className="stat-strip-grid">
            {[
              { num: '100+', label: 'Containers Imported' },
              { num: '5', label: 'Cities Covered' },
              { num: 'SFDA', label: 'Compliant Supply' },
              { num: '2017', label: 'Est. in Dammam' },
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
                id: 'basmati-rice',
                img: '/images/products/premium_basmati_rice.webp',
                tag: 'Rice Division',
                title: 'Premium Basmati Rice',
                desc: 'Select long-grain, aged Basmati rice imported directly from the finest certified crops in Pakistan and India. Superior aroma, exceptional grain elongation on cooking, and consistent quality assured across every bulk shipment.',
                specs: ['Long-Grain Aged', '500gm – 50kg Packs', 'SFDA Certified', 'Halal'],
              },
              {
                id: 'cooking-oil',
                img: '/images/products/refined_palm_cooking_oil.webp',
                tag: 'Bulk Oils',
                title: 'Refined Palm Cooking Oil',
                desc: 'Double fractionated, high-smoke-point palm olein oil with a neutral taste ideal for deep frying and commercial cooking. Packed in commercial restaurant canisters, drums, and bulk tankers to suit every scale of operation.',
                specs: ['Double Fractionated', '5L / 10L / 16L Tins', '200L Drums', 'Halal Certified'],
              },
              {
                id: 'restaurant-essentials',
                img: '/images/products/restaurant_essentials.webp',
                tag: 'Hospitality Supply',
                title: 'Restaurant Essentials',
                desc: 'Comprehensive supply of packaging materials, disposable food containers, aluminum foil trays, bulk dry spices and condiments, and food-safe kitchen sanitizers for restaurant chains, catering companies, and central kitchens.',
                specs: ['Food-Safe Packaging', 'Bulk Spices', 'Disposables', 'Cleaning Supplies'],
              },
              {
                id: 'wholesale-grain',
                img: '/images/products/wholesale_grain_and_sugar.webp',
                tag: 'Commodities',
                title: 'Wholesale Grain and Sugar',
                desc: 'Enterprise-scale supply of high-grade refined white sugar, lentils, chickpeas, and assorted grain commodities packed in commercial formats specifically designed for central kitchens, food factories, and large-scale catering operations.',
                specs: ['Refined White Sugar', 'Lentils & Pulses', '25kg / 50kg Bags', 'SFDA Certified'],
              },
              {
                id: 'pakistani-spices',
                img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
                tag: 'Coming Soon',
                title: 'Premium Pakistani Spices',
                desc: 'Expanding our product portfolio by introducing an authentic range of premium Pakistani spices into the Saudi market — sourced directly from certified farms and available in customized packaging from 500gm to 50kg (Jute, Non-woven, BOPP, Jar and plain PP formats).',
                specs: ['500gm – 50kg Packs', 'Direct Farm Sourced', 'Custom Packaging', 'Launching Soon'],
                comingSoon: true,
              },
            ].map(p => (
              <div key={p.title} className="product-block" id={p.id} style={p.comingSoon ? { opacity: 0.85 } : {}}>
                <div style={{ position: 'relative' }}>
                  <img src={p.img} alt={p.title} className="product-block-img" style={p.comingSoon ? { filter: 'brightness(0.75)' } : {}} />
                  {p.comingSoon && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-primary)', color: 'white', fontSize: '0.78rem', fontWeight: '700', padding: '0.35rem 0.9rem', borderRadius: '50px', letterSpacing: '0.5px' }}>
                      COMING SOON
                    </div>
                  )}
                </div>
                <div className="product-block-body">
                  <span className="product-block-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="product-block-specs">
                    {p.specs.map(s => <span key={s} className="spec-chip">{s}</span>)}
                  </div>
                  {!p.comingSoon && (
                    <a href="/contact" className="product-block-btn">
                      <span className="material-icons" style={{ fontSize: '1rem' }}>mail_outline</span>
                      Get Quote
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
            <h2 className="section-title center">Why Choose Albloshi for Food Supply</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>Our food distribution division is built on consistent quality, SFDA-compliant sourcing, and a reliable delivery network across the Kingdom.</p>
          </div>
          <div className="capabilities-grid">
            {[
              { icon: 'verified', title: 'SFDA Compliant', desc: 'All food products are sourced and imported under full Saudi Food and Drug Authority compliance, with complete traceability documentation available on request.' },
              { icon: 'ac_unit', title: 'Quality-Controlled Storage', desc: 'Dedicated dry-goods storage facilities maintained at optimal temperature and humidity to preserve product freshness and shelf life throughout the supply chain.' },
              { icon: 'local_shipping', title: 'Reliable Scheduled Delivery', desc: 'Scheduled weekly delivery routes covering Dammam, Al Khobar, Qatif, Jubail, and Al Hassa — ensuring your kitchen never runs short on critical supplies.' },
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

      {/* Why Partner With Us */}
      <section style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center">
            <span className="focus-label">OUR STRENGTHS</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>Why Partner With Albloshi</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>Built on deep market expertise, a reliable operational backbone, and strong relationships across the Eastern Province — we are the preferred food distribution partner for retailers and hospitality businesses alike.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: 'location_on', title: 'Strategic Location', desc: 'Based in Dammam, the commercial hub of the Eastern Province, providing easy access to Dammam, Al Khobar, Qatif, Jubail, and Al Hassa.' },
              { icon: 'groups', title: 'Strong Sales Force', desc: 'A dedicated team of 5 sales professionals covering urban and semi-urban markets across the Eastern Province with deep client relationships.' },
              { icon: 'inventory_2', title: 'Operational Efficiency', desc: 'Supported by 2 skilled operations and administration staff ensuring smooth supply chain management, warehousing, and documentation.' },
              { icon: 'emoji_events', title: 'Experienced Leadership', desc: 'Guided by 2 experienced partners with deep knowledge of the food distribution industry in Saudi Arabia and GCC markets.' },
              { icon: 'handshake', title: 'Market Reach', desc: 'Established relationships with wholesalers, retailers, supermarkets, and hospitality businesses built over 8+ years of consistent service.' },
            ].map(c => (
              <div key={c.title} style={{ background: 'var(--color-light)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(27,95,175,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <span className="material-icons" style={{ color: 'var(--color-primary)', fontSize: '1.75rem' }}>{c.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '0.65rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-body)', lineHeight: '1.65', margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Strip */}
      <section className="quality-section">
        <div className="container">
          <p className="standards-label" style={{ color: 'white' }}>Certifications &amp; Compliance</p>
          <div className="standards-grid">
            {['SFDA Approved', 'Halal Certified', 'ISO 22000', 'HACCP', 'Saudi Standards (SASO)', 'GCC Conformity'].map(s => (
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
                <h2>Ready to Place a Food Order?</h2>
                <p>Share your product list and monthly volume requirements. Our food distribution team will send you a personalised wholesale pricing sheet within 24 hours.</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">Send Us an Inquiry</Link>
                <Link to="/#segments" className="btn btn-outline">Explore Our Verticals</Link>
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

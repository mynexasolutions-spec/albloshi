import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function IndustrialServices() {
  return (
    <>
      <Helmet>
        <title>Industrial Materials & Building Solutions | ALBLOSHI</title>
        <meta name="description" content="Albloshi supplies premium industrial piping materials, valves, flanges, cable trays, and welding consumables across Saudi Arabia. ASTM/ASME certified supply for oil & gas, construction, and manufacturing sectors." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.88) 0%, rgba(14, 108, 196, 0.72) 100%), url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <span className="page-hero-badge" style={{ color: '#93C5FD' }}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>precision_manufacturing</span>
            Division I — Industrial Materials
          </span>
          <h1>Industrial Materials &amp;<br />Building Solutions</h1>
          <p>Complete piping systems, flow control hardware, electrical infrastructure, and certified safety consumables — sourced to ASTM/ASME standards and delivered across the Kingdom.</p>
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
              { num: '500+', label: 'Product SKUs' },
              { num: '36″', label: 'Max Pipe Size' },
              { num: 'ASTM', label: 'Certified Supply' },
              { num: '48h', label: 'Dispatch Lead Time' },
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
            <h2 className="section-title center">Our Product Range</h2>
            <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto' }}>Precision-sourced materials for oil &amp; gas, heavy construction, and manufacturing — every item backed by full mill documentation.</p>
          </div>
          <div className="products-grid">
            {[
              {
                img: '/images/products/CS_and_SS_pipes.webp',
                tag: 'Piping Systems',
                title: 'CS and SS Seamless Pipes',
                desc: 'Seamless and ERW pipes in Carbon Steel and Stainless Steel conforming to ASTM/ASME standards. Available in schedule 40, 80, and 160 wall thicknesses, sized up to 36 inches for both upstream and downstream applications.',
                specs: ['ASTM A106', 'ASTM A312', 'API 5L', 'Up to 36″'],
              },
              {
                img: '/images/products/valves_and_flanges.webp',
                tag: 'Flow Control',
                title: 'Valves and Flanges',
                desc: 'Gate, globe, ball, butterfly, and check valves alongside Weld Neck, Slip-on, Blind, and Lap Joint flanges in premium ASME pressure class ratings 150 through 2500 for critical process environments.',
                specs: ['ASME B16.5', 'API 600', 'Class 150–2500', 'CS / SS / Alloy'],
              },
              {
                img: '/images/products/cable_trays_and_fittings.webp',
                tag: 'Electrical Infrastructure',
                title: 'Cable Trays and Fittings',
                desc: 'Heavy-duty perforated, ladder-type, and wire mesh cable trays with hot-dip galvanized coating rated for extreme GCC climatic conditions. Full range of fittings including bends, tees, reducers, and supports.',
                specs: ['IEC 61537', 'Hot-Dip Galvanized', 'SS 304 / 316', '100–900mm Width'],
              },
              {
                img: '/images/products/welding_and_safety_gears.webp',
                tag: 'Safety & Consumables',
                title: 'Welding and Safety Gear',
                desc: 'High-integrity welding electrodes, TIG and MIG wire fillers, standard and specialist PPE, protective suits, certified hard hats, arc flash helmets, and compliant fallback safety systems for industrial worksites.',
                specs: ['AWS Certified', 'EN 397 Helmets', 'SASO Compliant', 'ARAMCO Approved'],
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
            <h2 className="section-title center">Why Source From Albloshi</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>Our industrial supply chain is built on verified sourcing, certified documentation, and rapid delivery to the Kingdom's most demanding project sites.</p>
          </div>
          <div className="capabilities-grid">
            {[
              { icon: 'verified', title: 'Mill Test Certificates', desc: 'Every pipe, valve, and fitting ships with original Mill Test Certificates (MTC) traceable to the production heat, conforming to ASTM, ASME, and API specifications.' },
              { icon: 'inventory_2', title: 'Warehoused Stock', desc: 'Large buffer inventory maintained at our Dammam warehouse to guarantee immediate availability for urgent project requirements and shutdown maintenance.' },
              { icon: 'local_shipping', title: '48-Hour Dispatch', desc: 'Dedicated logistics fleet enables same or next-day dispatch across the Eastern Province, with scheduled freight to Riyadh and Jeddah twice weekly.' },
              { icon: 'engineering', title: 'Technical Sales Support', desc: 'Our sales engineers assist in material selection, specification review, and material substitution to keep your project on schedule and within budget.' },
              { icon: 'gavel', title: 'Aramco & SASO Compliant', desc: 'Products sourced and documented to meet Saudi Aramco SAES standards and SASO regulations, simplifying vendor qualification and inspection processes.' },
              { icon: 'handshake', title: 'Credit Account Terms', desc: 'Approved contractors and procurement companies can apply for direct credit accounts with flexible net payment terms through our business development team.' },
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

      {/* Standards */}
      <section className="standards-section">
        <div className="container">
          <p className="standards-label">Compliance &amp; Standards We Supply To</p>
          <div className="standards-grid">
            {['ASTM A106', 'ASTM A312', 'API 5L / API 600', 'ASME B16.5', 'ASME B16.9', 'IEC 61537', 'SASO', 'Saudi Aramco SAES', 'AWS D1.1'].map(s => (
              <span key={s} className="standard-badge">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title center" style={{ color: 'white' }}>Ready to Source Industrial Materials?</h2>
          <p>Submit your bill of materials or project specifications and our team will respond within one business day with pricing and availability.</p>
          <a href="/#contact" className="btn btn-primary" style={{ background: 'white', color: 'var(--color-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>Send Your Requirements</a>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

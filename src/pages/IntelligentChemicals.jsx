import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';

const SOLUTIONS = [
  {
    img: '/images/intelligent_chemicals/Industrial Water Treatment.webp',
    title: 'Industrial Water Treatment',
    desc: 'Advanced water treatment chemicals designed to improve operational efficiency, prevent corrosion, reduce scaling, and optimize industrial water systems.',
    lists: [
      { heading: 'Solutions Include', items: ['Scale Inhibitors & Antiscalants', 'Corrosion Inhibitors', 'Biocides & Oxygen Scavengers', 'Membrane Cleaners', 'Boiler & Cooling Water Treatment', 'Reverse Osmosis Chemicals', 'Closed Loop Treatment'] },
      { heading: 'Applications', items: ['Cooling Towers', 'Boilers', 'RO Plants', 'Industrial Water Systems', 'Wastewater Plants'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Polymers (Coagulants & Flocculants).webp',
    title: 'Polymers (Coagulants & Flocculants)',
    desc: 'High-performance coagulants and flocculants engineered for effective wastewater treatment and industrial clarification systems.',
    lists: [
      { heading: 'Product Range', items: ['Organic & Inorganic Coagulants', 'Poly Aluminum Chloride (PAC)', 'Decolorizing Agents', 'Powder & Emulsion Flocculants', 'Anionic, Cationic & Non-Ionic Variants', 'Dewatering Aids'] },
      { heading: 'Industries Served', items: ['Water & Wastewater', 'Textile, Dyeing & Mining', 'Steel & Electroplating', 'Pharmaceuticals', 'Sugar & Food Processing', 'Cement, Pulp & Paper'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Silicone & Organic Defoamers.webp',
    title: 'Silicone & Organic Defoamers',
    desc: 'Specialized defoamer formulations developed to control foam generation in industrial processing systems.',
    lists: [
      { heading: 'Applications', items: ['Pulp & Paper Mills', 'Paints & Coatings', 'Wastewater Treatment Plants', 'Oil & Refineries', 'Industrial Cleaning Systems', 'Food & Beverage Manufacturing'] },
      { heading: 'Key Benefits', items: ['Improved Process Stability', 'Enhanced Production Efficiency', 'Reduced Foam Formation', 'Better Equipment Performance'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Fuel Additives.webp',
    title: 'Fuel Additives',
    desc: 'Innovative fuel additive technologies developed to improve combustion efficiency and reduce emissions.',
    lists: [
      { heading: 'Applications', items: ['Coal Fired Boilers: Combustion Optimization', 'Reduction in Unburnt Carbon', 'Steam-to-Fuel Ratio Improvement', 'Agro-Based Fuel: Rice Husk, Wood Dust, Bagasse', 'Liquid Fuels: Diesel, Furnace Oil, Bio-Diesel, Heavy Oil'] },
      { heading: 'Advantages', items: ['Lower Emissions', 'Improved Heat Transfer', 'Reduced Corrosion', 'Higher Fuel Efficiency', 'Better Equipment Availability'] },
    ],
  },
  {
    img: '/images/activated_carbon.webp',
    title: 'Activated Carbon Solutions',
    desc: 'Premium activated carbon products engineered for purification, filtration, and industrial adsorption applications.',
    lists: [
      { heading: 'Powdered & Granular', items: ['Municipal Water Purification', 'Pharmaceutical Applications', 'Food & Beverage', 'Chemical Purification', 'Mining & Industrial Filtration', 'Automotive Emission Control'] },
      { heading: 'Extruded Carbon', items: ['Environmental Air Treatment', 'Odor Removal', 'Mercury Removal', 'Industrial Processing'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Cleaning & Disinfection Solutions.webp',
    title: 'Cleaning & Disinfection Solutions',
    desc: 'Industrial-grade cleaning and sanitation chemicals developed for food processing and hygiene-critical industries.',
    lists: [
      { heading: 'Solutions Include', items: ['Cleaning-in-Place (CIP) Chemicals', 'Surface Cleaning Solutions', 'Conveyor Lubricants', 'Crate Washing Solutions', 'Personal Hygiene Products', 'Vehicle Disinfection'] },
      { heading: 'Industries Served', items: ['Dairy', 'Food Processing', 'Beverage Plants', 'Farms & Livestock', 'Cattle Industries'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Pulp & Paper Chemical Solutions.webp',
    title: 'Pulp & Paper Chemical Solutions',
    desc: 'High-performance specialty chemicals designed for paper manufacturing and pulp processing industries.',
    lists: [
      { heading: 'Treatment & Polymers', items: ['Reverse Osmosis & Boiler Chemicals', 'Antiscalants & Biocides', 'Retention & Drainage Aids', 'White Water Clarification', 'Effluent Treatment Chemicals'] },
      { heading: 'Antifoams & Processing', items: ['Paper Machine & Pulp Mill Defoamers', 'Coating Defoamers', 'Deinking Chemicals', 'Strength Additives', 'Stickies Control & Ply Bond Agents'] },
    ],
  },
  {
    img: '/images/intelligent_chemicals/Sugar Industry Solutions.webp',
    title: 'Sugar Industry Solutions',
    desc: 'Specialized chemical formulations developed for sugar processing and industrial sugar plants.',
    lists: [
      { heading: 'Applications', items: ['Mud Settling Chemicals', 'Mill Sanitation', 'Evaporator Antiscalants', 'Viscosity Reducers', 'Clarification Solutions', 'Activated Carbon & Boiling Aids'] },
      { heading: 'Water Treatment Support', items: ['Cooling Water Treatment', 'Boiler Water Treatment', 'Reverse Osmosis Membrane Treatment'] },
    ],
  },
];

export default function IntelligentChemicals() {
  useEffect(() => {
    const blocks = document.querySelectorAll('.solution-block');
    blocks.forEach((block, i) => {
      block.classList.add(i % 2 === 0 ? 'slide-from-left' : 'slide-from-right');
    });
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    blocks.forEach(b => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Intelligent Chemicals | ALBLOSHI</title>
        <meta name="description" content="Tellabs Chemicals Pvt. Ltd. is a leading manufacturer and exporter of specialty chemicals focused on delivering innovative, sustainable, and high-performance solutions for industrial applications." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="ic-page-hero">
        <div className="container">
          <h1>About Tellabs Chemicals</h1>
          <p>Tellabs Chemicals Pvt. Ltd. is a leading manufacturer and exporter of specialty chemicals focused on delivering innovative, sustainable, and high-performance solutions for industrial applications. With advanced manufacturing facilities, strong R&amp;D capabilities, and a commitment to quality, Tellabs serves industries across water treatment, food processing, sugar, pulp &amp; paper, fuel optimization, and industrial cleaning.</p>
        </div>
      </section>

      {/* Solutions */}
      <section className="solutions-wrapper">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <span className="focus-label">PRODUCTS</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>Our Specialty Chemical Solutions</h2>
          </div>

          {SOLUTIONS.map((sol, i) => (
            <div key={sol.title} className={`solution-block${i % 2 !== 0 ? ' reverse' : ''}`}>
              <div className="solution-img-col">
                <img src={sol.img} alt={sol.title} />
              </div>
              <div className="solution-content-col">
                <h2>{sol.title}</h2>
                <p>{sol.desc}</p>
                <div className="solution-lists">
                  {sol.lists.map(list => (
                    <div key={list.heading} className="solution-list">
                      <h4>{list.heading}</h4>
                      <ul>
                        {list.items.map(item => (
                          <li key={item} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="trust-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="focus-label">OUR EXPERTISE</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>Why Industries Trust Tellabs</h2>
          </div>
          <div className="trust-grid">
            {[
              { icon: 'factory', title: 'Advanced Manufacturing', desc: 'Modern production facilities equipped with advanced reactors, homogenizers, and blending systems ensure consistent product quality and reliable supply.' },
              { icon: 'biotech', title: 'Innovation Driven', desc: 'Continuous investment in laboratory research and product development enables high-performance and customized chemical solutions.' },
              { icon: 'verified', title: 'Quality Assurance', desc: 'Strict quality control systems and rigorous testing at every production stage guarantee industry-standard products.' },
              { icon: 'eco', title: 'Sustainable Solutions', desc: 'Eco-friendly formulations designed to support environmental responsibility and industrial efficiency.' },
              { icon: 'support_agent', title: 'Customer Support', desc: 'Technical assistance and responsive support teams help clients optimize performance and operations.' },
              { icon: 'language', title: 'Global Standards', desc: 'Products manufactured under certified processes including Halal, ISO, and Kosher standards.' },
            ].map(c => (
              <div key={c.title} className="trust-card">
                <div className="trust-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="commitment-banner">
        <div className="container">
          <h2>Commitment to Excellence</h2>
          <p>Tellabs Chemicals is committed to delivering reliable industrial solutions. Our mission is to empower industries through innovative chemical technologies that improve operational efficiency, sustainability, and performance.</p>
          <div className="commitment-list">
            {['Reliable Industrial Solutions', 'Sustainable Chemical Technologies', 'Advanced Research & Development', 'Global Quality Standards', 'Long-Term Customer Partnerships'].map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: 'var(--color-light)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title center" style={{ marginBottom: '1.5rem' }}>Ready to Elevate Your Operations?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-body)', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>Partner with Tellabs Chemicals for industry-leading specialty solutions, sustainable technologies, and exceptional technical support.</p>
          <a href="/#contact" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>Contact Our Experts</a>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

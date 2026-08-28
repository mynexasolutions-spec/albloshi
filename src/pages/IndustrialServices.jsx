import React, { useState } from 'react';
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
  {
    id: 'cs-flanges',
    img: '/images/Industrial_Materials/CS_FLANGES.png',
    tagKey: 'Piping Systems',
    titleKey: 'CS Flanges',
    descKey: 'Carbon Steel flanges provide strong, leak-resistant pipe connections for industrial systems. Manufactured for dependable performance across construction, oil and gas, power and processing',
    specKeys: ['Weld Neck', 'Slip-On', 'Blind', 'Socket Weld', 'Lap Joint', 'Threaded', 'ASME / ANSI / DIN Standards'],
  },
  {
    id: 'ss-flanges',
    img: '/images/Industrial_Materials/SS_FLANGES.png',
    tagKey: 'Piping Systems',
    titleKey: 'SS Flanges',
    descKey: 'Stainless Steel flanges offer excellent corrosion resistance and secure pipe connections for demanding industrial applications including chemical processing, marine services and water treatment',
    specKeys: ['Weld Neck', 'Slip-On', 'Blind', 'Socket Weld', 'Stainless Steel 304/316', 'Pressure Class 150–2500'],
  },
  {
    id: 'cs-buttweld-fittings',
    img: '/images/Industrial_Materials/CARBON_STEEL_BUTTWELD_FITTINGS.png',
    tagKey: 'Piping Systems',
    titleKey: 'Carbon Steel Buttweld Fittings',
    descKey: 'Carbon Steel elbows, reducers, tees and caps ensure efficient flow and durable welded pipe connections. Suitable for heavy-duty industrial, petrochemical and power plant piping installations.',
    specKeys: ['ASME Standards', 'Sizes up to 60”', 'Black or Galvanized Finish'],
  },
  {
    id: 'ss-buttweld-fittings',
    img: '/images/Industrial_Materials/STAINLESS_STEEL_BUTTWELD_FITTINGS.png',
    tagKey: 'Piping Systems',
    titleKey: 'Stainless Steel Buttweld Fittings',
    descKey: 'Stainless Steel buttweld fittings are manufactured for corrosion resistance and reliable performance in process piping, chemical plants and industrial fluid transfer systems.',
    specKeys: ['Sizes up to 36”', 'All Schedules', 'Pressure Class 150–9000'],
  },
  {
    id: 'forged-cs-fittings',
    img: '/images/Industrial_Materials/FORGED_CARBON_20STEEL_FITTINGS.png',
    tagKey: 'Piping Systems',
    titleKey: 'Forged Carbon Steel Fittings',
    descKey: 'Heavy-duty forged Carbon Steel threaded and socket weld fittings designed for high-pressure piping applications where strength, safety and long service life are essential.',
    specKeys: ['NPT & SW', 'Pressure 3000–9000', 'Black/Galvanized'],
  },
  {
    id: 'forged-ss-fittings',
    img: '/images/Industrial_Materials/FORGED_STAINLESS_STEEL_FITTINGS.png',
    tagKey: 'Piping Systems',
    titleKey: 'Forged Stainless Steel Fittings',
    descKey: 'Forged Stainless Steel fittings provide reliable threaded and socket weld connections for corrosive and high-pressure industrial piping applications.',
    specKeys: ['Threaded & Socket Weld', 'SS304 / SS316', 'Pressure 3000–9000'],
  },
  {
    id: 'malleable-iron-fittings',
    img: '/images/Industrial_Materials/FORGED_MALLEABLE_IRON_FITTINGS.png',
    tagKey: 'Piping Systems',
    titleKey: 'Forged Malleable Iron Fittings',
    descKey: 'Reliable malleable iron threaded fittings suitable for plumbing, utility and general industrial piping installations, delivering dependable performance and easy installation.',
    specKeys: [
      'ASME, AWA, DIN, ANSI, BS',
      '4" to 4"(NPT & SW)',
      'Pressure 3000 to 9000',
      'All Schedule',
      'A182 F304/304L, F316/316L, F321, SA/A182 F5/F11'
    ],
  },
  {
    id: 'fire-hydrant-grooved-fittings',
    img: '/images/Industrial_Materials/FIRE_HYDRANT_&_20GROOVED_FITTINGS.png',
    tagKey: 'Fire Protection',
    titleKey: 'Fire Hydrant & Grooved Fittings',
    descKey: 'Complete range of fire hydrants, grooved couplings, valves and accessories designed for dependable fire protection systems in commercial and industrial facilities.',
    specKeys: [
      'Fittings and Valves',
      'Alarm Check Valve',
      'Pillar type Fire Hydrant',
      'Rigid Coupling',
      'Flexible Coupling',
      'Large Diameter Elbow'
    ],
  },
  {
    id: 'instrumentation-accessories-tube-fittings',
    img: '/images/Industrial_Materials/INSTRUMENTATION_ACCESSORIES_TUBE_20FITTINGS.png',
    tagKey: 'Instrumentation',
    titleKey: 'Instrumentation Accessories & Tube Fittings',
    descKey: 'Precision tube fittings, valves, gauges and instrumentation accessories manufactured for accurate fluid control and industrial process measurement applications.',
    specKeys: [
      '1/16 to 2"',
      'SS304, SS316, Brass, Special Alloys',
      'NPT, BSP, BSPT, UNF, ISO, SAE',
      'Pressure Rating: 300 TO 6000',
      'Major brands of Pressure Gauges'
    ],
  },
  {
    id: 'valves',
    img: '/images/Industrial_Materials/VALVES.png',
    tagKey: 'Flow Control',
    titleKey: 'Valves',
    descKey: 'Industrial valves engineered for efficient flow control across oil and gas, water treatment, power generation and process industries with dependable sealing performance.',
    specKeys: ['Gate Valve', 'Ball Valve', 'Check Valve', 'Butterfly Valve', 'Globe Valve', 'Safety Valve'],
  },
  {
    id: 'fasteners-stud-bolts',
    img: '/images/Industrial_Materials/FASTENERS_AND_STUD.png',
    tagKey: 'Industrial Supplies',
    titleKey: 'Fasteners & Stud Bolts',
    descKey: 'Industrial fasteners including bolts, nuts, washers and stud bolts manufactured for secure structural and piping connections in demanding industrial environments.',
    specKeys: [
      'A325, 4.8, 8.8, B7',
      'DIN, Inch, mm',
      'CS, SS304, SS316, B7',
      'HDG, PTFE, XYLON',
      'Painted Black and Galvanized'
    ],
  },
  {
    id: 'gasket-insulation-kits',
    img: '/images/Industrial_Materials/GASKET_AND_INSULATION_KITS.png',
    tagKey: 'Industrial Supplies',
    titleKey: 'Gasket & Insulation Kits',
    descKey: 'Industrial sealing products designed to minimize leakage, improve safety and maintain reliable flange performance across various piping applications.',
    specKeys: [
      'ASME, ASTM, BS and DIN',
      '3/8" to any larger size',
      'Ring Joint, Spiral Wound, Flat Cut, Flexible Graphite Sheet',
      'Steel Re-Inforced Rubber Gasket, Metal Jacket Gaskets',
      'Serrated Metal Gasket, Non Asbestos Gasket Sheets',
      'ZURN, WII KIN, Rubber Gaskets'
    ],
  },
  {
    id: 'industrial-electrical-materials',
    img: '/images/Industrial_Materials/INDUSTRIAL_ELECTRICAL_MATERIALS.png',
    tagKey: 'Electrical',
    titleKey: 'Industrial Electrical Materials',
    descKey: 'Comprehensive range of electrical materials including power cables, glands, conduit fittings and accessories for industrial electrical installations.',
    specKeys: [
      'Cables: LV Power, LV Flexible, MV, HV Power',
      'Cable Lugs: Copper, Aluminum, Bronze, Bimetallic',
      'Cable Ties: PVC, Stainless, PVC Coated',
      'Electrical Conduit and Conduit Fittings',
      'Explosion Proof Enclosers',
      'Circuit Breakers & Electrical Boxes',
      'Distribution and Protection'
    ],
  },
  {
    id: 'industrial-telecom',
    img: '/images/Industrial_Materials/INDUSTRIAL_TELECOM.png',
    tagKey: 'Telecom',
    titleKey: 'Industrial Telecom',
    descKey: 'Industrial telecom products including fiber optic accessories, duct systems and installation materials for reliable communication infrastructure.',
    specKeys: [
      'Fiber optic cables and accessories',
      "Duct plug, Duct Seal's and accessories",
      'UG Cable Marker',
      'Corrugated and Non Corrugated Pipes',
      'Detectable warning tape'
    ],
  },
  {
    id: 'cable-tray-ladder-support',
    img: '/images/Industrial_Materials/CABLE_TRAY_&_LADDER_SUPPORT.webp',
    tagKey: 'Cable Management',
    titleKey: 'Cable Tray & Ladder Support',
    descKey: 'Cable trays and ladder support systems designed for organized, secure and efficient cable routing across industrial facilities.',
    specKeys: [],
  },
  {
    id: 'earthing-support',
    img: '/images/Industrial_Materials/EARTHING_SUPPORT.png',
    tagKey: 'Electrical',
    titleKey: 'Earthing Support',
    descKey: 'Grounding and earthing materials developed to improve electrical safety and equipment protection in industrial installations.',
    specKeys: [],
  },
  {
    id: 'welding-materials-accessories',
    img: '/images/Industrial_Materials/WELDING_MATERIAL_AND_ACCESSORIES.png',
    tagKey: 'Welding',
    titleKey: 'Welding Materials & Accessories',
    descKey: 'Quality welding electrodes, wires, rods, regulators and accessories suitable for fabrication, maintenance and industrial welding projects.',
    specKeys: [
      'Gas welded wires and shields',
      'Flux cored welding wires',
      'Brazing rods and Fluxes',
      'Tungsten Rod',
      'Regulators',
      'Welding Machines: TIG Weld, Arc Weld, Gas Weld'
    ],
  },
  {
    id: 'industrial-safety-materials-tools',
    img: '/images/Industrial_Materials/INDUSTRIAL_SAFETY_MATERIALS.png',
    tagKey: 'Safety',
    titleKey: 'Industrial Safety Materials & Tools',
    descKey: 'Personal protective equipment, industrial safety products and essential tools designed to create safe working environments across multiple industries.',
    specKeys: [],
  },
  {
    id: 'construction-chemicals',
    img: '/images/Industrial_Materials/CONSTRUCTION_CHEMICALS.png',
    tagKey: 'Construction',
    titleKey: 'Construction Chemicals',
    descKey: 'Construction chemicals for sealing, bonding, waterproofing and repair applications, helping improve durability and long-term structural performance.',
    specKeys: [
      'Refurbishment',
      'Sealing and Bonding',
      'Roofing',
      'Flooring/Coating',
      'Concrete Refurbishment'
    ],
  },
  {
    id: 'sanitary-products',
    img: '/images/Industrial_Materials/SANITARY.png',
    tagKey: 'Sanitary',
    titleKey: 'Sanitary Products',
    descKey: 'Premium sanitary products including faucets, mixers, water heaters and bathroom accessories suitable for residential and commercial projects.',
    specKeys: [],
  },
  {
    id: 'drains',
    img: '/images/Industrial_Materials/DRAINS.png',
    tagKey: 'Drainage',
    titleKey: 'Drains',
    descKey: 'Floor drains, roof drains, trench drains and drainage accessories designed for efficient wastewater collection and dependable drainage performance.',
    specKeys: [
      'Floor and Area Drains',
      'Roof Drains',
      'Hydro-Flo Trench Drain System',
      'Sanitary Floor Sink',
      'Interceptors',
      'Gullies',
      'Gratings'
    ],
  },
  {
    id: 'pvc-cpvc-cement',
    img: '/images/Industrial_Materials/PVC_CPVC_CEMENT.png',
    tagKey: 'Piping Systems',
    titleKey: 'PVC / CPVC Cement',
    descKey: 'PVC and CPVC solvent cement and cleaners formulated to create strong, leak-free joints for plastic piping installations.',
    specKeys: [
      'PVC Cement',
      'CPVC Cement',
      'PVC Cleaner',
      'CPVC Cleaner'
    ],
  },
  {
    id: 'pvc-cpvc-upvc-hdpe-pvdf-pipes',
    img: '/images/Industrial_Materials/PVDF_Pipes.png',
    tagKey: 'Piping Systems',
    titleKey: 'PVC / CPVC / uPVC / HDPE / PVDF Pipes',
    descKey: 'Thermoplastic piping systems manufactured for water supply, drainage and industrial fluid handling with excellent durability and corrosion resistance.',
    specKeys: [
      'Standard SCH 40 / SCH 80',
      'White and Gray',
      '½" to 12" (16mm to 500mm)',
      'Valves: Gate, Ball, Butterfly, Diaphragm, Needle'
    ],
  },
  {
    id: 'ppr-pipes-fittings',
    img: '/images/Industrial_Materials/PPR_Pipes_and_Fittings.png',
    tagKey: 'Piping Systems',
    titleKey: 'PPR Pipes & Fittings',
    descKey: 'Reliable PPR pipes and fittings for hot and cold water distribution, offering durable performance and easy installation.',
    specKeys: [
      'Rubber Expansion Joint',
      'Flexible Coupling',
      'Saddle Clamp',
      'Repair Clamp',
      'Water Meter'
    ],
  },
  {
    id: 'electrical-coated-conduit-fittings',
    img: '/images/Industrial_Materials/ELECTRICAL_COATED_CONDUIT.png',
    tagKey: 'Electrical',
    titleKey: 'Electrical Coated Conduit, Fittings & Accessories',
    descKey: 'We are committed to supplying the best quality of coated products for industrial applications.',
    specKeys: [
      'PVC (Thermoplastic) Coating',
      'Epoxy Coating',
      'Powder Coating'
    ],
  },
  {
    id: 'test-plugs',
    img: '/images/Industrial_Materials/TEST_PLUG.png',
    tagKey: 'Testing Equipment',
    titleKey: 'Test Plugs & Testing Kits',
    descKey: 'Professional testing equipment for plumbing and drainage systems. Our range includes durable test plugs, sealing bags, and complete drain testing and cleaning kits designed for accurate leak detection and pipe maintenance.',
    specKeys: [
      'Steel Test Plug',
      'Aluminium Test Plug',
      'Drain Testing Kits',
      'Drain Cleaning Kits',
      'Inflatable PVC Sealing Bars'
    ],
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



const INDUSTRIAL_TEAM = [
  { id: 7, name: 'Mohammed Riaz', roleKey: 'about_team_2_role', bioKey: 'about_team_2_bio' },
  { id: 8, name: 'Mr. T.A. Khan', roleKey: 'team_industrial_khan_role', bioKey: 'team_industrial_khan_bio' },
];

export default function IndustrialServices() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);

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
                        specs: p.specKeys.map(sk => t(sk))
                      })}
                      className="product-block-btn"
                      style={{ background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      Read More
                    </button>
                    <a href="/contact" className="product-block-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                      {t('ind_get_quote')}
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

      {/* Team Section */}
      <section className="team-section section-padding" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="focus-label">{t('about_team_label')}</span>
            <h2 className="section-title center">{t('ind_team_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('ind_team_desc')}</p>
          </div>
          <div className="team-grid">
            {INDUSTRIAL_TEAM.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  {m.img ? (
                    <img src={m.img} alt={m.name} className="team-img" style={{ objectFit: 'cover' }} />
                  ) : (
                    <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`avatarGradInd${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>
                        <linearGradient id={`primaryGradInd${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1B5FAF" />
                          <stop offset="100%" stopColor="#0b2246" />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill={`url(#avatarGradInd${m.id})`} />
                      <circle cx="50" cy="40" r="18" fill={`url(#primaryGradInd${m.id})`} opacity="0.85" />
                      <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradInd${m.id})`} opacity="0.85" />
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

              {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '0.75rem' }}>Specifications & Features</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedProduct.specs.map(sk => <span key={sk} className="spec-chip" style={{ margin: 0 }}>{sk}</span>)}
                  </div>
                </div>
              )}

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

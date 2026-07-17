import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const SOLUTIONS_EN = [
  {
    id: 'water-treatment',
    img: '/images/intelligent_chemicals/Industrial Water Treatment.webp',
    title: 'Industrial Water Treatment',
    desc: 'Advanced water treatment chemicals designed to improve operational efficiency, prevent corrosion, reduce scaling, and optimize industrial water systems.',
    lists: [
      { heading: 'Solutions Include', items: ['Scale Inhibitors & Antiscalants', 'Corrosion Inhibitors', 'Biocides & Oxygen Scavengers', 'Membrane Cleaners', 'Boiler & Cooling Water Treatment', 'Reverse Osmosis Chemicals', 'Closed Loop Treatment'] },
      { heading: 'Applications', items: ['Cooling Towers', 'Boilers', 'RO Plants', 'Industrial Water Systems', 'Wastewater Plants'] },
    ],
  },
  {
    id: 'polymers',
    img: '/images/intelligent_chemicals/Polymers (Coagulants & Flocculants).webp',
    title: 'Polymers (Coagulants & Flocculants)',
    desc: 'High-performance coagulants and flocculants engineered for effective wastewater treatment and industrial clarification systems.',
    lists: [
      { heading: 'Product Range', items: ['Organic & Inorganic Coagulants', 'Poly Aluminum Chloride (PAC)', 'Decolorizing Agents', 'Powder & Emulsion Flocculants', 'Anionic, Cationic & Non-Ionic Variants', 'Dewatering Aids'] },
      { heading: 'Industries Served', items: ['Water & Wastewater', 'Textile, Dyeing & Mining', 'Steel & Electroplating', 'Pharmaceuticals', 'Sugar & Food Processing', 'Cement, Pulp & Paper'] },
    ],
  },
  {
    id: 'defoamers',
    img: '/images/intelligent_chemicals/Silicone & Organic Defoamers.webp',
    title: 'Silicone & Organic Defoamers',
    desc: 'Specialized defoamer formulations developed to control foam generation in industrial processing systems.',
    lists: [
      { heading: 'Applications', items: ['Pulp & Paper Mills', 'Paints & Coatings', 'Wastewater Treatment Plants', 'Oil & Refineries', 'Industrial Cleaning Systems', 'Food & Beverage Manufacturing'] },
      { heading: 'Key Benefits', items: ['Improved Process Stability', 'Enhanced Production Efficiency', 'Reduced Foam Formation', 'Better Equipment Performance'] },
    ],
  },
  {
    id: 'fuel-additives',
    img: '/images/intelligent_chemicals/Fuel Additives.webp',
    title: 'Fuel Additives',
    desc: 'Innovative fuel additive technologies developed to improve combustion efficiency and reduce emissions.',
    lists: [
      { heading: 'Applications', items: ['Coal Fired Boilers: Combustion Optimization', 'Reduction in Unburnt Carbon', 'Steam-to-Fuel Ratio Improvement', 'Agro-Based Fuel: Rice Husk, Wood Dust, Bagasse', 'Liquid Fuels: Diesel, Furnace Oil, Bio-Diesel, Heavy Oil'] },
      { heading: 'Advantages', items: ['Lower Emissions', 'Improved Heat Transfer', 'Reduced Corrosion', 'Higher Fuel Efficiency', 'Better Equipment Availability'] },
    ],
  },
  {
    id: 'activated-carbon',
    img: '/images/activated_carbon.webp',
    title: 'Activated Carbon Solutions',
    desc: 'Premium activated carbon products engineered for purification, filtration, and industrial adsorption applications.',
    lists: [
      { heading: 'Powdered & Granular', items: ['Municipal Water Purification', 'Pharmaceutical Applications', 'Food & Beverage', 'Chemical Purification', 'Mining & Industrial Filtration', 'Automotive Emission Control'] },
      { heading: 'Extruded Carbon', items: ['Environmental Air Treatment', 'Odor Removal', 'Mercury Removal', 'Industrial Processing'] },
    ],
  },
  {
    id: 'cleaning-disinfection',
    img: '/images/intelligent_chemicals/Cleaning & Disinfection Solutions.webp',
    title: 'Cleaning & Disinfection Solutions',
    desc: 'Industrial-grade cleaning and sanitation chemicals developed for food processing and hygiene-critical industries.',
    lists: [
      { heading: 'Solutions Include', items: ['Cleaning-in-Place (CIP) Chemicals', 'Surface Cleaning Solutions', 'Conveyor Lubricants', 'Crate Washing Solutions', 'Personal Hygiene Products', 'Vehicle Disinfection'] },
      { heading: 'Industries Served', items: ['Dairy', 'Food Processing', 'Beverage Plants', 'Farms & Livestock', 'Cattle Industries'] },
    ],
  },
  {
    id: 'pulp-paper',
    img: '/images/intelligent_chemicals/Pulp & Paper Chemical Solutions.webp',
    title: 'Pulp & Paper Chemical Solutions',
    desc: 'High-performance specialty chemicals designed for paper manufacturing and pulp processing industries.',
    lists: [
      { heading: 'Treatment & Polymers', items: ['Reverse Osmosis & Boiler Chemicals', 'Antiscalants & Biocides', 'Retention & Drainage Aids', 'White Water Clarification', 'Effluent Treatment Chemicals'] },
      { heading: 'Antifoams & Processing', items: ['Paper Machine & Pulp Mill Defoamers', 'Coating Defoamers', 'Deinking Chemicals', 'Strength Additives', 'Stickies Control & Ply Bond Agents'] },
    ],
  },
  {
    id: 'sugar-industry',
    img: '/images/intelligent_chemicals/Sugar Industry Solutions.webp',
    title: 'Sugar Industry Solutions',
    desc: 'Specialized chemical formulations developed for sugar processing and industrial sugar plants.',
    lists: [
      { heading: 'Applications', items: ['Mud Settling Chemicals', 'Mill Sanitation', 'Evaporator Antiscalants', 'Viscosity Reducers', 'Clarification Solutions', 'Activated Carbon & Boiling Aids'] },
      { heading: 'Water Treatment Support', items: ['Cooling Water Treatment', 'Boiler Water Treatment', 'Reverse Osmosis Membrane Treatment'] },
    ],
  },
];

const SOLUTIONS_AR = [
  {
    id: 'water-treatment',
    img: '/images/intelligent_chemicals/Industrial Water Treatment.webp',
    title: 'معالجة المياه الصناعية',
    desc: 'كيميائيات معالجة مياه متقدمة مصممة لتحسين الكفاءة التشغيلية، ومنع التآكل، وتقليل الترسبات، وتحسين أنظمة المياه الصناعية.',
    lists: [
      { heading: 'تشمل الحلول', items: ['مثبطات ومانعات الترسب', 'مثبطات التآكل', 'المبيدات الحيوية وكاسحات الأكسجين', 'منظفات الأغشية', 'معالجة مياه الغلايات والتبريد', 'كيميائيات التناضح العكسي', 'معالجة الدورة المغلقة'] },
      { heading: 'التطبيقات', items: ['أبراج التبريد', 'الغلايات', 'محطات التناضح العكسي', 'أنظمة المياه الصناعية', 'محطات معالجة مياه الصرف'] },
    ],
  },
  {
    id: 'polymers',
    img: '/images/intelligent_chemicals/Polymers (Coagulants & Flocculants).webp',
    title: 'البوليمرات (المخثرات والمندفات)',
    desc: 'مخثرات ومندفات عالية الأداء مصممة لمعالجة فعالة لمياه الصرف وأنظمة التوضيح الصناعية.',
    lists: [
      { heading: 'مجموعة المنتجات', items: ['مخثرات عضوية وغير عضوية', 'كلوريد الألومنيوم المتعدد (PAC)', 'عوامل إزالة اللون', 'مندفات بودرة ومستحلبة', 'أنواع أنيونية وكاتيونية وغير أيونية', 'مساعدات نزع الماء'] },
      { heading: 'الصناعات المخدومة', items: ['المياه ومياه الصرف', 'النسيج والصباغة والتعدين', 'الصلب والطلاء الكهربائي', 'الصناعات الدوائية', 'السكر وتصنيع الأغذية', 'الأسمنت واللب والورق'] },
    ],
  },
  {
    id: 'defoamers',
    img: '/images/intelligent_chemicals/Silicone & Organic Defoamers.webp',
    title: 'مزيلات الرغوة السيليكونية والعضوية',
    desc: 'تركيبات مزيلة للرغوة متخصصة طُورت للتحكم في تكوّن الرغوة في أنظمة المعالجة الصناعية.',
    lists: [
      { heading: 'التطبيقات', items: ['مصانع اللب والورق', 'الدهانات والطلاءات', 'محطات معالجة مياه الصرف', 'النفط والمصافي', 'أنظمة التنظيف الصناعي', 'تصنيع الأغذية والمشروبات'] },
      { heading: 'الفوائد الرئيسية', items: ['استقرار أفضل للعمليات', 'كفاءة إنتاج محسّنة', 'تقليل تكوّن الرغوة', 'أداء أفضل للمعدات'] },
    ],
  },
  {
    id: 'fuel-additives',
    img: '/images/intelligent_chemicals/Fuel Additives.webp',
    title: 'مضافات الوقود',
    desc: 'تقنيات مبتكرة لمضافات الوقود طُورت لتحسين كفاءة الاحتراق وتقليل الانبعاثات.',
    lists: [
      { heading: 'التطبيقات', items: ['غلايات الفحم: تحسين الاحتراق', 'تقليل الكربون غير المحترق', 'تحسين نسبة البخار إلى الوقود', 'الوقود الزراعي: قشور الأرز، نشارة الخشب، مصاصة قصب السكر', 'الوقود السائل: الديزل، زيت الأفران، الديزل الحيوي، الزيت الثقيل'] },
      { heading: 'المزايا', items: ['انبعاثات أقل', 'نقل حراري محسّن', 'تآكل أقل', 'كفاءة وقود أعلى', 'توفر أفضل للمعدات'] },
    ],
  },
  {
    id: 'activated-carbon',
    img: '/images/activated_carbon.webp',
    title: 'حلول الكربون المنشط',
    desc: 'منتجات كربون منشط فاخرة مصممة لتطبيقات التنقية والترشيح والامتزاز الصناعي.',
    lists: [
      { heading: 'بودرة وحبيبات', items: ['تنقية مياه البلديات', 'التطبيقات الدوائية', 'الأغذية والمشروبات', 'التنقية الكيميائية', 'الترشيح التعديني والصناعي', 'التحكم في انبعاثات السيارات'] },
      { heading: 'الكربون المبثوق', items: ['معالجة الهواء البيئي', 'إزالة الروائح', 'إزالة الزئبق', 'المعالجة الصناعية'] },
    ],
  },
  {
    id: 'cleaning-disinfection',
    img: '/images/intelligent_chemicals/Cleaning & Disinfection Solutions.webp',
    title: 'حلول التنظيف والتطهير',
    desc: 'كيميائيات تنظيف وتعقيم بدرجة صناعية طُورت لتصنيع الأغذية والصناعات الحرجة من ناحية النظافة.',
    lists: [
      { heading: 'تشمل الحلول', items: ['كيميائيات التنظيف في الموقع (CIP)', 'حلول تنظيف الأسطح', 'مزلقات الناقلات', 'حلول غسيل الصناديق', 'منتجات النظافة الشخصية', 'تطهير المركبات'] },
      { heading: 'الصناعات المخدومة', items: ['الألبان', 'تصنيع الأغذية', 'مصانع المشروبات', 'المزارع والثروة الحيوانية', 'صناعات الماشية'] },
    ],
  },
  {
    id: 'pulp-paper',
    img: '/images/intelligent_chemicals/Pulp & Paper Chemical Solutions.webp',
    title: 'حلول كيميائية للب والورق',
    desc: 'كيميائيات متخصصة عالية الأداء مصممة لصناعات تصنيع الورق ومعالجة اللب.',
    lists: [
      { heading: 'المعالجة والبوليمرات', items: ['كيميائيات التناضح العكسي والغلايات', 'مانعات الترسب والمبيدات الحيوية', 'مساعدات الاحتفاظ والتصريف', 'توضيح المياه البيضاء', 'كيميائيات معالجة الفضلات السائلة'] },
      { heading: 'مضادات الرغوة والمعالجة', items: ['مزيلات رغوة آلات الورق ومصانع اللب', 'مزيلات رغوة الطلاء', 'كيميائيات إزالة الحبر', 'مضافات تقوية', 'التحكم باللزوجة وعوامل ربط الطبقات'] },
    ],
  },
  {
    id: 'sugar-industry',
    img: '/images/intelligent_chemicals/Sugar Industry Solutions.webp',
    title: 'حلول صناعة السكر',
    desc: 'تركيبات كيميائية متخصصة طُورت لتصنيع السكر ومصانع السكر الصناعية.',
    lists: [
      { heading: 'التطبيقات', items: ['كيميائيات ترسيب الطين', 'تعقيم المطاحن', 'مانعات ترسب المبخرات', 'مخفضات اللزوجة', 'حلول التوضيح', 'الكربون المنشط ومساعدات الغليان'] },
      { heading: 'دعم معالجة المياه', items: ['معالجة مياه التبريد', 'معالجة مياه الغلايات', 'معالجة أغشية التناضح العكسي'] },
    ],
  },
];

const TRUST_CARDS = [
  { icon: 'factory', titleKey: 'ic_trust1_title', descKey: 'ic_trust1_desc' },
  { icon: 'biotech', titleKey: 'ic_trust2_title', descKey: 'ic_trust2_desc' },
  { icon: 'verified', titleKey: 'ic_trust3_title', descKey: 'ic_trust3_desc' },
  { icon: 'eco', titleKey: 'ic_trust4_title', descKey: 'ic_trust4_desc' },
  { icon: 'support_agent', titleKey: 'ic_trust5_title', descKey: 'ic_trust5_desc' },
  { icon: 'language', titleKey: 'ic_trust6_title', descKey: 'ic_trust6_desc' },
];

const COMMITMENT_KEYS = ['ic_commitment_item1', 'ic_commitment_item2', 'ic_commitment_item3', 'ic_commitment_item4', 'ic_commitment_item5'];

export default function IntelligentChemicals() {
  const { t, language } = useLanguage();
  const SOLUTIONS = language === 'ar' ? SOLUTIONS_AR : SOLUTIONS_EN;

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
        <title>{t('ic_meta_title')}</title>
        <meta name="description" content={t('ic_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="ic-page-hero">
        <div className="container">
          <h1>{t('ic_hero_title_l1')}<br />{t('ic_hero_title_l2')}</h1>
          <p>{t('ic_hero_desc')}</p>
        </div>
      </section>

      {/* Solutions */}
      <section className="solutions-wrapper">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <span className="focus-label">{t('ic_products_label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{t('ic_products_title')}</h2>
          </div>

          {SOLUTIONS.map((sol, i) => (
            <div key={sol.id} id={sol.id} className={`solution-block${i % 2 !== 0 ? ' reverse' : ''}`}>
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
            <span className="focus-label">{t('ic_expertise_label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{t('ic_trust_title')}</h2>
          </div>
          <div className="trust-grid">
            {TRUST_CARDS.map(c => (
              <div key={c.titleKey} className="trust-card">
                <div className="trust-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{t(c.titleKey)}</h3>
                <p>{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="commitment-banner">
        <div className="container">
          <h2>{t('ic_commitment_title')}</h2>
          <p>{t('ic_commitment_desc')}</p>
          <div className="commitment-list">
            {COMMITMENT_KEYS.map(k => (
              <span key={k}>{t(k)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{t('ic_cta_title')}</h2>
                <p>{t('ic_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('ic_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('ic_cta_btn2')}</Link>
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

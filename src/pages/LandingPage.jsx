import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { BRANDING_DEFAULTS, fetchBranding, DEFAULTS as SETTINGS_DEFAULTS, fetchSiteSettings } from '../lib/siteSettingsDefaults';
import { submitLead } from '../lib/submitLead';
import { cdn } from '../lib/img';
import Captcha from '../components/Captcha';

// Hero images (same files the vertical pages use) - kept as plain URLs so this entry page stays tiny.
const CLD = 'https://res.cloudinary.com/dut8h8mt3/image/upload/';
const IMG = {
  chem: { hero: { image: CLD + 'v1788285330/albloshi/chemicals/hero-bg.jpg' } },
  food: { hero: { image: CLD + 'v1788284900/albloshi/food/hero-bg.jpg' } },
  ind: { hero: { image: CLD + 'v1788283387/albloshi/industrial/hero-bg.jpg' } },
  man: { hero: { image: CLD + 'v1788285708/albloshi/manpower/hero.jpg' } },
};
const CHEM = IMG.chem, FOOD = IMG.food, IND = IMG.ind, MAN = IMG.man;

// Single-intent ad landing pages: one offer, one form, no site navigation to wander off with.
// Route: /lp/<slug>   e.g. /lp/chemicals?utm_source=google&utm_medium=cpc&utm_campaign=...
const PAGES = {
  chemicals: {
    service: 'TELLABS Chemicals', image: CHEM.hero?.image, icon: 'science',
    en: { title: 'Industrial Water Treatment & Specialty Chemicals in Saudi Arabia', sub: 'Exclusive TELLABS distributor for KSA & UAE. Tell us your application and we will recommend the right solution.', bullets: ['Water treatment: scale, corrosion & microbiological control', 'Coagulants & flocculants, defoamers, activated carbon', 'Fuel additives and cleaning & disinfection chemicals', 'Technical support from an Eastern Province team'] },
    ar: { title: 'معالجة المياه الصناعية والكيماويات المتخصصة في المملكة', sub: 'الموزع الحصري لتيلابس في السعودية والإمارات. أخبرنا بتطبيقك ونوصي لك بالحل المناسب.', bullets: ['معالجة المياه: التحكم في الترسبات والتآكل والنمو الميكروبي', 'المخثرات والمندفات ومزيلات الرغوة والكربون المنشط', 'مضافات الوقود ومواد التنظيف والتطهير', 'دعم فني من فريق المنطقة الشرقية'] },
  },
  food: {
    service: 'Food Distribution', image: FOOD.hero?.image, icon: 'restaurant',
    en: { title: 'Wholesale Rice, Oil & Food Supply for Businesses in Eastern Province', sub: 'Premium basmati rice, palm oil and staples for retailers, hotels, restaurants and caterers.', bullets: ['SFDA compliant and Halal certified products', 'Basmati rice, refined palm oil, sugar, spices and more', 'Custom branding and packaging options', 'Delivery across Dammam, Al Khobar, Qatif, Jubail & Al Hassa'] },
    ar: { title: 'توريد الأرز والزيوت والمواد الغذائية بالجملة للشركات في المنطقة الشرقية', sub: 'أرز بسمتي فاخر وزيت نخيل ومواد غذائية أساسية للتجزئة والفنادق والمطاعم وشركات التموين.', bullets: ['منتجات متوافقة مع هيئة الغذاء والدواء ومعتمدة حلال', 'أرز بسمتي وزيت نخيل مكرر وسكر وبهارات وغيرها', 'خيارات العلامة التجارية والتعبئة المخصصة', 'التوصيل إلى الدمام والخبر والقطيف والجبيل والأحساء'] },
  },
  // Product-level pages: one ad group = one product = one headline (best message match for search ads)
  rice: {
    service: 'Food Distribution', image: FOOD.hero?.image, icon: 'rice_bowl',
    en: { title: 'Wholesale Basmati Rice Supply in Saudi Arabia', sub: 'Select long-grain, aged basmati rice imported directly from certified crops in Pakistan and India, for retailers, supermarkets, hotels and restaurants.', bullets: ['Packs from 500 g up to 50 kg', 'Jute, non-woven, BOPP, jar and plain PP packaging', 'Custom branding available', 'SFDA compliant and Halal certified'] },
    ar: { title: 'توريد أرز بسمتي بالجملة في المملكة العربية السعودية', sub: 'أرز بسمتي طويل الحبة معتق ومستورد مباشرة من محاصيل معتمدة في باكستان والهند، لتجار التجزئة والمتاجر والفنادق والمطاعم.', bullets: ['عبوات من 500 جرام حتى 50 كجم', 'تعبئة في أكياس الجوت وغير المنسوجة وBOPP والعبوات البلاستيكية', 'إمكانية وضع العلامة التجارية الخاصة', 'متوافق مع هيئة الغذاء والدواء ومعتمد حلال'] },
  },
  palmoil: {
    service: 'Food Distribution', image: FOOD.hero?.image, icon: 'oil_barrel',
    en: { title: 'Refined Palm Cooking Oil for Restaurants & Food Factories', sub: 'Double-fractionated, high-smoke-point palm olein with a neutral taste, ideal for deep frying and commercial cooking.', bullets: ['5 L, 10 L and 16 L tins for restaurants', '200 L drums and bulk tankers for manufacturers', 'Halal certified', 'Supply to food factories, caterers and hospitality groups'] },
    ar: { title: 'زيت نخيل مكرر للطهي للمطاعم ومصانع الأغذية', sub: 'زيت أولين النخيل مزدوج التجزئة بنقطة دخان عالية وطعم محايد، مثالي للقلي العميق والطهي التجاري.', bullets: ['عبوات 5 و10 و16 لتر للمطاعم', 'براميل 200 لتر وصهاريج للمصنعين', 'معتمد حلال', 'التوريد لمصانع الأغذية وشركات التموين ومجموعات الضيافة'] },
  },
  watertreatment: {
    service: 'TELLABS Chemicals', image: CHEM.hero?.image, icon: 'water_drop',
    en: { title: 'Industrial Water Treatment Chemicals in Saudi Arabia', sub: 'Prevent scale, corrosion and microbiological growth. Exclusive TELLABS distributor for KSA & UAE.', bullets: ['Scale and corrosion inhibitors', 'Coagulants and flocculants for solid-liquid separation', 'Cleaning and disinfection chemicals', 'Technical support from an Eastern Province team'] },
    ar: { title: 'كيماويات معالجة المياه الصناعية في المملكة العربية السعودية', sub: 'منع الترسبات والتآكل والنمو الميكروبي. الموزع الحصري لتيلابس في السعودية والإمارات.', bullets: ['مثبطات الترسبات والتآكل', 'المخثرات والمندفات لفصل المواد الصلبة عن السوائل', 'مواد التنظيف والتطهير', 'دعم فني من فريق المنطقة الشرقية'] },
  },
  industrial: {
    service: 'Industrial Materials', image: IND.hero?.image, icon: 'precision_manufacturing',
    en: { title: 'Pipes, Valves, Flanges & Industrial Materials, Supplied Across the Kingdom', sub: 'Piping systems, flow control, electrical infrastructure and safety gear sourced to ASTM/ASME standards.', bullets: ['Seamless pipes, fittings, flanges and valves', 'Cable trays, electrical materials and safety consumables', 'Sourced to ASTM/ASME standards', 'One supplier for your project material list'] },
    ar: { title: 'الأنابيب والصمامات والفلنجات والمواد الصناعية في جميع أنحاء المملكة', sub: 'أنظمة أنابيب وتحكم في التدفق وبنية كهربائية ومعدات سلامة وفق معايير ASTM/ASME.', bullets: ['أنابيب سلسة ووصلات وفلنجات وصمامات', 'حوامل الكابلات والمواد الكهربائية ومستلزمات السلامة', 'مصدرة وفق معايير ASTM/ASME', 'مورد واحد لقائمة مواد مشروعك'] },
  },
  manpower: {
    service: 'Manpower Supply', image: MAN.hero?.image, icon: 'groups',
    en: { title: 'Certified Industrial Manpower for Your Projects in Saudi Arabia', sub: 'Skilled and general workforce supplied to your site: tell us the trades and numbers you need.', bullets: ['Electricians, welders, pipefitters, riggers and supervisors', 'General labour, helpers and warehouse crews', 'Shutdown and mobilization crews', 'Supplied by an established Dammam-based company'] },
    ar: { title: 'عمالة صناعية معتمدة لمشاريعك في المملكة العربية السعودية', sub: 'عمالة ماهرة وعامة إلى موقعك: أخبرنا بالمهن والأعداد المطلوبة.', bullets: ['كهربائيون ولحامون وفنيو أنابيب ومنصبو رافعات ومشرفون', 'عمالة عامة ومساعدون وفرق مستودعات', 'فرق الإيقاف والتجهيز', 'توريد من شركة راسخة مقرها الدمام'] },
  },
};

// Form wording that continues the ad's promise (message match): CTA + what to put in the free-text box.
const FORM_COPY = {
  default: {
    en: { cta: 'Get a Free Quote', ask: 'What do you need, and in what quantity?' },
    ar: { cta: 'احصل على عرض سعر مجاني', ask: 'ما الذي تحتاجه وما الكمية المطلوبة؟' },
  },
  chemicals: {
    en: { cta: 'Get a Free Quote', ask: 'Your application (cooling tower, boiler, RO, wastewater...) and daily volume' },
    ar: { cta: 'احصل على عرض سعر مجاني', ask: 'التطبيق (برج تبريد، غلاية، تناضح عكسي، صرف...) والحجم اليومي' },
  },
  watertreatment: {
    en: { cta: 'Get a Free Quote', ask: 'Your system (cooling tower, boiler, RO, wastewater...) and daily volume' },
    ar: { cta: 'احصل على عرض سعر مجاني', ask: 'النظام (برج تبريد، غلاية، تناضح عكسي، صرف...) والحجم اليومي' },
  },
  rice: {
    en: { cta: 'Get Rice Prices', ask: 'Pack size, quantity per month and delivery city' },
    ar: { cta: 'احصل على أسعار الأرز', ask: 'حجم العبوة والكمية الشهرية ومدينة التوصيل' },
  },
  palmoil: {
    en: { cta: 'Get Oil Prices', ask: 'Pack size (tin / drum / tanker), quantity per month and delivery city' },
    ar: { cta: 'احصل على أسعار الزيت', ask: 'حجم العبوة (علبة / برميل / صهريج) والكمية الشهرية ومدينة التوصيل' },
  },
  food: {
    en: { cta: 'Get Wholesale Prices', ask: 'Products needed, quantity per month and delivery city' },
    ar: { cta: 'احصل على أسعار الجملة', ask: 'المنتجات المطلوبة والكمية الشهرية ومدينة التوصيل' },
  },
  industrial: {
    en: { cta: 'Send Your Material List', ask: 'Items, sizes / specs (ASTM/ASME) and quantities, or paste your material list' },
    ar: { cta: 'أرسل قائمة المواد', ask: 'الأصناف والمقاسات / المواصفات (ASTM/ASME) والكميات، أو الصق قائمة المواد' },
  },
  manpower: {
    en: { cta: 'Request Manpower', ask: 'Trades and headcount needed, project location and start date' },
    ar: { cta: 'اطلب العمالة', ask: 'المهن وعدد العمال المطلوب وموقع المشروع وتاريخ البدء' },
  },
};


// Trust numbers come from facts already published on this site (company copy / chatbot): founded 2017, 100+ containers
// imported, five Eastern Province cities served, four business divisions. Nothing here is a new claim.
const COMMON = {
  en: {
    stats: [['2017', 'Established'], ['100+', 'Containers imported'], ['5', 'Eastern Province cities served'], ['4', 'Business divisions']],
    howTitle: 'How it works',
    steps: [
      { t: 'Send your inquiry', d: 'Fill in the form or call us and tell us what you need.' },
      { t: 'We get in touch', d: 'Our team contacts you to confirm your requirements.' },
      { t: 'Receive a quotation', d: 'You get a written quotation for your approval.' },
    ],
    ctaTitle: 'Ready to get your quotation?',
    ctaSub: 'Send your inquiry or call us. Our team will get back to you.',
    call: 'Call us', whatsapp: 'WhatsApp', or: 'or',
    bar: { call: 'Call', whatsapp: 'WhatsApp', quote: 'Quote' },
    formSub: 'Fill in the form and our team will contact you.',
    privacyNote: 'Your details are used only to reply to your inquiry.',
    waMsg: (title) => `Hello ALBLOSHI, I am interested in: ${title}`,
  },
  ar: {
    stats: [['2017', 'سنة التأسيس'], ['+100', 'حاوية مستوردة'], ['5', 'مدن في المنطقة الشرقية نخدمها'], ['4', 'أقسام أعمال']],
    howTitle: 'كيف نعمل',
    steps: [
      { t: 'أرسل استفسارك', d: 'املأ النموذج أو اتصل بنا وأخبرنا بما تحتاجه.' },
      { t: 'نتواصل معك', d: 'يتواصل فريقنا معك لتأكيد متطلباتك.' },
      { t: 'استلم عرض السعر', d: 'تستلم عرض سعر مكتوباً لاعتماده.' },
    ],
    ctaTitle: 'جاهز للحصول على عرض السعر؟',
    ctaSub: 'أرسل استفسارك أو اتصل بنا وسيتواصل معك فريقنا.',
    call: 'اتصل بنا', whatsapp: 'واتساب', or: 'أو',
    bar: { call: 'اتصال', whatsapp: 'واتساب', quote: 'عرض سعر' },
    formSub: 'املأ النموذج وسيتواصل معك فريقنا.',
    privacyNote: 'تُستخدم بياناتك فقط للرد على استفسارك.',
    waMsg: (title) => `مرحباً البلوشي، أنا مهتم بـ: ${title}`,
  },
};

export default function LandingPage() {
  const { slug } = useParams();
  const page = PAGES[slug];
  const { t, language, toggleLanguage } = useLanguage();
  const [branding, setBranding] = useState(BRANDING_DEFAULTS);
  const [settings, setSettings] = useState(SETTINGS_DEFAULTS);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState('');
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    fetchBranding(supabase).then(b => { if (!cancelled) setBranding(b); });
    fetchSiteSettings(supabase).then(s => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

  if (!page) return <Navigate to="/contact" replace />;
  const c = page[language] || page.en;
  const fc = (FORM_COPY[slug] || FORM_COPY.default)[language] || FORM_COPY.default.en;
  const x = COMMON[language] || COMMON.en;
  const waNumber = String(settings.whatsapp || settings.phone || '').replace(/[^0-9]/g, '');
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(x.waMsg(c.title))}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!consent) { toast.error(t('consent_required')); return; }
    if (captchaRequired && !token) { toast.error(t('captcha_required')); return; }
    setSubmitting(true);
    try {
      await submitLead({ ...form, service: page.service, source: `lp_${slug}`, captchaToken: token, startedAt: startedAt.current });
      setDone(true);
      toast.success(t('contact_toast_success').replace('{name}', form.name));
    } catch (err) {
      toast.error(err?.message || t('contact_toast_error_default'), { duration: 8000 });
    }
    setResetKey(k => k + 1);
    setSubmitting(false);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="lp">
      <Helmet>
        <title>{c.title} | ALBLOSHI</title>
        <meta name="description" content={c.sub} />
        {page.image && <link rel="preload" as="image" href={cdn(page.image, 900)} media="(max-width: 600px)" fetchpriority="high" />}
        {page.image && <link rel="preload" as="image" href={cdn(page.image, 1600)} media="(min-width: 601px)" fetchpriority="high" />}
      </Helmet>

      <header className="lp-header">
        <div className="container lp-header-inner">
          <img src={cdn(branding.logo, 300)} alt="ALBLOSHI" width="818" height="447" className="lp-logo" />
          <div className="lp-header-actions">
            <button type="button" className="lang-switch-btn" onClick={toggleLanguage} aria-label="Switch Language">
              <span className="material-icons">language</span>
              <span className="lang-text">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <a className="btn btn-primary lp-call" href={`tel:${settings.phone}`}>
              <span className="material-icons" style={{ fontSize: '1.1rem', marginInlineEnd: '0.4rem' }}>phone_in_talk</span>
              <bdi dir="ltr">{settings.phone_display}</bdi>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="lp-hero" style={page.image ? { '--lp-bg-lg': `url(${cdn(page.image, 1600)})`, '--lp-bg-sm': `url(${cdn(page.image, 900)})` } : undefined}>
          <div className="container lp-grid">
            <div className="lp-copy">
              <span className="lp-eyebrow"><span className="material-icons">{page.icon}</span> {page.service}</span>
              <h1>{c.title}</h1>
              <p className="lp-sub">{c.sub}</p>
              <ul className="lp-bullets">
                {c.bullets.map((b) => (<li key={b}><span className="material-icons">check_circle</span>{b}</li>))}
              </ul>
            </div>

            <div className="lp-card" id="lp-form">
              {done ? (
                <div className="lp-thanks">
                  <span className="material-icons">task_alt</span>
                  <h2>{t('contact_toast_success').replace('{name}', form.name)}</h2>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate={false}>
                  <h2>{fc.cta}</h2>
                  <p className="lp-card-sub">{x.formSub}</p>
                  <div className="form-group">
                    <label htmlFor="lpName" className="form-label">{t('contact_form_name_label')}</label>
                    <input id="lpName" className="form-input" required autoComplete="name" value={form.name} onChange={set('name')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lpEmail" className="form-label">{t('contact_form_email_label')}</label>
                    <input id="lpEmail" type="email" className="form-input" required autoComplete="email" value={form.email} onChange={set('email')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lpPhone" className="form-label">{t('contact_form_phone_label')}</label>
                    <input id="lpPhone" type="tel" className="form-input" required autoComplete="tel" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lpMsg" className="form-label">{t('contact_form_message_label')}</label>
                    <textarea id="lpMsg" className="form-textarea" rows={3} placeholder={fc.ask} maxLength={2000} value={form.message} onChange={set('message')} />
                  </div>
                  <label className="consent-check">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                    <span>{t('consent_prefix')}<Link to="/privacy-policy" target="_blank">{t('privacy_policy')}</Link>{t('consent_suffix')}</span>
                  </label>
                  <Captcha onToken={setToken} onRequired={setCaptchaRequired} resetKey={resetKey} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    className="hp-field"
                    value={form.website} onChange={set('website')} />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none' }} disabled={submitting}>
                    {submitting ? t('contact_form_submitting') : fc.cta}
                  </button>
                  <p className="lp-privacy-note"><span className="material-icons">lock</span>{x.privacyNote}</p>
                  <div className="lp-or"><span>{x.or}</span></div>
                  <div className="lp-alt-actions">
                    <a className="lp-alt lp-alt-call" href={`tel:${settings.phone}`}><span className="material-icons">phone_in_talk</span>{x.call}</a>
                    <a className="lp-alt lp-alt-wa" href={waHref} target="_blank" rel="noopener noreferrer"><span className="material-icons">chat</span>{x.whatsapp}</a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="lp-stats" aria-label="ALBLOSHI in numbers">
          <div className="container lp-stats-grid">
            {x.stats.map(([n, label]) => (
              <div className="lp-stat" key={label}><strong>{n}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="lp-how">
          <div className="container">
            <h2 className="lp-h2">{x.howTitle}</h2>
            <ol className="lp-steps">
              {x.steps.map((s, i) => (
                <li key={s.t}><span className="lp-step-n">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lp-final">
          <div className="container">
            <h2>{x.ctaTitle}</h2>
            <p>{x.ctaSub}</p>
            <div className="lp-final-actions">
              <a className="btn lp-final-quote" href="#lp-form">{fc.cta}</a>
              <a className="lp-final-link" href={`tel:${settings.phone}`}><span className="material-icons">phone_in_talk</span><bdi dir="ltr">{settings.phone_display}</bdi></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} {t('all_rights_reserved')}</span>
          <span className="lp-footer-links">
            <Link to="/privacy-policy">{t('privacy_policy')}</Link>
            <Link to="/terms">{t('terms_of_service')}</Link>
            <button type="button" className="footer-link-btn" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>{t('cookie_settings')}</button>
          </span>
        </div>
      </footer>

      {/* Phones: Call / WhatsApp / Quote always one tap away */}
      <nav className="lp-bar" aria-label="Contact">
        <a href={`tel:${settings.phone}`}><span className="material-icons">phone_in_talk</span>{x.bar.call}</a>
        <a href={waHref} target="_blank" rel="noopener noreferrer"><span className="material-icons">chat</span>{x.bar.whatsapp}</a>
        <a className="lp-bar-quote" href="#lp-form"><span className="material-icons">request_quote</span>{x.bar.quote}</a>
      </nav>
    </div>
  );
}

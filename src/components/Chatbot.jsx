import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

/* ── Helper: chip object factory. `key` is the KB entry (or special
   token) this chip navigates to — navigation never depends on the
   label text, so it works identically in any language. ──────────── */
const chip = (icon, label, key) => ({ icon, label, key });

/* ── Shared chip sets (EN) ─────────────────────────────────────── */
const BACK_MAIN_EN  = chip('arrow_back',    'Main Menu',          '__main_menu');
const CONTACT_EN    = chip('support_agent', 'Contact Us',         'contact_main');
const WHATSAPP_EN   = chip('chat',          'Chat on WhatsApp',   '__whatsapp');
const QUOTE_FORM_EN = chip('edit_note',     'Go to Contact Form', '__contact_form');

/* ── Shared chip sets (AR) ─────────────────────────────────────── */
const BACK_MAIN_AR  = chip('arrow_back',    'القائمة الرئيسية',        '__main_menu');
const CONTACT_AR    = chip('support_agent', 'اتصل بنا',                'contact_main');
const WHATSAPP_AR   = chip('chat',          'تواصل عبر واتساب',        '__whatsapp');
const QUOTE_FORM_AR = chip('edit_note',     'الانتقال لنموذج التواصل', '__contact_form');

/* ── Knowledge base (English) ─────────────────────────────────── */
const KB_EN = {
  welcome: {
    text: 'Welcome to <strong>Albloshi Assistant</strong>! I can help you explore our business verticals, products, and services. What would you like to know about?',
    chips: [
      chip('business',               'About Albloshi',        'about_albloshi'),
      chip('restaurant',             'Food Distribution',     'food_main'),
      chip('science',                'Intelligent Chemicals', 'chemicals_main'),
      chip('precision_manufacturing','Industrial Materials',  'industrial_main'),
      chip('engineering',            'Manpower Supply',       'manpower_main'),
      chip('support_agent',          'Contact Us',            'contact_main'),
    ],
  },

  about_albloshi: {
    text: '<strong>Mohammed Al Bloshi Trading Company</strong> was established in <strong>2017</strong> in Dammam, Eastern Province, Saudi Arabia.<br/><br/>We are a multi-division enterprise specializing in:<br/>• Food Distribution (rice, palm oil, restaurant supplies)<br/>• Intelligent Chemicals (exclusive TELLABS distributor for KSA & UAE)<br/>• Industrial Materials (pipes, valves, cable trays, safety gear)<br/>• Manpower Supply (certified industrial workforce)<br/><br/>Operating across <strong>Dammam, Al Khobar, Qatif, Jubail & Al Hassa</strong> — with 100+ containers imported and ambitious expansion plans across the Kingdom.',
    chips: [
      chip('restaurant',             'Food Distribution',     'food_main'),
      chip('science',                'Intelligent Chemicals', 'chemicals_main'),
      chip('precision_manufacturing','Industrial Materials',  'industrial_main'),
      chip('engineering',            'Manpower Supply',       'manpower_main'),
      CONTACT_EN, BACK_MAIN_EN,
    ],
  },

  /* ── FOOD DISTRIBUTION ────────────────────────────────────── */
  food_main: {
    text: '<strong>Food Distribution</strong><br/><br/>We specialize in wholesale and distribution of premium food products across Dammam, Al Khobar, Qatif, Jubail, and Al Hassa. All products are SFDA compliant and Halal certified.<br/><br/>Which product category are you interested in?',
    chips: [
      chip('grain',        'Basmati Rice',          'food_rice'),
      chip('opacity',      'Palm Cooking Oil',      'food_oil'),
      chip('dining',       'Restaurant Essentials', 'food_restaurant'),
      chip('bakery_dining','Grain & Sugar',         'food_grain'),
      chip('eco',          'Pakistani Spices',      'food_spices'),
      BACK_MAIN_EN,
    ],
  },
  food_rice: {
    text: '<strong>Premium Basmati Rice</strong><br/><br/>We supply select long-grain, aged Basmati rice imported directly from certified crops in Pakistan and India.<br/><br/><strong>Key features:</strong><br/>• Superior aroma & exceptional grain elongation<br/>• Available in 500gm to 50kg packs<br/>• Packaging options: Jute, Non-woven, BOPP, Jar, Plain PP<br/>• Custom branding available<br/>• SFDA Certified & Halal<br/><br/><em>Serving retailers, supermarkets, hotels & restaurants.</em>',
    chips: [
      chip('opacity',      'Palm Cooking Oil',       'food_oil'),
      chip('dining',       'Restaurant Essentials',  'food_restaurant'),
      chip('request_quote','Request Rice Quote',     '__contact_form'),
      chip('restaurant',   'Food Division',          'food_main'),
      BACK_MAIN_EN,
    ],
  },
  food_oil: {
    text: '<strong>Refined Palm Cooking Oil</strong><br/><br/>Double fractionated, high-smoke-point palm olein oil with a neutral taste — ideal for deep frying and commercial cooking.<br/><br/><strong>Available formats:</strong><br/>• 5L / 10L / 16L tins for restaurants<br/>• 200L drums for bulk buyers<br/>• Bulk tankers for manufacturers<br/>• Halal Certified<br/><br/><em>Serving food factories, catering groups & hospitality chains.</em>',
    chips: [
      chip('grain',        'Basmati Rice',          'food_rice'),
      chip('dining',       'Restaurant Essentials', 'food_restaurant'),
      chip('request_quote','Request Oil Quote',     '__contact_form'),
      chip('restaurant',   'Food Division',         'food_main'),
      BACK_MAIN_EN,
    ],
  },
  food_restaurant: {
    text: '<strong>Restaurant Essentials</strong><br/><br/>Comprehensive supply for foodservice businesses including:<br/><br/>• Food-safe packaging & disposable containers<br/>• Aluminum foil trays<br/>• Bulk dry spices & condiments<br/>• Food-safe kitchen sanitizers<br/>• Disposable cutlery & serving ware<br/><br/><em>Serving restaurant chains, catering companies & central kitchens across the Eastern Province.</em>',
    chips: [
      chip('bakery_dining','Grain & Sugar',   'food_grain'),
      chip('grain',        'Basmati Rice',    'food_rice'),
      chip('request_quote','Get a Quote',     '__contact_form'),
      chip('restaurant',   'Food Division',   'food_main'),
      BACK_MAIN_EN,
    ],
  },
  food_grain: {
    text: '<strong>Wholesale Grain & Sugar</strong><br/><br/>Enterprise-scale supply of bulk food commodities:<br/><br/>• High-grade refined white sugar (25kg / 50kg bags)<br/>• Lentils & Pulses<br/>• Chickpeas<br/>• Assorted grain commodities<br/>• SFDA Certified<br/><br/><em>Designed for central kitchens, food factories & large-scale catering operations.</em>',
    chips: [
      chip('opacity',      'Palm Cooking Oil',      'food_oil'),
      chip('dining',       'Restaurant Essentials', 'food_restaurant'),
      chip('request_quote','Get a Quote',           '__contact_form'),
      chip('restaurant',   'Food Division',         'food_main'),
      BACK_MAIN_EN,
    ],
  },
  food_spices: {
    text: '<strong>Premium Pakistani Spices</strong> — <em>Coming Soon</em><br/><br/>We are expanding our portfolio by introducing an authentic range of premium Pakistani spices into the Saudi market.<br/><br/><strong>Planned range:</strong><br/>• Red Chili, Turmeric, Cumin & Coriander<br/>• Garam Masala blends<br/>• Direct farm-sourced & certified<br/>• Custom packaging: 500gm to 50kg (Jute, BOPP, Plain PP)<br/><br/>Register your interest now and we will contact you when stock is available.',
    chips: [
      chip('request_quote','Register Interest', '__contact_form'),
      chip('grain',        'Basmati Rice',      'food_rice'),
      chip('restaurant',   'Food Division',     'food_main'),
      BACK_MAIN_EN,
    ],
  },

  /* ── INTELLIGENT CHEMICALS ────────────────────────────────── */
  chemicals_main: {
    text: '<strong>Intelligent Chemicals — TELLABS</strong><br/><br/>Albloshi is the <strong>exclusive regional distributor for TELLABS Specialty Chemicals</strong> across Saudi Arabia, UAE & GCC.<br/><br/>TELLABS leverages advanced technologies from France, the Netherlands & Spain, with ISO 9001-certified manufacturing.<br/><br/>Which chemical vertical can I help you with?',
    chips: [
      chip('water_drop',        'Water Treatment',    'chem_iwt'),
      chip('biotech',           'Polymers',            'chem_polymer'),
      chip('filter_alt',        'Activated Carbon',    'chem_carbon'),
      chip('bubble_chart',      'Defoamers',           'chem_defoamer'),
      chip('description',       'Pulp & Paper',        'chem_paper'),
      chip('cleaning_services', 'Cleaning & Hygiene',  'chem_cleaning'),
      BACK_MAIN_EN,
    ],
  },
  chem_iwt: {
    text: '<strong>Industrial Water Treatment (IWT)</strong><br/><br/>Our IWT chemical range prevents scale, corrosion & microbiological growth in:<br/><br/>• Cooling towers<br/>• Reverse Osmosis (RO) systems<br/>• MEE (Multi-Effect Evaporators)<br/>• Boilers & heat exchangers<br/>• Effluent & wastewater systems<br/><br/><strong>Includes:</strong> Corrosion inhibitors, scale inhibitors, biocides, dispersants & pH adjusters.<br/><br/><em>Used by petrochemical plants, desalination facilities & industrial water utilities across KSA.</em>',
    chips: [
      chip('biotech',      'Polymers',           'chem_polymer'),
      chip('filter_alt',   'Activated Carbon',   'chem_carbon'),
      chip('request_quote','Request IWT Quote',  '__contact_form'),
      chip('science',      'Chemicals Menu',     'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },
  chem_polymer: {
    text: '<strong>Polymers — Coagulants & Flocculants</strong><br/><br/>Our polymer range enables efficient solid-liquid separation to improve water and effluent quality:<br/><br/>• Cationic, anionic & non-ionic polyacrylamides<br/>• Coagulants for suspended solids removal<br/>• Flocculants for sludge dewatering<br/>• Suitable for municipal & industrial wastewater<br/>• Pulp & paper process aids<br/><br/><em>Applied in water treatment plants, sugar mills, paper factories & food processing facilities.</em>',
    chips: [
      chip('water_drop',   'Water Treatment',        'chem_iwt'),
      chip('filter_alt',   'Activated Carbon',       'chem_carbon'),
      chip('request_quote','Request Polymer Quote',  '__contact_form'),
      chip('science',      'Chemicals Menu',         'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },
  chem_carbon: {
    text: '<strong>Activated Carbon Solutions</strong><br/><br/>High-performance activated carbon for removal of:<br/><br/>• Odour & colour<br/>• COD (Chemical Oxygen Demand)<br/>• Organic impurities from aqueous and gas media<br/><br/><strong>Available grades:</strong><br/>• Granular Activated Carbon (GAC)<br/>• Powdered Activated Carbon (PAC)<br/>• Extruded / Pelletized Carbon<br/><br/><em>Used in water purification, air treatment, food & beverage processing & pharmaceutical applications.</em>',
    chips: [
      chip('bubble_chart',      'Defoamers',           'chem_defoamer'),
      chip('cleaning_services', 'Cleaning & Hygiene',  'chem_cleaning'),
      chip('request_quote',     'Request AC Quote',    '__contact_form'),
      chip('science',           'Chemicals Menu',      'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },
  chem_defoamer: {
    text: '<strong>Defoamers — Silicone & Organic</strong><br/><br/>Our silicone and organic defoamer range prevents and controls foaming in aqueous systems:<br/><br/>• Water treatment processes<br/>• Paper & pulp manufacturing<br/>• Food & beverage processing<br/>• Fermentation & biogas plants<br/>• Textile & coating industries<br/><br/><strong>Formats:</strong> Liquid concentrates, emulsions & powder forms based on application requirements.',
    chips: [
      chip('description',       'Pulp & Paper',            'chem_paper'),
      chip('cleaning_services', 'Cleaning & Hygiene',      'chem_cleaning'),
      chip('request_quote',     'Request Defoamer Quote',  '__contact_form'),
      chip('science',           'Chemicals Menu',          'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },
  chem_paper: {
    text: '<strong>Pulp & Paper Solutions</strong><br/><br/>Specialty chemicals to improve paper quality and process efficiency:<br/><br/>• Wet & dry strength agents<br/>• Sizing agents & retention aids<br/>• Drainage & formation aids<br/>• Deposit control chemicals<br/>• Biocides for paper mills<br/><br/><em>Helping paper manufacturers achieve better yield, reduced downtime & improved product consistency.</em>',
    chips: [
      chip('bubble_chart',  'Defoamers',    'chem_defoamer'),
      chip('biotech',       'Polymers',     'chem_polymer'),
      chip('request_quote', 'Get a Quote',  '__contact_form'),
      chip('science',       'Chemicals Menu', 'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },
  chem_cleaning: {
    text: '<strong>Cleaning & Hygiene (C&H)</strong><br/><br/>One-stop shop for industrial cleaning and hygiene chemicals across food-related industries:<br/><br/>• <strong>Dairies</strong> — CIP cleaners, sanitizers & disinfectants<br/>• <strong>Poultries</strong> — Surface disinfectants & boot dips<br/>• <strong>Meat Processing</strong> — Food-contact safe sanitizers<br/>• <strong>Breweries & Beverage</strong> — Rinse aids & fermentation vessel cleaners<br/><br/><em>All products are food-safe, SFDA-compatible & available with full MSDS documentation.</em>',
    chips: [
      chip('water_drop',   'Water Treatment',    'chem_iwt'),
      chip('request_quote','Request C&H Quote',  '__contact_form'),
      chip('science',      'Chemicals Menu',     'chemicals_main'),
      BACK_MAIN_EN,
    ],
  },

  /* ── INDUSTRIAL MATERIALS ─────────────────────────────────── */
  industrial_main: {
    text: '<strong>Industrial Materials</strong><br/><br/>We supply ASTM/ASME & SASO certified industrial materials to oil & gas, construction & manufacturing facilities across Saudi Arabia. All shipments include full <strong>Mill Test Certificates (MTC)</strong>.<br/><br/>Which product line interests you?',
    chips: [
      chip('plumbing',     'Steel Pipes',            'ind_pipes'),
      chip('settings',     'Valves & Flanges',       'ind_valves'),
      chip('cable',        'Cable Trays & Fittings', 'ind_cable'),
      chip('construction', 'Welding & Safety Gear',  'ind_welding'),
      BACK_MAIN_EN,
    ],
  },
  ind_pipes: {
    text: '<strong>Steel Pipes</strong><br/><br/>We supply a comprehensive range of certified steel piping for industrial applications:<br/><br/>• Carbon steel pipes (seamless & ERW)<br/>• Stainless steel pipes<br/>• Galvanized steel pipes<br/>• Schedule 40, 80, 160 & XXS<br/>• Sizes: ½" to 24" OD<br/>• Standards: ASTM A106, A53, API 5L<br/><br/><em>Used in oil & gas plants, refineries, water networks & construction projects.</em>',
    chips: [
      chip('settings',     'Valves & Flanges',      'ind_valves'),
      chip('cable',        'Cable Trays & Fittings','ind_cable'),
      chip('request_quote','Request Pipes Quote',   '__contact_form'),
      chip('precision_manufacturing','Industrial Menu', 'industrial_main'),
      BACK_MAIN_EN,
    ],
  },
  ind_valves: {
    text: '<strong>Valves & Flanges</strong><br/><br/>Industrial-grade valves and flanges with full material traceability:<br/><br/><strong>Valves:</strong><br/>• Gate, Globe, Ball & Check valves<br/>• Pressure ratings: Class 150 to 2500<br/>• API 6D, API 600, BS 1414 compliant<br/><br/><strong>Flanges:</strong><br/>• Weld Neck, Slip-on, Blind, Threaded<br/>• ANSI/ASME B16.5 & B16.47<br/>• Carbon & stainless steel<br/><br/><em>Supplied with MTC and third-party inspection reports on request.</em>',
    chips: [
      chip('plumbing',     'Steel Pipes',            'ind_pipes'),
      chip('cable',        'Cable Trays & Fittings', 'ind_cable'),
      chip('request_quote','Request Valves Quote',   '__contact_form'),
      chip('precision_manufacturing','Industrial Menu', 'industrial_main'),
      BACK_MAIN_EN,
    ],
  },
  ind_cable: {
    text: '<strong>Cable Trays & Fittings</strong><br/><br/>Electrical support systems for industrial & commercial projects:<br/><br/>• Perforated & ladder-type cable trays<br/>• Hot-dip galvanized & stainless steel options<br/>• Cable tray fittings: elbows, tees, reducers, covers<br/>• Conduits (rigid & flexible)<br/>• Cable cleats & supports<br/>• IEC & BS standards compliant<br/><br/><em>Supplied to EPC contractors, industrial plants & commercial building projects.</em>',
    chips: [
      chip('construction', 'Welding & Safety Gear', 'ind_welding'),
      chip('settings',     'Valves & Flanges',      'ind_valves'),
      chip('request_quote','Get a Quote',           '__contact_form'),
      chip('precision_manufacturing','Industrial Menu', 'industrial_main'),
      BACK_MAIN_EN,
    ],
  },
  ind_welding: {
    text: '<strong>Welding & Safety Gear</strong><br/><br/>We supply certified welding consumables and personal protective equipment (PPE):<br/><br/><strong>Welding:</strong><br/>• Electrodes (E6010, E7018, E316L etc.)<br/>• MIG/TIG wires & rods<br/>• Welding machines & accessories<br/><br/><strong>Safety (PPE):</strong><br/>• Hard hats, safety boots, harnesses<br/>• Fire-resistant coveralls<br/>• Gas detectors & respirators<br/>• Safety gloves & eye protection<br/><br/><em>SASO & ANSI compliant. Suitable for plant turnarounds & shutdown projects.</em>',
    chips: [
      chip('plumbing',     'Steel Pipes',              'ind_pipes'),
      chip('request_quote','Get a Safety Gear Quote',  '__contact_form'),
      chip('precision_manufacturing','Industrial Menu', 'industrial_main'),
      BACK_MAIN_EN,
    ],
  },

  /* ── MANPOWER ─────────────────────────────────────────────── */
  manpower_main: {
    text: '<strong>Manpower Supply</strong><br/><br/>We supply certified industrial workforce to sustain major plant operations, shutdowns & construction projects across Saudi Arabia.<br/><br/><strong>Available personnel:</strong><br/>• Welders (3G, 4G, 6G certified)<br/>• Pipe fitters & fabricators<br/>• Mechanical technicians<br/>• Civil & structural support teams<br/>• Safety officers (HSE certified)<br/>• Electrical technicians<br/><br/><strong>Compliance:</strong> All personnel meet Saudi Labour Law requirements with valid Iqama, GOSI & necessary trade certifications.',
    chips: [
      chip('request_quote','Submit Manpower Request', '__contact_form'),
      CONTACT_EN,
      chip('precision_manufacturing','Industrial Materials', 'industrial_main'),
      BACK_MAIN_EN,
    ],
  },

  /* ── CONTACT / DOCS ───────────────────────────────────────── */
  contact_main: {
    text: '<strong>Get in Touch</strong><br/><br/>Our team is ready to assist with quotes, technical inquiries & partnership discussions.<br/><br/><strong>Business hours:</strong> Sun–Thu, 8:00 AM – 6:00 PM (AST)<br/>📍 Dammam, Eastern Province, KSA',
    chips: [QUOTE_FORM_EN, WHATSAPP_EN, BACK_MAIN_EN],
  },

  msds_doc: {
    text: '<strong>Documentation & Certifications</strong><br/><br/>Every shipment is supported by full documentation:<br/><br/>• <strong>Mill Test Certificates (MTC)</strong> — ASTM/ASME compliant<br/>• <strong>MSDS / SDS sheets</strong> — for all TELLABS chemical products<br/>• <strong>Halal Certificates</strong> — for all food products<br/>• <strong>SFDA clearance</strong> — for food imports<br/>• <strong>ISO 9001</strong> — TELLABS manufacturing<br/><br/>Request full documentation packages through our contact form.',
    chips: [QUOTE_FORM_EN, WHATSAPP_EN, BACK_MAIN_EN],
  },
};

/* ── Knowledge base (Arabic) ──────────────────────────────────── */
const KB_AR = {
  welcome: {
    text: 'مرحبًا بك في <strong>مساعد البلوشي</strong>! يمكنني مساعدتك في استكشاف قطاعات أعمالنا ومنتجاتنا وخدماتنا. عن ماذا تود أن تعرف؟',
    chips: [
      chip('business',               'عن البلوشي',           'about_albloshi'),
      chip('restaurant',             'توزيع الأغذية',        'food_main'),
      chip('science',                'الكيميائيات الذكية',   'chemicals_main'),
      chip('precision_manufacturing','المواد الصناعية',      'industrial_main'),
      chip('engineering',            'توفير العمالة',        'manpower_main'),
      chip('support_agent',          'اتصل بنا',             'contact_main'),
    ],
  },

  about_albloshi: {
    text: '<strong>شركة محمد البلوشي التجارية</strong> تأسست عام <strong>2017</strong> في الدمام، المنطقة الشرقية، المملكة العربية السعودية.<br/><br/>نحن مؤسسة متعددة الأقسام متخصصة في:<br/>• توزيع الأغذية (الأرز، زيت النخيل، مستلزمات المطاعم)<br/>• الكيميائيات الذكية (الموزع الحصري لتيلابس في السعودية والإمارات)<br/>• المواد الصناعية (الأنابيب، الصمامات، حوامل الكابلات، معدات السلامة)<br/>• توفير العمالة (قوى عاملة صناعية معتمدة)<br/><br/>نعمل في <strong>الدمام والخبر والقطيف والجبيل والأحساء</strong> — مع أكثر من 100 حاوية مستوردة وخطط توسع طموحة في جميع أنحاء المملكة.',
    chips: [
      chip('restaurant',             'توزيع الأغذية',      'food_main'),
      chip('science',                'الكيميائيات الذكية', 'chemicals_main'),
      chip('precision_manufacturing','المواد الصناعية',    'industrial_main'),
      chip('engineering',            'توفير العمالة',      'manpower_main'),
      CONTACT_AR, BACK_MAIN_AR,
    ],
  },

  /* ── FOOD DISTRIBUTION ────────────────────────────────────── */
  food_main: {
    text: '<strong>توزيع الأغذية</strong><br/><br/>نحن متخصصون في البيع بالجملة وتوزيع المنتجات الغذائية الفاخرة في الدمام والخبر والقطيف والجبيل والأحساء. جميع المنتجات متوافقة مع SFDA ومعتمدة حلال.<br/><br/>ما هي فئة المنتجات التي تهمك؟',
    chips: [
      chip('grain',        'أرز البسمتي',            'food_rice'),
      chip('opacity',      'زيت الطهي النخيلي',       'food_oil'),
      chip('dining',       'مستلزمات المطاعم',       'food_restaurant'),
      chip('bakery_dining','الحبوب والسكر',           'food_grain'),
      chip('eco',          'التوابل الباكستانية',     'food_spices'),
      BACK_MAIN_AR,
    ],
  },
  food_rice: {
    text: '<strong>أرز بسمتي فاخر</strong><br/><br/>نورّد أرز بسمتي مختار طويل الحبة ومعتّق، يُستورد مباشرة من محاصيل معتمدة في باكستان والهند.<br/><br/><strong>المزايا الرئيسية:</strong><br/>• رائحة فائقة وطول حبة استثنائي<br/>• متوفر بعبوات من 500 جم إلى 50 كجم<br/>• خيارات التغليف: خيش، غير منسوج، BOPP، برطمان، PP عادي<br/>• إمكانية العلامة التجارية المخصصة<br/>• معتمد من SFDA وحلال<br/><br/><em>نخدم تجار التجزئة والسوبرماركت والفنادق والمطاعم.</em>',
    chips: [
      chip('opacity',      'زيت الطهي النخيلي',      'food_oil'),
      chip('dining',       'مستلزمات المطاعم',       'food_restaurant'),
      chip('request_quote','اطلب عرض سعر للأرز',     '__contact_form'),
      chip('restaurant',   'قسم الأغذية',             'food_main'),
      BACK_MAIN_AR,
    ],
  },
  food_oil: {
    text: '<strong>زيت طهي النخيل المكرر</strong><br/><br/>زيت أولين النخيل مزدوج التجزئة عالي نقطة الدخان بطعم محايد — مثالي للقلي العميق والطهي التجاري.<br/><br/><strong>الصيغ المتوفرة:</strong><br/>• علب 5 لتر / 10 لتر / 16 لتر للمطاعم<br/>• براميل 200 لتر للمشترين بالجملة<br/>• صهاريج بالجملة للمصنّعين<br/>• معتمد حلال<br/><br/><em>نخدم مصانع الأغذية ومجموعات التموين وسلاسل الضيافة.</em>',
    chips: [
      chip('grain',        'أرز البسمتي',           'food_rice'),
      chip('dining',       'مستلزمات المطاعم',      'food_restaurant'),
      chip('request_quote','اطلب عرض سعر للزيت',    '__contact_form'),
      chip('restaurant',   'قسم الأغذية',            'food_main'),
      BACK_MAIN_AR,
    ],
  },
  food_restaurant: {
    text: '<strong>مستلزمات المطاعم</strong><br/><br/>توريد شامل لأعمال خدمات الأغذية يشمل:<br/><br/>• تغليف آمن للأغذية وعبوات قابلة للتصرف<br/>• صواني رقائق الألمنيوم<br/>• توابل ومواد مضافة جافة بالجملة<br/>• معقمات مطابخ آمنة للأغذية<br/>• أدوات مائدة وتقديم قابلة للتصرف<br/><br/><em>نخدم سلاسل المطاعم وشركات التموين والمطابخ المركزية في جميع أنحاء المنطقة الشرقية.</em>',
    chips: [
      chip('bakery_dining','الحبوب والسكر',   'food_grain'),
      chip('grain',        'أرز البسمتي',      'food_rice'),
      chip('request_quote','اطلب عرض سعر',     '__contact_form'),
      chip('restaurant',   'قسم الأغذية',      'food_main'),
      BACK_MAIN_AR,
    ],
  },
  food_grain: {
    text: '<strong>الحبوب والسكر بالجملة</strong><br/><br/>توريد على مستوى المؤسسات للسلع الغذائية بالجملة:<br/><br/>• سكر أبيض مكرر عالي الجودة (أكياس 25 كجم / 50 كجم)<br/>• عدس وبقوليات<br/>• حمص<br/>• حبوب متنوعة<br/>• معتمد من SFDA<br/><br/><em>مصمم للمطابخ المركزية ومصانع الأغذية وعمليات التموين واسعة النطاق.</em>',
    chips: [
      chip('opacity',      'زيت الطهي النخيلي',   'food_oil'),
      chip('dining',       'مستلزمات المطاعم',    'food_restaurant'),
      chip('request_quote','اطلب عرض سعر',        '__contact_form'),
      chip('restaurant',   'قسم الأغذية',         'food_main'),
      BACK_MAIN_AR,
    ],
  },
  food_spices: {
    text: '<strong>توابل باكستانية فاخرة</strong> — <em>قريبًا</em><br/><br/>نوسّع محفظة منتجاتنا بإدخال مجموعة أصيلة من التوابل الباكستانية الفاخرة إلى السوق السعودي.<br/><br/><strong>المجموعة المخططة:</strong><br/>• الفلفل الأحمر، الكركم، الكمون والكزبرة<br/>• خلطات جارام ماسالا<br/>• من المزرعة مباشرة ومعتمدة<br/>• تغليف مخصص: من 500 جم إلى 50 كجم (خيش، BOPP، PP عادي)<br/><br/>سجّل اهتمامك الآن وسنتواصل معك عند توفر المخزون.',
    chips: [
      chip('request_quote','سجّل اهتمامك',      '__contact_form'),
      chip('grain',        'أرز البسمتي',       'food_rice'),
      chip('restaurant',   'قسم الأغذية',       'food_main'),
      BACK_MAIN_AR,
    ],
  },

  /* ── INTELLIGENT CHEMICALS ────────────────────────────────── */
  chemicals_main: {
    text: '<strong>الكيميائيات الذكية — تيلابس</strong><br/><br/>البلوشي هي <strong>الموزع الإقليمي الحصري لكيميائيات تيلابس المتخصصة</strong> في السعودية والإمارات ودول الخليج.<br/><br/>تعتمد تيلابس على تقنيات متقدمة من فرنسا وهولندا وإسبانيا، بتصنيع معتمد وفق ISO 9001.<br/><br/>في أي قطاع كيميائي يمكنني مساعدتك؟',
    chips: [
      chip('water_drop',        'معالجة المياه',    'chem_iwt'),
      chip('biotech',           'البوليمرات',        'chem_polymer'),
      chip('filter_alt',        'الكربون المنشط',   'chem_carbon'),
      chip('bubble_chart',      'مزيلات الرغوة',    'chem_defoamer'),
      chip('description',       'اللب والورق',      'chem_paper'),
      chip('cleaning_services', 'التنظيف والنظافة', 'chem_cleaning'),
      BACK_MAIN_AR,
    ],
  },
  chem_iwt: {
    text: '<strong>معالجة المياه الصناعية (IWT)</strong><br/><br/>تمنع مجموعتنا الكيميائية للمعالجة الترسبات والتآكل والنمو الميكروبيولوجي في:<br/><br/>• أبراج التبريد<br/>• أنظمة التناضح العكسي (RO)<br/>• المبخرات متعددة التأثير (MEE)<br/>• الغلايات ومبادلات الحرارة<br/>• أنظمة الفضلات ومياه الصرف<br/><br/><strong>تشمل:</strong> مثبطات التآكل، مثبطات الترسب، المبيدات الحيوية، المشتتات ومعدلات الأس الهيدروجيني.<br/><br/><em>تستخدمها المصانع البتروكيماوية ومحطات التحلية ومرافق المياه الصناعية في جميع أنحاء المملكة.</em>',
    chips: [
      chip('biotech',      'البوليمرات',           'chem_polymer'),
      chip('filter_alt',   'الكربون المنشط',       'chem_carbon'),
      chip('request_quote','اطلب عرض سعر IWT',     '__contact_form'),
      chip('science',      'قائمة الكيميائيات',    'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },
  chem_polymer: {
    text: '<strong>البوليمرات — المخثرات والمندفات</strong><br/><br/>تتيح مجموعة البوليمرات لدينا فصلًا فعالًا للمواد الصلبة عن السوائل لتحسين جودة المياه والفضلات السائلة:<br/><br/>• بولي أكريلاميد كاتيوني وأنيوني وغير أيوني<br/>• مخثرات لإزالة المواد الصلبة العالقة<br/>• مندفات لنزع الماء من الحمأة<br/>• مناسبة لمياه الصرف البلدية والصناعية<br/>• مساعدات عمليات اللب والورق<br/><br/><em>تُستخدم في محطات معالجة المياه ومصانع السكر ومصانع الورق ومرافق تصنيع الأغذية.</em>',
    chips: [
      chip('water_drop',   'معالجة المياه',          'chem_iwt'),
      chip('filter_alt',   'الكربون المنشط',         'chem_carbon'),
      chip('request_quote','اطلب عرض سعر البوليمرات', '__contact_form'),
      chip('science',      'قائمة الكيميائيات',      'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },
  chem_carbon: {
    text: '<strong>حلول الكربون المنشط</strong><br/><br/>كربون منشط عالي الأداء لإزالة:<br/><br/>• الروائح والألوان<br/>• الطلب الأكسجيني الكيميائي (COD)<br/>• الشوائب العضوية من الوسائط المائية والغازية<br/><br/><strong>الدرجات المتوفرة:</strong><br/>• كربون منشط حبيبي (GAC)<br/>• كربون منشط بودرة (PAC)<br/>• كربون مبثوق / محبب<br/><br/><em>يُستخدم في تنقية المياه، معالجة الهواء، تصنيع الأغذية والمشروبات، والتطبيقات الدوائية.</em>',
    chips: [
      chip('bubble_chart',      'مزيلات الرغوة',          'chem_defoamer'),
      chip('cleaning_services', 'التنظيف والنظافة',       'chem_cleaning'),
      chip('request_quote',     'اطلب عرض سعر الكربون المنشط', '__contact_form'),
      chip('science',           'قائمة الكيميائيات',      'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },
  chem_defoamer: {
    text: '<strong>مزيلات الرغوة — سيليكونية وعضوية</strong><br/><br/>تمنع مجموعة مزيلات الرغوة السيليكونية والعضوية لدينا تكوّن الرغوة وتتحكم فيها في الأنظمة المائية:<br/><br/>• عمليات معالجة المياه<br/>• تصنيع الورق واللب<br/>• تصنيع الأغذية والمشروبات<br/>• محطات التخمير والغاز الحيوي<br/>• صناعات النسيج والطلاء<br/><br/><strong>الأشكال:</strong> مركزات سائلة، مستحلبات وأشكال بودرة حسب متطلبات التطبيق.',
    chips: [
      chip('description',       'اللب والورق',              'chem_paper'),
      chip('cleaning_services', 'التنظيف والنظافة',         'chem_cleaning'),
      chip('request_quote',     'اطلب عرض سعر مزيلات الرغوة', '__contact_form'),
      chip('science',           'قائمة الكيميائيات',        'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },
  chem_paper: {
    text: '<strong>حلول اللب والورق</strong><br/><br/>كيميائيات متخصصة لتحسين جودة الورق وكفاءة العمليات:<br/><br/>• عوامل تقوية رطبة وجافة<br/>• عوامل تحجيم ومساعدات احتفاظ<br/>• مساعدات تصريف وتشكيل<br/>• كيميائيات التحكم بالترسبات<br/>• مبيدات حيوية لمصانع الورق<br/><br/><em>تساعد مصنعي الورق على تحقيق إنتاجية أفضل، وتقليل التوقف، وتحسين ثبات المنتج.</em>',
    chips: [
      chip('bubble_chart',  'مزيلات الرغوة',    'chem_defoamer'),
      chip('biotech',       'البوليمرات',        'chem_polymer'),
      chip('request_quote', 'اطلب عرض سعر',      '__contact_form'),
      chip('science',       'قائمة الكيميائيات', 'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },
  chem_cleaning: {
    text: '<strong>التنظيف والنظافة (C&H)</strong><br/><br/>مصدر شامل لكيميائيات التنظيف والنظافة الصناعية عبر الصناعات الغذائية:<br/><br/>• <strong>الألبان</strong> — منظفات CIP والمعقمات والمطهرات<br/>• <strong>الدواجن</strong> — مطهرات الأسطح وأحواض غسيل الأحذية<br/>• <strong>معالجة اللحوم</strong> — معقمات آمنة لملامسة الأغذية<br/>• <strong>المشروبات والتخمير</strong> — مساعدات الشطف ومنظفات أوعية التخمير<br/><br/><em>جميع المنتجات آمنة للأغذية ومتوافقة مع SFDA ومتوفرة مع وثائق MSDS كاملة.</em>',
    chips: [
      chip('water_drop',   'معالجة المياه',      'chem_iwt'),
      chip('request_quote','اطلب عرض سعر C&H',   '__contact_form'),
      chip('science',      'قائمة الكيميائيات',  'chemicals_main'),
      BACK_MAIN_AR,
    ],
  },

  /* ── INDUSTRIAL MATERIALS ─────────────────────────────────── */
  industrial_main: {
    text: '<strong>المواد الصناعية</strong><br/><br/>نورّد مواد صناعية معتمدة وفق ASTM/ASME وSASO لمنشآت النفط والغاز والإنشاءات والتصنيع في جميع أنحاء المملكة العربية السعودية. تشمل جميع الشحنات <strong>شهادات فحص المصنع (MTC)</strong> كاملة.<br/><br/>أي خط منتجات يهمك؟',
    chips: [
      chip('plumbing',     'أنابيب الصلب',            'ind_pipes'),
      chip('settings',     'الصمامات والشفاه',        'ind_valves'),
      chip('cable',        'حوامل الكابلات وملحقاتها','ind_cable'),
      chip('construction', 'معدات اللحام والسلامة',   'ind_welding'),
      BACK_MAIN_AR,
    ],
  },
  ind_pipes: {
    text: '<strong>أنابيب الصلب</strong><br/><br/>نورّد مجموعة شاملة من أنابيب الصلب المعتمدة للتطبيقات الصناعية:<br/><br/>• أنابيب صلب كربوني (غير ملحومة وERW)<br/>• أنابيب صلب مقاوم للصدأ<br/>• أنابيب صلب مغلفنة<br/>• Schedule 40، 80، 160 وXXS<br/>• الأحجام: من ½ بوصة إلى 24 بوصة قطر خارجي<br/>• المعايير: ASTM A106، A53، API 5L<br/><br/><em>تُستخدم في منشآت النفط والغاز والمصافي وشبكات المياه ومشاريع الإنشاءات.</em>',
    chips: [
      chip('settings',     'الصمامات والشفاه',         'ind_valves'),
      chip('cable',        'حوامل الكابلات وملحقاتها', 'ind_cable'),
      chip('request_quote','اطلب عرض سعر الأنابيب',    '__contact_form'),
      chip('precision_manufacturing','قائمة الصناعية', 'industrial_main'),
      BACK_MAIN_AR,
    ],
  },
  ind_valves: {
    text: '<strong>الصمامات والشفاه</strong><br/><br/>صمامات وشفاه بدرجة صناعية مع إمكانية تتبع كاملة للمواد:<br/><br/><strong>الصمامات:</strong><br/>• صمامات بوابية وكروية وكروية دوارة وفحص<br/>• تصنيفات الضغط: من الفئة 150 إلى 2500<br/>• متوافقة مع API 6D، API 600، BS 1414<br/><br/><strong>الشفاه:</strong><br/>• Weld Neck، Slip-on، Blind، Threaded<br/>• ANSI/ASME B16.5 وB16.47<br/>• صلب كربوني ومقاوم للصدأ<br/><br/><em>تُورَّد مع شهادات MTC وتقارير فحص من طرف ثالث عند الطلب.</em>',
    chips: [
      chip('plumbing',     'أنابيب الصلب',              'ind_pipes'),
      chip('cable',        'حوامل الكابلات وملحقاتها',  'ind_cable'),
      chip('request_quote','اطلب عرض سعر الصمامات',     '__contact_form'),
      chip('precision_manufacturing','قائمة الصناعية',  'industrial_main'),
      BACK_MAIN_AR,
    ],
  },
  ind_cable: {
    text: '<strong>حوامل الكابلات وملحقاتها</strong><br/><br/>أنظمة دعم كهربائية للمشاريع الصناعية والتجارية:<br/><br/>• حوامل كابلات مثقّبة وسلمية النوع<br/>• خيارات مغلفنة بالغمس الساخن ومقاومة للصدأ<br/>• ملحقات الحوامل: انحناءات، وصلات ثلاثية، مخفضات، أغطية<br/>• مواسير (صلبة ومرنة)<br/>• مشابك ودعامات الكابلات<br/>• متوافقة مع معايير IEC وBS<br/><br/><em>تُورَّد لمقاولي EPC والمصانع الصناعية ومشاريع المباني التجارية.</em>',
    chips: [
      chip('construction', 'معدات اللحام والسلامة',    'ind_welding'),
      chip('settings',     'الصمامات والشفاه',         'ind_valves'),
      chip('request_quote','اطلب عرض سعر',              '__contact_form'),
      chip('precision_manufacturing','قائمة الصناعية', 'industrial_main'),
      BACK_MAIN_AR,
    ],
  },
  ind_welding: {
    text: '<strong>معدات اللحام والسلامة</strong><br/><br/>نورّد مواد لحام استهلاكية معتمدة ومعدات حماية شخصية (PPE):<br/><br/><strong>اللحام:</strong><br/>• أقطاب (E6010، E7018، E316L إلخ)<br/>• أسلاك وقضبان MIG/TIG<br/>• آلات لحام وملحقاتها<br/><br/><strong>السلامة (PPE):</strong><br/>• خوذات صلبة، أحذية سلامة، أحزمة أمان<br/>• بدلات مقاومة للحريق<br/>• كاشفات غاز وأجهزة تنفس<br/>• قفازات سلامة وحماية العين<br/><br/><em>متوافقة مع SASO وANSI. مناسبة لمشاريع صيانة المصانع والتوقف.</em>',
    chips: [
      chip('plumbing',     'أنابيب الصلب',              'ind_pipes'),
      chip('request_quote','اطلب عرض سعر معدات السلامة', '__contact_form'),
      chip('precision_manufacturing','قائمة الصناعية',  'industrial_main'),
      BACK_MAIN_AR,
    ],
  },

  /* ── MANPOWER ─────────────────────────────────────────────── */
  manpower_main: {
    text: '<strong>توفير العمالة</strong><br/><br/>نورّد قوى عاملة صناعية معتمدة لدعم عمليات المصانع الكبرى وعمليات التوقف ومشاريع الإنشاءات في جميع أنحاء المملكة العربية السعودية.<br/><br/><strong>الكوادر المتوفرة:</strong><br/>• لحامون (معتمدون 3G، 4G، 6G)<br/>• فنيو ومركّبو أنابيب<br/>• فنيون ميكانيكيون<br/>• فرق دعم مدنية وإنشائية<br/>• ضباط سلامة (معتمدو HSE)<br/>• فنيون كهربائيون<br/><br/><strong>الامتثال:</strong> جميع الكوادر تستوفي متطلبات نظام العمل السعودي بإقامة سارية وتأمينات اجتماعية (GOSI) وشهادات المهنة اللازمة.',
    chips: [
      chip('request_quote','تقديم طلب عمالة', '__contact_form'),
      CONTACT_AR,
      chip('precision_manufacturing','المواد الصناعية', 'industrial_main'),
      BACK_MAIN_AR,
    ],
  },

  /* ── CONTACT / DOCS ───────────────────────────────────────── */
  contact_main: {
    text: '<strong>تواصل معنا</strong><br/><br/>فريقنا جاهز لمساعدتك في عروض الأسعار والاستفسارات الفنية ومناقشات الشراكة.<br/><br/><strong>ساعات العمل:</strong> الأحد–الخميس، 8:00 صباحًا – 6:00 مساءً (بتوقيت السعودية)<br/>📍 الدمام، المنطقة الشرقية، المملكة العربية السعودية',
    chips: [QUOTE_FORM_AR, WHATSAPP_AR, BACK_MAIN_AR],
  },

  msds_doc: {
    text: '<strong>التوثيق والشهادات</strong><br/><br/>كل شحنة مدعومة بوثائق كاملة:<br/><br/>• <strong>شهادات فحص المصنع (MTC)</strong> — متوافقة مع ASTM/ASME<br/>• <strong>صحائف MSDS / SDS</strong> — لجميع منتجات تيلابس الكيميائية<br/>• <strong>شهادات حلال</strong> — لجميع المنتجات الغذائية<br/>• <strong>تصريح SFDA</strong> — لواردات الأغذية<br/>• <strong>ISO 9001</strong> — تصنيع تيلابس<br/><br/>اطلب حزم التوثيق الكاملة عبر نموذج التواصل لدينا.',
    chips: [QUOTE_FORM_AR, WHATSAPP_AR, BACK_MAIN_AR],
  },
};

/* ── Free-text → KB key. Checks English and Arabic keywords so it
   works no matter which language the user types in. ─────────────── */
function textToKey(l) {
  if (l.match(/hello|hi |hey|greet|menu|start|help|مرحبا|أهلا|هلا|قائمة|مساعدة|السلام/)) return '__main_menu';
  if (l.match(/about|company|who are|albloshi|2017|عن الشركة|من نحن|البلوشي|تأسس/)) return 'about_albloshi';
  if (l.match(/rice|basmati|أرز|بسمتي/)) return 'food_rice';
  if (l.match(/palm oil|cooking oil|زيت|النخيل/)) return 'food_oil';
  if (l.match(/restaurant|kitchen|catering|disposable|مطعم|مطبخ|تموين/)) return 'food_restaurant';
  if (l.match(/grain|sugar|lentil|chickpea|حبوب|سكر|عدس|حمص/)) return 'food_grain';
  if (l.match(/spice|pakistan|توابل|بهارات|باكستان/)) return 'food_spices';
  if (l.match(/food|distribut|غذاء|أغذية|توزيع/)) return 'food_main';
  if (l.match(/water treatment|cooling tower|boiler|ro system|iwt|معالجة المياه|برج تبريد|غلاي/)) return 'chem_iwt';
  if (l.match(/polymer|coagulant|flocculant|sludge|بوليمر|مخثر|مندف/)) return 'chem_polymer';
  if (l.match(/activated carbon|carbon|cod|odour|كربون منشط|كربون/)) return 'chem_carbon';
  if (l.match(/defoamer|foam|antifoam|مزيل رغوة|رغوة/)) return 'chem_defoamer';
  if (l.match(/paper|pulp|tissue|ورق|لب/)) return 'chem_paper';
  if (l.match(/cleaning|hygiene|dairy|poultry|cip|sanitiz|تنظيف|نظافة|ألبان|دواجن/)) return 'chem_cleaning';
  if (l.match(/chemical|tellabs|specialty|كيميائي|تيلابس/)) return 'chemicals_main';
  if (l.match(/steel pipe|piping|carbon steel|أنابيب|صلب/)) return 'ind_pipes';
  if (l.match(/valve|flange|صمام|شفة|شفاه/)) return 'ind_valves';
  if (l.match(/cable tray|conduit|electrical|كابل|مواسير|كهربائي/)) return 'ind_cable';
  if (l.match(/weld|fabricat|ppe|safety gear|hard hat|لحام|سلامة|خوذة/)) return 'ind_welding';
  if (l.match(/industrial|material|astm|asme|صناعي|مواد/)) return 'industrial_main';
  if (l.match(/manpower|welder|labour|workforce|عمالة|عمال|قوى عاملة/)) return 'manpower_main';
  if (l.match(/doc|msds|sds|certif|mtc|halal|وثيقة|شهادة|حلال/)) return 'msds_doc';
  if (l.match(/whatsapp|phone|mobile|riaz|واتساب|جوال|رياض/)) return '__whatsapp';
  if (l.match(/contact|quote|inquiry|price|form|تواصل|اتصل|عرض سعر|استفسار/)) return 'contact_main';
  return null;
}

/* ── Component ────────────────────────────────────────────────── */
export default function Chatbot() {
  const { t, language } = useLanguage();
  const KB = language === 'ar' ? KB_AR : KB_EN;
  const [isOpen,    setIsOpen]    = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [isTyping,  setIsTyping]  = useState(false);
  const messagesEndRef = useRef(null);
  const prevLanguageRef = useRef(language);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (msg) =>
    setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);

  const showMainMenu = () => {
    addMessage({ type: 'bot', text: KB.welcome.text, isHtml: true });
    addMessage({ type: 'chips', chips: KB.welcome.chips });
  };

  // Existing messages/chips are static text baked in at the language active
  // when they were added — toggling the site language later won't retranslate
  // them by itself. Reset to a fresh welcome screen in the new language
  // instead of leaving a stale or mixed-language conversation behind.
  useEffect(() => {
    if (prevLanguageRef.current === language) return;
    prevLanguageRef.current = language;
    if (messages.length > 0) {
      setIsTyping(false);
      setMessages([]);
      showMainMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const dispatch = (key) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (key === '__main_menu') {
        showMainMenu();
      } else if (key === '__whatsapp') {
        addMessage({ type: 'bot', text: t('chat_whatsapp_intro'), isHtml: true });
        addMessage({ type: 'whatsapp' });
        addMessage({ type: 'chips', chips: [language === 'ar' ? QUOTE_FORM_AR : QUOTE_FORM_EN, language === 'ar' ? BACK_MAIN_AR : BACK_MAIN_EN] });
      } else if (key === '__contact_form') {
        addMessage({ type: 'bot', text: t('chat_redirecting') });
        setTimeout(() => { setIsOpen(false); navigate('/contact'); }, 700);
      } else if (KB[key]) {
        const entry = KB[key];
        addMessage({ type: 'bot', text: entry.text, isHtml: true });
        addMessage({ type: 'chips', chips: entry.chips });
      } else {
        addMessage({ type: 'bot', text: t('chat_fallback') });
        addMessage({ type: 'whatsapp' });
        addMessage({ type: 'chips', chips: [language === 'ar' ? QUOTE_FORM_AR : QUOTE_FORM_EN, language === 'ar' ? BACK_MAIN_AR : BACK_MAIN_EN] });
      }
    }, 950);
  };

  const handleChip = (chipObj) => {
    addMessage({ type: 'user', text: chipObj.label });
    dispatch(chipObj.key ?? '__fallback');
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    addMessage({ type: 'user', text: val });
    setInput('');
    dispatch(textToKey(val.toLowerCase()) ?? '__fallback');
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (firstOpen) { setFirstOpen(false); setTimeout(() => { setIsTyping(false); showMainMenu(); }, 900); }
  };

  return (
    <>
      <div className="chatbot-float" id="chatbotBtn" aria-label={t('chat_aria_open')} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {firstOpen && <span className="chatbot-badge">1</span>}
        <span className="material-icons">chat</span>
      </div>

      {isOpen && (
        <div className="chatbot-window active" id="chatbotWindow">
          <div className="chatbot-header">
            <div className="chatbot-info-wrapper">
              <div className="chatbot-avatar">
                <span className="material-icons" style={{ fontSize: '1.3rem', color: 'white' }}>smart_toy</span>
              </div>
              <div className="chatbot-title-group">
                <h4>{t('chat_title')}</h4>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span> {t('chat_online')}
                </span>
              </div>
            </div>
            <button className="chatbot-close" aria-label={t('chat_aria_close')} onClick={() => setIsOpen(false)}>
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="chatbot-messages" id="chatbotMessages">
            {messages.map(msg => {
              if (msg.type === 'user') {
                return <div key={msg.id} className="chatbot-bubble user">{msg.text}</div>;
              }
              if (msg.type === 'bot') {
                return msg.isHtml
                  ? <div key={msg.id} className="chatbot-bubble bot" dangerouslySetInnerHTML={{ __html: msg.text }} />
                  : <div key={msg.id} className="chatbot-bubble bot">{msg.text}</div>;
              }
              if (msg.type === 'whatsapp') {
                return (
                  <div key={msg.id} className="chatbot-whatsapp-card">
                    <p>{t('chat_whatsapp_card_text')}</p>
                    <a href="https://wa.me/966549581547" target="_blank" rel="noopener noreferrer" className="chatbot-whatsapp-btn">
                      <span className="material-icons">chat</span> {language === 'ar' ? WHATSAPP_AR.label : WHATSAPP_EN.label}
                    </a>
                  </div>
                );
              }
              if (msg.type === 'chips') {
                return (
                  <div key={msg.id} className="chatbot-chips-wrapper">
                    <div className="chatbot-chips">
                      {msg.chips.map((c, i) => (
                        <button key={i} className="chatbot-chip" onClick={() => handleChip(c)}>
                          <span className="material-icons" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '5px' }}>{c.icon}</span>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            {isTyping && (
              <div className="chatbot-typing">
                <span className="chatbot-dot"></span>
                <span className="chatbot-dot"></span>
                <span className="chatbot-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder={t('chat_input_placeholder')}
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="chatbot-send" aria-label={t('chat_aria_send')} onClick={handleSend}>
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

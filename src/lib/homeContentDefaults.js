// Default (fallback) content for the customizable Home page sections.
// These values are the exact copy that used to live inline in Home.jsx / translations.js.
// They are used both as the pre-fill for the admin editor (src/pages/admin/AdminHomeContent.jsx)
// when no Supabase row exists yet, and as the fallback Home.jsx renders with until a DB row
// overrides a given section. See supabase/home_content.sql for the backing table.

export const DEFAULTS = {
  hero_slides: [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280550/albloshi/home/hero/hero-slide-1-chemicals.jpg',
      subtitle_en: 'Intelligent Chemicals',
      subtitle_ar: 'الكيميائيات الذكية',
      title_en: 'Intelligent Chemical Solutions for Water Treatment',
      title_ar: 'حلول كيميائية ذكية لمعالجة المياه',
      cta_en: 'Explore Chemical Vertical',
      cta_ar: 'استكشف قسم الكيميائيات',
      href: '/intelligent-chemicals',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280551/albloshi/home/hero/hero-slide-2-food.jpg',
      subtitle_en: 'Food Trading',
      subtitle_ar: 'تجارة الأغذية',
      title_en: 'Premium Food Distribution Across Saudi Arabia',
      title_ar: 'توزيع أغذية متميز في جميع أنحاء المملكة العربية السعودية',
      cta_en: 'Explore Food Vertical',
      cta_ar: 'استكشف قسم الأغذية',
      href: '/food-services',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280552/albloshi/home/hero/hero-slide-3-industrial.jpg',
      subtitle_en: 'Industrial Supplies',
      subtitle_ar: 'الإمدادات الصناعية',
      title_en: 'Industrial Materials and Building Solutions',
      title_ar: 'المواد الصناعية وحلول البناء',
      cta_en: 'Explore Industrial Vertical',
      cta_ar: 'استكشف القسم الصناعي',
      href: '/industrial-services',
    },
  ],

  who_we_are: {
    label_en: 'WHO WE ARE',
    label_ar: 'من نحن',
    title_en: 'Driving Progress. Delivering Value.',
    title_ar: 'ندفع التقدم. نحقق القيمة.',
    desc_en: "A trusted multi-division trading company delivering quality products, reliable supply, and expert solutions across Saudi Arabia's key industries.",
    desc_ar: 'شركة تجارية موثوقة متعددة الأقسام تقدم منتجات عالية الجودة وتوريدًا موثوقًا وحلولًا متخصصة عبر القطاعات الرئيسية في المملكة العربية السعودية.',
    features: [
      { icon: 'public', label_en: 'Trusted Across KSA', label_ar: 'موثوقون في جميع أنحاء المملكة', desc_en: 'Dammam Headquarters with Kingdom-wide reach.', desc_ar: 'مقر رئيسي في الدمام مع انتشار على مستوى المملكة.' },
      { icon: 'verified_user', label_en: 'ISO-Based Supply', label_ar: 'توريد وفق معايير ISO', desc_en: 'Strict quality-controlled international sourcing.', desc_ar: 'توريد دولي صارم الجودة والرقابة.' },
      { icon: 'local_shipping', label_en: 'Fast Distribution', label_ar: 'توزيع سريع', desc_en: 'Advanced fleet routing for on-time delivery.', desc_ar: 'تخطيط أسطول متقدم لتوصيل في الموعد المحدد.' },
      { icon: 'engineering', label_en: 'Industrial Expertise', label_ar: 'خبرة صناعية', desc_en: 'Decades of collective technical knowledge.', desc_ar: 'عقود من المعرفة الفنية المشتركة.' },
    ],
  },

  trusted: {
    title_l1_en: 'Trusted by leading companies',
    title_l1_ar: 'موثوق به من قبل الشركات الرائدة',
    title_l2_en: 'around the world',
    title_l2_ar: 'حول العالم',
    desc_en: 'We collaborate with global leaders and trusted organizations across Saudi Arabia, India, Egypt, and the GCC to deliver high-quality solutions and long-term value.',
    desc_ar: 'نتعاون مع قادة عالميين ومؤسسات موثوقة عبر المملكة العربية السعودية، والهند، ومصر، ومنطقة الخليج العربي لتقديم حلول عالية الجودة وقيمة طويلة الأمد.',
    highlight_words: [
      { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      { en: 'India', ar: 'الهند' },
      { en: 'Egypt', ar: 'مصر' },
      { en: 'GCC', ar: 'الخليج العربي' },
    ],
  },

  bento: {
    label_en: 'OUR INTELLIGENT CHEMICALS',
    label_ar: 'كيميائياتنا الذكية',
    title_en: 'Smart Chemicals.\nReal Impact.',
    title_ar: 'كيميائيات ذكية.\nتأثير حقيقي.',
    subtitle_en: 'Our specialty chemicals are designed to solve complex challenges and deliver superior performance across industries.',
    subtitle_ar: 'تم تصميم كيميائياتنا المتخصصة لحل التحديات المعقدة وتقديم أداء متفوق عبر مختلف القطاعات الصناعية.',
    cards: [
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280554/albloshi/home/bento/bento-industrial-water-treatment.webp', icon: 'water', title_en: 'Industrial Water Treatment', title_ar: 'معالجة المياه الصناعية', desc_en: 'Prevent scale, corrosion & microbiological growth.', desc_ar: 'منع التكلس والتآكل والنمو الميكروبيولوجي.' },
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280555/albloshi/home/bento/bento-polymers.webp', icon: 'bubble_chart', title_en: 'Polymers (Coagulants & Flocculants)', title_ar: 'البوليمرات (المخثرات والمندفات)', desc_en: 'Solid liquid separation with flocculants & coagulants.', desc_ar: 'فصل المواد الصلبة عن السوائل باستخدام المندفات والمخثرات.' },
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280556/albloshi/home/bento/bento-activated-carbon.webp', icon: 'filter_alt', title_en: 'Activated Carbon Solutions', title_ar: 'حلول الكربون المنشط', desc_en: 'Removal of odour, colour, COD & organic impurities.', desc_ar: 'إزالة الروائح، الألوان، الطلب الأكسجيني الكيميائي (COD) والشوائب العضوية.' },
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280557/albloshi/home/bento/bento-defoamers.webp', icon: 'waves', title_en: 'Silicone & Organic Defoamers', title_ar: 'مزيلات الرغوة السيليكونية والعضوية', desc_en: 'Prevent & control foaming in aqueous systems.', desc_ar: 'منع ومكافحة تكوين الرغوة في الأنظمة المائية.' },
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280558/albloshi/home/bento/bento-cleaning-disinfection.webp', icon: 'cleaning_services', title_en: 'Cleaning & Disinfection', title_ar: 'التنظيف والتطهير', desc_en: 'Cleaning & hygiene in dairies, poultry & beverage.', desc_ar: 'النظافة والتطهير في مصانع الألبان، الدواجن والمشروبات.' },
      { image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280558/albloshi/home/bento/bento-fuel-additives.webp', icon: 'local_gas_station', title_en: 'Fuel Additives', title_ar: 'مضافات الوقود', desc_en: 'Enhance fuel performance, efficiency & combustion quality.', desc_ar: 'تحسين أداء الوقود، الكفاءة وجودة الاحتراق.' },
    ],
    trust_title_en: 'Quality You Can Trust. Performance You Can See.',
    trust_title_ar: 'جودة تثق بها. أداء تلمسه بنفسك.',
    trust_subtitle_en: 'High quality products. Consistent results. Stronger operations.',
    trust_subtitle_ar: 'منتجات عالية الجودة. نتائج ثابتة. عمليات أقوى.',
    partner_label_en: 'Our Strategic Partner',
    partner_label_ar: 'شريكنا الاستراتيجي',
    partner_brand_en: 'TELLABS',
    partner_brand_ar: 'TELLABS',
    partner_tagline_en: 'Intelligent Chemicals',
    partner_tagline_ar: 'كيميائيات ذكية',
  },

  verticals: {
    label_en: 'OUR BUSINESS VERTICALS',
    label_ar: 'أقسام أعمالنا',
    title_en: 'Three Verticals. One Commitment.',
    title_ar: 'ثلاثة أقسام. التزام واحد.',
    desc_en: 'We operate across three key verticals, delivering value and excellence through quality products, reliable supply, and expert solutions.',
    desc_ar: 'نعمل عبر ثلاثة أقسام رئيسية، نقدم من خلالها القيمة والتميز بمنتجات عالية الجودة وتوريد موثوق وحلول متخصصة.',
    cards: [
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280560/albloshi/home/verticals/verticals-intelligent-chemicals.png',
        title_en: 'Intelligent Chemicals', title_ar: 'الكيميائيات الذكية',
        desc_en: 'Specialty chemical solutions powered by innovation, quality, and our strategic partnership with Tellabs Chemicals.',
        desc_ar: 'حلول كيميائية متخصصة مدعومة بالابتكار والجودة وشراكتنا الاستراتيجية مع تيلابس للكيميائيات.',
        link_en: 'Explore Chemicals', link_ar: 'استكشف الكيميائيات',
        href: '/intelligent-chemicals',
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280561/albloshi/home/verticals/verticals-food-distribution.webp',
        title_en: 'Food Distribution', title_ar: 'توزيع الأغذية',
        desc_en: 'High volume distribution of premium food products with a strong network ensuring freshness and reliability.',
        desc_ar: 'توزيع منتجات غذائية متميزة بكميات كبيرة عبر شبكة قوية تضمن الطزاجة والموثوقية.',
        link_en: 'Learn More', link_ar: 'معرفة المزيد',
        href: '/food-services',
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280563/albloshi/home/verticals/verticals-industrial-manpower.webp',
        title_en: 'Industrial Material & Manpower Supply', title_ar: 'المواد الصناعية وتوفير الأيدي العاملة',
        desc_en: 'Supplying critical materials and skilled manpower solutions to keep industries running efficiently and safely.',
        desc_ar: 'توريد المواد الحيوية وحلول الأيدي العاملة الماهرة لإبقاء الصناعات تعمل بكفاءة وأمان.',
        link_en: 'Learn More', link_ar: 'معرفة المزيد',
        href: '/industrial-services',
      },
    ],
  },

  why_choose_us: {
    title_en: 'Why Choose Albloshi',
    title_ar: 'لماذا تختار البلوشي',
    desc_en: 'Aligning logistics precision, product compliance, and enterprise commercial transparency to deliver an elevated supply experience.',
    desc_ar: 'نوازن بين دقة اللوجستيات والامتثال للمنتجات والشفافية التجارية المؤسسية لتقديم تجربة توريد متميزة.',
    reasons: [
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280563/albloshi/home/why-choose-us/why-reason-1-reliable-supply-chain.jpg',
        title_en: 'Reliable Supply Chain', title_ar: 'سلسلة توريد موثوقة',
        desc_en: 'By operating unified warehousing hubs and direct import pathways, Albloshi maintains continuous reserve levels of high-volume industrial and food commodities.',
        desc_ar: 'من خلال تشغيل مراكز تخزين موحدة ومسارات استيراد مباشرة، تحافظ البلوشي على مستويات احتياطية مستمرة من السلع الصناعية والغذائية عالية الحجم.',
        large: true,
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280564/albloshi/home/why-choose-us/why-reason-2-trusted-partners.jpg',
        title_en: 'Trusted Global Partners', title_ar: 'شركاء عالميون موثوقون',
        desc_en: 'From our core partnership with TELLABS Specialty Chemicals to our verified mill suppliers, we maintain complete traceability and quality compliance logs.',
        desc_ar: 'من شراكتنا الأساسية مع كيميائيات تيلابس المتخصصة إلى مورّدي المصانع المعتمدين لدينا، نحافظ على سجلات تتبع وامتثال جودة كاملة.',
        large: false,
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280565/albloshi/home/why-choose-us/why-reason-3-technical-expertise.jpg',
        title_en: 'Technical Expertise', title_ar: 'خبرة فنية',
        desc_en: 'Our sales engineers, chemicals technicians, and project delivery managers have deep regulatory knowledge of Saudi Aramco, SASO, and SFDA standards.',
        desc_ar: 'يتمتع مهندسو المبيعات وفنيو الكيميائيات ومديرو تسليم المشاريع لدينا بمعرفة تنظيمية عميقة بمعايير أرامكو السعودية وSASO وSFDA.',
        large: false,
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280566/albloshi/home/why-choose-us/why-reason-4-fast-delivery.jpg',
        title_en: 'Fast Regional Delivery', title_ar: 'توصيل إقليمي سريع',
        desc_en: 'Operating a customized logistics fleet of temperature-controlled and industrial vehicles, we execute seamless door-to-door deliveries on schedules.',
        desc_ar: 'من خلال تشغيل أسطول لوجستي مخصص من المركبات المبردة والصناعية، ننفذ عمليات توصيل سلسة من الباب إلى الباب في الموعد المحدد.',
        large: false,
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280567/albloshi/home/why-choose-us/why-reason-5-multi-industry.jpg',
        title_en: 'Multi-Industry Systems', title_ar: 'أنظمة متعددة الصناعات',
        desc_en: 'One single enterprise vendor account provides your procurement team access to metals, specialized chemicals, bulk foods, and skilled manpower services.',
        desc_ar: 'يمنحك حساب مورد مؤسسي واحد وصول فريق المشتريات لديك إلى المعادن والكيميائيات المتخصصة والأغذية بالجملة وخدمات الأيدي العاملة الماهرة.',
        large: false,
      },
      {
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280567/albloshi/home/why-choose-us/why-reason-6-customer-support.jpg',
        title_en: 'Customer-Centric Support', title_ar: 'دعم يركز على العميل',
        desc_en: 'Every client is assigned a dedicated Account Coordinator to oversee invoice terms, dispatch schedules, custom inspections, and emergency inquiries.',
        desc_ar: 'يُخصص لكل عميل منسق حساب مخصص للإشراف على شروط الفواتير وجداول الشحن والفحوصات المخصصة والاستفسارات الطارئة.',
        large: true,
      },
    ],
  },

  network: {
    title_en: 'Robust Saudi Distribution Network',
    title_ar: 'شبكة توزيع سعودية قوية',
    desc_en: 'Headquartered strategically in Dammam to support the industrial heartland of the Eastern Province, Albloshi operates comprehensive localized fulfillment pipelines across primary commercial hubs.',
    desc_ar: 'بمقر رئيسي استراتيجي في الدمام لدعم القلب الصناعي للمنطقة الشرقية، تدير البلوشي خطوط توريد محلية شاملة عبر المراكز التجارية الرئيسية.',
    map_image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280568/albloshi/home/network/network-distribution-map.jpg',
    cards: [
      { position_class: 'card-dammam', title_en: 'Dammam (HQ)', title_ar: 'الدمام (المقر الرئيسي)', sub_en: 'Corporate Hub & Central Distribution', sub_ar: 'المركز المؤسسي والتوزيع المركزي' },
      { position_class: 'card-khobar', title_en: 'Al Khobar', title_ar: 'الخبر', sub_en: 'Sales Office & Client Services', sub_ar: 'مكتب المبيعات وخدمة العملاء' },
      { position_class: 'card-jubail', title_en: 'Jubail', title_ar: 'الجبيل', sub_en: 'Industrial Storage & Logistics', sub_ar: 'التخزين الصناعي واللوجستيات' },
      { position_class: 'card-other', title_en: 'Other Hubs', title_ar: 'مراكز أخرى', sub_en: 'Riyadh · Jeddah · Madinah · Makkah · Abha', sub_ar: 'الرياض · جدة · المدينة المنورة · مكة المكرمة · أبها' },
    ],
  },

  testimonials: {
    title_en: 'What Our Clients Say',
    title_ar: 'ماذا يقول عملاؤنا',
    desc_en: "Trusted by procurement managers, project engineers, and operations leaders across Saudi Arabia's key industries.",
    desc_ar: 'موثوق به من قبل مديري المشتريات ومهندسي المشاريع وقادة العمليات في القطاعات الرئيسية بالمملكة العربية السعودية.',
    reviews: [
      {
        id: 1,
        quote_en: '"Albloshi\'s carbon steel pipes and custom flanges are of exceptional mill quality. Every batch arrived with complete test certificates — an absolute bedrock of supply reliability."',
        quote_ar: '«أنابيب الصلب الكربوني والشفاه المخصصة من البلوشي ذات جودة مصنعية استثنائية. وصلت كل دفعة مع شهادات فحص كاملة — أساس متين لموثوقية التوريد.»',
        name: 'Eng. Hameed Al-Subaie',
        title_en: 'Chief Procurement Officer, Gulf Construction Consortium',
        title_ar: 'كبير مسؤولي المشتريات، اتحاد الخليج للإنشاءات',
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280569/albloshi/home/testimonials/testimonial-1-hameed-al-subaie.webp',
      },
      {
        id: 2,
        quote_en: '"Albloshi\'s food division supplied premium Basmati rice and refined cooking oils without a single shipping delay. Highly professional service that keeps our kitchens running perfectly."',
        quote_ar: '«زوّد قسم الأغذية في البلوشي مطبخنا بأرز بسمتي فاخر وزيوت طهي مكررة دون أي تأخير في الشحن. خدمة احترافية للغاية تُبقي مطابخنا تعمل بسلاسة.»',
        name: 'Sarah Al-Ghamdi',
        title_en: 'Executive Operations Manager, Oasis Foodservice Group',
        title_ar: 'مديرة العمليات التنفيذية، مجموعة واحة لخدمات الأغذية',
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280570/albloshi/home/testimonials/testimonial-2-sarah-al-ghamdi.webp',
      },
      {
        id: 3,
        quote_en: '"Partnering with Albloshi for TELLABS chemicals gave us immediate local inventory access and on-site consultation. The activated carbon filters have performed flawlessly, significantly lowering BOD levels."',
        quote_ar: '«منحتنا الشراكة مع البلوشي لكيميائيات تيلابس وصولاً فوريًا للمخزون المحلي واستشارة ميدانية. أداء مرشحات الكربون المنشط كان ممتازًا، وخفّض مستويات BOD بشكل ملحوظ.»',
        name: 'Dr. Faisal Al-Qahtani',
        title_en: 'Technical Operations Director, Eastern Chemical Systems',
        title_ar: 'مدير العمليات الفنية، أنظمة الشرقية الكيميائية',
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280571/albloshi/home/testimonials/testimonial-3-faisal-al-qahtani.webp',
      },
      {
        id: 4,
        quote_en: '"Their robust distribution network across Saudi Arabia ensures that our facilities in Jubail and Riyadh never face downtime due to material shortages."',
        quote_ar: '«شبكة التوزيع القوية لديهم في جميع أنحاء المملكة تضمن ألا تتوقف منشآتنا في الجبيل والرياض بسبب نقص المواد.»',
        name: 'Omar Al-Rashid',
        title_en: 'Director of Manufacturing, ALR Industries',
        title_ar: 'مدير التصنيع، صناعات ALR',
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280571/albloshi/home/testimonials/testimonial-4-omar-al-rashid.webp',
      },
      {
        id: 5,
        quote_en: '"A single vendor solution that actually works. Managing our procurement for both heavy industrial components and hospitality foods has never been easier."',
        quote_ar: '«حل موحد من مورد واحد يعمل فعليًا. إدارة مشترياتنا للمكونات الصناعية الثقيلة والأغذية الفندقية لم تكن أسهل من ذي قبل.»',
        name: 'Layla Al-Harbi',
        title_en: 'Procurement Lead, Saudi Hospitality Corp',
        title_ar: 'مسؤولة المشتريات، مجموعة السعودية للضيافة',
        image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280572/albloshi/home/testimonials/testimonial-5-layla-al-harbi.webp',
      },
    ],
  },

  faq: {
    title_en: 'Frequently Asked Questions',
    title_ar: 'الأسئلة الشائعة',
    desc_en: 'Clear, transparent answers to help guide your procurement or chemical operations partnership with Albloshi.',
    desc_ar: 'إجابات واضحة وشفافة لمساعدتك في شراكتك مع البلوشي في المشتريات أو العمليات الكيميائية.',
    items: [
      {
        id: 1,
        q_en: 'What critical industry sectors does Albloshi serve in Saudi Arabia?',
        q_ar: 'ما هي القطاعات الصناعية الحيوية التي تخدمها البلوشي في المملكة العربية السعودية؟',
        a_en: 'We serve primary strategic industries across the Kingdom, including Oil and Gas refinery setups, heavy civil construction projects, municipal and industrial water treatment installations, central food preparation hospitality chains, and commercial manufacturing plants.',
        a_ar: 'نخدم القطاعات الاستراتيجية الرئيسية في جميع أنحاء المملكة، بما في ذلك منشآت تكرير النفط والغاز، ومشاريع الإنشاءات المدنية الثقيلة، ومنشآت معالجة المياه البلدية والصناعية، وسلاسل تحضير الأغذية في قطاع الضيافة، ومصانع التصنيع التجاري.',
      },
      {
        id: 2,
        q_en: 'Do you supply comprehensive technical documentation such as mill certificates and MSDS?',
        q_ar: 'هل توفرون وثائق فنية شاملة مثل شهادات المصانع وMSDS؟',
        a_en: 'Absolutely. Every industrial material shipment is backed by corresponding Mill Test Certificates (MTC) conforming to ASTM/ASME metrics. Similarly, all specialty chemicals distributed from our TELLABS alliance arrive with detailed Material Safety Data Sheets (MSDS) and technical execution sheets.',
        a_ar: 'بالتأكيد. كل شحنة مواد صناعية مدعومة بشهادات فحص المصنع (MTC) المطابقة لمعايير ASTM/ASME. وبالمثل، تصل جميع الكيميائيات المتخصصة الموزعة من تحالفنا مع تيلابس مع صحائف بيانات سلامة المواد (MSDS) وأوراق تنفيذ فنية مفصلة.',
      },
      {
        id: 3,
        q_en: 'Is Albloshi an official and authorized distributor of TELLABS chemicals?',
        q_ar: 'هل البلوشي موزع رسمي ومعتمد لكيميائيات تيلابس؟',
        a_en: 'Yes. Mohammed Abdullah Al Bloshi Co is the designated, official regional distribution partner for TELLABS Intelligent Specialty Chemicals across Saudi Arabia and the broader GCC markets, offering local inventory stocking and direct technical support.',
        a_ar: 'نعم. شركة محمد عبدالله البلوشي التجارية هي الشريك الإقليمي الرسمي المعتمد لتوزيع كيميائيات تيلابس الذكية المتخصصة في جميع أنحاء المملكة العربية السعودية وأسواق دول الخليج الأوسع، مع مخزون محلي ودعم فني مباشر.',
      },
      {
        id: 4,
        q_en: 'What regions of Saudi Arabia do your warehousing and logistics operations support?',
        q_ar: 'ما هي مناطق المملكة العربية السعودية التي تدعمها عمليات التخزين واللوجستيات لديكم؟',
        a_en: 'Our central logistics headquarters and massive warehousing networks are based in Dammam, enabling direct supply execution to Al Khobar, Jubail, Qatif, Al Hassa, and surrounding Eastern Province sectors. We also offer planned enterprise freight dispatch to Riyadh and Jeddah.',
        a_ar: 'يقع مقرنا اللوجستي المركزي وشبكات التخزين الضخمة لدينا في الدمام، مما يتيح تنفيذ التوريد المباشر إلى الخبر والجبيل والقطيف والأحساء والقطاعات المحيطة في المنطقة الشرقية. كما نقدم شحنًا مؤسسيًا مخططًا إلى الرياض وجدة.',
      },
      {
        id: 5,
        q_en: 'Do you support specialized industrial manpower supply services?',
        q_ar: 'هل تدعمون خدمات توفير الأيدي العاملة الصناعية المتخصصة؟',
        a_en: 'Yes. We deploy highly skilled technical manpower under strictly compliant parameters. Our labor pool includes certified heavy pipe welders, industrial electricians, mechanical pipe fitters, safety inspectors, and specialized shutdown maintenance teams.',
        a_ar: 'نعم. نوفر أيدي عاملة فنية ماهرة للغاية ضمن معايير امتثال صارمة. تشمل قوتنا العاملة لحامي الأنابيب الثقيلة المعتمدين، والكهربائيين الصناعيين، ومركّبي الأنابيب الميكانيكية، ومفتشي السلامة، وفرق صيانة التوقف المتخصصة.',
      },
    ],
  },

  clients: [
    { id: 1, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280573/albloshi/home/clients/client-saudi-1.png', country: 'saudi', name: 'Saudi Client 1' },
    { id: 2, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280574/albloshi/home/clients/client-saudi-2.png', country: 'saudi', name: 'Saudi Client 2' },
    { id: 3, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280575/albloshi/home/clients/client-saudi-3.png', country: 'saudi', name: 'Saudi Client 3' },
    { id: 4, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280575/albloshi/home/clients/client-saudi-4.png', country: 'saudi', name: 'Saudi Client 4' },
    { id: 5, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280576/albloshi/home/clients/client-saudi-5.png', country: 'saudi', name: 'Saudi Client 5' },
    { id: 6, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280577/albloshi/home/clients/client-saudi-6.png', country: 'saudi', name: 'Saudi Client 6' },
    { id: 7, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280578/albloshi/home/clients/client-saudi-7.png', country: 'saudi', name: 'Saudi Client 7' },
    { id: 8, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280578/albloshi/home/clients/client-india-1.png', country: 'india', name: 'Indian Client 1' },
    { id: 9, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280580/albloshi/home/clients/client-india-2.png', country: 'india', name: 'Indian Client 2' },
    { id: 10, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280580/albloshi/home/clients/client-india-3.png', country: 'india', name: 'Indian Client 3' },
    { id: 11, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280581/albloshi/home/clients/client-india-4.png', country: 'india', name: 'Indian Client 4' },
    { id: 12, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280582/albloshi/home/clients/client-india-5.png', country: 'india', name: 'Indian Client 5' },
    { id: 13, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280583/albloshi/home/clients/client-india-6.png', country: 'india', name: 'Indian Client 6' },
    { id: 14, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280583/albloshi/home/clients/client-india-7.png', country: 'india', name: 'Indian Client 7' },
    { id: 15, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280584/albloshi/home/clients/client-india-8.png', country: 'india', name: 'Indian Client 8' },
    { id: 16, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280585/albloshi/home/clients/client-india-9.png', country: 'india', name: 'Indian Client 9' },
    { id: 17, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280586/albloshi/home/clients/client-india-10.png', country: 'india', name: 'Indian Client 10' },
    { id: 18, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280587/albloshi/home/clients/client-india-11.png', country: 'india', name: 'Indian Client 11' },
    { id: 19, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280588/albloshi/home/clients/client-india-12.png', country: 'india', name: 'Indian Client 12' },
    { id: 20, image: 'https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280588/albloshi/home/clients/client-egypt-1.png', country: 'egypt', name: 'Egypt Client' },
  ],

  cta: {
    title_en: 'Have More Questions?',
    title_ar: 'هل لديك المزيد من الأسئلة؟',
    desc_en: 'Get in touch with our team today to discuss your specific requirements, request custom quotes, or verify product specifications.',
    desc_ar: 'تواصل مع فريقنا اليوم لمناقشة متطلباتك الخاصة، أو طلب عروض أسعار مخصصة، أو التحقق من مواصفات المنتج.',
    btn1_en: 'Contact Us Now',
    btn1_ar: 'تواصل معنا الآن',
    btn2_en: 'Explore Our Verticals',
    btn2_ar: 'استكشف أقسامنا',
    btn1_href: '/contact',
    btn2_href: '/#segments',
  },
};

// Metadata describing how each section should be rendered in the admin editor.
// type: 'list' = user-manageable array of items (add/delete/reorder) stored under a
//                 wrapper object alongside other object fields (see listKey).
//       'rawList' = the DB row's `data` IS the array itself (no wrapper object) — used for `clients`.
//       'object' = a plain bilingual object, may itself contain fixed-count sub-arrays.
export const SECTION_META = [
  { key: 'hero_slides', label: 'Hero Slider', type: 'rawList' },
  { key: 'who_we_are', label: 'Who We Are', type: 'object' },
  { key: 'trusted', label: 'Trusted By', type: 'object' },
  { key: 'bento', label: 'Intelligent Chemicals', type: 'object' },
  { key: 'verticals', label: 'Business Verticals', type: 'object' },
  { key: 'why_choose_us', label: 'Why Choose Us', type: 'object' },
  { key: 'network', label: 'Distribution Network', type: 'object' },
  { key: 'testimonials', label: 'Testimonials', type: 'object' },
  { key: 'faq', label: 'FAQ', type: 'object' },
  { key: 'clients', label: 'Client Logos', type: 'rawList' },
  { key: 'cta', label: 'Contact CTA', type: 'object' },
];

// Merge a DB row's `data` over a section's default. Shallow merge, except array fields:
// if the DB data defines an array for a given key (including at the top level for
// rawList sections like `clients`/`hero_slides`), it's used wholesale; otherwise the
// default array is kept.
export function mergeSectionData(defaultData, dbData) {
  if (dbData === undefined || dbData === null) return defaultData;

  if (Array.isArray(defaultData)) {
    return Array.isArray(dbData) ? dbData : defaultData;
  }

  const merged = { ...defaultData, ...dbData };
  for (const k of Object.keys(defaultData)) {
    if (Array.isArray(defaultData[k])) {
      merged[k] = Array.isArray(dbData[k]) ? dbData[k] : defaultData[k];
    }
  }
  return merged;
}

// Fetch all home_content rows and merge each against DEFAULTS. Fails gracefully
// (returns DEFAULTS untouched) if supabase is null, the table doesn't exist yet,
// or the request otherwise errors.
export async function fetchHomeContent(supabase) {
  const merged = {};
  for (const { key } of SECTION_META) merged[key] = DEFAULTS[key];

  if (!supabase) return merged;

  try {
    const { data, error } = await supabase.from('home_content').select('*');
    if (error || !data) return merged;
    for (const row of data) {
      if (row?.section && DEFAULTS[row.section] !== undefined) {
        merged[row.section] = mergeSectionData(DEFAULTS[row.section], row.data);
      }
    }
  } catch {
    // supabase not reachable / table missing — silently fall back to defaults
  }

  return merged;
}

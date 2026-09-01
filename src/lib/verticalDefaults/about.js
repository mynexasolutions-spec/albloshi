// Default (fallback) content for the About page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='about' are missing — the live source of truth is managed at
// /admin/verticals/about. See supabase/vertical_content.sql for the table.
//
// Note: the Leadership Team section is NOT here — it's managed separately
// via the `team_members` table / /admin/team (see src/lib/teamDefaults.js).

export const DEFAULTS = {
  "cta": {
    "btn1_ar": "أرسل لنا استفسارًا",
    "btn1_en": "Send Us an Inquiry",
    "btn2_ar": "استكشف أقسامنا",
    "btn2_en": "Explore Our Verticals",
    "desc_ar": "سواء كنت بحاجة إلى مواد صناعية لعملية توقف، أو كيميائيات لمحطة مياه، أو منتجات غذائية لسلسلة فنادق، أو فريق أيدي عاملة معتمد — لدينا الموارد والخبرة لتلبية احتياجاتك.",
    "desc_en": "Whether you need industrial materials for a shutdown, chemicals for a water plant, food products for a hotel chain, or a certified manpower team — we have the resources and the expertise to deliver.",
    "title_ar": "هل أنت مستعد للشراكة مع البلوشي؟",
    "title_en": "Ready to Partner with Albloshi?",
    "btn1_href": "/contact",
    "btn2_href": "/#segments"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788290871/albloshi/about/vzqts7xigrkhsq0lybdx.jpg",
    "desc_ar": "مؤسسة رائدة متعددة القطاعات تورّد المواد الصناعية والكيميائيات المتخصصة والسلع الغذائية والأيدي العاملة الماهرة للشركات في جميع أنحاء المملكة العربية السعودية.",
    "desc_en": "A premier multi-industry enterprise supplying industrial materials, specialty chemicals, food commodities, and skilled manpower to businesses across the Kingdom of Saudi Arabia.",
    "title_l1_ar": "محمد عبدالله",
    "title_l1_en": "Mohammed Abdullah",
    "title_l2_ar": "البلوشي التجارية",
    "title_l2_en": "Al Bloshi Co."
  },
  "mv": {
    "vision_desc_ar": "أن نكون من بين أكثر شركات التوريد ثقة وكفاءة في المملكة العربية السعودية — نقدم منتجات عالية الجودة من مختلف أنحاء العالم بتميز عبر أقسام الأغذية والصناعة والكيميائيات والأيدي العاملة.",
    "vision_desc_en": "To be recognized as one of the most trusted and efficient supply companies in the Kingdom of Saudi Arabia — offering quality products from around the world, delivered with excellence across food, industrial, chemical, and manpower divisions.",
    "mission_desc_ar": "تمكين قطاعات الصناعة والتجارة والضيافة في المملكة العربية السعودية من خلال توريد موحد وعالي الجودة للمواد والكيميائيات والسلع الغذائية والأيدي العاملة الماهرة — مدعومًا بخبرة فنية والتزام صارم بالمعايير وموثوقية لا تقبل المساومة.",
    "mission_desc_en": "To empower Saudi Arabia's industrial, commercial, and hospitality sectors by delivering a unified, high-quality supply of materials, chemicals, food commodities, and skilled workforce — backed by technical expertise, strict compliance, and uncompromising reliability.",
    "promise_desc_ar": "كل طلب وكل عملية توصيل وكل تعامل مع العملاء يعكس التزامنا الأساسي: أن اختيار البلوشي يعني اختيار شريك يتفهم مجال عملك، ويحترم مواعيدك، ويقف خلف كل منتج بوثائق كاملة ودعم ما بعد البيع.",
    "promise_desc_en": "Every order, every delivery, every client interaction reflects our fundamental commitment: that choosing Albloshi means choosing a partner who understands your industry, respects your timelines, and stands behind every product with full documentation and after-sales support.",
    "vision_title_ar": "رؤيتنا",
    "vision_title_en": "Our Vision",
    "mission_title_ar": "مهمتنا",
    "mission_title_en": "Our Mission",
    "promise_title_ar": "وعدنا",
    "promise_title_en": "Our Promise"
  },
  "network": {
    "cards": [
      {
        "sub_ar": "المركز المؤسسي والتوزيع المركزي",
        "sub_en": "Corporate Hub & Central Distribution",
        "title_ar": "الدمام (المقر الرئيسي)",
        "title_en": "Dammam (HQ)",
        "position_class": "card-dammam"
      },
      {
        "sub_ar": "مكتب المبيعات وخدمة العملاء",
        "sub_en": "Sales Office & Client Services",
        "title_ar": "الخبر · القطيف",
        "title_en": "Al Khobar · Qatif",
        "position_class": "card-khobar"
      },
      {
        "sub_ar": "التوريد الصناعي والإقليمي",
        "sub_en": "Industrial & Regional Supply",
        "title_ar": "الجبيل · الأحساء",
        "title_en": "Jubail · Al Hassa",
        "position_class": "card-jubail"
      },
      {
        "sub_ar": "الرياض · جدة · المدينة المنورة · مكة المكرمة · أبها",
        "sub_en": "Riyadh · Jeddah · Madinah · Makkah · Abha",
        "title_ar": "توسع في جميع أنحاء المملكة",
        "title_en": "Expanding Across KSA",
        "position_class": "card-other"
      }
    ],
    "desc_ar": "بمقر رئيسي استراتيجي في الدمام لدعم القلب الصناعي للمنطقة الشرقية، تدير البلوشي خطوط توريد محلية شاملة عبر المراكز التجارية الرئيسية.",
    "desc_en": "Headquartered strategically in Dammam to support the industrial heartland of the Eastern Province, Albloshi operates comprehensive localized fulfillment pipelines across primary commercial hubs.",
    "title_ar": "شبكة توزيع سعودية قوية",
    "title_en": "Robust Saudi Distribution Network",
    "map_image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788280568/albloshi/home/network/network-distribution-map.jpg"
  },
  "stats": [
    {
      "value": "8+",
      "label_ar": "سنوات من الخبرة",
      "label_en": "Years of Experience"
    },
    {
      "value": "100+",
      "label_ar": "حاوية مستوردة",
      "label_en": "Containers Imported"
    },
    {
      "value": "5+",
      "label_ar": "مدينة نخدمها",
      "label_en": "Cities Served"
    },
    {
      "value": "4",
      "label_ar": "أقسام تجارية",
      "label_en": "Business Divisions"
    }
  ],
  "story": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788289006/albloshi/about/story-image.jpg",
    "p1_ar": "تأسست شركة البلوشي عام 2017 في الدمام كمؤسسة متميزة لتوزيع الأغذية، ونمت لتصبح شركة ذات أربعة أقسام تخدم قطاعات الضيافة والصناعة والكيميائيات والأيدي العاملة في جميع أنحاء المملكة.",
    "p1_en": "Founded in 2017 in Dammam, Al Bloshi Co began as a premium food distribution enterprise and has grown into a four-division company serving hospitality, industrial, chemical, and manpower sectors across the Kingdom.",
    "label_ar": "قصتنا",
    "label_en": "OUR STORY",
    "highlights": [
      {
        "ar": "مقرنا الرئيسي في الدمام — المركز التجاري للمنطقة الشرقية",
        "en": "Headquartered in Dammam — Eastern Province commercial hub"
      },
      {
        "ar": "موزع حصري لتيلابس في السعودية والإمارات ودول الخليج",
        "en": "Exclusive TELLABS distributor across Saudi Arabia, UAE & GCC"
      },
      {
        "ar": "سلسلة توريد متوافقة مع معايير SFDA وSASO وASTM وISO",
        "en": "SFDA, SASO, ASTM & ISO compliant supply chain"
      },
      {
        "ar": "نخدم الدمام، الخبر، القطيف، الجبيل، والأحساء",
        "en": "Serving Dammam, Al Khobar, Qatif, Jubail & Al Hassa"
      }
    ],
    "cr_label_ar": "السجل التجاري رقم",
    "cr_label_en": "CR No.",
    "p2_after_ar": "في المملكة العربية السعودية والإمارات العربية المتحدة — نقدم السلع الغذائية والمواد الصناعية والكيميائيات المتخصصة والأيدي العاملة الماهرة تحت اسم واحد موثوق.",
    "p2_after_en": "across Saudi Arabia and the UAE — delivering food commodities, industrial materials, specialty chemicals, and skilled manpower under one trusted name.",
    "p2_before_ar": "نحن اليوم الموزع الإقليمي الحصري لـ",
    "p2_before_en": "Today we are the exclusive regional distributor for",
    "p2_strong_ar": "كيميائيات تيلابس الذكية",
    "p2_strong_en": "TELLABS Intelligent Chemicals"
  },
  "values": {
    "items": [
      {
        "icon": "verified",
        "desc_ar": "كل منتج نورّده — من أنابيب الصلب الكربوني إلى الكيميائيات المتخصصة — يأتي مع وثائق تتبع كاملة وشهادات مصنعية وامتثال للمعايير الدولية بما في ذلك ASTM وASME وSASO وSFDA.",
        "desc_en": "Every product we supply — from carbon steel pipes to specialty chemicals — comes with full traceability documentation, mill certificates, and compliance to international standards including ASTM, ASME, SASO, and SFDA.",
        "title_ar": "الجودة أولاً",
        "title_en": "Quality First"
      },
      {
        "icon": "handshake",
        "desc_ar": "نبني علاقات وليس مجرد صفقات. يثق بنا عملاؤنا في قطاعات النفط والغاز والإنشاءات والضيافة والتصنيع كمورد واحد موثوق لأننا نفي بالتزاماتنا باستمرار.",
        "desc_en": "We build relationships, not transactions. Our clients in oil & gas, construction, hospitality, and manufacturing trust us as a single, reliable vendor because we consistently deliver on commitments.",
        "title_ar": "شراكات طويلة الأمد",
        "title_en": "Long-Term Partnerships"
      },
      {
        "icon": "local_shipping",
        "desc_ar": "بدعم من أسطول لوجستي متخصص ومستودعات مركزية في الدمام والرياض وجدة، نضمن وصول البضائع إلى مواقع المشاريع في المنطقة الشرقية وخارجها في الموعد المحدد — في كل مرة.",
        "desc_en": "Backed by a dedicated logistics fleet and centralized warehousing in Dammam, Riyadh, and Jeddah, we ensure goods reach project sites across the Eastern Province and beyond on schedule — every time.",
        "title_ar": "التميز التشغيلي",
        "title_en": "Operational Excellence"
      },
      {
        "icon": "groups",
        "desc_ar": "من فريق قيادتنا إلى فنيي الميدان ومديري الحسابات، كل فرد في البلوشي ملتزم برسالة تمكين الصناعات بالموارد التي تحتاجها لتزدهر.",
        "desc_en": "From our leadership team to our field technicians and account managers, every person at Albloshi is committed to the mission of empowering industries with the resources they need to thrive.",
        "title_ar": "محورنا الإنسان",
        "title_en": "People-Driven"
      },
      {
        "icon": "eco",
        "desc_ar": "من خلال شراكتنا مع تيلابس، نروّج لحلول كيميائية مسؤولة بيئيًا تقلل من النفايات الصناعية وتخفض الانبعاثات وتدعم مبادرة السعودية الخضراء.",
        "desc_en": "Through our partnership with TELLABS, we promote environmentally responsible chemical solutions that reduce industrial waste, lower emissions, and support Saudi Arabia's Green Initiative.",
        "title_ar": "الاستدامة",
        "title_en": "Sustainability"
      },
      {
        "icon": "emoji_events",
        "desc_ar": "مع مشاريع منفذة في الجبيل والدمام والرياض وجدة، يتحدث سجلنا عن نفسه. دعمنا عمليات التوقف والمشاريع الكبرى والعمليات اليومية لأكثر من عقد من الزمن.",
        "desc_en": "With projects delivered across Jubail, Dammam, Riyadh, and Jeddah, our portfolio speaks for itself. We have supported shutdowns, large-scale builds, and everyday operations for over a decade.",
        "title_ar": "سجل حافل بالإنجازات",
        "title_en": "Proven Track Record"
      }
    ],
    "desc_ar": "هذه المبادئ تحدد كيفية عملنا، وكيفية خدمتنا لعملائنا، وكيفية اتخاذ القرارات على كل مستوى من مستويات العمل.",
    "desc_en": "These principles define how we operate, how we serve our clients, and how we make decisions at every level of the business.",
    "label_ar": "ما نؤمن به",
    "label_en": "WHAT WE STAND FOR",
    "title_ar": "قيمنا الأساسية",
    "title_en": "Our Core Values"
  }
};

export const SECTIONS = ['hero', 'stats', 'story', 'mv', 'values', 'network', 'cta'];

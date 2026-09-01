// Default (fallback) content for the TELLABS Chemicals partner-brand page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='tellabs' are missing — the live source of truth is managed at
// /admin/verticals/tellabs. See supabase/vertical_content.sql for the table.

export const DEFAULTS = {
  "about": {
    "title_ar": "حلول كيميائية ذكية",
    "title_en": "Intelligent Chemical Solutions",
    "philosophy": [
      {
        "icon": "architecture",
        "desc_ar": "نصمم حلولاً مخصصة لمعالجة الترسبات والرغوة وعوائق الفصل — ننجح حيث يفشل الآخرون.",
        "desc_en": "We engineer bespoke solutions to resolve scaling, foam, and separation blocks — succeeding where others fail.",
        "title_ar": "حل المشكلات",
        "title_en": "Problem Solving"
      },
      {
        "icon": "trending_up",
        "desc_ar": "يتم التحقق من كل برنامج بسجلات عائد لضمان وفورات ملموسة في الطاقة والمياه وتكاليف المواد.",
        "desc_en": "Every program is validated by return logs to ensure concrete energy, water, and material cost savings.",
        "title_ar": "عائد استثمار حقيقي",
        "title_en": "Real Return on Investment"
      },
      {
        "icon": "school",
        "desc_ar": "ندمج أحدث التقنيات الكيميائية ونماذج العمليات للبقاء في المقدمة وتقديم حلول أذكى.",
        "desc_en": "We integrate the latest chemical technologies and process models to stay ahead and deliver smarter solutions.",
        "title_ar": "تعلّم مستمر",
        "title_en": "Continuous Learning"
      }
    ],
    "p1_after_ar": "— تقدم تركيبات متخصصة عالمية المستوى للعمليات الصناعية المعقدة.",
    "p1_after_en": "— delivering world-class specialty formulations for complex industrial operations.",
    "p2_after_ar": "بدعم من 153 باحثًا ومهندس مبيعات وفني كيميائي يركزون على كيمياء عمليات صديقة للبيئة وعالية الأداء.",
    "p2_after_en": "certification, backed by 153 researchers, sales engineers, and chemical technicians focused on eco-friendly, performance-driven process chemistries.",
    "p1_before_ar": "تُعد تيلابس للكيميائيات المتخصصة رائدة في الكيميائيات الذكية، بتقنية متقدمة من مراكز أبحاث رائدة في",
    "p1_before_en": "TELLABS Specialty Chemicals is a pioneer in Intelligent Chemicals, with advanced technology from leading research centers in",
    "p1_strong_ar": "فرنسا وهولندا وإسبانيا",
    "p1_strong_en": "France, Netherlands, & Spain",
    "p2_before_ar": "جميع المرافق حاصلة على شهادة",
    "p2_before_en": "All facilities hold",
    "p2_strong_ar": "ISO 9001",
    "p2_strong_en": "ISO 9001",
    "philosophy_title_ar": "فلسفة عملنا",
    "philosophy_title_en": "Our Business Philosophy"
  },
  "collaborators": {
    "items": [
      {
        "name": "Alma Ingenierie, France",
        "specialty_ar": "هندسة كيميائية متقدمة وتصميم عمليات.",
        "specialty_en": "Advanced chemical engineering & process design."
      },
      {
        "name": "Dresser Wayne, USA",
        "specialty_ar": "قياس دقيق للسوائل وأنظمة تحكم في الموائع.",
        "specialty_en": "Precision liquid metering & fluid control systems."
      },
      {
        "name": "Buckman, USA",
        "specialty_ar": "بوليمرات عمليات اللب والورق وأنظمة مبيدات التبريد الحيوية.",
        "specialty_en": "Pulp & paper process polymers & cooling biocide systems."
      },
      {
        "name": "Degussa, Germany",
        "specialty_ar": "تطوير محفزات متخصصة ومواد ماصة صناعية.",
        "specialty_en": "Specialty catalyst development & industrial adsorbents."
      },
      {
        "name": "Whessoe-Varec, UK",
        "specialty_ar": "أجهزة سلامة تخزين السوائل وقياس الخزانات عن بعد.",
        "specialty_en": "Liquid storage safety instrumentation & tank telemetry."
      },
      {
        "name": "Avery Hardoll, UK",
        "specialty_ar": "معدات تزويد وقود الطيران بالجملة عالية التدفق والترشيح.",
        "specialty_en": "High-flow bulk aviation fueling equipment & filtration."
      }
    ],
    "desc_ar": "يشمل متعاونو تيلابس ونقل التقنية لديها شركات متعددة الجنسيات كبرى، اختيرت خصيصًا لريادتها العالمية وتفوقها التقني.",
    "desc_en": "TELLABS collaborators and technology transfers include major multinational corporations, chosen specifically for their world leadership position and technological superiority.",
    "label_ar": "المتعاونون العالميون",
    "label_en": "GLOBAL COLLABORATORS",
    "title_ar": "نقل التقنية والشراكات",
    "title_en": "Technology Transfers & Partnerships"
  },
  "cta": {
    "btn1_ar": "تواصل مع خبرائنا",
    "btn1_en": "Contact Our Experts",
    "btn2_ar": "استكشف أقسامنا",
    "btn2_en": "Explore Our Verticals",
    "desc_ar": "تشارك مع تيلابس للكيميائيات للحصول على حلول متخصصة رائدة في الصناعة، وتقنيات مستدامة، ودعم فني استثنائي.",
    "desc_en": "Partner with TELLABS Chemicals for industry-leading specialty solutions, sustainable technologies, and exceptional technical support.",
    "title_ar": "هل أنت مستعد للارتقاء بعملياتك؟",
    "title_en": "Ready to Elevate Your Operations?",
    "btn1_href": "/contact",
    "btn2_href": "/#segments"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285330/albloshi/chemicals/hero-bg.jpg",
    "desc_ar": "شراكة توزيع إقليمية رسمية تقدم تركيبات كيميائية أوروبية التقنية متقدمة في جميع أنحاء المملكة العربية السعودية ودول الخليج.",
    "desc_en": "Official regional distribution partnership delivering advanced, European-technology chemical formulations across Saudi Arabia & the GCC.",
    "title_ar": "تحالف تيلابس للكيميائيات",
    "title_en": "TELLABS Chemicals Alliance"
  },
  "segments": {
    "items": [
      {
        "icon": "water_drop",
        "desc_ar": "مثبطات الترسب/التآكل، كيميائيات الغلايات/أبراج التبريد، مانعات ترسب التناضح العكسي، وبوليمرات مياه الصرف.",
        "desc_en": "Scale/corrosion inhibitors, boiler/cooling tower chemicals, RO antiscalants, and wastewater polymers.",
        "title_ar": "معالجة المياه",
        "title_en": "Water Treatment"
      },
      {
        "icon": "build",
        "desc_ar": "كيمياء عمليات للمعالجة المسبقة للأسطح ومنع الصدأ والتنظيف والطلاء الكهربائي.",
        "desc_en": "Process chemistry for surface pre-treatment, rust prevention, cleaning, and electroplating.",
        "title_ar": "معالجة المعادن",
        "title_en": "Metal Treatment"
      },
      {
        "icon": "waves",
        "desc_ar": "بوليمرات الاحتفاظ والتصريف، مزيلات رغوة اللب، مساعدات الطلاء، وتركيبات التحكم باللزوجة.",
        "desc_en": "Retention and drainage polymers, pulp defoamers, coating aids, and stickies control formulations.",
        "title_ar": "اللب والورق",
        "title_en": "Pulp & Paper"
      },
      {
        "icon": "filter_alt",
        "desc_ar": "منتجات كربون حبيبي وبودرة عالية اليود لتنقية الهواء/المياه والترشيح البلدي.",
        "desc_en": "High-iodine granular and powdered carbon products for air/water purification and municipal filtration.",
        "title_ar": "الكربون المنشط",
        "title_en": "Activated Carbon"
      },
      {
        "icon": "forest",
        "desc_ar": "إضافات وتركيبات كيميائية متخصصة لحفظ الأخشاب وحمايتها ومعالجتها.",
        "desc_en": "Specialized additives and chemical formulations for wood preservation, protection, and processing.",
        "title_ar": "معالجة الأخشاب",
        "title_en": "Wood Treatment"
      }
    ],
    "desc_ar": "نقدم تركيبات محسّنة للغاية عبر أنظمة المعالجة الصناعية والمياه الرئيسية.",
    "desc_en": "Delivering highly optimized formulations across key industrial processing and water systems.",
    "label_ar": "القدرات",
    "label_en": "CAPABILITIES",
    "title_ar": "قطاعات الكيمياء المتخصصة",
    "title_en": "Specialty Chemistry Segments"
  },
  "trust": {
    "quotes": [
      {
        "cite_ar": "مصانع سينتشري للب والورق",
        "cite_en": "Century Pulp & Paper Mills",
        "quote_ar": "«لا يوجد حل للمشكلة، إن لم تقدم تيلابس حلولاً لها.»",
        "quote_en": "\"The problem has no solution, if TELLABS has no solutions to offer.\""
      },
      {
        "cite_ar": "شركة عميل مجهولة الاسم",
        "cite_en": "Anonymous Client Corporation",
        "quote_ar": "«تيلابس هي الملاذ الأخير لأي مشكلة كيميائية متخصصة يتعذر حلها.»",
        "quote_en": "\"TELLABS is the latest resort for any non-solvable specialty chemical problems.\""
      }
    ],
    "clients": [
      "BASF (India) Limited",
      "Tata Chemicals",
      "IOCL (Indian Oil Corp.)",
      "Aditya Birla Group",
      "Everest Industries",
      "Aryan Coal"
    ],
    "title_ar": "ثقة الصناعة",
    "title_en": "Industry Trust",
    "footer_text_ar": "من خلال شركة محمد عبدالله البلوشي التجارية، تصل المؤسسات الإقليمية السعودية والخليجية إلى شبكة الموردين العالمية هذه والموارد الهندسية الفنية محليًا.",
    "footer_text_en": "Through Mohammed Abdullah Al Bloshi Co, regional Saudi and GCC enterprises access this global supplier network and technical engineering resources locally.",
    "clients_label_ar": "البصمة العالمية للعملاء",
    "clients_label_en": "GLOBAL CLIENT FOOTPRINT",
    "clients_title_ar": "موثوق بها في القطاعات الرئيسية",
    "clients_title_en": "Trusted in Primary Sectors",
    "customers_label_ar": "ماذا يقول عملاؤنا",
    "customers_label_en": "WHAT CUSTOMERS SAY"
  }
};

export const SECTIONS = ['hero', 'about', 'segments', 'collaborators', 'trust', 'cta'];

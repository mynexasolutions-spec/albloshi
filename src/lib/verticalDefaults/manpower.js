// Default (fallback) content for the Manpower Supply vertical page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='manpower' are missing — the live source of truth is managed at
// /admin/verticals/manpower. See supabase/vertical_content.sql for the table.

export const DEFAULTS = {
  "cta": {
    "desc_ar": "تواصل مع فريق توفير العمالة بشركة البلوشي اليوم للحصول على استجابة سريعة وحلول توظيف مخصصة في جميع أنحاء المملكة.",
    "desc_en": "Get in touch with Albloshi Manpower Supply team today for quick deployment and custom workforce solutions across KSA.",
    "title_ar": "هل تحتاج إلى قوة عاملة معتمدة لمشروعك؟",
    "title_en": "Need Certified Workforce For Your Project?",
    "btn1_href": "tel:+966543188882",
    "btn2_href": "https://wa.me/966543188882"
  },
  "features": {
    "items": [
      {
        "icon": "local_shipping",
        "desc_ar": "حلول توظيف مخصصة للمشاريع أو لفترات طويلة مصممة لتلبية احتياجاتك التشغيلية.",
        "desc_en": "Project-based and long-term staffing solutions tailored to your operational needs.",
        "title_ar": "توفير مرن",
        "title_en": "FLEXIBLE DEPLOYMENT"
      },
      {
        "icon": "assignment",
        "desc_ar": "دعم التجهيز والتحريك مع وثائق كاملة لدخول الموقع بسهولة وبدون أي عقبات.",
        "desc_en": "Mobilization support with complete documentation for smooth and hassle-free site access.",
        "title_ar": "فرق جاهزة بالمستندات",
        "title_en": "DOCUMENT-READY TEAMS"
      },
      {
        "icon": "verified_user",
        "desc_ar": "قوة عاملة موثوقة ملتزمة بمعايير السلامة ومتطلبات الامتثال في موقع العمل.",
        "desc_en": "Reliable workforce aligned to site safety standards and compliance requirements.",
        "title_ar": "التركيز على السلامة",
        "title_en": "SAFETY FOCUS"
      },
      {
        "icon": "support_agent",
        "desc_ar": "تنسيق سريع ودعم على مدار الساعة لتلبية متطلبات المشاريع العاجلة.",
        "desc_en": "Fast coordination and round-the-clock support for urgent project requirements.",
        "title_ar": "دعم سريع واستجابة",
        "title_en": "RESPONSIVE SUPPORT"
      }
    ]
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285708/albloshi/manpower/hero.jpg",
    "desc_ar": "تدعم البلوشي المشاريع الصناعية والإنشائية وأعمال الصيانة بتوفير عمالة مرنة للمتطلبات قصيرة وطويلة الأجل وأعمال الإغلاق وتوقف المصانع.",
    "desc_en": "Albloshi supports industrial, construction and maintenance projects with flexible manpower supply for short-term, long-term and shutdown requirements.",
    "badge_ar": "قوة عاملة موثوقة. نتائج مضمونة.",
    "badge_en": "RELIABLE WORKFORCE. DELIVERING RESULTS.",
    "title1_ar": "حلول العمالة",
    "title1_en": "MANPOWER",
    "title2_ar": "المتكاملة",
    "title2_en": "SOLUTIONS",
    "skilled_label_ar": "العمالة الماهرة",
    "skilled_label_en": "SKILLED MANPOWER",
    "unskilled_label_ar": "العمالة العادية والمساعدة",
    "unskilled_label_en": "NON-SKILLED LABOUR"
  },
  "items": [
    {
      "id": "engineers-supervisors-foremen",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285710/albloshi/manpower/engineers-supervisors-foremen.webp",
      "desc_ar": "",
      "desc_en": "Highly qualified civil, mechanical, electrical, and instrument engineers, site supervisors, and foremen with extensive field experience across major Saudi industrial and construction projects.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "Certified Engineers",
        "Site Supervision",
        "QA/QC Supervision",
        "Project Leadership"
      ],
      "title_ar": "مهندسون ومشرفون ومراقبون",
      "title_en": "Engineers, supervisors and foremen"
    },
    {
      "id": "electricians-instrument-technicians",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285711/albloshi/manpower/electricians-instrument-technicians.webp",
      "desc_ar": "",
      "desc_en": "Certified industrial electricians, instrument technicians, and PLC calibrators trained for power plants, oil & gas facilities, and manufacturing plants.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "Industrial Wiring",
        "PLC & Instrument Calibration",
        "High Voltage Certified",
        "Troubleshooting"
      ],
      "title_ar": "كهربائيون وفنيو أجهزة دقيقة",
      "title_en": "Electricians and instrument technicians"
    },
    {
      "id": "welders-fabricators-pipefitters",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285712/albloshi/manpower/welders-fabricators-pipefitters.webp",
      "desc_ar": "",
      "desc_en": "6G certified welders (TIG, MIG, ARC), experienced structural fabricators, and precision pipefitters for plant piping and heavy steel structures.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "6G Certified Welders",
        "Pipe Fabricators",
        "Structural Assembly",
        "ASME & API Standards"
      ],
      "title_ar": "لحامون وفنيو تجميع ومقاسات أنابيب",
      "title_en": "Welders, fabricators and pipe fitters"
    },
    {
      "id": "plumbers-hvac-technicians",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285713/albloshi/manpower/plumbers-hvac-technicians.webp",
      "desc_ar": "",
      "desc_en": "Reliable HVAC specialists delivering central cooling, duct installation, chilled water piping, and industrial plumbing services.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "Chilled Water Systems",
        "Plumbing Maintenance",
        "HVAC Diagnostics"
      ],
      "title_ar": "سباكون وفنيو تكييف وتبريد",
      "title_en": "Plumbers and HVAC technicians"
    },
    {
      "id": "riggers-scaffolders-operators",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285714/albloshi/manpower/riggers-scaffolders-operators.webp",
      "desc_ar": "",
      "desc_en": "TUV & Aramco certified riggers, certified scaffolders for heavy plant structures, and licensed operators for cranes, forklifts, and excavators.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "Aramco / TUV Certified",
        "Heavy Lifting Operations",
        "Certified Scaffold Erection",
        "Equipment Safety"
      ],
      "title_ar": "فنيو تربيط وسقالات ومشغلو معدات",
      "title_en": "Riggers, scaffolders and equipment operators"
    },
    {
      "id": "safety-storekeepers-timekeepers",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285715/albloshi/manpower/safety-storekeepers-timekeepers.webp",
      "desc_ar": "",
      "desc_en": "NEBOSH/OSHA certified safety officers, warehouse storekeepers, material managers, and digital timekeepers for workforce attendance tracking.",
      "category": "skilled",
      "specs_ar": [],
      "specs_en": [
        "NEBOSH / OSHA Certified",
        "Site HSE Audit",
        "Store & Material Management",
        "Automated Timekeeping"
      ],
      "title_ar": "مسؤولو سلامة وأمناء مستودعات ومسجلو أوقات",
      "title_en": "Safety officers, storekeepers and timekeepers"
    },
    {
      "id": "general-labour-helpers",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285716/albloshi/manpower/general-labour-helpers.webp",
      "desc_ar": "",
      "desc_en": "Energetic and safety-trained general labourers and site helpers for daily construction, industrial plant support, and routine site duties.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "Physically Fit",
        "Safety Induction Done",
        "Daily Site Helper",
        "Rapid Deployment"
      ],
      "title_ar": "عمال عامون ومساعدون",
      "title_en": "General labour and helpers"
    },
    {
      "id": "loading-unloading-material-handling",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285717/albloshi/manpower/loading-unloading-material-handling.webp",
      "desc_ar": "",
      "desc_en": "Experienced material handling teams for heavy cargo loading, unloading container shipments, and internal factory logistics.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "Heavy Cargo Handling",
        "Container Stacking",
        "Warehouse Logistics",
        "Safe Handling Protocols"
      ],
      "title_ar": "تحميل وتفريغ ومناولة المواد",
      "title_en": "Loading, unloading and material handling"
    },
    {
      "id": "site-cleaning-housekeeping",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285717/albloshi/manpower/site-cleaning-housekeeping.webp",
      "desc_ar": "",
      "desc_en": "Professional housekeeping crews for post-construction site cleaning, industrial debris removal, and ongoing site sanitation.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "Post-Construction Cleanup",
        "Industrial Debris Removal",
        "Environmental Sanitation",
        "Daily Upkeep"
      ],
      "title_ar": "فرق تنظيف المواقع والنظافة العامة",
      "title_en": "Site cleaning and housekeeping teams"
    },
    {
      "id": "packing-sorting-warehouse",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285718/albloshi/manpower/packing-sorting-warehouse.webp",
      "desc_ar": "",
      "desc_en": "Reliable warehouse assistants for goods sorting, order packing, labeling, palletization, and dispatch management.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "Goods Sorting & Packing",
        "Palletization",
        "Barcode Labeling",
        "Dispatch Support"
      ],
      "title_ar": "تعبئة وفرز ودعم المستودعات",
      "title_en": "Packing, sorting and warehouse support"
    },
    {
      "id": "construction-support-civil-helpers",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285719/albloshi/manpower/construction-support-civil-helpers.webp",
      "desc_ar": "",
      "desc_en": "Dedicated civil helpers for concrete works, masonry assistance, trench digging, formwork support, and foundation preparation.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "Civil Works Helper",
        "Concrete Pour Support",
        "Formwork Assistance",
        "Trenching & Prep"
      ],
      "title_ar": "دعم الإنشاءات والمساعدون المدنيون",
      "title_en": "Construction support and civil helpers"
    },
    {
      "id": "shutdown-mobilization-crews",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285720/albloshi/manpower/shutdown-mobilization-crews.webp",
      "desc_ar": "",
      "desc_en": "Turnaround and shutdown mobilization teams capable of 24/7 rotational shifts for urgent refinery, petrochemical, and industrial plant maintenance.",
      "category": "unskilled",
      "specs_ar": [],
      "specs_en": [
        "24/7 Rotational Shift",
        "Rapid Plant Mobilization",
        "Shutdown Specialist",
        "Turnaround Support"
      ],
      "title_ar": "طواقم التجهيز وأعمال الإغلاق وتوقف المصانع",
      "title_en": "Shutdown and project mobilization crews"
    }
  ]
};

export const SECTIONS = ['hero', 'items', 'features', 'cta'];

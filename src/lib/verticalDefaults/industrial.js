// Default (fallback) content for the Industrial Services vertical page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='industrial' are missing — the live source of truth is managed at
// /admin/verticals/industrial. See supabase/vertical_content.sql for the table.

export const DEFAULTS = {
  "capabilities": {
    "items": [
      {
        "icon": "verified",
        "desc_ar": "كل أنبوب وصمام ووصلة تُشحن مع شهادات فحص مصنع أصلية (MTC) قابلة للتتبع إلى دفعة الإنتاج، ومطابقة لمواصفات ASTM وASME وAPI.",
        "desc_en": "Every pipe, valve, and fitting ships with original Mill Test Certificates (MTC) traceable to the production heat, conforming to ASTM, ASME, and API specifications.",
        "title_ar": "شهادات فحص المصنع",
        "title_en": "Mill Test Certificates"
      },
      {
        "icon": "inventory_2",
        "desc_ar": "مخزون احتياطي كبير محفوظ في مستودعنا بالدمام لضمان التوفر الفوري لمتطلبات المشاريع العاجلة وصيانة التوقف.",
        "desc_en": "Large buffer inventory maintained at our Dammam warehouse to guarantee immediate availability for urgent project requirements and shutdown maintenance.",
        "title_ar": "مخزون في المستودعات",
        "title_en": "Warehoused Stock"
      },
      {
        "icon": "local_shipping",
        "desc_ar": "يتيح أسطولنا اللوجستي المخصص الشحن في نفس اليوم أو اليوم التالي في جميع أنحاء المنطقة الشرقية، مع شحن مجدول إلى الرياض وجدة مرتين أسبوعيًا.",
        "desc_en": "Dedicated logistics fleet enables same or next-day dispatch across the Eastern Province, with scheduled freight to Riyadh and Jeddah twice weekly.",
        "title_ar": "شحن خلال 48 ساعة",
        "title_en": "48-Hour Dispatch"
      },
      {
        "icon": "engineering",
        "desc_ar": "يساعد مهندسو المبيعات لدينا في اختيار المواد ومراجعة المواصفات واستبدال المواد لإبقاء مشروعك ضمن الجدول الزمني والميزانية.",
        "desc_en": "Our sales engineers assist in material selection, specification review, and material substitution to keep your project on schedule and within budget.",
        "title_ar": "دعم مبيعات فني",
        "title_en": "Technical Sales Support"
      },
      {
        "icon": "gavel",
        "desc_ar": "منتجات يتم توريدها وتوثيقها لتلبية معايير SAES لأرامكو السعودية ولوائح SASO، مما يبسط عمليات تأهيل الموردين والفحص.",
        "desc_en": "Products sourced and documented to meet Saudi Aramco SAES standards and SASO regulations, simplifying vendor qualification and inspection processes.",
        "title_ar": "متوافق مع أرامكو وSASO",
        "title_en": "Aramco & SASO Compliant"
      },
      {
        "icon": "handshake",
        "desc_ar": "يمكن للمقاولين وشركات المشتريات المعتمدة التقدم بطلب للحصول على حسابات ائتمانية مباشرة بشروط دفع صافية مرنة من خلال فريق تطوير الأعمال لدينا.",
        "desc_en": "Approved contractors and procurement companies can apply for direct credit accounts with flexible net payment terms through our business development team.",
        "title_ar": "شروط حساب ائتماني",
        "title_en": "Credit Account Terms"
      }
    ],
    "desc_ar": "سلسلة التوريد الصناعي لدينا مبنية على مصادر موثقة وشهادات معتمدة وتوصيل سريع لمواقع المشاريع الأكثر تطلبًا في المملكة.",
    "desc_en": "Our industrial supply chain is built on verified sourcing, certified documentation, and rapid delivery to the Kingdom's most demanding project sites.",
    "title_ar": "لماذا التوريد من البلوشي",
    "title_en": "Why Source From Albloshi"
  },
  "cta": {
    "btn1_ar": "أرسل متطلباتك",
    "btn1_en": "Send Your Requirements",
    "btn2_ar": "استكشف أقسامنا",
    "btn2_en": "Explore Our Verticals",
    "desc_ar": "أرسل قائمة المواد أو مواصفات مشروعك وسيرد فريقنا خلال يوم عمل واحد بالأسعار والتوفر.",
    "desc_en": "Submit your bill of materials or project specifications and our team will respond within one business day with pricing and availability.",
    "title_ar": "هل أنت مستعد لتوريد مواد صناعية؟",
    "title_en": "Ready to Source Industrial Materials?",
    "btn1_href": "/contact",
    "btn2_href": "/#segments"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283387/albloshi/industrial/hero-bg.jpg",
    "desc_ar": "أنظمة أنابيب كاملة، وأجهزة تحكم في التدفق، وبنية تحتية كهربائية، ومواد سلامة استهلاكية معتمدة — يتم توريدها وفق معايير ASTM/ASME وتُسلَّم في جميع أنحاء المملكة.",
    "desc_en": "Complete piping systems, flow control hardware, electrical infrastructure, and certified safety consumables — sourced to ASTM/ASME standards and delivered across the Kingdom.",
    "title_l1_ar": "المواد الصناعية و",
    "title_l1_en": "Industrial Materials &",
    "title_l2_ar": "حلول البناء",
    "title_l2_en": "Building Solutions"
  },
  "products": [
    {
      "id": "steel-pipes",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283390/albloshi/industrial/cs-ss-seamless-pipes.webp",
      "tag_ar": "أنظمة الأنابيب",
      "tag_en": "Piping Systems",
      "desc_ar": "أنابيب غير ملحومة وERW من الصلب الكربوني والصلب المقاوم للصدأ مطابقة لمعايير ASTM/ASME. متوفرة بسماكات جدار Schedule 40 و80 و160، بأحجام تصل إلى 36 بوصة لتطبيقات المنبع والمصب.",
      "desc_en": "Seamless and ERW pipes in Carbon Steel and Stainless Steel conforming to ASTM/ASME standards. Available in schedule 40, 80, and 160 wall thicknesses, sized up to 36 inches for both upstream and downstream applications.",
      "specs_ar": [
        "ASTM A106",
        "ASTM A312",
        "API 5L",
        "حتى 36 بوصة"
      ],
      "specs_en": [
        "ASTM A106",
        "ASTM A312",
        "API 5L",
        "Up to 36″"
      ],
      "title_ar": "أنابيب غير ملحومة CS وSS",
      "title_en": "CS and SS Seamless Pipes"
    },
    {
      "id": "valves-flanges",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283391/albloshi/industrial/valves-and-flanges.webp",
      "tag_ar": "التحكم في التدفق",
      "tag_en": "Flow Control",
      "desc_ar": "صمامات بوابية وكروية وكروية دوارة وفراشية وصمامات فحص، إلى جانب شفاه Weld Neck وSlip-on وBlind وLap Joint بتصنيفات ضغط ASME فاخرة من الفئة 150 حتى 2500 لبيئات العمليات الحرجة.",
      "desc_en": "Gate, globe, ball, butterfly, and check valves alongside Weld Neck, Slip-on, Blind, and Lap Joint flanges in premium ASME pressure class ratings 150 through 2500 for critical process environments.",
      "specs_ar": [
        "ASME B16.5",
        "API 600",
        "الفئة 150–2500",
        "CS / SS / سبائك"
      ],
      "specs_en": [
        "ASME B16.5",
        "API 600",
        "Class 150–2500",
        "CS / SS / Alloy"
      ],
      "title_ar": "الصمامات والشفاه",
      "title_en": "Valves and Flanges"
    },
    {
      "id": "cable-trays",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283392/albloshi/industrial/cable-trays-fittings.webp",
      "tag_ar": "البنية التحتية الكهربائية",
      "tag_en": "Electrical Infrastructure",
      "desc_ar": "حوامل كابلات ثقيلة مثقّبة وسلمية وشبكية بطلاء مغلفن بالغمس الساخن مصممة لتحمل الظروف المناخية القاسية لدول الخليج. مجموعة كاملة من الملحقات تشمل الانحناءات والوصلات الثلاثية والمخفضات والدعامات.",
      "desc_en": "Heavy-duty perforated, ladder-type, and wire mesh cable trays with hot-dip galvanized coating rated for extreme GCC climatic conditions. Full range of fittings including bends, tees, reducers, and supports.",
      "specs_ar": [
        "IEC 61537",
        "مغلفن بالغمس الساخن",
        "SS 304 / 316",
        "عرض 100–900 ملم"
      ],
      "specs_en": [
        "IEC 61537",
        "Hot-Dip Galvanized",
        "SS 304 / 316",
        "100–900mm Width"
      ],
      "title_ar": "حوامل الكابلات وملحقاتها",
      "title_en": "Cable Trays and Fittings"
    },
    {
      "id": "welding-safety",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283393/albloshi/industrial/welding-safety-gear.webp",
      "tag_ar": "السلامة والمواد الاستهلاكية",
      "tag_en": "Safety & Consumables",
      "desc_ar": "أقطاب لحام عالية الجودة، وأسلاك حشو TIG وMIG، ومعدات حماية شخصية قياسية ومتخصصة، وبدلات واقية، وخوذات صلبة معتمدة، وخوذات مقاومة للومضات القوسية، وأنظمة سلامة احتياطية متوافقة لمواقع العمل الصناعية.",
      "desc_en": "High-integrity welding electrodes, TIG and MIG wire fillers, standard and specialist PPE, protective suits, certified hard hats, arc flash helmets, and compliant fallback safety systems for industrial worksites.",
      "specs_ar": [
        "معتمد AWS",
        "خوذات EN 397",
        "متوافق مع SASO",
        "معتمد من أرامكو"
      ],
      "specs_en": [
        "AWS Certified",
        "EN 397 Helmets",
        "SASO Compliant",
        "ARAMCO Approved"
      ],
      "title_ar": "معدات اللحام والسلامة",
      "title_en": "Welding and Safety Gear"
    },
    {
      "id": "cs-flanges",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283395/albloshi/industrial/cs-flanges.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Carbon Steel flanges provide strong, leak-resistant pipe connections for industrial systems. Manufactured for dependable performance across construction, oil and gas, power and processing",
      "specs_ar": [],
      "specs_en": [
        "Weld Neck",
        "Slip-On",
        "Blind",
        "Socket Weld",
        "Lap Joint",
        "Threaded",
        "ASME / ANSI / DIN Standards"
      ],
      "title_ar": "",
      "title_en": "CS Flanges"
    },
    {
      "id": "ss-flanges",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283396/albloshi/industrial/ss-flanges.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Stainless Steel flanges offer excellent corrosion resistance and secure pipe connections for demanding industrial applications including chemical processing, marine services and water treatment",
      "specs_ar": [],
      "specs_en": [
        "Weld Neck",
        "Slip-On",
        "Blind",
        "Socket Weld",
        "Stainless Steel 304/316",
        "Pressure Class 150–2500"
      ],
      "title_ar": "",
      "title_en": "SS Flanges"
    },
    {
      "id": "cs-buttweld-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283398/albloshi/industrial/cs-buttweld-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Carbon Steel elbows, reducers, tees and caps ensure efficient flow and durable welded pipe connections. Suitable for heavy-duty industrial, petrochemical and power plant piping installations.",
      "specs_ar": [],
      "specs_en": [
        "ASME Standards",
        "Sizes up to 60”",
        "Black or Galvanized Finish"
      ],
      "title_ar": "",
      "title_en": "Carbon Steel Buttweld Fittings"
    },
    {
      "id": "ss-buttweld-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283400/albloshi/industrial/ss-buttweld-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Stainless Steel buttweld fittings are manufactured for corrosion resistance and reliable performance in process piping, chemical plants and industrial fluid transfer systems.",
      "specs_ar": [],
      "specs_en": [
        "Sizes up to 36”",
        "All Schedules",
        "Pressure Class 150–9000"
      ],
      "title_ar": "",
      "title_en": "Stainless Steel Buttweld Fittings"
    },
    {
      "id": "forged-cs-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283402/albloshi/industrial/forged-cs-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Heavy-duty forged Carbon Steel threaded and socket weld fittings designed for high-pressure piping applications where strength, safety and long service life are essential.",
      "specs_ar": [],
      "specs_en": [
        "NPT & SW",
        "Pressure 3000–9000",
        "Black/Galvanized"
      ],
      "title_ar": "",
      "title_en": "Forged Carbon Steel Fittings"
    },
    {
      "id": "forged-ss-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283404/albloshi/industrial/forged-ss-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Forged Stainless Steel fittings provide reliable threaded and socket weld connections for corrosive and high-pressure industrial piping applications.",
      "specs_ar": [],
      "specs_en": [
        "Threaded & Socket Weld",
        "SS304 / SS316",
        "Pressure 3000–9000"
      ],
      "title_ar": "",
      "title_en": "Forged Stainless Steel Fittings"
    },
    {
      "id": "malleable-iron-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283406/albloshi/industrial/malleable-iron-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Reliable malleable iron threaded fittings suitable for plumbing, utility and general industrial piping installations, delivering dependable performance and easy installation.",
      "specs_ar": [],
      "specs_en": [
        "ASME, AWA, DIN, ANSI, BS",
        "4\" to 4\"(NPT & SW)",
        "Pressure 3000 to 9000",
        "All Schedule",
        "A182 F304/304L, F316/316L, F321, SA/A182 F5/F11"
      ],
      "title_ar": "",
      "title_en": "Forged Malleable Iron Fittings"
    },
    {
      "id": "fire-hydrant-grooved-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283409/albloshi/industrial/fire-hydrant-grooved-fittings.png",
      "tag_ar": "",
      "tag_en": "Fire Protection",
      "desc_ar": "",
      "desc_en": "Complete range of fire hydrants, grooved couplings, valves and accessories designed for dependable fire protection systems in commercial and industrial facilities.",
      "specs_ar": [],
      "specs_en": [
        "Fittings and Valves",
        "Alarm Check Valve",
        "Pillar type Fire Hydrant",
        "Rigid Coupling",
        "Flexible Coupling",
        "Large Diameter Elbow"
      ],
      "title_ar": "",
      "title_en": "Fire Hydrant & Grooved Fittings"
    },
    {
      "id": "instrumentation-accessories-tube-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283411/albloshi/industrial/instrumentation-accessories-tube-fittings.png",
      "tag_ar": "",
      "tag_en": "Instrumentation",
      "desc_ar": "",
      "desc_en": "Precision tube fittings, valves, gauges and instrumentation accessories manufactured for accurate fluid control and industrial process measurement applications.",
      "specs_ar": [],
      "specs_en": [
        "1/16 to 2\"",
        "SS304, SS316, Brass, Special Alloys",
        "NPT, BSP, BSPT, UNF, ISO, SAE",
        "Pressure Rating: 300 TO 6000",
        "Major brands of Pressure Gauges"
      ],
      "title_ar": "",
      "title_en": "Instrumentation Accessories & Tube Fittings"
    },
    {
      "id": "valves",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283413/albloshi/industrial/valves.png",
      "tag_ar": "",
      "tag_en": "Flow Control",
      "desc_ar": "",
      "desc_en": "Industrial valves engineered for efficient flow control across oil and gas, water treatment, power generation and process industries with dependable sealing performance.",
      "specs_ar": [],
      "specs_en": [
        "Gate Valve",
        "Ball Valve",
        "Check Valve",
        "Butterfly Valve",
        "Globe Valve",
        "Safety Valve"
      ],
      "title_ar": "",
      "title_en": "Valves"
    },
    {
      "id": "fasteners-stud-bolts",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283415/albloshi/industrial/fasteners-stud-bolts.png",
      "tag_ar": "",
      "tag_en": "Industrial Supplies",
      "desc_ar": "",
      "desc_en": "Industrial fasteners including bolts, nuts, washers and stud bolts manufactured for secure structural and piping connections in demanding industrial environments.",
      "specs_ar": [],
      "specs_en": [
        "A325, 4.8, 8.8, B7",
        "DIN, Inch, mm",
        "CS, SS304, SS316, B7",
        "HDG, PTFE, XYLON",
        "Painted Black and Galvanized"
      ],
      "title_ar": "",
      "title_en": "Fasteners & Stud Bolts"
    },
    {
      "id": "gasket-insulation-kits",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283417/albloshi/industrial/gasket-insulation-kits.png",
      "tag_ar": "",
      "tag_en": "Industrial Supplies",
      "desc_ar": "",
      "desc_en": "Industrial sealing products designed to minimize leakage, improve safety and maintain reliable flange performance across various piping applications.",
      "specs_ar": [],
      "specs_en": [
        "ASME, ASTM, BS and DIN",
        "3/8\" to any larger size",
        "Ring Joint, Spiral Wound, Flat Cut, Flexible Graphite Sheet",
        "Steel Re-Inforced Rubber Gasket, Metal Jacket Gaskets",
        "Serrated Metal Gasket, Non Asbestos Gasket Sheets",
        "ZURN, WII KIN, Rubber Gaskets"
      ],
      "title_ar": "",
      "title_en": "Gasket & Insulation Kits"
    },
    {
      "id": "industrial-electrical-materials",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283419/albloshi/industrial/industrial-electrical-materials.png",
      "tag_ar": "",
      "tag_en": "Electrical",
      "desc_ar": "",
      "desc_en": "Comprehensive range of electrical materials including power cables, glands, conduit fittings and accessories for industrial electrical installations.",
      "specs_ar": [],
      "specs_en": [
        "Cables: LV Power, LV Flexible, MV, HV Power",
        "Cable Lugs: Copper, Aluminum, Bronze, Bimetallic",
        "Cable Ties: PVC, Stainless, PVC Coated",
        "Electrical Conduit and Conduit Fittings",
        "Explosion Proof Enclosers",
        "Circuit Breakers & Electrical Boxes",
        "Distribution and Protection"
      ],
      "title_ar": "",
      "title_en": "Industrial Electrical Materials"
    },
    {
      "id": "industrial-telecom",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283422/albloshi/industrial/industrial-telecom.png",
      "tag_ar": "",
      "tag_en": "Telecom",
      "desc_ar": "",
      "desc_en": "Industrial telecom products including fiber optic accessories, duct systems and installation materials for reliable communication infrastructure.",
      "specs_ar": [],
      "specs_en": [
        "Fiber optic cables and accessories",
        "Duct plug, Duct Seal's and accessories",
        "UG Cable Marker",
        "Corrugated and Non Corrugated Pipes",
        "Detectable warning tape"
      ],
      "title_ar": "",
      "title_en": "Industrial Telecom"
    },
    {
      "id": "cable-tray-ladder-support",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283422/albloshi/industrial/cable-tray-ladder-support.webp",
      "tag_ar": "",
      "tag_en": "Cable Management",
      "desc_ar": "",
      "desc_en": "Cable trays and ladder support systems designed for organized, secure and efficient cable routing across industrial facilities.",
      "specs_ar": [],
      "specs_en": [],
      "title_ar": "",
      "title_en": "Cable Tray & Ladder Support"
    },
    {
      "id": "earthing-support",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283424/albloshi/industrial/earthing-support.png",
      "tag_ar": "",
      "tag_en": "Electrical",
      "desc_ar": "",
      "desc_en": "Grounding and earthing materials developed to improve electrical safety and equipment protection in industrial installations.",
      "specs_ar": [],
      "specs_en": [],
      "title_ar": "",
      "title_en": "Earthing Support"
    },
    {
      "id": "welding-materials-accessories",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283426/albloshi/industrial/welding-materials-accessories.png",
      "tag_ar": "",
      "tag_en": "Welding",
      "desc_ar": "",
      "desc_en": "Quality welding electrodes, wires, rods, regulators and accessories suitable for fabrication, maintenance and industrial welding projects.",
      "specs_ar": [],
      "specs_en": [
        "Gas welded wires and shields",
        "Flux cored welding wires",
        "Brazing rods and Fluxes",
        "Tungsten Rod",
        "Regulators",
        "Welding Machines: TIG Weld, Arc Weld, Gas Weld"
      ],
      "title_ar": "",
      "title_en": "Welding Materials & Accessories"
    },
    {
      "id": "industrial-safety-materials-tools",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283428/albloshi/industrial/industrial-safety-materials-tools.png",
      "tag_ar": "",
      "tag_en": "Safety",
      "desc_ar": "",
      "desc_en": "Personal protective equipment, industrial safety products and essential tools designed to create safe working environments across multiple industries.",
      "specs_ar": [],
      "specs_en": [],
      "title_ar": "",
      "title_en": "Industrial Safety Materials & Tools"
    },
    {
      "id": "construction-chemicals",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283430/albloshi/industrial/construction-chemicals.png",
      "tag_ar": "",
      "tag_en": "Construction",
      "desc_ar": "",
      "desc_en": "Construction chemicals for sealing, bonding, waterproofing and repair applications, helping improve durability and long-term structural performance.",
      "specs_ar": [],
      "specs_en": [
        "Refurbishment",
        "Sealing and Bonding",
        "Roofing",
        "Flooring/Coating",
        "Concrete Refurbishment"
      ],
      "title_ar": "",
      "title_en": "Construction Chemicals"
    },
    {
      "id": "sanitary-products",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283432/albloshi/industrial/sanitary-products.png",
      "tag_ar": "",
      "tag_en": "Sanitary",
      "desc_ar": "",
      "desc_en": "Premium sanitary products including faucets, mixers, water heaters and bathroom accessories suitable for residential and commercial projects.",
      "specs_ar": [],
      "specs_en": [],
      "title_ar": "",
      "title_en": "Sanitary Products"
    },
    {
      "id": "drains",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283433/albloshi/industrial/drains.png",
      "tag_ar": "",
      "tag_en": "Drainage",
      "desc_ar": "",
      "desc_en": "Floor drains, roof drains, trench drains and drainage accessories designed for efficient wastewater collection and dependable drainage performance.",
      "specs_ar": [],
      "specs_en": [
        "Floor and Area Drains",
        "Roof Drains",
        "Hydro-Flo Trench Drain System",
        "Sanitary Floor Sink",
        "Interceptors",
        "Gullies",
        "Gratings"
      ],
      "title_ar": "",
      "title_en": "Drains"
    },
    {
      "id": "pvc-cpvc-cement",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283435/albloshi/industrial/pvc-cpvc-cement.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "PVC and CPVC solvent cement and cleaners formulated to create strong, leak-free joints for plastic piping installations.",
      "specs_ar": [],
      "specs_en": [
        "PVC Cement",
        "CPVC Cement",
        "PVC Cleaner",
        "CPVC Cleaner"
      ],
      "title_ar": "",
      "title_en": "PVC / CPVC Cement"
    },
    {
      "id": "pvc-cpvc-upvc-hdpe-pvdf-pipes",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283437/albloshi/industrial/pvc-cpvc-upvc-hdpe-pvdf-pipes.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Thermoplastic piping systems manufactured for water supply, drainage and industrial fluid handling with excellent durability and corrosion resistance.",
      "specs_ar": [],
      "specs_en": [
        "Standard SCH 40 / SCH 80",
        "White and Gray",
        "½\" to 12\" (16mm to 500mm)",
        "Valves: Gate, Ball, Butterfly, Diaphragm, Needle"
      ],
      "title_ar": "",
      "title_en": "PVC / CPVC / uPVC / HDPE / PVDF Pipes"
    },
    {
      "id": "ppr-pipes-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283438/albloshi/industrial/ppr-pipes-fittings.png",
      "tag_ar": "",
      "tag_en": "Piping Systems",
      "desc_ar": "",
      "desc_en": "Reliable PPR pipes and fittings for hot and cold water distribution, offering durable performance and easy installation.",
      "specs_ar": [],
      "specs_en": [
        "Rubber Expansion Joint",
        "Flexible Coupling",
        "Saddle Clamp",
        "Repair Clamp",
        "Water Meter"
      ],
      "title_ar": "",
      "title_en": "PPR Pipes & Fittings"
    },
    {
      "id": "electrical-coated-conduit-fittings",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283440/albloshi/industrial/electrical-coated-conduit-fittings.png",
      "tag_ar": "",
      "tag_en": "Electrical",
      "desc_ar": "",
      "desc_en": "We are committed to supplying the best quality of coated products for industrial applications.",
      "specs_ar": [],
      "specs_en": [
        "PVC (Thermoplastic) Coating",
        "Epoxy Coating",
        "Powder Coating"
      ],
      "title_ar": "",
      "title_en": "Electrical Coated Conduit, Fittings & Accessories"
    },
    {
      "id": "test-plugs",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788283441/albloshi/industrial/test-plugs.png",
      "tag_ar": "",
      "tag_en": "Testing Equipment",
      "desc_ar": "",
      "desc_en": "Professional testing equipment for plumbing and drainage systems. Our range includes durable test plugs, sealing bags, and complete drain testing and cleaning kits designed for accurate leak detection and pipe maintenance.",
      "specs_ar": [],
      "specs_en": [
        "Steel Test Plug",
        "Aluminium Test Plug",
        "Drain Testing Kits",
        "Drain Cleaning Kits",
        "Inflatable PVC Sealing Bars"
      ],
      "title_ar": "",
      "title_en": "Test Plugs & Testing Kits"
    }
  ],
  "stats": [
    {
      "num": "500+",
      "label_ar": "رمز منتج (SKU)",
      "label_en": "Product SKUs"
    },
    {
      "num": "36″",
      "label_ar": "أقصى قياس أنبوب",
      "label_en": "Max Pipe Size"
    },
    {
      "num": "ASTM",
      "label_ar": "توريد معتمد",
      "label_en": "Certified Supply"
    },
    {
      "num": "48h",
      "label_ar": "مدة الشحن",
      "label_en": "Dispatch Lead Time"
    }
  ]
};

export const SECTIONS = ['hero', 'stats', 'products', 'capabilities', 'cta'];

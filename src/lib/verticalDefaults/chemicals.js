// Default (fallback) content for the Intelligent Chemicals vertical page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='chemicals' are missing — the live source of truth is managed at
// /admin/verticals/chemicals. See supabase/vertical_content.sql for the table.

export const DEFAULTS = {
  "commitment": {
    "items": [
      {
        "ar": "حلول صناعية موثوقة",
        "en": "Reliable Industrial Solutions"
      },
      {
        "ar": "تقنيات كيميائية مستدامة",
        "en": "Sustainable Chemical Technologies"
      },
      {
        "ar": "بحث وتطوير متقدم",
        "en": "Advanced Research & Development"
      },
      {
        "ar": "معايير جودة عالمية",
        "en": "Global Quality Standards"
      },
      {
        "ar": "شراكات طويلة الأمد مع العملاء",
        "en": "Long-Term Customer Partnerships"
      }
    ],
    "desc_ar": "تلتزم تيلابس للكيميائيات بتقديم حلول صناعية موثوقة. مهمتنا هي تمكين الصناعات من خلال تقنيات كيميائية مبتكرة تحسّن الكفاءة التشغيلية والاستدامة والأداء.",
    "desc_en": "Tellabs Chemicals is committed to delivering reliable industrial solutions. Our mission is to empower industries through innovative chemical technologies that improve operational efficiency, sustainability, and performance.",
    "title_ar": "الالتزام بالتميز",
    "title_en": "Commitment to Excellence"
  },
  "cta": {
    "btn1_ar": "تواصل مع خبرائنا",
    "btn1_en": "Contact Our Experts",
    "btn2_ar": "استكشف أقسامنا",
    "btn2_en": "Explore Our Verticals",
    "desc_ar": "تشارك مع تيلابس للكيميائيات للحصول على حلول متخصصة رائدة في الصناعة، وتقنيات مستدامة، ودعم فني استثنائي.",
    "desc_en": "Partner with Tellabs Chemicals for industry-leading specialty solutions, sustainable technologies, and exceptional technical support.",
    "title_ar": "هل أنت مستعد للارتقاء بعملياتك؟",
    "title_en": "Ready to Elevate Your Operations?",
    "btn1_href": "/contact",
    "btn2_href": "/#segments"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285330/albloshi/chemicals/hero-bg.jpg",
    "desc_ar": "تركيبات كيميائية متخصصة متقدمة تقدم حلولاً عالية الأداء عبر معالجة المياه، ولب وورق، وتحسين الوقود، والتنظيف الصناعي.",
    "desc_en": "Advanced specialty chemical formulations delivering high-performance solutions across water treatment, pulp & paper, fuel optimization, and industrial cleaning.",
    "label_ar": "المنتجات",
    "label_en": "PRODUCTS",
    "title_ar": "حلولنا الكيميائية المتخصصة",
    "title_en": "Our Specialty Chemical Solutions",
    "title_l1_ar": "حلول كيميائية",
    "title_l1_en": "Intelligent Chemical",
    "title_l2_ar": "ذكية",
    "title_l2_en": "Solutions"
  },
  "solutions": [
    {
      "id": "water-treatment",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285332/albloshi/chemicals/water-treatment.webp",
      "desc_ar": "كيميائيات معالجة مياه متقدمة مصممة لتحسين الكفاءة التشغيلية، ومنع التآكل، وتقليل الترسبات، وتحسين أنظمة المياه الصناعية.",
      "desc_en": "Advanced water treatment chemicals designed to improve operational efficiency, prevent corrosion, reduce scaling, and optimize industrial water systems.",
      "lists_ar": [
        {
          "items": [
            "مثبطات ومانعات الترسب",
            "مثبطات التآكل",
            "المبيدات الحيوية وكاسحات الأكسجين",
            "منظفات الأغشية",
            "معالجة مياه الغلايات والتبريد",
            "كيميائيات التناضح العكسي",
            "معالجة الدورة المغلقة"
          ],
          "heading": "تشمل الحلول"
        },
        {
          "items": [
            "أبراج التبريد",
            "الغلايات",
            "محطات التناضح العكسي",
            "أنظمة المياه الصناعية",
            "محطات معالجة مياه الصرف"
          ],
          "heading": "التطبيقات"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Scale Inhibitors & Antiscalants",
            "Corrosion Inhibitors",
            "Biocides & Oxygen Scavengers",
            "Membrane Cleaners",
            "Boiler & Cooling Water Treatment",
            "Reverse Osmosis Chemicals",
            "Closed Loop Treatment"
          ],
          "heading": "Solutions Include"
        },
        {
          "items": [
            "Cooling Towers",
            "Boilers",
            "RO Plants",
            "Industrial Water Systems",
            "Wastewater Plants"
          ],
          "heading": "Applications"
        }
      ],
      "title_ar": "معالجة المياه الصناعية",
      "title_en": "Industrial Water Treatment"
    },
    {
      "id": "polymers",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285334/albloshi/chemicals/polymers.webp",
      "desc_ar": "مخثرات ومندفات عالية الأداء مصممة لمعالجة فعالة لمياه الصرف وأنظمة التوضيح الصناعية.",
      "desc_en": "High-performance coagulants and flocculants engineered for effective wastewater treatment and industrial clarification systems.",
      "lists_ar": [
        {
          "items": [
            "مخثرات عضوية وغير عضوية",
            "كلوريد الألومنيوم المتعدد (PAC)",
            "عوامل إزالة اللون",
            "مندفات بودرة ومستحلبة",
            "أنواع أنيونية وكاتيونية وغير أيونية",
            "مساعدات نزع الماء"
          ],
          "heading": "مجموعة المنتجات"
        },
        {
          "items": [
            "المياه ومياه الصرف",
            "النسيج والصباغة والتعدين",
            "الصلب والطلاء الكهربائي",
            "الصناعات الدوائية",
            "السكر وتصنيع الأغذية",
            "الأسمنت واللب والورق"
          ],
          "heading": "الصناعات المخدومة"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Organic & Inorganic Coagulants",
            "Poly Aluminum Chloride (PAC)",
            "Decolorizing Agents",
            "Powder & Emulsion Flocculants",
            "Anionic, Cationic & Non-Ionic Variants",
            "Dewatering Aids"
          ],
          "heading": "Product Range"
        },
        {
          "items": [
            "Water & Wastewater",
            "Textile, Dyeing & Mining",
            "Steel & Electroplating",
            "Pharmaceuticals",
            "Sugar & Food Processing",
            "Cement, Pulp & Paper"
          ],
          "heading": "Industries Served"
        }
      ],
      "title_ar": "البوليمرات (المخثرات والمندفات)",
      "title_en": "Polymers (Coagulants & Flocculants)"
    },
    {
      "id": "defoamers",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285335/albloshi/chemicals/defoamers.webp",
      "desc_ar": "تركيبات مزيلة للرغوة متخصصة طُورت للتحكم في تكوّن الرغوة في أنظمة المعالجة الصناعية.",
      "desc_en": "Specialized defoamer formulations developed to control foam generation in industrial processing systems.",
      "lists_ar": [
        {
          "items": [
            "مصانع اللب والورق",
            "الدهانات والطلاءات",
            "محطات معالجة مياه الصرف",
            "النفط والمصافي",
            "أنظمة التنظيف الصناعي",
            "تصنيع الأغذية والمشروبات"
          ],
          "heading": "التطبيقات"
        },
        {
          "items": [
            "استقرار أفضل للعمليات",
            "كفاءة إنتاج محسّنة",
            "تقليل تكوّن الرغوة",
            "أداء أفضل للمعدات"
          ],
          "heading": "الفوائد الرئيسية"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Pulp & Paper Mills",
            "Paints & Coatings",
            "Wastewater Treatment Plants",
            "Oil & Refineries",
            "Industrial Cleaning Systems",
            "Food & Beverage Manufacturing"
          ],
          "heading": "Applications"
        },
        {
          "items": [
            "Improved Process Stability",
            "Enhanced Production Efficiency",
            "Reduced Foam Formation",
            "Better Equipment Performance"
          ],
          "heading": "Key Benefits"
        }
      ],
      "title_ar": "مزيلات الرغوة السيليكونية والعضوية",
      "title_en": "Silicone & Organic Defoamers"
    },
    {
      "id": "fuel-additives",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285336/albloshi/chemicals/fuel-additives.webp",
      "desc_ar": "تقنيات مبتكرة لمضافات الوقود طُورت لتحسين كفاءة الاحتراق وتقليل الانبعاثات.",
      "desc_en": "Innovative fuel additive technologies developed to improve combustion efficiency and reduce emissions.",
      "lists_ar": [
        {
          "items": [
            "غلايات الفحم: تحسين الاحتراق",
            "تقليل الكربون غير المحترق",
            "تحسين نسبة البخار إلى الوقود",
            "الوقود الزراعي: قشور الأرز، نشارة الخشب، مصاصة قصب السكر",
            "الوقود السائل: الديزل، زيت الأفران، الديزل الحيوي، الزيت الثقيل"
          ],
          "heading": "التطبيقات"
        },
        {
          "items": [
            "انبعاثات أقل",
            "نقل حراري محسّن",
            "تآكل أقل",
            "كفاءة وقود أعلى",
            "توفر أفضل للمعدات"
          ],
          "heading": "المزايا"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Coal Fired Boilers: Combustion Optimization",
            "Reduction in Unburnt Carbon",
            "Steam-to-Fuel Ratio Improvement",
            "Agro-Based Fuel: Rice Husk, Wood Dust, Bagasse",
            "Liquid Fuels: Diesel, Furnace Oil, Bio-Diesel, Heavy Oil"
          ],
          "heading": "Applications"
        },
        {
          "items": [
            "Lower Emissions",
            "Improved Heat Transfer",
            "Reduced Corrosion",
            "Higher Fuel Efficiency",
            "Better Equipment Availability"
          ],
          "heading": "Advantages"
        }
      ],
      "title_ar": "مضافات الوقود",
      "title_en": "Fuel Additives"
    },
    {
      "id": "activated-carbon",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285337/albloshi/chemicals/activated-carbon.webp",
      "desc_ar": "منتجات كربون منشط فاخرة مصممة لتطبيقات التنقية والترشيح والامتزاز الصناعي.",
      "desc_en": "Premium activated carbon products engineered for purification, filtration, and industrial adsorption applications.",
      "lists_ar": [
        {
          "items": [
            "تنقية مياه البلديات",
            "التطبيقات الدوائية",
            "الأغذية والمشروبات",
            "التنقية الكيميائية",
            "الترشيح التعديني والصناعي",
            "التحكم في انبعاثات السيارات"
          ],
          "heading": "بودرة وحبيبات"
        },
        {
          "items": [
            "معالجة الهواء البيئي",
            "إزالة الروائح",
            "إزالة الزئبق",
            "المعالجة الصناعية"
          ],
          "heading": "الكربون المبثوق"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Municipal Water Purification",
            "Pharmaceutical Applications",
            "Food & Beverage",
            "Chemical Purification",
            "Mining & Industrial Filtration",
            "Automotive Emission Control"
          ],
          "heading": "Powdered & Granular"
        },
        {
          "items": [
            "Environmental Air Treatment",
            "Odor Removal",
            "Mercury Removal",
            "Industrial Processing"
          ],
          "heading": "Extruded Carbon"
        }
      ],
      "title_ar": "حلول الكربون المنشط",
      "title_en": "Activated Carbon Solutions"
    },
    {
      "id": "cleaning-disinfection",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285338/albloshi/chemicals/cleaning-disinfection.webp",
      "desc_ar": "كيميائيات تنظيف وتعقيم بدرجة صناعية طُورت لتصنيع الأغذية والصناعات الحرجة من ناحية النظافة.",
      "desc_en": "Industrial-grade cleaning and sanitation chemicals developed for food processing and hygiene-critical industries.",
      "lists_ar": [
        {
          "items": [
            "كيميائيات التنظيف في الموقع (CIP)",
            "حلول تنظيف الأسطح",
            "مزلقات الناقلات",
            "حلول غسيل الصناديق",
            "منتجات النظافة الشخصية",
            "تطهير المركبات"
          ],
          "heading": "تشمل الحلول"
        },
        {
          "items": [
            "الألبان",
            "تصنيع الأغذية",
            "مصانع المشروبات",
            "المزارع والثروة الحيوانية",
            "صناعات الماشية"
          ],
          "heading": "الصناعات المخدومة"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Cleaning-in-Place (CIP) Chemicals",
            "Surface Cleaning Solutions",
            "Conveyor Lubricants",
            "Crate Washing Solutions",
            "Personal Hygiene Products",
            "Vehicle Disinfection"
          ],
          "heading": "Solutions Include"
        },
        {
          "items": [
            "Dairy",
            "Food Processing",
            "Beverage Plants",
            "Farms & Livestock",
            "Cattle Industries"
          ],
          "heading": "Industries Served"
        }
      ],
      "title_ar": "حلول التنظيف والتطهير",
      "title_en": "Cleaning & Disinfection Solutions"
    },
    {
      "id": "pulp-paper",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285339/albloshi/chemicals/pulp-paper.webp",
      "desc_ar": "كيميائيات متخصصة عالية الأداء مصممة لصناعات تصنيع الورق ومعالجة اللب.",
      "desc_en": "High-performance specialty chemicals designed for paper manufacturing and pulp processing industries.",
      "lists_ar": [
        {
          "items": [
            "كيميائيات التناضح العكسي والغلايات",
            "مانعات الترسب والمبيدات الحيوية",
            "مساعدات الاحتفاظ والتصريف",
            "توضيح المياه البيضاء",
            "كيميائيات معالجة الفضلات السائلة"
          ],
          "heading": "المعالجة والبوليمرات"
        },
        {
          "items": [
            "مزيلات رغوة آلات الورق ومصانع اللب",
            "مزيلات رغوة الطلاء",
            "كيميائيات إزالة الحبر",
            "مضافات تقوية",
            "التحكم باللزوجة وعوامل ربط الطبقات"
          ],
          "heading": "مضادات الرغوة والمعالجة"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Reverse Osmosis & Boiler Chemicals",
            "Antiscalants & Biocides",
            "Retention & Drainage Aids",
            "White Water Clarification",
            "Effluent Treatment Chemicals"
          ],
          "heading": "Treatment & Polymers"
        },
        {
          "items": [
            "Paper Machine & Pulp Mill Defoamers",
            "Coating Defoamers",
            "Deinking Chemicals",
            "Strength Additives",
            "Stickies Control & Ply Bond Agents"
          ],
          "heading": "Antifoams & Processing"
        }
      ],
      "title_ar": "حلول كيميائية للب والورق",
      "title_en": "Pulp & Paper Chemical Solutions"
    },
    {
      "id": "sugar-industry",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788285340/albloshi/chemicals/sugar-industry.webp",
      "desc_ar": "تركيبات كيميائية متخصصة طُورت لتصنيع السكر ومصانع السكر الصناعية.",
      "desc_en": "Specialized chemical formulations developed for sugar processing and industrial sugar plants.",
      "lists_ar": [
        {
          "items": [
            "كيميائيات ترسيب الطين",
            "تعقيم المطاحن",
            "مانعات ترسب المبخرات",
            "مخفضات اللزوجة",
            "حلول التوضيح",
            "الكربون المنشط ومساعدات الغليان"
          ],
          "heading": "التطبيقات"
        },
        {
          "items": [
            "معالجة مياه التبريد",
            "معالجة مياه الغلايات",
            "معالجة أغشية التناضح العكسي"
          ],
          "heading": "دعم معالجة المياه"
        }
      ],
      "lists_en": [
        {
          "items": [
            "Mud Settling Chemicals",
            "Mill Sanitation",
            "Evaporator Antiscalants",
            "Viscosity Reducers",
            "Clarification Solutions",
            "Activated Carbon & Boiling Aids"
          ],
          "heading": "Applications"
        },
        {
          "items": [
            "Cooling Water Treatment",
            "Boiler Water Treatment",
            "Reverse Osmosis Membrane Treatment"
          ],
          "heading": "Water Treatment Support"
        }
      ],
      "title_ar": "حلول صناعة السكر",
      "title_en": "Sugar Industry Solutions"
    }
  ],
  "trust": {
    "items": [
      {
        "icon": "factory",
        "desc_ar": "مرافق إنتاج حديثة مجهزة بمفاعلات ومجانس وأنظمة خلط متقدمة تضمن جودة منتج ثابتة وتوريدًا موثوقًا.",
        "desc_en": "Modern production facilities equipped with advanced reactors, homogenizers, and blending systems ensure consistent product quality and reliable supply.",
        "title_ar": "تصنيع متقدم",
        "title_en": "Advanced Manufacturing"
      },
      {
        "icon": "biotech",
        "desc_ar": "استثمار مستمر في البحث المخبري وتطوير المنتجات يتيح حلولاً كيميائية عالية الأداء ومخصصة.",
        "desc_en": "Continuous investment in laboratory research and product development enables high-performance and customized chemical solutions.",
        "title_ar": "مدفوعون بالابتكار",
        "title_en": "Innovation Driven"
      },
      {
        "icon": "verified",
        "desc_ar": "أنظمة رقابة جودة صارمة واختبارات دقيقة في كل مرحلة إنتاج تضمن منتجات وفق معايير الصناعة.",
        "desc_en": "Strict quality control systems and rigorous testing at every production stage guarantee industry-standard products.",
        "title_ar": "ضمان الجودة",
        "title_en": "Quality Assurance"
      },
      {
        "icon": "eco",
        "desc_ar": "تركيبات صديقة للبيئة مصممة لدعم المسؤولية البيئية والكفاءة الصناعية.",
        "desc_en": "Eco-friendly formulations designed to support environmental responsibility and industrial efficiency.",
        "title_ar": "حلول مستدامة",
        "title_en": "Sustainable Solutions"
      },
      {
        "icon": "support_agent",
        "desc_ar": "مساعدة فنية وفرق دعم سريعة الاستجابة تساعد العملاء على تحسين الأداء والعمليات.",
        "desc_en": "Technical assistance and responsive support teams help clients optimize performance and operations.",
        "title_ar": "دعم العملاء",
        "title_en": "Customer Support"
      },
      {
        "icon": "language",
        "desc_ar": "منتجات مصنعة وفق عمليات معتمدة تشمل معايير الحلال وISO والكوشر.",
        "desc_en": "Products manufactured under certified processes including Halal, ISO, and Kosher standards.",
        "title_ar": "معايير عالمية",
        "title_en": "Global Standards"
      }
    ],
    "label_ar": "خبرتنا",
    "label_en": "OUR EXPERTISE",
    "title_ar": "لماذا تثق الصناعات بتيلابس",
    "title_en": "Why Industries Trust Tellabs"
  }
};

export const SECTIONS = ['hero', 'solutions', 'trust', 'commitment', 'cta'];

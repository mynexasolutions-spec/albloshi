// Default (fallback) content for the Food Services vertical page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='food' are missing — the live source of truth is managed at
// /admin/verticals/food. See supabase/vertical_content.sql for the table.
//
// `rice_products` and `oil_products` back the separate /rice-products and
// /oil-products detail pages but are edited from the same Food admin page
// (see AdminFoodContent.jsx) since they're sub-pages of Food Services.

export const DEFAULTS = {
  "capabilities": {
    "items": [
      {
        "icon": "verified",
        "desc_ar": "جميع المنتجات الغذائية يتم توريدها واستيرادها وفق الامتثال الكامل للهيئة العامة للغذاء والدواء السعودية، مع وثائق تتبع كاملة متاحة عند الطلب.",
        "desc_en": "All food products are sourced and imported under full Saudi Food and Drug Authority compliance, with complete traceability documentation available on request.",
        "title_ar": "متوافق مع SFDA",
        "title_en": "SFDA Compliant"
      },
      {
        "icon": "ac_unit",
        "desc_ar": "مرافق تخزين مخصصة للسلع الجافة تُحافظ على درجة حرارة ورطوبة مثلى للحفاظ على طزاجة المنتج وصلاحيته طوال سلسلة التوريد.",
        "desc_en": "Dedicated dry-goods storage facilities maintained at optimal temperature and humidity to preserve product freshness and shelf life throughout the supply chain.",
        "title_ar": "تخزين مضبوط الجودة",
        "title_en": "Quality-Controlled Storage"
      },
      {
        "icon": "local_shipping",
        "desc_ar": "مسارات توصيل أسبوعية مجدولة تغطي الدمام والخبر والقطيف والجبيل والأحساء — لضمان ألا ينفد مطبخك من الإمدادات الحيوية.",
        "desc_en": "Scheduled weekly delivery routes covering Dammam, Al Khobar, Qatif, Jubail, and Al Hassa — ensuring your kitchen never runs short on critical supplies.",
        "title_ar": "توصيل مجدول موثوق",
        "title_en": "Reliable Scheduled Delivery"
      },
      {
        "icon": "trending_down",
        "desc_ar": "شرائح تسعير جملة تنافسية متاحة للمشترين ذوي الحجم الكبير وسلاسل الفنادق ومجموعات التموين ومصنّعي الأغذية بالتزامات شهرية.",
        "desc_en": "Competitive wholesale pricing tiers available for high-volume buyers, hotel chains, catering groups, and food manufacturers with monthly volume commitments.",
        "title_ar": "تسعير بالجملة تنافسي",
        "title_en": "Bulk Volume Pricing"
      },
      {
        "icon": "mosque",
        "desc_ar": "جميع السلع الغذائية التي توزعها البلوشي تحمل شهادات حلال سارية من جهات معترف بها دوليًا، مما يضمن الامتثال للمتطلبات التنظيمية السعودية.",
        "desc_en": "All food commodities distributed by Albloshi carry valid Halal certifications from internationally recognized bodies, ensuring compliance with KSA regulatory requirements.",
        "title_ar": "منتجات معتمدة حلال",
        "title_en": "Halal Certified Products"
      },
      {
        "icon": "support_agent",
        "desc_ar": "يحصل كل عميل على منسق حساب مخصص يدير الطلبات والجداول والفواتير وطلبات التوريد العاجلة بوصول تواصل مباشر.",
        "desc_en": "Every client receives a dedicated account coordinator who manages orders, schedules, invoicing, and urgent supply requests with direct communication access.",
        "title_ar": "مدير حساب مخصص",
        "title_en": "Dedicated Account Manager"
      }
    ],
    "desc_ar": "قسم توزيع الأغذية لدينا مبني على جودة ثابتة وتوريد متوافق مع SFDA وشبكة توصيل موثوقة في جميع أنحاء المملكة.",
    "desc_en": "Our food distribution division is built on consistent quality, SFDA-compliant sourcing, and a reliable delivery network across the Kingdom.",
    "title_ar": "لماذا تختار البلوشي لتوريد الأغذية",
    "title_en": "Why Choose Albloshi for Food Supply"
  },
  "cta": {
    "btn1_ar": "أرسل لنا استفسارًا",
    "btn1_en": "Send Us an Inquiry",
    "btn2_ar": "استكشف أقسامنا",
    "btn2_en": "Explore Our Verticals",
    "desc_ar": "شاركنا قائمة منتجاتك ومتطلباتك الشهرية من الحجم. سيرسل لك فريق توزيع الأغذية لدينا جدول تسعير بالجملة مخصص خلال 24 ساعة.",
    "desc_en": "Share your product list and monthly volume requirements. Our food distribution team will send you a personalised wholesale pricing sheet within 24 hours.",
    "title_ar": "هل أنت مستعد لتقديم طلب أغذية؟",
    "title_en": "Ready to Place a Food Order?",
    "btn1_href": "/contact",
    "btn2_href": "/#segments"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284900/albloshi/food/hero-bg.jpg",
    "desc_ar": "توريد بالجملة على مستوى المؤسسات لأرز البسمتي وزيوت الطهي المكررة ومستلزمات المطاعم والسلع بالجملة — تُسلَّم بشكل موثوق للفنادق والمطاعم والمطابخ المركزية.",
    "desc_en": "Enterprise-scale wholesale supply of Basmati rice, refined cooking oils, restaurant essentials, and bulk commodities — delivered reliably to hotels, restaurants, and central kitchens.",
    "title_l1_ar": "توزيع أغذية متميز",
    "title_l1_en": "Premium Food Distribution",
    "title_l2_ar": "في جميع أنحاء المملكة العربية السعودية",
    "title_l2_en": "Across Saudi Arabia"
  },
  "oil_products": {
    "items": [
      {
        "id": "palm-olein",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284907/albloshi/food/general-oil.webp",
        "tag_ar": "زيوت بالجملة",
        "tag_en": "BULK OILS",
        "desc_ar": "زيت نخيل مكرر عالي الجودة يتميز باستقرار ممتاز ونقطة دخان عالية وطعم محايد، مما يجعله مثالياً للمطابخ التجارية ومصنعي الأغذية والمطاعم وخدمات التموين. متوفر في خيارات تغليف متعددة لتوزيع الجملة والاستخدام الصناعي.",
        "desc_en": "High-quality refined palm olein oil with excellent stability, a high smoke point, and a neutral taste, making it ideal for commercial kitchens, food manufacturers, restaurants, and catering services. Available in multiple packaging options for wholesale distribution and industrial use.",
        "specs_ar": [
          "أولين النخيل المكرر",
          "نقطة دخان عالية",
          "5 لتر - 20 لتر وبراميل ضخمة",
          "حلال ودرجة غذائية"
        ],
        "specs_en": [
          "Refined Palm Olein",
          "High Smoke Point",
          "5L – 20L & Bulk Drums",
          "Halal & Food Grade"
        ],
        "title_ar": "زيت النخيل المكرر الفاخر",
        "title_en": "Premium Refined Palm Olein Oil"
      }
    ],
    "desc_ar": "",
    "desc_en": "High-grade refined vegetable oils with excellent stability, high smoke point, and neutral taste for all industrial and catering cooking needs.",
    "title_ar": "",
    "title_en": "Premium Refined Cooking Oils"
  },
  "products": [
    {
      "id": "white-sugar",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284902/albloshi/food/white-sugar.webp",
      "tag_ar": "السلع",
      "tag_en": "COMMODITIES",
      "desc_ar": "سكر أبيض مكرر عالي الجودة مستمد من منتجين موثوقين، يوفر حجم بلورات متناسق ونقاء استثنائي وحلاوة موثوقة لتصنيع الأغذية والمخابز وإنتاج المشروبات وعمليات التموين الكبيرة. متوفر في عبوات كبيرة لتلبية المتطلبات التجارية والصناعية.",
      "desc_en": "High-quality refined white sugar sourced from trusted producers, offering consistent crystal size, exceptional purity, and reliable sweetness for food manufacturing, bakeries, beverage production, and large-scale catering operations. Available in bulk packaging to meet commercial and industrial requirements.",
      "specs_ar": [
        "درجة مكررة فاخرة",
        "جودة صناعة الأغذية",
        "أكياس 25 كجم – 50 كجم",
        "توريد تجاري بالجملة"
      ],
      "specs_en": [
        "Premium Refined Grade",
        "Food Industry Quality",
        "25kg – 50kg Bags",
        "Bulk Commercial Supply"
      ],
      "title_ar": "سكر أبيض مكرر فاخر",
      "title_en": "Premium Refined White Sugar",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "spices",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284903/albloshi/food/spices.webp",
      "tag_ar": "قسم البهارات",
      "tag_en": "SPICE DIVISION",
      "desc_ar": "اكتشف تشكيلة فاخرة من البهارات الكاملة والمطحونة المستمدة من مزارعين موثوقين لتقديم رائحة غنية ولون نابض بالحياة ونكهة أصلية. مثالية للمطاعم ومصنعي الأغذية وتجار الجملة وشركات التموين، مع تغليف مخصص بالجملة ليناسب كل المتطلبات التجارية.",
      "desc_en": "Discover a premium selection of whole and ground spices sourced from trusted growers to deliver rich aroma, vibrant color, and authentic flavor. Ideal for restaurants, food manufacturers, wholesalers, and catering businesses, with customized bulk packaging to suit every commercial requirement.",
      "specs_ar": [
        "بهارات كاملة ومطحونة",
        "جودة تصدير فاخرة",
        "تغليف مخصص بالجملة",
        "معتمد حلال"
      ],
      "specs_en": [
        "Whole & Ground Spices",
        "Premium Export Quality",
        "Custom Bulk Packaging",
        "Halal Certified"
      ],
      "title_ar": "بهارات كاملة ومطحونة فاخرة",
      "title_en": "Premium Whole & Ground Spices",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "general-rice",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284905/albloshi/food/general-rice.png",
      "tag_ar": "قسم الأرز",
      "tag_en": "RICE DIVISION",
      "desc_ar": "جرب الجودة الاستثنائية لأرز البسمتي طويل الحبة الفاخر، المستمد بعناية لتميزه برائحته الرقيقة وقوامه الهش واستطالة حبته الرائعة بعد الطهي. مثالي للمطاعم والفنادق وخدمات التموين وموزعي الأغذية الذين يبحثون عن جودة ثابتة في كل طلب بالجملة.",
      "desc_en": "Experience the exceptional quality of premium long-grain Basmati rice, carefully sourced for its delicate aroma, fluffy texture, and impressive grain elongation after cooking. Perfect for restaurants, hotels, catering services, and food distributors seeking consistent quality in every bulk order.",
      "specs_ar": [],
      "specs_en": [],
      "title_ar": "أصناف الأرز",
      "title_en": "Rice Varieties",
      "comingSoon": false,
      "isGeneralRice": true
    },
    {
      "id": "food-supply",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284906/albloshi/food/food-supply.webp",
      "tag_ar": "توريد الأغذية والبقالة",
      "tag_en": "FOOD & GROCERY SUPPLY",
      "desc_ar": "تشكيلة كاملة من المنتجات الغذائية المعبأة الفاخرة تشمل الوجبات الجاهزة للأكل، والأطعمة المعلبة، والمعكرونة، وزيوت الطبخ، والحبوب، والصلصات، والشوربات، ومستلزمات المخزن. مستمدة بعناية لتلبية احتياجات محلات السوبر ماركت والفنادق والمطاعم والموزعين وموردي الأغذية بالجملة.",
      "desc_en": "A complete range of premium packaged food products including ready-to-eat meals, canned foods, pasta, cooking oils, grains, sauces, soups, and pantry essentials. Carefully sourced to meet the needs of supermarkets, hotels, restaurants, distributors, and wholesale food suppliers.",
      "specs_ar": [
        "منتجات جاهزة للأكل",
        "أطعمة معلبة وجافة",
        "تغليف التجزئة والجملة",
        "حلال وجودة تصدير"
      ],
      "specs_en": [
        "Ready-to-Eat Products",
        "Canned & Dry Foods",
        "Bulk & Retail Packaging",
        "Halal & Export Quality"
      ],
      "title_ar": "منتجات غذائية معبأة فاخرة",
      "title_en": "Premium Packaged Food Products",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "general-oil",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284907/albloshi/food/general-oil.webp",
      "tag_ar": "زيوت بالجملة",
      "tag_en": "BULK OILS",
      "desc_ar": "زيت نخيل مكرر عالي الجودة يتميز باستقرار ممتاز ونقطة دخان عالية وطعم محايد، مما يجعله مثالياً للمطابخ التجارية ومصنعي الأغذية والمطاعم وخدمات التموين. متوفر في خيارات تغليف متعددة لتوزيع الجملة والاستخدام الصناعي.",
      "desc_en": "High-quality refined palm olein oil with excellent stability, a high smoke point, and a neutral taste, making it ideal for commercial kitchens, food manufacturers, restaurants, and catering services. Available in multiple packaging options for wholesale distribution and industrial use.",
      "specs_ar": [
        "أولين النخيل المكرر",
        "نقطة دخان عالية",
        "5 لتر - 20 لتر وبراميل ضخمة",
        "حلال ودرجة غذائية"
      ],
      "specs_en": [
        "Refined Palm Olein",
        "High Smoke Point",
        "5L – 20L & Bulk Drums",
        "Halal & Food Grade"
      ],
      "title_ar": "زيت النخيل المكرر الفاخر",
      "title_en": "Premium Refined Palm Olein Oil",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "honey",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284908/albloshi/food/honey.webp",
      "tag_ar": "منتجات طبيعية",
      "tag_en": "NATURAL PRODUCTS",
      "desc_ar": "استمتع بغنى العسل الطبيعي النقي، المحصود بعناية للحفاظ على طعمه الأصلي ولونه الذهبي وجودته الطبيعية. مثالي لأسواق التجزئة والضيافة ومصنعي الأغذية وموزعي الجملة، مع خيارات تغليف فاخرة للأسواق التجارية وذات العلامة الخاصة.",
      "desc_en": "Enjoy the richness of pure natural honey, carefully harvested to preserve its authentic taste, golden color, and natural goodness. Ideal for retail, hospitality, food manufacturers, and wholesale distributors, with premium packaging options for both commercial and private-label markets.",
      "specs_ar": [
        "عسل طبيعي 100%",
        "نكهة طبيعية غنية",
        "تغليف زجاجي وبالجملة",
        "حلال وجودة تصدير"
      ],
      "specs_en": [
        "100% Pure Honey",
        "Rich Natural Flavor",
        "Glass & Bulk Packaging",
        "Halal & Export Quality"
      ],
      "title_ar": "عسل طبيعي نقي",
      "title_en": "Pure Natural Honey",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "grains-pulses",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284909/albloshi/food/grains-pulses.webp",
      "tag_ar": "السلع",
      "tag_en": "COMMODITIES",
      "desc_ar": "نحن نوفر تشكيلة شاملة من الحبوب والبقوليات والحبوب والقطاني الفاخرة المستمدة من منتجين موثوقين لضمان جودة استثنائية ونضارة وتناسق. مثالية لتجار الجملة والسوبر ماركت ومصنعي الأغذية وشركات الضيافة التي تتطلب مكونات غذائية موثوقة بالجملة.",
      "desc_en": "We supply a comprehensive range of premium grains, pulses, cereals, and legumes sourced from trusted producers to ensure exceptional quality, freshness, and consistency. Ideal for wholesalers, supermarkets, food manufacturers, and hospitality businesses requiring reliable bulk food ingredients.",
      "specs_ar": [
        "حبوب وبقوليات",
        "درجة غذائية فاخرة",
        "أكياس ضخمة 25 كجم - 50 كجم",
        "حلال وجودة تصدير"
      ],
      "specs_en": [
        "Grains & Pulses",
        "Premium Food Grade",
        "25kg – 50kg Bulk Bags",
        "Halal & Export Quality"
      ],
      "title_ar": "حبوب وبقوليات فاخرة",
      "title_en": "Premium Grains & Pulses",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "chicken",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284910/albloshi/food/chicken.webp",
      "tag_ar": "توريد الدواجن",
      "tag_en": "POULTRY SUPPLY",
      "desc_ar": "نوفر منتجات دجاج طازجة ومجمدة عالية الجودة ومعالجة تحت معايير صارمة لسلامة الأغذية لضمان النضارة والنظافة والجودة الثابتة. متوفرة كطيور كاملة وتشكيلة من القطع، مثالية للمطاعم والفنادق وشركات التموين والسوبر ماركت وموزعي الجملة.",
      "desc_en": "We supply premium-quality fresh and frozen chicken products processed under strict food safety standards to ensure freshness, hygiene, and consistent quality. Available in whole birds and a variety of cuts, ideal for restaurants, hotels, catering companies, supermarkets, and wholesale distributors.",
      "specs_ar": [
        "دجاج طازج ومجمد",
        "طائر كامل وأجزاء مقطعة",
        "معتمد حلال",
        "توريد تجاري بالجملة"
      ],
      "specs_en": [
        "Fresh & Frozen Chicken",
        "Whole Bird & Cut Portions",
        "Halal Certified",
        "Bulk Commercial Supply"
      ],
      "title_ar": "دجاج طازج ومجمد",
      "title_en": "Fresh & Frozen Chicken",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "eggs",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284911/albloshi/food/eggs.webp",
      "tag_ar": "توريد الدواجن",
      "tag_en": "POULTRY SUPPLY",
      "desc_ar": "بيض مائدة فاخر وطازج من المزرعة مستمد من مزارع دواجن موثوقة ومعالج تحت معايير جودة صارمة لضمان النضارة والتغذية والإمداد الثابت. متوفر بدرجات وخيارات تغليف متعددة للسوبر ماركت والفنادق والمخابز والمطاعم وشركات التموين وموزعي الجملة.",
      "desc_en": "Premium farm-fresh table eggs sourced from trusted poultry farms and handled under strict quality standards to ensure freshness, nutrition, and consistent supply. Available in multiple grades and packaging options for supermarkets, hotels, bakeries, restaurants, catering companies, and wholesale distributors.",
      "specs_ar": [
        "بيض طازج من المزرعة",
        "درجات حجم متعددة",
        "مغلف صحياً",
        "توريد تجاري بالجملة"
      ],
      "specs_en": [
        "Farm Fresh Eggs",
        "Multiple Size Grades",
        "Hygienically Packed",
        "Bulk Commercial Supply"
      ],
      "title_ar": "بيض مائدة طازج من المزرعة",
      "title_en": "Farm Fresh Table Eggs",
      "comingSoon": false,
      "isGeneralRice": false
    },
    {
      "id": "coffee",
      "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788284912/albloshi/food/coffee.webp",
      "tag_ar": "توريد المشروبات",
      "tag_en": "BEVERAGE SUPPLY",
      "desc_ar": "اكتشف حبوب قهوة عالية الجودة ومستمدة بعناية من مناطق زراعة القهوة الشهيرة لتقديم رائحة غنية ونكهة متوازنة ونضارة استثنائية. مثالية للمقاهي والفنادق والمطاعم والمكاتب وموزعي الجملة، مع خيارات تغليف مرنة للاستخدام التجاري والتجزئة.",
      "desc_en": "Discover premium-quality coffee beans carefully sourced from renowned coffee-growing regions to deliver rich aroma, balanced flavor, and exceptional freshness. Perfect for cafés, hotels, restaurants, offices, and wholesale distributors, with flexible packaging options for retail and commercial use.",
      "specs_ar": [
        "عربي وروبوستا فاخر",
        "رائحة غنية ونكهة كاملة",
        "خيارات حبوب كاملة ومطحونة",
        "تغليف تجزئة وبالجملة"
      ],
      "specs_en": [
        "Premium Arabica & Robusta",
        "Rich Aroma & Full Flavor",
        "Whole Bean & Ground Options",
        "Bulk & Retail Packaging"
      ],
      "title_ar": "حبوب قهوة فاخرة",
      "title_en": "Premium Coffee Beans",
      "comingSoon": false,
      "isGeneralRice": false
    }
  ],
  "rice_products": {
    "items": [
      {
        "id": "basmati-rice-new",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788287406/albloshi/food/basmati-rice-new.webp",
        "tag_ar": "قسم الأرز",
        "tag_en": "RICE DIVISION",
        "desc_ar": "جرب الجودة الاستثنائية لأرز البسمتي طويل الحبة الفاخر، المستمد بعناية لتميزه برائحته الرقيقة وقوامه الهش واستطالة حبته الرائعة بعد الطهي. مثالي للمطاعم والفنادق وخدمات التموين وموزعي الأغذية الذين يبحثون عن جودة ثابتة في كل طلب بالجملة.",
        "desc_en": "Experience the exceptional quality of premium long-grain Basmati rice, carefully sourced for its delicate aroma, fluffy texture, and impressive grain elongation after cooking. Perfect for restaurants, hotels, catering services, and food distributors seeking consistent quality in every bulk order.",
        "specs_ar": [
          "بسمتي طويل الحبة إكسترا",
          "عطري طبيعياً",
          "عبوات ضخمة 1 كجم - 50 كجم",
          "حلال وجودة تصدير"
        ],
        "specs_en": [
          "Extra Long-Grain Basmati",
          "Naturally Aromatic",
          "1kg – 50kg Bulk Packs",
          "Halal & Export Quality"
        ],
        "title_ar": "أرز بسمتي طويل الحبة فاخر",
        "title_en": "Premium Long-Grain Basmati Rice"
      },
      {
        "id": "custom-basmati",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788287407/albloshi/food/custom-basmati.webp",
        "tag_ar": "تعبئة وتغليف بعلامة خاصة",
        "tag_en": "PRIVATE LABEL PACKAGING",
        "desc_ar": "ابرز علامتك التجارية مع أرز بسمتي فاخر بعلامة خاصة معبأ في أكياس مصممة باحترافية لأسواق الجملة والتجزئة والتصدير. نقدم حلول تغليف مخصصة مع طباعة متعددة اللغات ولمسات نهائية فاخرة وأحجام عبوات مرنة مصممة خصيصاً لمتطلبات عملك.",
        "desc_en": "Showcase your brand with premium private-label Basmati rice packed in professionally designed bags for wholesale, retail, and export markets. We offer customized packaging solutions with multilingual printing, premium finishes, and flexible pack sizes tailored to your business requirements.",
        "specs_ar": [
          "تعبئة وتغليف بعلامة خاصة",
          "أكياس مطبوعة مخصصة",
          "أحجام عبوات 1 كجم - 50 كجم",
          "جاهز للتصدير والتجزئة"
        ],
        "specs_en": [
          "Private Label Packaging",
          "Custom Printed Bags",
          "1kg – 50kg Pack Sizes",
          "Export & Retail Ready"
        ],
        "title_ar": "أرز بسمتي بعلامة تجارية مخصصة",
        "title_en": "Custom Branded Basmati Rice"
      },
      {
        "id": "steam-basmati",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788287409/albloshi/food/steam-basmati.webp",
        "tag_ar": "قسم الأرز",
        "tag_en": "RICE DIVISION",
        "desc_ar": "أرز بسمتي 1121 XXXL بالبخار الفاخر المعروف بحبوبه الطويلة جداً ورائحته الطبيعية الغنية وأداء طهي متميز. معالج بعناية للحفاظ على الجودة والتناسق، مما يجعله الخيار المفضل للمطاعم وتجار الجملة والسوبر ماركت وموزعي خدمات الأغذية.",
        "desc_en": "Premium 1121 XXXL Steam Basmati Rice renowned for its extra-long grains, rich natural aroma, and outstanding cooking performance. Carefully processed to retain quality and consistency, making it the preferred choice for restaurants, wholesalers, supermarkets, and food service distributors.",
        "specs_ar": [
          "أرز 1121 XXXL بالبخار",
          "جودة الحبة الطويلة جداً",
          "عطري طبيعياً",
          "عبوات ضخمة 5 كجم - 50 كجم"
        ],
        "specs_en": [
          "1121 XXXL Steam Rice",
          "Extra Long-Grain Quality",
          "Naturally Aromatic",
          "5kg – 50kg Bulk Packs"
        ],
        "title_ar": "أرز بسمتي 1121 XXXL بالبخار",
        "title_en": "1121 XXXL Steam Basmati Rice"
      },
      {
        "id": "golden-sella",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788287410/albloshi/food/golden-sella.webp",
        "tag_ar": "قسم الأرز",
        "tag_en": "RICE DIVISION",
        "desc_ar": "أرز بسمتي 1121 XXXL سيلا الذهبي الفاخر معالج بعناية للحفاظ على لونه الذهبي الطبيعي وحبوبه الطويلة جداً ورائحته المميزة. مثالي للبرياني والبلو والأطباق الأرز الفاخرة، يقدم قوام استثنائي وجودة ثابتة للمطاعم وتجار الجملة ومحترفي خدمات الأغذية.",
        "desc_en": "Premium 1121 XXXL Golden Sella Basmati Rice carefully processed to preserve its natural golden color, extra-long grains, and distinctive aroma. Ideal for biryani, pulao, and premium rice dishes, delivering exceptional texture and consistent quality for restaurants, wholesalers, and food service professionals.",
        "specs_ar": [
          "1121 XXXL سيلا الذهبي",
          "جودة الحبة الطويلة جداً",
          "رائحة غنية وقوام هش",
          "عبوات ضخمة 5 كجم - 50 كجم"
        ],
        "specs_en": [
          "1121 XXXL Golden Sella",
          "Extra Long-Grain Quality",
          "Rich Aroma & Fluffy Texture",
          "5kg – 50kg Bulk Packs"
        ],
        "title_ar": "أرز بسمتي 1121 XXXL سيلا الذهبي",
        "title_en": "1121 XXXL Golden Sella Basmati Rice"
      },
      {
        "id": "premium-1121",
        "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788287412/albloshi/food/premium-1121.webp",
        "tag_ar": "قسم الأرز",
        "tag_en": "RICE DIVISION",
        "desc_ar": "يتم اختيار أرز البسمتي 1121 الفاخر لدينا بعناية لحبوبه الطويلة جداً ورائحته الرقيقة وأداء طهي استثنائي. مثالي للبرياني والبلو وتناول الطعام الفاخر اليومي، يقدم حبوب هشة ومنفصلة وجودة ثابتة للمطاعم والفنادق وشركات التموين وموزعي الجملة.",
        "desc_en": "Our premium 1121 Basmati Rice is carefully selected for its extra-long grains, delicate aroma, and exceptional cooking performance. Perfect for biryani, pulao, and everyday premium dining, it delivers fluffy, separate grains and consistent quality for restaurants, hotels, catering companies, and wholesale distributors.",
        "specs_ar": [
          "بسمتي 1121 فاخر",
          "عطري طبيعياً",
          "جودة الحبة الطويلة جداً",
          "عبوات ضخمة 1 كجم - 50 كجم"
        ],
        "specs_en": [
          "Premium 1121 Basmati",
          "Naturally Aromatic",
          "Extra Long-Grain Quality",
          "1kg – 50kg Bulk Packs"
        ],
        "title_ar": "أرز بسمتي 1121 فاخر",
        "title_en": "Premium 1121 Basmati Rice"
      }
    ],
    "desc_ar": "",
    "desc_en": "Carefully sourced extra long-grain Basmati rice with rich aroma and fluffy texture, packed under strict SFDA standards.",
    "title_ar": "أصناف الأرز",
    "title_en": "Rice Varieties"
  },
  "standards": {
    "items": [
      {
        "ar": "معتمد من SFDA",
        "en": "SFDA Approved"
      },
      {
        "ar": "معتمد حلال",
        "en": "Halal Certified"
      },
      {
        "ar": "ISO 22000",
        "en": "ISO 22000"
      },
      {
        "ar": "HACCP",
        "en": "HACCP"
      },
      {
        "ar": "المواصفات السعودية (SASO)",
        "en": "Saudi Standards (SASO)"
      },
      {
        "ar": "مطابقة معايير الخليج",
        "en": "GCC Conformity"
      }
    ],
    "label_ar": "الشهادات والامتثال",
    "label_en": "Certifications & Compliance"
  },
  "stats": [
    {
      "num": "100+",
      "label_ar": "حاوية مستوردة",
      "label_en": "Containers Imported"
    },
    {
      "num": "5",
      "label_ar": "مدينة مغطاة",
      "label_en": "Cities Covered"
    },
    {
      "num": "SFDA",
      "label_ar": "توريد متوافق",
      "label_en": "Compliant Supply"
    },
    {
      "num": "2017",
      "label_ar": "تأسست في الدمام",
      "label_en": "Est. in Dammam"
    }
  ],
  "strengths": {
    "items": [
      {
        "icon": "location_on",
        "desc_ar": "مقرها في الدمام، المركز التجاري للمنطقة الشرقية، مما يوفر وصولاً سهلاً إلى الدمام والخبر والقطيف والجبيل والأحساء.",
        "desc_en": "Based in Dammam, the commercial hub of the Eastern Province, providing easy access to Dammam, Al Khobar, Qatif, Jubail, and Al Hassa.",
        "title_ar": "موقع استراتيجي",
        "title_en": "Strategic Location"
      },
      {
        "icon": "groups",
        "desc_ar": "فريق مخصص من 5 محترفي مبيعات يغطون الأسواق الحضرية وشبه الحضرية في جميع أنحاء المنطقة الشرقية بعلاقات عملاء عميقة.",
        "desc_en": "A dedicated team of 5 sales professionals covering urban and semi-urban markets across the Eastern Province with deep client relationships.",
        "title_ar": "فريق مبيعات قوي",
        "title_en": "Strong Sales Force"
      },
      {
        "icon": "inventory_2",
        "desc_ar": "مدعومة بطاقمين ماهرين للعمليات والإدارة يضمنان إدارة سلسة لسلسلة التوريد والتخزين والتوثيق.",
        "desc_en": "Supported by 2 skilled operations and administration staff ensuring smooth supply chain management, warehousing, and documentation.",
        "title_ar": "كفاءة تشغيلية",
        "title_en": "Operational Efficiency"
      },
      {
        "icon": "emoji_events",
        "desc_ar": "بتوجيه من شريكين ذوي خبرة عميقة بصناعة توزيع الأغذية في المملكة العربية السعودية وأسواق دول الخليج.",
        "desc_en": "Guided by 2 experienced partners with deep knowledge of the food distribution industry in Saudi Arabia and GCC markets.",
        "title_ar": "قيادة ذات خبرة",
        "title_en": "Experienced Leadership"
      },
      {
        "icon": "handshake",
        "desc_ar": "علاقات راسخة مع تجار الجملة والتجزئة والسوبرماركت وشركات الضيافة بُنيت على مدار أكثر من 8 سنوات من الخدمة المستمرة.",
        "desc_en": "Established relationships with wholesalers, retailers, supermarkets, and hospitality businesses built over 8+ years of consistent service.",
        "title_ar": "انتشار سوقي",
        "title_en": "Market Reach"
      }
    ],
    "desc_ar": "مبنية على خبرة سوقية عميقة، وقاعدة تشغيلية موثوقة، وعلاقات قوية في جميع أنحاء المنطقة الشرقية — نحن الشريك المفضل لتوزيع الأغذية لتجار التجزئة وشركات الضيافة على حد سواء.",
    "desc_en": "Built on deep market expertise, a reliable operational backbone, and strong relationships across the Eastern Province — we are the preferred food distribution partner for retailers and hospitality businesses alike.",
    "label_ar": "نقاط قوتنا",
    "label_en": "OUR STRENGTHS",
    "title_ar": "لماذا الشراكة مع البلوشي",
    "title_en": "Why Partner With Albloshi"
  }
};

export const SECTIONS = ['hero', 'stats', 'products', 'capabilities', 'strengths', 'standards', 'cta'];

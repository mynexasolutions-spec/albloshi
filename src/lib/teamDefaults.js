// Default (fallback) team roster for the About page's "Leadership Team" section.
// Used only when Supabase is unreachable or the `team_members` table is empty/missing —
// the live source of truth is the `team_members` table, managed at /admin/team.
// See supabase/team_members.sql for the backing table.

const IMG = (name) => `https://res.cloudinary.com/dut8h8mt3/image/upload/albloshi/team/${name}`;

export const DEFAULT_TEAM = [
  {
    id: 'default-1', categories: ['chemical'], sort_order: 0,
    name_en: 'Jetu Lalwani', name_ar: 'جيتو لالواني',
    role_en: 'Chemical Division Lead', role_ar: 'رئيس قسم الكيميائيات',
    bio_en: 'Directing specialty chemical supplies, industrial water treatment solutions, and TELLABS coordination.',
    bio_ar: 'توجيه إمدادات الكيميائيات المتخصصة وحلول معالجة المياه الصناعية وتنسيق تيلابس.',
    image: IMG('jetu-lalwani.jpg'),
  },
  {
    id: 'default-2', categories: ['chemical'], sort_order: 1,
    name_en: 'Sajid Pachhapure', name_ar: 'ساجد باشابوري',
    role_en: 'Director', role_ar: 'مدير',
    bio_en: "Guiding the company's strategic vision and operations.",
    bio_ar: 'توجيه الرؤية الاستراتيجية للشركة وعملياتها.',
    image: IMG('ajay-adnala.jpg'),
  },
  {
    id: 'default-3', categories: ['chemical'], sort_order: 2,
    name_en: 'Ajay Adnala', name_ar: 'أجاي أدنالا',
    role_en: 'Director', role_ar: 'مدير',
    bio_en: 'Driving growth and operational excellence across the organization.',
    bio_ar: 'قيادة النمو والتميز التشغيلي في جميع أنحاء المؤسسة.',
    image: IMG('sajid-pachhapure.jpg'),
  },
  {
    id: 'default-4', categories: ['chemical', 'food'], sort_order: 3,
    name_en: 'Mohammed Abdullah Al-Bloshi', name_ar: 'محمد بن عبد الله بن عبد القادر الجمالي البلوشي',
    role_en: 'Chairman & Founder', role_ar: 'رئيس مجلس الإدارة والمؤسس',
    bio_en: "Steering the strategic vision and long-term growth of the company across KSA's key industrial sectors.",
    bio_ar: 'يقود الرؤية الاستراتيجية والنمو طويل الأمد للشركة عبر أهم القطاعات الصناعية في المملكة.',
    image: IMG('mohammed-abdullah-albloshi.jpg'),
  },
  {
    id: 'default-5', categories: ['chemical', 'food'], sort_order: 4,
    name_en: 'I Akhter', name_ar: 'إيه أختر',
    role_en: 'Operations Manager', role_ar: 'مدير العمليات',
    bio_en: 'Coordinating chemical shipping, storage safety, and prompt terminal dispatch operations.',
    bio_ar: 'تنسيق شحن المواد الكيميائية وسلامة التخزين وعمليات الإرسال الفوري من المحطة.',
    image: '',
  },
  {
    id: 'default-6', categories: ['chemical'], sort_order: 5,
    name_en: 'Arbaz Shaikh', name_ar: 'أرباز شيخ',
    role_en: 'Sales Engineer', role_ar: 'مهندس مبيعات',
    bio_en: 'Overseeing corporate accounts, client relationships, and sales pipelines in the chemical division.',
    bio_ar: 'الإشراف على حسابات الشركات وعلاقات العملاء وقنوات المبيعات في قسم الكيميائيات.',
    image: IMG('arbaz-shaikh.jpg'),
  },
  {
    id: 'default-7', categories: ['chemical'], sort_order: 6,
    name_en: 'Amreen Khan', name_ar: 'أمرين خان',
    role_en: 'Accounts Manager', role_ar: 'مدير الحسابات',
    bio_en: 'Overseeing corporate accounts, client relationships, and sales pipelines in the chemical division.',
    bio_ar: 'الإشراف على حسابات الشركات وعلاقات العملاء وقنوات المبيعات في قسم الكيميائيات.',
    image: IMG('amreen-khan.jpg'),
  },
  {
    id: 'default-8', categories: ['industrial'], sort_order: 7,
    name_en: 'Mohammed Riaz', name_ar: 'محمد رياض',
    role_en: 'Business Development Manager', role_ar: 'مدير تطوير الأعمال',
    bio_en: 'Leading enterprise growth and strategic partnerships, including our exclusive alliance with TELLABS chemicals.',
    bio_ar: 'يقود نمو المؤسسة والشراكات الاستراتيجية، بما في ذلك تحالفنا الحصري مع كيميائيات تيلابس.',
    image: IMG('mohammed-riaz.jpg'),
  },
  {
    id: 'default-9', categories: ['industrial'], sort_order: 8,
    name_en: 'Mr. T.A. Khan', name_ar: 'السيد تي. إيه. خان',
    role_en: 'Industrial Supply Engineer', role_ar: 'مهندس التوريدات الصناعية',
    bio_en: 'Providing engineering support and quality verification for industrial materials, piping, and instrumentation.',
    bio_ar: 'تقديم الدعم الهندسي والتحقق من الجودة للمواد الصناعية والأنابيب والأجهزة.',
    image: '',
  },
  {
    id: 'default-10', categories: ['manpower'], sort_order: 9,
    name_en: 'Ahsan Jafri', name_ar: 'أحسن جعفري',
    role_en: 'Operations Head', role_ar: 'رئيس العمليات',
    bio_en: 'Overseeing large-scale manpower mobilization, site compliance, and client deployment schedules.',
    bio_ar: 'الإشراف على حشد العمالة على نطاق واسع والامتثال للموقع وجداول نشر العملاء.',
    image: IMG('ahsan-jafri.jpg'),
  },
  {
    id: 'default-11', categories: ['food'], sort_order: 11,
    name_en: 'Raj Soni', name_ar: 'راج سوني',
    role_en: 'Operation Head (FMCG)', role_ar: 'رئيس العمليات (FMCG)',
    bio_en: 'Managing food import channels, quality compliance (SFDA), and warehousing networks.',
    bio_ar: 'إدارة قنوات استيراد الأغذية والامتثال للجودة (الهيئة العامة للغذاء والدواء) شبكات المستودعات.',
    image: IMG('raj-soni.jpg'),
  },
  {
    id: 'default-12', categories: ['food'], sort_order: 13,
    name_en: 'Iqbal Jafri', name_ar: 'إقبال جعفري',
    role_en: 'Sales Manager', role_ar: 'مدير المبيعات',
    bio_en: 'Managing wholesale food distribution accounts and client liaison support.',
    bio_ar: 'إدارة حسابات توزيع الأغذية بالجملة ودعم العلاقات مع العملاء.',
    image: IMG('iqbal-jafri.jpg'),
  },
  {
    id: 'default-13', categories: ['food'], sort_order: 14,
    name_en: 'Aqueel Ahmad', name_ar: 'عقيل أحمد',
    role_en: 'Sales Manager', role_ar: 'مدير المبيعات',
    bio_en: 'Driving wholesale food distribution accounts and corporate client sales.',
    bio_ar: 'إدارة حسابات توزيع المواد الغذائية بالجملة ومبيعات عملاء الشركات.',
    image: IMG('aqeel-ahmad.jpg'),
  },
];

export async function fetchTeamMembers(supabase) {
  if (!supabase) return DEFAULT_TEAM;
  try {
    const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_TEAM;
    return data;
  } catch {
    return DEFAULT_TEAM;
  }
}

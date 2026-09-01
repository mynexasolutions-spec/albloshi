// Default (fallback) content for the Contact page.
// Used only when Supabase is unreachable or the `vertical_content` rows for
// page='contact' are missing — the live source of truth is managed at
// /admin/settings (Page Content tabs). See supabase/vertical_content.sql.
//
// Phone/email/address/CR number are NOT here — those are shared site-wide
// values from `site_settings` (see src/lib/siteSettingsDefaults.js).

export const DEFAULTS = {
  "cta": {
    "desc_ar": "يقع في قلب الممر الصناعي بالمنطقة الشرقية — يسهل الوصول إليه لزيارات المواقع والفحوصات والاجتماعات.",
    "desc_en": "Located in the heart of the Eastern Province's industrial corridor — easily accessible for site visits, inspections, and meetings.",
    "title_ar": "زر مقرنا الرئيسي في الدمام",
    "title_en": "Visit Our Dammam Headquarters",
    "call_btn_ar": "اتصل",
    "call_btn_en": "Call",
    "email_btn_ar": "راسلنا",
    "email_btn_en": "Email"
  },
  "form": {
    "desc_ar": "يرجى تقديم بياناتك ومواصفات مشروعك أدناه. سيقوم فريق تطوير الأعمال لدينا بتحليل طلبك والرد خلال يوم عمل واحد.",
    "desc_en": "Please submit your details and project specifications below. Our business development team will analyze your request and reply within one business day.",
    "title_ar": "استفسار مبيعات المؤسسات",
    "title_en": "Enterprise Sales Inquiry"
  },
  "hero": {
    "image": "https://res.cloudinary.com/dut8h8mt3/image/upload/v1788291688/albloshi/contact/hero-bg.jpg",
    "desc_ar": "تواصل مع فريقنا للاستفسارات والعروض وفرص الشراكة. نحن هنا لدعم أعمالك عبر جميع أقسامنا.",
    "desc_en": "Connect with our team for inquiries, quotes, and partnership opportunities. We're here to support your business across all our divisions.",
    "title_ar": "تواصل معنا",
    "title_en": "Get in Touch"
  },
  "info": {
    "desc_ar": "تواصل مباشرة مع مقرنا الرئيسي أو مديري الأقسام لترتيب استشارة فنية أو الحصول على حسابات ائتمانية مباشرة.",
    "desc_en": "Connect directly with our headquarters or division directors to arrange technical consultation or obtain direct credit accounts.",
    "title_ar": "تواصل مع مكاتبنا الرئيسية",
    "title_en": "Connect With Our Corporate Offices",
    "bd_name_ar": "محمد بن عبد الله بن عبد القادر الجمالي البلوشي — مدير تطوير الأعمال",
    "bd_name_en": "Mohammed Abdullah Al-Bloshi — Business Development Manager",
    "bd_title_ar": "مكتب تطوير الأعمال",
    "bd_title_en": "Business Development Office",
    "sales_title_ar": "مكتب المبيعات العام",
    "sales_title_en": "General Sales Desk",
    "address_title_ar": "عنوان المقر الرئيسي بالدمام",
    "address_title_en": "Dammam Headquarters Address"
  }
};

export const SECTIONS = ['hero', 'form', 'info', 'cta'];

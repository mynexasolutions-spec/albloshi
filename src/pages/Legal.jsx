import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { DEFAULTS as SETTINGS_DEFAULTS, fetchSiteSettings } from '../lib/siteSettingsDefaults';

// Legal text lives here as data (English + Arabic). Markup in strings:
//   **bold**   [[email]]   [[terms]]   [[privacy]]
// Update `updated` whenever the wording changes. Have a lawyer review both languages before running ads.

const PRIVACY = {
  en: {
    title: 'Privacy Policy',
    description: 'How ALBLOSHI collects, uses and protects personal data submitted through this website.',
    updated: 'Last updated: 6 November 2026',
    intro: 'Mohammed Abdullah Al Bloshi Co. ("ALBLOSHI", "we", "us") operates this website. This policy explains what personal data we collect through it, why, and the choices you have. Please read it together with our [[terms]].',
    sections: [
      { h: '1. Data we collect', ul: [
        '**Inquiry details you submit:** name, email address, phone number, the business division you are interested in, and your message.',
        '**Technical and usage data (only if you accept cookies):** pages viewed, device and browser information, approximate location, and the advertising campaign that brought you here (for example UTM tags and ad click IDs such as gclid or fbclid).',
        '**Clicks on contact links:** we record that a phone, WhatsApp or email link was clicked, to measure how well the site works. The number or address itself is not sent to analytics.',
        '**Preferences stored in your browser:** your language and your cookie choice.',
        '**Spam protection data:** to block automated submissions we run an anti-bot check (a small calculation in your browser or, if enabled, Cloudflare Turnstile), which may process technical signals such as your IP address and browser details.',
      ] },
      { h: '2. Why we use it', ul: [
        'To respond to your inquiry and provide quotations for our products and services (basis: your consent and our legitimate interest in answering requests you send us).',
        'To measure and improve the website and our advertising (basis: your consent, given through the cookie banner).',
        'To protect the website against spam, fraud and abuse (basis: legitimate interest).',
      ] },
      { h: '3. Cookies and tracking', p: [
        'Essential functions (your language and your cookie choice) do not need consent. Analytics and advertising tags, such as Google Tag Manager, Google Analytics, Google Ads, Meta Pixel and LinkedIn Insight, load **only after you click "Accept"** on the cookie banner. If you click "Reject", they do not load. You can change your choice at any time with the "Cookie Settings" link in the footer.',
        'Fonts are loaded from Google Fonts, so Google receives your IP address when a page opens, regardless of your cookie choice.',
      ] },
      { h: '4. Who receives your data', p: [
        'We do not sell personal data. We share it only with service providers that help us run the website and our business, acting on our instructions: our database and hosting providers (Supabase, Vercel), image delivery (Cloudinary), spam protection (Cloudflare, if Turnstile is enabled), Google Fonts, and, if you accept cookies, analytics and advertising platforms (Google, Meta, LinkedIn). Some of these providers process data outside Saudi Arabia; where required, we rely on appropriate safeguards.',
      ] },
      { h: '5. How long we keep it', p: [
        'Inquiries are kept for as long as needed to handle your request and our resulting business relationship, and are then deleted or anonymised. Analytics data is kept according to the settings of the analytics provider.',
      ] },
      { h: '6. Your rights', p: [
        'Under the Saudi Personal Data Protection Law and other applicable law, you may ask us to confirm what data we hold about you, access it, correct it, delete it, or stop contacting you, and you may withdraw your consent at any time. Withdrawing consent does not affect processing carried out before withdrawal.',
      ] },
      { h: '7. Security', p: [
        'We use access control, encrypted connections (HTTPS), restricted database access and spam protection to safeguard your data. No online system is perfectly secure, but we work to keep your information protected.',
      ] },
      { h: '8. Children', p: [
        'This website is intended for businesses and is not directed at children. We do not knowingly collect data from children.',
      ] },
      { h: '9. Changes', p: ['We may update this policy; the date at the top shows the latest version.'] },
      { h: '10. Contact us', p: [
        'To exercise your rights or ask a question, email [[email]] or write to Mohammed Abdullah Al Bloshi Co., Dammam, Eastern Province, Saudi Arabia.',
      ] },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    description: 'كيف تجمع شركة البلوشي البيانات الشخصية المرسلة عبر هذا الموقع وتستخدمها وتحميها.',
    updated: 'آخر تحديث: 6 نوفمبر 2026',
    intro: 'تُشغّل شركة محمد عبدالله البلوشي ("البلوشي" أو "نحن") هذا الموقع. توضح هذه السياسة البيانات الشخصية التي نجمعها عبره، وسبب جمعها، والخيارات المتاحة لك. يُرجى قراءتها مع [[terms]].',
    sections: [
      { h: '1. البيانات التي نجمعها', ul: [
        '**بيانات الاستفسار التي ترسلها:** الاسم والبريد الإلكتروني ورقم الهاتف والقسم الذي يهمك ورسالتك.',
        '**البيانات التقنية وبيانات الاستخدام (فقط إذا وافقت على ملفات تعريف الارتباط):** الصفحات التي زرتها، ومعلومات الجهاز والمتصفح، والموقع التقريبي، والحملة الإعلانية التي أوصلتك إلينا (مثل وسوم UTM ومعرّفات النقر الإعلانية مثل gclid وfbclid).',
        '**النقرات على روابط التواصل:** نسجّل أنك نقرت على رابط اتصال أو واتساب أو بريد إلكتروني لقياس فعالية الموقع، ولا يُرسَل الرقم أو العنوان نفسه إلى أدوات التحليل.',
        '**التفضيلات المحفوظة في متصفحك:** لغتك واختيارك بشأن ملفات تعريف الارتباط.',
        '**بيانات الحماية من الرسائل المزعجة:** لمنع الإرسال الآلي نستخدم فحصاً ضد الروبوتات (عملية حسابية صغيرة في متصفحك، أو Cloudflare Turnstile إن كان مفعّلاً)، وقد يعالج إشارات تقنية مثل عنوان IP وتفاصيل المتصفح.',
      ] },
      { h: '2. لماذا نستخدمها', ul: [
        'للرد على استفسارك وتقديم عروض الأسعار لمنتجاتنا وخدماتنا (الأساس: موافقتك ومصلحتنا المشروعة في الرد على الطلبات التي ترسلها إلينا).',
        'لقياس الموقع وإعلاناتنا وتحسينهما (الأساس: موافقتك التي تمنحها عبر شريط ملفات تعريف الارتباط).',
        'لحماية الموقع من الرسائل المزعجة والاحتيال وإساءة الاستخدام (الأساس: المصلحة المشروعة).',
      ] },
      { h: '3. ملفات تعريف الارتباط والتتبع', p: [
        'الوظائف الأساسية (لغتك واختيارك بشأن ملفات الارتباط) لا تحتاج إلى موافقة. أما وسوم التحليلات والإعلانات مثل Google Tag Manager وGoogle Analytics وGoogle Ads وMeta Pixel وLinkedIn Insight فلا تُحمَّل **إلا بعد ضغطك على "قبول"** في شريط ملفات تعريف الارتباط. وإذا ضغطت "رفض" فلن تُحمَّل. يمكنك تغيير اختيارك في أي وقت عبر رابط "إعدادات ملفات تعريف الارتباط" في أسفل الصفحة.',
        'تُحمَّل الخطوط من Google Fonts، لذا تتلقى Google عنوان IP الخاص بك عند فتح الصفحة بغض النظر عن اختيارك لملفات تعريف الارتباط.',
      ] },
      { h: '4. من يستلم بياناتك', p: [
        'لا نبيع البيانات الشخصية. نشاركها فقط مع مزودي الخدمات الذين يساعدوننا في تشغيل الموقع وأعمالنا وفق تعليماتنا: مزودو قاعدة البيانات والاستضافة (Supabase وVercel)، وتوصيل الصور (Cloudinary)، والحماية من الرسائل المزعجة (Cloudflare إذا فُعّل Turnstile)، وخطوط Google Fonts، وإذا وافقت على ملفات تعريف الارتباط فمنصات التحليلات والإعلانات (Google وMeta وLinkedIn). يعالج بعض هؤلاء المزودين البيانات خارج المملكة العربية السعودية، وعند اللزوم نعتمد ضمانات مناسبة.',
      ] },
      { h: '5. مدة الاحتفاظ بالبيانات', p: [
        'نحتفظ بالاستفسارات للمدة اللازمة لمعالجة طلبك وعلاقة العمل الناتجة عنه، ثم نحذفها أو نجعلها مجهولة الهوية. وتُحفظ بيانات التحليلات وفق إعدادات مزود التحليلات.',
      ] },
      { h: '6. حقوقك', p: [
        'وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية والأنظمة الأخرى المعمول بها، يحق لك أن تطلب منا تأكيد البيانات التي نحتفظ بها عنك، أو الاطلاع عليها، أو تصحيحها، أو حذفها، أو التوقف عن التواصل معك، كما يحق لك سحب موافقتك في أي وقت. ولا يؤثر سحب الموافقة على المعالجة التي تمت قبل السحب.',
      ] },
      { h: '7. الأمان', p: [
        'نستخدم التحكم في الوصول والاتصالات المشفرة (HTTPS) وتقييد الوصول إلى قاعدة البيانات والحماية من الرسائل المزعجة لحماية بياناتك. لا يوجد نظام إلكتروني آمن بالكامل، لكننا نعمل على إبقاء معلوماتك محمية.',
      ] },
      { h: '8. الأطفال', p: [
        'هذا الموقع موجه للشركات وليس للأطفال. ولا نجمع بيانات الأطفال عن علم.',
      ] },
      { h: '9. التعديلات', p: ['قد نحدّث هذه السياسة، ويوضح التاريخ في أعلى الصفحة آخر نسخة.'] },
      { h: '10. تواصل معنا', p: [
        'لممارسة حقوقك أو لطرح سؤال، راسلنا على [[email]] أو اكتب إلى: شركة محمد عبدالله البلوشي، الدمام، المنطقة الشرقية، المملكة العربية السعودية.',
      ] },
    ],
  },
};

const TERMS = {
  en: {
    title: 'Terms of Service',
    description: 'Terms governing the use of the ALBLOSHI website and inquiries made through it.',
    updated: 'Last updated: 6 November 2026',
    intro: 'By using this website you agree to these terms. If you do not agree, please do not use the website.',
    sections: [
      { h: '1. About us', p: ['This website is operated by Mohammed Abdullah Al Bloshi Co. ("ALBLOSHI", "we", "us"), a multi-division company in Dammam, Eastern Province, Saudi Arabia, supplying chemicals, industrial materials, food products and manpower.'] },
      { h: '2. Use of the website', p: ['You may use the website for lawful business purposes only. You must not attempt to gain unauthorised access, interfere with its operation, submit false or automated inquiries, or copy content for commercial use without our written permission.'] },
      { h: '3. Product and service information', p: ['Information on this website, including product descriptions, images and specifications, is provided for general guidance and may change without notice. It is not a binding offer. Prices, availability, certifications and delivery terms are confirmed only in a written quotation or contract signed or accepted by us.'] },
      { h: '4. Inquiries', p: ['Submitting an inquiry does not create a contract. We will use the details you provide as described in our [[privacy]]. Please make sure the information you submit is accurate.'] },
      { h: '5. Intellectual property', p: ["All content, logos, trademarks and images on this website belong to us or our licensors (including our partners' brands such as TELLABS) and are protected by law. You may not reuse them without permission."] },
      { h: '6. Third-party links', p: ['The website may link to third-party sites (for example WhatsApp or social networks). We are not responsible for their content or practices.'] },
      { h: '7. Disclaimer and limitation of liability', p: ['The website is provided "as is". To the extent permitted by law, we are not liable for indirect or consequential loss arising from the use of, or inability to use, the website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.'] },
      { h: '8. Governing law', p: ['These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes are subject to the jurisdiction of the competent courts in Dammam.'] },
      { h: '9. Changes and contact', p: ['We may update these terms; continued use after an update means you accept it. Questions: [[email]].'] },
    ],
  },
  ar: {
    title: 'شروط الخدمة',
    description: 'الشروط التي تحكم استخدام موقع البلوشي والاستفسارات المرسلة عبره.',
    updated: 'آخر تحديث: 6 نوفمبر 2026',
    intro: 'باستخدامك لهذا الموقع فإنك توافق على هذه الشروط. وإذا لم توافق عليها فيرجى عدم استخدام الموقع.',
    sections: [
      { h: '1. من نحن', p: ['يُشغَّل هذا الموقع من قبل شركة محمد عبدالله البلوشي ("البلوشي" أو "نحن")، وهي شركة متعددة الأقسام مقرها الدمام بالمنطقة الشرقية في المملكة العربية السعودية، وتورّد الكيماويات والمواد الصناعية والمنتجات الغذائية والأيدي العاملة.'] },
      { h: '2. استخدام الموقع', p: ['يجوز لك استخدام الموقع لأغراض تجارية مشروعة فقط. ولا يجوز لك محاولة الوصول غير المصرح به، أو التدخل في تشغيله، أو إرسال استفسارات كاذبة أو آلية، أو نسخ المحتوى للاستخدام التجاري دون إذن كتابي منا.'] },
      { h: '3. معلومات المنتجات والخدمات', p: ['المعلومات الواردة في هذا الموقع، بما في ذلك أوصاف المنتجات والصور والمواصفات، مقدمة للإرشاد العام وقد تتغير دون إشعار، وهي ليست عرضاً ملزماً. ولا تُؤكَّد الأسعار والتوافر والشهادات وشروط التسليم إلا في عرض سعر مكتوب أو عقد موقّع أو مقبول من قبلنا.'] },
      { h: '4. الاستفسارات', p: ['إرسال الاستفسار لا ينشئ عقداً. وسنستخدم البيانات التي تقدمها كما هو موضح في [[privacy]]. يرجى التأكد من دقة المعلومات التي ترسلها.'] },
      { h: '5. الملكية الفكرية', p: ['جميع المحتويات والشعارات والعلامات التجارية والصور في هذا الموقع مملوكة لنا أو لمرخصينا (بما في ذلك علامات شركائنا مثل TELLABS) ومحمية بموجب النظام. ولا يجوز إعادة استخدامها دون إذن.'] },
      { h: '6. روابط الأطراف الثالثة', p: ['قد يتضمن الموقع روابط لمواقع أطراف ثالثة (مثل واتساب أو شبكات التواصل). ولسنا مسؤولين عن محتواها أو ممارساتها.'] },
      { h: '7. إخلاء المسؤولية وحدودها', p: ['يُقدَّم الموقع "كما هو". وإلى الحد الذي يسمح به النظام، لا نتحمل المسؤولية عن الخسائر غير المباشرة أو التبعية الناتجة عن استخدام الموقع أو عدم القدرة على استخدامه أو الاعتماد على محتواه. ولا يوجد في هذه الشروط ما يحد من مسؤولية لا يجوز الحد منها نظاماً.'] },
      { h: '8. النظام الواجب التطبيق', p: ['تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص بالنظر في أي نزاع المحاكم المختصة في الدمام.'] },
      { h: '9. التعديلات والتواصل', p: ['قد نحدّث هذه الشروط، ويعني استمرارك في الاستخدام بعد التحديث قبولك لها. للاستفسار: [[email]].'] },
    ],
  },
};

const LINK_LABELS = {
  en: { terms: 'Terms of Service', privacy: 'Privacy Policy' },
  ar: { terms: 'شروط الخدمة', privacy: 'سياسة الخصوصية' },
};

// Renders **bold**, [[email]], [[terms]] and [[privacy]] inside a string.
function Rich({ text, email, lang }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[(?:email|terms|privacy)\]\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part === '[[email]]') return <a key={i} href={`mailto:${email}`}>{email}</a>;
    if (part === '[[terms]]') return <Link key={i} to="/terms">{LINK_LABELS[lang].terms}</Link>;
    if (part === '[[privacy]]') return <Link key={i} to="/privacy-policy">{LINK_LABELS[lang].privacy}</Link>;
    return part;
  });
}

function LegalPage({ doc }) {
  const { language } = useLanguage();
  const lang = doc[language] ? language : 'en';
  const c = doc[lang];
  const [settings, setSettings] = useState(SETTINGS_DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(supabase).then(s => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);
  const email = settings.email_admin;

  return (
    <>
      <Helmet>
        <title>{c.title} | ALBLOSHI</title>
        <meta name="description" content={c.description} />
      </Helmet>
      <Header />
      <section className="page-hero legal-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.96) 0%, rgba(27, 95, 175, 0.88) 100%)' }}>
        <div className="container">
          <h1>{c.title}</h1>
          <p>{c.updated}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container legal-content" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
          <p><Rich text={c.intro} email={email} lang={lang} /></p>
          {c.sections.map(s => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p && s.p.map(t => <p key={t}><Rich text={t} email={email} lang={lang} /></p>)}
              {s.ul && <ul>{s.ul.map(t => <li key={t}><Rich text={t} email={email} lang={lang} /></li>)}</ul>}
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <MobileFooterBar />
    </>
  );
}

export const PrivacyPolicy = () => <LegalPage doc={PRIVACY} />;
export const Terms = () => <LegalPage doc={TERMS} />;

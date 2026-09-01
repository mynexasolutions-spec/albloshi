import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { fetchVerticalContent } from '../../lib/verticalContent';
import { DEFAULTS as PAGE_DEFAULTS, SECTIONS as PAGE_SECTIONS } from '../../lib/verticalDefaults/contact';
import { DEFAULTS as SETTINGS_DEFAULTS, BRANDING_DEFAULTS, fetchSiteSettings, fetchBranding } from '../../lib/siteSettingsDefaults';

const FOLDER = 'albloshi/contact';

// Tabs backed by vertical_content (page='contact') use table:'vertical'.
// Tabs backed by site_settings (one row per key) use table:'settings'.
const TABS = [
  { key: 'hero', label: 'Hero Banner', table: 'vertical' },
  { key: 'form', label: 'Inquiry Form Heading', table: 'vertical' },
  { key: 'info', label: 'Office Info Panel', table: 'vertical' },
  { key: 'cta', label: 'Bottom CTA', table: 'vertical' },
  { key: 'details', label: 'Phone, Email & Address', table: 'settings' },
  { key: 'branding', label: 'Logo', table: 'settings' },
];

const inp = (extra = {}) => ({
  width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', color: '#0f172a',
  background: 'white', boxSizing: 'border-box', transition: 'border-color 0.15s', ...extra,
});
const focusHandlers = {
  onFocus: e => { e.target.style.borderColor = '#1B5FAF'; },
  onBlur: e => { e.target.style.borderColor = '#e2e8f0'; },
};

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      {label && <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>{label}</label>}
      {children}
      {hint && <p style={{ margin: '0.25rem 0 0', fontSize: '0.7rem', color: '#94a3b8' }}>{hint}</p>}
    </div>
  );
}

function LangTabs({ lang, setLang }) {
  const tabBtn = (active) => ({
    padding: '0.4rem 1rem', borderRadius: 8, border: '1.5px solid', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700,
    borderColor: active ? '#1B5FAF' : '#e2e8f0',
    background: active ? '#1B5FAF' : 'white',
    color: active ? 'white' : '#64748b',
  });
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button type="button" onClick={() => setLang('en')} style={tabBtn(lang === 'en')}>English</button>
      <button type="button" onClick={() => setLang('ar')} style={tabBtn(lang === 'ar')}>Arabic</button>
    </div>
  );
}

function ImageField({ value, onChange, ratio = '16 / 9' }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('Image must be under 10 MB.'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, FOLDER);
      onChange(url);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error(err.message);
    }
    setUploading(false);
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
      {value ? (
        <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, borderRadius: 8, border: '1px solid #f1f5f9', background: '#f8fafc', overflow: 'hidden' }}>
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          <div style={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 6 }}>
            <button type="button" onClick={() => fileInputRef.current?.click()} title="Replace image"
              style={{ background: 'rgba(15,23,42,0.7)', color: 'white', border: 'none', borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span className="material-icons" style={{ fontSize: '0.85rem' }}>swap_horiz</span>
            </button>
            <button type="button" onClick={() => onChange('')} title="Remove image"
              style={{ background: 'rgba(239,68,68,0.8)', color: 'white', border: 'none', borderRadius: 6, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span className="material-icons" style={{ fontSize: '0.85rem' }}>delete_outline</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? '#1B5FAF' : '#e2e8f0'}`, borderRadius: 8, width: '100%', aspectRatio: ratio,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: uploading ? 'wait' : 'pointer', background: dragOver ? '#eff6ff' : '#f8fafc', transition: 'all 0.15s',
          }}
        >
          {uploading ? (
            <div style={{ width: 22, height: 22, border: '3px solid #dbeafe', borderTopColor: '#1B5FAF', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          ) : (
            <>
              <span className="material-icons" style={{ fontSize: '1.3rem', color: dragOver ? '#1B5FAF' : '#cbd5e1' }}>cloud_upload</span>
              <p style={{ color: '#94a3b8', fontSize: '0.7rem', margin: '0.3rem 0 0', textAlign: 'center', padding: '0 0.5rem' }}>
                {dragOver ? 'Drop to upload' : 'Click or drag & drop'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, lang, setLang, onSave, saving, disabled, children }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
      <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{title}</span>
        <div className="section-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {lang && <LangTabs lang={lang} setLang={setLang} />}
          <button type="button" className="save-section-btn" onClick={onSave} disabled={saving || disabled}
            style={{ padding: '0.5rem 1.1rem', background: '#1B5FAF', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, cursor: (saving || disabled) ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: disabled ? 0.6 : 1 }}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>save</span>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        {children}
      </div>
    </div>
  );
}

const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' };

export default function AdminContactSettings() {
  const [page, setPage] = useState(() => JSON.parse(JSON.stringify(PAGE_DEFAULTS))); // vertical_content page='contact'
  const [details, setDetails] = useState(SETTINGS_DEFAULTS); // site_settings key='contact'
  const [branding, setBranding] = useState(BRANDING_DEFAULTS); // site_settings key='branding'
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const [langs, setLangs] = useState(() => {
    const l = {};
    [...PAGE_SECTIONS, 'details'].forEach(s => { l[s] = 'en'; });
    return l;
  });
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    (async () => {
      if (!supabase) { setLoading(false); return; }
      const [mergedPage, mergedDetails, mergedBranding] = await Promise.all([
        fetchVerticalContent(supabase, 'contact', PAGE_DEFAULTS, PAGE_SECTIONS),
        fetchSiteSettings(supabase),
        fetchBranding(supabase),
      ]);
      setPage(mergedPage);
      setDetails(mergedDetails);
      setBranding(mergedBranding);
      setLoading(false);
    })();
  }, []);

  const setLang = (key, lang) => setLangs(l => ({ ...l, [key]: lang }));

  const setPageField = (section, field, value) =>
    setPage(p => ({ ...p, [section]: { ...p[section], [field]: value } }));
  const setDetailsField = (field, value) => setDetails(d => ({ ...d, [field]: value }));

  const activeTab = TABS.find(t => t.key === activeKey);

  const handleSave = async () => {
    if (!supabase) { toast.error('Supabase is not configured — cannot save.'); return; }
    setSavingMap(m => ({ ...m, [activeKey]: true }));
    let error;
    if (activeTab.table === 'vertical') {
      ({ error } = await supabase.from('vertical_content')
        .upsert({ page: 'contact', section: activeKey, data: page[activeKey], updated_at: new Date().toISOString() }, { onConflict: 'page,section' }));
    } else if (activeKey === 'details') {
      ({ error } = await supabase.from('site_settings')
        .upsert({ key: 'contact', data: details, updated_at: new Date().toISOString() }, { onConflict: 'key' }));
    } else {
      ({ error } = await supabase.from('site_settings')
        .upsert({ key: 'branding', data: branding, updated_at: new Date().toISOString() }, { onConflict: 'key' }));
    }
    setSavingMap(m => ({ ...m, [activeKey]: false }));
    if (error) toast.error(`Save failed: ${error.message}. Have you run the .sql files in supabase/ yet?`);
    else toast.success('Saved! Live across the site now.');
  };

  const renderHero = () => {
    const lang = langs.hero;
    const sec = page.hero;
    return (
      <>
        <Field label="Background Image"><ImageField value={sec.image} onChange={v => setPageField('hero', 'image', v)} ratio="16 / 9" /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setPageField('hero', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setPageField('hero', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
      </>
    );
  };

  const renderForm = () => {
    const lang = langs.form;
    const sec = page.form;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setPageField('form', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setPageField('form', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Only the heading above the form is editable here — the individual field labels (Name, Email, etc.) are fixed to keep the form working correctly.</p>
      </>
    );
  };

  const renderInfo = () => {
    const lang = langs.info;
    const sec = page.info;
    return (
      <>
        <Field label={`Panel Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setPageField('info', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Panel Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setPageField('info', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          <Field label={`"Business Development" Card Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`bd_title_${lang}`]} onChange={e => setPageField('info', `bd_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Contact Person Name & Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`bd_name_${lang}`]} onChange={e => setPageField('info', `bd_name_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <div style={grid2}>
          <Field label={`"Sales Desk" Card Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`sales_title_${lang}`]} onChange={e => setPageField('info', `sales_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`"Address" Card Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`address_title_${lang}`]} onChange={e => setPageField('info', `address_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>The actual phone/email/address values shown in these cards come from the "Phone, Email &amp; Address" tab.</p>
      </>
    );
  };

  const renderCta = () => {
    const lang = langs.cta;
    const sec = page.cta;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setPageField('cta', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setPageField('cta', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          <Field label={`Call Button Prefix (${lang.toUpperCase()})`} hint="Phone number is appended automatically, e.g. 'Call +966 54 318 8882'."><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`call_btn_${lang}`]} onChange={e => setPageField('cta', `call_btn_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Email Button Prefix (${lang.toUpperCase()})`} hint="Email address is appended automatically."><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`email_btn_${lang}`]} onChange={e => setPageField('cta', `email_btn_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
      </>
    );
  };

  const renderDetails = () => {
    const lang = langs.details;
    return (
      <>
        <div style={grid2}>
          <Field label="Phone number (for tel: links)" hint="Format: +966543188882 — no spaces.">
            <input value={details.phone} onChange={e => setDetailsField('phone', e.target.value)} style={inp()} {...focusHandlers} />
          </Field>
          <Field label="Phone display text" hint="How it's shown to visitors, e.g. +966 54 318 8882">
            <input value={details.phone_display} onChange={e => setDetailsField('phone_display', e.target.value)} style={inp()} {...focusHandlers} />
          </Field>
        </div>
        <Field label="WhatsApp number" hint="Format: +966543188882">
          <input value={details.whatsapp} onChange={e => setDetailsField('whatsapp', e.target.value)} style={inp()} {...focusHandlers} />
        </Field>
        <div style={grid2}>
          <Field label="Primary email"><input type="email" value={details.email_admin} onChange={e => setDetailsField('email_admin', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label="Sales email"><input type="email" value={details.email_sales} onChange={e => setDetailsField('email_sales', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <Field label="Website URL"><input value={details.website} onChange={e => setDetailsField('website', e.target.value)} style={inp()} {...focusHandlers} /></Field>

        <div style={{ margin: '1.25rem 0 0.75rem' }}><LangTabs lang={lang} setLang={l => setLang('details', l)} /></div>
        <div style={grid2}>
          <Field label={`Address Line 1 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={details[`address_line1_${lang}`]} onChange={e => setDetailsField(`address_line1_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Address Line 2 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={details[`address_line2_${lang}`]} onChange={e => setDetailsField(`address_line2_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>

        <div style={grid2}>
          <Field label="Commercial Registry (CR) Number"><input value={details.cr_number} onChange={e => setDetailsField('cr_number', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label="National Address Code"><input value={details.national_address} onChange={e => setDetailsField('national_address', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
      </>
    );
  };

  const renderBranding = () => (
    <>
      <Field label="Site Logo" hint="Used in the header and footer. The footer version is automatically shown in white.">
        <div style={{ maxWidth: 320 }}>
          <ImageField value={branding.logo} onChange={v => setBranding(b => ({ ...b, logo: v }))} ratio="3 / 1" />
        </div>
      </Field>
      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>The browser-tab favicon and the social-share preview image are separate static files and aren't changed here.</p>
    </>
  );

  const RENDERERS = {
    hero: renderHero,
    form: renderForm,
    info: renderInfo,
    cta: renderCta,
    details: renderDetails,
    branding: renderBranding,
  };

  // "details" and "branding" aren't bilingual as a whole card (details has some
  // lang-tagged fields inline; branding has none) — only show the header LangTabs
  // for the page-content tabs.
  const showHeaderLangTabs = activeTab.table === 'vertical';

  return (
    <>
      <Helmet><title>Contact & Site Settings | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="Contact & Site Settings">
        {loading && (
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>Loading current settings…</div>
        )}

        <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: '1.25rem', alignItems: 'start' }}>
          <div className="home-admin-tabs" style={{
            display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: '1.25rem',
            background: 'white', borderRadius: 12, padding: '0.6rem', border: '1px solid #f1f5f9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            {TABS.map(({ key, label }) => (
              <button key={key} type="button" onClick={() => setActiveKey(key)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 0.75rem', borderRadius: 8,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem', fontWeight: 600,
                  background: activeKey === key ? '#1B5FAF' : 'transparent',
                  color: activeKey === key ? 'white' : '#475569',
                  transition: 'background 0.15s',
                }}>
                {label}
              </button>
            ))}
          </div>

          <SectionCard
            title={activeTab.label}
            lang={showHeaderLangTabs ? langs[activeKey] : null}
            setLang={(l) => setLang(activeKey, l)}
            onSave={handleSave}
            saving={!!savingMap[activeKey]}
            disabled={loading}
          >
            {RENDERERS[activeKey]()}
          </SectionCard>
        </div>
      </AdminLayout>
    </>
  );
}

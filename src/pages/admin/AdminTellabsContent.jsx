import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { fetchVerticalContent } from '../../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../../lib/verticalDefaults/tellabs';

const PAGE = 'tellabs';
const FOLDER = 'albloshi/tellabs';

const TABS = [
  { key: 'hero', label: 'Hero Banner' },
  { key: 'about', label: 'About & Philosophy' },
  { key: 'segments', label: 'Chemistry Segments' },
  { key: 'collaborators', label: 'Global Collaborators' },
  { key: 'trust', label: 'Testimonials & Clients' },
  { key: 'cta', label: 'Contact CTA' },
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

function ReadOnlyBadge({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '0.3rem 0.6rem', background: '#f1f5f9', color: '#64748b', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600 }}>
      {children}
    </span>
  );
}

const iconBtnStyle = (disabled, danger) => ({
  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: `1px solid ${danger ? '#fecaca' : '#e2e8f0'}`, borderRadius: 6, background: 'white',
  color: disabled ? '#cbd5e1' : (danger ? '#ef4444' : '#475569'),
  cursor: disabled ? 'not-allowed' : 'pointer', flexShrink: 0,
});

function ListItemControls({ index, length, onMoveUp, onMoveDown, onRemove }) {
  return (
    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
      <button type="button" disabled={index === 0} onClick={onMoveUp} title="Move up" style={iconBtnStyle(index === 0)}>
        <span className="material-icons" style={{ fontSize: '0.95rem' }}>arrow_upward</span>
      </button>
      <button type="button" disabled={index === length - 1} onClick={onMoveDown} title="Move down" style={iconBtnStyle(index === length - 1)}>
        <span className="material-icons" style={{ fontSize: '0.95rem' }}>arrow_downward</span>
      </button>
      <button type="button" onClick={onRemove} title="Delete" style={iconBtnStyle(false, true)}>
        <span className="material-icons" style={{ fontSize: '0.95rem' }}>delete_outline</span>
      </button>
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
            {saving ? 'Saving…' : 'Save Section'}
          </button>
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        {children}
      </div>
    </div>
  );
}

const cardBox = { border: '1px solid #f1f5f9', borderRadius: 10, padding: '1rem', marginBottom: '0.85rem', background: '#fbfcfe' };
const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' };
const addBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem', background: 'white',
  border: '1.5px dashed #cbd5e1', borderRadius: 8, color: '#1B5FAF', fontSize: '0.8rem', fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit', width: '100%', justifyContent: 'center', marginTop: '0.5rem',
};

export default function AdminTellabsContent() {
  const [sections, setSections] = useState(() => JSON.parse(JSON.stringify(DEFAULTS)));
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const [langs, setLangs] = useState(() => {
    const l = {};
    SECTIONS.forEach(s => { l[s] = 'en'; });
    return l;
  });
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    (async () => {
      const merged = await fetchVerticalContent(supabase, PAGE, DEFAULTS, SECTIONS);
      setSections(merged);
      setLoading(false);
    })();
  }, []);

  const setLang = (key, lang) => setLangs(l => ({ ...l, [key]: lang }));
  const updateSection = (key, updater) =>
    setSections(s => ({ ...s, [key]: typeof updater === 'function' ? updater(s[key]) : updater }));

  const setField = (key, field, value) =>
    updateSection(key, sec => ({ ...sec, [field]: value }));
  const setSubItemField = (key, arrayField, idx, field, value) =>
    updateSection(key, sec => {
      const arr = [...sec[arrayField]];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...sec, [arrayField]: arr };
    });

  // plain string list (Tellabs' Global Clients), no lang split
  const setStringItem = (key, arrayField, idx, value) =>
    updateSection(key, sec => {
      const arr = [...sec[arrayField]];
      arr[idx] = value;
      return { ...sec, [arrayField]: arr };
    });
  const addStringItem = (key, arrayField, value = '') =>
    updateSection(key, sec => ({ ...sec, [arrayField]: [...sec[arrayField], value] }));
  const removeStringItem = (key, arrayField, idx) =>
    updateSection(key, sec => ({ ...sec, [arrayField]: sec[arrayField].filter((_, i) => i !== idx) }));
  const moveStringItem = (key, arrayField, idx, dir) =>
    updateSection(key, sec => {
      const arr = [...sec[arrayField]];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return sec;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...sec, [arrayField]: arr };
    });

  const saveSection = async (key) => {
    if (!supabase) { toast.error('Supabase is not configured — cannot save.'); return; }
    setSavingMap(m => ({ ...m, [key]: true }));
    const { error } = await supabase
      .from('vertical_content')
      .upsert({ page: PAGE, section: key, data: sections[key], updated_at: new Date().toISOString() }, { onConflict: 'page,section' });
    setSavingMap(m => ({ ...m, [key]: false }));
    if (error) toast.error(`Save failed: ${error.message}. Have you run supabase/vertical_content.sql yet?`);
    else toast.success('Saved! Live on the page now.');
  };

  const renderHero = () => {
    const lang = langs.hero;
    const sec = sections.hero;
    return (
      <>
        <Field label="Background Image"><ImageField value={sec.image} onChange={v => setField('hero', 'image', v)} ratio="16 / 9" /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('hero', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('hero', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
      </>
    );
  };

  const renderAbout = () => {
    const lang = langs.about;
    const sec = sections.about;
    return (
      <>
        <Field label={`Section Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('about', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1rem 0 0.5rem' }}>Paragraph 1 (bold phrase in the middle)</p>
        <div style={grid2}>
          <Field label={`Before (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p1_before_${lang}`]} onChange={e => setField('about', `p1_before_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Bold phrase (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p1_strong_${lang}`]} onChange={e => setField('about', `p1_strong_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <Field label={`After (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p1_after_${lang}`]} onChange={e => setField('about', `p1_after_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1rem 0 0.5rem' }}>Paragraph 2 (bold phrase in the middle)</p>
        <div style={grid2}>
          <Field label={`Before (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p2_before_${lang}`]} onChange={e => setField('about', `p2_before_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Bold phrase (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p2_strong_${lang}`]} onChange={e => setField('about', `p2_strong_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <Field label={`After (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`p2_after_${lang}`]} onChange={e => setField('about', `p2_after_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.25rem 0 0.5rem' }}>Business Philosophy card</p>
        <Field label={`Card Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`philosophy_title_${lang}`]} onChange={e => setField('about', `philosophy_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.philosophy.map((it, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{it.icon}</span> icon: {it.icon} (fixed)</ReadOnlyBadge></div>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={it[`title_${lang}`]} onChange={e => setSubItemField('about', 'philosophy', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={it[`desc_${lang}`]} onChange={e => setSubItemField('about', 'philosophy', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderSegments = () => {
    const lang = langs.segments;
    const sec = sections.segments;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('segments', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('segments', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('segments', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.85rem' }}>Each segment links to /intelligent-chemicals — destination is fixed.</p>
        <div style={grid2}>
          {sec.items.map((it, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{it.icon}</span> icon: {it.icon} (fixed)</ReadOnlyBadge></div>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={it[`title_${lang}`]} onChange={e => setSubItemField('segments', 'items', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={it[`desc_${lang}`]} onChange={e => setSubItemField('segments', 'items', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderCollaborators = () => {
    const lang = langs.collaborators;
    const sec = sections.collaborators;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('collaborators', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('collaborators', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('collaborators', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.items.map((it, i) => (
            <div key={i} style={cardBox}>
              <Field label="Company Name (same in both languages)"><input value={it.name} onChange={e => setSubItemField('collaborators', 'items', i, 'name', e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Specialty (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={it[`specialty_${lang}`]} onChange={e => setSubItemField('collaborators', 'items', i, `specialty_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTrust = () => {
    const lang = langs.trust;
    const sec = sections.trust;
    return (
      <>
        <Field label={`"Testimonials" Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`customers_label_${lang}`]} onChange={e => setField('trust', `customers_label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Testimonials Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('trust', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1rem 0 0.5rem' }}>Quotes</p>
        {sec.quotes.map((q, i) => (
          <div key={i} style={cardBox}>
            <Field label={`Quote ${i + 1} (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={q[`quote_${lang}`]} onChange={e => setSubItemField('trust', 'quotes', i, `quote_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            <Field label={`Attributed to (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={q[`cite_${lang}`]} onChange={e => setSubItemField('trust', 'quotes', i, `cite_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
        ))}

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.25rem 0 0.5rem' }}>Global Client Footprint panel</p>
        <div style={grid2}>
          <Field label={`Panel Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`clients_label_${lang}`]} onChange={e => setField('trust', `clients_label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Panel Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`clients_title_${lang}`]} onChange={e => setField('trust', `clients_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <Field label={`Panel Footer Text (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`footer_text_${lang}`]} onChange={e => setField('trust', `footer_text_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>

        <Field label="Client Names" hint="Same name shown in both languages — plain company names, not translated.">
          {sec.clients.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <input value={name} onChange={e => setStringItem('trust', 'clients', i, e.target.value)} style={{ ...inp(), flex: 1 }} {...focusHandlers} />
              <ListItemControls index={i} length={sec.clients.length}
                onMoveUp={() => moveStringItem('trust', 'clients', i, -1)}
                onMoveDown={() => moveStringItem('trust', 'clients', i, 1)}
                onRemove={() => removeStringItem('trust', 'clients', i)} />
            </div>
          ))}
          <button type="button" style={addBtnStyle} onClick={() => addStringItem('trust', 'clients')}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Client
          </button>
        </Field>
      </>
    );
  };

  const renderCta = () => {
    const lang = langs.cta;
    const sec = sections.cta;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('cta', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('cta', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          <Field label={`Button 1 Text (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`btn1_${lang}`]} onChange={e => setField('cta', `btn1_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Button 2 Text (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`btn2_${lang}`]} onChange={e => setField('cta', `btn2_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
        <div style={grid2}>
          <Field label="Button 1 Link"><input value={sec.btn1_href} onChange={e => setField('cta', 'btn1_href', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label="Button 2 Link"><input value={sec.btn2_href} onChange={e => setField('cta', 'btn2_href', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
      </>
    );
  };

  const RENDERERS = {
    hero: renderHero,
    about: renderAbout,
    segments: renderSegments,
    collaborators: renderCollaborators,
    trust: renderTrust,
    cta: renderCta,
  };

  return (
    <>
      <Helmet><title>Tellabs Chemicals Content | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="TELLABS Chemicals Page">
        {loading && (
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>Loading current content…</div>
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
            title={TABS.find(s => s.key === activeKey)?.label}
            lang={langs[activeKey]}
            setLang={(l) => setLang(activeKey, l)}
            onSave={() => saveSection(activeKey)}
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

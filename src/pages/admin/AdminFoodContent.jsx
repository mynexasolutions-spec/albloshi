import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { fetchVerticalContent } from '../../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../../lib/verticalDefaults/food';

const PAGE = 'food';
const FOLDER = 'albloshi/food';

const TABS = [
  { key: 'hero', label: 'Hero Banner' },
  { key: 'stats', label: 'Stat Strip' },
  { key: 'products', label: 'Products' },
  { key: 'rice_products', label: 'Rice Products (sub-page)' },
  { key: 'oil_products', label: 'Oil Products (sub-page)' },
  { key: 'capabilities', label: 'Why Choose Us' },
  { key: 'strengths', label: 'Why Partner With Us' },
  { key: 'standards', label: 'Certifications' },
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

function ImageField({ value, onChange, ratio = '4 / 3' }) {
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

function SpecList({ specs, onChange }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...(specs ?? []), v]);
    setDraft('');
  };
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.5rem' }}>
        {(specs ?? []).map((s, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#1B5FAF', padding: '0.25rem 0.5rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600 }}>
            {s}
            <button type="button" onClick={() => onChange(specs.filter((_, j) => j !== i))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1B5FAF', display: 'flex', padding: 0 }}>
              <span className="material-icons" style={{ fontSize: '0.9rem' }}>close</span>
            </button>
          </span>
        ))}
        {(specs ?? []).length === 0 && <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>No specs yet.</span>}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Add a spec line, then Enter" style={{ ...inp(), flex: 1 }} {...focusHandlers} />
        <button type="button" onClick={add}
          style={{ padding: '0 0.9rem', background: '#f1f5f9', color: '#1B5FAF', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          Add
        </button>
      </div>
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

export default function AdminFoodContent() {
  const [sections, setSections] = useState(() => JSON.parse(JSON.stringify(DEFAULTS)));
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const [langs, setLangs] = useState(() => {
    const l = {};
    TABS.forEach(({ key }) => { l[key] = 'en'; });
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
  const addSubItem = (key, arrayField, item) =>
    updateSection(key, sec => ({ ...sec, [arrayField]: [...sec[arrayField], item] }));
  const removeSubItem = (key, arrayField, idx) =>
    updateSection(key, sec => ({ ...sec, [arrayField]: sec[arrayField].filter((_, i) => i !== idx) }));
  const moveSubItem = (key, arrayField, idx, dir) =>
    updateSection(key, sec => {
      const arr = [...sec[arrayField]];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return sec;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...sec, [arrayField]: arr };
    });

  const setListItemField = (key, idx, field, value) =>
    updateSection(key, arr => {
      const next = [...arr];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  const addListItem = (key, item) => updateSection(key, arr => [...arr, item]);
  const removeListItem = (key, idx) => updateSection(key, arr => arr.filter((_, i) => i !== idx));
  const moveListItem = (key, idx, dir) =>
    updateSection(key, arr => {
      const next = [...arr];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return arr;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
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
        <Field label={`Title Line 1 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_l1_${lang}`]} onChange={e => setField('hero', `title_l1_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title Line 2 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_l2_${lang}`]} onChange={e => setField('hero', `title_l2_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('hero', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
      </>
    );
  };

  const renderStats = () => {
    const lang = langs.stats;
    return (
      <div style={grid2}>
        {sections.stats.map((s, i) => (
          <div key={i} style={cardBox}>
            <Field label="Number / Value"><input value={s.num} onChange={e => setListItemField('stats', i, 'num', e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={s[`label_${lang}`]} onChange={e => setListItemField('stats', i, `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
        ))}
      </div>
    );
  };

  const renderProducts = () => {
    const lang = langs.products;
    return (
      <>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 1rem' }}>{sections.products.length} products.</p>
        {sections.products.map((p, i) => (
          <div key={p.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Product {i + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!p.isGeneralRice} onChange={e => setListItemField('products', i, 'isGeneralRice', e.target.checked)} />
                  Links to /rice-products (no Read More popup)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: '#475569', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!p.comingSoon} onChange={e => setListItemField('products', i, 'comingSoon', e.target.checked)} />
                  Coming Soon
                </label>
                <ListItemControls index={i} length={sections.products.length}
                  onMoveUp={() => moveListItem('products', i, -1)}
                  onMoveDown={() => moveListItem('products', i, 1)}
                  onRemove={() => removeListItem('products', i)} />
              </div>
            </div>
            <div style={grid2}>
              <div>
                <Field label="Image (square)"><ImageField value={p.image} onChange={v => setListItemField('products', i, 'image', v)} ratio="1 / 1" /></Field>
              </div>
              <div>
                <Field label={`Category Tag (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={p[`tag_${lang}`]} onChange={e => setListItemField('products', i, `tag_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
                <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={p[`title_${lang}`]} onChange={e => setListItemField('products', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
                <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={p[`desc_${lang}`]} onChange={e => setListItemField('products', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
              </div>
            </div>
            {!p.isGeneralRice && (
              <Field label={`Specifications (${lang.toUpperCase()})`}>
                <SpecList specs={p[`specs_${lang}`]} onChange={v => setListItemField('products', i, `specs_${lang}`, v)} />
              </Field>
            )}
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addListItem('products', {
          id: `product-${Date.now()}`, image: '', tag_en: '', tag_ar: '', title_en: '', title_ar: '',
          desc_en: '', desc_ar: '', specs_en: [], specs_ar: [], isGeneralRice: false, comingSoon: false,
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Product
        </button>
      </>
    );
  };

  // Rice/Oil products: same product-card shape as the main Products tab, but
  // nested under { title, desc, items: [...] } and edited/saved as their own
  // section — they power the separate /rice-products and /oil-products pages.
  const renderProductGroup = (key, pageHint) => {
    const lang = langs[key];
    const sec = sections[key];
    return (
      <>
        <Field label={`Sub-page Heading (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField(key, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Sub-page Intro Text (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField(key, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 1rem' }}>{sec.items.length} products — shown on {pageHint}.</p>
        {sec.items.map((p, i) => (
          <div key={p.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Product {i + 1}</span>
              <ListItemControls index={i} length={sec.items.length}
                onMoveUp={() => moveSubItem(key, 'items', i, -1)}
                onMoveDown={() => moveSubItem(key, 'items', i, 1)}
                onRemove={() => removeSubItem(key, 'items', i)} />
            </div>
            <div style={grid2}>
              <div>
                <Field label="Image (square)"><ImageField value={p.image} onChange={v => setSubItemField(key, 'items', i, 'image', v)} ratio="1 / 1" /></Field>
              </div>
              <div>
                <Field label={`Category Tag (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={p[`tag_${lang}`]} onChange={e => setSubItemField(key, 'items', i, `tag_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
                <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={p[`title_${lang}`]} onChange={e => setSubItemField(key, 'items', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
                <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={p[`desc_${lang}`]} onChange={e => setSubItemField(key, 'items', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
              </div>
            </div>
            <Field label={`Specifications (${lang.toUpperCase()})`}>
              <SpecList specs={p[`specs_${lang}`]} onChange={v => setSubItemField(key, 'items', i, `specs_${lang}`, v)} />
            </Field>
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addSubItem(key, 'items', {
          id: `product-${Date.now()}`, image: '', tag_en: '', tag_ar: '', title_en: '', title_ar: '',
          desc_en: '', desc_ar: '', specs_en: [], specs_ar: [],
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Product
        </button>
      </>
    );
  };

  const renderIconItemsSection = (key, itemsField = 'items') => {
    const lang = langs[key];
    const sec = sections[key];
    return (
      <>
        {'label_en' in sec && <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField(key, `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>}
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField(key, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField(key, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec[itemsField].map((it, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{it.icon}</span> icon: {it.icon} (fixed)</ReadOnlyBadge></div>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={it[`title_${lang}`]} onChange={e => setSubItemField(key, itemsField, i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={it[`desc_${lang}`]} onChange={e => setSubItemField(key, itemsField, i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderStandards = () => {
    const lang = langs.standards;
    const sec = sections.standards;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('standards', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.85rem' }}>These show as small badges (e.g. "SFDA Approved"). Not split by EN/AR tab — edit both languages for each badge below.</p>
        {sec.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #f1f5f9', borderRadius: 8, padding: '0.5rem 0.75rem', marginBottom: '0.5rem', background: '#fbfcfe', flexWrap: 'wrap' }}>
            <input value={it.en} onChange={e => setSubItemField('standards', 'items', i, 'en', e.target.value)} placeholder="English"
              style={{ ...inp(), flex: 1, minWidth: 140 }} {...focusHandlers} />
            <input dir="rtl" value={it.ar} onChange={e => setSubItemField('standards', 'items', i, 'ar', e.target.value)} placeholder="Arabic"
              style={{ ...inp(), flex: 1, minWidth: 140 }} {...focusHandlers} />
            <ListItemControls index={i} length={sec.items.length}
              onMoveUp={() => moveSubItem('standards', 'items', i, -1)}
              onMoveDown={() => moveSubItem('standards', 'items', i, 1)}
              onRemove={() => removeSubItem('standards', 'items', i)} />
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addSubItem('standards', 'items', { en: '', ar: '' })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Certification Badge
        </button>
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
          <Field label="Button 1 Link" hint="e.g. /contact or https://wa.me/966..."><input value={sec.btn1_href} onChange={e => setField('cta', 'btn1_href', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label="Button 2 Link" hint="e.g. /#segments or /rice-products"><input value={sec.btn2_href} onChange={e => setField('cta', 'btn2_href', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
      </>
    );
  };

  const RENDERERS = {
    hero: renderHero,
    stats: renderStats,
    products: renderProducts,
    rice_products: () => renderProductGroup('rice_products', '/rice-products'),
    oil_products: () => renderProductGroup('oil_products', '/oil-products'),
    capabilities: () => renderIconItemsSection('capabilities'),
    strengths: () => renderIconItemsSection('strengths'),
    standards: renderStandards,
    cta: renderCta,
  };

  return (
    <>
      <Helmet><title>Food Services Content | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="Food Services">
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

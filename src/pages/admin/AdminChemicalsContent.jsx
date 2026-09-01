import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { fetchVerticalContent } from '../../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../../lib/verticalDefaults/chemicals';

const PAGE = 'chemicals';
const FOLDER = 'albloshi/chemicals';

const TABS = [
  { key: 'hero', label: 'Hero Banner' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'trust', label: 'Why Industries Trust Us' },
  { key: 'commitment', label: 'Commitment Banner' },
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

// Editable chip-list of plain-text lines (used for a sublist's items).
function ChipList({ items, onChange }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...(items ?? []), v]);
    setDraft('');
  };
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.5rem' }}>
        {(items ?? []).map((s, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#eff6ff', color: '#1B5FAF', padding: '0.25rem 0.5rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600 }}>
            {s}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1B5FAF', display: 'flex', padding: 0 }}>
              <span className="material-icons" style={{ fontSize: '0.9rem' }}>close</span>
            </button>
          </span>
        ))}
        {(items ?? []).length === 0 && <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>No items yet.</span>}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Add an item, then Enter" style={{ ...inp(), flex: 1 }} {...focusHandlers} />
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

export default function AdminChemicalsContent() {
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
        <Field label={`Solutions Section Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('hero', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Solutions Section Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('hero', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
      </>
    );
  };

  const renderSolutions = () => {
    const lang = langs.solutions;
    const listsField = `lists_${lang}`;
    return (
      <>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 1rem' }}>{sections.solutions.length} solutions. Each has its own image, description, and up to a few bullet-point lists (e.g. "Applications", "Product Range").</p>
        {sections.solutions.map((sol, i) => (
          <div key={sol.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Solution {i + 1}</span>
              <ListItemControls index={i} length={sections.solutions.length}
                onMoveUp={() => moveListItem('solutions', i, -1)}
                onMoveDown={() => moveListItem('solutions', i, 1)}
                onRemove={() => removeListItem('solutions', i)} />
            </div>
            <div style={grid2}>
              <div>
                <Field label="Image (square)"><ImageField value={sol.image} onChange={v => setListItemField('solutions', i, 'image', v)} ratio="1 / 1" /></Field>
              </div>
              <div>
                <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sol[`title_${lang}`]} onChange={e => setListItemField('solutions', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
                <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={sol[`desc_${lang}`]} onChange={e => setListItemField('solutions', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
              </div>
            </div>

            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.75rem 0 0.5rem' }}>Bullet lists ({lang.toUpperCase()})</p>
            {(sol[listsField] ?? []).map((lst, li) => (
              <div key={li} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.75rem', marginBottom: '0.6rem', background: 'white' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={lst.heading} placeholder="List heading, e.g. Applications"
                    onChange={e => {
                      const next = [...sol[listsField]];
                      next[li] = { ...next[li], heading: e.target.value };
                      setListItemField('solutions', i, listsField, next);
                    }}
                    style={{ ...inp(), flex: 1, fontWeight: 700 }} {...focusHandlers} />
                  <button type="button" onClick={() => {
                    const next = sol[listsField].filter((_, j) => j !== li);
                    setListItemField('solutions', i, listsField, next);
                  }} title="Remove this list" style={iconBtnStyle(false, true)}>
                    <span className="material-icons" style={{ fontSize: '0.95rem' }}>delete_outline</span>
                  </button>
                </div>
                <ChipList items={lst.items} onChange={v => {
                  const next = [...sol[listsField]];
                  next[li] = { ...next[li], items: v };
                  setListItemField('solutions', i, listsField, next);
                }} />
              </div>
            ))}
            <button type="button" style={{ ...addBtnStyle, marginTop: 0 }} onClick={() => {
              setListItemField('solutions', i, listsField, [...(sol[listsField] ?? []), { heading: '', items: [] }]);
            }}>
              <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Bullet List
            </button>
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addListItem('solutions', {
          id: `solution-${Date.now()}`, image: '', title_en: '', title_ar: '', desc_en: '', desc_ar: '',
          lists_en: [], lists_ar: [],
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Solution
        </button>
      </>
    );
  };

  const renderTrust = () => {
    const lang = langs.trust;
    const sec = sections.trust;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('trust', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('trust', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.items.map((it, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{it.icon}</span> icon: {it.icon} (fixed)</ReadOnlyBadge></div>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={it[`title_${lang}`]} onChange={e => setSubItemField('trust', 'items', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={it[`desc_${lang}`]} onChange={e => setSubItemField('trust', 'items', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderCommitment = () => {
    const lang = langs.commitment;
    const sec = sections.commitment;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('commitment', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={sec[`desc_${lang}`]} onChange={e => setField('commitment', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.85rem' }}>These show as small badges under the banner text. Edit both languages for each badge below.</p>
        {sec.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #f1f5f9', borderRadius: 8, padding: '0.5rem 0.75rem', marginBottom: '0.5rem', background: '#fbfcfe', flexWrap: 'wrap' }}>
            <input value={it.en} onChange={e => setSubItemField('commitment', 'items', i, 'en', e.target.value)} placeholder="English"
              style={{ ...inp(), flex: 1, minWidth: 140 }} {...focusHandlers} />
            <input dir="rtl" value={it.ar} onChange={e => setSubItemField('commitment', 'items', i, 'ar', e.target.value)} placeholder="Arabic"
              style={{ ...inp(), flex: 1, minWidth: 140 }} {...focusHandlers} />
            <ListItemControls index={i} length={sec.items.length}
              onMoveUp={() => moveSubItem('commitment', 'items', i, -1)}
              onMoveDown={() => moveSubItem('commitment', 'items', i, 1)}
              onRemove={() => removeSubItem('commitment', 'items', i)} />
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addSubItem('commitment', 'items', { en: '', ar: '' })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Badge
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
          <Field label="Button 2 Link" hint="e.g. /#segments or /intelligent-chemicals"><input value={sec.btn2_href} onChange={e => setField('cta', 'btn2_href', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </div>
      </>
    );
  };

  const RENDERERS = {
    hero: renderHero,
    solutions: renderSolutions,
    trust: renderTrust,
    commitment: renderCommitment,
    cta: renderCta,
  };

  return (
    <>
      <Helmet><title>Intelligent Chemicals Content | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="Intelligent Chemicals">
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

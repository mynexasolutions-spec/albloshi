import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';
import { DEFAULTS, SECTION_META, mergeSectionData } from '../../lib/homeContentDefaults';

const FOLDER = 'albloshi/home';

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

function ImageField({ value, onChange, ratio = '4 / 3', compact = false }) {
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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
      {value ? compact ? (
        <div onClick={() => !uploading && fileInputRef.current?.click()} title="Click to replace image"
          style={{ width: '100%', aspectRatio: ratio, borderRadius: 8, border: '1px solid #f1f5f9', background: '#f8fafc', overflow: 'hidden', cursor: 'pointer' }}>
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      ) : (
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
          onDrop={handleDrop}
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

export default function AdminHomeContent() {
  const [sections, setSections] = useState(() => JSON.parse(JSON.stringify(DEFAULTS)));
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(SECTION_META[0].key);
  const [langs, setLangs] = useState(() => {
    const l = {};
    SECTION_META.forEach(s => { l[s.key] = 'en'; });
    return l;
  });
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    (async () => {
      if (!supabase) { setLoading(false); return; }
      try {
        const { data, error } = await supabase.from('home_content').select('*');
        if (!error && data) {
          setSections(prev => {
            const next = { ...prev };
            for (const row of data) {
              if (row?.section && DEFAULTS[row.section] !== undefined) {
                next[row.section] = mergeSectionData(DEFAULTS[row.section], row.data);
              }
            }
            return next;
          });
        }
      } catch {
        // table probably doesn't exist yet — keep defaults, editor still usable
      }
      setLoading(false);
    })();
  }, []);

  const setLang = (key, lang) => setLangs(l => ({ ...l, [key]: lang }));

  // --- Generic mutators -----------------------------------------------
  const updateSection = (key, updater) =>
    setSections(s => ({ ...s, [key]: typeof updater === 'function' ? updater(s[key]) : updater }));

  // top-level field on an object-type section, e.g. sections.who_we_are.title_en
  const setField = (key, field, value) =>
    updateSection(key, sec => ({ ...sec, [field]: value }));

  // field on an item inside a nested array field of an object-type section, e.g. sections.bento.cards[i].title_en
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

  // field on an item inside a rawList section (the section IS the array), e.g. sections.hero_slides[i].title_en
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

  // Saves one or more sections at once — the "Trusted By & Clients" tab edits two
  // underlying sections (`trusted` + `clients`) but is saved together as one click.
  const saveSections = async (keys) => {
    if (!supabase) { toast.error('Supabase is not configured — cannot save.'); return; }
    const saveKey = keys.join('+');
    setSavingMap(m => ({ ...m, [saveKey]: true }));
    const rows = keys.map(key => ({ section: key, data: sections[key], updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('home_content').upsert(rows, { onConflict: 'section' });
    setSavingMap(m => ({ ...m, [saveKey]: false }));
    if (error) toast.error(`Save failed: ${error.message}. Have you run supabase/home_content.sql yet?`);
    else toast.success('Saved! Live on the homepage now.');
  };

  // --- Section body renderers ------------------------------------------

  const renderHeroSlides = () => {
    const lang = langs.hero_slides;
    return (
      <>
        {sections.hero_slides.map((slide, i) => (
          <div key={slide.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Slide {i + 1}</span>
              <ListItemControls index={i} length={sections.hero_slides.length}
                onMoveUp={() => moveListItem('hero_slides', i, -1)}
                onMoveDown={() => moveListItem('hero_slides', i, 1)}
                onRemove={() => removeListItem('hero_slides', i)} />
            </div>
            <div style={grid2}>
              <div>
                <Field label="Background Image" hint="Shown as the full-width hero banner (16:9 preview)."><ImageField value={slide.image} onChange={v => setListItemField('hero_slides', i, 'image', v)} ratio="16 / 9" /></Field>
              </div>
              <div>
                <Field label={`Subtitle (${lang.toUpperCase()})`}>
                  <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={slide[`subtitle_${lang}`]} onChange={e => setListItemField('hero_slides', i, `subtitle_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
                </Field>
                <Field label={`Title (${lang.toUpperCase()})`}>
                  <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={slide[`title_${lang}`]} onChange={e => setListItemField('hero_slides', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
                </Field>
                <Field label={`Button Text (${lang.toUpperCase()})`}>
                  <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={slide[`cta_${lang}`]} onChange={e => setListItemField('hero_slides', i, `cta_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
                </Field>
                <Field label="Link (button destination)">
                  <input value={slide.href} onChange={e => setListItemField('hero_slides', i, 'href', e.target.value)} style={inp()} {...focusHandlers} placeholder="/intelligent-chemicals" />
                </Field>
              </div>
            </div>
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addListItem('hero_slides', {
          id: Date.now(), image: '', subtitle_en: '', subtitle_ar: '', title_en: '', title_ar: '', cta_en: '', cta_ar: '', href: '/',
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Slide
        </button>
      </>
    );
  };

  const renderWhoWeAre = () => {
    const lang = langs.who_we_are;
    const sec = sections.who_we_are;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('who_we_are', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('who_we_are', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('who_we_are', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical', lineHeight: 1.6 })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.features.map((f, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{f.icon}</span> icon: {f.icon} (fixed)</ReadOnlyBadge></div>
              <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={f[`label_${lang}`]} onChange={e => setSubItemField('who_we_are', 'features', i, `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={f[`desc_${lang}`]} onChange={e => setSubItemField('who_we_are', 'features', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTrusted = () => {
    const lang = langs.trusted;
    const sec = sections.trusted;
    return (
      <>
        <Field label={`Title Line 1 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_l1_${lang}`]} onChange={e => setField('trusted', `title_l1_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title Line 2 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_l2_${lang}`]} onChange={e => setField('trusted', `title_l2_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`} hint='Country names (Saudi Arabia, India, Egypt, GCC / equivalents) are auto-bolded on the homepage — no markup needed here.'>
          <textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={sec[`desc_${lang}`]} onChange={e => setField('trusted', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical', lineHeight: 1.6 })} {...focusHandlers} />
        </Field>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>The scrolling client-logo marquee below this text is managed in the separate "Client Logos" section.</p>
      </>
    );
  };

  const renderBento = () => {
    const lang = langs.bento;
    const sec = sections.bento;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('bento', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`} hint="Use a line break to split the heading into two lines, e.g. Smart Chemicals.\nReal Impact.">
          <textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`title_${lang}`]} onChange={e => setField('bento', `title_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} />
        </Field>
        <Field label={`Subtitle (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`subtitle_${lang}`]} onChange={e => setField('bento', `subtitle_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.cards.map((card, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge><span className="material-icons" style={{ fontSize: '0.9rem' }}>{card.icon}</span> icon: {card.icon} (fixed)</ReadOnlyBadge></div>
              <Field label="Background Image"><ImageField value={card.image} onChange={v => setSubItemField('bento', 'cards', i, 'image', v)} ratio="4 / 3" /></Field>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={card[`title_${lang}`]} onChange={e => setSubItemField('bento', 'cards', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={card[`desc_${lang}`]} onChange={e => setSubItemField('bento', 'cards', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
        <Field label={`Trust Banner Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`trust_title_${lang}`]} onChange={e => setField('bento', `trust_title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Trust Banner Subtitle (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`trust_subtitle_${lang}`]} onChange={e => setField('bento', `trust_subtitle_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`"Our Strategic Partner" Label (${lang.toUpperCase()})`} hint='The TELLABS wordmark next to it is not editable here.'>
          <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`partner_label_${lang}`]} onChange={e => setField('bento', `partner_label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
        </Field>
      </>
    );
  };

  const renderVerticals = () => {
    const lang = langs.verticals;
    const sec = sections.verticals;
    return (
      <>
        <Field label={`Label (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`label_${lang}`]} onChange={e => setField('verticals', `label_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('verticals', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('verticals', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.cards.map((card, i) => (
            <div key={i} style={cardBox}>
              <Field label="Background Image"><ImageField value={card.image} onChange={v => setSubItemField('verticals', 'cards', i, 'image', v)} ratio="3 / 4" /></Field>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={card[`title_${lang}`]} onChange={e => setSubItemField('verticals', 'cards', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={card[`desc_${lang}`]} onChange={e => setSubItemField('verticals', 'cards', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
              <Field label={`Link Text (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={card[`link_${lang}`]} onChange={e => setSubItemField('verticals', 'cards', i, `link_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label="Link Destination"><input value={card.href} onChange={e => setSubItemField('verticals', 'cards', i, 'href', e.target.value)} style={inp()} {...focusHandlers} placeholder="/intelligent-chemicals" /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderWhyChooseUs = () => {
    const lang = langs.why_choose_us;
    const sec = sections.why_choose_us;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('why_choose_us', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('why_choose_us', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <div style={grid2}>
          {sec.reasons.map((r, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge>{r.large ? 'Large card' : 'Standard card'} (fixed layout)</ReadOnlyBadge></div>
              <Field label="Image"><ImageField value={r.image} onChange={v => setSubItemField('why_choose_us', 'reasons', i, 'image', v)} ratio={r.large ? '21 / 9' : '3 / 2'} /></Field>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={r[`title_${lang}`]} onChange={e => setSubItemField('why_choose_us', 'reasons', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={r[`desc_${lang}`]} onChange={e => setSubItemField('why_choose_us', 'reasons', i, `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderNetwork = () => {
    const lang = langs.network;
    const sec = sections.network;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('network', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('network', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        <Field label="Map Background Image"><ImageField value={sec.map_image} onChange={v => setField('network', 'map_image', v)} ratio="11 / 4" /></Field>
        <div style={grid2}>
          {sec.cards.map((c, i) => (
            <div key={i} style={cardBox}>
              <div style={{ marginBottom: '0.6rem' }}><ReadOnlyBadge>position: {c.position_class} (fixed, CSS-controlled)</ReadOnlyBadge></div>
              <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={c[`title_${lang}`]} onChange={e => setSubItemField('network', 'cards', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              <Field label={`Subtitle (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={c[`sub_${lang}`]} onChange={e => setSubItemField('network', 'cards', i, `sub_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTestimonials = () => {
    const lang = langs.testimonials;
    const sec = sections.testimonials;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('testimonials', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('testimonials', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        {sec.reviews.map((r, i) => (
          <div key={r.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Review {i + 1}</span>
              <ListItemControls index={i} length={sec.reviews.length}
                onMoveUp={() => moveSubItem('testimonials', 'reviews', i, -1)}
                onMoveDown={() => moveSubItem('testimonials', 'reviews', i, 1)}
                onRemove={() => removeSubItem('testimonials', 'reviews', i)} />
            </div>
            <div style={grid2}>
              <div>
                <Field label="Reviewer Photo"><ImageField value={r.image} onChange={v => setSubItemField('testimonials', 'reviews', i, 'image', v)} ratio="1 / 1" /></Field>
                <Field label="Reviewer Name"><input value={r.name} onChange={e => setSubItemField('testimonials', 'reviews', i, 'name', e.target.value)} style={inp()} {...focusHandlers} /></Field>
              </div>
              <div>
                <Field label={`Quote (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={r[`quote_${lang}`]} onChange={e => setSubItemField('testimonials', 'reviews', i, `quote_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
                <Field label={`Reviewer Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={r[`title_${lang}`]} onChange={e => setSubItemField('testimonials', 'reviews', i, `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
              </div>
            </div>
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addSubItem('testimonials', 'reviews', {
          id: Date.now(), quote_en: '', quote_ar: '', name: '', title_en: '', title_ar: '', image: '',
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Review
        </button>
      </>
    );
  };

  const renderFaq = () => {
    const lang = langs.faq;
    const sec = sections.faq;
    return (
      <>
        <Field label={`Title (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={sec[`title_${lang}`]} onChange={e => setField('faq', `title_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
        <Field label={`Description (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={sec[`desc_${lang}`]} onChange={e => setField('faq', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
        {sec.items.map((item, i) => (
          <div key={item.id ?? i} style={cardBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Question {i + 1}</span>
              <ListItemControls index={i} length={sec.items.length}
                onMoveUp={() => moveSubItem('faq', 'items', i, -1)}
                onMoveDown={() => moveSubItem('faq', 'items', i, 1)}
                onRemove={() => removeSubItem('faq', 'items', i)} />
            </div>
            <Field label={`Question (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={item[`q_${lang}`]} onChange={e => setSubItemField('faq', 'items', i, `q_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label={`Answer (${lang.toUpperCase()})`}><textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={item[`a_${lang}`]} onChange={e => setSubItemField('faq', 'items', i, `a_${lang}`, e.target.value)} style={inp({ resize: 'vertical' })} {...focusHandlers} /></Field>
          </div>
        ))}
        <button type="button" style={addBtnStyle} onClick={() => addSubItem('faq', 'items', {
          id: Date.now(), q_en: '', q_ar: '', a_en: '', a_ar: '',
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Question
        </button>
      </>
    );
  };

  const renderClients = () => {
    const lang = langs.clients;
    const trusted = sections.trusted;
    return (
      <>
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem' }}>Heading above the logos</p>
          <Field label={`Title Line 1 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={trusted[`title_l1_${lang}`]} onChange={e => setField('trusted', `title_l1_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Title Line 2 (${lang.toUpperCase()})`}><input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={trusted[`title_l2_${lang}`]} onChange={e => setField('trusted', `title_l2_${lang}`, e.target.value)} style={inp()} {...focusHandlers} /></Field>
          <Field label={`Description (${lang.toUpperCase()})`} hint='Country names (Saudi Arabia, India, Egypt, GCC / equivalents) are auto-bolded on the homepage — no markup needed here.'>
            <textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={3} value={trusted[`desc_${lang}`]} onChange={e => setField('trusted', `desc_${lang}`, e.target.value)} style={inp({ resize: 'vertical', lineHeight: 1.6 })} {...focusHandlers} />
          </Field>
        </div>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem' }}>Client logos</p>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.85rem' }}>
          These logos scroll in the marquee below the heading above. Name/country are for internal reference & alt text only (not bilingual) — type any country, it's free text.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sections.clients.map((c, i) => (
            <div key={c.id ?? i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', border: '1px solid #f1f5f9', borderRadius: 8, padding: '0.5rem 0.75rem', background: '#fbfcfe' }}>
              <div style={{ width: 96, flexShrink: 0 }}><ImageField value={c.image} onChange={v => setListItemField('clients', i, 'image', v)} ratio="16 / 9" compact /></div>
              <input value={c.name} onChange={e => setListItemField('clients', i, 'name', e.target.value)} placeholder="Client name"
                style={{ ...inp(), flex: 1, minWidth: 140 }} {...focusHandlers} />
              <input value={c.country} onChange={e => setListItemField('clients', i, 'country', e.target.value)} placeholder="Country"
                style={{ ...inp({ width: 130 }) }} {...focusHandlers} />
              <ListItemControls index={i} length={sections.clients.length}
                onMoveUp={() => moveListItem('clients', i, -1)}
                onMoveDown={() => moveListItem('clients', i, 1)}
                onRemove={() => removeListItem('clients', i)} />
            </div>
          ))}
        </div>
        <button type="button" style={addBtnStyle} onClick={() => addListItem('clients', {
          id: Date.now(), image: '', name: '', country: '',
        })}>
          <span className="material-icons" style={{ fontSize: '1rem' }}>add</span> Add Client Logo
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

  // UI-only tab list: "Trusted By" isn't its own tab — its heading text is edited
  // together with the client logos in one tab, since they're one visual section
  // on the homepage. `SECTION_META` (the underlying data sections) is unchanged.
  const TABS = SECTION_META
    .filter(s => s.key !== 'trusted')
    .map(s => s.key === 'clients' ? { ...s, label: 'Trusted By & Client Logos' } : s);

  const saveKeysFor = (key) => key === 'clients' ? ['trusted', 'clients'] : [key];

  const RENDERERS = {
    hero_slides: renderHeroSlides,
    who_we_are: renderWhoWeAre,
    trusted: renderTrusted,
    bento: renderBento,
    verticals: renderVerticals,
    why_choose_us: renderWhyChooseUs,
    network: renderNetwork,
    testimonials: renderTestimonials,
    faq: renderFaq,
    clients: renderClients,
    cta: renderCta,
  };

  return (
    <>
      <Helmet><title>Home Page Content | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="Home Page Content">
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
            onSave={() => saveSections(saveKeysFor(activeKey))}
            saving={!!savingMap[saveKeysFor(activeKey).join('+')]}
            disabled={loading}
          >
            {RENDERERS[activeKey]()}
          </SectionCard>
        </div>
      </AdminLayout>
    </>
  );
}

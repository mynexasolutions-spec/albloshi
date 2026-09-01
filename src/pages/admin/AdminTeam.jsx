import { useEffect, useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/cloudinary';

const CATEGORIES = [
  { value: 'chemical',   label: 'Chemical Division' },
  { value: 'industrial', label: 'Industrial Supply' },
  { value: 'food',       label: 'Food Division' },
  { value: 'manpower',   label: 'Manpower Supply' },
];

const EMPTY_MEMBER = {
  id: null, _key: null,
  name_en: '', name_ar: '', role_en: '', role_ar: '', bio_en: '', bio_ar: '',
  categories: ['chemical'], image: '', sort_order: 0,
};

const inp = (extra = {}) => ({
  width: '100%', padding: '0.6rem 0.85rem', border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', color: '#0f172a',
  background: 'white', boxSizing: 'border-box', transition: 'border-color 0.15s', ...extra,
});
const focusHandlers = {
  onFocus: e => { e.target.style.borderColor = '#1B5FAF'; },
  onBlur: e => { e.target.style.borderColor = '#e2e8f0'; },
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      {label && <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#374151', marginBottom: '0.3rem' }}>{label}</label>}
      {children}
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

function ImageField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('Image must be under 10 MB.'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, 'albloshi/team');
      onChange(url);
      toast.success('Photo uploaded!');
    } catch (err) {
      toast.error(err.message);
    }
    setUploading(false);
  };

  const boxStyle = { width: 84, height: 84, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', position: 'relative' };

  return (
    <div>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
      {value ? (
        <div onClick={() => !uploading && fileInputRef.current?.click()} title="Click to replace photo"
          style={{ ...boxStyle, border: '1px solid #f1f5f9', background: '#f8fafc', cursor: 'pointer' }}>
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            ...boxStyle, border: `2px dashed ${dragOver ? '#1B5FAF' : '#e2e8f0'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: uploading ? 'wait' : 'pointer', background: dragOver ? '#eff6ff' : '#f8fafc',
          }}
        >
          {uploading
            ? <div style={{ width: 18, height: 18, border: '3px solid #dbeafe', borderTopColor: '#1B5FAF', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            : <span className="material-icons" style={{ fontSize: '1.3rem', color: dragOver ? '#1B5FAF' : '#cbd5e1' }}>person</span>}
        </div>
      )}
    </div>
  );
}

export default function AdminTeam() {
  const [members,  setMembers]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [lang,     setLang]     = useState('en');
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('all');
  const [savingKey, setSavingKey]   = useState(null);
  const [deletingKey, setDeletingKey] = useState(null);

  const fetchMembers = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
    if (!error && data) setMembers(data.map(m => ({ ...m, _key: m.id })));
    setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const updateField = (key, field, value) =>
    setMembers(prev => prev.map(m => m._key === key ? { ...m, [field]: value } : m));

  const toggleCategory = (key, value) =>
    setMembers(prev => prev.map(m => {
      if (m._key !== key) return m;
      const has = m.categories?.includes(value);
      const categories = has ? m.categories.filter(c => c !== value) : [...(m.categories ?? []), value];
      return { ...m, categories };
    }));

  const addMember = () => {
    const key = `new-${Date.now()}`;
    const nextSort = members.length ? Math.max(...members.map(m => m.sort_order ?? 0)) + 1 : 0;
    setMembers(prev => [{ ...EMPTY_MEMBER, _key: key, sort_order: nextSort }, ...prev]);
  };

  const saveMember = async (member) => {
    if (!supabase) { toast.error('Supabase is not configured — cannot save.'); return; }
    if (!member.name_en.trim()) { toast.error('Name (English) is required.'); return; }
    if (!member.categories?.length) { toast.error('Select at least one division.'); return; }
    setSavingKey(member._key);
    const payload = {
      name_en: member.name_en, name_ar: member.name_ar,
      role_en: member.role_en, role_ar: member.role_ar,
      bio_en: member.bio_en, bio_ar: member.bio_ar,
      categories: member.categories, image: member.image, sort_order: member.sort_order,
    };
    if (member.id) {
      const { error } = await supabase.from('team_members').update(payload).eq('id', member.id);
      setSavingKey(null);
      if (error) { toast.error(`Save failed: ${error.message}`); return; }
      toast.success('Saved!');
    } else {
      const { data, error } = await supabase.from('team_members').insert([payload]).select().single();
      setSavingKey(null);
      if (error) { toast.error(`Save failed: ${error.message}. Have you run supabase/team_members.sql yet?`); return; }
      setMembers(prev => prev.map(m => m._key === member._key ? { ...data, _key: data.id } : m));
      toast.success('Team member added!');
    }
  };

  const deleteMember = async (member) => {
    if (!member.id) { setMembers(prev => prev.filter(m => m._key !== member._key)); return; }
    if (!window.confirm(`Remove ${member.name_en || 'this team member'}? This cannot be undone.`)) return;
    setDeletingKey(member._key);
    const { error } = await supabase.from('team_members').delete().eq('id', member.id);
    setDeletingKey(null);
    if (error) { toast.error(`Delete failed: ${error.message}`); return; }
    setMembers(prev => prev.filter(m => m._key !== member._key));
    toast.success('Removed.');
  };

  const moveMember = async (member, dir) => {
    const idx = members.findIndex(m => m._key === member._key);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= members.length) return;
    const a = members[idx], b = members[swapIdx];
    const next = [...members];
    [next[idx], next[swapIdx]] = [{ ...b, sort_order: a.sort_order }, { ...a, sort_order: b.sort_order }];
    setMembers(next);
    if (a.id && b.id && supabase) {
      await Promise.all([
        supabase.from('team_members').update({ sort_order: b.sort_order }).eq('id', a.id),
        supabase.from('team_members').update({ sort_order: a.sort_order }).eq('id', b.id),
      ]);
    }
  };

  const filtered = members.filter(m =>
    (filter === 'all' || m.categories?.includes(filter)) &&
    (!search || [m.name_en, m.name_ar, m.role_en, m.role_ar].some(v => v?.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <>
      <Helmet><title>Team | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <AdminLayout title="Team">

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <span className="material-icons" style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.1rem' }}>search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or role…"
              style={{ ...inp(), paddingLeft: '2.25rem' }} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ ...inp({ width: 'auto', cursor: 'pointer' }) }}>
            <option value="all">All Divisions ({members.length})</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label} ({members.filter(m => m.categories?.includes(c.value)).length})</option>
            ))}
          </select>
          <LangTabs lang={lang} setLang={setLang} />
          <button type="button" onClick={addMember}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem', background: '#1B5FAF', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>person_add</span> Add Member
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>Loading team…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: 12, border: '1px solid #f1f5f9' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#cbd5e1', display: 'block', marginBottom: '0.75rem' }}>groups</span>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>No team members found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filtered.map((m, i) => (
              <div key={m._key} style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', padding: '1.1rem 1.25rem', display: 'flex', gap: '1.1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <ImageField value={m.image} onChange={v => updateField(m._key, 'image', v)} />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button type="button" disabled={i === 0} onClick={() => moveMember(m, -1)} title="Move up"
                      style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', borderRadius: 6, background: 'white', color: i === 0 ? '#cbd5e1' : '#475569', cursor: i === 0 ? 'not-allowed' : 'pointer' }}>
                      <span className="material-icons" style={{ fontSize: '0.9rem' }}>arrow_upward</span>
                    </button>
                    <button type="button" disabled={i === filtered.length - 1} onClick={() => moveMember(m, 1)} title="Move down"
                      style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', borderRadius: 6, background: 'white', color: i === filtered.length - 1 ? '#cbd5e1' : '#475569', cursor: i === filtered.length - 1 ? 'not-allowed' : 'pointer' }}>
                      <span className="material-icons" style={{ fontSize: '0.9rem' }}>arrow_downward</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 260, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <Field label={`Name (${lang.toUpperCase()})`}>
                    <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={m[`name_${lang}`]} onChange={e => updateField(m._key, `name_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
                  </Field>
                  <Field label={`Role / Title (${lang.toUpperCase()})`}>
                    <input dir={lang === 'ar' ? 'rtl' : 'ltr'} value={m[`role_${lang}`]} onChange={e => updateField(m._key, `role_${lang}`, e.target.value)} style={inp()} {...focusHandlers} />
                  </Field>
                  <Field label="Divisions (can pick more than one)">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {CATEGORIES.map(c => {
                        const active = !!m.categories?.includes(c.value);
                        return (
                          <button key={c.value} type="button" onClick={() => toggleCategory(m._key, c.value)}
                            style={{
                              padding: '0.4rem 0.75rem', borderRadius: 50, border: '1.5px solid', cursor: 'pointer',
                              fontFamily: 'inherit', fontSize: '0.76rem', fontWeight: 600,
                              borderColor: active ? '#1B5FAF' : '#e2e8f0',
                              background: active ? '#1B5FAF' : 'white',
                              color: active ? 'white' : '#64748b',
                            }}>
                            {active && <span className="material-icons" style={{ fontSize: '0.85rem', verticalAlign: 'middle', marginRight: 3 }}>check</span>}
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Field label={`Bio (${lang.toUpperCase()})`}>
                      <textarea dir={lang === 'ar' ? 'rtl' : 'ltr'} rows={2} value={m[`bio_${lang}`]} onChange={e => updateField(m._key, `bio_${lang}`, e.target.value)} style={inp({ resize: 'vertical', lineHeight: 1.6 })} {...focusHandlers} />
                    </Field>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                  <button type="button" onClick={() => saveMember(m)} disabled={savingKey === m._key}
                    style={{ padding: '0.5rem 1rem', background: '#1B5FAF', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, cursor: savingKey === m._key ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span className="material-icons" style={{ fontSize: '1rem' }}>save</span>
                    {savingKey === m._key ? 'Saving…' : m.id ? 'Save' : 'Add'}
                  </button>
                  <button type="button" onClick={() => deleteMember(m)} disabled={deletingKey === m._key}
                    style={{ padding: '0.5rem 1rem', background: 'white', color: '#ef4444', border: '1.5px solid #fecaca', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, cursor: deletingKey === m._key ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                    <span className="material-icons" style={{ fontSize: '1rem' }}>{deletingKey === m._key ? 'hourglass_empty' : 'delete_outline'}</span>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { uploadImage, cloudinaryConfigured } from '../../lib/cloudinary';

const CATEGORIES = ['Industrial Materials', 'Food Distribution', 'Intelligent Chemicals', 'Manpower', 'Company News', 'Industry Insights'];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', cover_image: '', cover_image_alt: '',
  category: '', tags: '', author: 'Albloshi Team', status: 'draft',
  seo_title: '', seo_description: '', seo_keywords: '', og_image: '',
  title_ar: '', excerpt_ar: '', content_ar: '', cover_image_ar: '', cover_image_alt_ar: '',
  seo_title_ar: '', seo_description_ar: '', seo_keywords_ar: '', og_image_ar: '',
};

const inp = (extra = {}) => ({
  width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', color: '#0f172a',
  background: 'white', boxSizing: 'border-box', transition: 'border-color 0.15s', ...extra,
});

function Field({ label, hint, error, children }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{label}</label>
      {children}
      {hint && !error && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{hint}</p>}
      {error && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{error}</p>}
    </div>
  );
}

function LangTabs({ lang, setLang }) {
  const tabBtn = (active) => ({
    padding: '0.45rem 1.1rem', borderRadius: 8, border: '1.5px solid', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700,
    borderColor: active ? '#1B5FAF' : '#e2e8f0',
    background: active ? '#1B5FAF' : 'white',
    color: active ? 'white' : '#64748b',
  });
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
      <button type="button" onClick={() => setLang('en')} style={tabBtn(lang === 'en')}>English</button>
      <button type="button" onClick={() => setLang('ar')} style={tabBtn(lang === 'ar')}>Arabic (اختياري)</button>
    </div>
  );
}

function CoverImageField({ value, alt, onChangeAlt, onUpload, onRemove, showToast, dropHint }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) { showToast('Image must be under 10 MB.', 'error'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onUpload(url);
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast(err.message, 'error');
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

      {value ? (
        <div style={{ position: 'relative' }}>
          <img src={value} alt="Cover"
            style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10, display: 'block', border: '1px solid #f1f5f9' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 6 }}>
            <button type="button" onClick={() => fileInputRef.current?.click()}
              title="Replace image"
              style={{ background: 'rgba(15,23,42,0.7)', color: 'white', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontFamily: 'inherit', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
              <span className="material-icons" style={{ fontSize: '0.95rem' }}>swap_horiz</span> Replace
            </button>
            <button type="button" onClick={onRemove} title="Remove image"
              style={{ background: 'rgba(239,68,68,0.8)', color: 'white', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
              <span className="material-icons" style={{ fontSize: '0.95rem' }}>delete_outline</span>
            </button>
          </div>
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(15,23,42,0.65)', color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px', borderRadius: 50, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-icons" style={{ fontSize: '0.75rem' }}>cloud_done</span> Cloudinary
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{ border: `2px dashed ${dragOver ? '#1B5FAF' : '#e2e8f0'}`, borderRadius: 10, padding: '1.5rem 1rem', textAlign: 'center', cursor: uploading ? 'wait' : 'pointer', background: dragOver ? '#eff6ff' : '#f8fafc', transition: 'all 0.15s' }}
        >
          {uploading ? (
            <>
              <div style={{ width: 28, height: 28, border: '3px solid #dbeafe', borderTopColor: '#1B5FAF', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 0.6rem' }} />
              <p style={{ color: '#1B5FAF', fontWeight: 600, fontSize: '0.82rem', margin: 0 }}>Uploading to Cloudinary…</p>
            </>
          ) : (
            <>
              <span className="material-icons" style={{ fontSize: '1.6rem', color: dragOver ? '#1B5FAF' : '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>cloud_upload</span>
              <p style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600, margin: '0 0 0.2rem' }}>
                {dragOver ? 'Drop to upload' : (dropHint || 'Click or drag & drop')}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.72rem', margin: 0 }}>PNG, JPG, WebP — max 10 MB</p>
              {!cloudinaryConfigured && (
                <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.5rem', fontWeight: 600 }}>
                  ⚠ Add VITE_CLOUDINARY_UPLOAD_PRESET to .env
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: '0.75rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>Image Alt Text</label>
        <input value={alt} onChange={e => onChangeAlt(e.target.value)} placeholder="Describe the image for screen readers & SEO…"
          style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
      </div>
    </div>
  );
}

export default function AdminBlogEditor() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const isEdit    = !!id;

  const [form,     setForm]     = useState(EMPTY);
  const [loading,  setLoading]  = useState(isEdit);
  const [saving,   setSaving]   = useState(false);
  const [errors,   setErrors]   = useState({});
  const [toast,    setToast]    = useState(null);
  const [slugLock, setSlugLock] = useState(false);
  const [lang,     setLang]     = useState('en');

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (data) { setForm({ ...EMPTY, ...data, tags: (data.tags ?? []).join(', ') }); setSlugLock(true); }
      setLoading(false);
    })();
  }, [id, isEdit]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTitle = (v) => {
    set('title', v);
    if (!slugLock) set('slug', slugify(v));
    if (!form.seo_title) set('seo_title', v);
  };

  const handleTitleAr = (v) => {
    set('title_ar', v);
    if (!form.seo_title_ar) set('seo_title_ar', v);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())        e.title = 'Title is required.';
    if (!form.slug.trim())         e.slug  = 'Slug is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async (publishNow = false) => {
    if (!validate()) return;

    const lengthWarnings = [];
    if (form.seo_title.length > 100)       lengthWarnings.push('SEO title');
    if (form.seo_description.length > 220) lengthWarnings.push('meta description');

    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status: publishNow ? 'published' : form.status,
    };
    if (publishNow && !payload.published_at) payload.published_at = new Date().toISOString();
    payload.updated_at = new Date().toISOString();

    const { error } = isEdit
      ? await supabase.from('blogs').update(payload).eq('id', id)
      : await supabase.from('blogs').insert([payload]);

    setSaving(false);
    if (error) { showToast(error.message, 'error'); }
    else {
      const base = publishNow ? 'Post published!' : 'Draft saved!';
      const msg = lengthWarnings.length
        ? `${base} (${lengthWarnings.join(' & ')} is long — fine to save, but may get cut off in search results)`
        : base;
      showToast(msg, lengthWarnings.length ? 'warning' : 'success');
      setTimeout(() => navigate('/admin/blogs'), lengthWarnings.length ? 2500 : 1200);
    }
  };

  const [syncOg, setSyncOg] = useState(!form.og_image);

  const seoDescLen = form.seo_description.length;
  const seoTitleLen = form.seo_title.length;
  const seoDescLenAr = form.seo_description_ar.length;
  const seoTitleLenAr = form.seo_title_ar.length;

  if (loading) return (
    <AdminLayout title={isEdit ? 'Edit Post' : 'New Post'}>
      <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading post...</div>
    </AdminLayout>
  );

  return (
    <>
      <Helmet><title>{isEdit ? 'Edit Post' : 'New Post'} | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} .ql-editor{min-height:360px;font-size:0.95rem;line-height:1.7;} .ql-toolbar.ql-snow{border-radius:8px 8px 0 0;} .ql-container.ql-snow{border-radius:0 0 8px 8px;font-family:inherit;}`}</style>
      <AdminLayout title={isEdit ? 'Edit Blog Post' : 'New Blog Post'}>

        {/* Toast */}
        {toast && (() => {
          const palette = {
            error:   { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', icon: 'error_outline' },
            warning: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: 'warning_amber' },
            success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: 'check_circle' },
          }[toast.type] ?? { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: 'check_circle' };
          return (
            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, pointerEvents: 'none', maxWidth: 380, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 10, padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: palette.color, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <span className="material-icons" style={{ fontSize: '1.1rem', flexShrink: 0 }}>{palette.icon}</span>
              {toast.msg}
            </div>
          );
        })()}

        {/* Header actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button onClick={() => navigate('/admin/blogs')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '0.5rem 0.9rem', cursor: 'pointer', color: '#64748b', fontSize: '0.875rem', fontWeight: 500, fontFamily: 'inherit' }}>
            <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_back</span> Back
          </button>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={() => save(false)} disabled={saving}
              style={{ padding: '0.55rem 1.1rem', border: '1.5px solid #e2e8f0', borderRadius: 8, background: 'white', color: '#374151', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {saving ? 'Saving…' : 'Save Draft'}
            </button>
            <button onClick={() => save(true)} disabled={saving}
              style={{ padding: '0.55rem 1.25rem', background: '#1B5FAF', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="material-icons" style={{ fontSize: '1rem' }}>publish</span>
              {form.status === 'published' ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </div>

        <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', alignItems: 'start' }}>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <LangTabs lang={lang} setLang={setLang} />

            {lang === 'en' ? (
              <>
                {/* Core fields — English */}
                <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <Field label="Post Title *" error={errors.title}>
                    <input value={form.title} onChange={e => handleTitle(e.target.value)} placeholder="e.g. How TELLABS Chemicals Improve Water Treatment Efficiency"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="URL Slug *" hint="Auto-generated from title. Click to edit." error={errors.slug}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>/blog/</span>
                      <input value={form.slug} onChange={e => { set('slug', slugify(e.target.value)); setSlugLock(true); }}
                        style={inp()} onFocus={e => { setSlugLock(true); e.target.style.borderColor = '#1B5FAF'; }} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                  </Field>

                  <Field label="Excerpt" hint="Short summary shown in blog listing (1-2 sentences).">
                    <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2}
                      placeholder="A short description of the post…"
                      style={inp({ resize: 'vertical', lineHeight: 1.6 })}
                      onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>
                </div>

                {/* Content editor — English */}
                <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem', display: 'block' }}>Content</label>
                  <ReactQuill theme="snow" value={form.content} onChange={v => set('content', v)}
                    modules={QUILL_MODULES} placeholder="Write your blog post content here…"
                    style={{ fontFamily: 'inherit' }} />
                </div>

                {/* SEO — English */}
                <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.15rem', color: '#1B5FAF' }}>search</span>
                    SEO Settings
                  </h3>

                  <Field label={`SEO Title (${seoTitleLen}/100)`} hint="Defaults to post title if left empty." error={errors.seo_title}>
                    <input value={form.seo_title} onChange={e => set('seo_title', e.target.value)} placeholder="SEO optimized title…"
                      style={inp({ borderColor: seoTitleLen > 100 ? '#ef4444' : '#e2e8f0' })}
                      onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = seoTitleLen > 100 ? '#ef4444' : '#e2e8f0'} />
                  </Field>

                  <Field label={`Meta Description (${seoDescLen}/220)`} hint="Shown in Google search results. Keep under 220 characters." error={errors.seo_description}>
                    <textarea value={form.seo_description} onChange={e => set('seo_description', e.target.value)} rows={3}
                      placeholder="Describe this post for search engines…"
                      style={{ ...inp({ borderColor: seoDescLen > 220 ? '#ef4444' : '#e2e8f0' }), resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = seoDescLen > 220 ? '#ef4444' : '#e2e8f0'} />
                  </Field>

                  <Field label="SEO Keywords" hint="Comma-separated keywords.">
                    <input value={form.seo_keywords} onChange={e => set('seo_keywords', e.target.value)} placeholder="chemicals, water treatment, Saudi Arabia…"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="OG / Social Share Image URL" hint="Recommended size: 1200×630px.">
                    <input value={form.og_image} onChange={e => set('og_image', e.target.value)} placeholder="https://…"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  {(form.seo_title || form.title) && (
                    <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, padding: '1rem 1.25rem', marginTop: '0.5rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Preview</div>
                      <div style={{ fontSize: '1rem', color: '#1a0dab', fontWeight: 400, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {form.seo_title || form.title || 'Post Title'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#006621', marginBottom: '2px' }}>
                        albloshi.co/blog/{form.slug || 'post-url'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#545454', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {form.seo_description || form.excerpt || 'Meta description will appear here…'}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Core fields — Arabic */}
                <div dir="rtl" style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <Field label="عنوان المقال">
                    <input value={form.title_ar} onChange={e => handleTitleAr(e.target.value)} placeholder="اكتب العنوان بالعربية…" dir="rtl"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="مقتطف" hint="ملخص قصير يظهر في قائمة المدونة.">
                    <textarea value={form.excerpt_ar} onChange={e => set('excerpt_ar', e.target.value)} rows={2} dir="rtl"
                      placeholder="وصف قصير للمقال…"
                      style={inp({ resize: 'vertical', lineHeight: 1.6 })}
                      onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>
                </div>

                {/* Content editor — Arabic */}
                <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem', display: 'block' }}>المحتوى</label>
                  <div dir="rtl">
                    <ReactQuill theme="snow" value={form.content_ar} onChange={v => set('content_ar', v)}
                      modules={QUILL_MODULES} placeholder="اكتب محتوى المقال هنا…"
                      style={{ fontFamily: 'inherit' }} />
                  </div>
                </div>

                {/* SEO — Arabic */}
                <div dir="rtl" style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.15rem', color: '#1B5FAF' }}>search</span>
                    إعدادات السيو
                  </h3>

                  <Field label={`عنوان السيو (${seoTitleLenAr}/100)`}>
                    <input value={form.seo_title_ar} onChange={e => set('seo_title_ar', e.target.value)} placeholder="عنوان محسّن لمحركات البحث…" dir="rtl"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label={`وصف الميتا (${seoDescLenAr}/220)`}>
                    <textarea value={form.seo_description_ar} onChange={e => set('seo_description_ar', e.target.value)} rows={3} dir="rtl"
                      placeholder="صف هذا المقال لمحركات البحث…"
                      style={{ ...inp(), resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>

                  <Field label="كلمات مفتاحية" hint="مفصولة بفواصل.">
                    <input value={form.seo_keywords_ar} onChange={e => set('seo_keywords_ar', e.target.value)} placeholder="كيماويات، معالجة المياه، السعودية…" dir="rtl"
                      style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </Field>
                </div>
              </>
            )}
          </div>

          {/* Sidebar settings */}
          <div className="admin-sticky-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: 76 }}>

            {/* Publish settings */}
            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>Publish Settings</h3>
              <div style={{ marginBottom: '0.9rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  style={{ ...inp(), cursor: 'pointer' }}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Author</label>
                <input value={form.author} onChange={e => set('author', e.target.value)}
                  style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            {/* Category & Tags */}
            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>Category & Tags</h3>
              <div style={{ marginBottom: '0.9rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  style={{ ...inp(), cursor: 'pointer' }}>
                  <option value="">Select category…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>Tags</label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="chemicals, B2B, KSA…"
                  style={inp()} onFocus={e => e.target.style.borderColor = '#1B5FAF'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>Comma-separated</p>
              </div>
            </div>

            {/* Cover image — English (default) */}
            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1rem' }}>Cover Image</h3>
              <CoverImageField
                value={form.cover_image}
                alt={form.cover_image_alt}
                onChangeAlt={v => set('cover_image_alt', v)}
                onUpload={url => { set('cover_image', url); if (syncOg) set('og_image', url); }}
                onRemove={() => { set('cover_image', ''); if (syncOg) set('og_image', ''); }}
                showToast={showToast}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.85rem', cursor: 'pointer', fontSize: '0.8rem', color: '#475569', fontWeight: 500 }}>
                <input type="checkbox" checked={syncOg} onChange={e => {
                  setSyncOg(e.target.checked);
                  if (e.target.checked && form.cover_image) set('og_image', form.cover_image);
                }} style={{ accentColor: '#1B5FAF', width: 14, height: 14 }} />
                Use as social share (OG) image
              </label>
            </div>

            {/* Cover image — Arabic (optional) */}
            <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.35rem' }}>Arabic Cover Image</h3>
              <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#94a3b8' }}>Optional — falls back to the English image above if left empty.</p>
              <CoverImageField
                value={form.cover_image_ar}
                alt={form.cover_image_alt_ar}
                onChangeAlt={v => set('cover_image_alt_ar', v)}
                onUpload={url => set('cover_image_ar', url)}
                onRemove={() => set('cover_image_ar', '')}
                showToast={showToast}
                dropHint="Upload Arabic-specific image (optional)"
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

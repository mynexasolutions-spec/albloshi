import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { DEFAULTS } from '../../lib/siteSettingsDefaults';

const inp = (extra = {}) => ({
  width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', color: '#0f172a',
  background: 'white', boxSizing: 'border-box', transition: 'border-color 0.15s', ...extra,
});
const focusHandlers = {
  onFocus: e => { e.target.style.borderColor = '#1B5FAF'; },
  onBlur: e => { e.target.style.borderColor = '#e2e8f0'; },
};

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>{label}</label>
      {children}
      {hint && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{hint}</p>}
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', padding: '1.5rem', marginBottom: '1.25rem' }}>
      <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="material-icons" style={{ fontSize: '1.15rem', color: '#1B5FAF' }}>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 1.25rem' };

export default function AdminContactSettings() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (!supabase) { setLoading(false); return; }
      try {
        const { data, error } = await supabase.from('site_settings').select('data').eq('key', 'contact').single();
        if (!error && data?.data) setSettings(prev => ({ ...prev, ...data.data }));
      } catch {
        // table probably doesn't exist yet — keep defaults, editor still usable
      }
      setLoading(false);
    })();
  }, []);

  const setField = (field, value) => setSettings(s => ({ ...s, [field]: value }));

  const handleSave = async () => {
    if (!supabase) { toast.error('Supabase is not configured — cannot save.'); return; }
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'contact', data: settings, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    setSaving(false);
    if (error) toast.error(`Save failed: ${error.message}. Have you run supabase/site_settings.sql yet?`);
    else toast.success('Saved! Live across the site now — Footer, WhatsApp button, Contact page, and Manpower page.');
  };

  return (
    <>
      <Helmet><title>Contact & Site Settings | Albloshi Admin</title><meta name="robots" content="noindex" /></Helmet>
      <AdminLayout title="Contact & Site Settings">
        {loading && (
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>Loading current settings…</div>
        )}

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '0.9rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#1e3a5f', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <span className="material-icons" style={{ fontSize: '1.1rem', color: '#1B5FAF', flexShrink: 0 }}>info</span>
          <span>These values are shared everywhere: the site footer, the floating WhatsApp button, the Contact page, and the Manpower Supply hero. One save updates all of them.</span>
        </div>

        <Card title="Phone & WhatsApp" icon="phone_in_talk">
          <div style={grid2}>
            <Field label="Phone number (for tel: links)" hint="Format: +966543188882 — no spaces, used in tel: and wa.me links.">
              <input value={settings.phone} onChange={e => setField('phone', e.target.value)} style={inp()} {...focusHandlers} />
            </Field>
            <Field label="Phone display text" hint="How the number is shown to visitors, e.g. +966 54 318 8882">
              <input value={settings.phone_display} onChange={e => setField('phone_display', e.target.value)} style={inp()} {...focusHandlers} />
            </Field>
          </div>
          <Field label="WhatsApp number" hint="Format: +966543188882 — used for the floating WhatsApp button and WhatsApp links.">
            <input value={settings.whatsapp} onChange={e => setField('whatsapp', e.target.value)} style={inp()} {...focusHandlers} />
          </Field>
        </Card>

        <Card title="Email & Website" icon="mail_outline">
          <div style={grid2}>
            <Field label="Primary email"><input type="email" value={settings.email_admin} onChange={e => setField('email_admin', e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label="Sales email"><input type="email" value={settings.email_sales} onChange={e => setField('email_sales', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
          <Field label="Website URL"><input value={settings.website} onChange={e => setField('website', e.target.value)} style={inp()} {...focusHandlers} /></Field>
        </Card>

        <Card title="Address" icon="location_on">
          <div style={grid2}>
            <Field label="Address Line 1 (English)"><input value={settings.address_line1_en} onChange={e => setField('address_line1_en', e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label="Address Line 1 (Arabic)"><input dir="rtl" value={settings.address_line1_ar} onChange={e => setField('address_line1_ar', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
          <div style={grid2}>
            <Field label="Address Line 2 (English)"><input value={settings.address_line2_en} onChange={e => setField('address_line2_en', e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label="Address Line 2 (Arabic)"><input dir="rtl" value={settings.address_line2_ar} onChange={e => setField('address_line2_ar', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
        </Card>

        <Card title="Registration Details" icon="badge">
          <div style={grid2}>
            <Field label="Commercial Registry (CR) Number"><input value={settings.cr_number} onChange={e => setField('cr_number', e.target.value)} style={inp()} {...focusHandlers} /></Field>
            <Field label="National Address Code"><input value={settings.national_address} onChange={e => setField('national_address', e.target.value)} style={inp()} {...focusHandlers} /></Field>
          </div>
        </Card>

        <button type="button" onClick={handleSave} disabled={saving || loading}
          style={{ padding: '0.7rem 1.75rem', background: '#1B5FAF', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 700, cursor: (saving || loading) ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.6 : 1 }}>
          <span className="material-icons" style={{ fontSize: '1.1rem' }}>save</span>
          {saving ? 'Saving…' : 'Save All Settings'}
        </button>
      </AdminLayout>
    </>
  );
}

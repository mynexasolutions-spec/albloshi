import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Industrial Materials', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error(t('contact_toast_required'));
      return;
    }
    setSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert([{
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          service: form.service,
          message: form.message,
          status:  'new',
          read:    false,
          source:  'contact_form',
        }]);
        if (error) throw error;
      }
      toast.success(t('contact_toast_success').replace('{name}', form.name));
      setForm({ name: '', email: '', phone: '', service: 'Industrial Materials', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      const msg = err?.message || err?.details || t('contact_toast_error_default');
      toast.error(msg, { duration: 8000 });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('contact_meta_title')}</title>
        <meta name="description" content={t('contact_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.90) 0%, rgba(27, 95, 175, 0.75) 100%), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <h1>{t('contact_hero_title')}</h1>
          <p>{t('contact_hero_desc')}</p>
        </div>
      </section>


      {/* Contact Form & Info */}
      <section id="inquiry-form" className="section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h3>{t('contact_form_title')}</h3>
              <p className="large-para" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>{t('contact_form_desc')}</p>
              <form id="companyInquiryForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="formName" className="form-label">{t('contact_form_name_label')}</label>
                  <input type="text" id="formName" className="form-input" required placeholder={t('contact_form_name_placeholder')} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="formEmail" className="form-label">{t('contact_form_email_label')}</label>
                    <input type="email" id="formEmail" className="form-input" required placeholder={t('contact_form_email_placeholder')} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="formPhone" className="form-label">{t('contact_form_phone_label')}</label>
                    <input type="tel" id="formPhone" className="form-input" required placeholder={t('contact_form_phone_placeholder')} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="formService" className="form-label">{t('contact_form_division_label')}</label>
                  <select id="formService" className="form-select" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                    <option value="Industrial Materials">{t('contact_service_industrial')}</option>
                    <option value="Food Distribution">{t('contact_service_food')}</option>
                    <option value="TELLABS Chemicals">{t('contact_service_chemicals')}</option>
                    <option value="Manpower Supply">{t('contact_service_manpower')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formMessage" className="form-label">{t('contact_form_message_label')}</label>
                  <textarea id="formMessage" className="form-textarea" placeholder={t('contact_form_message_placeholder')} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none' }} disabled={submitting}>
                  {submitting ? t('contact_form_submitting') : t('contact_form_submit')}
                </button>
              </form>
            </div>

            <div className="contact-info-panel">
              <h2 className="section-title">{t('contact_info_title')}</h2>
              <p className="large-para">{t('contact_info_desc')}</p>
              <div className="contact-card-list">
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">phone_in_talk</span>
                  <div className="contact-card-details">
                    <h4>{t('contact_card_bd_title')}</h4>
                    <p>{t('contact_card_bd_name')}</p>
                    <p>{t('contact_label_mobile_whatsapp')} <a href="https://wa.me/966549581547" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '700' }}>+966 54 958 1547</a></p>
                  </div>
                </div>
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">mail_outline</span>
                  <div className="contact-card-details">
                    <h4>{t('contact_card_sales_title')}</h4>
                    <p>{t('contact_label_email')} <a href="mailto:sales@albloshi.co">sales@albloshi.co</a></p>
                    <p>{t('contact_label_website')} <a href="https://albloshi.co" target="_blank" rel="noopener noreferrer">https://albloshi.co</a></p>
                  </div>
                </div>
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">location_on</span>
                  <div className="contact-card-details">
                    <h4>{t('contact_card_address_title')}</h4>
                    <p>{t('contact_address_line1')}</p>
                    <p>{t('contact_address_line2')}</p>
                  </div>
                </div>
              </div>
              <div className="contact-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">{t('contact_meta_cr')}</span>
                  <span className="meta-value">7049763092</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{t('contact_meta_national_address')}</span>
                  <span className="meta-value">EAPB5250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location CTA */}
      <section className="page-cta">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title center" style={{ color: 'white' }}>{t('contact_cta_title')}</h2>
          <p>{t('contact_cta_desc')}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+966549581547" className="btn btn-primary" style={{ background: 'white', color: 'var(--color-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              {t('contact_cta_call_btn')}
            </a>
            <a href="mailto:sales@albloshi.co" className="btn" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)' }}>
              {t('contact_cta_email_btn')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { fetchVerticalContent } from '../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../lib/verticalDefaults/tellabs';

export default function TellabsChemicals() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];

  const [content, setContent] = useState(DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchVerticalContent(supabase, 'tellabs', DEFAULTS, SECTIONS).then(merged => {
      if (!cancelled) setContent(merged);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('tc_meta_title')}</title>
        <meta name="description" content={t('tc_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero tellabs-hero" style={{
        backgroundImage: `linear-gradient(135deg, rgba(5,25,55,0.9) 0%, rgba(14,108,196,0.75) 100%), url('${content.hero.image}')`
      }}>
        <div className="container">
          <h1>{L(content.hero, 'title')}</h1>
          <p>{L(content.hero, 'desc')}</p>
        </div>
      </section>

      {/* About & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="tc-split-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 className="section-title text-left" style={{ marginBottom: '1.5rem' }}>{L(content.about, 'title')}</h2>
              <p className="large-para" style={{ marginBottom: '1.5rem' }}>
                {L(content.about, 'p1_before')} <strong>{L(content.about, 'p1_strong')}</strong> {L(content.about, 'p1_after')}
              </p>
              <p className="large-para" style={{ marginBottom: 0 }}>
                {L(content.about, 'p2_before')} <strong>{L(content.about, 'p2_strong')}</strong> {L(content.about, 'p2_after')}
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(145deg, #0b2246 0%, #1e3a60 100%)',
              padding: '3rem',
              borderRadius: '24px',
              color: 'white',
              boxShadow: '0 20px 40px rgba(11,34,70,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>{L(content.about, 'philosophy_title')}</h3>

              {content.about.philosophy.map((item, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? '1.75rem' : 0 }}>
                  <h4 style={{ color: '#a3d4ff', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)' }}>
                    <span className="material-icons">{item.icon}</span> {L(item, 'title')}
                  </h4>
                  <p className="large-para" style={{ color: 'white', margin: 0 }}>{L(item, 'desc')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="focus-label">{L(content.segments, 'label')}</span>
            <h2 className="section-title center">{L(content.segments, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{L(content.segments, 'desc')}</p>
          </div>

          <div className="tc-segments-grid">
            {content.segments.items.map((seg, i) => (
              <Link key={i} to="/intelligent-chemicals" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', padding: '2.5rem 1.75rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', textAlign: 'center', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(27,95,175,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '12px', backgroundColor: 'rgba(27,95,175,0.08)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.6rem' }}>{seg.icon}</span>
                  </div>
                  <h3 style={{ color: 'var(--color-dark)', fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', fontWeight: 700, marginBottom: '0.75rem' }}>{L(seg, 'title')}</h3>
                  <p className="large-para" style={{ margin: 0 }}>{L(seg, 'desc')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="focus-label">{L(content.collaborators, 'label')}</span>
            <h2 className="section-title center">{L(content.collaborators, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>
              {L(content.collaborators, 'desc')}
            </p>
          </div>

          <div className="tc-collab-grid">
            {content.collaborators.items.map((collab, i) => (
              <div key={i} style={{ background: 'var(--color-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-dark)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.22rem)', marginBottom: '0.5rem' }}>{collab.name}</h4>
                <p className="large-para" style={{ margin: 0 }}>{L(collab, 'specialty')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Clients */}
      <section className="section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container">
          <div className="tc-split-grid">

            {/* Left: Quotes */}
            <div>
              <span className="focus-label">{L(content.trust, 'customers_label')}</span>
              <h2 className="section-title text-left" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>{L(content.trust, 'title')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {content.trust.quotes.map((q, i) => (
                  <blockquote key={i} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)', margin: 0 }}>
                    <p className="large-para" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{L(q, 'quote')}</p>
                    <cite style={{ fontWeight: 700, color: 'var(--color-primary)', fontStyle: 'normal' }}>— {L(q, 'cite')}</cite>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Right: Key Clients */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0,0,0,0.04)' }}>
              <span className="focus-label">{L(content.trust, 'clients_label')}</span>
              <h3 style={{ color: 'var(--color-dark)', fontSize: '1.4rem', fontWeight: 700, margin: '0.5rem 0 1.5rem' }}>{L(content.trust, 'clients_title')}</h3>
              <div className="tc-clients-grid">
                {content.trust.clients.map((client, i) => (
                  <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontWeight: 600, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons" style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>verified</span>
                    <span className="large-para" style={{ margin: 0 }}>{client}</span>
                  </div>
                ))}
              </div>
              <p className="large-para" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
                {L(content.trust, 'footer_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{L(content.cta, 'title')}</h2>
                <p>{L(content.cta, 'desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to={content.cta.btn1_href} className="btn btn-primary">{L(content.cta, 'btn1')}</Link>
                <Link to={content.cta.btn2_href} className="btn btn-outline">{L(content.cta, 'btn2')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
    </>
  );
}

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { fetchVerticalContent } from '../lib/verticalContent';
import { DEFAULTS, SECTIONS } from '../lib/verticalDefaults/chemicals';

const CHEMICAL_TEAM = [
  { id: 1, nameKey: 'team_jetu_name', roleKey: 'team_chemical_jetu_role', bioKey: 'team_chemical_jetu_bio', img: '/images/team/Jetu Lalwani.jpg' },
  { id: 2, nameKey: 'team_sajid_name', roleKey: 'about_team_4_role', bioKey: 'about_team_4_bio', img: '/images/team/ajay_adnala.jpeg' },
  { id: 3, nameKey: 'team_ajay_name', roleKey: 'about_team_5_role', bioKey: 'about_team_5_bio', img: '/images/team/sajid_pachhapure.jpg.jpeg' },
  { id: 4, nameKey: 'team_mab_name', roleKey: 'team_chemical_mab_role', bioKey: 'team_chemical_mab_bio', img: '/images/team/Mohammed Abdullah Albloshi.jpg' },
  { id: 6, nameKey: 'team_akhter_name', roleKey: 'team_chemical_akhter_role', bioKey: 'team_chemical_akhter_bio' },
  { id: 5, nameKey: 'team_arbaz_name', roleKey: 'team_chemical_arbaz_role', bioKey: 'team_chemical_arbaz_bio', img: '/images/team/Arbaz Shaikh.jpg' },
  { id: 15, nameKey: 'team_amreen_name', roleKey: 'team_chemical_amreen_role', bioKey: 'team_chemical_amreen_bio', img: '/images/team/Amreen Khan.jpg' },
];

export default function IntelligentChemicals() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];

  const [content, setContent] = useState(DEFAULTS);
  useEffect(() => {
    let cancelled = false;
    fetchVerticalContent(supabase, 'chemicals', DEFAULTS, SECTIONS).then(merged => {
      if (!cancelled) setContent(merged);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const blocks = document.querySelectorAll('.solution-block');
    blocks.forEach((block, i) => {
      block.classList.add(i % 2 === 0 ? 'slide-from-left' : 'slide-from-right');
    });
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    blocks.forEach(b => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('ic_meta_title')}</title>
        <meta name="description" content={t('ic_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="ic-page-hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(11, 34, 70, 0.9) 0%, rgba(27, 95, 175, 0.8) 100%), url(${content.hero.image})` }}>
        <div className="container">
          <h1>{L(content.hero, 'title_l1')}<br />{L(content.hero, 'title_l2')}</h1>
          <p>{L(content.hero, 'desc')}</p>
        </div>
      </section>

      {/* Solutions */}
      <section className="solutions-wrapper">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '5rem' }}>
            <span className="focus-label">{L(content.hero, 'label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{L(content.hero, 'title')}</h2>
          </div>

          {content.solutions.map((sol, i) => (
            <div key={sol.id} id={sol.id} className={`solution-block${i % 2 !== 0 ? ' reverse' : ''}`}>
              <div className="solution-img-col">
                <img src={sol.image} alt={L(sol, 'title')} />
              </div>
              <div className="solution-content-col">
                <h2>{L(sol, 'title')}</h2>
                <p>{L(sol, 'desc')}</p>
                <div className="solution-lists">
                  {(sol[`lists_${language}`] ?? []).map((list, li) => (
                    <div key={li} className="solution-list">
                      <h4>{list.heading}</h4>
                      <ul>
                        {list.items.map((item, ii) => (
                          <li key={ii} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="trust-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="focus-label">{L(content.trust, 'label')}</span>
            <h2 className="section-title center" style={{ marginTop: '1rem' }}>{L(content.trust, 'title')}</h2>
          </div>
          <div className="trust-grid">
            {content.trust.items.map((c, i) => (
              <div key={i} className="trust-card">
                <div className="trust-icon"><span className="material-icons">{c.icon}</span></div>
                <h3>{L(c, 'title')}</h3>
                <p>{L(c, 'desc')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="commitment-banner">
        <div className="container">
          <h2>{L(content.commitment, 'title')}</h2>
          <p>{L(content.commitment, 'desc')}</p>
          <div className="commitment-list">
            {content.commitment.items.map((it, i) => (
              <span key={i}>{it[language]}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section-padding" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="focus-label">{t('about_team_label')}</span>
            <h2 className="section-title center">{t('chem_team_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('chem_team_desc')}</p>
          </div>
          <div className="team-grid">
            {CHEMICAL_TEAM.map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  {m.img ? (
                    <img src={m.img} alt={m.nameKey ? t(m.nameKey) : m.name} className="team-img" style={{ objectFit: 'cover' }} />
                  ) : (
                    <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id={`avatarGradChem${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>
                        <linearGradient id={`primaryGradChem${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1B5FAF" />
                          <stop offset="100%" stopColor="#0b2246" />
                        </linearGradient>
                      </defs>
                      <rect width="100" height="100" fill={`url(#avatarGradChem${m.id})`} />
                      <circle cx="50" cy="40" r="18" fill={`url(#primaryGradChem${m.id})`} opacity="0.85" />
                      <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGradChem${m.id})`} opacity="0.85" />
                    </svg>
                  )}
                </div>
                <div className="team-info">
                  <h3>{m.nameKey ? t(m.nameKey) : m.name}</h3>
                  <div className="team-role">{t(m.roleKey)}</div>
                  <p className="team-bio">{t(m.bioKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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

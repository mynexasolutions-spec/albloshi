import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const SLIDE_KEYS = [
  {
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
    subtitleKey: 'home_slide1_subtitle',
    titleKey: 'home_slide1_title',
    ctaKey: 'home_slide1_cta',
    href: '/industrial-services',
  },
  {
    bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
    subtitleKey: 'home_slide2_subtitle',
    titleKey: 'home_slide2_title',
    ctaKey: 'home_slide2_cta',
    href: '/food-services',
  },
  {
    bg: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80',
    subtitleKey: 'home_slide3_subtitle',
    titleKey: 'home_slide3_title',
    ctaKey: 'home_slide3_cta',
    href: '/intelligent-chemicals',
  },
];

const FAQ_KEYS = ['home_faq1', 'home_faq2', 'home_faq3', 'home_faq4', 'home_faq5'];

export default function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const reviewsViewportRef = useRef(null);
  const intervalRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;

    const isMobile = () => window.innerWidth <= 768;
    let startX = 0;
    let baseX = 0;

    const getX = (el) => new DOMMatrix(getComputedStyle(el).transform).m41;

    const onTouchStart = (e) => {
      if (!isMobile()) return;
      startX = e.touches[0].clientX;
      baseX = getX(track);
      track.style.animationPlayState = 'paused';
      track.style.transform = `translateX(${baseX}px)`;
    };

    const onTouchMove = (e) => {
      if (!isMobile()) return;
      track.style.transform = `translateX(${baseX + e.touches[0].clientX - startX}px)`;
    };

    const onTouchEnd = () => {
      if (!isMobile()) return;
      const currentX = getX(track);
      const halfWidth = track.scrollWidth / 2;
      let norm = currentX % halfWidth;
      if (norm > 0) norm -= halfWidth;
      track.style.transform = '';
      track.style.animationDelay = `${(norm / halfWidth) * 22}s`;
      track.style.animationPlayState = 'running';
    };

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove',  onTouchMove,  { passive: true });
    track.addEventListener('touchend',   onTouchEnd);
    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove',  onTouchMove);
      track.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  const startSlideshow = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDE_KEYS.length);
    }, 5500);
  };

  useEffect(() => {
    startSlideshow();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const statNums = document.querySelectorAll('.stat-number');
    if (!statNums.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const fps = 1000 / 60;
          const total = Math.round(duration / fps);
          let frame = 0;
          const timer = setInterval(() => {
            frame++;
            const p = frame / total;
            el.textContent = Math.round(target * (p * (2 - p))) + suffix;
            if (frame >= total) {
              el.textContent = target + suffix;
              clearInterval(timer);
            }
          }, fps);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDE_KEYS.length) % SLIDE_KEYS.length);
    startSlideshow();
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDE_KEYS.length);
    startSlideshow();
  };

  const handleReviewArrow = (dir) => {
    const vp = reviewsViewportRef.current;
    if (!vp) return;
    const card = vp.querySelector('.review-card');
    const amount = card ? card.offsetWidth + 24 : 350;
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };


  return (
    <>
      <Helmet>
        <title>{t('home_meta_title')}</title>
        <meta name="description" content={t('home_meta_desc')} />
      </Helmet>

      <Header />

      {/* Hero Slider */}
      <section
        className="hero-slider"
        onTouchStart={e => setTouchStart(e.changedTouches[0].screenX)}
        onTouchEnd={e => {
          const diff = e.changedTouches[0].screenX - touchStart;
          if (Math.abs(diff) > 60) { diff > 0 ? prevSlide() : nextSlide(); }
        }}
      >
        {SLIDE_KEYS.map((slide, i) => (
          <div key={i} className={`slide${currentSlide === i ? ' active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: `url('${slide.bg}')` }}></div>
            <div className="slide-overlay"></div>
            <div className="container">
              <div className="slide-content">
                <h3>{t(slide.subtitleKey)}</h3>
                <h1>{t(slide.titleKey)}</h1>
                <div className="slide-actions">
                  <Link to={slide.href} className="btn btn-primary">{t(slide.ctaKey)}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {SLIDE_KEYS.map((_, i) => (
            <div key={i} className={`dot${currentSlide === i ? ' active' : ''}`} onClick={() => { setCurrentSlide(i); startSlideshow(); }}></div>
          ))}
        </div>
        <button className="slider-arrow slider-arrow-left" aria-label={t('home_aria_prev_slide')} onClick={prevSlide}></button>
        <button className="slider-arrow slider-arrow-right" aria-label={t('home_aria_next_slide')} onClick={nextSlide}></button>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="who-we-are-section section-padding">
        <div className="container">
          <div className="who-header text-center">
            <span className="focus-label">{t('home_who_label')}</span>
            <h2 className="section-title center">{t('home_who_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>{t('home_who_desc')}</p>
          </div>
          <div className="who-features-grid">
            {[
              { icon: 'public', labelKey: 'home_who_f1_label', descKey: 'home_who_f1_desc' },
              { icon: 'verified_user', labelKey: 'home_who_f2_label', descKey: 'home_who_f2_desc' },
              { icon: 'local_shipping', labelKey: 'home_who_f3_label', descKey: 'home_who_f3_desc' },
              { icon: 'engineering', labelKey: 'home_who_f4_label', descKey: 'home_who_f4_desc' },
            ].map(f => (
              <div key={f.icon} className="who-f-item">
                <div className="who-f-icon"><span className="material-icons">{f.icon}</span></div>
                <div className="who-f-text">
                  <h4 className="f-label">{t(f.labelKey)}</h4>
                  <p className="f-desc">{t(f.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="trusted-section section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container text-center">
          <h2 className="section-title center" style={{ marginBottom: '1rem', color: '#0b2246' }}>{t('home_trusted_title_l1')}<br />{t('home_trusted_title_l2')}</h2>
          <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>{t('home_trusted_desc')}</p>
        </div>
        <div className="marquee-outer">
          <div className="marquee-track" ref={marqueeRef}>
            {[...Array(4)].flatMap((_, rep) =>
              [1, 2, 3, 4, 5].map(n => (
                <div key={`${rep}-${n}`} className="marquee-card">
                  <img src={`/images/clients/client_${n}.png`} alt={`Client ${n}`} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Intelligent Chemicals Bento */}
      <section className="intel-process-section section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="container">
          <div className="bento-grid">
            <div className="bento-card bento-header-card">
              <span className="focus-label on-dark">{t('our_intelligent_chemicals')}</span>
              <h2 className="section-title text-left" style={{ color: 'white' }}>
                {t('smart_chemicals_real_impact').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="large-para" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>{t('bento_subtitle')}</p>
              <Link to="/intelligent-chemicals" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.05rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(27,95,175,0.4)', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.3s ease' }}>{t('know_more')}</Link>
            </div>
            {[
              { img: '/images/IWT.webp', icon: 'water', title: t('industrial_water_treatment'), desc: t('iwt_desc') },
              { img: '/images/Polymers.webp', icon: 'bubble_chart', title: t('polymers_coagulants'), desc: t('polymers_desc') },
              { img: '/images/activated_carbon.webp', icon: 'filter_alt', title: t('activated_carbon_solutions'), desc: t('activated_carbon_desc') },
              { img: '/images/pulp_and_paper.webp', icon: 'waves', title: t('silicone_organic_defoamers'), desc: t('defoamers_desc') },
              { img: '/images/cleaning_disinfection.webp', icon: 'cleaning_services', title: t('cleaning_disinfection'), desc: t('cleaning_desc') },
              { img: '/images/Fuel_additives.webp', icon: 'local_gas_station', title: t('fuel_additives'), desc: t('fuel_desc') },
            ].map(card => (
              <div key={card.title} className="bento-card bento-feature-card img-bento" style={{ backgroundImage: `url('${card.img}')` }}>
                <div className="bento-icon-small"><span className="material-icons">{card.icon}</span></div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="intel-trust-banner">
            <div className="intel-trust-left">
              <span className="material-icons trust-shield">security</span>
              <div className="trust-text">
                <h5>{t('quality_trust_perf')}</h5>
                <p>{t('trust_subtitle')}</p>
              </div>
            </div>
            <div className="intel-trust-right">
              <span>{t('strategic_partner')}</span>
              <span className="partner-logo-text">TELLABS<br /><small>Intelligent Chemicals</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section id="segments" className="verticals-section section-padding">
        <div className="container">
          <div className="verticals-header text-center">
            <span className="focus-label">{t('home_verticals_label')}</span>
            <h2 className="section-title">{t('home_verticals_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>{t('home_verticals_desc')}</p>
          </div>
          <div className="verticals-bento-grid">
            <div className="v-card img-bento dark-overlay" style={{ backgroundImage: "url('/right.png')" }}>
              <div className="v-content">
                <h3>{t('home_vert_chem_title')}</h3>
                <p>{t('home_vert_chem_desc')}</p>
                <Link to="/intelligent-chemicals" className="v-link">{t('home_vert_chem_link')}</Link>
              </div>
            </div>
            <div className="v-card img-bento" style={{ backgroundImage: "url('/images/products/food_distribution.webp')" }}>
              <div className="v-content">
                <h3>{t('home_vert_food_title')}</h3>
                <p>{t('home_vert_food_desc')}</p>
                <Link to="/food-services" className="v-link">{t('home_verticals_learn_more')}</Link>
              </div>
            </div>
            <div className="v-card img-bento" style={{ backgroundImage: "url('/images/products/industrial_material_and_manpower.webp')" }}>
              <div className="v-content">
                <h3>{t('home_vert_ind_title')}</h3>
                <p>{t('home_vert_ind_desc')}</p>
                <Link to="/industrial-services" className="v-link">{t('home_verticals_learn_more')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{t('home_why_title')}</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{t('home_why_desc')}</p>
          </div>
          <div className="reasons-bento-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80', titleKey: 'home_reason1_title', descKey: 'home_reason1_desc', large: true },
              { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', titleKey: 'home_reason2_title', descKey: 'home_reason2_desc' },
              { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', titleKey: 'home_reason3_title', descKey: 'home_reason3_desc' },
              { img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80', titleKey: 'home_reason4_title', descKey: 'home_reason4_desc' },
              { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', titleKey: 'home_reason5_title', descKey: 'home_reason5_desc' },
              { img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80', titleKey: 'home_reason6_title', descKey: 'home_reason6_desc', large: true },
            ].map(r => (
              <div key={r.titleKey} className={`r-card${r.large ? ' r-large' : ''}`}>
                <div className="r-img-wrapper"><img src={r.img} alt={t(r.titleKey)} /></div>
                <div className="r-content-wrapper">
                  <div className="r-content">
                    <h3>{t(r.titleKey)}</h3>
                    <p className="large-para">{t(r.descKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Network */}
      <section id="network" className="network-hero bg-dark-section">
        <div className="container relative z-10 text-center">
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>{t('home_network_title')}</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{t('home_network_desc')}</p>
          <div className="network-interactive-map">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {[
              { cls: 'card-dammam', titleKey: 'home_network_dammam_title', subKey: 'home_network_dammam_sub' },
              { cls: 'card-khobar', titleKey: 'home_network_khobar_title', subKey: 'home_network_khobar_sub' },
              { cls: 'card-jubail', titleKey: 'home_network_jubail_title', subKey: 'home_network_jubail_sub' },
              { cls: 'card-other', titleKey: 'home_network_other_title', subKey: 'home_network_other_sub' },
            ].map(c => (
              <div key={c.cls} className={`map-floating-card ${c.cls}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{t(c.titleKey)}</h4>
                  <span>{t(c.subKey)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2 className="section-title center">{t('home_testimonials_title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{t('home_testimonials_desc')}</p>
          </div>
          <div className="reviews-carousel-wrapper">
            <button className="reviews-arrow reviews-arrow-prev" aria-label={t('home_aria_prev_review')} onClick={() => handleReviewArrow(-1)}>&#8592;</button>
            <div className="reviews-viewport" ref={reviewsViewportRef}>
              <div className="reviews-track">
                {[
                  { quoteKey: 'home_review1_quote', name: 'Eng. Hameed Al-Subaie', titleKey: 'home_review1_title', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80' },
                  { quoteKey: 'home_review2_quote', name: 'Sarah Chowdhury', titleKey: 'home_review2_title', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80' },
                  { quoteKey: 'home_review3_quote', name: 'Dr. Faisal Al-Qahtani', titleKey: 'home_review3_title', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80' },
                  { quoteKey: 'home_review4_quote', name: 'Omar Al-Rashid', titleKey: 'home_review4_title', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=60&q=80' },
                  { quoteKey: 'home_review5_quote', name: 'Layla Hassan', titleKey: 'home_review5_title', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=60&q=80' },
                ].map(r => (
                  <div key={r.name} className="review-card">
                    <blockquote className="review-text">{t(r.quoteKey)}</blockquote>
                    <div className="review-author">
                      <img src={r.img} alt={r.name} className="review-author-img" />
                      <div>
                        <div className="review-author-name">{r.name}</div>
                        <div className="review-author-title">{t(r.titleKey)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="reviews-arrow reviews-arrow-next" aria-label={t('home_aria_next_review')} onClick={() => handleReviewArrow(1)}>&#8594;</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{t('home_faq_title')}</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>{t('home_faq_desc')}</p>
          </div>
          <div className="faq-container">
            {FAQ_KEYS.map((key, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className="faq-question">{t(`${key}_q`)}</span>
                  <span className="faq-arrow"></span>
                </button>
                <div className="faq-content">
                  <div className="faq-body"><p>{t(`${key}_a`)}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{t('home_cta_title')}</h2>
                <p>{t('home_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('home_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('home_cta_btn2')}</Link>
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

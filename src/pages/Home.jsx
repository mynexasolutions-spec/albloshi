import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { DEFAULTS, fetchHomeContent } from '../lib/homeContentDefaults';

export default function Home() {
  const { t, language } = useLanguage();
  const L = (obj, base) => obj[`${base}_${language}`];

  // Content is initialized to the hardcoded defaults so the first paint is
  // identical to the pre-admin-panel page. Any Supabase overrides (per-section
  // rows in `home_content`) are merged in once the async fetch resolves.
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetchHomeContent(supabase).then(merged => {
      if (!cancelled) setContent(merged);
    });
    return () => { cancelled = true; };
  }, []);

  const slides = content.hero_slides;
  const faqItems = content.faq.items;
  const clients = content.clients;
  const reviews = content.testimonials.reviews;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const reviewsViewportRef = useRef(null);
  const intervalRef = useRef(null);
  const reviewsIntervalRef = useRef(null);
  const marqueeRef = useRef(null);

  const startReviewsAutoplay = () => {
    clearInterval(reviewsIntervalRef.current);
    reviewsIntervalRef.current = setInterval(() => {
      const vp = reviewsViewportRef.current;
      if (!vp) return;
      const card = vp.querySelector('.review-card');
      const amount = card ? card.offsetWidth + 24 : 350;

      const maxScrollLeft = vp.scrollWidth - vp.clientWidth;
      let nextScrollLeft = vp.scrollLeft + amount;

      if (nextScrollLeft >= maxScrollLeft - 10) {
        nextScrollLeft = 0;
      }

      vp.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
    }, 4500);
  };

  useEffect(() => {
    startReviewsAutoplay();
    return () => clearInterval(reviewsIntervalRef.current);
  }, []);

  useEffect(() => {
    const vp = reviewsViewportRef.current;
    if (!vp) return;

    const handleScroll = () => {
      const card = vp.querySelector('.review-card');
      const amount = card ? card.offsetWidth + 24 : 350;
      const index = Math.round(vp.scrollLeft / amount);
      setCurrentReview(index);
    };

    vp.addEventListener('scroll', handleScroll, { passive: true });
    return () => vp.removeEventListener('scroll', handleScroll);
  }, []);

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
      track.style.animationDelay = `${(norm / halfWidth) * 60}s`;
      track.style.animationPlayState = 'running';
    };

    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });
    track.addEventListener('touchend', onTouchEnd);
    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const startSlideshow = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5500);
  };

  useEffect(() => {
    startSlideshow();
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

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
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    startSlideshow();
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    startSlideshow();
  };

  const handleReviewArrow = (dir) => {
    const vp = reviewsViewportRef.current;
    if (!vp) return;
    const card = vp.querySelector('.review-card');
    const amount = card ? card.offsetWidth + 24 : 350;
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
    startReviewsAutoplay();
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
        {slides.map((slide, i) => (
          <div key={slide.id ?? i} className={`slide${currentSlide === i ? ' active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: `url('${slide.image}')` }}></div>
            <div className="slide-overlay"></div>
            <div className="container">
              <div className="slide-content">
                <h3>{L(slide, 'subtitle')}</h3>
                <h1>{L(slide, 'title')}</h1>
                <div className="slide-actions">
                  <Link to={slide.href} className="btn btn-primary">{L(slide, 'cta')}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((slide, i) => (
            <div key={slide.id ?? i} className={`dot${currentSlide === i ? ' active' : ''}`} onClick={() => { setCurrentSlide(i); startSlideshow(); }}></div>
          ))}
        </div>
        <button className="slider-arrow slider-arrow-left" aria-label={t('home_aria_prev_slide')} onClick={prevSlide}></button>
        <button className="slider-arrow slider-arrow-right" aria-label={t('home_aria_next_slide')} onClick={nextSlide}></button>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="who-we-are-section section-padding">
        <div className="container">
          <div className="who-header text-center">
            <span className="focus-label">{L(content.who_we_are, 'label')}</span>
            <h2 className="section-title center">{L(content.who_we_are, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>{L(content.who_we_are, 'desc')}</p>
          </div>
          <div className="who-features-grid">
            {content.who_we_are.features.map((f, i) => (
              <div key={i} className="who-f-item">
                <div className="who-f-icon"><span className="material-icons">{f.icon}</span></div>
                <div className="who-f-text">
                  <h4 className="f-label">{L(f, 'label')}</h4>
                  <p className="f-desc">{L(f, 'desc')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="trusted-section section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container text-center">
          <h2 className="section-title center" style={{ marginBottom: '1rem', color: '#0b2246' }}>{L(content.trusted, 'title_l1')}<br />{L(content.trusted, 'title_l2')}</h2>
          <p
            className="large-para"
            style={{ maxWidth: '650px', margin: '0 auto 4rem' }}
            dangerouslySetInnerHTML={{
              __html: (() => {
                const words = (content.trusted.highlight_words ?? [])
                  .map(w => w[language])
                  .filter(Boolean)
                  .sort((a, b) => b.length - a.length)
                  .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                const desc = L(content.trusted, 'desc');
                if (!words.length) return desc;
                return desc.replace(new RegExp(`(${words.join('|')})`, 'g'), '<strong style="color: var(--color-primary); font-weight: 700;">$1</strong>');
              })()
            }}
          />
        </div>
        <div className="marquee-outer">
          <div className="marquee-track" ref={marqueeRef}>
            {[...Array(4)].flatMap((_, rep) =>
              clients.map(c => (
                <div key={`${rep}-${c.id}`} className="marquee-card">
                  <img src={c.image} alt={c.name} />
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
              <span className="focus-label on-dark">{L(content.bento, 'label')}</span>
              <h2 className="section-title text-left" style={{ color: 'white' }}>
                {L(content.bento, 'title').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="large-para" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>{L(content.bento, 'subtitle')}</p>
              <Link to="/intelligent-chemicals" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.05rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(27,95,175,0.4)', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.3s ease' }}>{t('know_more')}</Link>
            </div>
            {content.bento.cards.map((card, i) => (
              <div key={i} className="bento-card bento-feature-card img-bento" style={{ backgroundImage: `url('${card.image}')` }}>
                <div className="bento-icon-small"><span className="material-icons">{card.icon}</span></div>
                <h4>{L(card, 'title')}</h4>
                <p>{L(card, 'desc')}</p>
              </div>
            ))}
          </div>
          <div className="intel-trust-banner">
            <div className="intel-trust-left">
              <span className="material-icons trust-shield">security</span>
              <div className="trust-text">
                <h5>{L(content.bento, 'trust_title')}</h5>
                <p>{L(content.bento, 'trust_subtitle')}</p>
              </div>
            </div>
            <div className="intel-trust-right">
              <span>{L(content.bento, 'partner_label')}</span>
              <span className="partner-logo-text">{L(content.bento, 'partner_brand')}<br /><small>{L(content.bento, 'partner_tagline')}</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section id="segments" className="verticals-section section-padding">
        <div className="container">
          <div className="verticals-header text-center">
            <span className="focus-label">{L(content.verticals, 'label')}</span>
            <h2 className="section-title">{L(content.verticals, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>{L(content.verticals, 'desc')}</p>
          </div>
          <div className="verticals-bento-grid">
            {content.verticals.cards.map((card, i) => (
              <div key={i} className={`v-card img-bento${i === 0 ? ' dark-overlay' : ''}`} style={{ backgroundImage: `url('${card.image}')` }}>
                <div className="v-content">
                  <h3>{L(card, 'title')}</h3>
                  <p>{L(card, 'desc')}</p>
                  <Link to={card.href} className="v-link">{L(card, 'link')}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{L(content.why_choose_us, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{L(content.why_choose_us, 'desc')}</p>
          </div>
          <div className="reasons-bento-grid">
            {content.why_choose_us.reasons.map((r, i) => (
              <div key={i} className={`r-card${r.large ? ' r-large' : ''}`}>
                <div className="r-img-wrapper"><img src={r.image} alt={L(r, 'title')} /></div>
                <div className="r-content-wrapper">
                  <div className="r-content">
                    <h3>{L(r, 'title')}</h3>
                    <p className="large-para">{L(r, 'desc')}</p>
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
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>{L(content.network, 'title')}</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>{L(content.network, 'desc')}</p>
          <div className="network-interactive-map">
            <img src={content.network.map_image} alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {content.network.cards.map((c, i) => (
              <div key={c.position_class ?? i} className={`map-floating-card ${c.position_class}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{L(c, 'title')}</h4>
                  <span>{L(c, 'sub')}</span>
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
            <h2 className="section-title center">{L(content.testimonials, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>{L(content.testimonials, 'desc')}</p>
          </div>
          <div className="reviews-carousel-wrapper">
            <button className="reviews-arrow reviews-arrow-prev" aria-label={t('home_aria_prev_review')} onClick={() => handleReviewArrow(-1)}>&#8592;</button>
            <div className="reviews-viewport" ref={reviewsViewportRef}>
              <div className="reviews-track">
                {reviews.map((r, i) => (
                  <div key={r.id ?? i} className="review-card">
                    <blockquote className="review-text">{L(r, 'quote')}</blockquote>
                    <div className="review-author">
                      <img src={r.image} alt={r.name} className="review-author-img" />
                      <div>
                        <div className="review-author-name">{r.name}</div>
                        <div className="review-author-title">{L(r, 'title')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="reviews-arrow reviews-arrow-next" aria-label={t('home_aria_next_review')} onClick={() => handleReviewArrow(1)}>&#8594;</button>
          </div>
          <div className="reviews-dots">
            {reviews.map((r, idx) => (
              <div
                key={r.id ?? idx}
                className={`reviews-dot${currentReview === idx ? ' active' : ''}`}
                onClick={() => {
                  setCurrentReview(idx);
                  const vp = reviewsViewportRef.current;
                  if (vp) {
                    const card = vp.querySelector('.review-card');
                    const amount = card ? card.offsetWidth + 24 : 350;
                    vp.scrollTo({ left: idx * amount, behavior: 'smooth' });
                  }
                  startReviewsAutoplay();
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">{L(content.faq, 'title')}</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>{L(content.faq, 'desc')}</p>
          </div>
          <div className="faq-container">
            {faqItems.map((item, i) => (
              <div key={item.id ?? i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className="faq-question">{L(item, 'q')}</span>
                  <span className="faq-arrow"></span>
                </button>
                <div className="faq-content">
                  <div className="faq-body"><p>{L(item, 'a')}</p></div>
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

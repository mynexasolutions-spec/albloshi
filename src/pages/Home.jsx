import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import Chatbot from '../components/Chatbot';
import { supabase } from '../lib/supabase';

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Industrial Supplies',
    title: 'Industrial Materials and Building Solutions',
    cta: 'Explore Industrial Division',
    href: '/industrial-services',
  },
  {
    bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Food Trading',
    title: 'Premium Food Distribution Across Saudi Arabia',
    cta: 'Explore Food Division',
    href: '/food-services',
  },
  {
    bg: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80',
    subtitle: 'Intelligent Chemicals',
    title: 'Intelligent Chemical Solutions for Water Treatment',
    cta: 'Explore Chemical Division',
    href: '/intelligent-chemicals',
  },
];

const FAQS = [
  {
    q: 'What critical industry sectors does Albloshi serve in Saudi Arabia?',
    a: 'We serve primary strategic industries across the Kingdom, including Oil and Gas refinery setups, heavy civil construction projects, municipal and industrial water treatment installations, central food preparation hospitality chains, and commercial manufacturing plants.',
  },
  {
    q: 'Do you supply comprehensive technical documentation such as mill certificates and MSDS?',
    a: 'Absolutely. Every industrial material shipment is backed by corresponding Mill Test Certificates (MTC) conforming to ASTM/ASME metrics. Similarly, all specialty chemicals distributed from our TELLABS alliance arrive with detailed Material Safety Data Sheets (MSDS) and technical execution sheets.',
  },
  {
    q: 'Is Albloshi an official and authorized distributor of TELLABS chemicals?',
    a: 'Yes. Mohammad Abdulla Albloshi Trading Co. is the designated, official regional distribution partner for TELLABS Intelligent Specialty Chemicals across Saudi Arabia and the broader GCC markets, offering local inventory stocking and direct technical support.',
  },
  {
    q: 'What regions of Saudi Arabia do your warehousing and logistics operations support?',
    a: 'Our central logistics headquarters and massive warehousing networks are based in Dammam, enabling direct supply execution to Al Khobar, Jubail, Qatif, Al Hassa, and surrounding Eastern Province sectors. We also offer planned enterprise freight dispatch to Riyadh and Jeddah.',
  },
  {
    q: 'Do you support specialized industrial manpower supply services?',
    a: 'Yes. We deploy highly skilled technical manpower under strictly compliant parameters. Our labor pool includes certified heavy pipe welders, industrial electricians, mechanical pipe fitters, safety inspectors, and specialized shutdown maintenance teams.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Industrial Materials', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const reviewsViewportRef = useRef(null);
  const intervalRef = useRef(null);

  const startSlideshow = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
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
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    startSlideshow();
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    startSlideshow();
  };

  const handleReviewArrow = (dir) => {
    const vp = reviewsViewportRef.current;
    if (!vp) return;
    const card = vp.querySelector('.review-card');
    const amount = card ? card.offsetWidth + 24 : 350;
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('inquiries').insert([{
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }]);
        if (error) throw error;
      }
      toast.success(`Thank you, ${form.name}! Your inquiry has been sent. Our team will contact you shortly.`);
      setForm({ name: '', email: '', phone: '', service: 'Industrial Materials', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again or contact us directly.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>ALBLOSHI – Supplying Strength Every Industry | Industrial, Chemicals, Food, and Manpower Solutions Saudi Arabia</title>
        <meta name="description" content="Mohammad Abdulla Albloshi Trading Co. is a premium multi-industry Saudi enterprise based in Dammam. Leading suppliers of industrial materials, food products, TELLABS specialty chemicals, and manpower across the GCC." />
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
        {SLIDES.map((slide, i) => (
          <div key={i} className={`slide${currentSlide === i ? ' active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: `url('${slide.bg}')` }}></div>
            <div className="slide-overlay"></div>
            <div className="container">
              <div className="slide-content">
                <h3>{slide.subtitle}</h3>
                <h1>{slide.title}</h1>
                <div className="slide-actions">
                  <Link to={slide.href} className="btn btn-primary">{slide.cta}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {SLIDES.map((_, i) => (
            <div key={i} className={`dot${currentSlide === i ? ' active' : ''}`} onClick={() => { setCurrentSlide(i); startSlideshow(); }}></div>
          ))}
        </div>
        <button className="slider-arrow slider-arrow-left" aria-label="Previous Slide" onClick={prevSlide}></button>
        <button className="slider-arrow slider-arrow-right" aria-label="Next Slide" onClick={nextSlide}></button>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="who-we-are-section section-padding">
        <div className="container">
          <div className="who-header text-center">
            <span className="focus-label">WHO WE ARE</span>
            <h2 className="section-title center">Driving Progress. Delivering Value.</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--color-body)', fontSize: '1.05rem' }}>We are a forward-thinking solutions provider delivering high-quality products and services across key industries. With deep domain expertise, a customer-first approach, and trusted partnerships, we help businesses operate smarter, safer, and more efficiently.</p>
          </div>
          <div className="who-features-grid">
            {[
              { icon: 'public', label: 'Trusted Across KSA', desc: 'Dammam Headquarters with Kingdom-wide reach.' },
              { icon: 'verified_user', label: 'ISO-Based Supply', desc: 'Strict quality-controlled international sourcing.' },
              { icon: 'local_shipping', label: 'Fast Distribution', desc: 'Advanced fleet routing for on-time delivery.' },
              { icon: 'engineering', label: 'Industrial Expertise', desc: 'Decades of collective technical knowledge.' },
            ].map(f => (
              <div key={f.icon} className="who-f-item">
                <div className="who-f-icon"><span className="material-icons">{f.icon}</span></div>
                <div className="who-f-text">
                  <h4 className="f-label">{f.label}</h4>
                  <p className="f-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="trusted-section section-padding" style={{ background: 'radial-gradient(circle at center, #f4f8ff 0%, #eaf1fa 100%)' }}>
        <div className="container text-center">
          <h2 className="section-title center" style={{ marginBottom: '1rem', color: '#0b2246' }}>Trusted by leading companies<br />around the world</h2>
          <p className="large-para" style={{ maxWidth: '700px', margin: '0 auto 3.5rem', color: '#64748b', fontSize: '1.05rem' }}>We collaborate with global leaders and trusted organizations to deliver high-quality solutions and long-term value.</p>
        </div>
        <div className="container">
          <div className="partner-scroll-wrapper">
            <div className="partner-logo-grid">
              {Array(12).fill(null).map((_, i) => (
                <div key={i} className="partner-card"><img src="/logo-png.png" alt="Albloshi Partner" /></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Chemicals Bento */}
      <section className="intel-process-section section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
        <div className="container">
          <div className="bento-grid">
            <div className="bento-card bento-header-card">
              <span className="focus-label on-dark">OUR INTELLIGENT CHEMICALS</span>
              <h2 className="section-title text-left" style={{ color: 'white' }}>Smart Chemicals.<br />Real Impact.</h2>
              <p className="large-para" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Our specialty chemicals are designed to solve complex challenges and deliver superior performance across industries.</p>
              <Link to="/intelligent-chemicals" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.05rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(27,95,175,0.4)', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.3s ease' }}>Know More</Link>
            </div>
            {[
              { img: '/images/IWT.webp', icon: 'water', title: 'Industrial Water Treatment', desc: 'Prevent scale, corrosion & microbiological growth.' },
              { img: '/images/Polymers.webp', icon: 'bubble_chart', title: 'Polymers (Coagulants & Flocculants)', desc: 'Solid liquid separation with flocculants & coagulants.' },
              { img: '/images/activated_carbon.webp', icon: 'filter_alt', title: 'Activated Carbon', desc: 'Removal of odour, colour, COD & organic impurities.' },
              { img: '/images/pulp_and_paper.webp', icon: 'waves', title: 'Antifoam & Defoamers', desc: 'Prevent & control foaming in aqueous systems.' },
              { img: '/images/cleaning_disinfection.webp', icon: 'cleaning_services', title: 'Cleaning & Disinfection', desc: 'Cleaning & hygiene in dairies, poultry & beverage.' },
              { img: '/images/Fuel_additives.webp', icon: 'local_gas_station', title: 'Fuel Additives', desc: 'Enhance fuel performance, efficiency & combustion quality.' },
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
                <h5>Quality You Can Trust. Performance You Can See.</h5>
                <p>High quality products. Consistent results. Stronger operations.</p>
              </div>
            </div>
            <div className="intel-trust-right">
              <span>Our Strategic Partner</span>
              <span className="partner-logo-text">TELLABS<br /><small>Intelligent Chemicals</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="verticals-section section-padding">
        <div className="container">
          <div className="verticals-header text-center">
            <span className="focus-label">OUR BUSINESS VERTICALS</span>
            <h2 className="section-title">Three Verticals. One Commitment.</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 4rem' }}>We operate across three key verticals, delivering value and excellence through quality products, reliable supply, and expert solutions.</p>
          </div>
          <div className="verticals-bento-grid">
            <div className="v-card img-bento dark-overlay" style={{ backgroundImage: "url('/right.png')" }}>
              <div className="v-content">
                <h3>Intelligent Chemicals</h3>
                <p>Specialty chemical solutions powered by innovation, quality, and our strategic partnership with Tellabs Chemicals.</p>
                <Link to="/intelligent-chemicals" className="v-link">Explore Chemicals</Link>
              </div>
            </div>
            <div className="v-card img-bento" style={{ backgroundImage: "url('/images/products/food_distribution.webp')" }}>
              <div className="v-content">
                <h3>Food Distribution</h3>
                <p>High volume distribution of premium food products with a strong network ensuring freshness and reliability.</p>
                <Link to="/food-services" className="v-link">Learn More</Link>
              </div>
            </div>
            <div className="v-card img-bento" style={{ backgroundImage: "url('/images/products/industrial_material_and_manpower.webp')" }}>
              <div className="v-content">
                <h3>Industrial Material &amp; Manpower Supply</h3>
                <p>Supplying critical materials and skilled manpower solutions to keep industries running efficiently and safely.</p>
                <Link to="/industrial-services" className="v-link">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Why Choose Albloshi</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>Aligning logistics precision, product compliance, and enterprise commercial transparency to deliver an elevated supply experience.</p>
          </div>
          <div className="reasons-bento-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80', title: 'Reliable Supply Chain', desc: 'By operating unified warehousing hubs and direct import pathways, Albloshi maintains continuous reserve levels of high-volume industrial and food commodities.', large: true },
              { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', title: 'Trusted Global Partners', desc: 'From our core partnership with TELLABS Specialty Chemicals to our verified mill suppliers, we maintain complete traceability and quality compliance logs.' },
              { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', title: 'Technical Expertise', desc: 'Our sales engineers, chemicals technicians, and project delivery managers have deep regulatory knowledge of Saudi Aramco, SASO, and SFDA standards.' },
              { img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80', title: 'Fast Regional Delivery', desc: 'Operating a customized logistics fleet of temperature-controlled and industrial vehicles, we execute seamless door-to-door deliveries on schedules.' },
              { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', title: 'Multi-Industry Systems', desc: 'One single enterprise vendor account provides your procurement team access to metals, specialized chemicals, bulk foods, and skilled manpower services.' },
              { img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80', title: 'Customer-Centric Support', desc: 'Every client is assigned a dedicated Account Coordinator to oversee invoice terms, dispatch schedules, custom inspections, and emergency inquiries.', large: true },
            ].map(r => (
              <div key={r.title} className={`r-card${r.large ? ' r-large' : ''}`}>
                <div className="r-img-wrapper"><img src={r.img} alt={r.title} /></div>
                <div className="r-content-wrapper">
                  <div className="r-content">
                    <h3>{r.title}</h3>
                    <p className="large-para">{r.desc}</p>
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
          <h2 className="section-title center text-white" style={{ marginBottom: '1rem' }}>Robust Saudi Distribution Network</h2>
          <p className="large-para text-white-80" style={{ maxWidth: '800px', margin: '0 auto 3.5rem' }}>Headquartered strategically in Dammam to support the industrial heartland of the Eastern Province, Albloshi operates comprehensive localized fulfillment pipelines across primary commercial hubs.</p>
          <div className="network-interactive-map">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Distribution Map" className="network-map-bg" />
            <div className="map-overlay-dark"></div>
            {[
              { cls: 'card-dammam', title: 'Dammam (HQ)', sub: 'Corporate Hub & Central Distribution' },
              { cls: 'card-khobar', title: 'Al Khobar', sub: 'Sales Office & Client Services' },
              { cls: 'card-jubail', title: 'Jubail', sub: 'Industrial Storage & Logistics' },
              { cls: 'card-other', title: 'Other Hubs', sub: 'Riyadh · Jeddah · Madinah · Makkah · Abha' },
            ].map(c => (
              <div key={c.cls} className={`map-floating-card ${c.cls}`}>
                <div className="pulse-dot"></div>
                <div className="card-content glass-card-dark">
                  <h4>{c.title}</h4>
                  <span>{c.sub}</span>
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
            <h2 className="section-title center">What Our Clients Say</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto' }}>Trusted by procurement managers, project engineers, and operations leaders across Saudi Arabia's key industries.</p>
          </div>
          <div className="reviews-carousel-wrapper">
            <button className="reviews-arrow reviews-arrow-prev" aria-label="Previous review" onClick={() => handleReviewArrow(-1)}>&#8592;</button>
            <div className="reviews-viewport" ref={reviewsViewportRef}>
              <div className="reviews-track">
                {[
                  { quote: '"Albloshi\'s carbon steel pipes and custom flanges are of exceptional mill quality. Every batch arrived with complete test certificates — an absolute bedrock of supply reliability."', name: 'Eng. Hameed Al-Subaie', title: 'Chief Procurement Officer, Gulf Construction Consortium', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80' },
                  { quote: '"Albloshi\'s food division supplied premium Basmati rice and refined cooking oils without a single shipping delay. Highly professional service that keeps our kitchens running perfectly."', name: 'Sarah Chowdhury', title: 'Executive Operations Manager, Oasis Foodservice Group', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80' },
                  { quote: '"Partnering with Albloshi for TELLABS chemicals gave us immediate local inventory access and on-site consultation. The activated carbon filters have performed flawlessly, significantly lowering BOD levels."', name: 'Dr. Faisal Al-Qahtani', title: 'Technical Operations Director, Eastern Chemical Systems', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80' },
                  { quote: '"Their robust distribution network across Saudi Arabia ensures that our facilities in Jubail and Riyadh never face downtime due to material shortages."', name: 'Omar Al-Rashid', title: 'Director of Manufacturing, ALR Industries', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=60&q=80' },
                  { quote: '"A single vendor solution that actually works. Managing our procurement for both heavy industrial components and hospitality foods has never been easier."', name: 'Layla Hassan', title: 'Procurement Lead, Saudi Hospitality Corp', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=60&q=80' },
                ].map(r => (
                  <div key={r.name} className="review-card">
                    <blockquote className="review-text">{r.quote}</blockquote>
                    <div className="review-author">
                      <img src={r.img} alt={r.name} className="review-author-img" />
                      <div>
                        <div className="review-author-name">{r.name}</div>
                        <div className="review-author-title">{r.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="reviews-arrow reviews-arrow-next" aria-label="Next review" onClick={() => handleReviewArrow(1)}>&#8594;</button>
          </div>
        </div>
      </section>

      {/* About Tellabs */}
      <section id="partner" className="about-partner-section section-padding">
        <div className="container">
          <div className="about-partner-wrapper">
            <div className="about-partner-split">
              <div className="about-partner-image">
                <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80" alt="Modern Chemical Laboratory" />
                <div className="about-partner-img-overlay">
                  <span className="material-icons">science</span>
                  <span>Advanced R&amp;D Facility</span>
                </div>
              </div>
              <div className="about-partner-content-side">
                <div className="about-partner-header">
                  <span className="focus-label">OUR PARTNER</span>
                  <h2 className="section-title text-left" style={{ marginBottom: '1rem' }}>About Tellabs Chemicals</h2>
                  <p className="large-para" style={{ marginBottom: '2.5rem' }}>We are committed to providing high-quality and innovative solutions to our customers, continuously improving our specialty chemical products and services.</p>
                </div>
                <div className="about-partner-features">
                  {[
                    { icon: 'factory', title: 'Manufacturer & Exporter', desc: 'With our commitment to quality and customer satisfaction, we have built a strong reputation as a leading manufacturer of specialty chemicals.' },
                    { icon: 'biotech', title: 'Sophisticated R&D Center', desc: 'Our state-of-the-art laboratory enables us to continuously develop high-quality chemical products using cutting-edge technologies.' },
                    { icon: 'science', title: 'Extensive Product Range', desc: 'Our portfolio includes Water Treatment chemicals, Polyelectrolytes, Defoamers, Activated Carbon, Hygiene solutions, and Fuel Additives.' },
                  ].map(f => (
                    <div key={f.title} className="about-p-feature">
                      <div className="about-p-icon"><span className="material-icons">{f.icon}</span></div>
                      <div className="about-p-text">
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team-section section-padding">
        <div className="container">
          <div className="text-center">
            <span className="focus-label">OUR LEADERSHIP</span>
            <h2 className="section-title center">Executive Management Team</h2>
            <p className="large-para" style={{ maxWidth: '650px', margin: '0 auto 3.5rem' }}>Our leadership team steers Albloshi toward sustainable industrial innovation and robust supply chain solutions across Saudi Arabia.</p>
          </div>
          <div className="team-grid">
            {[
              { id: 1, name: 'Mohammad Abdulla Albloshi', role: 'Chairman & Founder', bio: 'Steering the strategic vision and long-term growth of the company across KSA\'s key industrial sectors.' },
              { id: 2, name: 'Mohammad Riaz', role: 'Business Development Manager', bio: 'Leading enterprise growth and strategic partnerships, including our exclusive alliance with TELLABS chemicals.' },
              { id: 3, name: 'Eng. Fahad Al-Mutairi', role: 'Director of Operations & Logistics', bio: 'Directing logistics operations, warehousing networks, and quality compliance logs across all supply divisions.' },
            ].map(m => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  <svg className="team-img default-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`avatarGrad${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                      <linearGradient id={`primaryGrad${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1B5FAF" />
                        <stop offset="100%" stopColor="#0b2246" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="100" fill={`url(#avatarGrad${m.id})`} />
                    <circle cx="50" cy="40" r="18" fill={`url(#primaryGrad${m.id})`} opacity="0.85" />
                    <path d="M20 80C20 63.43 33.43 50 50 50C66.57 50 80 63.43 80 80V85H20V80Z" fill={`url(#primaryGrad${m.id})`} opacity="0.85" />
                  </svg>
                </div>
                <div className="team-info">
                  <h3>{m.name}</h3>
                  <div className="team-role">{m.role}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title center">Frequently Asked Questions</h2>
            <p className="large-para" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>Clear, transparent answers to help guide your procurement or chemical operations partnership with Albloshi.</p>
          </div>
          <div className="faq-container">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-arrow"></span>
                </button>
                <div className="faq-content">
                  <div className="faq-body"><p>{faq.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h3>Enterprise Sales Inquiry</h3>
              <p className="large-para" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>Please submit your details and project specifications below. Our business development team will analyze your request and reply within one business day.</p>
              <form id="companyInquiryForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="formName" className="form-label">Full Name *</label>
                  <input type="text" id="formName" className="form-input" required placeholder="e.g. Mohammad Al-Harbi" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="formEmail" className="form-label">Business Email *</label>
                    <input type="email" id="formEmail" className="form-input" required placeholder="name@yourcompany.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="formPhone" className="form-label">Mobile / WhatsApp *</label>
                    <input type="tel" id="formPhone" className="form-input" required placeholder="+966 5X XXX XXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="formService" className="form-label">Required Division</label>
                  <select id="formService" className="form-select" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                    <option value="Industrial Materials">Industrial Materials and Building Solutions</option>
                    <option value="Food Distribution">Wholesale Food Distribution</option>
                    <option value="TELLABS Chemicals">TELLABS specialty Chemicals</option>
                    <option value="Manpower Supply">Manpower Supply Services</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formMessage" className="form-label">Additional Information</label>
                  <textarea id="formMessage" className="form-textarea" placeholder="Any additional details, quantities, specifications, or questions..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none' }} disabled={submitting}>
                  {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            <div className="contact-info-panel">
              <h2 className="section-title">Connect With Our Corporate Offices</h2>
              <p className="large-para">Connect directly with our headquarters or division directors to arrange technical consultation or obtain direct credit accounts.</p>
              <div className="contact-card-list">
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">phone_in_talk</span>
                  <div className="contact-card-details">
                    <h4>Business Development Office</h4>
                    <p>Mohammad Riaz — Business Development Manager</p>
                    <p>Mobile / WhatsApp: <a href="https://wa.me/966549581547" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '700' }}>+966 54 958 1547</a></p>
                  </div>
                </div>
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">mail_outline</span>
                  <div className="contact-card-details">
                    <h4>General Sales Desk</h4>
                    <p>Email: <a href="mailto:sales@albloshi.co">sales@albloshi.co</a></p>
                    <p>Website: <a href="https://albloshi.co" target="_blank" rel="noopener noreferrer">https://albloshi.co</a></p>
                  </div>
                </div>
                <div className="contact-card-item">
                  <span className="contact-card-icon material-icons">location_on</span>
                  <div className="contact-card-details">
                    <h4>Dammam Headquarters Address</h4>
                    <p>5250, Al Nidal 7372, Ash Shulah Dist.,</p>
                    <p>Dammam 34261, Kingdom of Saudi Arabia</p>
                  </div>
                </div>
              </div>
              <div className="contact-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Commercial Registry</span>
                  <span className="meta-value">7049763092</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">National Address Code</span>
                  <span className="meta-value">EAPB5250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />
      <Chatbot />
    </>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const fmt = (iso, language) =>
  new Date(iso).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const readTime = (html) => {
  const words = (html || '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export default function Blog() {
  const { t, language } = useLanguage();
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [activeCat, setActiveCat] = useState('all');

  const L = (post, field) => (language === 'ar' && post[`${field}_ar`]) ? post[`${field}_ar`] : post[field];

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('blogs')
      .select('id, title, title_ar, slug, excerpt, excerpt_ar, content, content_ar, cover_image, cover_image_ar, cover_image_alt, cover_image_alt_ar, category, published_at, created_at, author')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [...new Set(posts.map(p => p.category).filter(Boolean))],
    [posts]
  );

  const filtered = activeCat === 'all' ? posts : posts.filter(p => p.category === activeCat);

  return (
    <>
      <Helmet>
        <title>{t('blog_meta_title')}</title>
        <meta name="description" content={t('blog_meta_desc')} />
      </Helmet>

      <Header />

      {/* Banner */}
      <section className="blog-banner">
        <div className="blog-banner-overlay"></div>
        <div className="container">
          <div className="blog-banner-content">
            <span className="blog-banner-kicker">{t('blog_banner_kicker')}</span>
            <h1>{t('blog_banner_title_before')} <span style={{ fontFamily: 'var(--font-sans)' }}>&amp;</span> {t('blog_banner_title_after')}</h1>
            <p>{t('blog_banner_desc')}</p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="blog-section section-padding">
        <div className="container">

          {/* Dynamic posts from admin */}
          {!loading && posts.length > 0 && (
            <>
              <div className="blog-section-head">
                <h2 className="section-title">{t('blog_latest_posts')}</h2>
                {categories.length > 1 && (
                  <div className="blog-filter-row">
                    <button
                      className={`blog-filter-pill ${activeCat === 'all' ? 'is-active' : ''}`}
                      onClick={() => setActiveCat('all')}
                    >
                      {t('blog_filter_all')}
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`blog-filter-pill ${activeCat === cat ? 'is-active' : ''}`}
                        onClick={() => setActiveCat(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="blog-grid" style={{ marginBottom: '3.5rem' }}>
                {filtered.map(post => (
                  <article key={post.id} className="blog-card">
                    <Link to={`/blog/${post.slug}`} className="blog-card-img-wrapper">
                      <img
                        src={L(post, 'cover_image') || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                        alt={L(post, 'cover_image_alt') || L(post, 'title')}
                        className="blog-card-img"
                      />
                      {post.category && <span className="blog-card-tag">{post.category}</span>}
                    </Link>
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span>{fmt(post.published_at || post.created_at, language)}</span>
                        <span className="meta-divider">•</span>
                        <span>{readTime(L(post, 'content'))} {t('bp_read_time')}</span>
                      </div>
                      <h3><Link to={`/blog/${post.slug}`}>{L(post, 'title')}</Link></h3>
                      {L(post, 'excerpt') && <p>{L(post, 'excerpt')}</p>}
                      <Link to={`/blog/${post.slug}`} className="blog-card-btn">{t('blog_read_article')}</Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem 0 3rem', color: '#94a3b8', fontSize: '0.95rem' }}>
              {t('blog_loading')}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8', fontSize: '0.95rem' }}>
              {t('blog_empty')}
            </div>
          )}

        </div>
      </section>

      {/* Blog CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{t('blog_cta_title')}</h2>
                <p>{t('blog_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('blog_cta_btn1')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('blog_cta_btn2')}</Link>
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

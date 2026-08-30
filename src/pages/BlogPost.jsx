import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const SITE_URL = 'https://albloshi.co';

const fmt = (iso, language) =>
  new Date(iso).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const optimizeImgUrl = (url) => {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
};

const readTime = (html) => {
  const words = (html || '').replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const L = (post, field, language) => (language === 'ar' && post[`${field}_ar`]) ? post[`${field}_ar`] : post[field];

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.965-1.404A9.953 9.953 0 0 0 12.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.111a8.075 8.075 0 0 1-4.363-1.279l-.313-.187-3.048.862.827-2.99-.204-.31A8.073 8.073 0 0 1 3.889 12c0-4.472 3.639-8.111 8.112-8.111 4.472 0 8.111 3.639 8.111 8.111 0 4.473-3.639 8.111-8.111 8.111z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function BlogPost() {
  const { t, language } = useLanguage();
  const { slug } = useParams();
  const [post,     setPost]     = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!supabase) { setNotFound(true); setLoading(false); return; }
    setPost(null); setLoading(true); setNotFound(false);
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); setLoading(false); return; }
        setPost(data);
        setLoading(false);
        if (data.category) {
          supabase
            .from('blogs')
            .select('id, title, title_ar, slug, excerpt, excerpt_ar, content, content_ar, cover_image, cover_image_ar, cover_image_alt, cover_image_alt_ar, category, published_at, created_at')
            .eq('status', 'published')
            .eq('category', data.category)
            .neq('slug', slug)
            .order('published_at', { ascending: false })
            .limit(3)
            .then(({ data: rel }) => setRelated(rel ?? []));
        }
      });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (el.scrollTop / scrollable) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        {t('bp_loading')}
      </div>
      <Footer />
    </>
  );

  if (notFound) return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <span className="material-icons" style={{ fontSize: '3rem', color: '#cbd5e1' }}>article</span>
        <h2 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 700 }}>{t('bp_not_found')}</h2>
        <Link to="/blog" style={{ color: '#1B5FAF', fontWeight: 600 }}>{t('bp_back_to_blog_arrow')}</Link>
      </div>
      <Footer />
    </>
  );

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const title       = L(post, 'title', language);
  const excerpt     = L(post, 'excerpt', language);
  const content     = L(post, 'content', language);
  const coverImage  = L(post, 'cover_image', language);
  const coverAlt    = L(post, 'cover_image_alt', language) || title;
  const seoTitle    = L(post, 'seo_title', language) || title;
  const seoDesc     = L(post, 'seo_description', language) || excerpt;
  const ogImage     = L(post, 'og_image', language) || coverImage;
  const shareText   = seoTitle;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    x:        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success(t('bp_link_copied'));
    } catch {
      toast.error(postUrl);
    }
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle} | Albloshi Trading Co.</title>
        <meta name="description" content={seoDesc || ''} />
        {L(post, 'seo_keywords', language) && <meta name="keywords" content={L(post, 'seo_keywords', language)} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:title"       content={seoTitle} />
        <meta property="og:description" content={seoDesc || ''} />
        <meta property="og:type"        content="article" />
        <link rel="canonical" href={postUrl} />
      </Helmet>

      {/* Reading progress bar */}
      <div className="bp-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <Header />

      {/* Hero */}
      <section className="bp-hero-solid">
        <div className="container bp-hero-inner">
          <nav className="bp-breadcrumb">
            <Link to="/">{t('bp_breadcrumb_home')}</Link>
            <span className="material-icons">chevron_right</span>
            <Link to="/blog">{t('bp_breadcrumb_blog')}</Link>
            <span className="material-icons">chevron_right</span>
            <span className="bp-breadcrumb-current">{title}</span>
          </nav>

          <div className="bp-pills">
            <span className="bp-pill">
              <span className="material-icons">calendar_today</span>
              {fmt(post.published_at || post.created_at, language)}
            </span>
            <span className="bp-pill">
              <span className="material-icons">schedule</span>
              {readTime(content)} {t('bp_read_time')}
            </span>
          </div>

          <h1 className="bp-title">{title}</h1>
        </div>
      </section>

      <article className="bp-article">
        <div className="bp-card">

          {/* Cover image — shown in full, never cropped */}
          {coverImage && (
            <div className="bp-card-img-wrap">
              <img src={optimizeImgUrl(coverImage)} alt={coverAlt} />
            </div>
          )}

          {/* Category + author */}
          <div className="bp-card-meta-row">
            {post.category && <span className="bp-badge">{post.category}</span>}
            <span className="bp-card-author">{post.author || t('bp_default_author')}</span>
          </div>

          {/* Share row */}
          <div className="bp-share-row">
            <span className="bp-share-label">{t('bp_share')}</span>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="bp-share-btn bp-share-whatsapp" title="WhatsApp">
              <IconWhatsApp />
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bp-share-btn bp-share-linkedin" title="LinkedIn">
              <IconLinkedIn />
            </a>
            <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="bp-share-btn bp-share-x" title="X / Twitter">
              <IconX />
            </a>
            <button type="button" onClick={copyLink} className="bp-share-btn bp-share-copy" title="Copy link">
              <span className="material-icons">link</span>
            </button>
          </div>

          {/* Excerpt / lede */}
          {excerpt && <p className="bp-lede">{excerpt}</p>}

          {/* Content */}
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: content || '' }} />

          {/* Back link */}
          <div className="bp-backlink">
            <Link to="/blog">
              <span className="material-icons">arrow_back</span>
              {t('bp_back_to_blog')}
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bp-related">
          <div className="container">
            <h2 className="bp-related-title">{t('bp_related_title')}</h2>
            <div className="blog-grid bp-related-grid">
              {related.map(r => (
                <article key={r.id} className="blog-card">
                  <Link to={`/blog/${r.slug}`} className="blog-card-img-wrapper">
                    <img
                      src={L(r, 'cover_image', language) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                      alt={L(r, 'cover_image_alt', language) || L(r, 'title', language)}
                      className="blog-card-img"
                    />
                    {r.category && <span className="blog-card-tag">{r.category}</span>}
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{fmt(r.published_at || r.created_at, language)}</span>
                      <span className="meta-divider">•</span>
                      <span>{readTime(L(r, 'content', language))} {t('bp_read_time')}</span>
                    </div>
                    <h3><Link to={`/blog/${r.slug}`}>{L(r, 'title', language)}</Link></h3>
                    {L(r, 'excerpt', language) && <p>{L(r, 'excerpt', language)}</p>}
                    <Link to={`/blog/${r.slug}`} className="blog-card-btn">{t('blog_read_article')}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <div className="blog-cta-inner">
              <div className="blog-cta-text">
                <h2>{t('bp_cta_title')}</h2>
                <p>{t('bp_cta_desc')}</p>
              </div>
              <div className="blog-cta-actions">
                <Link to="/contact" className="btn btn-primary">{t('bp_cta_btn')}</Link>
                <Link to="/#segments" className="btn btn-outline">{t('bp_cta_btn2')}</Link>
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

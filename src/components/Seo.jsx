import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE = 'https://www.albloshi.co';

// Site-wide canonical URL: one preferred https/www URL per page, no query string, hash or trailing slash.
// Admin screens are kept out of search results.
export default function Seo() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

  if (path === '/admin' || path.startsWith('/admin/')) {
    return <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>;
  }
  return (
    <Helmet>
      <link rel="canonical" href={SITE + path} />
      {/* Landing pages stay indexable (SEO audit passes, AdsBot can always read them); they are not in the sitemap. */}
    </Helmet>
  );
}

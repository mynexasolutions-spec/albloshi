import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import Home from './pages/Home';
import Seo from './components/Seo';
import CookieConsent from './components/CookieConsent';
import { initAnalytics, trackPageView } from './lib/analytics';
import { loaders } from './lib/lazyPages';
import LandingPage from './pages/LandingPage';

import { AuthProvider } from './contexts/AuthContext';

// Admin is code-split: nothing from src/pages/admin ships in the public bundle.
const AdminRoutes = lazy(loaders.AdminRoutes);

// Everything except Home / landing pages is its own chunk (see src/lib/lazyPages.js).
const Blog = lazy(loaders.Blog);
const BlogPost = lazy(loaders.BlogPost);
const About = lazy(loaders.About);
const IndustrialServices = lazy(loaders.IndustrialServices);
const FoodServices = lazy(loaders.FoodServices);
const IntelligentChemicals = lazy(loaders.IntelligentChemicals);
const TellabsChemicals = lazy(loaders.TellabsChemicals);
const Contact = lazy(loaders.Contact);
const ManpowerSupply = lazy(loaders.ManpowerSupply);
const RiceProducts = lazy(loaders.RiceProducts);
const OilProducts = lazy(loaders.OilProducts);
const PrivacyPolicy = lazy(loaders.PrivacyPolicy);
const Terms = lazy(loaders.Terms);
const Chatbot = lazy(loaders.Chatbot);

function ChatbotGate() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);
  // The chatbot is not needed for first paint: load it after the page has settled.
  useEffect(() => {
    const start = () => setReady(true);
    const t = setTimeout(() => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 3000 }) : start()), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!ready || pathname.startsWith('/admin') || pathname.startsWith('/lp/')) return null;
  return <Suspense fallback={null}><Chatbot /></Suspense>;
}

// Reports SPA navigations to GTM (the first load is reported by GTM itself). Admin pages are never tracked.
function PageViewTracker() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!pathname.startsWith('/admin')) trackPageView(pathname);
  }, [pathname]);
  return null;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // content-visibility (perf) estimates the height of skipped sections; switch it off so the anchor lands exactly
      document.documentElement.classList.add('no-cv');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToHash />
            <PageViewTracker />
            <Seo />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: { fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' },
              }}
            />
            <Suspense fallback={null}>
            <Routes>
              {/* Public site */}
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/industrial-services" element={<IndustrialServices />} />
              <Route path="/food-services" element={<FoodServices />} />
              <Route path="/rice-products" element={<RiceProducts />} />
              <Route path="/oil-products" element={<OilProducts />} />
              <Route path="/intelligent-chemicals" element={<IntelligentChemicals />} />
              <Route path="/tellabs-chemicals" element={<TellabsChemicals />} />
              <Route path="/manpower-supply" element={<ManpowerSupply />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/lp/:slug" element={<LandingPage />} />

              {/* Admin (lazy-loaded chunk) */}
              <Route path="/admin/*" element={<Suspense fallback={null}><AdminRoutes /></Suspense>} />
            </Routes>
            </Suspense>
            <ChatbotGate />
            <CookieConsent />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

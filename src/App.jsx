import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import IndustrialServices from './pages/IndustrialServices';
import FoodServices from './pages/FoodServices';
import IntelligentChemicals from './pages/IntelligentChemicals';
import TellabsChemicals from './pages/TellabsChemicals';
import Contact from './pages/Contact';
import ManpowerSupply from './pages/ManpowerSupply';
import RiceProducts from './pages/RiceProducts';
import OilProducts from './pages/OilProducts';
import Chatbot from './components/Chatbot';

import { AuthProvider } from './contexts/AuthContext';
import AdminGuard from './components/admin/AdminGuard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHomeContent from './pages/admin/AdminHomeContent';
import AdminTeam from './pages/admin/AdminTeam';
import AdminIndustrialContent from './pages/admin/AdminIndustrialContent';
import AdminFoodContent from './pages/admin/AdminFoodContent';
import AdminChemicalsContent from './pages/admin/AdminChemicalsContent';
import AdminManpowerContent from './pages/admin/AdminManpowerContent';
import AdminContactSettings from './pages/admin/AdminContactSettings';
import AdminTellabsContent from './pages/admin/AdminTellabsContent';
import AdminAboutContent from './pages/admin/AdminAboutContent';
import AdminLeads from './pages/admin/AdminLeads';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';

function ChatbotGate() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  return <Chatbot />;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
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
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToHash />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: { fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' },
              }}
            />
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

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/home" element={<AdminGuard><AdminHomeContent /></AdminGuard>} />
              <Route path="/admin/team" element={<AdminGuard><AdminTeam /></AdminGuard>} />
              <Route path="/admin/verticals/industrial" element={<AdminGuard><AdminIndustrialContent /></AdminGuard>} />
              <Route path="/admin/verticals/food" element={<AdminGuard><AdminFoodContent /></AdminGuard>} />
              <Route path="/admin/verticals/chemicals" element={<AdminGuard><AdminChemicalsContent /></AdminGuard>} />
              <Route path="/admin/verticals/manpower" element={<AdminGuard><AdminManpowerContent /></AdminGuard>} />
              <Route path="/admin/settings" element={<AdminGuard><AdminContactSettings /></AdminGuard>} />
              <Route path="/admin/verticals/tellabs" element={<AdminGuard><AdminTellabsContent /></AdminGuard>} />
              <Route path="/admin/verticals/about" element={<AdminGuard><AdminAboutContent /></AdminGuard>} />
              <Route path="/admin/leads" element={<AdminGuard><AdminLeads /></AdminGuard>} />
              <Route path="/admin/blogs" element={<AdminGuard><AdminBlogs /></AdminGuard>} />
              <Route path="/admin/blogs/new" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />
              <Route path="/admin/blogs/:id" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />
            </Routes>
            <ChatbotGate />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

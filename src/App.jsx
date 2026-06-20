import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import IndustrialServices from './pages/IndustrialServices';
import FoodServices from './pages/FoodServices';
import IntelligentChemicals from './pages/IntelligentChemicals';
import TellabsChemicals from './pages/TellabsChemicals';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';

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

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: { fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/industrial-services" element={<IndustrialServices />} />
          <Route path="/food-services" element={<FoodServices />} />
          <Route path="/intelligent-chemicals" element={<IntelligentChemicals />} />
          <Route path="/tellabs-chemicals" element={<TellabsChemicals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </HelmetProvider>
  );
}

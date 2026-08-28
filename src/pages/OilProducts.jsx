import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterBar from '../components/MobileFooterBar';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useLanguage } from '../contexts/LanguageContext';

const OIL_PRODUCTS = [
  {
    id: 'palm-olein',
    img: '/images/food_services/Palm_Olein_Oil.webp',
    tagKey: 'food_prod11_tag',
    titleKey: 'food_prod11_title',
    descKey: 'food_prod11_desc',
    specKeys: ['food_prod11_spec1', 'food_prod11_spec2', 'food_prod11_spec3', 'food_prod11_spec4']
  }
];

export default function OilProducts() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Helmet>
        <title>Premium Cooking Oils | Mohammed Abdullah Al-Bloshi Co</title>
        <meta name="description" content="Explore our high-quality cooking oils, including refined palm olein oil for catering, commercial kitchens, and food manufacturing across KSA." />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, rgba(9, 20, 45, 0.85) 0%, rgba(5, 80, 50, 0.70) 100%), url(https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="container">
          <h1>Premium Refined<br />Cooking Oils</h1>
          <p>High-grade refined vegetable oils with excellent stability, high smoke point, and neutral taste for all industrial and catering cooking needs.</p>
        </div>
      </section>

      {/* Products */}
      <section className="products-section section-padding">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <Link to="/food-services" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <span className="material-icons">arrow_back</span>
              Back to Food Products
            </Link>
            <h2 className="section-title center">Our Cooking Oil Selection</h2>
          </div>
          <div className="products-grid">
            {OIL_PRODUCTS.map(p => (
              <div key={p.id} className="product-block" id={p.id}>
                <div style={{ position: 'relative' }}>
                  <img src={p.img} alt={t(p.titleKey)} className="product-block-img" style={{ aspectRatio: '1/1' }} />
                </div>
                <div className="product-block-body" style={{ padding: '1.25rem' }}>
                  <span className="product-block-tag">{t(p.tagKey)}</span>
                  <h3>{t(p.titleKey)}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', flexDirection: 'row' }}>
                    <button 
                      onClick={() => setSelectedProduct({
                        title: t(p.titleKey),
                        desc: t(p.descKey),
                        tag: t(p.tagKey),
                        img: p.img,
                        specs: p.specKeys.map(sk => t(sk))
                      })}
                      className="product-block-btn" 
                      style={{ background: 'transparent', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      Read More
                    </button>
                    <a href="/contact" className="product-block-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}>
                      <span className="material-icons" style={{ fontSize: '1rem', marginRight: '4px' }}>mail_outline</span>
                      {t('food_get_quote')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileFooterBar />
      <WhatsAppFloat />

      {selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 9999, padding: '1rem'
        }}>
          <style>{`
            .modern-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .modern-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.05); 
              border-radius: 10px;
              margin: 4px;
            }
            .modern-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.2); 
              border-radius: 10px;
            }
            .modern-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 0, 0, 0.35); 
            }
          `}</style>
          <div className="modern-scrollbar" style={{
            background: '#fff', borderRadius: '16px', overflow: 'hidden', 
            maxWidth: '600px', width: '100%', maxHeight: '90vh', 
            overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <button 
              onClick={() => setSelectedProduct(null)} 
              style={{
                position: 'absolute', top: '1rem', right: '1rem', 
                background: 'rgba(255, 255, 255, 0.9)', border: 'none', 
                borderRadius: '50%', width: '36px', height: '36px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <span className="material-icons" style={{ color: '#333' }}>close</span>
            </button>
            <div style={{ padding: '2rem' }}>
              <span className="product-block-tag" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{selectedProduct.tag}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>{selectedProduct.title}</h3>
              <p style={{ color: 'var(--color-body)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{selectedProduct.desc}</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '0.75rem' }}>Specifications & Features</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProduct.specs.map(sk => <span key={sk} className="spec-chip" style={{ margin: 0 }}>{sk}</span>)}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <a href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem 3rem' }}>
                  <span className="material-icons" style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>mail_outline</span>
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

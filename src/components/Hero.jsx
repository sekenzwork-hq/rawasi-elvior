import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({
  scrollToSection,
  setSelectedProduct,
  PRODUCTS,
  perfume1,
  crestLogo,
  logoPng,
  pOud,
  pNoir
}) {
  return (
    <section id="home" className="hero">
      <div className="hero-spotlight"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-subtitle-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={logoPng} alt="Maison Logo" style={{ width: '300px', height: '300px', objectFit: 'contain', filter: 'drop-shadow(0 2px 15px rgba(203, 161, 83, 0.35))' }} />
              <span className="hero-subtitle">Discover our bestseller</span>
            </div>
            <h1 className="hero-title">
              Crafted for a <br />
              <span className="text-gradient-gold">Bold First Impression.</span> <br />

            </h1>
            <p className="hero-desc">
              Elevate your presence with Rawasi Elvior’s signature collection of ultra-luxurious fragrances. Handcrafted using rare oils, aged agarwood, and exotic spices, each bottle represents the peak of modern scent artistry.
            </p>
            <div className="hero-cta-group">
              <button className="hero-btn-primary" onClick={() => scrollToSection('shop')}>
                Discover Collection <ArrowRight size={14} />
              </button>
              <button className="hero-btn-secondary" onClick={() => scrollToSection('about')}>
                Our Story
              </button>
            </div>
          </div>

          <div className="hero-images">
            <div className="hero-main-img" onClick={() => scrollToSection('shop')}>
              <img src={perfume1} className="hero-img-bg" alt="Luxury Perfume Spraying" />
              <div className="hero-main-bottom-gradient"></div>

            </div>

            <div className="hero-side-imgs">
              <div className="hero-side-img">
                <img src={pOud} className="hero-img-bg" alt="Rawasi Oud Bottle" />
              </div>
              <div className="hero-side-img">
                <img src={pNoir} className="hero-img-bg" alt="Rawasi Noir Bottle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

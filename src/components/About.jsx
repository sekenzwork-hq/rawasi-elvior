import React from 'react';

export default function About({
  scrollToSection,
  pRose
}) {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="hero-subtitle-wrap">
              <div className="hero-subtitle-line"></div>
              <span className="hero-subtitle">Our Heritage</span>
            </div>
            <h2>
              Crafting Legacies, <br />
              <span className="text-gradient-gold">One Note</span> at a Time.
            </h2>
            <p>
              Rawasi Elvior was founded on a simple philosophy: fragrance should not just be smelled; it should be remembered. Our heritage is anchored in traditional perfumery techniques passed down through generations, enhanced by cutting-edge modern science.
            </p>
            <p className="small">
              Every single bottle of Rawasi is individually hand-polished, numbered, and filled in small batches to preserve the pure strength and complexity of our precious ingredients.
            </p>
            <button className="about-btn" onClick={() => scrollToSection('contact')}>
              Concierge Bespoke Services
            </button>
          </div>

          <div className="about-img">
            <img src={pRose} alt="Rose Petals & Perfume" />
            <div className="about-img-gradient"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

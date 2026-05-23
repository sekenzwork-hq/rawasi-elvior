import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({
  activeSection,
  scrollToSection,
  setIsCartOpen,
  getCartCount,
  mobileMenuOpen,
  setMobileMenuOpen,
  logoPng
}) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <img src={logoPng} alt="Rawasi Logo" style={{ marginRight: '0.75rem' }} />
          <div className="navbar-brand-text" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1.2' }}>
            <span className="brand-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.15em', color: 'var(--color-gold-light)' }}>RAWASI ELVIOR</span>
            <span className="brand-subtitle" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', fontWeight: '600', letterSpacing: '0.25em', color: 'rgba(253, 251, 247, 0.5)', marginTop: '2px' }}>LUXURY PERFUMES</span>
          </div>
        </div>

        <div className="navbar-links">
          <button
            className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            HOME
          </button>
          <button
            className={`navbar-link ${activeSection === 'shop' ? 'active' : ''}`}
            onClick={() => scrollToSection('shop')}
          >
            SHOP
          </button>
          <button
            className={`navbar-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            ABOUT
          </button>
          <button
            className={`navbar-link ${activeSection === 'journal' ? 'active' : ''}`}
            onClick={() => scrollToSection('journal')}
          >
            JOURNAL
          </button>
          <button
            className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            CONTACT
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={16} color="#CBA153" />
            <span className="cart-text text-gradient-gold">CART</span>
            <span className="cart-badge">{getCartCount()}</span>
          </button>

          {/* Mobile Menu Icon */}
          <div
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-navbar-menu animate-fade-in">
          <button
            className={`mobile-navbar-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            HOME
          </button>
          <button
            className={`mobile-navbar-link ${activeSection === 'shop' ? 'active' : ''}`}
            onClick={() => scrollToSection('shop')}
          >
            SHOP
          </button>
          <button
            className={`mobile-navbar-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            ABOUT
          </button>
          <button
            className={`mobile-navbar-link ${activeSection === 'journal' ? 'active' : ''}`}
            onClick={() => scrollToSection('journal')}
          >
            JOURNAL
          </button>
          <button
            className={`mobile-navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            CONTACT
          </button>
        </div>
      )}
    </nav>
  );
}

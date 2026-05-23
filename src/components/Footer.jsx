import React from 'react';

export default function Footer({
  logoPng,
  scrollToSection
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col-main">
            <img src={logoPng} className="footer-logo" alt="Rawasi Logo Light" />
            <p className="footer-desc">
              Crafting memories, elevating personal presentation, and defining luxury fragrances since inception. Designed in Dubai, shared with the world.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Maison</h4>
            <ul>
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('shop')}>Collection</button></li>
              <li><button onClick={() => scrollToSection('about')}>Our Story</button></li>
              <li><button onClick={() => scrollToSection('journal')}>Journal</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><button onClick={() => scrollToSection('contact')}>Concierge</button></li>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#care">Scent Care Guide</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rawasi Elvior. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

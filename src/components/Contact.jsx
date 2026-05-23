import React from 'react';

export default function Contact({
  handleContactSubmit,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  contactSubmitted,
  handleNewsletterSubmit,
  newsletterEmail,
  setNewsletterEmail,
  isNewsletterSubscribed
}) {
  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info">
              <div>
                <div className="hero-subtitle-wrap">
                  <div className="hero-subtitle-line"></div>
                  <span className="hero-subtitle">Get In Touch</span>
                </div>
                <h2>Connect with the Maison</h2>
                <p>For custom formulation requests, event bookings, wholesale, or product support, contact our elite concierge desk.</p>
              </div>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <h4>Maison Address</h4>
                  <p>Maison Rawasi, Boulevard of Luxury, Dubai, UAE</p>
                </div>
                <div className="contact-detail-item">
                  <h4>Concierge Email</h4>
                  <p>bespoke@rawasi.com</p>
                </div>
                <div className="contact-detail-item">
                  <h4>Direct Line</h4>
                  <p>+971 4 000 0000</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Alexander Mercer" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="alexander@mercer.com" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">How can we assist you?</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="I am interested in a private blending session..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={contactSubmitted}>
                {contactSubmitted ? 'SUBMITTING MESSAGE...' : 'SEND INQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-bg"></div>
        <div className="newsletter-glow"></div>
        <div className="newsletter-content">
          <div className="newsletter-panel">
            <h2>Maison Membership</h2>
            <p>Subscribe to receive priority access to small-batch launches, private collection previews, and insights from our perfumery team.</p>
            
            {isNewsletterSubscribed ? (
              <div style={{ color: '#CBA153', fontWeight: '600' }} className="animate-scale-up">
                Thank you for subscribing! Your priority invitation will arrive soon.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required 
                />
                <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

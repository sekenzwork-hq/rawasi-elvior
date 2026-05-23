import React, { useState, useEffect } from 'react';

// Import Assets
import crestLogo from './assets/hero.png'; // Using hero.png as crest
import logoPng from './assets/logo.png';
import perfume1 from './assets/perfume1.png';
import perfume2 from './assets/perfume2.png';
import perfume3 from './assets/perfume3.png';
import perfume4 from './assets/perfume4.png';
import perfume5 from './assets/perfume5.png';
import perfume6 from './assets/perfume6.png';

// Import Modular Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import About from './components/About';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

const PRODUCTS = [
  {
    id: 'oud',
    name: 'Rawasi Oud',
    price: 240.00,
    rating: 4.9,
    reviewsCount: 180,
    image: perfume1,
    description: 'An exquisite blend of aged Agarwood, spiced amber, and rich Damascus Rose. Crafted for those who command presence and appreciate the deep heritage of Eastern perfumery.',
    notes: 'Aged Oud, Spiced Amber, Cinnamon, Damascus Rose',
    volume: '100ml',
    concentration: 'Extrait de Parfum'
  },
  {
    id: 'noir',
    name: 'Rawasi Noir',
    price: 195.00,
    rating: 4.9,
    reviewsCount: 124,
    image: perfume2,
    description: 'A mysterious journey through deep vetiver, black leather, and fresh bergamot. Sleek, sensual, and unforgettable, it transitions flawlessly from dusk till dawn.',
    notes: 'Vetiver, Black Leather, Bergamot, Cardamom',
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: 'lumen',
    name: 'Rawasi Lumen',
    price: 210.00,
    rating: 4.8,
    reviewsCount: 95,
    image: perfume3,
    description: 'Radiant citrus notes layered over a creamy sandalwood and musk base. A brilliant morning dew captured in a bottle, designed to inspire clarity and effortless elegance.',
    notes: 'Sandalwood, White Musk, Calabrian Bergamot, Neroli',
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: 'rose',
    name: 'Rawasi Rose',
    price: 185.00,
    rating: 4.9,
    reviewsCount: 142,
    image: perfume4,
    description: 'A delicate dance of Turkish rose petals, pink pepper, and sweet honey. An elegant floral tribute with a bold, modern twist that leaves an enchanting trail.',
    notes: 'Turkish Rose, Pink Pepper, Ambergris, Honey',
    volume: '100ml',
    concentration: 'Eau de Parfum'
  },
  {
    id: 'amber',
    name: 'Rawasi Amber',
    price: 225.00,
    rating: 4.8,
    reviewsCount: 110,
    image: perfume5,
    description: 'A warm, enveloping scent balancing golden amber, rich labdanum, and pure vanilla bean. A royal essence that leaves a lingering, comforting impression of pure opulence.',
    notes: 'Golden Amber, Labdanum, Vanilla Bean, Patchouli',
    volume: '100ml',
    concentration: 'Extrait de Parfum'
  },
  {
    id: 'royal',
    name: 'Rawasi Royal',
    price: 260.00,
    rating: 5.0,
    reviewsCount: 88,
    image: perfume6,
    description: 'The crowning glory of our collection, featuring rare white wood, frankincense, and delicate jasmine blooms. A truly celestial blend made for the discerning connoisseur.',
    notes: 'White Wood, Frankincense, Jasmine, Cedarwood',
    volume: '100ml',
    concentration: 'Extrait de Parfum'
  }
];

const JOURNAL_ENTRIES = [
  {
    id: 1,
    title: 'The Art of Aging Oud',
    date: 'May 12, 2026',
    category: 'Heritage',
    image: perfume5,
    excerpt: "Discover the meticulous decades-long process behind harvesting and aging the world's most precious wood, and why it is referred to as liquid gold."
  },
  {
    id: 2,
    title: 'Finding Your Signature Note',
    date: 'Apr 28, 2026',
    category: 'Guide',
    image: perfume6,
    excerpt: 'A curated guide to navigating complex olfactory families and selecting a perfume that truly resonates with your unique personal essence.'
  },
  {
    id: 3,
    title: 'The Scent of Light: Creating Lumen',
    date: 'Mar 15, 2026',
    category: 'Behind the Scenes',
    image: perfume1,
    excerpt: 'An exclusive interview with our master perfumer on the inspiration and two-year journey required to capture morning light inside a crystal bottle.'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection to highlight active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'shop', 'about', 'journal', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Open cart automatically to show action feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsOrderSuccess(true);
    setCart([]);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSubmitted(false);
      alert('Thank you! Your message has been sent to our bespoke concierge.');
    }, 1500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsCartOpen={setIsCartOpen}
        getCartCount={getCartCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        logoPng={logoPng}
      />

      {/* Hero Section */}
      <Hero
        scrollToSection={scrollToSection}
        setSelectedProduct={setSelectedProduct}
        PRODUCTS={PRODUCTS}
        perfume1={perfume1}
        crestLogo={crestLogo}
        logoPng={logoPng}
        pOud={perfume5}
        pNoir={perfume6}
      />

      {/* Shop Section */}
      <Shop
        PRODUCTS={PRODUCTS}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
        crestLogo={crestLogo}
        scrollToSection={scrollToSection}
      />

      {/* About Section */}
      <About
        scrollToSection={scrollToSection}
        pRose={perfume6}
      />

      {/* Journal Section */}
      <Journal
        JOURNAL_ENTRIES={JOURNAL_ENTRIES}
      />

      {/* Contact Section & Newsletter */}
      <Contact
        handleContactSubmit={handleContactSubmit}
        contactName={contactName}
        setContactName={setContactName}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        contactMessage={contactMessage}
        setContactMessage={setContactMessage}
        contactSubmitted={contactSubmitted}
        handleNewsletterSubmit={handleNewsletterSubmit}
        newsletterEmail={newsletterEmail}
        setNewsletterEmail={setNewsletterEmail}
        isNewsletterSubscribed={isNewsletterSubscribed}
      />

      {/* Footer */}
      <Footer
        logoPng={logoPng}
        scrollToSection={scrollToSection}
      />

      {/* Left-Side Product Details Drawer */}
      <ProductDetails
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />

      {/* Cart Side Drawer */}
      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getCartSubtotal={getCartSubtotal}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        isOrderSuccess={isOrderSuccess}
        setIsOrderSuccess={setIsOrderSuccess}
        handleCheckoutSubmit={handleCheckoutSubmit}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        getCartSubtotal={getCartSubtotal}
      />
    </div>
  );
}

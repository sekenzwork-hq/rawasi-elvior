import React from 'react';
import { Star } from 'lucide-react';

export default function Shop({
  PRODUCTS,
  setSelectedProduct,
  addToCart,
  crestLogo,
  scrollToSection
}) {
  return (
    <section id="shop" className="shop">
      <div className="container">
        <div className="shop-header">
          <div>
            <h2 className="shop-title">The Collection</h2>
            <p className="shop-subtitle">Select from our artisanal creations</p>
          </div>
          <button className="shop-view-all text-gradient-gold" onClick={() => scrollToSection('shop')}>
            <span>View All Products</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img-wrap" onClick={() => setSelectedProduct(product)}>
                <div className="product-img-inner">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-glow"></div>
              </div>

              <div className="product-info">
                <div className="product-info-header" onClick={() => setSelectedProduct(product)}>
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="product-rating" onClick={() => setSelectedProduct(product)}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(product.rating) ? 'filled' : ''} 
                      color="#CBA153" 
                      fill={i < Math.floor(product.rating) ? '#CBA153' : 'none'}
                    />
                  ))}
                  <span className="product-rating-text">({product.reviewsCount})</span>
                </div>

                <div className="product-actions">
                  <button 
                    className="view-details-btn" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    Details
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

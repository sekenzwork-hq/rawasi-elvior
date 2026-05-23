import React from 'react';
import { X, Star } from 'lucide-react';

export default function ProductDetails({
  selectedProduct,
  setSelectedProduct,
  addToCart
}) {
  if (!selectedProduct) return null;

  return (
    <div className="details-overlay animate-fade-in" onClick={() => setSelectedProduct(null)}>
      <div className="details-panel-left animate-slide-left" onClick={(e) => e.stopPropagation()}>
        <button className="details-close" onClick={() => setSelectedProduct(null)}>
          <X size={24} />
        </button>
        <div className="details-panel-content">
          <div className="details-image-wrapper">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <div className="details-glow"></div>
          </div>

          <h2>{selectedProduct.name}</h2>
          
          <div className="details-meta">
            <span className="details-price">${selectedProduct.price.toFixed(2)}</span>
            <div className="details-rating">
              <Star size={14} fill="#CBA153" color="#CBA153" />
              <span>{selectedProduct.rating.toFixed(1)} ({selectedProduct.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="details-description">
            <h3>The Story</h3>
            <p>{selectedProduct.description}</p>
          </div>

          <div className="details-notes">
            <div className="note-group">
              <span className="note-label">Scent Profile</span>
              <span className="note-value">{selectedProduct.notes}</span>
            </div>
            <div className="note-group">
              <span className="note-label">Concentration</span>
              <span className="note-value">{selectedProduct.concentration}</span>
            </div>
            <div className="note-group">
              <span className="note-label">Volume</span>
              <span className="note-value">{selectedProduct.volume}</span>
            </div>
          </div>

          <button 
            className="details-action-btn"
            onClick={() => {
              addToCart(selectedProduct);
              setSelectedProduct(null);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

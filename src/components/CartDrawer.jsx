import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  updateQuantity,
  removeFromCart,
  getCartSubtotal,
  setIsCheckoutOpen
}) {
  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay animate-fade-in" onClick={() => setIsCartOpen(false)}>
      <div className="cart-panel animate-slide-right" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="text-gradient-gold" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Your Cart</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your shopping bag is empty.</p>
            <button
              className="add-to-cart-btn"
              style={{ marginTop: '2rem' }}
              onClick={() => setIsCartOpen(false)}
            >
              Return to Collection
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} className="cart-item-img" alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>

                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="text-gradient-gold">${getCartSubtotal().toFixed(2)}</span>
              </div>
              <button
                className="cart-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

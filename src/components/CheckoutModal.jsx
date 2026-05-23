import React from 'react';
import { X, Check } from 'lucide-react';

export default function CheckoutModal({
  isCheckoutOpen,
  setIsCheckoutOpen,
  isOrderSuccess,
  setIsOrderSuccess,
  handleCheckoutSubmit,
  paymentMethod,
  setPaymentMethod,
  getCartSubtotal
}) {
  if (!isCheckoutOpen) return null;

  return (
    <div className="checkout-overlay animate-fade-in" onClick={() => setIsCheckoutOpen(false)}>
      <div className="checkout-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        
        {!isOrderSuccess ? (
          <>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button className="checkout-close" onClick={() => setIsCheckoutOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="checkout-content" onSubmit={handleCheckoutSubmit}>
              <div className="payment-section">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  <div 
                    className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <span>Credit / Debit Card</span>
                  </div>
                  <div 
                    className={`payment-option ${paymentMethod === 'apple' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <span>Apple Pay</span>
                  </div>
                  <div 
                    className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <span>PayPal</span>
                  </div>
                </div>

                <div className="card-form">
                  <div className="form-group">
                    <label htmlFor="card-name">Cardholder Name</label>
                    <input type="text" id="card-name" placeholder="Lord Alexander Mercer" required />
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      <div className="form-group">
                        <label htmlFor="card-number">Card Number</label>
                        <input 
                          type="text" 
                          id="card-number" 
                          placeholder="•••• •••• •••• ••••" 
                          maxLength="19" 
                          required 
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="card-exp">Expiry Date</label>
                          <input type="text" id="card-exp" placeholder="MM/YY" maxLength="5" required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="card-cvv">CVV</label>
                          <input type="password" id="card-cvv" placeholder="•••" maxLength="3" required />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod !== 'card' && (
                    <div style={{ color: '#9CA3AF', fontStyle: 'italic', padding: '1rem 0' }}>
                      You will be redirected securely to finalize your payment.
                    </div>
                  )}
                </div>
              </div>

              <div className="checkout-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: '#10B981', fontWeight: '600' }}>COMPLIMENTARY</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total Due</span>
                  <span className="text-gradient-gold">${getCartSubtotal().toFixed(2)}</span>
                </div>

                <button type="submit" className="complete-order-btn">
                  PLACE SECURE ORDER
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="order-success animate-scale-up">
            <div className="success-icon">
              <div style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                background: 'rgba(203, 161, 83, 0.1)',
                border: '2px solid var(--color-gold-mid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Check size={40} color="#CBA153" strokeWidth={3} />
              </div>
            </div>
            <h2>Order Completed!</h2>
            <p>Your signature fragrance is being hand-packaged by our master artisans.</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '3rem' }}>
              A confirmation email with shipping details and tracking information has been sent to your inbox.
            </p>
            <button 
              className="order-success-close-btn"
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsOrderSuccess(false);
              }}
            >
              RETURN TO HOME
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

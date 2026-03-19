import { useState, useEffect } from 'react';
import '../App.css';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Cart() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const displayCart = () => {
  };

  useEffect(() => {
    displayCart();
  }, []);

  const goToSignIn = () => {
    setShowSignInModal(false);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="page">
      <Nav />

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div id="cartContent">
        </div>
      </div>

      <div style={{ height: '90px' }}></div>

      <Footer />

      {showSignInModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">Sign In Required</div>
            <div className="modal-body">
              You must be signed in to make a purchase. Would you like to sign in now?
            </div>
            <div className="modal-footer">
              <button className="modal-btn modal-btn-primary" onClick={goToSignIn}>
                Sign In
              </button>
              <button className="modal-btn modal-btn-secondary" onClick={closeSignInModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content modal-payment">
            <div className="modal-payment-header">
              <div className="modal-header">Payment</div>
              <button type="button" className="modal-close-btn" onClick={closePaymentModal}>
                &times;
              </button>
            </div>
            <div className="modal-payment-body">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

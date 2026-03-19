import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Success() {
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(true);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewRating === 0) {
      alert('Please select a rating');
      return;
    }
    console.log({
      name: reviewName,
      rating: reviewRating,
      text: reviewText
    });
    setShowReviewModal(false);
    setShowThankYouModal(true);
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  return (
    <div className="page">
      <Nav />

      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p>Your payment has been processed successfully.</p>
        <p>Your carbon offset certificate(s) have been automatically downloaded to your device.</p>
        <p>
          A confirmation email will be sent to you shortly. You can view your certificates anytime in your
          <a href="#" onClick={() => navigate('/account')} style={{ color: '#27ae60', fontWeight: 600 }}>
            {' '}Account
          </a>
          .
        </p>
        <p>You can now continue reducing your carbon footprint with Rooted Offsets.</p>
        <button
          className="return-btn"
          onClick={() => navigate('/products')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
        >
          Continue Shopping
        </button>
      </div>

      {showThankYouModal && (
        <div className="review-modal-overlay" id="thankYouModal">
          <div className="review-modal" style={{ maxWidth: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
              <h2 style={{ color: '#27ae60', marginBottom: '15px' }}>Thank You!</h2>
              <p style={{ color: '#2c3e50', fontSize: '16px', marginBottom: '20px' }}>
                Your review has been submitted successfully.
              </p>
              <button
                type="button"
                className="modal-btn btn-submit"
                onClick={handleCloseThankYouModal}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="review-modal-overlay" id="reviewModal">
          <div className="review-modal">
            <h2>Share Your Experience</h2>
            <p className="modal-subtitle">Help us improve by leaving a review</p>

            <form id="reviewForm" onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  id="reviewName"
                  placeholder="Enter your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div
                  className="rating-input"
                  id="ratingContainer"
                  style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="star"
                      data-rating={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      style={{
                        fontSize: '32px',
                        cursor: 'pointer',
                        color: star <= (hoveredRating || reviewRating) ? '#f39c12' : '#ddd',
                        transition: 'color 0.2s'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <input type="hidden" id="reviewRating" value={reviewRating} />
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  id="reviewText"
                  placeholder="Tell us about your experience with Rooted Offsets..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="modal-btn btn-skip"
                  onClick={handleSkipReview}
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="modal-btn btn-submit"
                  id="submitReviewBtn"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

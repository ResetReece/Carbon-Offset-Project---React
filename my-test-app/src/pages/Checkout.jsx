import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Nav from "../Components/nav";
import Footer from "../Components/footer";

export default function Checkout() {
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [total, setTotal] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [id.replace("billing", "").toLowerCase()]: value
    }));
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        alert("You must be signed in to checkout");
        navigate("/auth");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("Your cart is empty!");
        navigate("/cart");
        return;
      }

      const cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
      setTotal(cartTotal);

      try {
        const apiUrl = window.location.hostname === "localhost"
          ? "http://localhost:5000/create-payment-intent"
          : window.location.origin + "/create-payment-intent";

        console.log("Fetching payment intent from:", apiUrl);
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify({
            amount: Math.round(cartTotal * 100),
            currency: "gbp"
          })
        });

        console.log("Payment intent response:", response.status);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create payment intent");
        }

        const data = await response.json();
        console.log("Client secret received:", data.clientSecret ? "yes" : "no");
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setPaymentMessage("Failed to initialize payment form: " + error.message);
        setIsLoading(false);
      }
    };

    initializeCheckout();
  }, [navigate]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="page">
      <Nav />

      <div className="checkout-container">
        <div className="checkout-content">
          <div className="checkout-header">
            <h2>Checkout</h2>
            <button className="back-link" onClick={() => navigate("/cart")}>
              ← Back to Cart
            </button>
          </div>

          <form id="payment-form" autoComplete="off" onSubmit={handlePaymentSubmit} noValidate>
            <h4>Billing Address</h4>
            <input
              type="text"
              id="billingName"
              placeholder="Full Name"
              className="form-input"
              autoComplete="name"
              value={billingData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="billingEmail"
              placeholder="Email"
              className="form-input"
              autoComplete="email"
              value={billingData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="billingAddress"
              placeholder="Street Address"
              className="form-input"
              autoComplete="street-address"
              value={billingData.address}
              onChange={handleInputChange}
              required
            />
            <div className="form-row">
              <input
                type="text"
                id="billingCity"
                placeholder="City"
                className="form-input"
                autoComplete="address-level2"
                value={billingData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                id="billingState"
                placeholder="State/Province"
                className="form-input"
                autoComplete="address-level1"
                value={billingData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                id="billingZip"
                placeholder="ZIP/Postal Code"
                className="form-input"
                autoComplete="postal-code"
                value={billingData.zip}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                id="billingCountry"
                placeholder="Country"
                className="form-input"
                autoComplete="country-name"
                value={billingData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <h4>Payment Method</h4>
            <div id="payment-element">{/* Stripe payment element */}</div>
            {paymentMessage && <div className="payment-message">{paymentMessage}</div>}

            <div className="order-summary">
              <h4>Order Total</h4>
              <div className="total-amount">£{total.toFixed(2)}</div>
            </div>

            <button type="submit" id="payment-submit-btn" className="payment-submit-btn" disabled={isLoading}>
              Pay £{total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import logoIcon from "../assets/images/logo-icon.png";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("authToken");
  });
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
      const newCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(newCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img
              id="logo-icon"
              src={logoIcon}
              width="60"
              height="60"
              alt="Company logo"
            />
          </Link>
        </li>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/company">Company</Link>
        </li>

        <li>
          <Link to="/reviews">Reviews</Link>
        </li>

        <li>
          <Link to="/products">Buy Now</Link>
        </li>

        <li className="nav-spacer"></li>

        <li id="cartNav">
          <Link to="/cart" className="cart-link">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span id="cartCount" className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>
        </li>

        {!isLoggedIn ? (
          <li id="authNav">
            <Link to="/auth" className="login-link">
              Login
            </Link>
          </li>
        ) : (
          <li id="profileNav">
            <Link to="/account" className="profile-icon-link">
              <img
                id="profileIcon"
                src="data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%2327ae60" width="100" height="100"/%3E%3Ccircle cx="50" cy="35" r="20" fill="white"/%3E%3Cpath d="M 25 70 Q 25 55 50 55 Q 75 55 75 70 L 75 100 L 25 100 Z" fill="white"/%3E%3C/svg%3E"
                width="55"
                height="55"
                alt="Profile"
                className="profile-icon"
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

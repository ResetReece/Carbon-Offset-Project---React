import { Link } from 'react-router-dom';
import '../App.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <span className="footer-divider"></span>
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
        <Link to="/terms-and-conditions" className="footer-link">
          Terms & Conditions
        </Link>
        <a href="mailto:support@rootedoffsets.com" className="footer-link">
          Contact Us
        </a>
      </div>

      <div className="footer-right">
        &copy; Rooted Offsets 2026
      </div>
    </footer>
  );
}

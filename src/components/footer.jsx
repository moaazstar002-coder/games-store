import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGamepad } from "react-icons/fa";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <FaGamepad className="logo-icon" />
            <span>GAME<span className="highlight">STORE</span></span>
          </div>
          <p>Your ultimate destination for the latest and greatest in gaming. Level up your experience.</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">New Releases</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Consoles</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GameStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

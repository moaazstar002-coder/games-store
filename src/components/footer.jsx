import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGamepad } from "react-icons/fa";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <FaGamepad className="logo-icon" />
            <span>GAMER'S<span className="highlight"> NEST</span></span>
          </div>
          <p>Your ultimate destination for the latest and greatest in gaming. Level up your experience.</p>
          
          <div className="social-icons">
            <a 
              href="https://www.facebook.com/mezowkoky002" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit our Facebook page"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit our Twitter page"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://www.instagram.com/moaaz.h7x" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Visit our YouTube channel"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/games">New Releases</Link></li>
              <li><Link to="/games">Best Sellers</Link></li>
              <li><Link to="/games">Consoles</Link></li>
              <li><Link to="/games">Accessories</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/cart">Order Status</Link></li>
              <li><Link to="/help">Returns</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GAMER'S NEST. All rights reserved. Made with 💜 by Moaaz</p>
      </div>
    </footer>
  );
}
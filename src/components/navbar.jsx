import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaGamepad, FaShoppingCart, FaDragon } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles/components/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-content">
        <Link 
          to="/" 
          className="logo"
        >
          <div className="logo-container">
            <img 
              src="/gamers_nest.svg" 
              alt="Gamer's Nest" 
              className="logo-img" 
            />
            <FaDragon className="logo-icon-hover" />
          </div>
          <span>GAMER'S <span className="highlight">NEST</span></span>
        </Link>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/games" onClick={() => setIsOpen(false)}>Games</Link></li>
          <li><Link to="/best-sellers" onClick={() => setIsOpen(false)}>Best Sellers</Link></li>
          <li><Link to="/consoles" onClick={() => setIsOpen(false)}>Consoles</Link></li>
          <li><Link to="/accessories" onClick={() => setIsOpen(false)}>Accessories</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/WishList" onClick={() => setIsOpen(false)}>WishList</Link></li>
          <li>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="cart-link">
              <FaShoppingCart /> 
              Cart
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

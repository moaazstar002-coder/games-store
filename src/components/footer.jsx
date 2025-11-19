import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <> 
      <footer className="footer">
        <p>&copy; 2024 Game Store. All rights reserved.</p>
      </footer>
      <div className="social-media">
        <a href="#" className="social-icon">Facebook</a>
        <a href="#" className="social-icon">Twitter</a>
        <a href="#" className="social-icon">Instagram</a>
      </div>
    </>
  );
}

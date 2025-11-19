import React from 'react';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Game Store</h1>
      <ul> 
        <li>Home</li>
        <li>Games</li>
        <li>About</li>
        <li>Categories</li>
        <li>Search</li>
      </ul>
    </nav>
  );
}

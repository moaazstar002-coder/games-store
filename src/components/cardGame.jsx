import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import "../styles/components/CardGame.css";

export default function CardGame({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="game-card glass-card">
      <div className="game-image-container">
        <img src={game.image} alt={game.title} className="game-image" />
        <div className="game-overlay">
          <button className="btn-icon" title="Add to Wishlist" onClick={(e) => e.preventDefault()}>
            <FaHeart />
          </button>
        </div>
      </div>
      
      <div className="game-info">
        <div className="game-header">
          <h3 className="game-title">{game.title}</h3>
          <div className="game-rating">
            <FaStar className="star-icon" />
            <span>{game.rating}</span>
          </div>
        </div>
        
        <div className="game-footer">
          <span className="game-price">{game.price}</span>
          <button className="btn btn-primary" onClick={(e) => e.preventDefault()}>
            <FaShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

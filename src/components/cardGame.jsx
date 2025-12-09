import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import "../styles/components/CardGame.css";
import { useWishList } from "../hooks/useWishList";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/slices/CartSlice";

export default function CardGame({ game }) {
  const { loading, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishList();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === game.id);
  return (
    <Link to={`/game/${game.id}`} className="game-card glass-card">
      <div className="game-image-container">
        <img
          src={game.image}
          alt={game.title}
          className="game-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%23ffffff" font-size="24" font-family="Arial" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>';
          }}
        />
        <div className="game-overlay">
          <button
            className={`wishlist-btn ${isInWishlist(game.id) ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isInWishlist(game.id)) {
                removeFromWishlist(game.id);
              } else {
                addToWishlist(game);
              }
            }}
            disabled={loading}
            title={isInWishlist(game.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
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
          <button
            className={`btn btn-primary ${isInCart ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isInCart) {
                dispatch(removeItem(game.id));
              } else {
                dispatch(addItem({
                  id: game.id,
                  title: game.title,
                  image: game.image,
                  price: 59.99,
                  quantity: 1
                }));
              }
            }}
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
          >
            <FaShoppingCart />
            <span>{isInCart ? 'Remove' : 'Add'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaCheckCircle } from "react-icons/fa";
import "../styles/components/CardGame.css";
import { useWishList } from "../hooks/useWishList";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/slices/CartSlice";

export default function CardGame({ game, variant = "default", discount }) {
  const isStorefront = variant === "storefront" || variant === "storefront-list";
  const isStorefrontList = variant === "storefront-list";
  const { loading, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishList();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === game.id);
  const price = typeof game.price === "number"
    ? game.price
    : parseFloat(String(game.price).replace(/[^0-9.]/g, "")) || 0;
  const originalPrice = discount
    ? (price / (1 - discount / 100)).toFixed(2)
    : null;

  return (
    <Link
      to={`/game/${game.id}`}
      className={
        isStorefront
          ? `group flex h-full ${
              isStorefrontList ? "flex-col sm:flex-row sm:items-stretch" : "flex-col"
            } overflow-hidden rounded-xl border border-[#26304A] bg-[#151B2B] transition hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-[0_16px_30px_-18px_rgba(124,58,237,0.65)]`
          : "game-card glass-card"
      }
    >
      <div
        className={
          isStorefront
            ? `relative overflow-hidden bg-[#0A0E18] ${
                isStorefrontList
                  ? "h-40 shrink-0 sm:h-auto sm:w-36"
                  : "aspect-[16/10]"
              }`
            : "game-image-container"
        }
      >
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          className={
            isStorefront
              ? "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              : "game-image"
          }
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%23ffffff" font-size="24" font-family="Arial" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>';
          }}
        />
        {isStorefront && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E18]/70 via-transparent to-transparent" />
        )}
        {discount && (
          <span className="absolute left-2 top-2 z-10 rounded bg-[#FF4D6D] px-2 py-1 font-[Space_Grotesk] text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <div
          className={
            isStorefront
              ? "absolute right-2 top-2 z-10"
              : "game-overlay"
          }
        >
          <button
            className={
              isStorefront
                ? `grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-[#0F131D]/70 text-white backdrop-blur transition hover:border-[#FF4D6D] hover:text-[#FF4D6D] ${
                    isInWishlist(game.id) ? "border-[#FF4D6D] text-[#FF4D6D]" : ""
                  }`
                : `wishlist-btn ${isInWishlist(game.id) ? "active" : ""}`
            }
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

      <div
        className={
          isStorefront
            ? `flex flex-1 flex-col gap-3 p-3 sm:p-4 ${
                isStorefrontList ? "sm:flex-row sm:items-center" : ""
              }`
            : "game-info"
        }
      >
        <div
          className={
            isStorefront
              ? `flex min-h-10 items-start justify-between gap-2 ${
                  isStorefrontList ? "sm:flex-1 sm:min-w-0" : ""
                }`
              : "game-header"
          }
        >
          <h3
            className={
              isStorefront
                ? "mb-0 line-clamp-2 min-h-10 text-right text-sm font-bold leading-5 text-[#F1F5F9] normal-case sm:text-base"
                : "game-title"
            }
          >
            {game.title}
          </h3>
          {!isStorefront && (
            <div className="game-rating">
              <FaStar className="star-icon" />
              <span>{game.rating}</span>
            </div>
          )}
        </div>

        {isStorefront && (
          <div
            className={`flex items-center justify-between gap-2 ${
              isStorefrontList ? "sm:flex-1 sm:min-w-0" : ""
            }`}
          >
            <span className="inline-flex items-center gap-1 text-[11px] text-[#FBBF24]">
              <FaStar aria-hidden="true" />
              {game.rating || "—"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#4AE176]">
              <FaCheckCircle aria-hidden="true" />
              تسليم فوري
            </span>
            <span className="text-[10px] text-[#AAB2C5]">
              {game.parent_platforms?.slice(0, 2).map(({ platform }) => platform.name).join(" · ") || "PC"}
            </span>
          </div>
        )}

        <div
          className={
            isStorefront
              ? `mt-auto flex items-center justify-between gap-2 border-t border-[#26304A] pt-3 ${
                  isStorefrontList
                    ? "sm:w-40 sm:shrink-0 sm:flex-col sm:items-end sm:justify-center sm:border-r sm:border-t-0 sm:pt-0 sm:pr-4"
                    : ""
                }`
              : "game-footer"
          }
        >
          <span className={isStorefront ? "flex flex-col font-[Space_Grotesk]" : "game-price"}>
            {isStorefront && originalPrice && (
              <span className="text-[10px] text-[#858DA1] line-through">${originalPrice}</span>
            )}
            <span className={isStorefront ? "text-sm font-bold text-white sm:text-base" : ""}>
              {typeof game.price === 'number' ? `$${game.price.toFixed(2)}` : game.price}
            </span>
          </span>
          <button
            className={
              isStorefront
                ? `inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                    isInCart
                      ? "bg-[#22C55E]/15 text-[#4AE176]"
                      : "bg-[#7C3AED] text-white hover:bg-[#8B5CF6]"
                  }`
                : `btn btn-primary ${isInCart ? 'active' : ''}`
            }
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
                  price: typeof game.price === 'number'
                    ? game.price
                    : parseFloat(String(game.price).replace(/[^0-9.]/g, '')) || 0,
                  quantity: 1
                }));
              }
            }}
            aria-label={isInCart ? "Remove from Cart" : "Add to Cart"}
            title={isInCart ? "Remove from Cart" : "Add to Cart"}
          >
            <FaShoppingCart />
            <span>{isStorefront ? (isInCart ? "في السلة" : "أضف للسلة") : (isInCart ? "Remove" : "Add")}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

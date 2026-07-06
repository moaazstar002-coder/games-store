import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CardGame from "./CardGame";
import { useWishList } from "../hooks/useWishList";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/slices/CartSlice";
import { FaHeart, FaShoppingCart, FaSortAmountDown, FaSearch, FaTrash } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import { toast } from "sonner";

const SORT_OPTIONS = [
  { value: "default", label: "Default Order" },
  { value: "name_asc", label: "Name (A → Z)" },
  { value: "name_desc", label: "Name (Z → A)" },
  { value: "rating_desc", label: "Rating (High → Low)" },
  { value: "rating_asc", label: "Rating (Low → High)" },
];

export default function WishListContent() {
  const { wishList, removeFromWishlist } = useWishList();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter + Sort
  const filteredAndSorted = useMemo(() => {
    let result = [...wishList];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) => (g.name || g.title || "").toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "name_asc":
        result.sort((a, b) =>
          (a.name || a.title || "").localeCompare(b.name || b.title || "")
        );
        break;
      case "name_desc":
        result.sort((a, b) =>
          (b.name || b.title || "").localeCompare(a.name || a.title || "")
        );
        break;
      case "rating_desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "rating_asc":
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      default:
        break;
    }

    return result;
  }, [wishList, sortBy, searchQuery]);

  const handleAddAllToCart = () => {
    const notInCart = wishList.filter(
      (game) => !cartItems.some((item) => item.id === game.id)
    );

    if (notInCart.length === 0) {
      toast.info("All wishlist games are already in your cart!", {
        duration: 2500,
      });
      return;
    }

    notInCart.forEach((game) => {
      const gameWithDefaults = {
        id: game.id,
        title: game.title || game.name,
        image: game.image || game.background_image,
        price:
          typeof game.price === "number"
            ? game.price
            : ((game.id % 5000) / 100 + 9.99),
        ...game,
      };
      dispatch(
        addItem({
          id: gameWithDefaults.id,
          title: gameWithDefaults.title,
          image: gameWithDefaults.image,
          price: typeof gameWithDefaults.price === "number"
            ? gameWithDefaults.price
            : parseFloat(String(gameWithDefaults.price).replace(/[^0-9.]/g, "")) || 9.99,
          quantity: 1,
        })
      );
    });

    toast.success(`Added ${notInCart.length} game${notInCart.length > 1 ? "s" : ""} to cart!`, {
      description: "Your cart has been updated",
      duration: 3000,
    });
  };

  // ─── EMPTY STATE ───────────────────────────────────────────────────────────
  if (wishList.length === 0) {
    return (
      <div className="wishlist-empty-state">
        <div className="empty-state-icon">
          <FaHeart className="empty-heart" />
          <div className="empty-ripple" />
          <div className="empty-ripple delay-1" />
          <div className="empty-ripple delay-2" />
        </div>
        <h2 className="empty-state-title">Your Wishlist is Empty</h2>
        <p className="empty-state-desc">
          You haven't added any games yet. Browse our collection and save your favorites!
        </p>
        <Link to="/allgames" className="btn btn-primary empty-state-btn">
          <FaShoppingCart />
          <span>Browse Games</span>
        </Link>
      </div>
    );
  }

  // ─── WISHLIST CONTENT ──────────────────────────────────────────────────────
  return (
    <div className="wishlist-content">
      {/* ── Controls Bar ── */}
      <div className="wishlist-controls">
        <div className="wishlist-meta">
          <span className="wishlist-count">
            <FaHeart className="meta-heart" />
            {wishList.length} Game{wishList.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="wishlist-actions">
          {/* Search */}
          <div className="wishlist-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="wishlist-search-input"
            />
          </div>

          {/* Sort */}
          <div className="wishlist-sort">
            <MdSort className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="wishlist-sort-select"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Add All to Cart */}
          <button className="btn btn-add-all" onClick={handleAddAllToCart}>
            <FaShoppingCart />
            <span>Add All to Cart</span>
          </button>
        </div>
      </div>

      {/* ── No results from search ── */}
      {filteredAndSorted.length === 0 ? (
        <div className="wishlist-no-results">
          <FaSearch className="no-results-icon" />
          <p>No games match "<strong>{searchQuery}</strong>"</p>
          <button className="btn-clear-search" onClick={() => setSearchQuery("")}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="wish-list">
          {filteredAndSorted.map((game) => {
            const gameWithDefaults = {
              id: game.id,
              title: game.title || game.name,
              image: game.image || game.background_image,
              price: typeof game.price === "number"
                ? game.price
                : ((game.id % 5000) / 100 + 9.99),
              rating: game.rating || "N/A",
              ...game,
            };
            return <CardGame key={game.id} game={gameWithDefaults} />;
          })}
        </div>
      )}
    </div>
  );
}
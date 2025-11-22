import { useState, useEffect } from "react";

export function useWishList() {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishList(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
        setWishList([]);
      }
    } else {
      setWishList([]);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }
  }, [wishList, loading]);

  // Add a game to wishlist
  const addToWishlist = (game) => {
    if (!game || !game.id) return;
    if (!isInWishlist(game.id)) {
      setWishList((prev) => [...prev, game]);
    }
  };

  // Remove the game from wishlist
  const removeFromWishlist = (gameId) => {
    setWishList((prev) => prev.filter((g) => g.id != gameId));
  };

  // Validate if a game is in the wishlist
  const isInWishlist = (gameId) => {
    return Array.isArray(wishList) && wishList.some((g) => g.id == gameId);
  };

  return { wishList, loading, addToWishlist, removeFromWishlist, isInWishlist };
}

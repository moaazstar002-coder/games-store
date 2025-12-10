import { useState, useEffect } from "react";
import { toast } from 'sonner';

export function useWishList() {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishList(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
        setWishList([]);
        toast.error('Error loading wishlist', {
          description: 'Creating a new list',
          duration: 3000,
        });
      }
    } else {
      setWishList([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }
  }, [wishList, loading]);

  const addToWishlist = (game) => {
    if (!game || !game.id) {
      toast.error('Error adding game', {
        description: 'Invalid game data',
        duration: 2500,
      });
      return;
    }
    
    if (!isInWishlist(game.id)) {
      setWishList((prev) => [...prev, game]);
      toast.success(`Added ${game.name || 'Game'} to Wishlist`, {
        description: 'You can check your wishlist now',
        duration: 2500,
      });
    } else {
      toast.info('Game is already in Wishlist', {
        duration: 2000,
      });
    }
  };

  const removeFromWishlist = (gameId) => {
    const game = wishList.find((g) => g.id == gameId);
    setWishList((prev) => prev.filter((g) => g.id != gameId));
    
    if (game) {
      toast.info(`Removed ${game.name || 'Game'} from Wishlist`, {
        duration: 2000,
      });
    }
  };

  const isInWishlist = (gameId) => {
    return Array.isArray(wishList) && wishList.some((g) => g.id == gameId);
  };

  return { wishList, loading, addToWishlist, removeFromWishlist, isInWishlist };
}

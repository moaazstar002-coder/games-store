import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const game = action.payload;
      if (!game || !game.id) {
        toast.error('Error adding game', {
          description: 'Invalid game data',
          duration: 2500,
        });
        return;
      }

      const exists = state.items.some((item) => item.id === game.id);
      if (!exists) {
        state.items.push(game);
        toast.success(`Added ${game.name || 'Game'} to Wishlist`, {
          description: 'You can check your wishlist now',
          duration: 2500,
        });
      } else {
        toast.info('Game is already in Wishlist', {
          duration: 2000,
        });
      }
    },
    removeFromWishlist: (state, action) => {
      const gameId = action.payload;
      const game = state.items.find((item) => item.id === gameId);
      state.items = state.items.filter((item) => item.id !== gameId);

      if (game) {
        toast.info(`Removed ${game.name || 'Game'} from Wishlist`, {
          duration: 2000,
        });
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

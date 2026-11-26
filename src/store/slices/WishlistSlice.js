import { createSlice } from "@reduxjs/toolkit";

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
        return;
      }

      const exists = state.items.some((item) => item.id === game.id);
      if (!exists) {
        state.items.push(game);
      }
    },
    removeFromWishlist: (state, action) => {
      const gameId = action.payload;
      state.items = state.items.filter((item) => item.id !== gameId);
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

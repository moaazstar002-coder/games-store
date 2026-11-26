import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { toast } from "sonner";
import { addItem, clearCart, removeItem, updateQuantity } from './slices/CartSlice';
import { addToWishlist, removeFromWishlist } from './slices/WishlistSlice';
import cartReducer from './slices/CartSlice';
import wishlistReducer from './slices/WishlistSlice';

export const cartPersistConfig = {
  key: "cart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addItem,
  effect: (action, listenerApi) => {
    const game = action.payload;
    const previousCart = listenerApi.getOriginalState().cart;
    const currentCart = listenerApi.getState().cart;
    const previousItem = previousCart.items.find((item) => item.id === game.id);
    const currentItem = currentCart.items.find((item) => item.id === game.id);

    if (previousItem) {
      toast.success(`Increased quantity of ${game.name || 'item'}`, {
        description: `New quantity: ${currentItem.quantity}`,
        duration: 2000,
      });
    } else {
      toast.success(`Added ${game.name || 'item'} to cart`, {
        description: 'You can check your cart now',
        duration: 2500,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: removeItem,
  effect: (action, listenerApi) => {
    const id = action.payload;
    const previousItem = listenerApi.getOriginalState().cart.items.find((item) => item.id === id);
    if (!previousItem) return;

    if (previousItem.quantity === 1) {
      toast.info(`Removed ${previousItem.name || 'Item'} from cart`, {
        duration: 2000,
      });
    } else {
      toast.info(`Decreased quantity of ${previousItem.name || 'Item'}`, {
        description: `New quantity: ${previousItem.quantity - 1}`,
        duration: 2000,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: updateQuantity,
  effect: (action, listenerApi) => {
    const { id, quantity } = action.payload;
    const previousItem = listenerApi.getOriginalState().cart.items.find((item) => item.id === id);
    if (!previousItem) return;

    const itemName = previousItem.name || 'Item';
    if (quantity <= 0) {
      toast.info(`Removed ${itemName} from cart`, { duration: 2000 });
    } else {
      const showSuccess = quantity > previousItem.quantity;
      toast[showSuccess ? 'success' : 'info'](`Updated quantity of ${itemName}`, {
        description: `New quantity: ${quantity}`,
        duration: 2000,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: clearCart,
  effect: (_, listenerApi) => {
    const itemCount = listenerApi.getOriginalState().cart.items.length;
    if (itemCount > 0) {
      toast.success('Cart cleared successfully', {
        description: `Removed ${itemCount} items from cart`,
        duration: 2500,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: addToWishlist,
  effect: (action, listenerApi) => {
    const game = action.payload;
    if (!game || !game.id) {
      toast.error('Error adding game', {
        description: 'Invalid game data',
        duration: 2500,
      });
      return;
    }

    const alreadyExists = listenerApi.getOriginalState().wishlist.items.some(
      (item) => item.id === game.id,
    );
    if (alreadyExists) {
      toast.info('Game is already in Wishlist', { duration: 2000 });
    } else {
      toast.success(`Added ${game.name || 'Game'} to Wishlist`, {
        description: 'You can check your wishlist now',
        duration: 2500,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: removeFromWishlist,
  effect: (action, listenerApi) => {
    const game = listenerApi.getOriginalState().wishlist.items.find(
      (item) => item.id === action.payload,
    );
    if (game) {
      toast.info(`Removed ${game.name || 'Game'} from Wishlist`, { duration: 2000 });
    }
  },
});

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
# Game Store - Redux Integration Guide

## 📚 Overview

This project uses **Redux Toolkit** for state management (primarily for shopping cart) and **React Query** for server-side data fetching (games, genres, details).

## 🏗️ Architecture

### State Management Options

The project provides two approaches for cart management:

1. **Redux Toolkit** (Recommended) - Persistent in-memory state with optional localStorage
2. **useCart Hook** (localStorage-based) - Simple localStorage persistence

---

## 🔧 Redux Setup

### Files Structure

```
src/
├── store/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       └── CartSlice.js      # Cart reducer and actions
├── components/
│   └── AddToCartButton.jsx   # Redux-based button component
└── pages/
    └── gameDetails.jsx       # Uses Redux for cart
```

### Store Configuration (store.js)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

### Main App Setup (main.jsx)

```javascript
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
```

---

## 🛒 Cart Slice (Redux)

### Actions Available

```javascript
import { addItem, removeItem, updateQuantity, clearCart } from '../store/slices/CartSlice';

// Add item to cart (or increment quantity if exists)
dispatch(addItem({
  id: 1,
  title: 'Game Name',
  image: 'url',
  price: 59.99,
  quantity: 1
}));

// Remove item or decrement quantity
dispatch(removeItem(gameId));

// Set quantity directly
dispatch(updateQuantity({ id: gameId, quantity: 5 }));

// Clear entire cart
dispatch(clearCart());
```

### State Structure

```javascript
{
  cart: {
    items: [
      { id: 1, title: 'Game', image: 'url', price: 59.99, quantity: 2 },
      { id: 2, title: 'Game 2', image: 'url', price: 29.99, quantity: 1 }
    ],
    totalQuantity: 3,
    totalPrice: 149.97
  }
}
```

---

## 📖 Using Redux in Components

### Example: GameDetails Page

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../store/slices/CartSlice';

export default function GameDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  // Check if item is in cart
  const isInCart = cartItems.some(item => item.id === details.id);
  
  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem(details.id));
    } else {
      dispatch(addItem({
        id: details.id,
        title: details.name,
        image: details.background_image,
        price: 59.99,
        quantity: 1
      }));
    }
  };

  return (
    <button onClick={handleAddToCart}>
      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
}
```

---

## 📦 React Query Setup

### Data Fetching Hooks

#### useGames
```javascript
const { data: games, isLoading, isError } = useGames({ 
  genre: 'action', 
  page: 1 
});
```

#### useGenres
```javascript
const { data: genres, isLoading } = useGenres();
```

#### useGameDetails
```javascript
const { data: details, isLoading } = useGameDetails();
// Note: Requires 'id' from URL params via useParams()
```

### Features
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Error handling
- ✅ Loading states
- ✅ Cancellation support

---

## 🔐 Environment Variables

Create `.env` file in project root:

```env
# RAWG API Configuration
VITE_RAWG_KEY=your_api_key_here

# Optional: Backend endpoints
# VITE_API_URL=http://localhost:3000/api
```

Get your API key from: https://rawg.io/apidocs

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd game-store
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env and add your VITE_RAWG_KEY
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 📱 Features

### Shopping Cart
- ✅ Add/Remove items
- ✅ Increment/Decrement quantity
- ✅ Calculate totals automatically
- ✅ Persistent state with Redux
- ✅ Redux DevTools support

### Wishlist
- ✅ Add/Remove favorites
- ✅ localStorage persistence
- ✅ Toggle UI states

### Games Catalog
- ✅ Browse all games
- ✅ Filter by genre
- ✅ Search functionality
- ✅ Pagination
- ✅ Game details page

---

## 🛠️ Debugging Redux

### Install Redux DevTools

```bash
npm install --save-dev redux-devtools-extension
```

### Enable in store.js
```javascript
import { devToolsEnhancer } from 'redux-devtools-extension';

export const store = configureStore({
  reducer: { cart: cartReducer },
  enhancers: [devToolsEnhancer()]
});
```

Then use Redux DevTools browser extension to inspect state changes.

---

## 🎯 Best Practices

### 1. Use useSelector Efficiently
```javascript
// ✅ Good: Selects only what you need
const itemCount = useSelector(state => state.cart.items.length);

// ❌ Avoid: Selects entire state
const entireCart = useSelector(state => state.cart);
```

### 2. Use useDispatch Correctly
```javascript
// ✅ Good
const dispatch = useDispatch();
dispatch(addItem(item));

// ❌ Avoid: Creating new function references
useDispatch()(addItem(item));
```

### 3. Price Handling
```javascript
// Store prices as numbers, not strings
price: 59.99  // ✅ Correct
price: '$59.99' // ❌ Avoid
```

---

## 📂 File Organization

```
game-store/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React Query hooks
│   ├── store/           # Redux store & slices
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

---

## 🔗 Dependencies

- **React 18** - UI Library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React-Redux** - React bindings for Redux
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Router** - Routing

---

## 🐛 Troubleshooting

### Issue: Cart not persisting
**Solution:** Redux stores state in memory. To persist across page reloads, use middleware:
```javascript
// Example: localStorage middleware
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  return result;
};
```

### Issue: API key not working
**Solution:** Ensure `.env` file exists and `VITE_RAWG_KEY` is set correctly
```bash
# Check if env var is loaded
console.log(import.meta.env.VITE_RAWG_KEY);
```

### Issue: Redux DevTools not connecting
**Solution:** Install extension and enable in store configuration

---

## 📚 Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Query Docs](https://tanstack.com/query/latest)
- [RAWG API Docs](https://rawg.io/apidocs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🤝 Contributing

For improvements or bug fixes:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated:** December 2025  
**Version:** 1.0.0

# 🎮 GAMER's NEST - Premium Game Store

A modern game store built with React, Redux Toolkit, and React Query. Features a stunning dark/neon gaming aesthetic with glassmorphism effects and real-time game data from RAWG API.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.0-764abc)

---

## ✨ Features

- 🎯 Browse thousands of games from RAWG API
- � New Releases & Best Sellers sections
- 🎮 Dedicated Consoles & Accessories pages
- �🔍 Advanced search and genre filtering
- 📄 Pagination for game listings
- 🎨 Detailed game information with screenshots
- ❤️ Wishlist functionality
- 🛒 Shopping cart with Redux
- 💳 Checkout UI
- 🌙 Premium dark/neon theme with glassmorphism
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

**Core:** React 19.2, Vite 7.2, React Router 7.9  
**State:** Redux Toolkit 2.11, React Query 5.90  
**Styling:** Tailwind CSS 4.1, Sass, Custom CSS  
**UI:** Framer Motion, Swiper, React Icons
**SEO:** React Helmet Async
**API:** RAWG API, Axios

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173)

---

## ☁️ Deploy to Vercel

Import this repository into Vercel and use:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

The `vercel.json` rewrite sends application routes to `index.html`, so links such
as `/game/:id` continue to work when opened directly or refreshed.

Add `VITE_RAWG_API_KEY` in the Vercel project's environment variables for the
environments where the app should run. Vite embeds `VITE_` variables in
client-side assets, so this value is visible to visitors; do not use it for
credentials that must remain private.

---

## 📁 Project Structure

```
game-store/
├── src/
│   ├── components/      # UI components (19 files)
│   ├── pages/          # Page components (7 files)
│   ├── hooks/          # Custom hooks (6 files)
│   ├── store/          # Redux store
│   ├── styles/         # CSS files
│   └── App.jsx
├── docs/               # Documentation
└── package.json
```

---

## 📚 Documentation

- **[Components Guide](docs/COMPONENTS.md)** - All component documentation
- **[Custom Hooks API](docs/HOOKS.md)** - Hook usage and examples
- **[API Reference](docs/API.md)** - RAWG API integration
- **[Styling Guide](docs/STYLING.md)** - Theme system and CSS

---

## 🎨 Key Components

### Navigation

- `<Navbar />` - Main navigation with cart badge
- `<Footer />` - Footer with links

### Game Display

- `<CardGame game={gameObj} />` - Game card with wishlist/cart
- `<HeroSlider />` - Featured games carousel
- `<FeaturedGames />` - Top-rated games grid

### Filters

- `<GenreFilter />` - Genre dropdown
- `<SearchBar />` - Search input
- `<Pagination />` - Page navigation

### Cart

- `<AddToCartButton game={gameObj} />` - Add to cart
- `<Creditcard />` - Checkout UI

---

## 🪝 Custom Hooks

```jsx
// Fetch games with filters
const { data: games, isLoading } = useGames({
  genre: "action",
  search: "zelda",
  page: 1,
});

// Get game details
const { data: game } = useGameDetails(gameId);

// Cart management
const { cart, addToCart, removeFromCart } = useCart();

// Wishlist
const { wishlist, addToWishlist, isInWishlist } = useWishList();

// Genres list
const { data: genres } = useGenres();
```

See [Hooks Documentation](docs/HOOKS.md) for complete API reference.

---

## 🌐 API Integration

**RAWG API** - Video game database

```javascript
// Endpoints used
GET / games; // List games
GET / games / { id }; // Game details
GET / genres; // Genre list
```

**LocalStorage** - Cart and wishlist persistence

See [API Documentation](docs/API.md) for details.

---

## 🎨 Styling System

### CSS Variables

```css
--primary: #00f2ea; /* Cyan */
--bg-dark: #050505; /* Dark background */
```

### Utility Classes

```css
.glass-panel {
  /* Glassmorphism effect */
}
.glass-card {
  /* Glass card style */
}
```

See [Styling Guide](docs/STYLING.md) for complete reference.

---

## 📜 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔧 Redux Store

```javascript
// Cart state
const cartItems = useSelector((state) => state.cart.items);
const totalPrice = useSelector((state) => state.cart.totalPrice);

// Actions
dispatch(addItem(game));
dispatch(removeItem(gameId));
dispatch(updateQuantity({ id, quantity }));
dispatch(clearCart());
```

---

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Order history
- [ ] Payment integration
- [done] Game reviews
- [ ] Admin dashboard

---

## 📝 Best Practices

**Components:** Keep small and focused, use functional components  
**State:** Redux for global, React Query for server, local for UI  
**Styling:** Use CSS variables, follow BEM naming  
**Performance:** Lazy load routes, memoize computations

---

**Built by: Moaaz Huusain**

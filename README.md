# 🎮 GAMER's NEST - Premium Game Store

A modern game store built with React, Redux Toolkit, React Query, and a local FastAPI/SQLite backend.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.0-764abc)

---

## ✨ Features

- 🎯 Browse games from the local catalog
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
**API:** FastAPI, SQLite, Axios

---

## 🚀 Quick Start

```powershell
# Install dependencies
npm install

# Start the FastAPI backend in a separate terminal
cd BackEnd
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

In another terminal, from the project root, start React:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Build for production with `npm run build`.

---

## ☁️ Deploy to Vercel

Import this repository into Vercel and use:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

The `vercel.json` rewrite sends application routes to `index.html`, so links such
as `/game/:id` continue to work when opened directly or refreshed.

Deploy the FastAPI backend and its SQLite database, then set
`VITE_API_BASE_URL` in the frontend deployment to the backend API URL ending in
`/api/v1`. Configure the backend's `FRONTEND_ORIGINS` with the frontend origin.
For local development, the frontend defaults to
`http://localhost:8000/api/v1`.
The backend reads `DATABASE_URL`, `SECRET_KEY`, and `FRONTEND_ORIGINS` from the
process environment. Set a private `SECRET_KEY` and a persistent database URL
in the deployment environment.

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
├── BackEnd/
│   ├── app/
│   │   ├── api/          # Dependencies and /api/v1 router
│   │   ├── core/         # Settings and password/JWT helpers
│   │   ├── db/           # SQLAlchemy base and session
│   │   ├── modules/
│   │   │   ├── auth/     # Existing registration and login
│   │   │   ├── catalog/  # Existing game and category API
│   │   │   ├── orders/   # Existing order endpoint and models
│   │   │   └── users/    # Existing user model
│   │   └── main.py
│   └── scripts/seed.py
├── docs/               # Documentation
└── package.json
```

---

## 📚 Documentation

- **[Components Guide](docs/COMPONENTS.md)** - All component documentation
- **[Custom Hooks API](docs/HOOKS.md)** - Hook usage and examples
- **[API Reference](docs/API.md)** - Local game catalog API
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

**Local FastAPI catalog** - Games and categories are read from the backend's
SQLite database.

```javascript
// Endpoints used
GET /api/v1/games; // List games
GET /api/v1/games/{id}; // Game details
GET /api/v1/genres; // Category list
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

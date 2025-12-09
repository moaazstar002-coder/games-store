# Custom Hooks API

Complete reference for all custom hooks.

---

## `useGames`

**File:** `src/hooks/usegames.js`

Fetch games from RAWG API with filtering.

**Parameters:**

```javascript
{
  genre?: string,    // Genre slug
  search?: string,   // Search query
  page?: number      // Page number
}
```

**Returns:**

```javascript
{
  data: Array,       // Games array
  isLoading: boolean,
  isError: boolean,
  error: Error
}
```

**Usage:**

```jsx
import { useGames } from "./hooks/usegames";

const { data: games, isLoading } = useGames({
  genre: "action",
  search: "zelda",
  page: 1,
});

if (isLoading) return <Loader />;
return games.map((game) => <CardGame key={game.id} game={game} />);
```

---

## `useGameDetails`

**File:** `src/hooks/usegameDetails.js`

Fetch detailed game information.

**Parameters:**

```javascript
id: number; // Game ID
```

**Returns:**

```javascript
{
  data: Object,      // Game details
  isLoading: boolean,
  isError: boolean
}
```

**Usage:**

```jsx
const { data: game, isLoading } = useGameDetails(gameId);
```

---

## `useGenres`

**File:** `src/hooks/useGenres.js`

Fetch available genres.

**Returns:**

```javascript
{
  data: Array,       // Genres array
  isLoading: boolean
}
```

**Genre Object:**

```javascript
{
  id: number,
  name: string,
  slug: string,
  games_count: number
}
```

**Usage:**

```jsx
const { data: genres } = useGenres();
```

---

## `useCart`

**File:** `src/hooks/useCart.js`

Cart management with localStorage fallback.

**Returns:**

```javascript
{
  cart: Array,
  loading: boolean,
  addToCart: function,
  removeFromCart: function,
  updateQuantity: function,
  isInCart: function,
  remoteAvailable: boolean
}
```

### Methods

#### `addToCart(item)`

Add item or increment quantity.

```javascript
addToCart({
  id: 1,
  name: "Game Name",
  price: 59.99,
  image: "url",
  quantity: 1,
});
```

#### `removeFromCart(id)`

Remove item from cart.

```javascript
removeFromCart(gameId);
```

#### `updateQuantity(id, quantity)`

Update item quantity.

```javascript
updateQuantity(gameId, 3);
```

#### `isInCart(id)`

Check if item exists in cart.

```javascript
const inCart = isInCart(gameId); // boolean
```

**Usage:**

```jsx
const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

// Add to cart
addToCart(game);

// Update quantity
updateQuantity(game.id, 5);

// Remove
removeFromCart(game.id);
```

---

## `useWishList`

**File:** `src/hooks/useWishList.js`

Wishlist management with localStorage.

**Returns:**

```javascript
{
  wishlist: Array,
  addToWishlist: function,
  removeFromWishlist: function,
  isInWishlist: function
}
```

**Usage:**

```jsx
const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
  useWishList();

// Check if in wishlist
const inWishlist = isInWishlist(gameId);

// Toggle wishlist
if (inWishlist) {
  removeFromWishlist(gameId);
} else {
  addToWishlist(game);
}
```

---

## `useFilteredGames`

**File:** `src/hooks/useFilteredGames.js`

Combined genre and search filtering.

**Parameters:**

```javascript
{
  genre: string,
  searchQuery: string
}
```

**Returns:**
Filtered games array.

---

**[← Back to README](../README.md)**

# API Documentation

Complete API reference for RAWG integration and local storage.

---

## RAWG API

**Base URL:** `https://api.rawg.io/api`  
**Authentication:** API key in query params

---

### Get Games List

```
GET /games
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | string | API key (required) |
| `page` | number | Page number |
| `page_size` | number | Results per page |
| `genres` | string | Genre slug filter |
| `search` | string | Search query |

**Response:**

```javascript
{
  count: number,
  next: string,
  previous: string,
  results: [
    {
      id: number,
      name: string,
      background_image: string,
      rating: number,
      released: string,
      genres: Array,
      platforms: Array,
      metacritic: number
    }
  ]
}
```

**Example:**

```javascript
const params = {
  key: "YOUR_API_KEY",
  page: 1,
  page_size: 20,
  genres: "action",
  search: "zelda",
};

const res = await axios.get("https://api.rawg.io/api/games", { params });
```

---

### Get Game Details

```
GET /games/{id}
```

**Response:**

```javascript
{
  id: number,
  name: string,
  description: string,
  background_image: string,
  rating: number,
  released: string,
  genres: Array,
  platforms: Array,
  developers: Array,
  publishers: Array,
  screenshots: Array,
  metacritic: number,
  website: string
}
```

---

### Get Genres

```
GET /genres
```

**Response:**

```javascript
{
  count: number,
  results: [
    {
      id: number,
      name: string,
      slug: string,
      games_count: number,
      image_background: string
    }
  ]
}
```

---

## LocalStorage API

### Cart Storage

**Key:** `cart:v1`

**Structure:**

```javascript
[
  {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
  },
];
```

**Usage:**

```javascript
// Save cart
localStorage.setItem("cart:v1", JSON.stringify(cartItems));

// Load cart
const cart = JSON.parse(localStorage.getItem("cart:v1") || "[]");
```

---

### Wishlist Storage

**Key:** `wishlist`

**Structure:**

```javascript
[
  {
    id: number,
    name: string,
    background_image: string,
    rating: number,
    price: number,
  },
];
```

---

## Redux Store API

### Cart State

```javascript
{
  items: Array,
  totalQuantity: number,
  totalPrice: number
}
```

### Actions

#### `addItem(item)`

```javascript
import { addItem } from "./store/slices/CartSlice";
dispatch(addItem({ id, name, price, image }));
```

#### `removeItem(id)`

```javascript
dispatch(removeItem(gameId));
```

#### `updateQuantity({ id, quantity })`

```javascript
dispatch(updateQuantity({ id: gameId, quantity: 5 }));
```

#### `clearCart()`

```javascript
dispatch(clearCart());
```

### Selectors

```javascript
const cartItems = useSelector((state) => state.cart.items);
const totalQuantity = useSelector((state) => state.cart.totalQuantity);
const totalPrice = useSelector((state) => state.cart.totalPrice);
```

---

**[← Back to README](../README.md)**

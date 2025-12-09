# Component Documentation

Complete reference for all GameZone components.

---

## Navigation Components

### `<Navbar />`

**File:** `src/components/navbar.jsx`

Main navigation bar with cart badge and responsive menu.

**Usage:**

```jsx
import Navbar from "./components/navbar";
<Navbar />;
```

---

### `<Footer />`

**File:** `src/components/footer.jsx`

Footer with social links and copyright.

---

## Game Display Components

### `<CardGame />`

**File:** `src/components/cardGame.jsx`

Game card with wishlist and cart functionality.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `game` | Object | Yes |

**Game Object:**

```javascript
{
  id: number,
  name: string,
  background_image: string,
  rating: number,
  price: number,
  genres: Array
}
```

**Usage:**

```jsx
<CardGame game={gameObject} />
```

---

### `<SemiGameCard />`

**File:** `src/components/semigamecard.jsx`

Compact game card for featured sections.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `game` | Object | Yes |

---

### `<FeaturedGames />`

**File:** `src/components/featuredGAmes.jsx`

Grid of top-rated games.

**Features:**

- Fetches featured games
- Grid layout
- Loading states

---

### `<HeroSlider />`

**File:** `src/components/HeroSlider.jsx`

Swiper carousel for hero section.

**Features:**

- Auto-play
- Navigation arrows
- Pagination dots
- Responsive

---

## Filter Components

### `<GenreFilter />`

**File:** `src/components/GenreFilter.jsx`

Genre dropdown filter.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `selectedGenre` | string | Yes |
| `onGenreChange` | function | Yes |

**Usage:**

```jsx
<GenreFilter selectedGenre={genre} onGenreChange={(g) => setGenre(g)} />
```

---

### `<SearchBar />`

**File:** `src/components/SearchBar.jsx`

Search input component.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `searchQuery` | string | Yes |
| `onSearchChange` | function | Yes |

**Usage:**

```jsx
<SearchBar searchQuery={search} onSearchChange={(q) => setSearch(q)} />
```

---

### `<Categories />`

**File:** `src/components/Categories.jsx`

Category navigation buttons.

---

### `<Pagination />`

**File:** `src/components/Pagination.jsx`

Page navigation controls.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `currentPage` | number | Yes |
| `totalPages` | number | Yes |
| `onPageChange` | function | Yes |

**Usage:**

```jsx
<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={(p) => setPage(p)}
/>
```

---

## Cart Components

### `<AddToCartButton />`

**File:** `src/components/AddToCartButton.jsx`

Add to cart button with Redux integration.

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `game` | Object | Yes |

**Usage:**

```jsx
<AddToCartButton game={gameObject} />
```

---

### `<Creditcard />`

**File:** `src/components/Creditcard.jsx`

Credit card UI for checkout.

**Features:**

- Card number formatting
- Expiry validation
- CVV input
- Glassmorphism design

---

## Utility Components

### `<Loader />`

**File:** `src/components/Loader.jsx`

Loading spinner with neon glow.

**Usage:**

```jsx
{
  loading && <Loader />;
}
```

---

### `<WishlistContent />`

**File:** `src/components/wishlistContent.jsx`

Displays wishlist items in grid.

**Features:**

- Grid layout
- Remove from wishlist
- Empty state

---

## Pages

### `<Home />`

Hero slider, categories, and featured games.

### `<AllGames />`

Complete game listing with filters and pagination.

### `<GameDetails />`

Detailed game information page.

### `<Cart />`

Shopping cart with checkout.

### `<WishList />`

User's saved games.

### `<About />`

About GameZone page.

### `<NotFound />`

404 error page.

---

**[← Back to README](../README.md)**

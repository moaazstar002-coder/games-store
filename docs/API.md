# API Documentation

The React app calls the FastAPI backend, which reads games and categories from
the local SQLite database. No external game-data API or API key is required.

## Configuration

For local development, run the backend from `BackEnd`:

```powershell
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The frontend defaults to `http://localhost:8000/api/v1`. Override the API base URL
with `VITE_API_BASE_URL` when deploying the frontend. Set `FRONTEND_ORIGINS` on
the backend to a comma-separated list of allowed frontend origins; local Vite
origins on ports 3000 and 5173 are allowed by default.
The backend also reads `DATABASE_URL` and `SECRET_KEY` from its process
environment. Set a private `SECRET_KEY` before deployment. Settings are read
from process environment variables; a `.env` file is not loaded automatically.

The database file is `BackEnd/sql_app.db`. Tables are created automatically
when the backend starts, and the sample catalog in `BackEnd/scripts/seed.py` is
added automatically without duplicating existing category or game slugs. Run
`.\venv\Scripts\python.exe -m scripts.seed` from `BackEnd` to apply the seed again
manually. The `games.category_id` field references `categories.id`.

## FastAPI endpoints

### List games

```http
GET /api/v1/games?page=1&page_size=20&genre=action&search=zelda&ordering=-rating
```

All parameters are optional. `page` must be positive, `page_size` must be
between 1 and 40, and search/filter strings are length-limited. `genre` accepts
a category slug or numeric ID. `search` matches game titles and descriptions.
Supported ordering values include `-added`, `name`, `-name`, `rating`,
`-rating`, `price`, and `-price`. The response includes `count` and `results`.
Game objects expose both the database field names and the frontend-compatible
`name` and `background_image` fields.

### Get game details

```http
GET /api/v1/games/{game_id}
```

Returns the game and its category for a positive numeric ID, or `404` if it is
not in the local catalog.

### Get game movies

```http
GET /api/v1/games/{game_id}/movies
```

Returns an empty paginated response because the local catalog does not store
game videos.

### Get genres

```http
GET /api/v1/genres
```

Returns a paginated response containing the categories in the local database. Upstream
pagination URLs are omitted.

### Errors

- `404` — the requested game does not exist in the local catalog.
- `422` — invalid query parameters or game ID.

## LocalStorage

### Cart

**Key:** `cart:v1`

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

### Wishlist

**Key:** `wishlist`

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

## Redux Store

```javascript
{
  items: Array,
  totalQuantity: number,
  totalPrice: number
}
```

Actions include `addItem(item)`, `removeItem(id)`, `updateQuantity({ id,
quantity })`, and `clearCart()`.

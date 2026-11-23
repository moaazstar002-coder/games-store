/**
 * WishlistSlice Unit Tests
 *
 * TDD — RED phase: these tests define the EXPECTED behavior AFTER purification.
 * They will FAIL until WishlistSlice.js is updated.
 *
 * Goals:
 * 1. Reducers must be PURE — no toast calls, no side effects
 * 2. addToWishlist: adds unique items only, ignores duplicates
 * 3. removeFromWishlist: removes the correct item
 * 4. clearWishlist: empties the list
 * 5. addToWishlist with invalid data: does NOT add, does NOT crash with toast
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import wishlistReducer, {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../store/slices/WishlistSlice';

// ─── Mock sonner BEFORE importing the slice ───────────────────────────────────
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

import { toast } from 'sonner';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const makeGame = (overrides = {}) => ({
  id: 1,
  name: 'Test Game',
  price: 59.99,
  ...overrides,
});

const emptyState = { items: [] };

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('WishlistSlice — Reducer Purity (no side effects)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('addToWishlist should NOT call toast', () => {
    wishlistReducer(emptyState, addToWishlist(makeGame()));
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.info).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('addToWishlist with duplicate should NOT call toast', () => {
    const stateWithGame = { items: [makeGame()] };
    wishlistReducer(stateWithGame, addToWishlist(makeGame()));
    expect(toast.info).not.toHaveBeenCalled();
  });

  it('addToWishlist with invalid data should NOT call toast', () => {
    // Previously the reducer called toast.error for invalid data
    wishlistReducer(emptyState, addToWishlist(null));
    wishlistReducer(emptyState, addToWishlist({}));
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('removeFromWishlist should NOT call toast', () => {
    const state = { items: [makeGame()] };
    wishlistReducer(state, removeFromWishlist(1));
    expect(toast.info).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});

describe('WishlistSlice — addToWishlist state logic', () => {
  it('adds a new game to empty wishlist', () => {
    const result = wishlistReducer(emptyState, addToWishlist(makeGame()));
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(1);
  });

  it('does NOT add duplicate game (same id)', () => {
    const stateWithGame = { items: [makeGame()] };
    const result = wishlistReducer(stateWithGame, addToWishlist(makeGame()));
    expect(result.items).toHaveLength(1);
  });

  it('adds different games correctly', () => {
    const state = { items: [makeGame({ id: 1 })] };
    const result = wishlistReducer(state, addToWishlist(makeGame({ id: 2 })));
    expect(result.items).toHaveLength(2);
  });

  it('ignores null payload gracefully (no crash)', () => {
    expect(() => {
      wishlistReducer(emptyState, addToWishlist(null));
    }).not.toThrow();
    const result = wishlistReducer(emptyState, addToWishlist(null));
    expect(result.items).toHaveLength(0);
  });

  it('ignores payload without id gracefully (no crash)', () => {
    expect(() => {
      wishlistReducer(emptyState, addToWishlist({}));
    }).not.toThrow();
    const result = wishlistReducer(emptyState, addToWishlist({}));
    expect(result.items).toHaveLength(0);
  });
});

describe('WishlistSlice — removeFromWishlist state logic', () => {
  it('removes the correct game by id', () => {
    const state = {
      items: [makeGame({ id: 1 }), makeGame({ id: 2 })],
    };
    const result = wishlistReducer(state, removeFromWishlist(1));
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(2);
  });

  it('does nothing when id not found', () => {
    const state = { items: [makeGame({ id: 1 })] };
    const result = wishlistReducer(state, removeFromWishlist(999));
    expect(result.items).toHaveLength(1);
  });

  it('results in empty list when last item removed', () => {
    const state = { items: [makeGame({ id: 1 })] };
    const result = wishlistReducer(state, removeFromWishlist(1));
    expect(result.items).toHaveLength(0);
  });
});

describe('WishlistSlice — clearWishlist state logic', () => {
  it('clears all items', () => {
    const state = {
      items: [makeGame({ id: 1 }), makeGame({ id: 2 }), makeGame({ id: 3 })],
    };
    const result = wishlistReducer(state, clearWishlist());
    expect(result.items).toHaveLength(0);
  });

  it('clearWishlist on empty state stays empty', () => {
    const result = wishlistReducer(emptyState, clearWishlist());
    expect(result.items).toHaveLength(0);
  });
});

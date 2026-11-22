import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Checkout from '../pages/Checkout';
import cartReducer from '../store/slices/CartSlice';
import api from '../lib/api';

vi.mock('../lib/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

function renderCheckoutWithCart(initialItems = []) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: initialItems,
        totalQuantity: initialItems.reduce((acc, it) => acc + (it.quantity || 1), 0),
        totalPrice: initialItems.reduce((acc, it) => acc + (it.price * (it.quantity || 1)), 0),
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    </Provider>
  );
}

describe('Checkout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty cart state when cart has no items', () => {
    renderCheckoutWithCart([]);
    expect(screen.getByText(/Your Cart is Empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Browse Games/i })).toBeInTheDocument();
  });

  it('renders checkout form without raw card number or CVV inputs', () => {
    renderCheckoutWithCart([
      { id: 1, title: 'God of War', price: 39.99, quantity: 1, image: 'img.jpg' },
    ]);

    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument();

    // Verify card number and CVV are NOT present
    expect(screen.queryByPlaceholderText(/\*\*\*\* \*\*\*\* \*\*\*\* 1234/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/\*\*\*/i)).not.toBeInTheDocument();
  });

  it('submits order payload to /orders API and handles success', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message: 'تم إنشاء الطلب بنجاح',
        order_id: 42,
        buyer: 'Gamer Hero',
        total_amount: 39.99,
        items_count: 1,
      },
    });

    renderCheckoutWithCart([
      { id: 1, title: 'God of War', price: 39.99, quantity: 1, image: 'img.jpg' },
    ]);

    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), {
      target: { value: 'Gamer Hero' },
    });
    fireEvent.change(screen.getByPlaceholderText(/john@example.com/i), {
      target: { value: 'hero@example.com' },
    });

    const submitBtn = screen.getByRole('button', { name: /Place Order/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        '/orders',
        expect.objectContaining({
          items: [{ game_id: 1, quantity: 1 }],
          customer_name: 'Gamer Hero',
          customer_email: 'hero@example.com',
        })
      );
    });
  });
});

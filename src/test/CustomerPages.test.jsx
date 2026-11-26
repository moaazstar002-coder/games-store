import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Cart from '../pages/Cart';
import HelpCenter from '../pages/HelpCenter';
import cartReducer from '../store/slices/CartSlice';

describe('Customer pages', () => {
  it('lets customers browse games from an empty cart', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link', { name: /browse games/i })).toHaveAttribute(
      'href',
      '/games',
    );
  });

  it('connects help topics to FAQ sections and exposes accordion state', () => {
    render(
      <MemoryRouter>
        <HelpCenter />
      </MemoryRouter>,
    );

    expect(document.getElementById('orders')).toBeInTheDocument();

    const question = screen.getByRole('button', {
      name: /how long does shipping take/i,
    });
    expect(question).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/standard shipping typically takes/i)).toBeInTheDocument();
  });
});

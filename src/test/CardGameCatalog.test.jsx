import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CardGame from "../components/CardGame";
import cartReducer from "../store/slices/CartSlice";

vi.mock("../hooks/useWishList", () => ({
  useWishList: () => ({
    loading: false,
    addToWishlist: vi.fn(),
    removeFromWishlist: vi.fn(),
    isInWishlist: () => false,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("CardGame catalog products", () => {
  it("adds a non-game product to cart without linking to a game detail route", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: { items: [], totalQuantity: 0, totalPrice: 0 },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardGame
            variant="storefront"
            game={{
              id: "accessories:7",
              product_type: "accessory",
              product_id: 7,
              title: "Wireless Gaming Headset",
              image: "headset.jpg",
              price: 129.99,
              rating: 4.6,
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(store.getState().cart.items[0]).toMatchObject({
      id: "accessories:7",
      product_type: "accessory",
      product_id: 7,
      price: 129.99,
      quantity: 1,
    });
  });
});

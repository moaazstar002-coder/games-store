import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Accessories from "../pages/Accessories";
import Consoles from "../pages/Consoles";
import { useCatalogProducts } from "../hooks/useCatalogProducts";

vi.mock("../hooks/useCatalogProducts", () => ({
  useCatalogProducts: vi.fn(),
}));

vi.mock("../components/PageTransition", () => ({
  default: ({ children }) => children,
}));

vi.mock("../components/CardGame", () => ({
  default: ({ game }) => (
    <article
      data-product-type={game.product_type}
      data-product-id={game.product_id}
      data-product-key={game.id}
    >
      {game.title}
    </article>
  ),
}));

function renderPage(Page) {
  return render(
    <MemoryRouter>
      {createElement(Page)}
    </MemoryRouter>
  );
}

describe("Console and accessory catalog pages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads consoles from the catalog API", () => {
    useCatalogProducts.mockReturnValue({
      data: { results: [{ id: 1, title: "PlayStation 5 Slim" }], count: 1 },
      isLoading: false,
      isError: false,
    });

    renderPage(Consoles);

    const product = screen.getByText("PlayStation 5 Slim");
    expect(product).toBeInTheDocument();
    expect(product.closest("article")).toHaveAttribute("data-product-type", "console");
    expect(product.closest("article")).toHaveAttribute("data-product-id", "1");
    expect(useCatalogProducts).toHaveBeenCalledWith(
      "consoles",
      expect.objectContaining({ page: 1 })
    );
  });

  it("shows loading state for accessories", () => {
    useCatalogProducts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderPage(Accessories);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(useCatalogProducts).toHaveBeenCalledWith(
      "accessories",
      expect.objectContaining({ page: 1 })
    );
  });

  it("shows API errors instead of hiding them as an empty catalog", () => {
    useCatalogProducts.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    renderPage(Accessories);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(/لا توجد منتجات/)).not.toBeInTheDocument();
  });

  it("renders a clear empty state when the API returns no products", () => {
    useCatalogProducts.mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      isError: false,
    });

    renderPage(Consoles);

    expect(screen.getByText(/لا توجد منتجات/)).toBeInTheDocument();
  });

  it("supports pagination and resets to the first page when search or filters change", () => {
    useCatalogProducts.mockReturnValue({
      data: { results: [{ id: 1, title: "Xbox Series X" }], count: 21 },
      isLoading: false,
      isError: false,
    });

    renderPage(Consoles);

    fireEvent.click(screen.getByRole("button", { name: "الصفحة التالية" }));
    expect(useCatalogProducts).toHaveBeenLastCalledWith(
      "consoles",
      expect.objectContaining({ page: 2 })
    );

    fireEvent.change(screen.getByRole("searchbox", { name: "ابحث في أجهزة الألعاب" }), {
      target: { value: "Xbox" },
    });
    expect(useCatalogProducts).toHaveBeenLastCalledWith(
      "consoles",
      expect.objectContaining({ page: 1, search: "Xbox" })
    );

    fireEvent.change(screen.getByLabelText("المنصة"), {
      target: { value: "Xbox" },
    });
    expect(useCatalogProducts).toHaveBeenLastCalledWith(
      "consoles",
      expect.objectContaining({ page: 1, filter: "Xbox" })
    );

    fireEvent.change(screen.getByLabelText("ترتيب حسب"), {
      target: { value: "-price" },
    });
    expect(useCatalogProducts).toHaveBeenLastCalledWith(
      "consoles",
      expect.objectContaining({ page: 1, ordering: "-price" })
    );
  });

  it("retries a failed catalog request when requested", () => {
    const refetch = vi.fn();
    useCatalogProducts.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch,
    });

    renderPage(Accessories);
    fireEvent.click(screen.getByRole("button", { name: "إعادة المحاولة" }));

    expect(refetch).toHaveBeenCalledOnce();
  });
});

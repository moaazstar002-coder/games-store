import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "../lib/api";
import { useCatalogProducts } from "../hooks/useCatalogProducts";

vi.mock("../lib/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe("useCatalogProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests paginated consoles with search and platform filters", async () => {
    api.get.mockResolvedValueOnce({
      data: { count: 1, results: [{ id: 3, title: "Nintendo Switch OLED" }] },
    });

    const { result } = renderHook(
      () =>
        useCatalogProducts("consoles", {
          page: 2,
          search: "switch",
          ordering: "price",
          filter: "Nintendo",
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith("/consoles", {
      params: {
        page: 2,
        page_size: 20,
        ordering: "price",
        search: "switch",
        platform: "Nintendo",
      },
    });
    expect(result.current.data.count).toBe(1);
  });

  it("passes accessory category filters and preserves API errors", async () => {
    const apiError = new Error("backend unavailable");
    api.get.mockRejectedValueOnce(apiError);

    const { result } = renderHook(
      () =>
        useCatalogProducts("accessories", {
          filter: "Headsets",
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(api.get).toHaveBeenCalledWith("/accessories", {
      params: {
        page: 1,
        page_size: 20,
        ordering: "-added",
        category: "Headsets",
      },
    });
    expect(result.current.error).toBe(apiError);
  });
});

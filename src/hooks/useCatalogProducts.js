import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const catalogPaths = {
  consoles: "/consoles",
  accessories: "/accessories",
};

export function useCatalogProducts(
  productType,
  { page = 1, pageSize = 20, search = "", ordering = "-added", filter = "" } = {}
) {
  return useQuery({
    queryKey: [
      "catalog-products",
      productType,
      page,
      pageSize,
      search,
      ordering,
      filter,
    ],
    queryFn: async () => {
      const path = catalogPaths[productType];
      if (!path) {
        throw new Error(`Unknown catalog product type: ${productType}`);
      }

      const params = { page, page_size: pageSize, ordering };
      if (search.trim()) params.search = search.trim();
      if (filter.trim()) {
        params[productType === "consoles" ? "platform" : "category"] =
          filter.trim();
      }

      const response = await api.get(path, { params });
      if (!Array.isArray(response.data?.results)) {
        throw new Error(`Invalid ${productType} catalog response.`);
      }
      return response.data;
    },
    staleTime: 1000 * 60,
  });
}

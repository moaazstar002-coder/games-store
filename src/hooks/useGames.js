import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export function useGames({ genre, search, page, ordering } = {}) {
  return useQuery({
    queryKey: [
      "games",
      genre || "all",
      search || "",
      page || 1,
      ordering || "default",
    ],
    queryFn: async () => {
      const params = {
        page_size: 20,
        page: page || 1,
      };
      if (genre) params.genre = genre;
      if (search) params.search = search;
      if (ordering) params.ordering = ordering;

      const res = await api.get("/games", { params });
      return res.data?.results || [];
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });
}

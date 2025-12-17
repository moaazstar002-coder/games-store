import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const key =
  import.meta.env.VITE_RAWG_API_KEY || "2c014c5b22214e628eecac2b366c6441";

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
        key: key,
        page_size: 20,
        page: page || 1,
      };
      console.log("API Key:", key);
      if (genre) params.genres = genre;
      if (search) params.search = search;
      if (ordering) params.ordering = ordering;

      const res = await axios.get("https://api.rawg.io/api/games", { params });
      return res.data?.results || [];
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });
}

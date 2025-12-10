import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const key = import.meta.env.VITE_RAWG_API_KEY;


export function useGames({ genre, search, page } = {}) {
  return useQuery({
    queryKey: ["games", genre || "all", search || "", page || 1],
    queryFn: async () => {
      const params = {
        key: key,
        page_size: 20,
        page: page || 1,
      };

      if (genre) params.genres = genre;
      if (search) params.search = search;

      const res = await axios.get("https://api.rawg.io/api/games", { params });
      return res.data?.results || [];
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 1,
  });
}

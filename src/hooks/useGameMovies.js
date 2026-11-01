import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const key = import.meta.env.VITE_RAWG_API_KEY || "2c014c5b22214e628eecac2b366c6441";

export function useGameMovies(gameId) {
  return useQuery({
    queryKey: ["gameMovies", gameId],
    queryFn: async () => {
      const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/movies`, {
        params: { key },
      });
      return response.data?.results || [];
    },
    enabled: Boolean(gameId),
    staleTime: 1000 * 60 * 60,
  });
}

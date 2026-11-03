import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export function useGameMovies(gameId) {
  return useQuery({
    queryKey: ["gameMovies", gameId],
    queryFn: async () => {
      const response = await api.get(`/games/${gameId}/movies`);
      return response.data?.results || [];
    },
    enabled: Boolean(gameId),
    staleTime: 1000 * 60 * 60,
  });
}

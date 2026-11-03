import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await api.get("/genres");
      return res.data.results;
    },
    staleTime: 1000 * 60 * 60,
  });
}

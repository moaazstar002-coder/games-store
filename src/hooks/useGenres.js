const key =
  import.meta.env.VITE_RAWG_API_KEY || "2c014c5b22214e628eecac2b366c6441";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axios.get("https://api.rawg.io/api/genres", {
        params: {
          key: key,
        },
      });
      return res.data.results;
    },
    staleTime: 1000 * 60 * 60,
  });
}

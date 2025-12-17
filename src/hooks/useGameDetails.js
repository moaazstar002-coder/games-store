
const key =
  import.meta.env.VITE_RAWG_API_KEY || "2c014c5b22214e628eecac2b366c6441";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export function useGameDetails() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["gameDetails", id],
    queryFn: async () => {
      const res = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: { key: key },
      });
      return res.data;

    },
    staleTime: 1000 * 60 * 5,

  });

}



import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export function useGameDetails() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["gameDetails", id],
    queryFn: async () => {
      const res = await api.get(`/games/${id}`);
      return res.data;

    },
    staleTime: 1000 * 60 * 5,

  });

}

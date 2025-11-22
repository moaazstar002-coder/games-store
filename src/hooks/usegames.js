import { useEffect, useState } from "react";
import axios from "axios";

export function useGames({ genre, search, page} = {}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: "2c014c5b22214e628eecac2b366c6441",
            page_size: 40,
            page: page || 1,
            genres: genre || undefined,
            search: search || undefined,
          },
        });

        setGames(res.data.results || []); 
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [genre, search, page]);

  return { games, loading };
}

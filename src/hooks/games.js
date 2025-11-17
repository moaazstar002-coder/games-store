import { useEffect, useState } from "react";
import axios from "axios";

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await axios.get("https://api.rawg.io/api/games", {
          params: { key: "2c014c5b22214e628eecac2b366c6441" }
        });
        setGames(res.data.results); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  return { games, loading };
}

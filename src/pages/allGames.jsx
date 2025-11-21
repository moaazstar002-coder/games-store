import React, { useState } from "react";
import { useGames } from "../hooks/usegames";
import useFilteredGames from "../hooks/useFilteredGames";
import CardGame from "../components/CardGame";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import '../styles/pages/AllGames.css';

export default function AllGames() {
  const { games, loading } = useGames();
  const [search, setSearch] = useState("");
  const filteredGames = useFilteredGames(games, search);

  const gamesToDisplay = filteredGames;

  if (loading) return <Loader />;

  return (
    <div className="all-games">
      <h2>All Games</h2>
      
      <div className="container">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className="game-list">
        {gamesToDisplay.length > 0 ? (
          gamesToDisplay.map((game) => (
            <CardGame
              key={game.id}
              game={{
                id: game.id,
                title: game.name,
                image: game.background_image,
                price: "$59.99",
                rating: game.rating
              }}
            />
          ))
        ) : (
          <p className="no-results">No games found matching "{search}"</p>
        )}
      </div>
    </div>
  );
}

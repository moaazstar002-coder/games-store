import React, { useState } from "react";
import { useGames } from "../hooks/usegames";
import CardGame from "../components/CardGame";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import "../styles/pages/AllGames.css";
import Pagination from "../components/Pagination";

export default function AllGames() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: games, isLoading: loading } = useGames({ search, page });

  const gamesToDisplay = games || [];

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
                rating: game.rating,
              }}
            />
          ))
        ) : (
          <p className="no-results">No games found matching "{search}"</p>
        )}
      </div>
       <Pagination page={page} setPage={setPage} />
    </div>
  );
}

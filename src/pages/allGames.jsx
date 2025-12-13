import React, { useState } from "react";
import { useGames } from "../hooks/usegames";
import CardGame from "../components/CardGame";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import "../styles/pages/AllGames.css";
import Pagination from "../components/Pagination";

import PageTransition from "../components/PageTransition";
import GameCardSkeleton from "../components/GameCardSkeleton";

export default function AllGames() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: games, isLoading: loading } = useGames({ search, page });

  const gamesToDisplay = games || [];

  if (loading) {
    // We want to show skeletons, not block the whole UI
  }

  return (
    <PageTransition>
    <div className="all-games">
      <h2>All Games</h2>

      <div className="container">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className="game-list">
        {loading ? (
           Array.from({ length: 12 }).map((_, index) => (
             <GameCardSkeleton key={index} />
           ))
        ) : gamesToDisplay.length > 0 ? (
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
    </PageTransition>
  );
}

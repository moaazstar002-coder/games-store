import React, { useState } from "react";
import { useGames } from "../hooks/useGames";
import CardGame from "../components/CardGame";
import SearchBar from "../components/SearchBar";
import "../styles/pages/AllGames.css";
import Pagination from "../components/Pagination";

import PageTransition from "../components/PageTransition";
import GameCardSkeleton from "../components/GameCardSkeleton";

export default function AllGames() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: games, isLoading: loading } = useGames({ search, page });

  const gamesToDisplay = games || [];



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
            gamesToDisplay.map((game) => {
              // Generate a deterministic price (number) based on game.id
              const price = game.price
                ? parseFloat(game.price)
                : parseFloat(((game.id % 5000) / 100 + 9.99).toFixed(2));
              return (
                <CardGame
                  key={game.id}
                  game={{
                    id: game.id,
                    title: game.name,
                    image: game.background_image,
                    price,          // ← number, not string
                    rating: game.rating,
                  }}
                />
              );
            })
          ) : (
            <p className="no-results">No games found matching "{search}"</p>
          )}
        </div>
        <Pagination page={page} setPage={setPage} />
      </div>
    </PageTransition>
  );
}

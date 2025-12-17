import React, { useState } from "react";
import { useGames } from "../hooks/useGames";
import Pagination from "../components/Pagination";
import PageTransition from "../components/PageTransition";
import GameCardSkeleton from "../components/GameCardSkeleton";
import "../styles/pages/AllGames.css";

export default function BestSellers() {
  const [page, setPage] = useState(1);
  const { data: games, isLoading: loading } = useGames({ page, ordering: "-added" });

  const gamesToDisplay = games || [];

  return (
    <PageTransition>
      <div className="best-sellers-page all-games">
        <h2 className="page-title">Best Sellers</h2>

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
            <p className="no-results">No best sellers found.</p>
          )}
        </div>
        
        <Pagination page={page} setPage={setPage} />
      </div>
    </PageTransition>
  );
}

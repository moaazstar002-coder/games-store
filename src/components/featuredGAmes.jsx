import React from "react";
import CardGame from "./CardGame";
import useFilteredGames from "../hooks/useFilteredGames"; 
import Loader from "./Loader";
import GameCardSkeleton from "./GameCardSkeleton";
import '../styles/components/FeaturedGames.css';


export default function FeaturedGames({ games = [], loading = false, search = '' }) {
  const filteredGames = useFilteredGames(games, search);

  // Removed early return for loader to use skeleton
  // if (loading) return <Loader />;

  return (
    <section className="container">
      <h2 className="section-title">Featured Games</h2>

      <div className="featured-games-container">
        {loading ? (
           Array.from({ length: 4 }).map((_, index) => (
             <GameCardSkeleton key={index} />
           ))
        ) : filteredGames.length > 0 ? (
          filteredGames.map((game) => (
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
    </section>
  );
}

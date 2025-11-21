import React from "react";
import CardGame from "./CardGame";
import useFilteredGames from "../hooks/useFilteredGames"; 
import Loader from "./Loader";
import '../styles/components/FeaturedGames.css';

export default function FeaturedGames({ games = [], loading = false, search = '' }) {
  const filteredGames = useFilteredGames(games, search);

  if (loading) return <Loader />;

  return (
    <section className="container">
      <h2 className="section-title">Featured Games</h2>

      <div className="featured-games-container">
        {filteredGames.length > 0 ? (
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

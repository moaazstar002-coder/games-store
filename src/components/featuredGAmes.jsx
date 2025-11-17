import React from "react";
import CardGame from "./cardGame";
import { useGames } from "../hooks/games";
export default function FeaturedGames() {
  const { games, loading } = useGames();

  if (loading) return <p>Loading games...</p>;

  return (
    <div className="featured-games-container">
      {games.map((game) => (
        <CardGame
          key={game.id}
          game={{
            title: game.name,
            image: game.background_image,
            price: "$59.99", 
            rating: game.rating
          }}
        />
      ))}
    </div>
  );
}

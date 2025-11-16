import React from 'react'
import CardGame from './cardGame'
import './cardGame.css'
export default function FeaturedGames({ games }) {
  return (
    <div className="featured-games-container">
      {games.map((game) => (
        <CardGame key={game.id} game={game} />
      ))}
    </div>
  )
}
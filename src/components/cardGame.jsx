import React from 'react'
import './cardGame.css'
export default function CardGame({ game }) {
  return (
    <div className="card-game">
      <img src={game.image} alt={game.title} className="game-image" />
      <h3 className="game-title">{game.title}</h3>
      <p className="game-price">{game.price}</p>
      <p className="game-rating">Rating: {game.rating} / 5</p>
    </div>
  )
}
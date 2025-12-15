import React from "react";
import CardGame from "../components/CardGame";
import PageTransition from "../components/PageTransition";
import "../styles/pages/AllGames.css";

export default function Accessories() {
  const accessories = [
    { id: "acc-1", name: "Wireless Controller", background_image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=1000&auto=format&fit=crop", rating: 4.5 },
    { id: "acc-2", name: "Gaming Headset", background_image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop", rating: 4.4 },
    { id: "acc-3", name: "Mechanical Keyboard", background_image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop", rating: 4.7 },
    { id: "acc-4", name: "Gaming Mouse", background_image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop", rating: 4.6 },
  ];

  return (
    <PageTransition>
      <div className="accessories-page all-games">
        <h2 className="page-title">Accessories</h2>

        <div className="game-list">
          {accessories.map(item => (
            <CardGame
              key={item.id}
              game={{
                id: item.id,
                title: item.name,
                image: item.background_image,
                price: "$59.99",
                rating: item.rating,
              }}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

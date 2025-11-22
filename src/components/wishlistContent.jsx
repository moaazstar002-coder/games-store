import React from "react";
import CardGame from "./CardGame";
import { useWishList } from "../hooks/useWishList";

export default function WishListContent() { 
    const { wishList, loading } = useWishList();
    
    if (loading) return <div className="loading">Loading wish list...</div>;
    if (wishList.length === 0) return <div className="empty">Your wish list is empty.</div>;
        
    return (
        <div className="wish-list">
            {wishList.map((game) => (
                <CardGame key={game.id} game={game} />
            ))}
        </div>
    );
}   
      
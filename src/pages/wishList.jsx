import React from "react";
import "../styles/pages/WishList.css";
import WishListContent from "../components/wishlistContent";

export default function WishList() {
  return (
    <div className="container wishlist-page">
      <h1>Your Wishlist</h1>
      <WishListContent />
    </div>
  );
}
import React from "react";
import "../styles/pages/WishList.css";
import WishListContent from "../components/WishlistContent";

import PageTransition from "../components/PageTransition";

export default function WishList() {
  return (
    <PageTransition>
    <div className="container wishlist-page">
      <h1>Your Wishlist</h1>
      <WishListContent />
    </div>
    </PageTransition>
  );
}
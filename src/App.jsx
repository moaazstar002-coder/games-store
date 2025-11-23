import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import GameDetails from "./pages/gameDetails";
import AllGames from "./pages/AllGames";
import WishList from "./pages/wishList";
import Cart from "./pages/cart";
function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
         <Route path="/games" element={<AllGames />} />
        <Route path="/WishList" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

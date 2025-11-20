import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import AllGames from "./pages/allGames";
import GameDetails from "./pages/gameDetails";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="*" element={<div style={{padding: '4rem', textAlign: 'center'}}>404 — Page not found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

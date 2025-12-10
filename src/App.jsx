import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from 'sonner';
import Loader from "./components/Loader";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const GameDetails = lazy(() => import("./pages/gameDetails"));
const AllGames = lazy(() => import("./pages/AllGames"));
const WishList = lazy(() => import("./pages/wishList"));
const Cart = lazy(() => import("./pages/cart"));
const About = lazy(() => import("./pages/about"));
const NotFound = lazy(() => import("./pages/404_NotFound"));

function App() {
  return (
    <>
    <Toaster position="top-right" richColors />
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
           <Route path="/games" element={<AllGames />} />
          <Route path="/WishList" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;

import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './Loader';

const Home = React.lazy(() => import('../pages/Home'));
const GameDetails = React.lazy(() => import('../pages/gameDetails'));
const AllGames = React.lazy(() => import('../pages/AllGames'));
const WishList = React.lazy(() => import('../pages/wishList'));
const Cart = React.lazy(() => import('../pages/cart'));
const About = React.lazy(() => import('../pages/about'));
const ContactUs = React.lazy(() => import('../pages/ContactUs'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('../pages/TermsOfService'));
const HelpCenter = React.lazy(() => import('../pages/HelpCenter'));
const NotFound = React.lazy(() => import('../pages/404_NotFound'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        } />
        
        <Route path="/game/:id" element={
          <Suspense fallback={<Loader />}>
            <GameDetails />
          </Suspense>
        } />
        
        <Route path="/games" element={
          <Suspense fallback={<Loader />}>
            <AllGames />
          </Suspense>
        } />
        
        <Route path="/WishList" element={
          <Suspense fallback={<Loader />}>
            <WishList />
          </Suspense>
        } />
        
        <Route path="/cart" element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        } />
        
        <Route path="/about" element={
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        } />
        
        <Route path="/contact" element={
          <Suspense fallback={<Loader />}>
            <ContactUs />
          </Suspense>
        } />
        
        <Route path="/privacy" element={
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        } />
        
        <Route path="/terms" element={
          <Suspense fallback={<Loader />}>
            <TermsOfService />
          </Suspense>
        } />
        
        <Route path="/help" element={
          <Suspense fallback={<Loader />}>
            <HelpCenter />
          </Suspense>
        } />
        
        <Route path="*" element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
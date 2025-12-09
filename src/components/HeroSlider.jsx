import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/components/HeroSlider.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function useFeaturedGames() {
  return useQuery({
    queryKey: ["featuredGames"],
    queryFn: async () => {
      const res = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "2c014c5b22214e628eecac2b366c6441",
          page_size: 5, 
          ordering: "-rating", 
          metacritic: "80,100", 
        },
      });
      return res.data.results;
    },
    staleTime: 1000 * 60 * 30, 
  });
}

export default function HeroSlider() {
  const { data: games, isLoading, isError } = useFeaturedGames();

  // Loading State
  if (isLoading) {
    return (
      <div className="hero-slider">
        <div className="slider-loading">
          <div className="spinner"></div>
          <p>Loading amazing games...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !games || games.length === 0) {
    return (
      <div className="hero-slider">
        <div className="slider-error">
          <p>Failed to load featured games</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="slider"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="slide-content">
              <img 
                src={game.background_image} 
                alt={game.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/fallback-game.jpg';
                }}
              />
              
              {/* Overlay with game info */}
              <div className="slide-overlay">
                <div className="slide-info">
                  <h2 className="slide-title">{game.name}</h2>
                  <div className="slide-meta">
                    <span className="slide-rating">
                      ⭐ {game.rating}
                    </span>
                    <span className="slide-released">
                      {new Date(game.released).getFullYear()}
                    </span>
                  </div>
                  <div className="slide-genres">
                    {game.genres?.slice(0, 3).map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
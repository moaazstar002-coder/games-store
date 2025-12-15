import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import { useGames } from '../hooks/usegames';
import GameCardSkeleton from './GameCardSkeleton';
import '../styles/components/GameRecommendations.css';

const GameRecommendations = ({ currentGameId, currentGameGenres = [] }) => {
  const [recommendedGames, setRecommendedGames] = useState([]);
  
  
  const genreSlug = currentGameGenres[0]?.slug || '';
  const { data: games, isLoading } = useGames({ genre: genreSlug, page: 1 });

  useEffect(() => {
    if (games && games.length > 0) {
      
      const filtered = games
        .filter(game => game.id !== currentGameId)
        .slice(0, 4); 
      
      setRecommendedGames(filtered);
    }
  }, [games, currentGameId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= Math.round(rating) ? 'star filled' : 'star'} 
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="game-recommendations">
        <div className="recommendations-header">
          <h2>You Might Also Like</h2>
          <p>Loading recommendations...</p>
        </div>
        <div className="recommendations-grid">
          {[...Array(4)].map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!recommendedGames || recommendedGames.length === 0) {
    return null;
  }

  return (
    <div className="game-recommendations">
      <div className="recommendations-header">
        <h2>You Might Also Like</h2>
        <p>Based on similar games and genres</p>
      </div>

      <div className="recommendations-grid">
        {recommendedGames.map(game => (
          <Link 
            key={game.id} 
            to={`/game/${game.id}`}
            className="recommendation-card"
          >
            <div className="recommendation-image-container">
              <img 
                src={game.background_image} 
                alt={game.name}
                className="recommendation-image"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%23ffffff" font-size="24" font-family="Arial" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>';
                }}
              />
              <div className="recommendation-overlay">
                <span className="view-details">
                  View Details <FaArrowRight />
                </span>
              </div>
            </div>

            <div className="recommendation-info">
              <h3 className="recommendation-title">{game.name}</h3>
              
              <div className="recommendation-meta">
                <div className="recommendation-rating">
                  {renderStars(game.rating)}
                  <span className="rating-number">{game.rating}</span>
                </div>
                
                {game.genres && game.genres.length > 0 && (
                  <div className="recommendation-genres">
                    {game.genres.slice(0, 2).map(genre => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="recommendation-price">$59.99</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="recommendations-footer">
        <Link to="/games" className="view-all-btn">
          View All Games <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default GameRecommendations;
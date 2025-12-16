import { useState } from "react";
import { useGameDetails } from "../hooks/useGameDetails";
import { useDispatch, useSelector } from "react-redux";
import { useWishList } from "../hooks/useWishList";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../store/slices/CartSlice";
import PageTransition from "../components/PageTransition";
import GameDetailsSkeleton from "../components/GameDetailsSkeleton";
import GameReviews from "../components/GameReviews";
import GameRecommendations from "../components/GameRecommendations";
import '../styles/pages/GameDetails.css';

function stripTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function GameDetails() {
  const { data: details, isLoading } = useGameDetails();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishList();
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);

  if (isLoading) {
    return (
      <PageTransition>
        <GameDetailsSkeleton />
      </PageTransition>
    );
  }

  if (!details) {
    return (
      <PageTransition>
        
        <div style={{padding: '2rem', textAlign: 'center'}}>
          <h1>Game not found.</h1>
          <button onClick={() => navigate('/games')}>Browse All Games</button>
        </div>
      </PageTransition>
    );
  }

  const fullDescription = stripTags(details.description);
  const description = showFull 
    ? fullDescription 
    : fullDescription.length > 200 
      ? `${fullDescription.substring(0, 197)}...` 
      : fullDescription;

  const genres = details.genres ? details.genres.map(g => g.name).join(', ') : '—';
  const isInCart = cartItems.some(item => item.id === details.id);

  const handleBuyNow = () => {
    if (!isInCart) {
      dispatch(addItem({
        id: details.id,
        title: details.name,
        image: details.background_image,
        price: details.price || 59.99,
        quantity: 1
      }));
    }
    navigate('/cart');
  };

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem(details.id));
    } else {
      dispatch(addItem({
        id: details.id,
        title: details.name,
        image: details.background_image,
        price: details.price || 59.99,
        quantity: 1
      }));
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(details.id)) {
      removeFromWishlist(details.id);
    } else {
      addToWishlist({
        id: details.id,
        name: details.name,
        title: details.name,
        background_image: details.background_image,
        image: details.background_image,
        rating: details.rating,
        genres: details.genres,
        released: details.released,
        description: details.description
      });
    }
  };

  return (
    <PageTransition>
    

      <div className="game-details">
        <div className="details-grid">
          <div className="media">
            <img
              className="game-details-image" 
              src={details.background_image} 
              alt={details.name}
              loading="lazy"
            />
          </div>

          <div className="info">
            <h1>{details.name}</h1>
            <div className="meta">
              <span>⭐ Rating: {details.rating ?? 'N/A'}</span>
              <span>📅 Released: {details.released ?? 'N/A'}</span>
              <span>🎮 Genres: {genres}</span>
            </div>

            <div className="description">
              {description || 'No description available.'}
              {fullDescription.length > 200 && (
                <button 
                  onClick={() => setShowFull(!showFull)} 
                  style={{ marginLeft: '0.5rem', cursor: 'pointer', background: 'none', border: 'none', color: '#007BFF' }}
                >
                  {showFull ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="buttons"> 
          <button 
            className="buy-button" 
            onClick={handleBuyNow}
            aria-label={`Buy ${details.name} now for $${details.price || 59.99}`}
          >
            Buy Now - ${details.price || 59.99}
          </button>
          
          <button 
            className={`wishlist-button ${isInWishlist(details.id) ? 'active' : ''}`} 
            onClick={handleToggleWishlist}
            aria-label={isInWishlist(details.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist(details.id) ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
          </button>
          
          <button 
            className={`cart-button ${isInCart ? 'active' : ''}`} 
            onClick={handleAddToCart}
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            {isInCart ? '🗑️ Remove from Cart' : '🛒 Add to Cart'}
          </button>
        </div>

        <GameReviews 
          gameId={details.id} 
          gameName={details.name} 
        />
        <GameRecommendations 
          currentGameId={details.id}
          currentGameGenres={details.genres || []}
        />
      </div>
    </PageTransition>
  );
}

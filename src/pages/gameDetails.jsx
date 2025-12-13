import {useGameDetails} from "../hooks/useGameDetails";
import { useDispatch, useSelector } from "react-redux";
import { useWishList } from "../hooks/useWishList";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../store/slices/CartSlice";
import '../styles/pages/GameDetails.css';
import PageTransition from "../components/PageTransition";

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
  
  if (isLoading) return <PageTransition><div style={{padding: '2rem'}}>Loading...</div></PageTransition>;
  if (!details) return <PageTransition><div style={{padding: '2rem'}}>Game not found.</div></PageTransition>;

  const description = stripTags(details.description);
  const genres = details.genres ? details.genres.map(g => g.name).join(', ') : '—';
  
  const isInCart = cartItems.some(item => item.id === details.id);
  
  const handleBuyNow = () => {
    if (!isInCart) {
      dispatch(addItem({
        id: details.id,
        title: details.name,
        image: details.background_image,
        price: 59.99,
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
        price: 59.99,
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
        
         className="game-details-image" src={details.background_image} alt={details.name} />
        </div>

        <div className="info">
          <h1>{details.name}</h1>
          <div className="meta">
            <span>Rating: {details.rating ?? 'N/A'}</span>
            <span>Released: {details.released ?? 'N/A'}</span>
            <span>Genres: {genres}</span>
          </div>


          <div className="description">{description}</div>
        </div>
      </div>
      <div className="buttons"> 
        <button className="buy-button" onClick={handleBuyNow}>Buy Now - ${details.price}</button>
        <button className={`wishlist-button ${isInWishlist(details.id) ? 'active' : ''}`} onClick={handleToggleWishlist}>
          {isInWishlist(details.id) ? ' Remove from Wishlist' : ' Add to Wishlist'}
        </button>
        <button className={`cart-button ${isInCart ? 'active' : ''}`} onClick={handleAddToCart}>
          {isInCart ? ' Remove from Cart' : ' Add to Cart'}
        </button>
      </div>
     
    </div>
    </PageTransition>
  );
}
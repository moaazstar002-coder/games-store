import { useGameDetails } from "../hooks/usegameDetails";
import '../styles/pages/GameDetails.css';
import { useNavigate } from 'react-router-dom';

function stripTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function GameDetails() {
  const { details, loading } = useGameDetails();
  const navigate = useNavigate();
 const handleBuyNow = () => {
    navigate('/cart');
  };

  if (loading) return <div className="loading">Loading game details...</div>;
  if (!details) return <div className="not-found">Game not found.</div>;

  const description = stripTags(details.description);
  const genres = details.genres?.map(g => g.name).join(', ') || '—';

  const platforms = details.parent_platforms
    ?.map(p => p.platform.name)
    .join(', ') || '—';

  return (
    <div className="game-details">
      <div className="details-grid">

        <div className="media">
          <img
            className="game-details-image"
            src={details.background_image}
            alt={details.name}
          />
        </div>

        <div className="info">
          <h1>{details.name}</h1>

          <div className="meta">
            <span>⭐ Rating: {details.rating ?? 'N/A'}</span>
            <span>📅 Released: {details.released ?? 'N/A'}</span>
            <span>🎮 Genres: {genres}</span>
            <span>🕹 Platforms: {platforms}</span>
          </div>

          <h2 className="section-title">About the Game</h2>
          <div className="description">{description}</div>
        </div>
      </div>

      <div className="buttons">
      
        <button className="btn btn-primary" style={{flex: 1}} onClick={handleBuyNow}>Buy Now - $59.99</button>
        <button className="btn btn-outline" style={{flex: 1}}>Add to Cart</button>
      </div>
    </div>
  );
}

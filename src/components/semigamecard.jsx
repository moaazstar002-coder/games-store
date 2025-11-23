import { useGameDetails } from "../hooks/usegameDetails";
import { useGames } from "../hooks/usegames";
import { useCart } from "../hooks/useCart";
import "./SemiGameCard.css";

export default function SemiGameCard() {
    const { details } = useGameDetails();
    const { games } = useGames();
    const { addToCart, removeFromCart, isInCart } = useCart();

    const game = games.find((g) => g.id === details.id) || {};

    const inCart = game && game.id && isInCart(game.id);

    return (
        <div className="semi-game-list">
            <div key={game.id} className="semi-game-card">
                <img src={game.background_image} alt={game.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%230a0a0a"/><text x="50%" y="50%" fill="%23ffffff" font-size="24" font-family="Arial" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>'; }} />
                <div className="semi-game-info">
                    <h3>{game.name}</h3>
                </div>

                <button
                    className={`remove-btn ${inCart ? 'in-cart' : ''}`}
                    onClick={() => {
                        if (!game || !game.id) return;
                        if (inCart) removeFromCart(game.id);
                        else addToCart({ id: game.id, name: game.name, image: game.background_image, price: '$59.99' });
                    }}
                >
                    {inCart ? 'Remove from cart' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
}

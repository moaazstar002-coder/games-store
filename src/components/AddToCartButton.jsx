import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/CartSlice";
import '../styles/pages/GameDetails.css';

export default function AddToCartButton({ game }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!game) return;
    
    dispatch(addItem({
      id: game.id,
      title: game.name || game.title,
      price: typeof game.price === 'number' ? game.price : parseFloat(String(game.price || '').replace(/[^0-9.]/g, '') || 59.99),
      image: game.background_image || game.thumbnail,
      quantity: 1
    }));
  };

  return <button className="buy-button" onClick={handleAdd}>Add to Cart</button>;
}

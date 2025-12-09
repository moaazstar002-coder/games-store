import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../store/slices/CartSlice";
import CreditCard from "../components/Creditcard";
import "../styles/pages/Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-content">
          <div className="cart-items-section">
            <h2 className="section-header">Cart Items ({totalQuantity})</h2>

            {cartItems.length === 0 ? (
              <p className="empty-message">Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="cart-item-image" 
                      onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/assets/no-image.png'}} 
                    />
                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
                      <div className="cart-item-meta">
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        <div className="quantity-control">
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                ))}
                <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
              </>
            )}
          </div>

          <div className="cart-summary-section">
            <h2 className="section-header">Payment Details</h2>
            <div className="cart-summary-box">
              <div className="summary-row"><span>Items</span><strong>{totalQuantity}</strong></div>
              <div className="summary-row"><span>Subtotal</span><strong>${totalPrice.toFixed(2)}</strong></div>
              <div className="summary-row"><span>Shipping</span><span>Free</span></div>
              <div className="summary-row total"><span>Total</span><strong>${totalPrice.toFixed(2)}</strong></div>
              <button className="checkout-btn" disabled={cartItems.length === 0}>Proceed to Checkout</button>
            </div>

            <div style={{marginTop: '1rem'}}>
              <CreditCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import CreditCard from "../components/Creditcard";
import "../styles/pages/Cart.css";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, loading, removeFromCart, updateQuantity } = useCart();

  // Normalize cart to an array — backend may return an object `{ items: [...] }`.
  const items = Array.isArray(cart) ? cart : (cart && Array.isArray(cart.items) ? cart.items : []);

  const subtotal = items.reduce((sum, it) => {
    const raw = typeof it.price === 'number' ? it.price : (it.price || '').toString();
    const num = typeof raw === 'number' ? raw : parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
    return sum + num * (it.quantity || 1);
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-content">
          <div className="cart-items-section">
            <h2 className="section-header">Cart Items</h2>

            {loading ? (
              <p>Loading cart...</p>
            ) : items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/assets/no-image.png'}} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <div className="cart-item-meta">
                      <span className="cart-item-price">{item.price || '$0.00'}</span>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary-section">
            <h2 className="section-header">Payment Details</h2>
            <div className="cart-summary-box">
              <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="summary-row"><span>Shipping</span><span>Free</span></div>
              <div className="summary-row total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
              <button className="btn btn-primary" style={{width: '100%'}}>Checkout</button>
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
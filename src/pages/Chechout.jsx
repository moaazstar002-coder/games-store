import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/CartSlice";
import { toast } from "sonner";
import PageTransition from "../components/PageTransition";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import "../styles/pages/Checkout.css";

export default function Chechout() {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    coupon: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = formData.coupon.trim().toUpperCase();
    if (code === "SAVE10") {
      setDiscount(10);
      setAppliedCoupon("SAVE10");
      toast.success("Coupon code SAVE10 applied! $10.00 discount.");
    } else if (code === "") {
      toast.error("Please enter a coupon code.");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    if (paymentMethod === "card" && (!formData.cardNumber || !formData.cvv)) {
      toast.error("Please fill in your card details.");
      return;
    }

    // Success order placement
    toast.success("Order Placed Successfully!", {
      description: "Thank you for your purchase. We have sent an email confirmation.",
      duration: 4000,
    });

    dispatch(clearCart());
    navigate("/");
  };

  const taxes = subtotal * 0.05;
  const total = Math.max(0, subtotal - discount + taxes);

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="checkout-empty-state">
          <h2>Your Cart is Empty</h2>
          <p>You must add games to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate("/games")} className="btn btn-primary">
            Browse Games
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-layout">
            {/* LEFT SIDE - Payment Form */}
            <div className="checkout-form-section">
              <h1 className="checkout-title">Checkout</h1>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="form-input"
                  />
                </div>

                {/* Payment Method */}
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div className="payment-methods-group">
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`payment-method-option ${paymentMethod === "card" ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span className="payment-method-title">Credit / Debit Card</span>
                      <FaCreditCard className="payment-icon" />
                    </div>

                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={`payment-method-option ${paymentMethod === "paypal" ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                      />
                      <span className="payment-method-title">PayPal</span>
                      <FaPaypal className="payment-icon" />
                    </div>
                  </div>
                </div>

                {/* Card Details (Only show if Credit Card selected) */}
                {paymentMethod === "card" && (
                  <div className="card-details-grid">
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="**** **** **** 1234"
                        required={paymentMethod === "card"}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="***"
                        maxLength="3"
                        required={paymentMethod === "card"}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}

                {/* Coupon */}
                <div className="form-group">
                  <label className="form-label">Discount Code (Try "SAVE10")</label>
                  <div className="coupon-flex">
                    <input
                      type="text"
                      name="coupon"
                      value={formData.coupon}
                      onChange={handleInputChange}
                      placeholder="Enter code"
                      className="form-input"
                    />
                    <button type="button" onClick={handleApplyCoupon} className="coupon-btn">
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p style={{ color: "#00ff66", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                      Coupon "{appliedCoupon}" successfully applied!
                    </p>
                  )}
                </div>

                {/* Place Order Button */}
                <button type="submit" className="btn-place-order">
                  <span>Place Order (${total.toFixed(2)})</span>
                  <FaCreditCard />
                </button>
              </form>
            </div>

            {/* RIGHT SIDE - Order Summary */}
            <div className="checkout-summary-section">
              <div className="summary-sticky-box">
                <h2 className="summary-header">Order Summary</h2>

                {/* Items list */}
                <div className="summary-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-image-wrapper">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="summary-item-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" fill="%23555" font-size="12" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>';
                          }}
                        />
                      </div>
                      <div className="summary-item-info">
                        <h3 className="summary-item-name">{item.title}</h3>
                        <p className="summary-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <span className="summary-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="totals-divider"></div>

                {/* Totals */}
                <div className="summary-totals">
                  <div className="totals-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="totals-row discount">
                      <span>Discount:</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="totals-row">
                    <span>Taxes (5%):</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="totals-divider"></div>
                  <div className="totals-row grand-total">
                    <span>Total:</span>
                    <span className="grand-total-price">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
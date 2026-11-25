import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/CartSlice";
import { toast } from "sonner";
import PageTransition from "../components/PageTransition";
import { FaCreditCard, FaPaypal, FaLock } from "react-icons/fa";
import api from "../lib/api";
import "../styles/pages/Checkout.css";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
    coupon: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerName = formData.name.trim();
    const customerEmail = formData.email.trim();

    if (!customerName || !customerEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const items = cartItems.map((item) => {
      const quantity = Number(item.quantity) || 1;
      if (item.product_type && item.product_type !== "game") {
        return {
          product_type: item.product_type,
          product_id: Number(item.product_id),
          quantity,
        };
      }
      return {
        game_id: Number(item.product_id ?? item.id),
        quantity,
      };
    });

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/orders", {
        items,
        customer_name: customerName,
        customer_email: customerEmail,
        payment_method: paymentMethod === "card" ? "Credit Card" : "PayPal",
        notes: formData.notes.trim() || null,
      });

      const serverTotal = response.data?.total_amount != null
        ? `$${Number(response.data.total_amount).toFixed(2)}`
        : `$${total.toFixed(2)}`;

      toast.success("Order Placed Successfully!", {
        description: `Order #${response.data?.order_id || ""} placed. Total: ${serverTotal}`,
        duration: 4500,
      });

      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "Failed to place order. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const taxes = subtotal * 0.05;
  const total = Math.max(0, subtotal - discount + taxes);

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="checkout-empty-state">
          <h2>Your Cart is Empty</h2>
          <p>You must add products to your cart before proceeding to checkout.</p>
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
            {/* LEFT SIDE - Order & Contact Form */}
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

                {/* Notes (Optional) */}
                <div className="form-group">
                  <label className="form-label">Order Notes (Optional)</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions or account tags"
                    className="form-input"
                  />
                </div>

                {/* Payment Method Selection */}
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

                {/* Secure Payment Information Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    background: "rgba(124, 58, 237, 0.08)",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    borderRadius: "8px",
                    color: "#D2BBFF",
                    fontSize: "0.85rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <FaLock style={{ flexShrink: 0 }} />
                  <span>
                    Secure transaction. Game activation codes and official receipt will be issued to your email upon order confirmation.
                  </span>
                </div>

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
                <button
                  type="submit"
                  className="btn-place-order"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting
                      ? "Placing Order..."
                      : `Place Order ($${total.toFixed(2)})`}
                  </span>
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

import React from "react";
import { useCart } from "../../context/CartContext";
import api from "../../api";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const items = cart.map((item) => ({
        bookId: item._id,
        quantity: item.quantity,
      }));

      await api.post("/orders", { items });

      alert("Order placed successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  if (cart.length === 0)
    return (
      <div className="page">
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="page">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <div>
            <strong>{item.title}</strong>
            <p>₹{item.price}</p>
          </div>

          <div className="cart-actions">
            <button
              onClick={() => updateQty(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => updateQty(item._id, item.quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <p>
          <strong>Total: ₹{total}</strong>
        </p>

        <button className="btn-primary" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

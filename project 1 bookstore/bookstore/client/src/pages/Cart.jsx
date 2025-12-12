import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="page">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map(item => (
        <div key={item._id} className="card cart-item">
          <img src={`http://localhost:8000${item.coverImage}`} width="80" />
          <div>
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <button className="btn-danger" onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

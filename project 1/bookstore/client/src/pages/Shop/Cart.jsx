import React from "react";

const Cart = ({ cart, updateQty, placeOrder, loading }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page">
      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <div>
            <strong>{item.title}</strong>
            <p>₹{item.price}</p>
          </div>
          <div className="cart-actions">
            <button onClick={() => updateQty(item._id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="cart-footer">
          <p>Total: ₹{total}</p>
          <button className="btn-primary" onClick={placeOrder} disabled={loading}>
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

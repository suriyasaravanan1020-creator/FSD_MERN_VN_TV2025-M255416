import React, { useEffect, useState } from "react";
import api from "../../api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/orders/my");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="page">
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="card order-card">
          <div className="order-header">
            <span>Order #{o._id.slice(-6)}</span>
            <span>Status: {o.status}</span>
          </div>
          <ul>
            {o.items.map(item => (
              <li key={item.book}>
                {item.title} – {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
          <p>Total: ₹{o.totalAmount}</p>
        </div>
      ))}
      {orders.length === 0 && <p className="muted">You have no orders yet.</p>}
    </div>
  );
};

export default MyOrders;

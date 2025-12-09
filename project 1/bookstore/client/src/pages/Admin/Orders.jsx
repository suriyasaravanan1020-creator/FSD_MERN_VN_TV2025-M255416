import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    load();
  };

  return (
    <div className="page">
      <h2>All Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="card order-card">
          <div className="order-header">
            <span>
              Order #{o._id.slice(-6)} – {o.user?.name}
            </span>
            <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
              {["pending", "processing", "shipped", "delivered", "cancelled"].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
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
    </div>
  );
};

export default AdminOrders;

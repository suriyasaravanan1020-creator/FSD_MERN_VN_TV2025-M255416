import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="grid four-cols">
        <div className="card stat-card">
          <h3>Users</h3>
          <p>{stats.usersCount}</p>
          <Link to="/admin/users" className="btn-link">
            Manage
          </Link>
        </div>
        <div className="card stat-card">
          <h3>Sellers</h3>
          <p>{stats.sellersCount}</p>
          <Link to="/admin/sellers" className="btn-link">
            Manage
          </Link>
        </div>
        <div className="card stat-card">
          <h3>Books</h3>
          <p>{stats.booksCount}</p>
          <Link to="/admin/books" className="btn-link">
            View
          </Link>
        </div>
        <div className="card stat-card">
          <h3>Orders</h3>
          <p>{stats.ordersCount}</p>
          <Link to="/admin/orders" className="btn-link">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [booksRes, ordersRes] = await Promise.all([
        api.get("/books"),
        api.get("/orders/seller")
      ]);
      setBooks(booksRes.data);
      setOrders(ordersRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Seller Dashboard</h2>
        <Link to="/seller/books/new" className="btn-primary">
          Add Book
        </Link>
      </div>
      <section className="grid two-cols">
        <div className="card">
          <h3>My Books</h3>
          <p>{books.filter(b => b.seller).length} total</p>
          <Link to="/seller/books" className="btn-secondary">
            Manage Books
          </Link>
        </div>
        <div className="card">
          <h3>Recent Orders</h3>
          <p>{orders.length} orders</p>
          <Link to="/seller/orders" className="btn-secondary">
            View Orders
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;

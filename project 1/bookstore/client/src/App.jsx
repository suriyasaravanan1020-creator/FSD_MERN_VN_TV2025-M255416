import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import BookList from "./pages/Shop/BookList";
import BookDetail from "./pages/Shop/BookDetail";
import Cart from "./pages/Shop/Cart";
import MyOrders from "./pages/User/MyOrders";
import SellerDashboard from "./pages/Seller/Dashboard";
import SellerBooks from "./pages/Seller/Books";
import AddBook from "./pages/Seller/AddBook";
import SellerOrders from "./pages/Seller/Orders";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminSellers from "./pages/Admin/Sellers";
import AdminBooks from "./pages/Admin/Books";
import AdminOrders from "./pages/Admin/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [cart, setCart] = useState([]);
  const [ordering, setOrdering] = useState(false);

  const addToCart = book => {
    setCart(prev => {
      const existing = prev.find(i => i._id === book._id);
      if (existing) {
        return prev.map(i =>
          i._id === book._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i._id !== id));
    } else {
      setCart(prev => prev.map(i => (i._id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const placeOrder = async () => {
    try {
      setOrdering(true);
      const api = (await import("./api")).default;
      const items = cart.map(c => ({ bookId: c._id, quantity: c.quantity }));
      await api.post("/orders", { items });
      setCart([]);
      alert("Order placed!");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setOrdering(false);
    }
  };

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login role="user" />} />
        <Route path="/signup" element={<Signup role="user" />} />
        <Route path="/seller/login" element={<Login role="seller" />} />
        <Route path="/seller/signup" element={<Signup role="seller" />} />
        <Route path="/admin/login" element={<Login role="admin" />} />

        <Route path="/shop" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute roles={["user"]}>
              <Cart
                cart={cart}
                updateQty={updateQty}
                placeOrder={placeOrder}
                loading={ordering}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={["user"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/books"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/books/new"
          element={
            <ProtectedRoute roles={["seller"]}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/orders"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sellers"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminSellers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;

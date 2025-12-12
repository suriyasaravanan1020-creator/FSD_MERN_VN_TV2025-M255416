import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import BookList from "./pages/Shop/BookList";
import BookDetail from "./pages/Shop/BookDetail";
import Cart from "./pages/Shop/Cart";
import MyOrders from "./pages/User/MyOrders";

// Seller Pages
import SellerDashboard from "./pages/Seller/Dashboard";
import SellerBooks from "./pages/Seller/Books";
import AddBook from "./pages/Seller/AddBook";
import SellerOrders from "./pages/Seller/Orders";
import SellerSignup from "./pages/Auth/SellerSignup";
import SellerLogin from "./pages/Auth/SellerLogin";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminSellers from "./pages/Admin/Sellers";
import AdminBooks from "./pages/Admin/Books";
import AdminOrders from "./pages/Admin/Orders";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />

        <Routes>
          {/* Seller Auth */}
          <Route path="/seller/signup" element={<SellerSignup />} />
          <Route path="/seller/login" element={<SellerLogin />} />

          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login role="user" />} />
          <Route path="/signup" element={<Signup role="user" />} />
          <Route path="/admin/login" element={<Login role="admin" />} />

          {/* Shop */}
          <Route path="/shop" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />

          {/* Cart - Only User */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute roles={["user"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Orders - Only User */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute roles={["user"]}>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Seller Routes */}
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

          {/* Admin Routes */}
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
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

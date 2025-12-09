import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => 
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">BookStore</Link>
      </div>

      <div className="nav-center">
        <Link to="/shop">Books</Link>
        {user?.role === "user" && <Link to="/orders">My Orders</Link>}
        {user?.role === "seller" && <Link to="/seller/dashboard">Seller</Link>}
        {user?.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
      </div>

      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>

        {!user ? (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/seller/login">Seller Login</Link>
            <Link to="/admin/login">Admin</Link>
          </>
        ) : (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={() => { logout(); navigate("/"); }} className="btn-secondary">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

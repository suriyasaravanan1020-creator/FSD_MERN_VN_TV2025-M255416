import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

const SellerLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/seller/login", { email, password });

      // IMPORTANT FIX:
      login(res.data.user, res.data.token);

      navigate("/seller/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Seller Login</h2>

        {error && <p className="error">{error}</p>}

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;

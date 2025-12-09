import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

const Signup = ({ role = "user" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role
      });
      login(data.user, data.token);
      if (data.user.role === "seller") navigate("/seller/dashboard");
      else navigate("/shop");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const heading = role === "seller" ? "Seller Registration" : "User Registration";

  return (
    <div className="page auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>{heading}</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <button className="btn-primary" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

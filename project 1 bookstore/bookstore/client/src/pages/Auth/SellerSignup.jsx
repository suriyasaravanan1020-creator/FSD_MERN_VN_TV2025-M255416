import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/seller/signup", form);
      alert("Seller account created successfully!");
      navigate("/seller/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Seller Signup</h2>

        {error && <p className="error">{error}</p>}

        <label>Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>Email
          <input name="email" value={form.email} onChange={handleChange} />
        </label>

        <label>Password
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </label>

        <button className="btn-primary">Create Seller</button>
      </form>
    </div>
  );
};

export default SellerSignup;

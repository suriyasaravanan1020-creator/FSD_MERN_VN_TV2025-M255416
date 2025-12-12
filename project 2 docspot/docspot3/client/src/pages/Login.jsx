import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/user/login", form);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      const user = res.data.user;
      if (user.type === "admin") navigate("/admin");
      else if (user.isdoctor) navigate("/doctor");
      else navigate(location.state?.from?.pathname || "/user");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
          Login to manage your appointments and doctor profile.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              size="small"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              size="small"
              fullWidth
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}

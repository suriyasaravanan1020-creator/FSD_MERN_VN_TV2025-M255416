import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "", type: "user" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/user/register", form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Create your DocSpot 3 account
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
          Sign up as a patient or administrator to start managing appointments.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="fullName"
              size="small"
              fullWidth
              value={form.fullName}
              onChange={handleChange}
              required
            />
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
            <TextField
              label="Phone"
              name="phone"
              size="small"
              fullWidth
              value={form.phone}
              onChange={handleChange}
            />

            <div>
              <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                Account type
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={form.type}
                exclusive
                size="small"
                onChange={(_, value) => value && setForm({ ...form, type: value })}
              >
                <ToggleButton value="user">Patient</ToggleButton>
                <ToggleButton value="admin">Admin</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}

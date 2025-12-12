import React, { useState } from "react";
import api from "../api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ApplyDoctor() {
  const user = JSON.parse(localStorage.getItem("userData"));

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = { ...form, userId: user._id };
      await api.post("/doctor/apply", data);
      alert("Application sent! Wait for admin approval.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card">
      <h5 className="mb-3">Apply as Doctor</h5>
      <form onSubmit={submit}>
        <TextField
          fullWidth
          className="mb-3"
          label="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          className="mb-3"
          label="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          className="mb-3"
          label="Specialization"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          className="mb-3"
          label="Experience (years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          className="mb-3"
          label="Consultation Fees"
          value={form.fees}
          onChange={(e) => setForm({ ...form, fees: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          className="mb-3"
          label="Available Timings"
          value={form.timings}
          onChange={(e) => setForm({ ...form, timings: e.target.value })}
          size="small"
        />

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}

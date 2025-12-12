import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Box from "@mui/material/Box";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container py-4">
      <div className="hero mb-4">
        <div style={{ flex: 1, minWidth: 260 }}>
          <Chip
            label="Book a doctor in under 60 seconds"
            size="small"
            sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.16)", color: "white" }}
          />
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
            Smart, simple doctor bookings for everyday care.
          </h1>
          <p style={{ maxWidth: 460, opacity: 0.9, marginBottom: 20 }}>
            Browse verified specialists, compare availability, upload your medical files and confirm an appointment
            without a single phone call.
          </p>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{ borderRadius: 999 }}
            >
              Book an appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ borderRadius: 999, color: "white", borderColor: "rgba(255,255,255,0.6)" }}
              onClick={() => navigate("/register")}
            >
              Join as patient
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap", fontSize: 13 }}>
            <span>• No booking fees</span>
            <span>• Secure document uploads</span>
            <span>• Instant confirmations</span>
          </Box>
        </div>
        <div className="hero-illustration d-flex align-items-center justify-content-center">
          <div style={{ textAlign: "center" }}>
            <h5 style={{ marginBottom: 8 }}>Today's stats</h5>
            <p style={{ margin: 0, fontSize: 13 }}>42 active doctors</p>
            <p style={{ margin: 0, fontSize: 13 }}>109 appointments booked</p>
          </div>
        </div>
      </div>

      <div className="row gy-3 mb-4">
        <div className="col-md-4">
          <div className="glass-card h-100">
            <div className="d-flex align-items-center mb-2 gap-2">
              <AccessTimeIcon fontSize="small" />
              <strong>Real-time availability</strong>
            </div>
            <p className="mb-0 small">
              See exactly when doctors are free and avoid calling clinics or waiting on hold.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card h-100">
            <div className="d-flex align-items-center mb-2 gap-2">
              <VerifiedUserIcon fontSize="small" />
              <strong>Verified professionals</strong>
            </div>
            <p className="mb-0 small">
              Every doctor is manually approved by admins before appearing in search results.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card h-100">
            <div className="d-flex align-items-center mb-2 gap-2">
              <PeopleAltIcon fontSize="small" />
              <strong>Built for teams</strong>
            </div>
            <p className="mb-0 small">
              Admins, doctors and patients each get dedicated dashboards tailored to their workflows.
            </p>
          </div>
        </div>
      </div>

      <div className="row gy-3 mb-4">
        <div className="col-md-6">
          <div className="glass-card h-100">
            <div className="section-title">Popular specialisations</div>
            <ul className="small mb-0">
              <li>Cardiologist – heart & blood pressure</li>
              <li>Dermatologist – skin, hair & nails</li>
              <li>Paediatrician – children&apos;s health</li>
              <li>Orthopaedic – bones & joints</li>
              <li>Psychiatrist – mental wellness</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="glass-card h-100">
            <div className="section-title">How booking works</div>
            <ol className="small mb-0">
              <li>Sign up as a patient and login.</li>
              <li>Browse approved doctors and open their profile.</li>
              <li>Select a date, upload your report and confirm the slot.</li>
              <li>Track status in &quot;My Appointments&quot; while admin and doctor manage approvals.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

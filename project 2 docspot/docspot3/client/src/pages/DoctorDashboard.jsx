import React, { useEffect, useState } from "react";
import api from "../api";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await api.get("/doctor/me");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointment/doctor");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfile();
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointment/status/${id}`, { status });
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sidebar">
          <div className="mb-3">
            <h6 className="mb-1">Doctor workspace</h6>
            <small className="text-muted">
              View today&apos;s appointments and update visit status.
            </small>
          </div>
          {profile ? (
            <div className="glass-card mb-2">
              <div className="fw-semibold">Dr. {profile.fullName}</div>
              <small className="text-muted d-block">{profile.specialization}</small>
              <small className="text-muted d-block">{profile.address}</small>
              <small className="text-muted d-block">
                Fees: ₹{profile.fees} · Timings: {profile.timings}
              </small>
              <Chip
                label={profile.status}
                size="small"
                sx={{ mt: 1 }}
              />
            </div>
          ) : (
            <p className="small text-muted">
              Your doctor profile is not approved yet. Please contact admin.
            </p>
          )}
        </div>
      </div>
      <div className="col-md-9">
        <h5 className="mb-3">My Appointments</h5>
        {appointments.length === 0 ? (
          <p className="text-muted small">No appointments scheduled yet.</p>
        ) : (
          appointments.map((appt) => (
            <div
              key={appt._id}
              className="glass-card mb-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-semibold">
                  {appt.userInfo?.fullName}
                </div>
                <small className="text-muted d-block">
                  Date: {appt.date}
                </small>
                {appt.document && (
                  <small className="text-muted d-block">
                    Document: {appt.document}
                  </small>
                )}
              </div>
              <div className="d-flex flex-column align-items-end gap-1">
                <Chip label={appt.status} size="small" />
                <div className="btn-group">
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => updateStatus(appt._id, "confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => updateStatus(appt._id, "completed")}
                  >
                    Complete
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    color="error"
                    onClick={() => updateStatus(appt._id, "cancelled")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import api from "../api";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

export default function AdminDashboard() {
  const [tab, setTab] = useState("applications");
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadPending = async () => {
    try {
      const res = await api.get("/doctor/applications");
      setPendingDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointment/all");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPending();
    loadAppointments();
  }, []);

  const updateDoctorStatus = async (id, status) => {
    try {
      await api.put(`/doctor/status/${id}`, { status });
      await loadPending();
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await api.put(`/appointment/status/${id}`, { status });
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="sidebar">
          <div className="mb-3">
            <h6 className="mb-1">Admin console</h6>
            <small className="text-muted">Approve doctors and monitor activity.</small>
          </div>
          <div
            className={`sidebar-item ${tab === "applications" ? "active" : ""}`}
            onClick={() => setTab("applications")}
          >
            Doctor applications
            {pendingDoctors.length > 0 && (
              <span className="badge bg-danger ms-auto badge-pill">{pendingDoctors.length}</span>
            )}
          </div>
          <div
            className={`sidebar-item ${tab === "appointments" ? "active" : ""}`}
            onClick={() => setTab("appointments")}
          >
            All appointments
          </div>
        </div>
      </div>
      <div className="col-md-9">
        {tab === "applications" && (
          <div>
            <h5 className="mb-3">Pending doctor applications</h5>
            {pendingDoctors.length === 0 && (
              <p className="text-muted small">No pending applications right now.</p>
            )}
            {pendingDoctors.map((doc) => (
              <div key={doc._id} className="glass-card mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">Dr. {doc.fullName}</div>
                    <small className="text-muted d-block">{doc.specialization}</small>
                    <small className="text-muted d-block">
                      {doc.email} · {doc.phone}
                    </small>
                    <small className="text-muted d-block">{doc.address}</small>
                    <small className="text-muted d-block">
                      Experience: {doc.experience} yrs · Fees: ₹{doc.fees}
                    </small>
                    <small className="text-muted d-block">Timings: {doc.timings}</small>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <Chip label={doc.status} size="small" />
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => updateDoctorStatus(doc._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => updateDoctorStatus(doc._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "appointments" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Platform appointments</h5>
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">Filter by status:</span>
                <TextField
                  select
                  SelectProps={{ native: true }}
                  size="small"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </TextField>
              </div>
            </div>
            {filteredAppointments.length === 0 && (
              <p className="text-muted small">No appointments recorded yet.</p>
            )}
            {filteredAppointments.map((appt) => (
              <div
                key={appt._id}
                className="glass-card mb-2 d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-semibold">
                    {appt.userInfo?.fullName} → Dr. {appt.doctorInfo?.fullName}
                  </div>
                  <small className="text-muted d-block">On: {appt.date}</small>
                  {appt.document && (
                    <small className="text-muted d-block">Document: {appt.document}</small>
                  )}
                </div>
                <div className="d-flex flex-column align-items-end gap-1">
                  <Chip label={appt.status} size="small" />
                  <div className="btn-group">
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => updateAppointmentStatus(appt._id, "confirmed")}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => updateAppointmentStatus(appt._id, "completed")}
                    >
                      Complete
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => updateAppointmentStatus(appt._id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

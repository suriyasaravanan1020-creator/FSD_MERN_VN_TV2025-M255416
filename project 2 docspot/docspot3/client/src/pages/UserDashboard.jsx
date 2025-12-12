import React, { useEffect, useState } from "react";
import api from "../api";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import ApplyDoctor from "./ApplyDoctor";

export default function UserDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [active, setActive] = useState("browse");
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

 
  const [problem, setProblem] = useState("");

 
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewDoctor, setReviewDoctor] = useState(null);

  const submitBooking = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const formData = new FormData();
    formData.append("doctorInfo", selectedDoctor._id);
    formData.append(
      "userInfo",
      JSON.parse(localStorage.getItem("userData"))._id
    );
    formData.append("date", date);
    formData.append("problem", problem);

    if (file) formData.append("document", file);

    try {
      await api.post("/appointment/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Appointment booked successfully!");
      setShowModal(false);
      setProblem("");
      setDate("");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  const openBooking = (doc) => {
    setSelectedDoctor(doc);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctor/approved");
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (active === "appointments") {
      loadAppointments();
    }
  }, [active]);

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointment/my");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  const submitReview = async () => {
    try {
      await api.post("/review/add", {
        doctorId: reviewDoctor,
        userId: JSON.parse(localStorage.getItem("userData"))._id,
        rating,
        reviewText,
      });

      alert("Review submitted!");
      setShowReviewModal(false);
      setRating(5);
      setReviewText("");
    } catch (err) {
      alert("Failed to submit review");
      console.error(err);
    }
  };

  const filtered = doctors.filter((d) =>
    [d.fullName, d.specialization, d.address]
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="row">
     
      <div className="col-md-3">
        <div className="sidebar">
          <div className="mb-3">
            <h6 className="mb-1">Patient workspace</h6>
            <small className="text-muted">
              Manage your bookings and doctor applications.
            </small>
          </div>

          <div
            className={`sidebar-item ${active === "browse" ? "active" : ""}`}
            onClick={() => setActive("browse")}
          >
            Browse doctors
          </div>

          <div
            className={`sidebar-item ${
              active === "appointments" ? "active" : ""
            }`}
            onClick={() => setActive("appointments")}
          >
            My appointments
          </div>

          <div
            className={`sidebar-item ${active === "apply" ? "active" : ""}`}
            onClick={() => setActive("apply")}
          >
            Apply as doctor
          </div>
        </div>
      </div>

     
      <div className="col-md-9">
        {active === "browse" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">Browse doctors</h5>
                <small className="text-muted">
                  Filter by name, specialization or location.
                </small>
              </div>
              <Chip label={`${doctors.length} available`} size="small" />
            </div>

            <div className="mb-3">
              <TextField
                size="small"
                placeholder="Search cardiologist, Chennai, etc."
                fullWidth
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="doctor-grid">
              {filtered.map((doc) => (
                <div key={doc._id} className="glass-card">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <div>
                      <div className="fw-semibold">Dr. {doc.fullName}</div>
                      <small className="text-muted">{doc.specialization}</small>
                    </div>

                    <Chip
                      label={
                        doc.status === "approved" ? "Available" : doc.status
                      }
                      size="small"
                      color="success"
                    />
                  </div>

                  <small className="text-muted d-block mb-1">
                    {doc.address || "In-clinic consultation"}
                  </small>

                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">₹ {doc.fees}</small>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => openBooking(doc)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-muted">No doctors match your search yet.</p>
              )}
            </div>
          </div>
        )}

       
        {active === "appointments" && (
          <div>
            <h5 className="mb-3">My Appointments</h5>

            {appointments.length === 0 ? (
              <p className="text-muted small">No appointments found.</p>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="glass-card mb-2 p-2 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-semibold">
                      Appointment with Dr. {appt.doctorInfo?.fullName}
                    </div>

                    <small className="text-muted d-block">
                      Date: {appt.date}
                    </small>

                    {appt.problem && (
                      <small className="text-muted d-block">
                        Problem: {appt.problem}
                      </small>
                    )}
                  </div>

                  <div className="text-end">
                    <span className="badge bg-info mb-1">{appt.status}</span>

                   
                    {appt.status === "completed" && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setReviewDoctor(appt.doctorInfo._id);
                          setShowReviewModal(true);
                        }}
                      >
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {active === "apply" && <ApplyDoctor />}
      </div>

      
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "#00000055",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="glass-card" style={{ width: 400 }}>
            <h5>Book Appointment</h5>

            <p>
              <b>Doctor:</b> Dr. {selectedDoctor.fullName}
            </p>

            <label>Date:</label>
            <input
              type="date"
              className="form-control mb-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Describe Your Problem:</label>
            <textarea
              className="form-control mb-3"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Ex: Fever for 2 days, headache, stomach pain..."
            ></textarea>

            <label>Upload Document (optional):</label>
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button
              variant="contained"
              onClick={submitBooking}
              className="me-2"
            >
              Confirm
            </Button>

            <Button variant="text" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

     
      {showReviewModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "#00000077",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="glass-card p-3" style={{ width: 400 }}>
            <h5>Write Review</h5>

            <label>Rating (1 to 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              className="form-control mb-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <label>Your Review:</label>
            <textarea
              className="form-control mb-3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <Button variant="contained" onClick={submitReview} className="me-2">
              Submit
            </Button>

            <Button variant="text" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

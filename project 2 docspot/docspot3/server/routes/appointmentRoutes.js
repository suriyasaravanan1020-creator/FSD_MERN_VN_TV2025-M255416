const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getUserAppointments,
  getAllAppointments,
  updateStatus,
  getDoctorAppointments
} = require("../controllers/appointmentController");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "uploads/"); },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post("/create", auth, upload.single("document"), createAppointment);
router.get("/my", auth, getUserAppointments);
router.get("/all", auth, getAllAppointments);
router.get("/doctor", auth, getDoctorAppointments);
router.put("/status/:id", auth, updateStatus);

module.exports = router;

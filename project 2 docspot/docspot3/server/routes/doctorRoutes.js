const express = require("express");
const router = express.Router();
const {
  applyDoctor,
  getApprovedDoctors,
  getDoctorApplications,
  updateDoctorStatus,
  getMyDoctorProfile
} = require("../controllers/doctorController");
const auth = require("../middleware/auth");

router.post("/apply", auth, applyDoctor);
router.get("/approved", auth, getApprovedDoctors);
router.get("/applications", auth, getDoctorApplications);
router.put("/status/:id", auth, updateDoctorStatus);
router.get("/me", auth, getMyDoctorProfile);

module.exports = router;

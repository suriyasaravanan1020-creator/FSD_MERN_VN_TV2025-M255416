const express = require("express");
const router = express.Router();
const { addReview, getDoctorReviews } = require("../controllers/reviewController");

router.post("/add", addReview);
router.get("/:id", getDoctorReviews);

module.exports = router;

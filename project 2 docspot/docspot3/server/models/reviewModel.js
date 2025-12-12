const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  reviewText: String
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  specialization: String,
  experience: String,
  fees: Number,
  timings: String,
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("doctor", doctorSchema);

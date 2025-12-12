const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorInfo: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
  userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  date: String,

  
  problem: {
    type: String,
    default: ""
  },

 
  document: String,


  diagnosisFile: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("appointment", appointmentSchema);

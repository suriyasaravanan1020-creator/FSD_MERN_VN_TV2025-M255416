const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  type: { type: String, enum: ["user","admin"], default: "user" },
  isdoctor: { type: Boolean, default: false },
  notification: { type: Array, default: [] },
  seennotification: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);

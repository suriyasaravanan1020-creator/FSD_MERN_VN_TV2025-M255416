const Doctor = require("../models/DocModel");
const User = require("../models/UserModel");

exports.applyDoctor = async (req, res) => {
  try {
    const existing = await Doctor.findOne({ userId: req.body.userId });
    if (existing) return res.status(400).json({ message: "Application already submitted" });

    const doc = new Doctor({
      userId: req.body.userId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      specialization: req.body.specialization,
      experience: req.body.experience,
      fees: req.body.fees,
      timings: req.body.timings,
      status: "pending"
    });

    await doc.save();
    res.json({ message: "Doctor application submitted", doc });
  } catch (err) {
    console.error("Apply doctor error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getApprovedDoctors = async (req, res) => {
  try {
    const list = await Doctor.find({ status: "approved" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorApplications = async (req, res) => {
  try {
    const list = await Doctor.find({ status: "pending" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const doc = await Doctor.findByIdAndUpdate(id, { status }, { new: true });
    if (doc && status === "approved") {
      await User.findByIdAndUpdate(doc.userId, { isdoctor: true });
    }
    if (doc && status === "rejected") {
      await User.findByIdAndUpdate(doc.userId, { isdoctor: false });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyDoctorProfile = async (req, res) => {
  try {
    const doc = await Doctor.findOne({ userId: req.userId });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

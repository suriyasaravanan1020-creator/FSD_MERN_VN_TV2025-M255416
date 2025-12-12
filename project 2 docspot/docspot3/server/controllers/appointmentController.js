const Appointment = require("../models/AppointmentModel");
const Doctor = require("../models/DocModel");

exports.createAppointment = async (req, res) => {
  try {
    const { doctorInfo, userInfo, date } = req.body;
    const document = req.file ? req.file.filename : null;
    const appt = new Appointment({ doctorInfo, userInfo, date, document, status: "pending" });
    await appt.save();
    res.json({ message: "Appointment created", appt });
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ userInfo: req.userId }).populate("doctorInfo");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const list = await Appointment.find().populate("doctorInfo").populate("userInfo");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appt = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(appt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.userId });
    if (!doctor) return res.json([]);
    const list = await Appointment.find({ doctorInfo: doctor._id }).populate("userInfo");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import express from "express";
import {
  register,
  login,
  me,
  registerSeller,
  loginSeller
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// =====================================================
// TEMPORARY ROUTE → Create Admin (Run only ONE TIME)
// =====================================================
router.get("/create-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ role: "admin" });
    if (existing) return res.send("Admin already exists");

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hash,
      role: "admin"
    });

    res.send("Admin created successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating admin");
  }
});

// =====================================================
// USER AUTH ROUTES
// =====================================================
router.post("/signup", register);   // User signup
router.post("/login", login);       // User login

// =====================================================
// SELLER AUTH ROUTES
// =====================================================
router.post("/seller/signup", registerSeller);  // Seller signup
router.post("/seller/login", loginSeller);      // Seller login

// =====================================================
// GET CURRENT USER (protected)
// =====================================================
router.get("/me", protect, me);

export default router;

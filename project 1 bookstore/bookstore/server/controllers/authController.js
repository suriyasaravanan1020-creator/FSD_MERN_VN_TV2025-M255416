import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ==============================
// SELLER SIGNUP
// ==============================
export const registerSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Seller already exists" });

    const hash = await bcrypt.hash(password, 10);

    const seller = await User.create({
      name,
      email,
      password: hash,
      role: "seller"
    });

    const token = generateToken(seller._id, seller.role);

    res.status(201).json({
      message: "Seller created successfully",
      token,
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// SELLER LOGIN
// ==============================
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await User.findOne({ email, role: "seller" });
    if (!seller) return res.status(400).json({ message: "Seller not found" });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(seller._id, seller.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// USER SIGNUP
// ==============================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: role === "seller" ? "seller" : "user"
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// USER LOGIN
// ==============================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (role && user.role !== role) {
      return res.status(403).json({ message: "Role mismatch" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// ME (CURRENT USER DATA)
// ==============================
export const me = async (req, res) => {
  res.json(req.user);
};

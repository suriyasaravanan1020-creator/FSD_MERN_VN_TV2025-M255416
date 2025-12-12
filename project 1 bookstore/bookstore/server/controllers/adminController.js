import User from "../models/User.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

export const getStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({ role: "user" });
    const sellersCount = await User.countDocuments({ role: "seller" });
    const booksCount = await Book.countDocuments();
    const ordersCount = await Order.countDocuments();
    res.json({ usersCount, sellersCount, booksCount, ordersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

export const listSellers = async (req, res) => {
  const sellers = await User.find({ role: "seller" }).select("-password");
  res.json(sellers);
};

export const listBooks = async (req, res) => {
  const books = await Book.find().populate("seller", "name");
  res.json(books);
};

export const toggleActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

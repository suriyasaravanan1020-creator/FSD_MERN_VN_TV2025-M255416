import Book from "../models/Book.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{bookId, quantity}]
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items" });
    }
    const dbBooks = await Book.find({ _id: { $in: items.map(i => i.bookId) } });
    const orderItems = [];
    let total = 0;
    for (const item of items) {
      const book = dbBooks.find(b => String(b._id) === String(item.bookId));
      if (!book) continue;
      if (book.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${book.title}` });
      }
      book.stock -= item.quantity;
      await book.save();
      const subTotal = book.price * item.quantity;
      total += subTotal;
      orderItems.push({
        book: book._id,
        title: book.title,
        price: book.price,
        quantity: item.quantity,
        seller: book.seller
      });
    }
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: total
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort("-createdAt")
      .populate("items.book", "title coverImage");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.seller": req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort("-createdAt")
      .populate("user", "name email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

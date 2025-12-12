import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const listBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }
    if (category) {
      filter.category = category;
    }
    const books = await Book.find(filter).populate("seller", "name");
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("seller", "name");
    if (!book) return res.status(404).json({ message: "Book not found" });
    const reviews = await Review.find({ book: book._id }).populate("user", "name");
    res.json({ book, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   FIXED createBook — supports ALL new fields now
====================================================== */
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      discountPrice,
      category,
      subCategory,
      isbn,
      pages,
      publisher,
      publicationYear,
      edition,
      language,
      format,
      tags,
      stock
    } = req.body;

    const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

    const book = await Book.create({
      title,
      author,
      description,
      price,
      discountPrice,
      category,
      subCategory,
      isbn,
      pages,
      publisher,
      publicationYear,
      edition,
      language,
      format,
      tags: tags ? tags.split(",") : [],
      stock,
      coverImage,
      seller: req.user._id
    });

    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   FIXED updateBook — supports ALL new fields now
====================================================== */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (String(book.seller) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updates = req.body;

    if (req.file) {
      updates.coverImage = `/uploads/${req.file.filename}`;
    }

    if (updates.tags) {
      updates.tags = updates.tags.split(",");
    }

    Object.assign(book, updates);
    await book.save();

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (String(book.seller) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const existing = await Review.findOne({
      user: req.user._id,
      book: req.params.id
    });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.json(existing);
    }

    const review = await Review.create({
      user: req.user._id,
      book: req.params.id,
      rating,
      comment
    });

    const stats = await Review.aggregate([
      { $match: { book: review.book } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" }, total: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
      await Book.findByIdAndUpdate(review.book, {
        averageRating: stats[0].avgRating,
        totalReviews: stats[0].total
      });
    }

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

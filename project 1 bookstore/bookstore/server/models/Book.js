import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },

    // NEW FIELDS ADDED
    isbn: { type: String },
    pages: { type: Number },
    publisher: { type: String },
    publicationYear: { type: Number },
    edition: { type: String },
    language: { type: String },
    format: { type: String, enum: ["Paperback", "Hardcover", "eBook", "PDF"] },
    tags: [String],

    description: { type: String },

    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },

    category: { type: String },
    subCategory: { type: String },

    coverImage: { type: String },
    stock: { type: Number, default: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

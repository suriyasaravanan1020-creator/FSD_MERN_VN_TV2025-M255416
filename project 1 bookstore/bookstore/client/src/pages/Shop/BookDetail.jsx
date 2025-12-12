import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const BookDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [data, setData] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const loadBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setData(response.data);
    } catch (err) {
      console.log("BOOK LOAD ERROR:", err);
      setMsg("Failed to load book");
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await api.post(`/books/${id}/reviews`, {
        rating: Number(rating),
        comment,
      });

      console.log("REVIEW SUCCESS:", response.data);

      await loadBook();
      setComment("");
      setMsg("Review submitted!");

    } catch (err) {
      console.log("REVIEW ERROR:", err.response || err);
      setMsg(err.response?.data?.message || "Review submission failed.");
    }
  };

  if (!data) return <div className="page">Loading...</div>;

  const { book, reviews } = data;
  const avg = book.averageRating ? book.averageRating.toFixed(1) : "0.0";

  return (
    <div className="page book-detail">
      {msg && <p style={{ color: "yellow", marginBottom: "1rem" }}>{msg}</p>}

      <div className="book-main">
        
        {/* Cover Image */}
        {book.coverImage && (
          <img
            src={`http://localhost:8000${book.coverImage}`}
            alt={book.title}
            className="detail-cover"
          />
        )}

        <div className="book-info">
          <h2>{book.title}</h2>
          <p className="muted">by {book.author}</p>

          <p className="price">₹{book.price}</p>

          {book.discountPrice && (
            <p className="offer">Offer: ₹{book.discountPrice}</p>
          )}

          <p>Stock: {book.stock}</p>

          <button
            className="btn-primary"
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
          >
            Add to Cart
          </button>

          <hr />

          <h3>Book Information</h3>
          <ul>
            <li>ISBN: {book.isbn}</li>
            <li>Pages: {book.pages}</li>
            <li>Publisher: {book.publisher}</li>
            <li>Publication Year: {book.publicationYear}</li>
            <li>Edition: {book.edition}</li>
            <li>Language: {book.language}</li>
            <li>Format: {book.format}</li>
            <li>Tags: {book.tags?.join(", ")}</li>
          </ul>

          <h4>
            Rating: ⭐ {avg} ({book.totalReviews || 0} reviews)
          </h4>
        </div>
      </div>

      {/* ---------- REVIEWS ---------- */}
      <div className="reviews">
        <h3>Reviews</h3>

        {reviews.length === 0 && <p className="muted">No reviews yet.</p>}

        {reviews.map((r) => (
          <div key={r._id} className="review">
            <strong>{r.user?.name}</strong> – {r.rating}/5
            <p>{r.comment}</p>
          </div>
        ))}

        {/* Only logged-in users can review */}
        {user?.role === "user" ? (
          <form className="review-form" onSubmit={handleReview}>
            <h4>Write a Review</h4>

            <label>
              Rating
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>

            <label>
              Comment
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>

            <button className="btn-secondary">Submit</button>
          </form>
        ) : (
          <p className="muted">Login as a user to write a review.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;

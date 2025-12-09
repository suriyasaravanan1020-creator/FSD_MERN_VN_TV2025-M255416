import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

const BookDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await api.get(`/books/${id}`);
      setData(data);
    };
    fetchBook();
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    await api.post(`/books/${id}/reviews`, { rating, comment });
    const { data } = await api.get(`/books/${id}`);
    setData(data);
    setComment("");
  };

  if (!data) return <div className="page">Loading...</div>;
  const { book, reviews } = data;

  return (
    <div className="page book-detail">
      <div className="book-main">
        {book.coverImage && (
          <img
            src={`http://localhost:8000${book.coverImage}`}
            className="detail-cover"
          />
        )}

        <div>
          <h2>{book.title}</h2>
          <p className="muted">by {book.author}</p>

          <p>{book.description}</p>

          <p>
            <strong>₹{book.price}</strong>
            {book.discountPrice && (
              <span style={{ marginLeft: "10px", color: "green" }}>
                Offer: ₹{book.discountPrice}
              </span>
            )}
          </p>

          <p>Stock: {book.stock}</p>

          <button
            className="btn-primary"
            onClick={() => addToCart(book)}
            disabled={book.stock === 0}
          >
            Add to Cart
          </button>

          <hr style={{ margin: "20px 0" }} />

          {/* NEW META DETAILS */}
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
            Rating: ⭐ {book.averageRating.toFixed(1)} ({book.totalReviews} reviews)
          </h4>
        </div>
      </div>

      <div className="reviews">
        <h3>Reviews</h3>

        {reviews.length === 0 && <p className="muted">No reviews yet.</p>}

        {reviews.map((r) => (
          <div className="review" key={r._id}>
            <strong>{r.user?.name}</strong> – {r.rating}/5
            <p>{r.comment}</p>
          </div>
        ))}

        {user?.role === "user" && (
          <form className="review-form" onSubmit={handleReview}>
            <h4>Write a Review</h4>

            <label>
              Rating
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option value={n} key={n}>{n}</option>
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
        )}
      </div>
    </div>
  );
};

export default BookDetail;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await api.get("/books", {
        params: { search }
      });
      setBooks(data);
    };
    fetchBooks();
  }, [search]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Books</h2>
        <input
          placeholder="Search by title or author"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid">
        {books.map(b => (
          <div key={b._id} className="card book-card">
            {b.coverImage && <img src={`http://localhost:8000${b.coverImage}`} />}
            <h3>{b.title}</h3>
            <p className="muted">{b.author}</p>
            <p>₹{b.price}</p>
            <p className="muted">Seller: {b.seller?.name}</p>
            <Link to={`/book/${b._id}`} className="btn-secondary">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;

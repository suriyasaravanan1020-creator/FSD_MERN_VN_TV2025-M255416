import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const SellerBooks = () => {
  const [books, setBooks] = useState([]);

  const load = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async id => {
    await api.delete(`/books/${id}`);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>My Books</h2>
        <Link to="/seller/books/new" className="btn-primary">
          Add Book
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>₹{b.price}</td>
              <td>{b.stock}</td>
              <td>
                <button className="btn-link" onClick={() => handleDelete(b._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerBooks;

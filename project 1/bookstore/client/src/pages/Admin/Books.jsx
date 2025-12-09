import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/admin/books");
      setBooks(data);
    };
    load();
  }, []);

  return (
    <div className="page">
      <h2>All Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.seller?.name}</td>
              <td>₹{b.price}</td>
              <td>{b.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;

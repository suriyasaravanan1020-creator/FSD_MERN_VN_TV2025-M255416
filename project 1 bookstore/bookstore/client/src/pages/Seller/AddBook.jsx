import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    pages: "",
    publisher: "",
    publicationYear: "",
    edition: "",
    language: "",
    format: "Paperback",
    tags: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    discountPrice: "",
    stock: ""
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (file) data.append("cover", file);

      await api.post("/books", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/seller/books");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        {error && <p className="error">{error}</p>}

        <label>Title
          <input name="title" value={form.title} onChange={handleChange} />
        </label>

        <label>Author
          <input name="author" value={form.author} onChange={handleChange} />
        </label>

        <label>ISBN
          <input name="isbn" value={form.isbn} onChange={handleChange} />
        </label>

        <label>Pages
          <input type="number" name="pages" value={form.pages} onChange={handleChange} />
        </label>

        <label>Publisher
          <input name="publisher" value={form.publisher} onChange={handleChange} />
        </label>

        <label>Publication Year
          <input type="number" name="publicationYear" value={form.publicationYear} onChange={handleChange} />
        </label>

        <label>Edition
          <input name="edition" value={form.edition} onChange={handleChange} />
        </label>

        <label>Language
          <input name="language" value={form.language} onChange={handleChange} />
        </label>

        <label>Format
          <select name="format" value={form.format} onChange={handleChange}>
            <option>Paperback</option>
            <option>Hardcover</option>
            <option>eBook</option>
            <option>PDF</option>
          </select>
        </label>

        <label>Tags (comma separated)
          <input name="tags" value={form.tags} onChange={handleChange} />
        </label>

        <label>Description
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>

        <label>Category
          <input name="category" value={form.category} onChange={handleChange} />
        </label>

        <label>Sub Category
          <input name="subCategory" value={form.subCategory} onChange={handleChange} />
        </label>

        <label>Price
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </label>

        <label>Discount Price
          <input type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} />
        </label>

        <label>Stock
          <input type="number" name="stock" value={form.stock} onChange={handleChange} />
        </label>

        <label>Cover Image
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>

        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
};

export default AddBook;

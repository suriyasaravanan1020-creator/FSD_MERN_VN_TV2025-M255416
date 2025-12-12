import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Gateway to Infinite Stories</h1>

          <p>
            Discover captivating books, connect with passionate sellers, 
            and fuel your love for reading.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn-primary hero-btn">
              Start Exploring
            </Link>
            <Link to="/signup" className="btn-secondary hero-btn">
              Create Reader Account
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories">
        <h2 className="section-title">Explore by Category</h2>

        <div className="category-grid">
          <div className="category-card">Fiction</div>
          <div className="category-card">Science</div>
          <div className="category-card">Biographies</div>
          <div className="category-card">Children&apos;s Books</div>
        </div>
      </section>

    </div>
  );
};

export default Home;

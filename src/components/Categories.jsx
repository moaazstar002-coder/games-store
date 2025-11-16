import React from "react";
import categories from "../data/categories";
import "./Categories.css";

export default function Categories() {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <button key={cat.id} className="category-btn">
          {cat.name}
        </button>
      ))}
    </div>
  );
}

import React from "react";
import categories from "../data/categories";
import "../styles/components/Categories.css";

export default function Categories({ onSelectCategory }) {
  return (
    <div className="categories-container">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="category-btn"
          onClick={() => onSelectCategory?.(cat)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

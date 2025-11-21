import React from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/components/SearchBar.css";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <div className="search-wrapper glass-panel">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a game..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}

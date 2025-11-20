import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="loader-core">
          <FaGamepad className="loader-icon" />
        </div>
      </div>
      <div className="loader-text">Loading</div>
    </div>
  );
}

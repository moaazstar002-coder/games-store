import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import '../styles/components/Loader.css';

export default function Loader() {
  return (
    <div className="loader-container" role="status" aria-busy="true">
      <div className="loader-spinner" aria-hidden="true">
        <div className="loader-core">
          <FaGamepad className="loader-icon" />
        </div>
      </div>
      <div className="loader-text">Loading</div>
    </div>
  );
}

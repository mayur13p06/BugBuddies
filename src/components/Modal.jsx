// src/Components/Modal.jsx
import React from 'react';
import '../Styling/Modal.css'; // Ensure the CSS file exists or update the path

const Modal = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

const Modal = ({ show, onClose, report }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">Product Details</h2>
        <p>
          <strong>File Name:</strong> {report?.FileName}
        </p>

        <p>
          <strong>Date:</strong> {report?.Date}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

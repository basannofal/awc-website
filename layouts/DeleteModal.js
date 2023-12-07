import React, { useState } from "react";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const [enteredCode, setEnteredCode] = useState("");
  const expectedCode = "1234"; // Replace this with your expected code

  const handleInputChange = (e) => {
    setEnteredCode(e.target.value);
  };

  const isValidCode = enteredCode === expectedCode;

  return (
    <>
      <div className={`${isOpen ? "delete-modal" : "delete_modal_hidden"}`}>
        <div className="delete_modal_content">
          <h2 className="delete_title">Delete Confirmation</h2>
          <p>Are you sure you want to delete this data?</p>
          <p>Enter the 1234 For Deleting Data.</p>
          <div>
            <input
              type="text"
              placeholder="Enter code"
              value={enteredCode}
              onChange={handleInputChange}
              style={{ color: isValidCode ? "black" : "red" }}
              className="delete_input"
            />
            <div>
              <button id="close-modal" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <button onClick={onDelete} id="delete-button" disabled={!isValidCode}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;

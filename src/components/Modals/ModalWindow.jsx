import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalWindow = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: { width: "400px", height: "fit-content", margin: "auto", padding: "20px", borderRadius: 20 },
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalWindow;

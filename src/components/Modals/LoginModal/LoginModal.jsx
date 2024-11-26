import React, { useState } from "react";
import Modal from "react-modal";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    alert(`Logged in as: ${email}`);
    onClose();
  };

  const handlePasswordReset = () => {
    alert("Password reset email sent");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className="modal-content">
        <h4>Login</h4>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <input type="email" id="login-email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="login-email">Email address</label>
          </div>
          <div className="input-field" style={{ position: "relative" }}>
            <input type={passwordVisible ? "text" : "password"} id="login-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="login-password">Your password</label>
            <img
              src={passwordVisible ? "images/eye-open.png" : "images/eye-close.png"}
              alt="toggle visibility"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                width: "20px",
              }}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          <a href="#" onClick={handlePasswordReset} id="reset-password">
            Forgot Password?
          </a>
          <button className="btn yellow darken-2 z-depth-0" style={{ marginLeft: "30px" }}>
            Login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;

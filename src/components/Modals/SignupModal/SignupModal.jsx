import React, { useState } from "react";
import Modal from "react-modal";
import { registerUser } from "../../../utils/firebase/authService";

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerValid = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== repeatPassword) {
      setError("Passwords don't match.");
      return;
    }

    const validationError = registerValid(password);
    if (validationError !== true) {
      setError(validationError);
      return;
    }

    const result = await registerUser(email, password);
    if (result.success) {
      setSuccessMessage(result.message);
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setTimeout(onClose, 3000);
    } else {
      setError(result.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div className="modal-content">
        <h4>Sign up</h4>
        <form onSubmit={handleSignup}>
          <div className="input-field">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="signup-email" className={email && "active"}>
              Email address
            </label>
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="signup-password" className={password && "active"}>
              Choose password
            </label>
          </div>
          <div className="input-field">
            <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
            <label htmlFor="signup-password-repeat" className={repeatPassword && "active"}>
              Repeat password
            </label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <button className="btn yellow darken-2 z-depth-0">Sign up</button>
        </form>
      </div>
    </Modal>
  );
};

export default SignupModal;

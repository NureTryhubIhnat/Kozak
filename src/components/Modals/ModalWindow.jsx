import { useState } from "react";
import css from "./ModalWindow.module.css";
import { signUpWithEmail, signInWithEmail, resetPassword } from "../../utils/registration";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ModalWindow({ closeModal, isSignUp = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
    closeModal();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.formInputsWrapper}>
            <div className={css.inputContainer}>
              <label htmlFor="email">Email</label>
              <input className={css.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className={css.inputContainer}>
              <label htmlFor="password">Password</label>
              <input
                className={css.input}
                type={isPasswordVisible ? "text" : "password"} // Меняем тип поля на текст или пароль
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className={css.eyeIcon} onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />} {/* Иконка глаза */}
              </span>
            </div>

            {isSignUp && (
              <div className={css.inputContainer}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className={css.input}
                  type={isPasswordVisible ? "text" : "password"} // Так же для подтверждения пароля
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          <div className={css.buttonsWrapper}>
            <button className={css.button} type="submit">
              {isSignUp ? "Register" : "Login"}
            </button>

            {!isSignUp && (
              <button onClick={handleResetPassword} className={css.forgotPassword}>
                Forgot Password?
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

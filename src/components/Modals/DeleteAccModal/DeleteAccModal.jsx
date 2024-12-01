import { useState } from 'react';
import css from './DeleteAccModal.module.css';
import { deleteUserAccount } from '../../../utils/registration';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DeleteAccModal({ closeModal, email }) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    closeModal();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2>Confirm account deletion</h2>
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              className={css.input}
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span className={css.eyeIcon} onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <Link
            className={css.button}
            to="/"
            type="submit"
            onClick={() => deleteUserAccount(email, password)}
          >
            Delete
          </Link>
        </form>
      </div>
    </div>
  );
}

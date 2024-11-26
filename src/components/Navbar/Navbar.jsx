import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAuth from "../../utils/useAuth";
import firebaseApp from "../../utils/firebase/firebaseConfig";
import css from "./Navbar.module.css";
import AuthForm from "../AuthForm/AuthForm";
import ModalWindow from "../Modals/ModalWindow";
import { validatePassword } from "../../utils/validation";

const Navbar = () => {
  const auth = getAuth(firebaseApp);
  const user = useAuth();
  const [error, setError] = useState("");
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      setIsLoginModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      setError(passwordValidation);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      setError("Please check your email to verify your account.");
      setIsSignInModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.email}</h2>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div className={css.navContainer}>
      <nav className={css.navList}>
        <a href="/">
          <img src="images/logo.jpg" className={css.logoImg} />
        </a>
        <div className={css.btnContainer}>
          <button onClick={() => setIsLoginModalOpen(true)} className={css.btn}>
            Login
          </button>
          <button onClick={() => setIsSignInModalOpen(true)} className={css.btn}>
            Sign Up
          </button>
          <button onClick={handleGoogleSignIn} className={css.btn}>
            Sign In with Google
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <ModalWindow isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <AuthForm onSignIn={handleSignIn} error={error} />
      </ModalWindow>

      {/* Sign Up Modal */}
      <ModalWindow isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)}>
        <AuthForm onSignUp={handleSignUp} error={error} />
      </ModalWindow>
    </div>
  );
};

export default Navbar;

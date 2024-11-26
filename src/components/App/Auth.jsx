import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../utils/firebase/firebaseConfig"; // Ваш файл конфигурации Firebase

const Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h2>Authentication</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>

          <h3>Register</h3>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button onClick={handleSignUp}>Sign Up</button>

          <h3>Forgot Password?</h3>
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default Auth;

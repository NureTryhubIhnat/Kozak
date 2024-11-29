import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updatePassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import firebaseApp from "./firebase/firebaseConfig";
import { toast } from "react-hot-toast";

const auth = getAuth(firebaseApp);

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    toast.success("SignUp successful! Please check your email to verify your account.");
  } catch (error) {
    toast.error("Error during sign up: " + error.message);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      toast.error("Please verify your email address before logging in.");
      return;
    }

    toast.success("Login successful!");
  } catch (error) {
    toast.error("Error during login: " + error.message);
  }
};

const provider = new GoogleAuthProvider();

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google sign-in successful:", user);
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
  }
};

export const changePassword = async (newPassword) => {
  const user = getAuth().currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword);
      console.log("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error.message);
    }
  } else {
    console.log("No user logged in");
  }
};

export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error("Error during logout: " + error.message);
  }
};

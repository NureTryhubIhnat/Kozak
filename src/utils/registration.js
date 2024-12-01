import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updatePassword, sendPasswordResetEmail, signOut, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import firebaseApp from "./firebase/firebaseConfig";
import { toast } from "react-hot-toast";

const auth = getAuth(firebaseApp);

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    toast.success("SignUp successful! Please check your email to verify your account.", {
      style: {
        backgroundColor: "green",
      },
    });
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

    toast.success("Login successful!", {
      style: {
        backgroundColor: "green",
      },
    });
  } catch (error) {
    toast.error("Error during login: " + error.message);
  }
};

const provider = new GoogleAuthProvider();

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    toast.success("Google sign-in successful:", {
      style: {
        backgroundColor: "green",
      },
    });
  } catch (error) {
    toast.error("Error during Google sign-in:", error.message);
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    toast.error("No user logged in");
    throw new Error("No user logged in");
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
    toast.success("Password changed successfully", {
      style: { backgroundColor: "green" },
    });
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      toast.error("Incorrect current password");
    } else {
      toast.error("Error changing password: " + error.message);
    }
    throw new Error(error.message);
  }
};

export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent", {
      style: {
        backgroundColor: "green",
      },
    });
  } catch (error) {
    toast.error("Error sending password reset email:", error.message);
  }
};

export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    toast.success("Logged out successfully!", {
      style: {
        backgroundColor: "green",
      },
    });
  } catch (error) {
    toast.error("Error during logout: " + error.message);
  }
};

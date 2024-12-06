import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase/firebaseConfig';
import { toast } from 'react-hot-toast';

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    toast.success(
      'SignUp successful! Please check your email to verify your account.',
      {
        style: {
          backgroundColor: 'green',
        },
      }
    );
  } catch (error) {
    toast.error('Error during sign up: ' + error.message);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      toast('Please verify your email address before logging in', {
        icon: '⚠️',
        style: {
          backgroundColor: '#fdce70',
          color: 'black',
        },
      });
      return;
    }

    toast.success('Login successful!', {
      style: {
        backgroundColor: 'green',
      },
    });
  } catch (error) {
    toast.error('Error during login: ' + error.message);
  }
};

const provider = new GoogleAuthProvider();

export const signUpWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, 'user-settings', user.uid), {
      birthday: null,
      name: '',
      notifications: {
        reminder: false,
        updates: false,
      },
      height: null,
      weight: null,
      isAdmin: false,
    });

    toast.success('Google sign-in successful:', {
      style: {
        backgroundColor: 'green',
      },
    });
  } catch (error) {
    toast.error('Error during Google sign-in:', error.message);
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    toast.error('No user logged in');
    throw new Error('No user logged in');
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
    toast.success('Password changed successfully', {
      style: { backgroundColor: 'green' },
    });
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      toast.error('Incorrect current password');
    } else {
      toast.error('Error changing password: ' + error.message);
    }
    throw new Error(error.message);
  }
};

export const resetPassword = async email => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent', {
      style: {
        backgroundColor: 'green',
      },
    });
  } catch (error) {
    toast.error('Error sending password reset email:', error.message);
  }
};

export const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    toast.success('Logged out successfully!', {
      style: {
        backgroundColor: 'green',
      },
    });
  } catch (error) {
    toast.error('Error during logout: ' + error.message);
  }
};

export const deleteUserAccount = async (email, password) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    toast.error('No user is currently logged in.');
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    await deleteUser(user);

    toast.success('User account deleted successfully.', {
      style: { backgroundColor: 'green' },
    });
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      toast.error(
        'Please log in again before attempting to delete your account.'
      );
    } else {
      toast.error('Error deleting user account: ' + error.message);
    }
  }
};

export const resendVerification = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      await sendEmailVerification(user);
      toast.success('Verification email sent successfully.', {
        style: { backgroundColor: 'green' },
      });
    } catch (error) {
      toast.error('Error sending verification email: ' + error.message);
    }
  } else {
    toast.error('No user logged in.');
  }
};

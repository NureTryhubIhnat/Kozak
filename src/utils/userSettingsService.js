import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase/firebaseConfig';

export const fetchUserSettings = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user logged in.');
  }

  const userDoc = doc(db, 'user-settings', user.uid);
  const snapshot = await getDoc(userDoc);

  if (!snapshot.exists()) {
    throw new Error('User settings not found.');
  }

  return snapshot.data();
};

export const saveUserSettings = async updatedSettings => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user logged in.');
  }

  const userDoc = doc(db, 'user-settings', user.uid);

  try {
    const docSnapshot = await getDoc(userDoc);

    if (docSnapshot.exists()) {
      await updateDoc(userDoc, updatedSettings);
    } else {
      await setDoc(userDoc, updatedSettings);
    }
  } catch (error) {
    throw new Error('Error saving user settings: ' + error.message);
  }
};

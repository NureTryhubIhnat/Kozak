import { doc, getDoc, setDoc } from 'firebase/firestore';
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

export const saveUserSettings = async settings => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user logged in.');
  }

  const userDoc = doc(db, 'user-settings', user.uid);
  await setDoc(userDoc, settings);
};

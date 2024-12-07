import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
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

export const fetchAllUserSettings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'user-settings'));
    const users = [];

    querySnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error('Error fetching user settings:', error.message);
    throw new Error('Failed to fetch user settings');
  }
};

export const deleteUserSettings = async userId => {
  const userDoc = doc(db, 'user-settings', userId);

  try {
    await deleteDoc(userDoc);
  } catch (error) {
    throw new Error('Error deleting user data: ' + error.message);
  }
};

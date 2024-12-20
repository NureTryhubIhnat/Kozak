import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';

export const saveUserSettings = async (userId, updatedSettings) => {
  const userDoc = doc(db, 'user-settings', userId);

  try {
    const docSnapshot = await getDoc(userDoc);

    if (docSnapshot.exists()) {
      await updateDoc(userDoc, updatedSettings);
    } else {
      throw new Error('The document does not exist. Cannot be updated.');
    }
  } catch (error) {
    throw new Error('Error updating user data: ' + error.message);
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

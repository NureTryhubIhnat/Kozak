// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZyaBSgjF2EQ6Q1JZKRUKVtIYtJFAWoBo",
  authDomain: "kozachok-1cbb6.firebaseapp.com",
  databaseURL: "https://kozachok-1cbb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kozachok-1cbb6",
  storageBucket: "kozachok-1cbb6.firebasestorage.app",
  messagingSenderId: "703368002295",
  appId: "1:703368002295:web:17485220a0188e7e9df1f2",
  measurementId: "G-252EVW7DL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;

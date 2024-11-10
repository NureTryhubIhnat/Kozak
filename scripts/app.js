import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCZyaBSgjF2EQ6Q1JZKRUKVtIYtJFAWoBo",
  authDomain: "kozachok-1cbb6.firebaseapp.com",
  databaseURL:
    "https://kozachok-1cbb6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kozachok-1cbb6",
  storageBucket: "kozachok-1cbb6.firebasestorage.app",
  messagingSenderId: "703368002295",
  appId: "1:703368002295:web:17485220a0188e7e9df1f2",
  measurementId: "G-252EVW7DL8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Google login
document.getElementById("google-login").addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google user logged in:", result.user);
      const modal = document.getElementById("modal-login");
      M.Modal.getInstance(modal).close();
    })
    .catch((error) => {
      console.error("Error logging in with Google:", error.message);
      alert(error.message);
    });
});

// Register new user
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);

      // Отправка email-подтверждения
      const user = userCredential.user;
      sendEmailVerification(user)
        .then(() => {
          console.log("Verification email sent!");
          alert("Please check your email to verify your account.");
        })
        .catch((error) => {
          console.error("Error sending email verification:", error);
          alert(error.message);
        });
      const modal = document.getElementById("modal-signup");
      M.Modal.getInstance(modal).close();
      document.getElementById("signup-form").reset();
    })

    .catch((error) => {
      console.error("Error signing up:", error.message);
      alert(error.message);
    });
});

// Login existing user
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      const modal = document.getElementById("modal-login");
      M.Modal.getInstance(modal).close();
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
      alert(error.message);
    });
});

// Log out
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Error logging out:", error.message);
    });
});

// Обновление UI и показ информации о пользователе в модальном окне
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Показываем элементы для авторизованных пользователей
    document
      .querySelectorAll(".logged-in")
      .forEach((item) => (item.style.display = "block"));
    document
      .querySelectorAll(".logged-out")
      .forEach((item) => (item.style.display = "none"));

    // Получаем email пользователя и отображаем его в модальном окне
    const accountDetails = document.querySelector(".account-details");
    accountDetails.innerHTML = `<p>Email: ${user.email}</p>`;
    // accountDetails.innerHTML = `<p>Password: ${user.password}</p>`;
  } else {
    // Если пользователь не авторизован, скрываем элементы для авторизованных пользователей
    document
      .querySelectorAll(".logged-in")
      .forEach((item) => (item.style.display = "none"));
    document
      .querySelectorAll(".logged-out")
      .forEach((item) => (item.style.display = "block"));

    // Очищаем данные аккаунта
    document.querySelector(".account-details").innerHTML = "";
  }
});

// Initialize modals открытие закрытие
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Импортируем конфигурацию Firebase
import firebaseConfig from "./firebase-config.js";
// Экспортируем auth для использования в других файлах

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    document.querySelectorAll(".logged-in").forEach((item) => (item.style.display = "block"));
    document.querySelectorAll(".logged-out").forEach((item) => (item.style.display = "none"));

    // Получаем email пользователя и отображаем его в модальном окне
    const accountDetails = document.querySelector(".account-details");
    accountDetails.innerHTML = `<p>Email: ${user.email}</p>`;
    // accountDetails.innerHTML = `<p>Password: ${user.password}</p>`;
  } else {
    // Если пользователь не авторизован, скрываем элементы для авторизованных пользователей
    document.querySelectorAll(".logged-in").forEach((item) => (item.style.display = "none"));
    document.querySelectorAll(".logged-out").forEach((item) => (item.style.display = "block"));

    // Очищаем данные аккаунта
    document.querySelector(".account-details").innerHTML = "";
  }
});

// Initialize modals открытие закрытие
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

//reset

const reset = document.getElementById("reset-password");
reset.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(" Password reset email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

export { auth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup };

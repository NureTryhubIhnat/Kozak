// Register new user
import { auth, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "./app.js";

function registerValid(password) {
  // Проверки на различные условия
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Если все проверки пройдены, возвращаем true
  return true;
}

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;

  const password = document.getElementById("signup-password").value;
  const repeatPassword = document.getElementById("signup-password-repeat").value;

  const errorMessage = document.getElementById("password-error"); // находим элемент ошибки

  if (repeatPassword != password) {
    document.getElementById("password-error").textContent = "Passwords doesn't match";
    document.getElementById("password-error").style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none"; // скрываем ошибку, если пароли совпадают
  }

  if (registerValid(password) != true) {
    // Показываем ошибку на странице
    document.getElementById("password-error").textContent = registerValid(password);
    document.getElementById("password-error").style.display = "block";
    return;
  }

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

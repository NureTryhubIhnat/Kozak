import firebaseConfig from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Получаем ссылку на кнопку для сохранения изменений
const save_changes_button = document.getElementById("save-changes-button");

// Обработчик состояния аутентификации
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Пользователь авторизован, добавляем обработчик для кнопки
    save_changes_button.addEventListener("click", function () {
      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const repeatNewPassword = document.getElementById("repeat-new-password").value;

      if (!currentPassword || !newPassword) {
        console.log("Please enter both current and new passwords.");
        document.getElementById("password-error").textContent = "Please enter both current and new passwords.";
        document.getElementById("password-error").style.display = "block";
        return;
      }
      if (newPassword !== repeatNewPassword) {
        console.log("Passwords does not match(");
        document.getElementById("password-error").textContent = "Passwords doesn't match";
        document.getElementById("password-error").style.display = "block";
        return;
      }

      // Создаём учетные данные для реаутентификации пользователя
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      // Реаутентификация пользователя
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("User re-authenticated.");

          // Обновляем пароль
          updatePassword(user, newPassword)
            .then(() => {
              console.log("Password updated successfully.");
              alert("Password updated successfully.");
            })
            .catch((error) => {
              console.error("Failed to update password:", error);
              alert("Failed to update password: " + error.message);
            });
        })
        .catch((error) => {
          console.error("Re-authentication failed:", error);
          alert("Re-authentication failed: " + error.message);
        });
    });
  } else {
    // Если пользователь не авторизован, можно показать ошибку или перенаправить
    console.log("No user is signed in.");
    alert("Please log in to change your password.");
    // Можно перенаправить на страницу входа или другую страницу
  }
  // если юзер не верефнул почту
  if (!user.emailVerified) {
    const emailConfirmationMessage = document.getElementById("email-confirmation-message");
    emailConfirmationMessage.style.display = "block";
    console.log("email does not verified");
  }
  // отправляем письмо чтобы веревнуть почту
  const confitmationLink = document.getElementById("confirmation-link");
  confitmationLink.addEventListener("click", function () {
    sendEmailVerification(user)
      .then(() => {
        console.log("Verification email sent!");
        alert("Please check your email to verify your account.");
      })
      .catch((error) => {
        console.error("Error sending email verification:", error);
        alert(error.message);
      });
  });

  // Удаление профиля
  const deleteButton = document.getElementById("delete-button");
  deleteButton.addEventListener("click", function () {
    const currentPassword = prompt("Please enter your current password for reauthentication:"); // Запрашиваем пароль

    if (currentPassword) {
      // Создаем учетные данные для реаутентификации
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      // Реаутентификация пользователя
      reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("User re-authenticated.");

          // Удаление аккаунта после успешной реаутентификации
          user
            .delete()
            .then(() => {
              console.log("User account deleted.");
              alert("Your account has been deleted.");

              // Перенаправление на index.html
              window.location.href = "index.html"; // Это перенаправит пользователя на страницу index.html
            })
            .catch((error) => {
              console.error("Error deleting account:", error);
              alert("Error deleting account: " + error.message);
            });
        })
        .catch((error) => {
          console.error("Re-authentication failed:", error);
          alert("Re-authentication failed. Please try again.");
        });
    } else {
      alert("Password is required to delete your account.");
    }
  });
});
//

//
//
const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", function () {
  location.reload();
});

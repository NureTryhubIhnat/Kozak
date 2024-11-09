// // Firebase конфигурация
// const firebaseConfig = {
//   apiKey: "AIzaSyCZyaBSgjF2EQ6Q1JZKRUKVtIYtJFAWoBo",
//   authDomain: "kozachok-1cbb6.firebaseapp.com",
//   projectId: "kozachok-1cbb6",
//   storageBucket: "kozachok-1cbb6.firebasestorage.app",
//   messagingSenderId: "703368002295",
//   appId: "1:703368002295:web:17485220a0188e7e9df1f2",
//   measurementId: "G-252EVW7DL8",
// };

// // Инициализация Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const database = firebase.database();

// // Регистрация нового пользователя
// document.getElementById("register-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const email = document.getElementById("register-email").value;
//   const password = document.getElementById("register-password").value;

//   auth
//     .createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       showMessage("Регистрация успешна!");
//     })
//     .catch((error) => {
//       showMessage("Ошибка регистрации: " + error.message);
//     });
// });

// // Вход пользователя
// document.getElementById("login-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const email = document.getElementById("login-email").value;
//   const password = document.getElementById("login-password").value;

//   auth
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       showMessage("Вход выполнен!");
//       document.getElementById("logout-button").style.display = "block";
//     })
//     .catch((error) => {
//       showMessage("Ошибка входа: " + error.message);
//     });
// });

// // Выход пользователя
// document.getElementById("logout-button").addEventListener("click", function () {
//   auth
//     .signOut()
//     .then(() => {
//       showMessage("Выход выполнен!");
//       document.getElementById("logout-button").style.display = "none";
//     })
//     .catch((error) => {
//       showMessage("Ошибка выхода: " + error.message);
//     });
// });

// // Проверка состояния аутентификации
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     showMessage("Пользователь авторизован: " + user.email);
//     document.getElementById("logout-button").style.display = "block";
//   } else {
//     showMessage("Пользователь не авторизован.");
//     document.getElementById("logout-button").style.display = "none";
//   }
// });

// // Функция для отображения сообщений
// function showMessage(message) {
//   alert(message); // Выводит сообщение в виде алерта
// }

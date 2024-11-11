# KOZAC Project - Firebase User Registration

## Project Overview
A basic user registration form utilizing Firebase Authentication. Allows users to register with an email and password, sending a verification email post-registration.

## File Structure

```
/KOZAC
│
├── images/
│   ├── favicon.ico              # Favicon for the webpage
│   └── logo.jpg                 # Logo image
│
├── scripts/
│   ├── app.js                   # Firebase app initialization and function exports
│   ├── firebase-config.js       # Firebase configuration file (add your Firebase config here)
│   ├── index.js                 # Main JavaScript file (optional, if used for general scripts)
│   └── register.js              # Handles user registration logic
│
├── index.html                   # Main HTML file with the registration form
├── package.json                 # Node.js dependencies and project metadata
└── package-lock.json            # Lock file for Node.js dependencies
```

## Requirements

- Firebase account with **Email/Password Authentication** enabled.
- Firebase configuration details (API keys, project ID, etc.).
- Modern web browser supporting ES6 modules.

## Setup

1. **Firebase Configuration**:
   - Add your Firebase config details in `scripts/firebase-config.js`.

   ```javascript
   // firebase-config.js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   export default firebaseConfig;
   ```

2. **Initialize Firebase in `app.js`**:
   - Import the Firebase configuration from `firebase-config.js` and initialize Firebase.

   ```javascript
   // app.js
   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
   import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
   import firebaseConfig from "./firebase-config.js";

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   export { auth, createUserWithEmailAndPassword, sendEmailVerification };
   ```

3. **Register User Logic in `register.js`**:
   - Ensure `register.js` correctly references the authentication functions from `app.js`.

4. **Run the Project**:
   - Open `index.html` in a browser or use a development server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to load the page locally.

## How to Use

1. Go to the registration page (`index.html`).
2. Fill in the registration form, including email and password.
3. Upon submission, the app will attempt to create a user and send a verification email.

---

This should guide you through setting up and running the Firebase-based registration project with the given file structure. Let me know if you need further customization!

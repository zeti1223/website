import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9pr29fe_2qOINUTnWdJxbLzcU4gRjttU",
  authDomain: "zeti1223.firebaseapp.com",
  databaseURL:
    "https://zeti1223-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zeti1223",
  storageBucket: "zeti1223.firebasestorage.app",
  messagingSenderId: "556059487179",
  appId: "1:556059487179:web:eff9cd64fe2154de12244e",
  measurementId: "G-WFE315SDXZ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
      const snapshot = await get(ref(db, "users/" + username));
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          localStorage.setItem("loggedInUser", username);
          window.location.href = userData.redirect;
          return;
        }
      }
      errorMessage.textContent = "Invalid username or password.";
    } catch (error) {
      errorMessage.textContent = "An error occurred during login.";
      console.error(error);
    }
  });

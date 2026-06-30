import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9pr29fe_2qOINUTnWdJxbLzcU4gRjttU",
  authDomain: "zeti1223.firebaseapp.com",
  databaseURL: "https://zeti1223-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zeti1223",
  storageBucket: "zeti1223.firebasestorage.app",
  messagingSenderId: "556059487179",
  appId: "1:556059487179:web:eff9cd64fe2154de12244e",
  measurementId: "G-WFE315SDXZ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let isLoginMode = true;

const formTitle = document.getElementById("form-title");
const pageTitle = document.getElementById("page-title");
const submitBtn = document.getElementById("submit-btn");
const switchModeBtn = document.getElementById("switch-mode-btn");
const statusMessage = document.getElementById("status-message");

switchModeBtn.addEventListener("click", () => {
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    formTitle.textContent = "Login";
    pageTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    switchModeBtn.textContent = "Need an account? Register";
  } else {
    formTitle.textContent = "Register";
    pageTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    switchModeBtn.textContent = "Already have an account? Login";
  }
  statusMessage.textContent = "";
});

async function hashPassword(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

document
  .getElementById("auth-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    statusMessage.className = "";
    statusMessage.textContent = "";

    try {
      const userRef = ref(db, "users/" + username);
      const snapshot = await get(userRef);

      if (isLoginMode) {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const hashedPassword = await hashPassword(password);
          if (userData.password === hashedPassword) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = userData.redirect || "index.html";
            return;
          }
        }
        statusMessage.textContent = "Invalid username or password.";
        statusMessage.className = "error";
      } else {
        if (snapshot.exists()) {
          statusMessage.textContent = "Username is already taken.";
          statusMessage.className = "error";
          return;
        }

        const hashedPassword = await hashPassword(password);
        await set(userRef, {
          password: hashedPassword,
          redirect: "index.html"
        });

        statusMessage.textContent = "Registration successful! You can now log in.";
        statusMessage.className = "success";

        switchModeBtn.click();
      }
    } catch (error) {
      statusMessage.textContent = "An error occurred. Please try again.";
      statusMessage.className = "error";
      console.error(error);
    }
  });
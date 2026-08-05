import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  get,
  set,
  push,
  update,
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

export { db, ref, onValue, get, set, push, update };

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:
    "AIzaSyCf3OuJ3LfQIOrY_ytB-VMwPTm2jaKIBJ4",
  authDomain: "ubercoders.firebaseapp.com",
  projectId: "ubercoders",
  storageBucket: "ubercoders.firebasestorage.app",
  messagingSenderId: "648246074997",
  appId:
    "1:648246074997:web:d8724fc2c7aed70c6ee23c",
  measurementId: "G-02D2QNJ8P7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle logout
document
  .getElementById("logout-button")
  .addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout error:", error);
      alert(
        "Error logging out. Please try again."
      );
    }
  });

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

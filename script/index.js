// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// Your Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf3OuJ3LfQIOrY_ytB-VMwPTm2jaKIBJ4",
  authDomain: "ubercoders.firebaseapp.com",
  projectId: "ubercoders",
  storageBucket: "ubercoders.firebasestorage.app",
  messagingSenderId: "648246074997",
  appId: "1:648246074997:web:d8724fc2c7aed70c6ee23c",
  measurementId: "G-02D2QNJ8P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Sign Up
const signupForm = document.querySelector("#signup-form form");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  function validatePassword(password) {
    // At least 8 characters long
    // Contains uppercase and lowercase letters
    // Contains at least one number
    // Contains at least one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, at least one number, and at least one special character.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Success
    alert(`Welcome, ${username}! Your account has been created.`);
    signupForm.reset();
    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    // Handle errors
    console.error("Error signing up:", error);
    alert(error.message);
  }
});

// Handle Log In
const loginForm = document.querySelector("#login-form form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Success
    alert(`Welcome back, ${user.email}! You are now logged in.`);
    loginForm.reset();
    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    alert(error.message);
  }
});

// Detect User Authentication State
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  if (user) {
    // User is logged in
    console.log("User is logged in:", user.email);
    // If already on login or signup page, redirect to dashboard
    if (window.location.href.includes("index.html") || window.location.href.endsWith("/")) {
      window.location.href = "dashboard.html";
    }
  } else {
    // User is logged out
    console.log("User is logged out");
    // If on dashboard page, redirect to login page
    if (window.location.href.includes("dashboard.html")) {
      window.location.href = "index.html";
    }
  }
};

// Handle Log Out
const logoutButton = document.getElementById("logout-button");
if (logoutButton !== null) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  });
}

// auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const { auth } = window.firebaseServices;

// Signup
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    alert("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error.message);
    alert(error.message);
  }
}

// Login
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    alert("Login successful!");
  } catch (error) {
    console.error("Login error:", error.message);
    alert(error.message);
  }
}

// Google Login
export async function googleLogin() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Google login success:", result.user);
    alert(`Welcome ${result.user.displayName}!`);
  } catch (error) {
    console.error("Google login error:", error.message);
    alert(error.message);
  }
}

// Logout
export async function logout() {
  try {
    await signOut(auth);
    console.log("User logged out");
    alert("Logout successful!");
  } catch (error) {
    console.error("Logout error:", error.message);
    alert(error.message);
  }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  const statusEl = document.getElementById("auth-status");
  if (user) {
    console.log("User is logged in:", user.email);
    if (statusEl) statusEl.innerText = `Logged in as: ${user.email}`;
  } else {
    console.log("User is logged out");
    if (statusEl) statusEl.innerText = "Not logged in";
  }
});

export function listenToAuthChanges(cb) {
  return onAuthStateChanged(auth, cb);
}

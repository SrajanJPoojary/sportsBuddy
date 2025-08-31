// Initializes Firebase and exposes window.firebaseServices
// IMPORTANT: keep this file loaded before other modules that rely on window.firebaseServices.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

// <-- Your firebase config (keep safe) -->
const firebaseConfig = {
  apiKey: "AIzaSyCoBO_b49RHQQutzH5otsEA1ZDZUwrPlUc",
  authDomain: "sports-buddy-27441.firebaseapp.com",
  projectId: "sports-buddy-27441",
  storageBucket: "sports-buddy-27441.appspot.com",
  messagingSenderId: "131481386045",
  appId: "1:131481386045:web:c2d99d8b8f5aa88330fe54",
  measurementId: "G-QC404YC75D"
};

const app = initializeApp(firebaseConfig);
let analytics = null;
try { analytics = getAnalytics(app); } catch (e) { /* analytics may fail on local file:// */ }

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Expose global services so other modules can use them without re-initializing
window.firebaseServices = { app, analytics, auth, db, storage };
        
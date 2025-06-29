// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyS4pgYYSR-4LvzWPzKk1TmncsoFab0EA",
  authDomain: "gritfytechnologies.firebaseapp.com",
  projectId: "gritfytechnologies",
  storageBucket: "gritfytechnologies.appspot.com", // Fixed storage bucket format
  messagingSenderId: "738842239528",
  appId: "1:738842239528:web:ab10dd8ad09c42cd224b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Connect to Firestore emulator if running locally
// Uncomment this if you're using Firebase emulators locally
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

export { app, db };
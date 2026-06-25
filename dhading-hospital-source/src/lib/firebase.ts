import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8xqyUblhCHiKOD4GCEGTLP7sSqZuGLns",
  authDomain: "hospital-myyy.firebaseapp.com",
  databaseURL: "https://hospital-myyy-default-rtdb.firebaseio.com",
  projectId: "hospital-myyy",
  storageBucket: "hospital-myyy.firebasestorage.app",
  messagingSenderId: "815819162162",
  appId: "1:815819162162:web:204045273bfca8618bb22b",
  measurementId: "G-8GY0R44J17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (browser environment)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// Export Realtime Database instance
export const database = getDatabase(app);

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8xqyUblhCHiKOD4GCEGTLP7sSqZuGLns",
  authDomain: "hospital-myyy.firebaseapp.com",
  databaseURL: "https://hospital-myyy-default-rtdb.firebaseio.com",
  projectId: "hospital-myyy",
  storageBucket: "hospital-myyy.firebasestorage.app",
  messagingSenderId: "815819162162",
  appId: "1:815819162162:web:204045273bfca8618bb22b",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function updateLogo() {
  try {
    // Update settings with new logo URL
    const settingsRef = ref(db, "settings");
    await set(settingsRef, {
      logoUrl: "https://dhading-hospital.vercel.app/dhading-hospital-logo.png",
      hospitalName: "Dhading Hospital PVT. LTD",
      hospitalPhone: "01840814",
      hospitalEmail: "info@dhadinghospital.com.np",
      emergencyPhone: "9868592277"
    });

    console.log("✅ Logo updated successfully!");
    console.log("New logo URL: https://dhading-hospital.vercel.app/dhading-hospital-logo.png");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating logo:", error);
    process.exit(1);
  }
}

await updateLogo();

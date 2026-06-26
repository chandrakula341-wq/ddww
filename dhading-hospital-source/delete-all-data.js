import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

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

async function deleteAllData() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    console.log("Starting to delete all data from Firebase...");

    // Delete all data collections
    const dataToDelete = [
      "doctors",
      "services",
      "gallery",
      "machines",
      "news",
      "events",
      "aboutUs",
      "priceList",
      "visitorData",
      "banners"
    ];

    for (const collection of dataToDelete) {
      const collectionRef = ref(db, collection);
      await remove(collectionRef);
      console.log(`✓ Deleted: ${collection}`);
    }

    console.log("\n✓ All data has been successfully deleted from Firebase!");
    console.log("The website is now clean and ready for fresh data.");

  } catch (error) {
    console.error("Error deleting data:", error.message);
    process.exit(1);
  }
}

await deleteAllData();

import { ref, get, set, onValue, off } from "firebase/database";
import { database } from "./firebase";
import seedData from "../seedData.json";

// Database path
const DATA_PATH = "hospitalData";

// Get database reference
const getDataRef = () => ref(database, DATA_PATH);

// Initialize database with seed data if not present
export const syncDataToFirestore = async () => {
  try {
    const dataRef = getDataRef();
    const snapshot = await get(dataRef);

    if (!snapshot.exists()) {
      // Seed the data if not present
      await set(dataRef, seedData);
      console.log("[v0] Database seeded successfully with initial data.");
      return seedData;
    }
    return snapshot.val();
  } catch (error) {
    console.error("[v0] Error syncing data to Firebase:", error);
    return seedData;
  }
};

// Load all data from Firebase Realtime Database
export const loadDataFromFirestore = async () => {
  try {
    const dataRef = getDataRef();
    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      console.log("[v0] Data loaded from Firebase successfully.");
      return snapshot.val();
    }
    // If no data exists, seed it first
    console.log("[v0] No data found, seeding database...");
    return await syncDataToFirestore();
  } catch (error) {
    console.error("[v0] Error loading data from Firebase:", error);
    return seedData;
  }
};

// Save specific field to Firebase Realtime Database
export const saveFieldToFirestore = async (field: string, value: any) => {
  try {
    const fieldRef = ref(database, `${DATA_PATH}/${field}`);
    await set(fieldRef, value);
    console.log(`[v0] Saved ${field} to Firebase`);
  } catch (error) {
    console.error(`[v0] Error saving ${field} to Firebase:`, error);
    throw error;
  }
};

// Save all data to Firebase Realtime Database
export const saveAllDataToFirestore = async (data: any) => {
  try {
    const dataRef = getDataRef();
    await set(dataRef, data);
    console.log("[v0] All data saved to Firebase");
  } catch (error) {
    console.error("[v0] Error saving all data to Firebase:", error);
    throw error;
  }
};

// Clear price list to empty array (for fresh start)
export const clearPriceList = async () => {
  try {
    const priceListRef = ref(database, `${DATA_PATH}/priceList`);
    await set(priceListRef, []);
    console.log("[v0] Price list cleared successfully");
  } catch (error) {
    console.error("[v0] Error clearing price list:", error);
    throw error;
  }
};
export const subscribeToFirestore = (callback: (data: any) => void) => {
  const dataRef = getDataRef();
  let isFirstCall = true;
  
  const unsubscribe = onValue(dataRef, (snapshot) => {
    // Skip the first callback as we already loaded the data
    if (isFirstCall) {
      isFirstCall = false;
      return;
    }
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  }, (error) => {
    console.error("[v0] Error subscribing to Firebase:", error);
  });

  // Return unsubscribe function
  return () => off(dataRef);
};

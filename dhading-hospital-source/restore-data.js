import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import fs from 'fs';

const seedData = JSON.parse(fs.readFileSync('./src/seedData.json', 'utf8'));

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

async function restoreData() {
  try {
    console.log('Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    console.log('Starting data restoration...');
    
    // Restore critical sections
    const sections = [
      'aboutUs', 'priceList', 'services', 'doctors', 
      'gallery', 'machines', 'events', 'news', 'visitorData', 
      'settings', 'testimonials', 'contact', 'videos', 
      'categories', 'mailboxes', 'bookings', 'patientData', 'qrCodes'
    ];
    
    for (const section of sections) {
      if (seedData[section]) {
        console.log(`Restoring ${section}...`);
        await set(ref(db, section), seedData[section]);
        console.log(`✓ ${section} restored`);
      }
    }

    console.log('\n✓ All data restored successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error restoring data:', error);
    process.exit(1);
  }
}

restoreData();

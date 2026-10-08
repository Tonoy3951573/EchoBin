import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const deviceUID = import.meta.env.VITE_DEVICE_UID;

let app;
let db;
let initError = null;

try {
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
    throw new Error(
      "Missing Firebase configuration. Copy .env.example to .env and fill in your project values."
    );
  }
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (err) {
  initError = err;
}

export const database = db;
export const firebaseInitError = initError;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY, APP_ID, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID } from "@env";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.EXPO_PUBLIC_API_KEY,
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

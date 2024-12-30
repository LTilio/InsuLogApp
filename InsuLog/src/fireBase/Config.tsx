import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_INSULOG_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_INSULOG_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_INSULOG_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_INSULOG_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_INSULOG_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_INSULOG_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

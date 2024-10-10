import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP5hgA0DJ6RadyzBB6WF2eXIBYYJG5Uhw",
  authDomain: "blog-nextjs-af685.firebaseapp.com",
  projectId: "blog-nextjs-af685",
  storageBucket: "blog-nextjs-af685.appspot.com",
  messagingSenderId: "868533126126",
  appId: "1:868533126126:web:3ffb888c839cb1aee944ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

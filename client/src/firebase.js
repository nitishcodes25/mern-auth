// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a8690.firebaseapp.com",
  projectId: "mern-auth-a8690",
  storageBucket: "mern-auth-a8690.firebasestorage.app",
  messagingSenderId: "825697816517",
  appId: "1:825697816517:web:f49b4c48ad53f19072c5ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB0zLWUbh96HiYbYzAgzIStaTAACnCrUzo",
  authDomain: "collabwork-e4f37.firebaseapp.com",
  projectId: "collabwork-e4f37",
  storageBucket: "collabwork-e4f37.firebasestorage.app",
  messagingSenderId: "247082673358",
  appId: "1:247082673358:web:97a60a623168ad0fda5c9f",
  measurementId: "G-BJPWEDK39Q"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

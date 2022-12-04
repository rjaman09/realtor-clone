// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaUfGwTdYLGdOn1c8J6q6bi6WM_bGy8mU",
  authDomain: "realtor-clone-coders.firebaseapp.com",
  projectId: "realtor-clone-coders",
  storageBucket: "realtor-clone-coders.appspot.com",
  messagingSenderId: "590894723728",
  appId: "1:590894723728:web:9a0039cf8ff1f07083de15"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
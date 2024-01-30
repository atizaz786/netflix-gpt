// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCawUb_rHiod006JUYUX7CCKwN0T-mb2Vk",
  authDomain: "netflix-gpt-3bf67.firebaseapp.com",
  projectId: "netflix-gpt-3bf67",
  storageBucket: "netflix-gpt-3bf67.appspot.com",
  messagingSenderId: "628048096074",
  appId: "1:628048096074:web:d35f1dd9de64fbbb7aefb3",
  measurementId: "G-4S2YG77YE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);
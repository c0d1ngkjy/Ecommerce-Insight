// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwXgJ-LoLrPy4W-TpDXNmfLuTfQYvcARE",
  authDomain: "ecommerce-insights-kr.firebaseapp.com",
  projectId: "ecommerce-insights-kr",
  storageBucket: "ecommerce-insights-kr.appspot.com",
  messagingSenderId: "803720686457",
  appId: "1:803720686457:web:cfd27d019c533bb75a9da8",
  measurementId: "G-CK1KMRPK6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

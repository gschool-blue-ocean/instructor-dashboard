// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRJm1AEO0jajRhl8OVQuMLqkAmBitndB4",
  authDomain: "studenttable-f78c6.firebaseapp.com",
  projectId: "studenttable-f78c6",
  storageBucket: "studenttable-f78c6.appspot.com",
  messagingSenderId: "331114430885",
  appId: "1:331114430885:web:2dd6494ab8f6e4051fe84c",
  measurementId: "G-0TRVD4T4LQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

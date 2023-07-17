// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh7mYyirL-e4-pV7S7rnZjZIifZEAZgJc",
  authDomain: "instructor-dashboard-4734f.firebaseapp.com",
  projectId: "instructor-dashboard-4734f",
  storageBucket: "instructor-dashboard-4734f.appspot.com",
  messagingSenderId: "530969494205",
  appId: "1:530969494205:web:f547204f30fd90ab8b6dd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSfQCgV2G4AUu2qw7zhqzFujcQIuJZ-Y8",
  authDomain: "travel-planner-dcbdd.firebaseapp.com",
  projectId: "travel-planner-dcbdd",
  storageBucket: "travel-planner-dcbdd.firebasestorage.app",
  messagingSenderId: "819320817701",
  appId: "1:819320817701:web:88a310647c88c8dc8ed7cc",
  measurementId: "G-SHJ2RV2H3J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);
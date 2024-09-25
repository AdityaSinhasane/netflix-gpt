// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx5Wy1NzAT9XcvH0pemeaKZJ3u2h6_Ltc",
  authDomain: "netflixgpt-70acd.firebaseapp.com",
  projectId: "netflixgpt-70acd",
  storageBucket: "netflixgpt-70acd.appspot.com",
  messagingSenderId: "1079643775583",
  appId: "1:1079643775583:web:1f10a97c56598a255c71ea",
  measurementId: "G-EPZTEX78HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
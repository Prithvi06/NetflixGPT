// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQm5x13DYqHIsjbggghGIjfzrs82GamOg",
  authDomain: "netflixgpt-73b94.firebaseapp.com",
  projectId: "netflixgpt-73b94",
  storageBucket: "netflixgpt-73b94.appspot.com",
  messagingSenderId: "359891787418",
  appId: "1:359891787418:web:b5d6c08b41162705314923",
  measurementId: "G-3HFZM6S1TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk0qNiiA3xKueFwwUTbGfUnmldvnnmh-Y",
  authDomain: "postdata-d0e7b.firebaseapp.com",
  databaseURL: "https://postdata-d0e7b-default-rtdb.firebaseio.com",
  projectId: "postdata-d0e7b",
  storageBucket: "postdata-d0e7b.firebasestorage.app",
  messagingSenderId: "465947927809",
  appId: "1:465947927809:web:cbe9a1129c7f4b7179e700",
  measurementId: "G-NWHFN92XBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

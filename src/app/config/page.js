// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXvQYLB-WdW0x3MP6MWKlHQC3GfvyyFXE",
  authDomain: "eventauth-c72e6.firebaseapp.com",
  projectId: "eventauth-c72e6",
  storageBucket: "eventauth-c72e6.appspot.com",
  messagingSenderId: "825895631504",
  appId: "1:825895631504:web:ed5f1e064c4f0ae16a7615",
  measurementId: "G-8SB1N03QYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
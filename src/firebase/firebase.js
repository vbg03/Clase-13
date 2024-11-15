// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByc303nnKU3bLrJ28bssSr9sqCrNx_2To",
    authDomain: "clase-13-7e4a0.firebaseapp.com",
    projectId: "clase-13-7e4a0",
    storageBucket: "clase-13-7e4a0.firebasestorage.app",
    messagingSenderId: "75292408908",
    appId: "1:75292408908:web:0026e565db24792f0588e9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
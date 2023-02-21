import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDZGoKPcR1Ojy-ttwKZdsJzXlQawJO7tsU",
  authDomain: "signal-clone-a3999.firebaseapp.com",
  projectId: "signal-clone-a3999",
  storageBucket: "signal-clone-a3999.appspot.com",
  messagingSenderId: "726668406408",
  appId: "1:726668406408:web:45147322690532a98c393d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
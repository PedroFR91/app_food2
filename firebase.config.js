import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


//Web App firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ0LuFpaLczL0T4_YhkUiW_CyG60_DCQU",
    authDomain: "prueba-34903.firebaseapp.com",
    databaseURL: "https://prueba-34903-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "prueba-34903",
    storageBucket: "prueba-34903.appspot.com",
    messagingSenderId: "635811935566",
    appId: "1:635811935566:web:a55f0de47131dfcebeda1f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);


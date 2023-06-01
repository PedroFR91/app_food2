import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBQ0LuFpaLczL0T4_YhkUiW_CyG60_DCQU",
    authDomain: "prueba-34903.firebaseapp.com",
    databaseURL: "https://prueba-34903-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "prueba-34903",
    storageBucket: "prueba-34903.appspot.com",
    messagingSenderId: "635811935566",
    appId: "1:635811935566:web:a55f0de47131dfcebeda1f"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth()
export const db = firebase.firestore()

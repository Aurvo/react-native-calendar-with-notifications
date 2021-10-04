import firebase from "firebase";
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBj1Sidv59k5i9flpoNX2nKQbyU9Ndkdoo",
    authDomain: "cs530-smith.firebaseapp.com",
    databaseURL: "https://cs530-smith-default-rtdb.firebaseio.com",
    projectId: "cs530-smith",
    storageBucket: "cs530-smith.appspot.com",
    messagingSenderId: "461812208039",
    appId: "1:461812208039:web:b4f6f0aa50655a134a2682",
    measurementId: "G-X9PJGCTPL7"
  }; 

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

//const autha = getAuth();

signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });


  export {
    auth,
    db,
  };
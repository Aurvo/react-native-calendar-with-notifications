import firebase from "firebase";
​
const firebaseConfig = {
  apiKey: "AIzaSyA0dqec0WkDBI4L3NnnvWG438NeVUC_gy4",
  authDomain: "cs530-smith.firebaseapp.com",
  databaseURL: "https://cs530-smith-default-rtdb.firebaseio.com",
  projectId: "cs530-smith",
  storageBucket: "cs530-smith.appspot.com",
  messagingSenderId: "461812208039",
  appId: "1:461812208039:web:b4f6f0aa50655a134a2682",
  measurementId: "G-X9PJGCTPL7"
  }; 
​
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
​
export {
  auth,
  db
};
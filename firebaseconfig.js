//The information below must be gotten from your app's registration with Firebase Project

import firebase from "firebase";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  measurementId: "xxx"
  }; 

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export {
  auth,
  db
};
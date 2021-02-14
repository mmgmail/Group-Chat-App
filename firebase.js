//File to initialize firebase with react-native app

import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj51jZIolrtsKcj4HBLPdknEbSIsc7t2I",
  authDomain: "signal-clone-f69a1.firebaseapp.com",
  projectId: "signal-clone-f69a1",
  storageBucket: "signal-clone-f69a1.appspot.com",
  messagingSenderId: "456197439072",
  appId: "1:456197439072:web:c6c965d2638b8140b54d05",
};

let app;

//Conditionally initialize firebase app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDXPJNV5e_IWpK5Z3stBaK3pj9foHifn-s",
  authDomain: "art-aficionado.firebaseapp.com",
  projectId: "art-aficionado",
  storageBucket: "art-aficionado.appspot.com",
  messagingSenderId: "416696783838",
  appId: "1:416696783838:web:edea6c31674a890ada034f",
  measurementId: "G-H9RNWK7LNQ",
});

const db = firebase.firestore();

export { db };

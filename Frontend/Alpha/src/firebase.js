import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDXPJNV5e_IWpK5Z3stBaK3pj9foHifn-s",
  authDomain: "art-aficionado.firebaseapp.com",
  projectId: "art-aficionado",
  storageBucket: "art-aficionado.appspot.com",
  messagingSenderId: "416696783838",
  appId: "1:416696783838:web:edea6c31674a890ada034f",
  measurementId: "G-H9RNWK7LNQ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };

import firebase from "firebase";
import "firebase/firestore";
firebase.initializeApp({
  apiKey: "AIzaSyDl866HPvbEGxGa603WtXAleJnnW9LOcis",
  authDomain: "laptop-sale-4697f.firebaseapp.com",
  databaseURL: "https://laptop-sale-4697f.firebaseio.com",
  projectId: "laptop-sale-4697f",
  storageBucket: "laptop-sale-4697f.appspot.com",
  messagingSenderId: "679136829968",
  appId: "1:679136829968:web:c4fd24216c590816c3e095",
  measurementId: "G-ZJP69ZM88V",
});
const db = firebase.firestore();
export default db;

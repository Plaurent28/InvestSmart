// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAEQkp0bOV_hh7ReSq9IDpp5sYYvygR2Fo",
  authDomain: "investsmart-31f64.firebaseapp.com",
  projectId: "investsmart-31f64",
  storageBucket: "investsmart-31f64.appspot.com",
  messagingSenderId: "234194155786",
  appId: "1:234194155786:web:e148e54d3d5ef9af0be2f3"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
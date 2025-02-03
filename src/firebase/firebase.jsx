import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvsXB6bc8RW9vvLiE3AsxwXZqStMJLNMs",
    authDomain: "innovatex-4a870.firebaseapp.com",
    projectId: "innovatex-4a870",
    storageBucket: "innovatex-4a870.firebasestorage.app",
    messagingSenderId: "51614149658",
    appId: "1:51614149658:web:f807aca74d4aa7a976b5a3",
    measurementId: "G-YS0G3YKBVV"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };



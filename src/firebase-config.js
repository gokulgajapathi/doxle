// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2fBI3j415bZ70PmN9sA6wqCaPVX8OF-k",
  authDomain: "doxle-word-processor.firebaseapp.com",
  projectId: "doxle-word-processor",
  storageBucket: "doxle-word-processor.firebasestorage.app",
  messagingSenderId: "986703010860",
  appId: "1:986703010860:web:a125018526e29efc0e0589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Function to log in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

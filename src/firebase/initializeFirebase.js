// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need

import { getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  getIdToken,
  setPersistence,
  browserSessionPersistence, signOut } from "firebase/auth";
import { getFirestore,addDoc,collection,query, where, getDocs, orderBy, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

import { app } from "./credentialsFirebase.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
 const auth = getAuth(app);
 const db = getFirestore(app)

export {getAuth,
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  getIdToken, 
  getFirestore,addDoc,collection,query, where, getDocs, orderBy, doc, updateDoc,
  auth, db, arrayUnion, signOut
}

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });







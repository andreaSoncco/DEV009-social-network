// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need

import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  getIdToken,
  setPersistence,
  browserSessionPersistence,
  updateProfile,
} from 'firebase/auth';

import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';

import { app } from './credentialsFirebase.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  provider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  getIdToken,
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  auth,
  db,
  arrayUnion,
  updateProfile,
  deleteDoc,
};

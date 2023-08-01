// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./credentialsFirebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const auth = getAuth(app);

/*export {
  auth,
  app,
  createUserWithEmailAndPassword,
};*/

export const registrarUsuario = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

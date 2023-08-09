// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./credentialsFirebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const auth = getAuth(app);

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

export const validarUsuario = (email, password) => {
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
/*const auth = firebase.auth();
const email = "user@example.com";
const password = "password123";
auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Send email verification
    userCredential.user.sendEmailVerification()
      .then(() => {
        // Email verification sent!
      });
  })
  .catch((error) => {
    console.error(error);
  }); */


  /*const auth = firebase.auth();
const user = auth.currentUser;
user.sendEmailVerification()
  .then(() => {
    // Email verification sent!
  })
  .catch((error) => {
    console.error(error);
  }); */
const provider = new GoogleAuthProvider();

export const registerGoogle = (callback) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const nameUser = user.displayName;
      userDataGoogle();
      callback(true);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      callback(false);
    });

};

//export { createUserWithEmailAndPassword, sendEmailVerification};
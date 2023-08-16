// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore,addDoc,collection,query, where, getDocs } from "firebase/firestore"; 
import { app } from "./credentialsFirebase.js";
import { async } from "regenerator-runtime";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const auth = getAuth(app);
const db = getFirestore(app)
let userEmail = "";

/*export {
  auth,
  app,
  createUserWithEmailAndPassword,
};*/

export const registrarUsuario = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential);
    const user = userCredential.user;
    validarUsuario(auth);
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};

export const validarUsuario = (auth) => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    alert('se envio correo de verificacion');
  });
};


  /*--------------login--------- */

  export const loginEmailPassword = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
       
        userEmail = user.email;

        console.log(userEmail);
        callback(true);
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        if (errorCode === 'auth/user-not-found') {
          alert('usuario no registrado');
  
        } else if (errorCode === 'auth/wrong-password') {
          alert('Contraseña incorrecta');
        }
        callback(false);
      });
    }

  /*export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };*/

/*---------------------------Google------------------------ */
/**
     * Function called when clicking the Login/Logout button.
     */
const provider = new GoogleAuthProvider();
export const  toggleSignIn = () => {

  try{
        if (!auth.currentUser) {
  
        signInWithPopup(auth, provider)
        .then(function(result) {
        
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
      
            window.location.href = `${window.location.origin}/wall`;
            console.log(credential, token, user);
  
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have already signed up with a different auth provider for that email.');
              // If you are using multiple auth providers on your app you should handle linking
              // the user's accounts here.
            } else {
              console.error(error);
            }
          });
        } else {
          auth.signOut();
        }
      }catch(error)
      {
        console.error(error.code, error.message);
      }
    };
  

    export const createPost = async (postMuro) => {

      //alert(userEmail);
        // Add a new document in collection "cities"
       const muroUsuario = "wall_"+userEmail;
        const docRef = await addDoc(collection(db, muroUsuario), {
          post: postMuro,
          likes:1,
          comments:0
        });
  

      }


      export const getPostsByUser = async () => {

        const muroUsuario = "wall_"+userEmail;
        const q = query(collection(db, muroUsuario)/*, where("capital", "==", true)*/);

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
  
        }

/*export const registerGoogle = (callback) => {
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

};*/

//export { createUserWithEmailAndPassword, sendEmailVerification};
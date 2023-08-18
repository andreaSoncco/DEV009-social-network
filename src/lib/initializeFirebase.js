// Import the functions you need from import { initializeApp } from 'firebase/app';the SDKs you need

import { getAuth,
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  getIdToken} from "firebase/auth";
import { getFirestore,addDoc,collection,query, where, getDocs, orderBy, doc, updateDoc } from "firebase/firestore"; 
import { app } from "./credentialsFirebase.js";
import { async } from "regenerator-runtime";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const auth = getAuth(app);
const db = getFirestore(app)

let uidUserSesion = "noUser";
let userEmailSesion = "sinEmail";
let userDisplayNameSesion = "noDisplayUserName";
const artLoversWall = "artLoversWall";

export const registrarUsuario = ( email, password) => {
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

export const initSessionVariables = () =>
{
      
 userEmailSesion = auth.currentUser.email;
 uidUserSesion = auth.currentUser.uid;
 userDisplayNameSesion = auth.currentUser.displayName;

}

 /*--------------login--------- */

 export const loginEmailPassword = (email, password, callback) => {
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       initSessionVariables();

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

//restablecer contraseña
export const resetPassword = (userEmail) => {
 console.log("recuperar contraseña antes");
 const resultado = sendPasswordResetEmail(auth, userEmail).then((a) => {
   alert("Password reset email sent"+ a);
 })
 console.log(resultado);
 
 return resultado;
};
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
         //  const token = credential.accessToken;
           // The signed-in user info.
           //const user = credential.user;
           initSessionVariables();
                 
           window.location.href = `${window.location.origin}/wall`;
           console.log(credential);
 
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
 

/*-------------------------------Nuevo post ligado al usuario-------------- */
   export const createPost = async (postMuro) => {
     const authObject = auth;
     //alert(userEmail);
     console.log(uidUserSesion);
     let today = new Date();
     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     let dateTime = date+' '+time;

     if ( uidUserSesion === 'noUser' || userEmailSesion === 'sinEmail' || userDisplayNameSesion === 'noDisplayUserName' )
     {
       initSessionVariables();
     }

       const docRef = await addDoc(collection(db, artLoversWall), {
         post: postMuro,
         likeCount:0,
         comments:0,
         uidUser: uidUserSesion,
         userEmail: userEmailSesion,
         userDisplayName: userDisplayNameSesion,
         postDateTime: dateTime

         
       });

     };

//---------------------------------Obtener post-------------------------
     export const getAllPosts = async () => {
       
       console.log(uidUserSesion); 
       let objJSONPost = "";
       try {
         //Se inicializa la busqueda de todos los documentos en firestore en la coleccion artLoversWall
         const colRef = collection(db, artLoversWall);
         //Se ejecuta la consulta de todos los documentos en firestore sobre la coleccion artLoversWall
       const docsSnapshot = await getDocs(colRef); 
     objJSONPost = convertSnapshotToJSON(docsSnapshot);
     }
     catch (error){
       console.log(error);
     }
     return objJSONPost;
       }; 

  const convertSnapshotToJSON = (docsSnapshot) => {
       
 
        let postOnJSON = "{ \"posts\": [";
        let objJSONPost = "";
        //const muroUsuario = "wall_1"+userEmail;
        
        //Se recorre la lista de documentos que se obtuvode la consulta en firestore sobre la coleccion artLoversWall
        docsSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let postJSON = "";
         // console.log(doc.id, " => ", doc.data());
          postJSON = "{" + "\"idPost\": \"" + doc.id + "\", " + "\"post\": \"" + doc.data().post + "\", " + "\"uidUser\": \"" + doc.data().uidUser + "\", " + "\"comments\": \"" + doc.data().comments
                     + "\" ," + "\"likeCount\":" + doc.data().likeCount + " ," + "\"userDisplayName\":\"" + doc.data().userDisplayName + "\" ," + "\"userEmail\":\"" + doc.data().userEmail + "\"" + ","
                     + "\"postDateTime\":\"" + doc.data().postDateTime + "\"" + "}";
          postOnJSON+= postJSON;
            postOnJSON+= ",";
        });
        postOnJSON=postOnJSON.substring(0, postOnJSON.length - 1);
        postOnJSON+= "]}";
       // console.log(postOnJSON);
        objJSONPost = JSON.parse(postOnJSON);
        //console.log(objJSONPost);
      
      return objJSONPost;
        }; 

//---------------------------------------------Obtener posts por usuarios--------------------
       export const getPostsByUser = async () => {
         console.log(auth.currentUser.uid);
         currentUid = auth.currentUser.uid;
         let postOnJSON = "{";
         //const muroUsuario = "wall_1"+userEmail;
         try {
         const q = query(collection(db, artLoversWall), where("uidUser", "==", currentUid));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
           postOnJSON.concat(doc.data());
           postOnJSON.concat(",");
         });
         postOnJSON.concat("}");
      //   console.log(postOnJSON);
       }
       catch (error){
         console.log(error);
       }
         }; 

         export const getPostsOrderByDateTime = async () => {
          let objJSONPost = "";
          try {
          const q = query(collection(db, artLoversWall), orderBy("postDateTime", "desc"));
          const querySnapshot = await getDocs(q);
          objJSONPost = convertSnapshotToJSON(querySnapshot);
        }
        catch (error){
          console.log(error);
        }
        return objJSONPost;
          }; 


      export const getPostsbyUid = async (documentId) => {
            //let objJSONPost = "";
            try {
              const postRef = doc(db, artLoversWall, documentId);
              //Se ejecuta la consulta de todos los documentos en firestore sobre la coleccion artLoversWall
              console.log(postRef);
              await updateDoc(postRef, {
                likeCount: 1
              });
            //const docsSnapshot = await getDocs(colRef); 
          //objJSONPost = convertSnapshotToJSON(docsSnapshot);
          }
          catch (error){
            console.log(error);
          }
          //return objJSONPost;
            }; 



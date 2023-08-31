// aqui exportaras las funciones que necesites
import {
  createUserWithEmailAndPassword,
  signOut,
  provider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  auth,
  db,
  arrayUnion,
  deleteDoc,
  getDoc,
} from '../firebase/initializeFirebase';

let uidUserSesion = 'noUser';
let userEmailSesion = 'sinEmail';
let userDisplayNameSesion = 'noDisplayUserName';
const artLoversWall = 'artLoversWall';

/* ---------------------------------Nuevo Usuario----------------------------------- */

export function mostrarEstadoDeRegistro(mensaje) {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = mensaje;
}
function registroExitoso(mensaje) {
  const succesMessage = document.getElementById('succesMessage');
  succesMessage.textContent = mensaje;
}

// eslint-disable-next-line
export const validarUsuario = (auth) => {
  if (auth) {
    sendEmailVerification(auth.currentUser).then(() => {
      registroExitoso('Se envió correo de verificación. Revisa en la carpeta de correo no deseado.');
    });
  } else {
    console.log('no se creo usuario y no se envio correo de verificacion');
  }
};
// eslint-disable-next-line
export const registrarUsuario = (email, password) => createUserWithEmailAndPassword(auth, email, password);

/* ---------------------------------Info del usuario----------------------------- */
export const initSessionVariables = () => {
  userEmailSesion = auth.currentUser.email;
  uidUserSesion = auth.currentUser.uid;
  userDisplayNameSesion = auth.currentUser.displayName;
};

/* --------------login y Persistencia de datos--------- */

export function loginEmailPassword(email, password, callback) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithEmailAndPassword(auth, email, password))
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user);
      callback(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        alert('Usuario no registrado');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      }
      callback(false);
    });
}

/* --------------- LogOut -------------------- */
// eslint-disable-next-line
export function logOut(auth) {
  signOut(auth).then(() => {
  }).catch((error) => {
    alert(error);
  });
}

// ---------------------------------restablecer contraseña
export const resetPassword = (userEmail) => {
  sendPasswordResetEmail(auth, userEmail);
  return sendPasswordResetEmail;
};
/* ---------------------------Inicio de sesion con Google------------------------ */
/* Function called when clicking the Login/Logout button. */

export const toggleSignIn = () => {
  try {
    if (!auth.currentUser) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          //  const token = credential.accessToken;
          // The signed-in user info.
          // const user = credential.user;
          initSessionVariables();

          window.location.href = `${window.location.origin}/wall`;
          console.log(credential);
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential;
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
  } catch (error) {
    console.error(error.code, error.message);
  }
};

/* -----------------------------------Cierre de sesion--------------------------- */

export const logOutFromSession = () => {
  if (auth.currentUser) {
    signOut(auth).then(() => {
      alert('Saliste de tu sesion exitosamente.');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
};

/* -------------------------------Nuevo post ligado al usuario-------------- */
export const createPost = async (postMuro) => {
  // const authObject = auth;
  // alert(userEmail);
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  if (uidUserSesion === 'noUser' || userEmailSesion === 'sinEmail' || userDisplayNameSesion === 'noDisplayUserName') {
    initSessionVariables();
  }

  await addDoc(collection(db, artLoversWall), {
    post: postMuro,
    likeCount: 0,
    comments: 0,
    uidUser: uidUserSesion,
    userEmail: userEmailSesion,
    userDisplayName: userDisplayNameSesion,
    postDateTime: dateTime,

  });
};

// --------------------------Editar Post----------------------------

export const editPost = (documentId, editedPost) => {
  const postRef = doc(db, artLoversWall, documentId);
  return updateDoc(postRef, {
    post: editedPost,
  });
};

// --------------------------Borrar Post----------------------

export const deletePost = (documentId) => {
  const postRef = doc(db, artLoversWall, documentId);
  return deleteDoc(postRef);
};

// -------------------------Dar like---------------------------------
export const addLike = (documentId) => {
  const postRef = doc(db, artLoversWall, documentId);
  return updateDoc(postRef, {
    likeCount: arrayUnion(auth.currentUser.uid),
  });
};
// ---------------------------Quitar like----------------------
export const dismissLikesbyUid = (documentId, arrayOfLikes) => {
  const postRef = doc(db, artLoversWall, documentId);
  if (arrayOfLikes.length === 0) {
    return updateDoc(postRef, {
      likeCount: 0,
    });
  }
  return updateDoc(postRef, {
    likeCount: arrayOfLikes,
  });
};
/* eslint-disable */
export const getPostsOrderByDateTime = async () => {
  try {
    const q = query(collection(db, artLoversWall), orderBy('postDateTime', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (error) {
    console.log(error);
  }
};

export const getDataPostByIdPost = async (idPost) => {

                    
  try {
        const docRef = doc(db,artLoversWall,idPost);
        const querySnapshot = await getDoc(docRef);
        return querySnapshot.data().post;
      }
      catch (error){
        console.log(error);
      }

  };
/* eslint-enable */
/* ------------------------------FUNCIONES NO USADAS------------------------------------- */
/* ------------------------------Concatena los posts dentro de un objeto------------------------ */
// const convertSnapshotToJSON = (docsSnapshot) => {
//   let postOnJSON = '{ "posts": [';
//   let objJSONPost = '';
//   const muroUsuario = "wall_1"+userEmail;
//   Se recorre la lista de documentos que se obtuvo de la consulta a la coleccion artLoversWall
//   docsSnapshot.forEach((doc) => {
//     doc.data() is never undefined for query doc snapshots
//     let postJSON = '';
//  postJSON='{'+`"idPost":"${doc.id}",`+`"post":"${doc.data().post}",`+
//  `"uidUser":"${doc.data().uidUser}",`+
//     `"comments":"${doc.data().comments
// }" ,` + `"likeCount":${doc.data().likeCount} ,` +
//   `"userDisplayName":"${doc.data().userDisplayName}" ,` +
//   `"userEmail":"${doc.data().userEmail}"` + ','
//       + `"postDateTime":"${doc.data().postDateTime}"` + '}';
//     postOnJSON += postJSON;
//     postOnJSON += ',';
//   });
//   postOnJSON = postOnJSON.substring(0, postOnJSON.length - 1);
//   postOnJSON += ']}';
//   objJSONPost = JSON.parse(postOnJSON);

//   return objJSONPost;
// };

// ---------------------------------------------Obtener posts por usuarios--------------------
/* -----------------Obtenemos todos los posts de el usuario que inicio sesion------------------ */
// export const getPostsByUser = async () => {
//   currentUid = auth.currentUser.uid;
//   const postOnJSON = '{';
//   // const muroUsuario = "wall_1"+userEmail;
//   try {
//     const q = query(collection(db, artLoversWall), where('uidUser', '==', currentUid));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       postOnJSON.concat(doc.data());
//       postOnJSON.concat(',');
//     });
//     postOnJSON.concat('}');
//   } catch (error) {
//   }
// };

/* export const getPostsOrderByDateTime = async () => {
  //let objJSONPost = "";
  try {
  const q = query(collection(db, artLoversWall), orderBy("postDateTime", "desc"));
  const querySnapshot = await getDocs(q);
  //objJSONPost = convertSnapshotToJSON(querySnapshot);
}
catch (error){
}
return objJSONPost;
  }; */

// ---------------------------------Obtener post-------------------------
// export const getAllPosts = async () => {
//   // let objJSONPost = "";
//   try {
//   // Se inicializa la busqueda de todos los documentos en firestore en la coleccion artLoversWall
//     const colRef = collection(db, artLoversWall);
//   // Se ejecuta la consulta de todos los documentos en firestore sobre la coleccion artLoversWall
//     const docsSnapshot = await getDocs(colRef);
//     // objJSONPost = convertSnapshotToJSON(docsSnapshot);
//     return docsSnapshot;
//   } catch (error) {
//   }
//   // return docsSnapshot;
// };

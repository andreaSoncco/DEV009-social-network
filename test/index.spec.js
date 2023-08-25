// importamos la funcion que vamos a testear
// /* import { registrarUsuario,
//          validarUsuario,
//          initSessionVariables,
//          loginEmailPassword,
//          logOut,
//          resetPassword,
//          toggleSignIn,
//         } from '../src/lib/index';
// import {
//         createUserWithEmailAndPassword,
//         signOut,
//         GoogleAuthProvider,
//         sendEmailVerification,
//         sendPasswordResetEmail,
//         signInWithEmailAndPassword,
//         signInWithPopup,
//       } from '../firebase/initializeFirebase';
// jest.mock('../src/firebase/initializeFirebase');
// describe('registrarUsuario', () => {
//   it('debería ser una función', () => {
//     expect(typeof registrarUsuario).toBe('function');
//   });
// });
// describe('registrarUsuario', () => {
//   it('deberia crear un usuario con correo y contraseña', () => registrarUsuario('prueba@gmail.com', 'abc123').then(() => {
//     expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
//     expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'prueba@gmail.com', 'abc123');
//   }));
// });
// describe('validarUsuario', () => {
//   it('debería ser una función', () => {
//     expect(typeof validarUsuario).toBe('function');
//   });
// });
// describe('initSessionVariables', () => {
//   it('debería ser una función', () => {
//     expect(typeof initSessionVariables).toBe('function');
//   });
// });
// describe('loginEmailPassword', () => {
//   it('debería ser una función', () => {
//     expect(typeof loginEmailPassword).toBe('function');
//   });
// });
// describe('loginEmailPassword', () => {
//   it('permitir un usuario ingresar con un email y contraseña ya registrados', () => loginEmailPassword('prueba@gmail.com', 'abc123').then(() => {
//     expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
//     expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'prueba@gmail.com', 'abc123');
//   }));
// });
// describe('logOut', () => {
//   it('debería ser una función', () => {
//     expect(typeof logOut).toBe('function');
//   });
// });
// describe('logOut', () => {
//   it('deberia cerrar sessión', () => logOut(auth).then(() => {
//     expect(signOut).toHaveBeenCalledTimes(1);
//     expect(signOut).toHaveBeenCalledWith(auth);
//   }));
// });
// describe('resetPassword', () => {
//   it('debería ser una función', () => {
//     expect(typeof resetPassword).toBe('function');
//   });
// });
// describe('resetPassword', () => {
//   it('deberia enviar un correo al email ingresado', () => resetPassword('prueba@gmail.com').then(() => {
//     expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
//     expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'prueba@gmail.com');
//   }));
// });
// describe('toggleSignIn', () => {
//   it('debería ser una función', () => {
//     expect(typeof toggleSignIn).toBe('function');
//   });
// });
// describe('toggleSignIn', () => {
//   it('deberia iniciar sesión mediante el proveedor Google', () => toggleSignIn().then(() => {
//     expect(signInWithPopup).toHaveBeenCalledTimes(1);
//     expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
//   }));
// });

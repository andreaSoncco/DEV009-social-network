// aqui exportaras las funciones que necesites

import { createUserWithEmailAndPassword, auth } from './initializeFirebase';

export const registrarUsuario = (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error.message;
  }
};


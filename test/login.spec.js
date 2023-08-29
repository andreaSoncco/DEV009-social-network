import { createUserWithEmailAndPassword, auth, sendPasswordResetEmail } from '../src/firebase/initializeFirebase';
import { registrarUsuario, resetPassword } from '../src/lib/index.js';

jest.mock('../src/firebase/initializeFirebase', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  auth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));
const email = 'test@test.com';
const password = 'password';
describe('registrarUsuario', () => {
  it('debería llamar a createUserWithEmailAndPassword con los parámetros recibidos', async () => {
    await registrarUsuario(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
  it('en caso de tener correo o contrasena invalida deberia salir un error', async () => {
    const error = new Error('Error al crear usuario');
    createUserWithEmailAndPassword.mockRejectedValue(error);
    // Llama a la función registrarUsuario con credenciales inválidas
    await expect(registrarUsuario('email invalido', 'contrasena invalida')).rejects.toThrow(error);
  });
});

describe('resetPassword', () => {
  it('debe enviar un correo de restablecimiento y devolver el correo electrónico', async () => {
    const userEmail = 'nest@test.com';
    await resetPassword(userEmail);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, userEmail);
    // Verifica que el resultado retornado sea el correo electrónico
  });
});

// it('deberia llamar a la funcion loginWithGoogle al hacer clic en el boton Google', async () => {
//   const btnGoogle = cont.querySelector('#btnGoogle');

//   if (btnGoogle) {
//     const loginWithSpyGoogle = jest.spyOn(loginController, 'loginWithGoogle');

//     const clickEvent = new Event('click');
//     btnGoogle.dispatchEvent(clickEvent);

//     await Promise.resolve();

//     expect(loginWithSpyGoogle).toHaveBeenCalled();

//     loginWithSpyGoogle.mockRestore();
//   } else {
//     console.log('No se encontró el elemento #btnGoogle');
//   }
// });

import { createUserWithEmailAndPassword, auth } from '../src/firebase/initializeFirebase';
import { registrarUsuario } from '../src/lib/index.js';

jest.mock('../src/firebase/initializeFirebase', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  auth: jest.fn(),
}));

describe('registrarUsuario', () => {
  it('debería llamar a createUserWithEmailAndPassword con los parámetros recibidos', async () => {
    const email = 'test@test.com';
    const password = 'password';
    await registrarUsuario(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });

  it('debería mostrar una alerta con el código de error si ocurre un error', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    registrarUsuario('nest@test.com', 'password', auth);
    expect(alertSpy).toHaveBeenCalledWith('errorCode');
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

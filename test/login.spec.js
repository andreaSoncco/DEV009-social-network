import { createUserWithEmailAndPassword, auth, getAuth } from 'firebase/auth';
import { registrarUsuario } from '../src/lib/index.js';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  auth: jest.fn(),
}));
jest.mock('firebase/auth');
getAuth.mockReturnValue({
  createUserWithEmailAndPassword: jest.fn(),
});
// jest.mock('../src/lib/index.js');

describe('registrarUsuario', () => {
  it('debería llamar a createUserWithEmailAndPassword con los parámetros recibidos', () => {
    // const mockCreateUserWithEmailAndPassword = jest.mock('firebase/auth', () => ({
    //   createUserWithEmailAndPassword: jest.fn(),
    // }));
    // const mockAuth = jest.mock('firebase/auth', () => ({
    //   auth: jest.fn(),
    // }));
    const email = 'test@test.com';
    const password = 'password';

    registrarUsuario(email, password, auth);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it('debería llamar a validarUsuario después de que se haya registrado el usuario', () => {
    // const mockCreateUserWithEmailAndPassword = jest.fn().mockResolvedValue('userCredential');
    // const mockAuth = { createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword };
    const mockValidarUsuario = jest.fn();
    const consoleSpy = jest.spyOn(console, 'log');

    registrarUsuario('test@test.com', 'password', auth, mockValidarUsuario);

    expect(mockValidarUsuario).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('userCredential');
  });

  it('debería mostrar una alerta con el código de error si ocurre un error', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    registrarUsuario('test@test.com', 'password', auth);
    expect(alertSpy).toHaveBeenCalledWith('errorCode');
  });
});

  it('deberia llamar a la funcion loginWithGoogle al hacer clic en el boton Google', async () => {
    const btnGoogle = cont.querySelector('#btnGoogle');

    if (btnGoogle) {
      const loginWithSpyGoogle = jest.spyOn(loginController, 'loginWithGoogle');

      const clickEvent = new Event('click');
      btnGoogle.dispatchEvent(clickEvent);

      await Promise.resolve();

      expect(loginWithSpyGoogle).toHaveBeenCalled();

      loginWithSpyGoogle.mockRestore();
    } else {
      console.log('No se encontró el elemento #btnGoogle');
    }
  });
})
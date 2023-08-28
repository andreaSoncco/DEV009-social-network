// import { createUserWithEmailAndPassword } from '../firebase/initializeFirebase';
// import { registrarUsuario } from '.';

// jest.mock('../firebase/initializeFirebase');

// test('registraUsuario debería registrar nuestro correo electrónico y contraseña', () => {
//   // Configura el mock para devolver una Promesa con .then()
//   createUserWithEmailAndPassword.mockResolvedValueOnce({
//     email: 'prueba@gmail.com',
//     password: 'abc123',
//   });

//   const registro = registrarUsuario();

//   expect(registro.email).toBe('prueba@gmail.com');
//   expect(registro.password).toBe('abc123');
// });

/*
test('registraUsuario debería registrar nuestro correo electrónico y contraseña',() => {
  // Configura el mock para devolver una Promesa
  createUserWithEmailAndPassword.mockResolvedValueOnce(
    (email, password).then(() => {"email": 'prueba@gmail.com', "password": 'abc123'}));

  const registro = registrarUsuario();

  expect(registro.email).toBe('prueba@gmail.com');
  expect(registro.password).toBe('abc123');
});
*/

/*
import {
  registrarUsuario,
  validarUsuario,
  initSessionVariables,
  loginEmailPassword,
  logOut,
  resetPassword,
} from '../src/lib/index';
import {
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '../firebase/initializeFirebase';

jest.mock('../src/firebase/initializeFirebase');

describe('registrarUsuario', () => {
  it('debería ser una función', () => {
    expect(typeof registrarUsuario).toBe('function');
  });

  it('deberia crear un usuario con correo y contraseña', () => registrarUsuario(
    'prueba@gmail.com', 'abc123'
    ).then(() => {
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'prueba@gmail.com', 'abc123');
  }));
});

describe('validarUsuario', () => {
  it('debería ser una función', () => {
    expect(typeof validarUsuario).toBe('function');
  });
});

describe('initSessionVariables', () => {
  it('debería ser una función', () => {
    expect(typeof initSessionVariables).toBe('function');
  });
});

describe('loginEmailPassword', () => {
  it('debería ser una función', () => {
    expect(typeof loginEmailPassword).toBe('function');
  });

  it('permitir un usuario ingresar con un email y contraseña ya registrados',
  () => loginEmailPassword(
    'prueba@gmail.com', 'abc123'
    ).then(() => {
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'prueba@gmail.com', 'abc123');
  }));
});

describe('logOut', () => {
  it('debería ser una función', () => {
    expect(typeof logOut).toBe('function');
  });

  it('deberia cerrar sessión', () => logOut(auth).then(() => {
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(auth);
  }));
});

describe('resetPassword', () => {
  it('debería ser una función', () => {
    expect(typeof resetPassword).toBe('function');
  });

  it('deberia enviar un correo al email ingresado', () => resetPassword(
    'prueba@gmail.com'
    ).then(() => {
    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'prueba@gmail.com');
  }));
});
*/

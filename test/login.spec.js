import { createUserWithEmailAndPassword, auth, sendPasswordResetEmail } from '../src/firebase/initializeFirebase';
import { registrarUsuario, resetPassword } from '../src/lib/index.js';

jest.mock('../src/firebase/initializeFirebase', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  auth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));
// jest.mock('../src/lib/index.js', () => ({
//   mostrarEstadoDeRegistro: jest.fn(),
// }));

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
    await expect(() => registrarUsuario('email invalido', '12345')).rejects.toThrow(error);
  });
});

describe('resetPassword', () => {
  it('debe enviar un correo de restablecimiento y devolver el correo electrónico', async () => {
    const userEmail = 'nest@test.com';
    await resetPassword(userEmail);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, userEmail);
  });
});

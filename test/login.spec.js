import { createUserWithEmailAndPassword, auth } from '../src/firebase/initializeFirebase';
import { registrarUsuario } from '../src/lib/index.js';

jest.mock('../src/firebase/initializeFirebase', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  auth: jest.fn(),
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

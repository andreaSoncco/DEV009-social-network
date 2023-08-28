/* import {
  getAuth, signInWithEmailAndPassword,
} from 'firebase/auth';
import { loginEmailPassword } from '../src/lib';

// Configurar un mock para getAuth y signInWithEmailAndPassword
jest.mock('firebase/auth');
getAuth.mockReturnValue({
  signInWithEmailAndPassword: jest.fn(),
});

describe('loginUser', () => {
  it('debería iniciar sesión con el correo y contraseña', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    // Configurar el mock para signInWithEmailAndPassword
    signInWithEmailAndPassword.mockResolvedValue({
      user: {
        email,
        uid: 'userID',
        accessToken: 'accessToken',
      },
    });

    const result = await loginEmailPassword(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, password);

    expect(result).toBe(email);
  });

  it('debería lanzar un error si falla el inicio de sesión', async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error('Error de inicio de sesión'));
    await expect(loginEmailPassword('test@example.com',
     'testpassword')).rejects.toThrowError('Error de inicio de sesión');

    // Llamar a la función loginUser y verificar si lanza un error
    await expect(loginUser('test@example.com', 'testpassword')).rejects.toThrowError(
      'Error de inicio de sesión');
  });
});
*/

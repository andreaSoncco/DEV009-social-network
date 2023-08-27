/* import {login} from '../src/components/login.js';

describe('login', () => {
  let cont;
  let loginUserSpy;
  let loginWithGoogleSpy;

  beforeEach(() => {
    // Configuración previa a cada prueba
    cont = login(); // main container
    document.body.appendChild(cont);

    // Configurar un mock para el controlador de loginWithGoogle
    loginWithGoogleSpy = jest.spyOn(loginController, 'loginWithGoogle');
    loginWithGoogleSpy.mockRestore();
    loginUserSpy = jest.spyOn(loginController, 'loginUser');
  });

  afterEach(() => {
    document.body.removeChild(cont);
    loginUserSpy.mockRestore();
    loginWithGoogleSpy.mockRestore();
  });

  it('Verificar que los elementos del DOM se hayan creado correctamente formulario y logo', () => {
    // Verifica si los elementos del DOM se crearon correctamente en la función registroView()
    const form = cont.querySelector('.formLogin');
    const logo = cont.querySelector('#logoLogin');
    const email = cont.querySelector('input[type="email"]');
    const password = cont.querySelector('input[type="password"]');

    // Asegúrate de que los elementos no sean nulos y tengan las clases o atributos esperados
    expect(logo).toBeTruthy();
    expect(form).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('debería llamar a la función loginUser al enviar el formulario', async () => {
    // Simula el llenado del formulario con datos válidos
    const emailValue = 'test@example.com';
    const passwordValue = 'testpassword';

    const form = cont.querySelector('.formLogin');
    const emailInput = cont.querySelector('input[name="email"]');
    const passwordInput = cont.querySelector('input[name="password"]');

    emailInput.value = emailValue;
    passwordInput.value = passwordValue;

    // Configura un mock para la función loginUser
    const loginUserMock = jest.spyOn(loginController, 'loginUser').mockResolvedValue('UsuarioMock');

    // Simula el envío del formulario
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    await Promise.resolve();

    // Verifica que la función loginUser haya sido llamada con los datos correctos
    expect(loginUserMock).toHaveBeenCalledWith(emailValue, passwordValue);

    // Limpia el mock
    loginUserMock.mockRestore();
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
*/

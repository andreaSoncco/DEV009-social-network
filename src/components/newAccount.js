import { auth } from '../firebase/initializeFirebase';
import { registrarUsuario, validarUsuario } from '../lib/index';

function newAccount(navigateTo) {
  const divNewAccount = document.createElement('div');
  divNewAccount.classList = 'page';

  // section General
  const section = document.createElement('section');
  section.id = 'newAccount';
  const title = document.createElement('h1');
  title.id = 'newAccountTitle';
  title.textContent = 'Crear una cuenta';
  const title3 = document.createElement('h4');
  title3.id = 'newAccountTitle2';
  title3.innerHTML = 'Ya tienes una? <a href="/login">Entra aqui</a>';

  // section caja de Crear Cuenta
  const sectionNewAccount = document.createElement('section');
  sectionNewAccount.id = 'sectionNewAccount';
  const formNewAccount = document.createElement('form');
  formNewAccount.id = 'formNewAccount';

  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.classList = 'inputsNewAccount';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.setAttribute('required', '');

  const inputPassword = document.createElement('input');
  inputPassword.id = 'Contraseña';
  inputPassword.classList = 'inputsNewAccount';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('required', '');

  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.id = 'confirmar';
  inputConfirmPassword.classList = 'inputsNewAccount';
  inputConfirmPassword.type = 'password';
  inputConfirmPassword.placeholder = 'Confirmar contraseña';
  inputConfirmPassword.setAttribute('required', '');

  // botón de entrar
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonLogin.innerText = 'Registrarse';
  buttonLogin.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
    } else {
      // agregar condicion para que haya una contraseña o muestre un alert en caso de que no exista
      alert('Cuenta creada exitosamente.');
      registrarUsuario(email, password).then(() => validarUsuario(auth));
      navigateTo('/login');
    }
  });

  divNewAccount.appendChild(sectionNewAccount);
  sectionNewAccount.append(title, title3, formNewAccount);
  formNewAccount.append(inputEmail, inputPassword, inputConfirmPassword, buttonLogin);
  return divNewAccount;
}
export default newAccount;

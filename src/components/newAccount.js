import { registrarUsuario } from '../lib/index';

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
  title3.textContent = '¿Ya tienes una? Entra aquí';

  // section caja de Crear Cuenta
  const sectionNewAccount = document.createElement('section');
  sectionNewAccount.id = 'sectionNewAccount';
  const formNewAccount = document.createElement('form');
  formNewAccount.id = 'formNewAccount';

  const pUser = document.createElement('p');
  pUser.classList = 'pNewAccount';
  pUser.innerText = 'USUARIO';
  const inputUser = document.createElement('input');
  inputUser.id = 'user';
  inputUser.type = 'text';
  inputUser.placeholder = 'Nombre de usuario';
  inputUser.setAttribute('required', '');

  const pEmail = document.createElement('p');
  pEmail.classList = 'pNewAccount';
  pEmail.innerText = 'CORREO ELECTRÓNICO';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.setAttribute('required', '');

  const pPassword = document.createElement('p');
  pPassword.classList = 'pNewAccount';
  pPassword.innerText = 'CONTRASEÑA';
  const inputPassword = document.createElement('input');
  inputPassword.id = 'Contraseña';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.setAttribute('required', '');

  const inputConfirmPassword = document.createElement('input');
  inputConfirmPassword.id = 'confirmar';
  inputConfirmPassword.type = 'password';
  inputConfirmPassword.placeholder = 'Confirmar contraseña';
  inputConfirmPassword.setAttribute('required', '');

  // botón de entrar
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonLogin.innerText = 'Registrarse';
  buttonLogin.addEventListener('click', () => {
    // const newUser = inputUser.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
    } else {
      // agregar condicion para que haya una contraseña o muestre un alert en caso de que no exista
      alert('Cuenta creada exitosamente.');
      registrarUsuario(email, password);
      navigateTo('/login');
    }
  });

  divNewAccount.append(title, title3, sectionNewAccount);
  sectionNewAccount.append(formNewAccount);
  formNewAccount.append(inputUser, inputEmail, inputPassword, inputConfirmPassword, buttonLogin);
  return divNewAccount;
}
export default newAccount;

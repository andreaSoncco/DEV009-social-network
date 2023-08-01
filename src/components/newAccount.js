import { registrarUsuario } from "../lib/initializeFirebase.js";
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

  const pUser = document.createElement('p');
  pUser.classList = 'pNewAccount';
  pUser.innerText = 'USUARIO';
  const inputUser = document.createElement('input');
  inputUser.id = 'user';
  inputUser.placeholder = 'Nombre de usuario';

  const pEmail = document.createElement('p');
  pEmail.classList = 'pNewAccount';
  pEmail.innerText = 'CORREO ELECTRÓNICO';
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.placeholder = 'Correo electrónico';

  const pPassword = document.createElement('p');
  pPassword.classList = 'pNewAccount';
  pPassword.innerText = 'CONTRASEÑA';
  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Contraseña';

  // botón de entrar
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonLogin.innerText = 'Registrarse';
  buttonLogin.addEventListener('click', () => {
    const email = 'usuario@gmail.com';
    const password = '12345678';
    registrarUsuario(email, password);

    //navigateTo('/login');
  });

  divNewAccount.append(title, title3, sectionNewAccount);
  sectionNewAccount.append(pUser, inputUser, pEmail, inputEmail, pPassword, inputPassword, buttonLogin);

  return divNewAccount;
}
export default newAccount;

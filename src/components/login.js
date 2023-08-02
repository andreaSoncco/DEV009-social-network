import { GoogleAuthProvider } from "firebase/auth";
import {registerGoogle} from "../lib/initializeFirebase.js";
function login(navigateTo) {
  const logIn = document.createElement('main');
  logIn.classList.add('login');
  const formLogin = document.createElement('form');
  formLogin.classList.add('formLogin');
  const logintitle = document.createElement('h2');
  logintitle.innerHTML = 'Inicia Sesión';
  const img = document.createElement('img');
  img.setAttribute('id', 'logoLogin');
  img.setAttribute('src', 'img/Logo.png');

  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id', 'email');
  inputEmail.setAttribute('placeholder', 'Email');
  inputEmail.setAttribute('size', '25');
  inputEmail.setAttribute('maxlength', '40');
  inputEmail.setAttribute('required', '');

  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id', 'password');
  inputPassword.setAttribute('placeholder', 'Password');
  inputPassword.setAttribute('minlength', '6');
  inputPassword.setAttribute('maxlength', '12');
  inputPassword.setAttribute('required', '');

  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('type', 'submit');
  buttonLogin.textContent = 'Login';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/wall');
  });
  const btnCreateAccount = document.createElement('button');
  btnCreateAccount.textContent = 'Crear Cuenta';
  btnCreateAccount.addEventListener('click', () => {
    
    navigateTo('/newAccount');
  });

  const btnGoogle = document.createElement('img');
  btnGoogle.setAttribute('id', 'btnGoogle');
  btnGoogle.setAttribute('src', 'img/google.png');
  btnGoogle.addEventListener('click', () => {
    registerGoogle = (callback, GoogleAuthProvider)
  });
  const forgPassw = document.createElement('p');
  forgPassw.innerHTML = '<a href="/forgotPassword">¿Olvidaste la contraseña?</a>';

  const createAccount = document.createElement('p');
  createAccount.innerHTML = '¿No tienes cuenta?';

 

  logIn.appendChild(formLogin);
  formLogin.append(img, logintitle, inputEmail, inputPassword, buttonLogin, forgPassw, createAccount, btnCreateAccount, btnGoogle);
  return logIn;
}
export default login;

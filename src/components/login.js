
import { toggleSignIn, loginEmailPassword } from "../lib/index";

function login(navigateTo) {
  const logIn = document.createElement('div');
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
  inputPassword.setAttribute('autocomplete', 'off');

  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('type', 'submit');
  buttonLogin.id = 'btnlogin';
  buttonLogin.textContent = 'Login';
  //-----------------------Evento de login------------------------------------
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const alertaLogin = (valid) => {
      if (valid) {
        navigateTo('/wall');
      } else {
      }
    };
    loginEmailPassword(email, password, alertaLogin);
  });
  const btnCreateAccount = document.createElement('button');
  btnCreateAccount.textContent = 'Crear Cuenta';
  btnCreateAccount.id = 'crear';
  //---------------------------Evento ir a crear cuenta---------------------------------
  btnCreateAccount.addEventListener('click', () => {
    navigateTo('/newAccount');
    
  });

  const btnGoogle = document.createElement('button');
  btnGoogle.id = 'btnGoogle';
  const divContentButtonGoogle = document.createElement('div');
  divContentButtonGoogle.textContent = 'Entrar con Google';
  const logoGoogle = document.createElement('img');
  logoGoogle.src = 'img/google.png';
  logoGoogle.id = 'logoGoogle';
  //-------------------------------------Evento iniciar sesion con google----------------------------------
  btnGoogle.addEventListener('click', (event) => {
    event.preventDefault()
    toggleSignIn();
  });

  const forgPassw = document.createElement('p');
  forgPassw.id = 'forgPassLink';
  forgPassw.innerHTML = '<a href="/forgotPassword">¿Olvidaste la contraseña?</a>';

  const createAccount = document.createElement('p');
  createAccount.id = 'ntcuenta';
  createAccount.innerHTML = '¿No tienes cuenta?';

  

  logIn.appendChild(formLogin);
  btnGoogle.append(logoGoogle, divContentButtonGoogle);
  formLogin.append(img, logintitle, inputEmail, inputPassword, buttonLogin, forgPassw, createAccount, btnCreateAccount, btnGoogle);
  return logIn;

  
}
export default login;

function login(navigateTo) {
  const Login = document.createElement('main');
  Login.classList.add('login');
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

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Back Home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
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
    navigateTo('/google');
  });

  const forgPassw = document.createElement('p');
  forgPassw.innerHTML = '<a href="/forgotPassword">¿Olvidaste la contraseña?</a>';

  const createAccount = document.createElement('p');
  createAccount.innerHTML = '¿No tienes cuenta?';

  const option = document.createElement('p');
  option.innerHTML = 'o';

  Login.appendChild(formLogin);
  formLogin.append(img, logintitle, inputEmail, inputPassword, buttonLogin, forgPassw, createAccount, btnCreateAccount, option, btnGoogle, buttonHome);
  return Login;
}
export default login;

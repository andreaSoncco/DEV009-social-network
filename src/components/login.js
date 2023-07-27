function login(navigateTo) {
  const section = document.createElement('section');
  section.id = 'login';
  const title = document.createElement('h2');
  title.textContent = 'Login ';
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'return to home';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
  });
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.placeholder = 'email';
  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Password';
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Login';
  section.append(title, inputEmail, inputPassword, buttonLogin, buttonHome);

  return section;
}
export default login;

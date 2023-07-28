function login(navigateTo) {
  const section = document.createElement('section');
  section.id = 'login';
  const img = document.createElement('img');
  img.id = 'logoLogin';
  img.src = 'img/Logo.png';
  const title = document.createElement('h2');
  title.id = 'logintitle';
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
  const firstSection = document.createElement('section');
  firstSection.id = 'first';
  firstSection.appendChild(section);
  section.append(img, title, inputEmail, inputPassword, buttonLogin, buttonHome);
  
  return firstSection;
}
export default login;

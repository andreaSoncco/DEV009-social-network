function home(navigateTo) {
  const section = document.createElement('section');
  section.id = 'Home';
  const title = document.createElement('h2');
  title.textContent = 'Bienvenid@ a DIY Lovers ';
  const buttonLogin = document.createElement('button');
  buttonLogin.innerText = 'Login';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/login');
  });
  section.append(title, buttonLogin);
  return section;
}
export default home;

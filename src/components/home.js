function home(navigateTo) {
  const divHome = document.createElement('div');
  divHome.id = 'Home';
  //Logo
  const logo = document.createElement('img');
  logo.id = 'logoBienvenida';
  logo.src = 'img/Logo.png';
  // section caja de bienvenida
  const sectionBienvenida = document.createElement('section');
  sectionBienvenida.id = 'sectionBienvenida';
  const title = document.createElement('h1');
  title.id = 'titleBienvenida';
  title.innerText = 'Emplea el arte para expresar tus sentimientos y forma parte de la mejor comunidad de artistas';
  // botón de entrar
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonLogin.innerText = 'Entrar';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/login');
  });
  divHome.append(logo, sectionBienvenida);
  sectionBienvenida.append(title, buttonLogin);
  return divHome;
}
export default home;

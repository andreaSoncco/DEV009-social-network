function home(navigateTo) {
  const divHome = document.createElement('div');
  // Cambio de nombre homePage a Page
  divHome.classList = 'page';

  // Seccion para la caja de bienvenida
  const bienvenida = document.createElement('section');
  bienvenida.id = 'bienvenida';
  // Logo
  const logo = document.createElement('img');
  logo.id = 'logoBienvenida';
  logo.src = 'img/logo.png';
  // section caja de bienvenida
  const sectionBienvenida = document.createElement('section');
  sectionBienvenida.id = 'sectionBienvenida';
  const title = document.createElement('h1');
  title.id = 'titleBienvenida';
  title.innerText = '¡Exprésate!';
  // Texto de bienvenida
  const textoBienvenida = document.createElement('p');
  textoBienvenida.id = 'textoBienvenida';
  textoBienvenida.innerText = 'Descubre una comunidad de artistas amateur y emplea el arte para compartir tus sentimientos';

  // botón de entrar
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonLogin.innerText = 'Empecemos';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/login');
  });
  divHome.append(bienvenida);
  bienvenida.append(logo, sectionBienvenida);
  sectionBienvenida.append(title, textoBienvenida, buttonLogin);
  return divHome;
}
export default home;

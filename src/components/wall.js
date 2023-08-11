function wall(navigateTo) {
  const divWall = document.createElement('body');
  divWall.id = 'wall';

  // section General
  const section = document.createElement('section');
  section.id = 'sectionWall'; 

  const header = document.createElement('header');
  header.id = 'headerWall'; 
  
  const logoWall = document.createElement('img');
  logoWall.id = 'logoWall';
  logoWall.src = 'img/logo.png';

  const toggleWall = document.createElement('i');
  toggleWall.id = "toggleWall";
  toggleWall.classList = "fa-solid fa-bars";

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver atrás';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
  });
  
  header.append(logoWall, toggleWall);
  divWall.append(section);
  section.append(header, buttonHome);

  return divWall;
}
export default wall;

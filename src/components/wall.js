function wall(navigateTo) {
  const divWall = document.createElement('body');
  divWall.id = 'wall';

  // section General
  const section = document.createElement('section');
  section.id = 'sectionWall'; 
  const header = document.createElement('header');
  header.id = 'headerWall'; 
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver atrás';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
  });
  
  divWall.append(section);
  section.append(header, buttonHome);

  return divWall;
}
export default wall;

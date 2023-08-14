function wall(navigateTo) {
  const divWall = document.createElement('div');
  divWall.id = 'timeLine';

  // section banner
  const sectionBanner = document.createElement('section');
  sectionBanner.id = 'banner'; 
  const header = document.createElement('img');
  header.id = 'logoWall';
  header.src = 'img/logo.png';
  const user = document.createElement('select');
  
  //section wall updates
  const sectionTimeLine = document.createElement('section');
  sectionTimeLine.id = 'sectionTimeLine';
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver atrás';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
  });
  
  divWall.append(sectionBanner, sectionTimeLine);
  sectionBanner.append(header)
  sectionTimeLine.append( buttonHome);

  return divWall;
}
export default wall;

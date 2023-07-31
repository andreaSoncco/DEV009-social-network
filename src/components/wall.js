function wall(navigateTo) {
    const divWall = document.createElement('div');
    divWall.id = 'wall';

    // section General
    const section = document.createElement('section');
    section.id = 'sectionWall';
    const buttonHome = document.createElement('button');
    buttonHome.textContent = 'Volver atrás';
    buttonHome.addEventListener('click', () => {
    navigateTo('/');
    });
    
    divWall.append(section);
    section.append(buttonHome);
      
    return divWall;
  }
  export default wall;
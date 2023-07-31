function error(navigateTo) {
  const errorPage = document.createElement('div');
  errorPage.id = 'errorPage';
  const title = document.createElement('img');
  title.id = 'error404';
  title.src = 'img/error404.gif';
  const goBack = document.createElement('button');
  goBack.id = 'botonRegresar';
  goBack.innerText = 'Regresar al inicio';
  goBack.addEventListener('click', () => {
    navigateTo('/');
  });

  errorPage.append(goBack, title);
  return errorPage;
}
export default error;

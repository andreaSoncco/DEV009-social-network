// eslint-disable-next-line
import img_error from '../img/error404.gif';

function error(navigateTo) {
  const errorPage = document.createElement('div');
  errorPage.id = 'errorPage';
  const title = document.createElement('img');
  title.id = 'error404';
  // eslint-disable-next-line
  title.src = img_error;
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

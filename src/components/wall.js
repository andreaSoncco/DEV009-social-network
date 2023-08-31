/* eslint-disable */
import { logOut, createPost, addLike, dismissLikesbyUid, getPostsOrderByDateTime, editPost, deletePost, getDataPostByIdPost } from '../lib/index';
import { auth } from '../firebase/initializeFirebase';
import img_logo from '../img/logo.png';
import img_enviar from '../img/enviar.png';
import img_user from '../img/user.png';
import img_edit from '../img/edit.png';
import img_delete from '../img/delete.png';
import img_githubLogo from '../img/githubLogo.png';

function wall(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.id = 'timeLine';

  const header = document.createElement('header');
  header.id = 'headerWall';
  header.title = 'Bienvenido a nuestra red social.'

  const logoWall = document.createElement('img');
  logoWall.id = 'logoWall';
  logoWall.src = img_logo;
  logoWall.title = 'Logo art-lovers';
  /* -------------------------------menu desplegable------------------------------- */
  const logOutButton = document.createElement('button');
  logOutButton.id = 'logOut';
  logOutButton.title = 'Cerrar sesion';
  logOutButton.addEventListener('click', () => {
    logOut(auth);
    navigateTo('/login');
  });
  /*-----------------------------------Sección contenedor de cuerpo----------------------- */
  const divContainerWall = document.createElement('main');
  divContainerWall.id = 'containerWall'
  /*-----------------------------------Input caja de texto para publicacion----------------------- */
  const divNewPost = document.createElement('section');
  divNewPost.id = 'newPostArea';
  const divNewPostTop = document.createElement('div');
  divNewPostTop.id = 'newPostAreaTop';
  const inputNewPost = document.createElement('input');
  inputNewPost.id = 'newPost';
  inputNewPost.type = 'text';
  inputNewPost.placeholder = '¿Qué te inspiró hoy?';
  inputNewPost.title = 'Escribe aqui lo que quieras compartir';
  const buttonPublishNewPost = document.createElement('button');
  buttonPublishNewPost.id = 'buttonPublish';
  buttonPublishNewPost.title = 'Publicar Post';
  const imgSend = document.createElement('img');
  imgSend.classList = 'sendIcon';
  imgSend.src = img_enviar;
  buttonPublishNewPost.appendChild(imgSend);
  // con esta instrucción, publica y de inmediato se muestra en el muro la publicación
  buttonPublishNewPost.addEventListener('click', async () => {
    // crea un nuevo post
    createPost(inputNewPost.value);
    // muestra todos los posts
    inputNewPost.value = '';
    loadAllPostStart();
  });

  divNewPostTop.append(inputNewPost, buttonPublishNewPost);
  divNewPost.append(divNewPostTop);
  /* --------------------------Estructura y eventos de cierre de la ventana modal ------------- */
const modalContainer = document.createElement('section');
modalContainer.classList.add('modalWindow');
const modalContent = document.createElement('div');
modalContent.classList.add('modalContent');
const inputModal = document.createElement('input');
inputModal.id = 'inputModal';
inputModal.type = 'text';
inputModal.placeHolder = 'aqui va el contenido actual del post';
const submitUpdatedPost = document.createElement('button');
submitUpdatedPost.id = 'buttonUpdatedPost';
submitUpdatedPost.innerText = 'Guardar';
// boton de descartar cambio que podria cerrar la ventana modal
const discardChanges = document.createElement('button');
discardChanges.id = 'buttonDiscardChange';
discardChanges.innerText = 'Descartar';
discardChanges.addEventListener('click', function() {
  modalContainer.style.display = 'none';
});
// Juntar los elementos en la ventana modal
modalContent.append(inputModal, submitUpdatedPost, discardChanges);
modalContainer.appendChild(modalContent);
  /* -----------------------------------Cajas para despligue de publicaciones------------------- */
  const divAllPosts = document.createElement('div');
  divAllPosts.id = 'allPosts';
  const divPost = document.createElement('div');
  divPost.id = 'divPost';
  divAllPosts.appendChild(divPost);

  const postList = (list) => {
    divAllPosts.innerHTML = '';
    list.forEach(doc => {
      const content = document.createElement('div');
      content.classList.add('postContent');
      let likeCount = 0;
      let userLikePost = 0;

      if (doc.data().likeCount !== 0) {
        if (doc.data().likeCount.includes(auth.currentUser.uid)) {
          userLikePost = 1;
        }
        likeCount = doc.data().likeCount.length;
      }

      content.innerHTML = `  
      <div class="postHeader" id = ${doc.id}>
        <img title="logo de usuario" src=${img_user} id="iconoLogo" alt="user-img" class="user-img">
        <h3 title="La persona que hizo este post es ${doc.data().userEmail}" class="userEmail">${doc.data().userEmail}</h3>
        </div>
        <div class="postHeaderUserInfo">
        <p class="postContent">${doc.data().post}</p>
      </div>
      <div title="Área donde puedes interactuar con el post" class="iconBar">

        <div class="edit" title="Edita sólo si tu creaste el post">
          <img class="editIcon" src=${img_edit} width="20px height="20px">
        </div>
        <div class="delete" title="Borra sólo si tu creaste el post">
        <img class="deleteIcon" src=${img_delete} width="20px height="20px">
        </div>
        <div class="likes" title="Dale like">
          <svg  class="likeIcon" width="20" height="20" viewBox="0 0 24 24" fill="${userLikePost > 0 ? "red" : "none"}"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="likeIcon"  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <div class="likes-count">
          ${likeCount}
          </div>
        </div>

      </div>

      </div>`;

      // Evento de like
      content.addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('likeIcon')) {
          if ((doc.data().likeCount === 0) || (!doc.data().likeCount.includes(auth.currentUser.uid))) {
            addLike(doc.id).then(() => loadAllPostStart());
          }
          else {
            const likeActualizados = doc.data().likeCount.filter(like => like !== auth.currentUser.uid);
            dismissLikesbyUid(doc.id, likeActualizados).then(() => loadAllPostStart());
          }
        }

      });
      // ---------Editar post------------
      content.addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('editIcon')) {
          if ((doc.data().uidUser.includes(auth.currentUser.uid))) {
            let textPost = await getDataPostByIdPost(doc.id);
            inputModal.value = textPost;
            modalContainer.style.display = 'block';
            submitUpdatedPost.addEventListener('click', async (e) => {
              e.preventDefault();
                  editPost(doc.id, inputModal.value).then(() => loadAllPostStart());
                  modalContainer.style.display = 'none';
                
            });
          }
          else {
            console.log('No puedes editar este post');
          }
        }
      });
      // ---------------------Borrar post-----------------
      content.addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('deleteIcon')) {
          if ((doc.data().uidUser.includes(auth.currentUser.uid))) {
            deletePost(doc.id).then(() => loadAllPostStart());
          }
          else {
            console.log('no entro a la condicion');
          }
        }
      });
      divAllPosts.appendChild(content);
    });
  };

  // código que carga todos los posts al inicio, se están reultizando métodos
  const loadAllPostStart = async () => {
    const allPosts = await getPostsOrderByDateTime();
    postList(allPosts);
  };
  // esta función hace que se carguen todos los posts al inicio
  loadAllPostStart();
// ------------------Estructura del footer------------------  
const footer = document.createElement('footer');
footer.id = 'footerWall';
const teamSection = document.createElement('section');
teamSection.id = 'teamSection';
teamSection.title = 'Quienes hicieron esto para ti'
const ulMembers = document.createElement('ul');
ulMembers.class = 'teamArtLovers';
const footerTitle = document.createElement('h5');
footerTitle.innerText = 'Equipo desarrollador: '
const li1 = document.createElement('li');
li1.classList = 'teamMembers';
li1.innerText = 'Andrea Daleska Soncco Cisneros';
li1.title = 'Andrea Daleska Soncco Cisneros';
const li2 = document.createElement('li');
li2.classList = 'teamMembers';
li2.innerText = 'Laura Tatiana Joya Rozo';
li2.title = 'Laura Tatiana Joya Rozo';
const li3 = document.createElement('li');
li3.classList = 'teamMembers';
li3.innerText = 'Astrid Andrea Bolaños García';
li3.title = 'Astrid Andrea Bolaños García';
const contactSection = document.createElement('section');
contactSection.id = 'contact';
contactSection.title = 'Info de contacto';
const contactTitle = document.createElement('h5');
contactTitle.id = 'contactTitle';
contactTitle.innerText = 'Encuentranos en:';
const githubProyect = document.createElement('img');
githubProyect.id = 'githubLogo';
githubProyect.src = img_githubLogo;
githubProyect.title = 'Enlace que te lleva al archivo de nuestro proyecto';
const enlaceGithub = document.createElement('a');
enlaceGithub.href = 'https://github.com/andreaSoncco/DEV009-social-network';
  /* ---------------------Se adjuntan los elementos en sus secciones------- */
  teamSection.append(footerTitle, ulMembers);
  ulMembers.append(li1, li2, li3);
  enlaceGithub.appendChild(githubProyect);
  contactSection.append(contactTitle, enlaceGithub)
  footer.append(teamSection, contactSection);
  sectionWall.append(header, divContainerWall, modalContainer, footer);
  divContainerWall.append(divNewPost, divAllPosts);
  header.append(logoWall, logOutButton);
  return sectionWall;
}
export default wall;

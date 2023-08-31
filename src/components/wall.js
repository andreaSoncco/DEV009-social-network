/* eslint-disable */
import { logOut, createPost, addLike, dismissLikesbyUid, getPostsOrderByDateTime, editPost, deletePost, getDataPostByIdPost } from '../lib/index';
import { auth } from '../firebase/initializeFirebase';
import img_logo from '../img/logo.png';
import img_enviar from '../img/enviar.png';
import img_user from '../img/user.png';
import img_edit from '../img/edit.png';
import img_delete from '../img/delete.png';

function wall(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.id = 'timeLine';

  const header = document.createElement('header');
  header.id = 'headerWall';

  const logoWall = document.createElement('img');
  logoWall.id = 'logoWall';
  logoWall.src = img_logo;
  /* -------------------------------menu desplegable------------------------------- */
  const logOutButton = document.createElement('button');
  logOutButton.id = 'logOut';
  logOutButton.title = 'Cerrar sesion';
  logOutButton.addEventListener('click', () => {
    logOut(auth);
    navigateTo('/login');
  });
  /*-----------------------------------Sección contenedor de cuerpo----------------------- */
  const divContainerWall = document.createElement('section');
  divContainerWall.id = 'containerWall'
  /*-----------------------------------Input caja de texto para publicacion----------------------- */
  const divNewPost = document.createElement('div');
  divNewPost.id = 'newPostArea';
  const divNewPostTop = document.createElement('div');
  divNewPostTop.id = 'newPostAreaTop';
  const inputNewPost = document.createElement('input');
  inputNewPost.id = 'newPost';
  inputNewPost.type = 'text';
  inputNewPost.placeholder = '¿Qué te inspiró hoy?';
  const buttonPublishNewPost = document.createElement('button');
  buttonPublishNewPost.id = 'buttonPublish';
  buttonPublishNewPost.innerText = 'Publicar';
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
    console.log('dibujando');
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
        <img src=${img_user} id="iconoLogo" alt="user-img" class="user-img">
        <div class="postHeaderUserInfo">
        <p class="userEmail">${doc.data().userEmail}</p>
        <p class="postContent">${doc.data().post}</p>
        </div>
      </div>
      <div class="iconBar">

        <div class="edit" title="Editar">
          <img src=${img_edit} width="20px height="20px">
        </div>

        <div class="trash" title="Borrar">
        <img src=${img_delete} width="20px height="20px">
        </div>

        <div class="likes" title="Likes">
          <svg  class="likeIcon" width="20" height="20" viewBox="0 0 24 24" fill="${userLikePost > 0 ? "red" : "none"}"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="likeIcon"  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <div class="likes-count">
          ${likeCount}
          </div>
        </div>

      </div>

      </div>`;

      // Evento de like
      content.addEventListener('click', async (e) => {
        console.log(doc.data().likeCount);
        console.log(auth.currentUser.uid);
        e.preventDefault();
        if (e.target.classList.contains('likeIcon')) {
          if ((doc.data().likeCount === 0) || (!doc.data().likeCount.includes(auth.currentUser.uid))) {
            console.log(doc.data().uidUser);
            addLike(doc.id).then(() => loadAllPostStart());
          }
          else {
            const likeActualizados = doc.data().likeCount.filter(like => like !== auth.currentUser.uid);
            console.log(likeActualizados);
            dismissLikesbyUid(doc.id, likeActualizados).then(() => loadAllPostStart());
          }
        }

      });
      // ---------Editar post------------
      content.addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('editIcon')) {
          if ((doc.data().uidUser.includes(auth.currentUser.uid))) {
            console.log(doc.data().uidUser);
            console.log('el userUid del documento coincide con el usuario logeado');
            let textPost = await getDataPostByIdPost(doc.id);
            //console.log(textPost);
            inputModal.value = textPost;
            modalContainer.style.display = 'block';
            
            submitUpdatedPost.addEventListener('click', async (e) => {
              e.preventDefault();
                  console.log(doc.data().uidUser);
                  editPost(doc.id, inputModal.value).then(() => loadAllPostStart());
                  modalContainer.style.display = 'none';
                
            });
          }
          else {
            console.log('no entro a la condicion');
          }
        }
      });
      // ---------------------Borrar post-----------------
      content.addEventListener('click', async (e) => {
        e.preventDefault();
        if (e.target.classList.contains('deleteIcon')) {
          if ((doc.data().uidUser.includes(auth.currentUser.uid))) {
            console.log(doc.data().uidUser);
            console.log('el userUid del documento coincide con el usuario logeado');
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
    // const postJSON = await getAllPosts();
    const allPosts = await getPostsOrderByDateTime();
    // const allPosts = await getAllPosts();
    // console.log(allPosts);
    postList(allPosts);
    // console.log(postJSON);
  };
  // esta función hace que se carguen todos los posts al inicio
  loadAllPostStart();
  
  /* ---------------------Se adjuntan los elementos en sus secciones------- */
  sectionWall.append(header, divContainerWall, modalContainer);
  divContainerWall.append(divNewPost, divAllPosts);
  header.append(logoWall, logOutButton);
  return sectionWall;
}
export default wall;

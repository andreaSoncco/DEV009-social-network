/* eslint-disable */
import { logOut, createPost, addLike, dismissLikesbyUid, getPostsOrderByDateTime } from '../lib/index';
import { auth } from '../firebase/initializeFirebase';

function wall(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.id = 'timeLine';

  const header = document.createElement('header');
  header.id = 'headerWall';

  const logoWall = document.createElement('img');
  logoWall.id = 'logoWall';
  logoWall.src = 'img/logo.png';
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
  imgSend.src = 'img/enviar.png';
  buttonPublishNewPost.appendChild(imgSend);
  // con esta instrucción, publica y de inmediato se muestra en el muro la publicación
  buttonPublishNewPost.addEventListener('click', async () => {
    // crea un nuevo post
    createPost(inputNewPost.value);
    // muestra todos los posts

    loadAllPostStart();
  });

  divNewPostTop.append(inputNewPost, buttonPublishNewPost);
  divNewPost.append(divNewPostTop);
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
        <img src="./img/user.png" id="iconoLogo" alt="user-img" class="user-img">
        <div class="postHeaderUserInfo">
        ${doc.data().userDisplayName} <span>${doc.data().userEmail}</span>
        <p>${doc.data().post}</p>
        </div>
      </div>
      <div class="iconBar">

        <div class="edit" title="Editar">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/></svg>
        </div>

        <div class="delete" title="Borrar">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"/></svg>
        </div>

        <div class="likes" title="Likes">
          <svg  class="likeIcon" width="20" height="20" viewBox="0 0 24 24" fill="${userLikePost > 0 ? "red" : "none"}"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="likeIcon"  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <div class="likes-count">
          ${likeCount}
          </div>
        </div>

      </div>

      </div>`;
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
        //loadAllPostStart();
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

  sectionWall.append(header, divContainerWall);
  divContainerWall.append(divNewPost, divAllPosts);
  header.append(logoWall, logOutButton);
  return sectionWall;
}
export default wall;

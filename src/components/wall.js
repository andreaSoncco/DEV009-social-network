import { createPost, getPostsByUser, auth, getAllPosts } from "../lib/initializeFirebase.js";


function wall(navigateTo) {
  const sectionWall = document.createElement('section');
  sectionWall.id = 'timeLine';

  
  /* section banner
  const sectionBanner = document.createElement('section');
  sectionBanner.id = 'banner'; 
  const header = document.createElement('img');
  header.id = 'logoWall';
  header.src = 'img/logo.png';
  const user = document.createElement('select');
  
  //section wall updates
  const sectionTimeLine = document.createElement('section');
  sectionTimeLine.id = 'sectionTimeLine';*/
  // section General
  const sectionBotonesDePrueba = document.createElement('section');
  sectionBotonesDePrueba.id = 'sectionWall'; 

  const imagenTemporal = document.createElement('img');
  imagenTemporal.id = 'underConstruction';
  imagenTemporal.src = 'img/enConstruccion.png';
  
  const header = document.createElement('header');
  header.id = 'headerWall'; 
  
  const logoWall = document.createElement('img');
  logoWall.id = 'logoWall';
  logoWall.src = 'img/logo.png';
/*-------------------------------menu desplegable------------------------------- */
  const menuSelect = document.createElement('select');
  menuSelect.id = "menuSelect";
  menuSelect.classList.add("selectRoute");
  const optionSelectAnOption = document.createElement('option');
  optionSelectAnOption.id = "value1";
  optionSelectAnOption.innerText = "Selecciona una opcion";
  const optionWall = document.createElement('option');
  optionWall.id = "value2";
  optionWall.innerText = "Inicio";
  const optionTimeLine = document.createElement('option');
  optionTimeLine.id = "value3";
  optionTimeLine.innerText = "Perfil";
  const optionLogOut = document.createElement('option');
  optionLogOut.id = "value4";
  optionLogOut.innerText = "Cerrar sesion";
  menuSelect.append(optionSelectAnOption, optionWall, optionTimeLine, optionLogOut);
/*-----------------------------------Input caja de texto para publicacion----------------------- */
const divNewPost = document.createElement('div');
divNewPost.id = "newPostArea";
const inputNewPost = document.createElement('input');
inputNewPost.type = "text";
inputNewPost.placeholder = "¿Qué te inspiró hoy?";
const buttonPublishNewPost = document.createElement('button');
buttonPublishNewPost.id = 'buttonPublish';
buttonPublishNewPost.innerText = 'Publicar';
buttonPublishNewPost.addEventListener('click', () =>{

})
divNewPost.append(inputNewPost, buttonPublishNewPost);

/*-----------------------------------------Cajas para despligue de publicaciones------------------------ */
const divAllPosts = document.createElement('div');
divAllPosts.id = "allPosts";
const divPost = document.createElement('div');
divPost.id = "divPost";
divPost.innerHTML = `
<div id="userPost"><p>aqui va el usuario</p></div>
<div id="textPost"><p>aqui va el texto de la publicacion</p></div>
<div id="postInteractions">
<button id="postComments>Comentarios</button>
<button id="readComments>Leer comentarios</button>
<button id="postLikes">Likes<button>
</div>
`
divAllPosts.appendChild(divPost);

/*-----------------------------------BOTONES------------------------------------ */
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver atrás';
  buttonHome.addEventListener('click', () => {
    navigateTo('/');
  });

  const addPostOnFireBase = document.createElement('button');
  addPostOnFireBase.textContent = 'Agregar documento en firebase';
  addPostOnFireBase.addEventListener('click', () => {
    createPost(inputNewPost.value);
   
  });

  const getPostFromFireBase = document.createElement('button');
  getPostFromFireBase.textContent = 'Obtener Documentos en firebase por usuario';
  getPostFromFireBase.addEventListener('click', () => {
    //console.log(auth);
    //getPostsByUser();
    getAllPosts();
   
  });
  
 /* divWall.append(sectionBanner, sectionTimeLine);
  sectionBanner.append(header)
  sectionTimeLine.append( buttonHome);*/
  sectionWall.append(header, divNewPost, sectionBotonesDePrueba, divAllPosts);
  header.append(logoWall, menuSelect);
  sectionBotonesDePrueba.append(buttonHome, addPostOnFireBase, getPostFromFireBase, imagenTemporal);
  
  

  return sectionWall;
}
export default wall;

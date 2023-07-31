function forgotPassword(navigateTo) {
  const forgotPassPage = document.createElement('div');
  forgotPassPage.id = 'forgotPage';
  const formDiv = document.createElement('div');
  formDiv.id = 'formPass';
  const titlePass = document.createElement('h1');
  titlePass.id = 'tituloPass';
  titlePass.textContent = 'Olvidé la contraseña';
  const textPass = document.createElement('p');
  textPass.id = 'textoPass';
  textPass.textContent = 'Ingresa tu email y te enviaremos un link para reestablecer tu contraseña.';
  const inputMail = document.createElement('input');
  inputMail.type = 'text';
  inputMail.placeholder = 'email';
  const buttonMail = document.createElement('button');
  buttonMail.id = 'botonMail';
  buttonMail.textContent = 'Enviar link';
  formDiv.append(titlePass, textPass, inputMail, buttonMail);
  forgotPassPage.appendChild(formDiv);
  return forgotPassPage;
}
export default forgotPassword;

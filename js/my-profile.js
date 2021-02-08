let userData = {
  username: localStorage.getItem('username')
};


function checkForData() {
  if (localStorage.getItem("userData")) {
    userData = JSON.parse(localStorage.getItem("userData"));

    document.getElementById("username-name").innerHTML = userData.name;
    document.getElementById("username-surname").innerHTML = userData.surname;
    document.getElementById("username-age").innerHTML = userData.age;
    document.getElementById("username-email").innerHTML = userData.email;
    document.getElementById("username-phoneNumber").innerHTML = userData.contactNumber;
  };
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("profile-userName").innerHTML = userData.username;

  checkForData();

  document.getElementById("changeDataButton").addEventListener("click", function () {

    document.getElementById("changeDataButton").style.display = "none";

    let info = `
      <div class="user-data-container container">
      <form>
        <div class="row">
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="username">Nombre de Usuario: </label>
            <input class="input-styling" type="text" id="username" name="username" value="${localStorage.getItem('username')}">
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="name">Nombre: </label>
            <input class="input-styling" type="text" id="name" name="name">
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="surname">Apellido: </label>
            <input class="input-styling" type="text" id="surname" name="surname">
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="age">Edad: </label>
            <input class="input-styling" type="number" id="age" name="age">
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="email">Email: </label>
            <input class="input-styling" type="email" id="email" name="email">
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <label for="contactNumber">Teléfono de contacto: </label>
            <input class="input-styling" type="number" id="contactNumber" name="contactNumber">
          </div>
          <div class="col-sm-12 d-flex justify-content-center">
            <button id="guardarCambios" class="color-scheme-buttons" type="submit">Guardar Cambios</button>
          </div>
        </div>
        </form>
      </div>
    `
    document.getElementById("profileContainer").innerHTML = info;

    document.getElementById("guardarCambios").addEventListener("click", function (e) {
      e.preventDefault();

      userData.username = document.getElementById('username').value;
      localStorage.setItem("username", userData.username);

      userData.name = document.getElementById('name').value;

      userData.surname = document.getElementById('surname').value;

      userData.age = document.getElementById('age').value;

      userData.email = document.getElementById('email').value;

      userData.contactNumber = document.getElementById('contactNumber').value

      localStorage.setItem('userData', JSON.stringify(userData));

      location.reload();
    });
  });
});
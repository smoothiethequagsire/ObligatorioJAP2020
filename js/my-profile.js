//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function checkData() {
  if (localStorage.surname) {
    document.getElementById("profileContainer").innerHTML = `
            <div class="container">
            <div class="row">
            <div class="col-sm-12 justify-content-center">
            <h3 id="profile-userName">${localStorage.getItem("username")}
          <h3>
            </div>
            <div class="col-sm-12 justify-content-center">
              <p>Nombre: ${localStorage.getItem("name")}</p>
            </div>
            <div class="col-sm-12 justify-content-center">
              <p>Apellido: ${localStorage.getItem("surname")}</p>
            </div>
            <div class="col-sm-12 justify-content-center">
              <p>Edad: ${localStorage.getItem("age")}</p>
            </div>
            <div class="col-sm-12 justify-content-center">
              <p>Email: ${localStorage.getItem("email")}</p>
            </div>
            <div class="col-sm-12 justify-content-center">
              <p>Teléfono de contacto: ${localStorage.getItem("contactNumber")}</p>
            </div>
            </div>
            </div>
            <div class="d-flex justify-content-center container">
    <div class="row">
      <div class="container">
        <button id="changeDataButton" class="color-scheme-buttons">Actualizar mis datos</button>
      </div>
    </div>
  </div>`
  }else{
    document.getElementById("profileContainer").innerHTML = `<div class="container">
    <div class="row">
    <div class="col-sm-12 justify-content-center">
    <h3 id="profile-userName">${localStorage.getItem("username")}
  <h3>
    </div>
    <div class="row">
    <div class="container">
      <button id="changeDataButton" class="color-scheme-buttons">Actualizar mis datos</button>
    </div>
  </div>`
  };
};
checkData();

function inputData(key) {

  if (localStorage.getItem(key)) {
    return JSON.stringify(localStorage.getItem(key));
  } else {
    return "";
  };
}

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("profile-userName").innerHTML = localStorage.getItem("username");

  document.getElementById("changeDataButton").addEventListener("click", function () {
    document.getElementById("changeDataButton").style.display = "none";
    let info = ` <form>
        <div class="row">
        <div class="col-sm-12 justify-content-center">
          <label for="username">Nombre de Usuario: </label>
          <input type="text" id="username" name="username" value="${localStorage.getItem("username")}">
        </div>
        <div class="col-sm-12 justify-content-center">
          <label for="name">Nombre: </label>
          <input type="text" id="name" name="name" value="${inputData("name")}">
        </div>
        <div class="col-sm-12 justify-content-center">
          <label for="surname">Apellido: </label>
          <input type="text" id="surname" name="surname" value="${inputData("surname")}">
        </div>
        <div class="col-sm-12 justify-content-center">
          <label for="age">Edad: </label>
          <input type="number" id="age" name="age" value="${inputData("age")}">
        </div>
        <div class="col-sm-12 justify-content-center">
          <label for="email">Email: </label>
          <input type="email" id="email" name="email" value="${inputData("email")}">
        </div>
        <div class="col-sm-12 justify-content-center">
          <label for="contactNumber">Teléfono de contacto: </label>
          <input type="number" id="contactNumber" name="contactNumber" value="${inputData("contactNumber")}">
        </div>
        <div class="col-sm-12 justify-content-center">
            <button id="guardarCambios" class="color-scheme-buttons" type="submit">Guardar Cambios</button>
      </div>
      </form>`
    document.getElementById("profileContainer").innerHTML = info;

    document.getElementById("guardarCambios").addEventListener("click", function (e) {
      e.preventDefault();

      let inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        localStorage.setItem(inputs[i].id, JSON.stringify(inputs[i].value));
        console.log(localStorage.getItem(inputs[i].id))
      };

      checkData();
    })
  })
});
let userName = document.getElementById('username');

function redirectOnSubmit(evt){
    evt.preventDefault();
    sessionStorage.setItem('logged', 'true');
    localStorage.setItem('username', userName.value);
    window.location.href="index.html";
    return true;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("formLogin").addEventListener("submit", redirectOnSubmit);
});



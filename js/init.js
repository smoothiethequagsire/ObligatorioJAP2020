const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const FULL_CART_INFO = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

var username = localStorage.getItem('username');
var yourProfile = 'Tu perfil: '
const NAVBAR = document.querySelector('nav.site-header > div');

function cerrarSesion() {
  localStorage.clear(); 
  sessionStorage.setItem('logged', 'false'); 
  window.location.href="login.html";
}

// Función que crea los elementos HTML para agregar al Navbar
function createProfile(profile) {

  // Eliminamos el nodo de "Mi carrito"
  NAVBAR.removeChild(NAVBAR.lastElementChild);
 
  //Creamos los elements del dropdown
  let div = document.createElement('div');
  div.setAttribute("class", "dropdown");

  let a1 = document.createElement("a");
  a1.setAttribute("class", "dropdown-item");
  a1.setAttribute("href", "cart.html");
  a1.textContent = "Mi carrito";

  let a2 = document.createElement("a");
  a2.setAttribute("class", "dropdown-item");
  a2.setAttribute("href", "my-profile.html");
  a2.textContent = "Mi perfil";

  let aDivider= document.createElement("div");
  aDivider.setAttribute("class", "dropdown-divider");

  let a3 = document.createElement("button");
  a3.setAttribute("class", "dropdown-item");
  a3.setAttribute("id","cerrar-sesion")
  a3.setAttribute("onclick", "cerrarSesion()");
  a3.textContent = "Cerrar sesión";

  let div2 = document.createElement("div");
  div2.setAttribute("class", "dropdown-menu");
  div2.setAttribute("aria-labelledby", "dropdownMenuButton")

  let b = document.createElement('button')
  b.setAttribute("class", "btn btn-secondary dropdown-toggle")
  b.setAttribute("type", "button");
  b.setAttribute("id", "dropdownMenuButton");
  b.setAttribute("data-toggle", "dropdown");
  b.setAttribute("aria-haspopup", "true");
  b.setAttribute("aria-expanded", "false");

  let a = document.createElement('a');
  a.setAttribute("class", "py-2 d-none d-md-inline-block");
  a.setAttribute("href", "my-profile.html");
  a.textContent = profile;

  div2.appendChild(a1);
  div2.appendChild(a2);
  div2.appendChild(aDivider);
  div2.appendChild(a3);
  div.appendChild(b);
  div.appendChild(div2);
  b.appendChild(a);
  return div;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  if (!location.href.endsWith('login.html') && !(sessionStorage.getItem('logged') === 'true')) {
    window.location.href = "login.html";
  }

  if (!window.location.href.endsWith("login.html")) {
    NAVBAR.appendChild(createProfile(username));
  };
});


var userMin = document.getElementById("minPrice")
var userMax = document.getElementById("maxPrice")

// función que obtiene los productos y los añade al HTML
function showItAll() {
    getJSONData(PRODUCTS_URL).then(function (array) {
        var contentToAppend = "";
        for (let i = 0; i < array.data.length; i++) {
            let element = array.data[i];
            contentToAppend += `<div class='productInfo'><img src='` + element.imgSrc + `' class="product-img">
        <p class='product-name'>`+ element.name + `</p>
        <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
        <p class='product-description'>"` + element.description + `"</p>
        <p class='product-sold-count'>Vendidos: `+ element.soldCount + `</p>
        </div>`;
            document.getElementById('product-container').innerHTML = contentToAppend;
        };
    });
};

//definición de función que fintra según rango de precio
function priceRangeData(url) {
    getJSONData(url).then(function (array) {
        var filteredContentByPrice = ""
        for (let elem of array.data) {
            if (elem.cost >= userMin.value && elem.cost <= userMax.value) {
                filteredContentByPrice += `<div class='productInfo'><img src='` + elem.imgSrc + `' class="product-img">
                <p class='product-name'>`+ elem.name + `</p>
                <p class='product-cost'>`+ elem.cost + ` ` + elem.currency + `</p>
                <p class='product-description'>"` + elem.description + `"</p>
                <p class='product-sold-count'>Vendidos: `+ elem.soldCount + `</p>
                </div>`;
            };
        };
        if (filteredContentByPrice == "") {
            document.getElementById('product-container').innerHTML = `<p class="lead">No existen elementos que cumplan con el criterio seleccionado.</p>`
        } else {
            document.getElementById('product-container').innerHTML = `<p class="lead">Rango seleccionado:</p>
            <p class="lead">-Entre <strong>`+ userMin.value + `</strong> USD y <strong>` + userMax.value + `</strong> USD-</p>` + filteredContentByPrice
        };
    });
};

document.addEventListener("DOMContentLoaded", function (e) {
    showItAll(); //ejecutamos la función que obtiene los datos del json y los publica

    //Filtrado por rango de precio:
    document.getElementById("priceRange").addEventListener("submit", function (evt) {
        evt.preventDefault();
        priceRangeData(PRODUCTS_URL);
        return true;
    });

    //funcionalidad del botón "limpiar"
    document.getElementById("clearRangeFilter").addEventListener("click", showItAll);
});


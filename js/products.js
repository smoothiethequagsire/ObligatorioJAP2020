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

function compareAtoZ(a, b) {
    var name1 = a.name;
    var name2 = b.name;

    if (name1 > name2) {
        return 1;
    }
    if (name1 < name2) {
        return -1;
    }
    else {
        return 0;
    }
};

function compareZtoA(a, b) {
    var name1 = a.name;
    var name2 = b.name;

    if (name1 < name2) {
        return 1;
    }
    if (name1 > name2) {
        return -1;
    }
    else {
        return 0;
    }
};

function compareSoldCount (a, b){
    var sold1 = a.soldCount;
    var sold2 = b.soldCount;

    if (sold1 > sold2){
        return -1;
    }
    if (sold1 < sold2){
        return 1;
    }
    else{
        return 0;
    };
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

// función que ordena A-Z
function orderAtoZ() {
    fetch(PRODUCTS_URL).then(function (response) {
        return response.json();
    })
        .then(function (myJson){
        var orderedArray = myJson.sort(compareAtoZ);
        var contentToAppend = "";
        for (let i = 0; i < orderedArray.length; i++) {
            let element = orderedArray[i];
            contentToAppend += `<div class='productInfo'><img src='` + element.imgSrc + `' class="product-img">
        <p class='product-name'>`+ element.name + `</p>
        <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
        <p class='product-description'>"` + element.description + `"</p>
        <p class='product-sold-count'>Vendidos: `+ element.soldCount + `</p>
        </div>`;
            document.getElementById('product-container').innerHTML = contentToAppend;
        };
    });
}

// función que ordena Z-A
function orderZtoA() {
    fetch(PRODUCTS_URL).then(function (response) {
        return response.json();
    })
        .then(function (myJson){
        var orderedArray = myJson.sort(compareZtoA);
        var contentToAppend = "";
        for (let i = 0; i < orderedArray.length; i++) {
            let element = orderedArray[i];
            contentToAppend += `<div class='productInfo'><img src='` + element.imgSrc + `' class="product-img">
        <p class='product-name'>`+ element.name + `</p>
        <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
        <p class='product-description'>"` + element.description + `"</p>
        <p class='product-sold-count'>Vendidos: `+ element.soldCount + `</p>
        </div>`;
            document.getElementById('product-container').innerHTML = contentToAppend;
        };
    });
}

function orderByRelevance() {
    fetch(PRODUCTS_URL).then(function (response) {
        return response.json();
    })
        .then(function (myJson){
        var orderedArray = myJson.sort(compareSoldCount);
        var contentToAppend = "";
        for (let i = 0; i < orderedArray.length; i++) {
            let element = orderedArray[i];
            contentToAppend += `<div class='productInfo'><img src='` + element.imgSrc + `' class="product-img">
        <p class='product-name'>`+ element.name + `</p>
        <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
        <p class='product-description'>"` + element.description + `"</p>
        <p class='product-sold-count'>Vendidos: `+ element.soldCount + `</p>
        </div>`;
            document.getElementById('product-container').innerHTML = contentToAppend;
        };
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    showItAll(); //ejecutamos la función que obtiene los datos del json y los publica

    //Filtrado por rango de precio:
    document.getElementById("priceRange").addEventListener("submit", function (evt) {
        evt.preventDefault();
        priceRangeData(PRODUCTS_URL);
        return true;
    });

    // A to Z
    document.getElementById("sortAsc").addEventListener("click", orderAtoZ);

    // Z to A
    document.getElementById("sortDesc").addEventListener("click", orderZtoA);

    // orden por relevancia
    document.getElementById("sortByCount").addEventListener("click", orderByRelevance);

    //funcionalidad del botón "limpiar"
    document.getElementById("clearRangeFilter").addEventListener("click", orderAtoZ);
});

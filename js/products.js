const MINTOMAX = "minToMax";
const MAXTOMIN = "MaxToMin";
const BYSOLDCOUNT = "most relevant";
var userMin = undefined;
var userMax = undefined;
var currentCriteria = undefined;
var wholeArray = [];

function sortArray(criteria, array) {
    let result = []
    if (criteria === undefined || criteria === MINTOMAX) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return 1 }
            if (a.cost < b.cost) { return -1 }
            return 0;
        });
    } else if (criteria === MAXTOMIN) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return 1 }
            if (a.cost > b.cost) { return -1 }
            return 0;
        });
    } else if (criteria === BYSOLDCOUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount < b.soldCount) { return 1 }
            if (a.soldCount > b.soldCount) { return -1 }
            return 0;
        });
    };
    return result;
};
// función que obtiene todos los productos (filtrados ya por precios) y los añade al HTML.
function showItAll() {
    let contentToAppend = "";
    for (let i = 0; i < wholeArray.length; i++) {
        let element = wholeArray[i];
        let uriName = encodeURIComponent(element.name);
        if
        (((userMin == undefined) || element.cost >= parseInt(userMin)) &&
        ((userMax == undefined) || element.cost <= parseInt(userMax))){
            contentToAppend += `<div class='align-self-stretch col-md-4'><a class="sameStyling" href="product-info.html?product=`+uriName+`"><div class='productInfo'> <img src='` + element.imgSrc + `' class="product-img">
            <p class='product-name'>`+ element.name + `</p>
            <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
            <p class='product-description'>"` + element.description + `"</p>
            <p class='product-sold-count'>Vendidos: `+ element.soldCount + `</p>
            </div></a></div>`;
        };
    };
    document.getElementById('product-container').innerHTML = `<div class="container d-flex col-sm-12"><div class="row">` + contentToAppend + `</div></div>`;
};

//función que adjudica currentCriterias y un CurrentArray
function sortAndShowAll (criteria, array){
    currentCriteria = criteria;

    if (array == undefined){
        array = wholeArray;
    }
    wholeArray = sortArray(currentCriteria, array);

    showItAll();
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function (returnedArray){
        sortAndShowAll (MINTOMAX, returnedArray.data);
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowAll(MINTOMAX);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowAll(MAXTOMIN);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowAll(BYSOLDCOUNT);
    });

    document.getElementById("filtrar").addEventListener("click", function(){
        userMin = document.getElementById("minPrice").value;
        userMax = document.getElementById("maxPrice").value;

        if ((userMin != undefined) && (userMin != "")){
            userMin = parseInt(userMin);
        }else{
            userMin = undefined;
        };

        if((userMax != undefined) && (userMax != "")){
            userMax = parseInt(userMax);
        }else{
            userMax= undefined;
        }

        showItAll();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        userMin = undefined;
        userMax = undefined;
        document.getElementById("minPrice").value = "";
        document.getElementById("maxPrice").value = "";

        showItAll();
    })
});

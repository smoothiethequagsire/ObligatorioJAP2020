//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
getJSONData(PRODUCTS_URL).then(function(array){ 
    console.log(array.data);
    var contentToAppend="";
    for (let i=0; i<array.data.length; i++){
        let element= array.data[i];
        contentToAppend += `<div class='productInfo'><img src='` + element.imgSrc + `' class="product-img">
        <p class='product-name'>`+ element.name +`</p>
        <p class='product-cost'>`+ element.cost + ` ` + element.currency + `</p>
        <p class='product-description'>"` + element.description + `"</p>
        <p class='product-sold-count'>Vendidos: `+ element.soldCount +`</p>
        </div>`;
        document.getElementById('product-container').innerHTML = contentToAppend;
    }
})

document.addEventListener("DOMContentLoaded", function (e) {

});
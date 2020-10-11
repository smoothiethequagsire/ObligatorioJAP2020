let USDtoUYU = 40 //tipo de cambio

//función que agrega los productos al DOM
function showCart(array) {

    let articlesData = array.data.articles;
    let elementToAppend = ""

    for (let i = 0; i < articlesData.length; i++) {
        let element = articlesData[i];

        //función que devuelve el valor total por artículo, en pesos UYU
        function convertToUYU() {
            if (element.currency === "USD") {
                return (element.unitCost * USDtoUYU) * element.count;
            }
            else {
                return element.unitCost * element.count;
            }
        }

        elementToAppend += `<div class="container cartProductInfo col-xl-6"><img src='` + element.src + `' class="cart-product-img">
        <p class="related-product-name">`+ element.name + `</p>
        <label for="articleQuantity`+ i + `">Cantidad:</label>
        <input class="articleQuantity cartProductInfo" id="articleQuantity`+ i + `" type="number" min="1" value="` + element.count + `">
        <p class="soldcount text-right">Costo unitario: $ `+ element.unitCost + " " + element.currency + `<hr>
        <p class="text-right">Total del artículo: $ <span id="totalArticulo`+ i + `" class="totalArticulo">` + convertToUYU() +
            `</span> UYU</p>
        </div>`;
    }
    let shippingSection = `<div class="container">
    <h4 class="text-right formatoTotal">Subtotal: $ <span id="subtotal"></span> UYU</h4><hr>
    </div>
    <div class="container"><p class="envio">Seleccionar Envío: </p>
    <input type="radio" name="shipping" id="standard" value="standard">
    <label for="standard">Standard (12 a 15 días)</label></br>
    <input type="radio" name="shipping" id="express" value="express">
    <label for="express">Express (5 a 8 días)</label></br>
    <input type="radio" name="shipping" id="premium" value="premium">
    <label for="premium">Premium (2 a 5 días)</label></br>`

    document.getElementById("cart-container").innerHTML = `<div class="container d-flex justify-content-center">`+elementToAppend + `</div>` + shippingSection;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(FULL_CART_INFO).then(function (resp) {
        showCart(resp) //Muestra productos del JSON
        return resp;
    })
        .then(function (resp) { // Una vez cargados los productos, calculamos el subtotal inicial y lo mostramos
            let totalesArticulos = document.getElementsByClassName("totalArticulo");
            let sumaTotales = 0;
            for (let i = 0; i < totalesArticulos.length; i++) { //iteramos todos los innerHTML del total por artículo, los parseamos y los sumamos
                sumaTotales += parseInt(totalesArticulos[i].innerHTML); 
            }
            document.getElementById("subtotal").innerHTML = new Intl.NumberFormat("de-DE").format(sumaTotales);

            //agregamos eventListeners en cada input de cantidad para que refleje el total por artículo y el
            // subtotal actualizado cada vez que cambiamos la cantidad de artículos.
            for (let i = 0; i < resp.data.articles.length; i++) {
                let cantidad = document.getElementById("articleQuantity" + i);

                cantidad.addEventListener("change", function () { //declaramos Eventlistener:

                    //Valor por artículo:
                    if (resp.data.articles[i].currency === "USD") { // si la currency es USD, hacemos conversión
                        document.getElementById("totalArticulo" + i).innerHTML =
                            cantidad.value * (resp.data.articles[i].unitCost * USDtoUYU);
                    }
                    else {
                        document.getElementById("totalArticulo" + i).innerHTML =
                            cantidad.value * resp.data.articles[i].unitCost;
                    };

                    //Subtotal:
                    sumaTotales = 0; //reseteamos el valor usado incialmente
                    
                    for (let j = 0; j < totalesArticulos.length; j++) {
                        sumaTotales += parseInt(totalesArticulos[j].innerHTML); //volvemos a sumar los innerHTML del total de cada artículo
                    };
                    document.getElementById("subtotal").innerHTML = new Intl.NumberFormat("de-DE").format(sumaTotales);
                });
            };
        });
});

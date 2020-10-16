let USDtoUYU = 40; //tipo de cambio
let standardShipping = 0.05;
let expressShipping = 0.07;
let premiumShipping = 0.15;
let currentShipping = standardShipping;

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

        elementToAppend += `<div id="cartContainer` + i + `" class="container cartProductInfo col-xl-6"><img src='` + element.src + `' class="cart-product-img">
        <p class="related-product-name">`+ element.name + `</p>
        <button type="button" id="quitarCarrito`+ i + `" class="color-scheme-buttons quitarCarrito">Quitar</button>
        <label for="articleQuantity`+ i + `">Cantidad:</label>
        <input class="articleQuantity cartProductInfo" id="articleQuantity`+ i + `" type="number" min="1" value="` + element.count + `">
        <p class="soldcount text-right">Costo unitario: $ `+ element.unitCost + " " + element.currency + `<hr>
        <p class="text-right">Total del artículo: $ <span id="totalArticulo`+ i + `" class="totalArticulo">` + convertToUYU() +
            `</span> UYU</p>
        </div>`;
    };

    let shippingSection = `<div class="container"><div class="container">
    <h6 class="text-right formatoTotal">Subtotal: $ <span id="subtotal"></span> UYU</h6><hr>
    </div>
    <div class="container d-flex justify-content-center"><div class="container"><p class="envio">Seleccionar Envío: </p>
    <input type="radio" name="shipping" id="standard" value="standard" checked required>
    <label for="standard">Standard (12 a 15 días) <span class="soldcount">- 5% sobre el subtotal.</span></label></br>
    <input type="radio" name="shipping" id="express" value="express" required>
    <label for="express">Express (5 a 8 días) <span class="soldcount">- 7% sobre el subtotal.</span></label></br>
    <input type="radio" name="shipping" id="premium" value="premium" required>
    <label for="premium">Premium (2 a 5 días) <span class="soldcount">- 15% sobre el subtotal.</span></label></br>
    </div>
    <div class="container col-lg-5 col-xl-5">
    <h6 class="text-right formatoTotal">Costo de envío: $ <span id="totalEnvio"></span> UYU</h6><hr>
    <h4 class="text-right formatoTotal">TOTAL: $ <span id="total"></span> UYU</h4></div>
    </div><hr></div>`

    let paymentSection = `<div class="container"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#paymentMethod">
    Seleccione forma de pago
    </button><hr>
    <div class="modal fade" id="paymentMethod" tabindex="-1" aria-labelledby="formaPago" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="formaPago">Seleccione forma de pago:</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    <input type="radio" name="paymentMethod" id="transferencia" value="transferencia">
    <label for="transferencia">Transferencia bancaria</label><br>
    <input type="radio" name="paymentMethod" id="tarjeta" value="tarjeta">
    <label for="tarjeta">Tarjeta de crédito</label>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>
    </div>`

    document.getElementById("cart-container").innerHTML = `<div class="container d-flex justify-content-center">`
        + elementToAppend + `</div>` + shippingSection + paymentSection;
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(FULL_CART_INFO).then(function (resp) {
        showCart(resp) //Muestra productos del JSON
        return resp;
    })
        .then(function (resp) { // Una vez cargados los productos, calculamos el subtotal inicial y lo mostramos
            let totalesArticulos = document.getElementsByClassName("totalArticulo");
            let subtotal = document.getElementById("subtotal");
            let total = document.getElementById("total");
            let costoEnvio = document.getElementById("totalEnvio")
            let sumaTotales = 0;
            for (let i = 0; i < totalesArticulos.length; i++) { //iteramos todos los innerHTML del total por artículo, los parseamos y los sumamos
                sumaTotales += parseInt(totalesArticulos[i].innerHTML);
            }
            subtotal.innerHTML = sumaTotales; //mostramos subtotal inicial

            function calcShipping(shipping) {
                return (parseInt(subtotal.innerHTML) * shipping)
            };

            // mostramos costo de envío inicial
            costoEnvio.innerHTML = calcShipping(currentShipping);
            //mostramos total inicial
            total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));

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
                    subtotal.innerHTML = sumaTotales;

                    costoEnvio.innerHTML = calcShipping(currentShipping);
                    total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));
                });
            };

            //agregamos EventListeners a los métodos de envío
            document.getElementById("standard").addEventListener("change", function () {
                currentShipping = standardShipping;
                costoEnvio.innerHTML = calcShipping(currentShipping);
                total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));
            });

            document.getElementById("express").addEventListener("change", function () {
                currentShipping = expressShipping;
                costoEnvio.innerHTML = calcShipping(currentShipping);
                total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));
            });

            document.getElementById("premium").addEventListener("change", function () {
                currentShipping = premiumShipping;
                costoEnvio.innerHTML = calcShipping(currentShipping);
                total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));
            });

            //eventListeners a botones para quitar el artículo:
            for (let i = 0; i < totalesArticulos.length; i++) {
                document.getElementById("quitarCarrito" + i).addEventListener("click", function () {

                    // eliminamos el div del artículo a quitar
                    let element = document.getElementById("cartContainer" + i);
                    element.parentNode.removeChild(element);

                    // volvemos a calcular la suma de los totales por articulo, para obtener subtotal
                    sumaTotales = 0;
                    for (let j = 0; j < totalesArticulos.length; j++) {
                        sumaTotales += parseInt(totalesArticulos[j].innerHTML);
                    };
                    subtotal.innerHTML = sumaTotales;

                    // volvemos a calcular el envio y el total
                    costoEnvio.innerHTML = calcShipping(currentShipping);
                    total.innerHTML = new Intl.NumberFormat("de-DE").format(parseInt(subtotal.innerHTML) + calcShipping(currentShipping));

                    // en caso de que el carrito esté vacío, creamos mensaje
                    if (subtotal.innerHTML === "0") {
                        let noArticleInCart = `<div class="container">
                        <p class="lead text-center">Su carrito está vacío.</p><hr>
                        </div>`;

                        document.getElementById("cart-container").innerHTML = noArticleInCart;
                    };
                });
            };
        });
});

/*SECCIÓN PARA CHEQUEAR QUE SE HAYA SELECCIONADO FORMA DE PAGO

    document.getElementById("tarjeta").addEventListener("click", function(){
        console.log(document.getElementById("tarjeta").checked)
    });

    document.getElementById("transferencia").addEventListener("click", function(){
        console.log(document.getElementById("tarjeta").checked)
    });

*/
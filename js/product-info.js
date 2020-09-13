var productInfo = {};
var comments = [];
var decodedURIName = decodeURIComponent(window.location.search).substring(1);
var newScore = undefined;
var star = `<span class="fa fa-star checked"></span>`
var emptyStar = `<span class="fa fa-star"></span>`

// función que muestra info del producto
function showProductInfo() {
    var appendContent = `<div id="product-info-page" class="col-lg-12"><h2 class="product-name">` + decodedURIName + `</h2>
    <img src='` + productInfo.images[0] + `' class="product-img main-img-info">
    <p class="product-cost dollar-green">`+ productInfo.cost + " " + productInfo.currency + `</p>´
    <button class="buy-me color-scheme-buttons">Comprar</button>
    <p class="soldcount">Vendidos: `+ productInfo.soldCount + `
    <p class="product-description clear-both">` + productInfo.description + `</p>
    <div class="container img-container">
    <img src="`+ productInfo.images[1] + `" class="product-img second-img">
    <img src="`+ productInfo.images[2] + `" class="product-img second-img">
    <img src="`+ productInfo.images[3] + `" class="product-img second-img">
    <img src="`+ productInfo.images[4] + `" class="product-img second-img"></div>
    <p class="product-category">Categoría: <a href="category-info.html">`+ productInfo.category + `</a></p>

    </div>`;

    document.querySelector("#inserted-Js").innerHTML = appendContent;
};

// convierte valor numérico de puntaje a estrellas pintadas y vacías
function changeScoreToStars(score) {
    return star.repeat(score) + emptyStar.repeat(5 - score);
}

// función que muestra comentarios
function showComments() {
    var appendComment = "";

    for (let com of comments) {
        var actualDate = com.dateTime.split(" ")[0]

        appendComment += `<div class="user-comment">
        <p class="puntaje">Puntaje: `+ changeScoreToStars(com.score) + `<p/>
        <p class="username">Usuario: ` + com.user + `</p>
        <p class="date">` + actualDate + `</p>
        <p class="coment"> "` + com.description + `"</p></div>`
    }

    document.querySelector("#inserted-Js").innerHTML += `<div id="comment-section" class="">
    <h3 class="product-name prod-coment"> Comentarios:</h3>` + appendComment + `</div>
    <h5>Deja tu comentario:</h5>
    <div><textarea id="new-comment" cols="60" rows="5"></textarea></br>
    <span id="star-1" class="fa fa-star"></span>
    <span id="star-2" class="fa fa-star"></span>
    <span id="star-3" class="fa fa-star"></span>
    <span id="star-4" class="fa fa-star"></span>
    <span id="star-5" class="fa fa-star"></span></br>
    <button id="send-comment" class="color-scheme-buttons">Comentar</button></div>`;
};

//obtener la fecha actual para el comentario nuevo
function hoyFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    function addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    dd = addZero(dd);
    mm = addZero(mm);

    return yyyy + '-' + mm + '-' + dd;
};

//función que inserta el nuevo comentario en la sección de comentarios
function appendNewComment() {
    var newComment = document.getElementById("new-comment");
    var user = localStorage.getItem("username");

    if ((newComment.value != "" && newComment.value != undefined) && newScore != undefined) {
        document.getElementById("comment-section").innerHTML += `<div class="user-comment">
    <p class="puntaje">Calificación: `+ changeScoreToStars(newScore) + `<p/>
    <p class="username">Usuario: ` + user + `</p>
    <p class="date">` + hoyFecha() + `</p>
    <p class="coment"> "` + newComment.value + `"</p></div>`;
        newComment.value = "";
    } else {
        alert("Debe seleccionar una calificación y escribir un comentario.");
    };
};


document.addEventListener("DOMContentLoaded", function (e) {

    //carga info del producto
    getJSONData(PRODUCT_INFO_URL).then(function (myJson) {
        productInfo = myJson.data;
        showProductInfo();
        var relatedProd = productInfo.relatedProducts;

        //carga info de productos relacionados
        getJSONData(PRODUCTS_URL).then(function (resp) {
            var appendRelatedProducts = "";
            for (i = 0; i < resp.data.length; i++) {
                var element = resp.data[relatedProd[i]]

                if (i < relatedProd.length) {
                    appendRelatedProducts += `<div class="container relat-prod-container productInfo lg-col-6">
                <a href="product-info.html?`+encodeURIComponent(element.name)+`">
                <img src="`+ element.imgSrc + `" class="related-product-img"></a>
                <p class="related-product-name">` + element.name +`</p>
                <p class="related-product-cost">`+ element.cost + ` ` + element.currency + `</p>
               
                </div>`
                }
            };

            document.querySelector("#inserted-Js").innerHTML += `<div id="related-section" class="container">
            <h3 class="product-name prod-coment">Productos relacionados:</h3><div class="row">`
            + appendRelatedProducts + `</div></div>`;

            //carga comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (myJson) {
                comments = myJson.data;
                showComments();

                //agregar comentario. Está dentro de la funcion del getJSONdata porque el elemento que recibe
                //el listener se crea en showComments.
                document.getElementById("send-comment").addEventListener("click", appendNewComment);

                //Asigna puntaje con el mouseover, funcionalidad de cada star:
                document.getElementById("star-1").addEventListener("mouseover", function () {
                    document.getElementById("star-1").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-2").setAttribute("class", "fa fa-star");
                    document.getElementById("star-3").setAttribute("class", "fa fa-star");
                    document.getElementById("star-4").setAttribute("class", "fa fa-star");
                    document.getElementById("star-5").setAttribute("class", "fa fa-star");
                    newScore = 1;
                });

                document.getElementById("star-2").addEventListener("mouseover", function () {
                    document.getElementById("star-1").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-2").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-3").setAttribute("class", "fa fa-star");
                    document.getElementById("star-4").setAttribute("class", "fa fa-star");
                    document.getElementById("star-5").setAttribute("class", "fa fa-star");
                    newScore = 2;
                });

                document.getElementById("star-3").addEventListener("mouseover", function () {
                    document.getElementById("star-1").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-2").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-3").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-4").setAttribute("class", "fa fa-star");
                    document.getElementById("star-5").setAttribute("class", "fa fa-star");
                    newScore = 3;
                });

                document.getElementById("star-4").addEventListener("mouseover", function () {
                    document.getElementById("star-1").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-2").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-3").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-4").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-5").setAttribute("class", "fa fa-star");
                    newScore = 4;
                });

                document.getElementById("star-5").addEventListener("mouseover", function () {
                    document.getElementById("star-1").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-2").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-3").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-4").setAttribute("class", "fa fa-star checked");
                    document.getElementById("star-5").setAttribute("class", "fa fa-star checked");
                    newScore = 5;
                });
            });
        });
    });

});
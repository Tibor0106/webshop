const searchParams = new URLSearchParams(window.location.search);

var id = searchParams.get("id");

function search() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/getproduct.php",
        data: { categoryId: id },
        success: function (data) {
            console.log(data);
            try {
                $("#items").empty();
                data.forEach(i => {
                    $("#items").append(card(i.name, i.subtitle, i.price, i.id, i.imgPath))
                });
                if (data.length === 0) {
                    $("#items").append("<h3 class='text-center'>Nem található termék a ketegóriában!</h3>");
                }

            } catch (err) {
            }
        },

    });

}
search();
function card(name, subtitle, price, id, imgPath) {
    return `<div class="col-xl-4 mb-4">
      
                            <div class="product-card mt-5">
                                <img src="../products/${imgPath}"
                                    alt="IndexKep" srcset="" class="img-fluid" id="asd" onclick="viewItem('${id}')">
                                <div class="line ms-md-5 me-md-5 mt-3 mb-3"></div>
                                <h5 class="p-title text-center" onclick="viewItem('${id}')">${name}</h5>
                                <p class="text-black-50 text-center mt-3" onclick="viewItem('${id}')">${subtitle}</p>
                                <p class="text-success ms-4 mt-2 mb-3" style="font-weight:  bold;">Ár: ${formatNumber(price)} FT</p>
                                <div class="input-group mt-3">
                                    <button class="btn-product me-3 ms-3 form-control"
                                        onclick="cart.addToCart(${id})">Kosárba</button>
                                </div>

                           
                            </div>
                        </div>`

}

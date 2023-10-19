var items = [17, 20, 27, 28, 16, 29];
function loadDailyItems() {
    var list = document.getElementById("napi");
    items.forEach(i => {
        $("#napi").empty();
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/getproduct.php",
            data: { id: i },
            success: function (data) {
                console.log(data);
                try {
                    data.forEach(i => {
                        $("#napi").append(card(i.name, i.subtitle, i.price, i.id, i.imgPath))
                    });

                } catch (err) {
                }
            },

        });

    })

}

loadDailyItems();
function card(name, subtitle, price, id, imgPath) {

    return `<div class="col-xxl-4 mb-4 ">
                            <div class="d-flex justify-content-center">
                             <div class="product-card mt-5">
                                <img src="products/${imgPath}"
                                    alt="IndexKep" srcset="" class="img-fluid" id="asd" onclick="viewItem('${id}')">
                                <div class="line ms-md-5 me-md-5 mt-3 mb-3"></div>
                                <h5 class="p-title text-center" onclick="viewItem('${id}')">${name}</h5>
                                <p class="text-black-50 text-center mt-3">${subtitle.substring(0, 20)}</p>
                                <p class="text-success ms-4 mt-2 mb-3" style="font-weight:  bold;">Ár: ${formatNumber(price)} FT</p>
                                <div class="input-group mt-3">
                                    <button class="btn-product me-3 ms-3 mb-4 form-control"
                                        onclick="cart.addToCart(${id})">Kosárba</button>
                                </div>

                            </div>
                             </div>
                           
                        </div>`

}
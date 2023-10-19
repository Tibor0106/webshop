const searchParams = new URLSearchParams(window.location.search);

var id = searchParams.get("id");

function load() {

    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/getproduct.php",
        data: { id: id },
        success: function (data) {
            $("#viewItem").empty();
            if (data.length == 0) {
                $("#viewItem").append('<p class="h4 text-danger">A Nem termék nem található :(</p>')
            }
            try {
                $("#viewItem").append(card(data[0].name, data[0].subtitle, data[0].price, data[0].id, data[0].imgPath))
            } catch (err) {
            }
        },

    });
}
load();

function card(name, subtitle, price, id, imgPath) {
    return `<div>
                <div class="row">
                    <div class="col-md">
                        <p class="h6 text-break">${name}</p>
                        <img src="../products/${imgPath}"
                            alt="Product" class="img-fluid" style="border-radius: 10px;">
                    </div>
                    <div class="col-md">
                        <div class="mt-xl-5">
                            <div class="d-none d-md-block">
                                <br>
                                <br>
                                <br>
                                <br>
                            </div>
                            <p class="text-black-50 text-break">
                               ${subtitle}
                            </p>
                            <div class="d-none d-md-block">
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                            </div>
                            <div class="d-flex justify-content-end">
                                <p class="h5 text-success">Ár: ${formatNumber(price)} FT</p>
                            </div>
                            <div class="d-flex cart justify-content-end mt-xl-5">
                                <div class="input-group">
                                    <button class="btn-product btn ms-5 form-control" onclick="cart.addToCart(${id})">
                                        Kosárba
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
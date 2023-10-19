var fullprice = 0;
function items() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/cart.php",
        data: {
            getItems: "asd"
        },
        success: function (data) {
            $("#cartList").empty();
            if (data.length === 0) {
                $("#cartList").append("<p class='text-center h5 text-primary'>A Kosarad üres!</p>")
                document.getElementById("cartinfo").style.display = "none";
                return;
            }
            try {
                data.forEach(i => {
                    $.ajax({
                        type: "POST",
                        url: "http://webshop10.nhely.hu/api/getproduct.php",
                        data: { id: i },
                        success: function (data1) {
                            try {
                                data1.forEach(i => {
                                    $("#cartList").append(cartItem(i.id, i.name, i.subtitle, i.imgPath, i.price, 1));
                                    console.log(i.name);
                                    fullprice += i.price * 1;
                                    document.getElementById("fullprice").innerHTML = "Teljes összeg: " + formatNumber(fullprice) + " FT";
                                });
                            } catch (err) {
                                console.log(data);
                            }
                        },

                    });

                })

            } catch (Err) {

                console.log(Err);
            }
        },
    });
}
items();
function getFullPrice() {
    return fullprice;
}
function cartItem(id, name, subtitle, imgPath, price, amount) {
    return `
    <div id='item-${id}'>
                        <div class="row">
                            <div class="col-md">
                                <p class="h6 text-break">${name}</p>
                                <img src="../products/${imgPath}" alt="Product" class="img-fluid" style="border-radius: 10px;">
                            </div>
                            <div class="col-md">
                                <div class="mt-xl-5">
                                    <div class="d-none d-md-block">
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                    </div>
                                    <p class="text-black-50 text-break">${subtitle}</p>
                                    <div class="d-none d-md-block">
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                    </div>
                                    <p class="h5 text-success">Ár: ${formatNumber(price)} FT</p>
                                    <div class="d-flex cart justify-content-end mt-xl-5">
                                        <button class="btn btn-product btn-">+</button>
                                        <input type="number" name="" id="" class="text-center" value="${amount}">
                                        <button class="btnadd btn-product btn">-</button>
                                        <button class="btn-danger btn ms-5" onclick="remove('${id}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div class="line mt-4 mb-4"></div>
                    </div>
                </div>
`;
}
function remove(id) {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/cart.php",
        data: {
            removeItem: id
        },
        success: function (data) {
            window.location.reload();
        },
    });
    document.querySelectorAll("#item-" + id).forEach(i => {
        i.style.display = "none";

    })

}
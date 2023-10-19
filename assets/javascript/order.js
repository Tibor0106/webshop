var step = 1;
const searchParams = new URLSearchParams(window.location.search);

var fullprice = searchParams.get("fullprice") * 1;

var firstName,
    lastName,
    email,
    phone,
    iranyitoszam,
    city,
    street,
    comment,
    deliveryMode,
    payMent = ""

var item;
function step1() {
    return `<button class="btn btn-product" onclick="nextStep()">Folytatás</button>`;
}
function step2() {
    return `<div class="d">
                        <h5 class="text-center mb-5">Adatok</h5>
                        <div class="cCard p-4">
                            <form action="">
                                <div class="row">
                                    <div class="col-xl">
                                        <label for="" class="text-uppercase"
                                            style="font-weight: bold;">Vezetéknév</label>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control ms-3" id="firstName" required>
                                        </div>
                                    </div>
                                    <div class="col-xl">
                                        <label for="" class="text-uppercase"
                                            style="font-weight: bold;">Keresztnév</label>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control ms-3" id="lastName" required>
                                        </div>
                                    </div>
                                </div>
                                <label for="" class="text-uppercase" style="font-weight: bold;">Email</label>
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control ms-3" id="email" required>
                                </div>
                                <label for="" class="text-uppercase" style="font-weight: bold;">Telefon</label>
                                <div class="input-group mb-3">
                                    <input type="phone" class="form-control ms-3" id="phone" required>
                                </div>
                                <div class="row">
                                    <div class="col-xl">
                                        <label for="" class="text-uppercase"
                                            style="font-weight: bold;">Irányítószám</label>
                                        <div class="input-group mb-3">
                                            <input type="number" class="form-control ms-3" oninput="searchZip(this.value)" id="iranyitoszam" required>
                                        </div>
                                    </div>
                                    <div class="col-xl">
                                        <label for="" class="text-uppercase"
                                            style="font-weight: bold;">Település</label>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control ms-3" id="city" required>
                                        </div>
                                    </div>
                                </div>
                                <label for="" class="text-uppercase" style="font-weight: bold;">Utca</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control ms-3" id="street" required>
                                </div>
                                <label for="" class="text-uppercase" style="font-weight: bold;">Megjegyzés</label>
                                <div class="input-group mb-3">
                                    <textarea type="text" class="form-control ms-3" id="comment" required> </textarea>
                                </div>
                                <div class="input-group mb-3">
                                    <button type="button" class="form-control ms-3 btn btn-product"
                                        onclick="nextStep()">Tovább</button>
                                </div>
                            </form>
                        </div>

                    </div>`;
}

function step3() {
    return `<div class="">
                        <h5 class="text-center mb-3">Szállítás</h5>
                        <div class="line mb-3"></div>
                        <div class="cCard p-4">
                            <div class="dropdown">
                                <button class="btn btn-product dropdown-toggle" id="deliveryMode" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Válassz szállítási módot
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" onclick="chooseDelivery('szemelyes')">Személyes
                                            átvétel</a></li>
                                    <li><a class="dropdown-item" onclick="chooseDelivery('gls')">GLS házhoz
                                            szállítás (+ 2.100 FT)</a></li>
                                </ul>
                            </div>
                            <div id="payMode"> </div>
                            <div class="input-group mb-3 mt-3">
                                    <button type="button" class="form-control btn btn-product"
                                        onclick="nextStep()">Tovább</button>
                                </div>
                        </div>
                    </div>
`;
}

function step4Items(id, name, subtitle, price, border) {
    return `
    <tr style="${border ? 'border-bottom: 2px solid black;' : ''}">
                                    <th scope="col">#</th>
                                    <td scope="col">${name}</td>
                                    <td scope="col">${subtitle}</td>
                                    <td scope="col">${formatNumber(price)} FT</td>
                                </tr>`;

}

function step4() {
    item.innerHTML = `<div class="d p-3">
                        <table class="table cCard" style="border-radius: 10px;">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Termék</th>
                                    <th scope="col">Leírás</th>
                                    <th scope="col">Ár</th>
                                </tr>
                            </thead>
                            <tbody id="lastStepTable">
                        
                            </tbody>
                        </table>
                        <div>${payMent == "online" ? `
                        <button type="button" class="btn btn-product mb-3">PayPal</button>
                        <button type="button" class="btn btn-product mb-3">MasterCard</button>`
            : ""}</div>
                        <div class="input-group mb-3 mt-3">
                                    <button type="button" class="form-control btn btn-product"
                                        onclick="order()">Rendelés leadása</button>
                                </div>
                    </div>`;
    $("#lastStepTable").append(step4Items("", "Teljes Összeg", "", fullprice, true));
    if (payMent == "utanvet" && deliveryMode == "gls") {
        $("#lastStepTable").append(step4Items("", "Utánvét kezelés", "", 450));
        $("#lastStepTable").append(step4Items("", "Szállítás", "", 2100));
    }


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
                                    $("#lastStepTable").append(step4Items(i.id, i.name, i.subtitle, i.price));
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
function searchZip(value) {
    if (value.length == 0) {
        document.getElementById("city").value = "";
    }

    $.ajax({
        type: "GET",
        url: "https://hur.webmania.cc/zips/" + value + ".json",
        success: function (data) {
            try {
                document.getElementById("city").value = data.zips[0].name;
            } catch (err) {

            }
        },

    });
}
function nextStep() {
    if (step == 1) {

    } else if (step == 2) {
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;
        email = document.getElementById("email").value;
        iranyitoszam = document.getElementById("iranyitoszam").value;
        city = document.getElementById("city").value;
        phone = document.getElementById("phone").value;
        street = document.getElementById("street").value;
        comment = document.getElementById("comment").textContent;

        if (firstName.length == 0 || lastName.length == 0 || email.length == 0
            || iranyitoszam.length == 0 || city.length == 0 || street.length == 0) {
            showAlert("Hiányzó adatok!", 0);
            document.querySelectorAll("input").forEach(i => {
                if (i.value.length == 0) {
                    i.classList += " border-danger";
                }
            })
            return;
        }

    } else if (step == 3) {

        if (deliveryMode != "szemelyes" && deliveryMode != "gls") {
            showAlert("Válassz szállítási módot!")
            return;
        }
        if (payMent.length == 0 && deliveryMode == "gls") {
            showAlert("Válassz fizetési módot!")
            return;
        }

    } else if (step == 4) {

    }

    step++;
    init();
}

function init() {
    item = document.getElementById("step");
    var activestep = document.querySelectorAll('.step')

    activestep.forEach(i => {
        i.classList = "step";
    })
    if (step == 1) {
        item.innerHTML = step1();
        activestep[step - 1].classList += " step-active";
    }
    if (step == 2) {
        item.innerHTML = step2();
        activestep[step - 1].classList += " step-active";
    }
    if (step == 3) {
        item.innerHTML = step3();
        activestep[step - 1].classList += " step-active";
    }
    if (step == 4) {
        step4();
        activestep[step - 1].classList += " step-active";
    }
}

function chooseDelivery(mode) {
    $("#payMode").empty();
    deliveryMode = mode;
    if (mode == "gls") {
        fullprice += 2100
        document.getElementById("deliveryMode").innerHTML = "GLS házhozszállítás";
        $("#payMode").append(` <div class="mt-4">
                                <div class="input-group mb-2">
                                    <input type="radio" class="me-3 paymentMode" id="utanvet" onclick="selectPayment(this)">
                                    <label for="input">Utánvét (+450 FT)</label>
            
                                </div>
                                <div class="input-group mb-2">
                                    <input type="radio" class="me-3 paymentMode" id="online" onclick="selectPayment(this)">
                                    <label for="input">Online Fizetés</label>
            
                                </div>
                                
    
                            </div>`);
    } else if (mode == "szemelyes") {
        document.getElementById("deliveryMode").innerHTML = "Személyes átvétel";
    }

}
init();

function selectPayment(item) {
    document.querySelectorAll(".paymentMode").forEach(i => {
        i.checked = false;
    })
    item.checked = true;
    payMent = item.getAttribute("id");
}

function order() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/order.php",
        data: {
            fullname: firstName + " " + lastName, phone: phone, email: email,
            address: iranyitoszam + ", " + city + ", " + street, price: fullprice,
            deliveryMode: deliveryMode, payMent: payMent
        },
        success: function (data) {

            document.querySelectorAll("button").forEach(i => {
                i.remove();
            })
            item.innerHTML = `
            <h2 class="text-center">Köszönjük a vásárlást!</h2>
            <h3 class="text-success">Sikeres megrendelés !</h3>
            <h5 class="text-success">Rendelési Azonosító: <b>menopc-${data} </b></h5>`;
        },

    });

}

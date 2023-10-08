class ProductManager {
    constructor() {

    }
    createCategoryCheck(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].length === 0) {
                return false;
            } else {
                continue;
            }
        }
        return true;

    }

    createCategory(data) {
        if (this.createCategoryCheck(data)) {
            try {
                $.ajax({
                    type: "POST",
                    url: "http://webshop10.nhely.hu/api/adminProduct.php",
                    data: { link: "insertCategory", name: data[0], svg: data[1] },
                    success: function (response) {
                        if (response === "true") {
                            showErr("Sikeres hozzáadás");
                            return true;
                        } else {
                            showErr("Hiba történt a hozzáadás során! " + response);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseText);
                        return false;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            showErr("Hiányzó adatok!");
        }
    }
}
const productmanager = new ProductManager();
function insertCat() {
    var name = document.getElementById("categoryName");
    var svg = document.getElementById("categorySVG");

    var data = [];
    data[0] = name.value;
    data[1] = svg.value;

    name.value = "";
    svg.value = "";
    if (productmanager.createCategory(data)) {

    }
}
function showErr(err) {
    document.getElementById("catemessage").textContent = err;
}
function loadCategories() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/categories.php",
        data: { data: "get" },
        success: function (data) {
            try {

                data.forEach(i => {
                    $("#catergoryList").append(`<li onclick="puploadSetcat('${i.id}', '${i.name}')"><a class="dropdown-item">${i.name}</a></li>`)
                })
            } catch (err) {
            }
        },

    });
}
loadCategories();
var id;
function puploadSetcat(idp, name) {
    id = idp;
    document.getElementById("puploadSetcat").innerHTML = name;
}

class UploadProduct {
    constructor() {

    }
    check(data) {
        data.forEach(i => {
            try {
                if (i.value.length === 0) {
                    document.getElementById("pUploadMessage").innerHTML = "Hiányzó adatok!";
                    return false;
                }
            } catch (err) {

            }
        })
        return true;
    }
    upload(data) {
        if (this.check(data)) {
            var fileInput = data[4];
            var file = fileInput.files[0];

            if (!file) {
                alert('Please select an image.');
                return;
            }

            var formData = new FormData();
            formData.append('image', file);
            formData.append('name', data[0].value);
            formData.append('subtitle', data[1].value);
            formData.append('price', data[2].value);
            formData.append('categoryId', data[3]);
            formData.append('filename', data[5]);

            $.ajax({
                url: 'http://webshop10.nhely.hu/api/uploadProduct.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response === "true") {
                        document.getElementById("pUploadMessage").innerHTML = "Termék feltöltése sikeres!";
                        data.forEach(i => {
                            try {
                                i.value = "";
                            } catch (err) {

                            }
                        })
                    } else {
                        document.getElementById("pUploadMessage").innerHTML = "Termék feltöltése sikertelen!";
                    }
                }
            });

        }
    }
}

const uploadproduct = new UploadProduct();
function uploadProduct() {
    var name = document.getElementById("pName");
    var subtitle = document.getElementById("pSubtitle");
    var price = document.getElementById("pPrice");
    var img = document.getElementById("pImg");

    var data = [];
    data[0] = name;
    data[1] = subtitle;
    data[2] = price;
    data[3] = id;
    data[4] = img;
    data[5] = randomName();


    uploadproduct.upload(data);
}
function randomName() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';

    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * characters.length);
        randomString += characters[index];
    }

    return randomString;
}

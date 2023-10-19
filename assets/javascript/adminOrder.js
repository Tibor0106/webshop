function getLine(id, user, phone, email, price, state) {

    return ` <tr>
                                <th scope="row">menopc-${id}</th>
                                <td>${user}</td>
                                <td>${phone}</td>
                                <td>${email}</td>
                                <td>${formatNumber(price)}</td>
                                <td><button class="btn btn-danger" onclick="deleteOrder(${id})">Tötlés</button></td>
                                <td><button class="btn btn-primary" onclick="viewOrder(${id})">Megnyitás</button></td>
                                <td>${state}</td>

                            </tr>
`;
}
function load() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/orderManager.php",
        data: {
            query: "getTable"
        },
        success: function (data) {
            $("#orders").empty();
            data.forEach(i => {
                $("#orders").append(getLine(i.id, i.fullName, i.phone, i.email, i.price, i.state));
            });
        },
    });

}
this.load();

function deleteOrder(id) {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/orderManager.php",
        data: {
            query: "deleteOrder", id: id
        },
        success: function (data) {
            if (data == "truetrue") {
                load();
            }
        },
    });
}
function viewOrder(id) {
    NavHref("vieworder/?id=" + id);
}
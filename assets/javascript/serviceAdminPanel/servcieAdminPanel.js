const ProblemState = {
    0: "Megtekintetlen",
    1: "Megtekintve",
    2: "Aktív",
    3: "Lezárva"

}
class AdminService {
    constructor() {


    }

    viewItem(id) {
        NavHref('viewitem/?id=' + id);
    }
    deleteItem(id) {
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/service.php",
            data: {
                deleteMessage: id
            },
            success: function (data) {
                if (data === "true") {
                    adminservice.loadMessages();
                } else {
                    alert("Sikertelen törlés, lásd a hibát a console-on.")
                    console.error(data);
                }
            },
        });
    }
    loadMessages() {
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/service.php",
            data: {
                getMessages: "asd"
            },
            success: function (data) {
                $("#serviceMessage").empty();
                data.forEach(i => {
                    $("#serviceMessage").append(getLine(i.id, i.name, i.phone, i.email, i.state));
                    counter++;
                });
            },
        });


    }
}
const adminservice = new AdminService();
var counter = 1;
function getLine(id, name, phone, email, state) {

    return `
     <tr>
            <th scope="row">${counter}</th>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>...</td>
            <td><button class="btn btn-primary" onclick="adminservice.viewItem('${id}')">
                    Megnyitás
            </button>
                                </td>
                                <td><button class="btn btn-danger" onclick="adminservice.deleteItem('${id}')">
                                        Törlés
                                    </button></td>
                                <td>
                                    <p>${getState(state)}</p>
                                </td>
                            </tr>`;

}

adminservice.loadMessages();

function getState(state) {
    const stateName = ProblemState[state];
    return stateName || "Ismeretlen állapot";
}
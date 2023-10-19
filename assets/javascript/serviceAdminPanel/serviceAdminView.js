const searchParams = new URLSearchParams(window.location.search);

var id = searchParams.get("id");

function load() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/service.php",
        data: {
            getMessagesID: id
        },
        success: function (data) {
            $("#item").empty();
            if (data.length == 0) {
                $("#item").append("Nincs adat!");
            }
            data.forEach(i => {
                $("#item").append(getCard(i.name, i.email, i.phone, i.problem, i.state));
            });
        },
    });
}
function getCard(name, email, phone, problem, state) {
    return `
     <div class="row mb-3">
                            <div class="col-md  mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Név:</label>
                                        <div class="input-group">
                                            <input type="text" value="${name}" class="form-control ms-3" disabled>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md  mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Telefon:</label>
                                        <div class="input-group">
                                            <input type="text" value="${phone}" class="form-control ms-3" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md  mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Email:</label>
                                        <div class="input-group">
                                            <input type="text" value="${email}" class="form-control ms-3"
                                                disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase"
                                            style="font-weight: bold;">Sztátusz:</label>
                                        <div class="input-group">
                                            <div class="dropdown">
                                                <button class="btn btn-product dropdown-toggle form-control"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    ${getState(state)}
                                                </button>
                                                <ul class="dropdown-menu">
                                                   
                                                    <li><a class="dropdown-item" onclick="(setState('0')")>Megtekintlen</a></li>
                                                    <li><a class="dropdown-item" onclick="(setState('1')">Megtekintve</a></li>
                                                    <li><a class="dropdown-item" onclick="(setState('2')">Aktív</a></li>
                                                    <li><a class="dropdown-item" onclick="(setState('3')">Lezárva</a></li>
                                                                          
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <label for="" class="text-uppercase" style="font-weight: bold;">Üzenet:</label>
                            <div class="input-group">
                                <textarea type="text" class="form-control ms-3" disabled>${problem}</textarea>
                            </div>
                        </div>`;

}
load();
const ProblemState = {
    0: "Megtekintetlen",
    1: "Megtekintve",
    2: "Aktív",
    3: "Lezárva"

}
function getState(state) {
    const stateName = ProblemState[state];
    return stateName || "Ismeretlen állapot";
}
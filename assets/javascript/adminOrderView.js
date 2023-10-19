const searchParams = new URLSearchParams(window.location.search);

var id = searchParams.get("id");

function view() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/orderManager.php",
        data: {
            query: "viewOrder", id: id
        },

        success: function (data) {
            $("#order").empty();
            $("#order").append(card(data));
        },
    });

}

function card(data) {
    var item = `<div class="cCard p-4">
                        <div class="row mb-3">
                            <div class="col-md  mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Név:</label>
                                        <div class="input-group">
                                            <input type="text" value="${data[0].fullName}" class="form-control ms-3" disabled>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md  mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Telefon:</label>
                                        <div class="input-group">
                                            <input type="text" value="${data[0].phone}" class="form-control ms-3" disabled>
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
                                            <input type="text" value="${data[0].email}" class="form-control ms-3" disabled>
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
                                            <input type="text" value="${data[0].state}" class="form-control ms-3" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                                    <div class="mb-4">
                                        <label for="" class="text-uppercase" style="font-weight: bold;">Cím:</label>
                                        <div class="input-group">
                                            <input type="text" value="${data[0].address}" class="form-control ms-3" disabled>
                                        </div>
                                    </div>
                                
                        <div class="mb-3">
                            <label for="" class="text-uppercase" style="font-weight: bold;">Termékek:</label>
                            <table class="table">
                            <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Megnevezés</th>
                            <th scope="col">Leírás</th>
                            <th scope="col">Mennyiség</th>
                            <th scope="col">Ár</th>
                            </tr>
                            </thead>
                            <tbody>

                   
                        

                    `;
    data.forEach(i => {
        item += ` <tr>
      <th scope="row">#</th>
      <td>${i.name}</td>
      <td>${i.subtitle}</td>
      <td>${i.amount}</td>
      <td>${formatNumber(i.price)}</td>
    </tr>`
    });
    item += "</tbody> </table> </div> </div>"

    return item;
}


view();



class DashBoard {
    constructor() {

    }
    statistics() {
        var activeOrders = document.getElementById("actieOrders");
        var serviceMessages = document.getElementById("serviceMessages");
        var income = document.getElementById("income");
        var allProduct = document.getElementById("allProcuct");

        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/statistics.php",
            data: { query: "serviceMessages" },
            success: function (data) {
                serviceMessages.innerHTML = data;
            },
        });
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/statistics.php",
            data: { query: "allProduct" },
            success: function (data) {
                allProduct.innerHTML = data;
            },
        });
    }

}
const dashboard = new DashBoard();
dashboard.statistics();

function keres(value) {
    var list = document.getElementById("searchList");
    if (value.length == 0) {
        list.innerHTML = "";
        list.innerHTML = ' <li><a class="dropdown-item">Kezdj el gépelni</a></li>';
        return -1;
    }

    list.innerHTML = ' <li><a class="dropdown-item text-primary">Betöltés...</a></li>';
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/search.php",
        data: { serach: value },
        success: function (data) {
            if (data.length == 0) {
                list.innerHTML = ' <li><a class="dropdown-item text-danger">Nincs találat!</a></li>';
                return;
            }
            list.innerHTML = "";
            data.forEach(i => {
                list.innerHTML += '<li><a class="dropdown-item" onclick="viewItem(' + i.id + ')">' + i.name + '</a></li>';
            });
        },
    });
}
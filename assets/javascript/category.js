function loadCategories() {
    $.ajax({
        type: "POST",
        url: "http://webshop10.nhely.hu/api/categories.php",
        data: { data: "get" },
        success: function (data) {
            try {
                $("#catergoryDiv").empty();

                data.forEach(i => {
                    $("#catergoryDiv").append(categoryCard(i.id, i.name, i.icon))
                })
            } catch (err) {

            }

        },
    });
}
function categoryCard(id, name, svg) {
    return ` <div class="category-item d-flex" catid="${id}"  onclick="NavHref('category/?id=${id}')">
                        <div class="logo me-3">
                            ${svg}
                        </div>
                 <p>${name}</p>
            </div>`
}
loadCategories();


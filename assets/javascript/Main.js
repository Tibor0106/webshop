const AlertTypes = {
    DANGER: 'bg-danger',
    SUCCESS: 'bg-success',

};


function showAlert(title, type) {
    var alert = document.getElementById("alert");
    var counter = -100;
    alert.style.display = "block";
    alert.innerHTML = title;

    function load() {
        if (counter != 0) {
            counter++;
            alert.style.right = counter + "px";
            setTimeout(load, 1);
        } else {
            hide();
        }
    }
    function hide() {
        setTimeout(function () {
            alert.style.display = "none";
            alert.style.right = -100 + "px";
        }, 5000);
    }
    load();
}

function NavHref(path) {
    window.location.href = path;
}







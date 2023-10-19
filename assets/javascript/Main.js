const AlertTypes = {
    DANGER: 'bg-danger',
    SUCCESS: 'bg-success',

};


function showAlert(title, type) {
    var alert = document.getElementById("alert");
    alert.style.display
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
var sideTitle;
var sideText;
try {
    sideTitle = document.getElementById("sideTitle");
    sideText = sideTitle.textContent;
    sideTitle.innerHTML = sideText[0].toUpperCase();
} catch (err) {

}

function sideBarOpen() {
    document.getElementById("side-bar").style.width = "25vh";
    document.querySelectorAll(".sideTitle").forEach(i => {
        i.style.display = "block";
        i.classList.add("ms-3");
    })
    document.querySelectorAll(".Sideicon").forEach(i => {
        i.classList.remove("ms-5")
    })
    document.querySelectorAll(".sidebar .icon").forEach(i => {
        i.style.justifyContent = "start";
        i.style.marginLeft = "3vh";
    })
    sideTitle.innerHTML = sideText;
}
function sideBarClose() {
    document.getElementById("side-bar").style.width = "7vh";
    document.querySelectorAll(".sideTitle").forEach(i => {
        i.style.display = "none";
    })
    document.querySelectorAll(".icon").forEach(i => {
        i.style.justifyContent = "center";
        i.style.marginLeft = "0vh";
    })
    sideTitle.innerHTML = sideText[0].toUpperCase();
}

function formatNumber(number, decimalPlaces = 3, thousandsSeparator = '.', decimalSeparator = ',') {

    if (isNaN(number)) {
        return 'Invalid number';
    }

    const formattedNumber = number.toFixed(decimalPlaces);
    const parts = formattedNumber.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];


    const formattedDecimalPart = decimalPart ? decimalSeparator + decimalPart : '';
    const regex = /(\d)(?=(\d{3})+$)/g;
    const formattedIntegerPart = integerPart.replace(regex, `$1${thousandsSeparator}`);
    const formattedResult = formattedIntegerPart + formattedDecimalPart;
    return formattedResult;
}
function viewItem(itemid) {
    window.location.href = `/view/?id=${itemid}`;
}




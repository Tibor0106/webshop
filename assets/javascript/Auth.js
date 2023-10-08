class Auth {
    constructor() {

    }
    checkData(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].length === 0) {
                return false;
            } else {
                continue;
            }
        }
        return true;

    }
    async isLogined() {
        try {
            $.ajax({
                type: "POST",
                url: "http://webshop10.nhely.hu/api/auth.php",
                data: {
                    auth: "isLogined"
                },
                success: function (response) {
                    console.log(response);
                    if (response == 1) {
                        if (window.location.href == "http://webshop10.nhely.hu/admin-panel/") {
                            window.location.href = "http://webshop10.nhely.hu/admin-panel/dashboard";
                        }
                    } else {
                        if (window.location.href != "http://webshop10.nhely.hu/admin-panel/") {
                            window.location.href = "http://webshop10.nhely.hu/admin-panel/";
                        }
                    }
                },
            });


        } catch (error) {
            console.error('Error during initialization:', error);
        }

    }
    checkLogin(data) {
        return true;
    }
    login(data) {
        if (!this.checkData(data)) { authError("Minden mező kitöltése kötelező!"); return; }
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/auth.php",
            data: {
                auth: "login", username: data[0], password: data[1]
            },
            success: function (response) {
                if (response === "true") {
                    window.location.href = "http://webshop10.nhely.hu/admin-panel/dashboard";
                } else {
                    authError("Hibás felhasználónév vagy jelszó!")
                }
            },
        });

    }
}

const auth = new Auth();
console.log(auth.isLogined());
auth.checkLogin();
function authError(message) {
    document.getElementById("authError").innerHTML = message;
}
function loginBtn() {

    var username = document.getElementById("username");
    var password = document.getElementById("password");

    var data = [];
    data[0] = username.value;
    data[1] = password.value;
    auth.login(data);

}
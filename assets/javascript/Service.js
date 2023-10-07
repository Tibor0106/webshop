class Service {
    constructor(adatok) {
        this.Name = adatok[0].value;
        this.phone = adatok[1].value;
        this.email = adatok[2].value;
        this.problem = adatok[3].value;
        this.all = adatok;
    }
    checkData() {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].value.length === 0) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
    recordData() {

        if (this.checkData()) {
            try {
                $.ajax({
                    type: "POST",
                    url: "http://webshop10.nhely.hu/api/service.php",
                    data: {
                        name: this.Name,
                        phone: this.phone,
                        email: this.email,
                        problem: this.problem
                    },
                    success: function (data) {
                        if (data == "true") {
                            return true;
                        }
                    },
                });
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        } else {
            this.MessageSend("Hiányzó / hibás adatok", "text-warning");
            return false;
        }
    }
    MessageSend(message, type) {
        document.getElementById("message").className = type + "  text-center";
        document.getElementById("message").innerHTML = message;
    }
}
function send() {
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var problem = document.getElementById("problem");

    var data = [];
    data[0] = name
    data[1] = phone;
    data[2] = email;
    data[3] = problem;

    const service = new Service(data);
    if (service.recordData()) {
        service.MessageSend("Sikeres rögzítés, köszönjük, hogy minket választottak!", "text-success")
        data.forEach(i => {
            i.value = "";
        })
    } else {
        service.MessageSend("Sikertelen rögzítés", "text-danger")
    }

}

try {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

    });
} catch (error) {
    console.warn(error)
}

function addHandler() {
    var handler_name = document.getElementById("username").value;
    var handler_password = document.getElementById("password").value;
    var url = "";
    var mob_num = localStorage.getItem("doc_mobile");

    var encryptedMob = CryptoJS.AES.encrypt(mob_num, "Secret Passphrase");
    var encryptedhan = CryptoJS.AES.encrypt(handler_name, "Secret Passphrase");

    if (handler_name != "" && handler_password != "") {
        url = "http://bopdop.in/handler/login.html?d=" + encryptedMob;
        console.log(url);
        var formData = new FormData();
        formData.append("user_name", handler_name);
        formData.append("password", handler_password);
        formData.append("mob_num", mob_num);
        formData.append("url", url);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                mytoast("Handler Added ", "var(--secondary)");
                location.reload();

            }
        };
        xhttp.open("POST", ip + "/handler/add_handler", true);
        xhttp.send(formData);
    }
}
function seeDoctor() {
    var doctor = localStorage.getItem("doc_name");
    document.getElementById("doctor_name").value = "Dr. " + doctor;

}

function verifyHandler() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username != "" && password != "") {
        var queryString = location.search;
        var array = queryString.split("?d=");
        console.log(array)
        var mobile = array[1];
        if (array.length > 1) {
            var decrypted = CryptoJS.AES.decrypt(mobile, "Secret Passphrase");
            var mob_num = decrypted.toString(CryptoJS.enc.Utf8);
            console.log(mob_num)
        } else {
            mytoast("Invalid URL Go to Doctor for URL", "crimson");
            return;
        }

        var formData = new FormData();

        formData.append("user_name", username);
        formData.append("password", password);
        formData.append("mob_num", mob_num);

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                if (this.responseText != "Unsuccessfull") {
                    sessionStorage.setItem("HandlerAuthenticationState", "Authenticated");
                    localStorage.setItem("doc_mobile", mob_num);
                    localStorage.setItem("doc_name", this.responseText);
                    location.href = "index.html";
                }
                else {
                    document.getElementById("loading").style.display = "none";
                    alert("Wrong Username or password");
                }
            }
        };
        xhttp.open("POST", ip + "/handler/handler_login", true);
        xhttp.send(formData);

        document.getElementById("loading").style.display = "block";
        var timer = setTimeout(() => { document.getElementById("loading").style.display = "none" }, 5000);
    } else {
        mytoast("please fill the fields")
    }
}

function handlerData() {
    var formData = new FormData();
    formData.append("mob_num", localStorage.getItem("doc_mobile"));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            console.log(result)
            result.forEach(element => {
                document.getElementById("handlerTable").innerHTML +=
                    '<tr>' +
                    '<td>' + element.user_name + '</td>' +
                    '<td>' + element.password + '</td>' +
                    '<td onclick="copyLink(this)" class="linkShort">' + element.url + '</td>' +
                    '<td><button class="btn bg-theme text-light" data-key="' + element.id + '" onclick="openmodal(this)" >delete</button></td>' +
                    '</tr>';
            });
        }
    };
    xhttp.open("POST", ip + "/handler/handlers_list", true);
    xhttp.send(formData);
}

function copyLink(element) {

    var aux = document.createElement("input");
    aux.setAttribute("value", element.innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    Toastify({
        text: "Copied",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "var(--secondary)",
        stopOnFocus: true,
    }).showToast();
}

function deleteHandler(element) {
    var formData = new FormData();
    formData.append("id", element.getAttribute("data-key"))
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            element.parentNode.parentNode.remove();
            Toastify({
                text: "Deleted",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "var(--secondary)",
                stopOnFocus: true,
            }).showToast();
        }
    };
    xhttp.open("POST", ip + "/doctor/delete_handler", true);
    xhttp.send(formData);
}

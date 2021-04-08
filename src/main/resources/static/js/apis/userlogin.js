var secret = "mybopdopapp";
function getNumber() {
    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    document.getElementById("mobileNumber").value = urlParams.get('mobile');
    document.getElementById("otp").focus();
}

//  STEP 1 
function userNumcheck() {
    var name = document.getElementById("userregname").value;
    var mobile = document.getElementById("userregmobile").value;
    var passsword = document.getElementById("userregpassword").value;



    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            if (this.responseText == "patient") {
                mytoast("User Exist", "crimson");
            }
            else if (this.responseText == "doctor") {
                mytoast("User exists as doctor")
            }
            else {
                var p = (this.responseText).split(":")[1];

                var encryptedP = CryptoJS.AES.encrypt(p, secret);
                var encryptedM = CryptoJS.AES.encrypt(mobile, secret);
                var encryptedN = CryptoJS.AES.encrypt(name, secret);
                var encryptedPass = CryptoJS.AES.encrypt(passsword, secret);

                localStorage.setItem("user_p", encryptedP);
                localStorage.setItem("user_mobile", encryptedM);
                localStorage.setItem("user_name", encryptedN);
                localStorage.setItem("user_password", encryptedPass);



                senduserOTP(encryptedM, p);

            }
            // Close Preloader
            closePreLoader();

        }
        else if (this.readyState == 4 && this.status == 500) {
            mytoast("Server Error", "crimson");
            // Close Preloader
            closePreLoader();
        }
        else if (this.readyState == 4 && this.status == 404) {
            mytoast("Something went wrong", "crimson");
            // Close Preloader
            closePreLoader();
        }
    };
    xhttp.open("GET", ip + "/patient/num_check?mob_num=" + mobile, true);
    xhttp.send();
    // Start Preloader
    openPreLoader();
}

// STEP 2
function senduserOTP(phone, otp) {
    try {
        var api = "d87bc660-4421-11eb-8153-0200cd936042";
        var decrypted = CryptoJS.AES.decrypt(phone, secret);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.href = "verify-user-otp.html?p=" + phone;
            }
            else if (this.status == 400) {
                mytoast("SMS not sent");
            }
        };
        xhttp.open("GET", "https://2factor.in/API/V1/" + api + "/SMS/" + decrypted.toString(CryptoJS.enc.Utf8) + "/" + otp.trim(), true);
        xhttp.send();
    } catch (error) {
        console.warn(error);
    }

}

//STEP 3
function verifyuserOTP() {
    // Start Preloader
    openPreLoader();

    var p = document.getElementById("otp").value;
    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("user_p"), secret);

    var otp = decrypted.toString(CryptoJS.enc.Utf8).trim();
    if (p == otp) {
        sessionStorage.setItem("userotp", "verified");
        userSignUp();
        location.href = "create-patient-profile.html";
    } else {
        mytoast("Enter correct OTP !! ", "crimson");
    }

    // Close Preloader
    closePreLoader();
}

//STEP 4 
function userSignUp() {
    var name = localStorage.getItem("user_name");
    var mobile = localStorage.getItem("user_mobile");
    var passsword = localStorage.getItem("user_password");

    var decryptedN = CryptoJS.AES.decrypt(name, secret);
    name = decryptedN.toString(CryptoJS.enc.Utf8).trim();

    var decryptedM = CryptoJS.AES.decrypt(mobile, secret);
    mobile = decryptedM.toString(CryptoJS.enc.Utf8).trim();

    var decryptedP = CryptoJS.AES.decrypt(passsword, secret);
    passsword = decryptedP.toString(CryptoJS.enc.Utf8).trim();

    var formData = new FormData();
    formData.append("pt_name", name);
    formData.append("mob_num", mobile);
    formData.append("pswrd", passsword);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Exist") {
                // mytoast("User Exist", "crimson");
            }
            // else {
            //     // localStorage.clear();
            //     var encryptedM = CryptoJS.AES.encrypt(mobile, secret);
            //     var encryptedN = CryptoJS.AES.encrypt(name, secret);
            //     // senduserOTP(encryptedM, p);
            //     // localStorage.setItem("p", encryptedP);
            //     // localStorage.setItem("mobile", encryptedM);
            //     // localStorage.setItem("name", encryptedN);
            // }
            console.log(this.responseText)
        }
    };
    xhttp.open("POST", ip + "/patient/sign_up", true);
    xhttp.send(formData);
}

// STEP 5
function createuserProfile() {

    // Start Preloader
    openPreLoader();

    var mob_number = document.getElementById("mobile").value;
    var dob = document.getElementById("dob").value;
    var user_location = document.getElementById("location").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var email = document.getElementById("email").value;
    var gender = "";
    var username = document.getElementById("name").value;

    for (let i = 0; i < 3; i++) {
        if (document.getElementsByName("gender")[i].checked == true) {
            gender = document.getElementsByName("gender")[i].value;
        }
    }

    var temp = {
        "mob_number": mob_number,
        "gender": gender,
        "age": dob,
        "address": user_location,
        "city": city,
        "state": state,
        "email": email,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "updated") {
                localStorage.setItem("user_name", username);
                localStorage.setItem("user_mobile", mob_number);
                sessionStorage.setItem("usermobile", mob_number);
                sessionStorage.setItem('UserAuthenticationState', 'Authenticated');
                location.href = "../patient-dashboard.html";
            }
            else {
                mytoast("Something went wrong or SERVER ISSUE !!", "crimson");
            }
            // Close Preloader
            closePreLoader();
        }
    };
    xhttp.open("POST", ip + "/patient/update_info", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(temp));
}

//LOGIN
function userlogin() {
    var mobile = document.getElementById("mobile").value;
    var passsword = document.getElementById("password").value;

    if (mobile != "" && passsword != "") {
        document.getElementsByClassName("loaderimg")[0].style.display = "inline";
        var formData = new FormData();
        formData.append("mob_num", mobile);
        formData.append("password", passsword);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                try {
                    var result = JSON.parse(this.responseText);
                    console.log(result);
                } catch (error) {
                    console.warn(error)
                }

                if (result.name != null && result.age != null) {
                    localStorage.setItem("user_name", result.name);
                    localStorage.setItem("user_mobile", mobile);
                    sessionStorage.setItem("usermobile", mobile);
                    sessionStorage.setItem('UserAuthenticationState', 'Authenticated');
                    var queryString = location.search;

                    if (checkLoginStatus() == true) {
                        location.href = "../patient-dashboard.html";
                    } else {
                        location.href = queryString.split("redirect=")[1];
                    }

                }
                else if (result.age == null && result.name != null) {
                    var encryptedM = CryptoJS.AES.encrypt(mobile, secret);
                    var encryptedN = CryptoJS.AES.encrypt(result.name, secret);
                    localStorage.setItem("user_name", encryptedN);
                    localStorage.setItem("user_mobile", encryptedM);
                    location.href = "create-patient-profile.html";
                }
                else {
                    mytoast("Mobile number or Password is incorrect", "crimson");
                }
                document.getElementsByClassName("loaderimg")[0].style.display = "none";
            }
            else if (this.readyState == 4 && this.status == 500) {
                document.getElementsByClassName("loaderimg")[0].style.display = "none";
            }
        };
        xhttp.open("POST", ip + "/patient/ptLogin", true);
        xhttp.send(formData);
    } else {
        mytoast("Please fill the fields", "crimson");
    }
}

// GET Patient Number
function getNumber() {
    var queryString = location.search;
    var array = queryString.split("?p=");
    var p = array[1];
    var decrypted = CryptoJS.AES.decrypt(p, secret);

    p = decrypted.toString(CryptoJS.enc.Utf8);

    document.getElementById("mobileNumber").value = p;
    document.getElementById("otp").focus();
}

// GET Patient Name
function getPatientName() {
    var decryptedN = CryptoJS.AES.decrypt(localStorage.getItem("user_name"), secret);
    var decryptedM = CryptoJS.AES.decrypt(localStorage.getItem("user_mobile"), secret);

    document.querySelectorAll('.PName')[0].innerHTML = decryptedN.toString(CryptoJS.enc.Utf8);

    try {

        document.querySelectorAll('.PName')[1].value = decryptedN.toString(CryptoJS.enc.Utf8);
        document.getElementById("mobile").value = decryptedM.toString(CryptoJS.enc.Utf8);

    } catch (error) {
        mytoast("Patient Name not fetch", "crimson");
    }
}


function checkLoginStatus() {
    var url = location.search;
    if (url != "") {
        document.getElementById("message").innerHTML =
            '<div class="alertmessage flexSeparate"><span> Please login first then book appointment</span><i class="fas fa-times" onclick="removemessage()" ></i> </div>';
        return false;
    }
    return true;
}

function removemessage() {
    document.getElementById("message").firstChild.remove();
}
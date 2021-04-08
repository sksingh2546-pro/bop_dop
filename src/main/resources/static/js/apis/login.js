
var secret = "mybopdopapp";
function getDoc() {
    document.querySelectorAll('.docName')[0].innerHTML = "Dr. " + localStorage.getItem("doc_name");
    try {
        document.querySelectorAll('.docName')[1].innerHTML = "Dr. " + localStorage.getItem("doc_name");
    } catch (error) {
        console.warn(error)
    }
}
/* 
function signUp() {
    var name = document.getElementById("docregname").value;
    var mobile = document.getElementById("docregmobile").value;
    var passsword = document.getElementById("docregpassword").value;

    var formData = new FormData();
    formData.append("doctor_name", name);
    formData.append("mob_number", mobile);
    formData.append("password", passsword);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Mob Exist") {
                Toastify({
                    text: "Mobile Number Exist Go to Login Page",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "crimson",
                    stopOnFocus: true,
                }).showToast();

            }
            else if (this.responseText == "Name Exist") {
                Toastify({
                    text: "Name Exist",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "crimson",
                    stopOnFocus: true,
                }).showToast();
            }
            else {
                var p = (this.responseText).split(":")[1];
                localStorage.setItem("p", p);
                localStorage.setItem("mobile", mobile);
                localStorage.setItem("name", name);

                sessionStorage.setItem("name", name);
                sendOTP(mobile, p);
            }

        }
    };
    xhttp.open("POST", ip + "/doctor/doc_signup", true);
    xhttp.send(formData);
} */

// STEP 1
function numcheck() {
    var name = document.getElementById("docregname").value;
    var mobile = document.getElementById("docregmobile").value;
    var passsword = document.getElementById("docregpassword").value;

    // Start Preloader
    openPreLoader();

    // console.log("name is : "+name+" mob : "+mobile+" paswrd "+passsword)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Mob Exist") {
                Toastify({
                    text: "Mobile Number Exist Go to Login Page",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "crimson",
                    stopOnFocus: true,
                }).showToast();

            }
            else if (this.responseText == "Name Exist") {
                Toastify({
                    text: "Name Exist",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "crimson",
                    stopOnFocus: true,
                }).showToast();
            }
            else if(this.responseText == "patient"){
                mytoast("This number is registered as Patient")
            }
            else {
                var p = (this.responseText).split(":")[1];

                var encryptedP = CryptoJS.AES.encrypt(p, secret);

                localStorage.setItem("doc_p", encryptedP);
                localStorage.setItem("doc_mobile", mobile);
                localStorage.setItem("doc_name", name);
                localStorage.setItem("doc_password", passsword);

                sendOTP(mobile, p);

            }
            // Close Loader
            closePreLoader();

        }
        else if(this.readyState == 4 && this.status == 500){
            mytoast("Server Error", "crimson");
            // Close Preloader
            closePreLoader();
        }
        else if(this.readyState == 4 && this.status == 404){
            mytoast("Something went wrong", "crimson");
            // Close Preloader
            closePreLoader();
        }
    };
    xhttp.open("GET", ip + "/doctor/num_check?mob_number=" + mobile + "&doctor_name=" + name, true);
    xhttp.send();
}

// STEP 2
function sendOTP(phone, otp) {
    var api = "d87bc660-4421-11eb-8153-0200cd936042";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.href = "verify-otp.html?p=" + phone;
        }
    };
    xhttp.open("GET", "https://2factor.in/API/V1/" + api + "/SMS/" + phone + "/" + otp, true);
    xhttp.send();
}

// STEP 3
function verify() {
    // Start Preloader
    openPreLoader();
    var p = document.getElementById("otp").value;
    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem("doc_p"), secret);

    var otp = decrypted.toString(CryptoJS.enc.Utf8).trim();

    if (p == otp) {
        sessionStorage.setItem("OTP", "verified");
        signUp();

    } else {
        mytoast("Incorrect OTP", "crimson");
    }
    // Close Preloader
    closePreLoader();
}

// STEP 4
function signUp() {
    var name = localStorage.getItem("doc_name");
    var mobile = localStorage.getItem("doc_mobile");
    var passsword = localStorage.getItem("doc_password");
    console.log("doc sign up ! ")
    var formData = new FormData();
    formData.append("doctor_name", name);
    formData.append("mob_number", mobile);
    formData.append("password", passsword);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "UnSuccessfull") {
                mytoast("User not eligible", "crimson");
            }
            else {
                localStorage.clear();

                localStorage.setItem("doc_mobile", mobile);
                localStorage.setItem("doc_name", name);
                sessionStorage.setItem("doc_name", name);
                location.href = "create-profile.html?OTPVerification=done";
            }

        }
    };
    xhttp.open("POST", ip + "/doctor/doc_signup", true);
    xhttp.send(formData);
}

// STEP 5
function createProfile() {
    // Start Preloader
    openPreLoader();

    var doc_name = document.getElementById("name1").value;
    var degree = document.getElementById("degree").value;
    var specialisation = document.getElementById("specialisation").value;
    var clinic_location = document.getElementById("location").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var emial = document.getElementById("email").value;
    var no_of_handlers = document.getElementById("handlers").value;
    var alt_contact_num = document.getElementById("otherNumber").value;
    var experience = document.getElementById("experience").value;
    var clinic_name = document.getElementById("clinicName").value;
    var mobile = localStorage.getItem("doc_mobile");
    var reg_num = document.getElementById("registrationNumber").value;


    /*var opd_timing = "";
    if (document.getElementById("morning").checked == true) {
        opd_timing = "M=" + document.getElementById("morningTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("morningTiming").getElementsByTagName("input")[1].value;
    }
    if (document.getElementById("afternoon").checked == true) {
        opd_timing += "A=" + document.getElementById("afternoonTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("afternoonTiming").getElementsByTagName("input")[1].value;
    }
    if (document.getElementById("evening").checked == true) {
        opd_timing += "E=" + document.getElementById("eveningTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("eveningTiming").getElementsByTagName("input")[1].value;
    }*/

    var temp = {
        "doctor_name": doc_name,
        "degree": degree,
        "specialisation": specialisation,
        "clinic_location": clinic_location,
        "city": city,
        "state": state,
        "emial": emial,
        "no_of_handlers": parseInt(no_of_handlers),
        "experience": parseInt(experience),
        "alt_contact_num": alt_contact_num,
//        "opd_timing": opd_timing,
        "mob_number": mobile,
        "clinic_name": clinic_name,
        "registration_number": reg_num

    }
    console.log(temp);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "Successfull") {
                sessionStorage.setItem("DoctorAuthenticationState", "Authenticated");
                location.href = "request.html?loginstatus=done";

            }
            else {
                mytoast("SERVER ERROR !!", "crimson");
            }
            // Close Preloader
            closePreLoader();
        }
    };
    xhttp.open("POST", ip + "/doctor/add_doc_detail", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(temp));
}

function getNumber() {
    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);
    console.log(urlParams.get('p'));
    document.getElementById("mobileNumber").value = urlParams.get('p');
    document.getElementById("otp").focus();
}

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function getName() {
    document.getElementById("name1").value = localStorage.getItem("doc_name");
    document.getElementById("headName").innerHTML = localStorage.getItem("doc_name");
    document.getElementById("degree").focus();
}

function resendOTP() {
    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.get('p');
}

function login() {
    var mobile = document.getElementById("doctorMobile").value;
    var password = document.getElementById("doctorPassword").value;

    if (mobile != "" && password != "") {
        document.getElementsByClassName("loaderimg")[0].style.display = "inline";
        var formData = new FormData();
        formData.append("mob_num", mobile);
        formData.append("password", password);

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
               
                if (result.name != null && result.degree !=null) {
                    console.log("signing in !!");
                    localStorage.setItem("doc_name", result.name.trim());
                    localStorage.setItem("doc_mobile", mobile);    
                    sessionStorage.setItem("DoctorAuthenticationState", "Authenticated");
                    location.href = "../doctor/doctor-dashboard.html";
                }
                else if (result.degree == null && result.name !=null) {
                    localStorage.setItem("doc_name", result.name.trim());
                    localStorage.setItem("doc_mobile", mobile);
    
                    location.href = "create-profile.html";
                 }
                else {
                    document.getElementById("loading").style.display = "none";
                    mytoast("wrong username or password", "crimson");
                }
                document.getElementsByClassName("loaderimg")[0].style.display = "none";

            }else if (this.readyState == 4 && this.status == 500) {
                mytoast("Server Error");
                document.getElementsByClassName("loaderimg")[0].style.display = "none";
            }
        };
        xhttp.open("POST", ip + "/doctor/doc_login", true);
        xhttp.send(formData);
        document.getElementById("loading").style.display = "block";
    }
    else {
        mytoast("Please fill the fields", "crimson");
    }
}

function updateProfile() {
    
    var doc_name = document.getElementById("name1").value;
    var degree = document.getElementById("degree").value;
    var specialisation = document.getElementById("specialisation").value;
    var clinic_location = document.getElementById("clinicAddress").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var emial = document.getElementById("email").value;
    var no_of_handlers = document.getElementById("handlers").value;
    var alt_contact_num = document.getElementById("mobile").value;
    var experience = document.getElementById("experience").value;
    var clinic_name = document.getElementById("clinicName").value;
    var mobile = localStorage.getItem("doc_mobile");
    var reg_num = document.getElementById("registrationNumber").value;
    var opd_timing = document.getElementById("clinicTiming").value;

    var temp = {
        "doctor_name": doc_name,
        "degree": degree,
        "specialisation": specialisation,
        "clinic_location": clinic_location,
        "city": city,
        "state": state,
        "emial": emial,
        "no_of_handlers": parseInt(no_of_handlers),
        "experience": parseInt(experience),
        "alt_contact_num": alt_contact_num,
        "opd_timing": opd_timing,
        "mob_number": mobile,
        "clinic_name": clinic_name,
        "registration_number": reg_num

    }
    console.log(temp);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            if (this.responseText == "Successfull") {
                mytoast("Profile Updated");
                location.reload();
            }
            else {
                mytoast("SERVER ERROR !!", "crimson");
            }
        }
    };
    xhttp.open("POST", ip + "/doctor/update_profile", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(temp));
}

var secret = "mybopdopapp";
var forms = document.querySelectorAll('form');
for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', event => {
        event.preventDefault();
    });
}

function sendOTP(phone, otp) {
    var api = "d87bc660-4421-11eb-8153-0200cd936042";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            // console.log(result);
            if (result.Status == "Success") {
                mytoast("OTP Sent Successfully", "var(--secondary)");
                document.getElementById("mobile").disabled = true;
                document.getElementById("forgetOtpForm").style.display = "block";
            } else {
                mytoast("SERVER PROBLEM !! ", "var(--secondary)");
            }
        }
    };
    xhttp.open("GET", "https://2factor.in/API/V1/" + api + "/SMS/" + phone + "/" + otp, true);
    xhttp.send();
}

function forgot() {
    var formData = new FormData();
    var mobile = document.getElementById("mobile").value;
    if (validateNumber(mobile)) {
        formData.append("mob_num", mobile);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
                if(this.responseText == ""){
                    mytoast("Mobile Number is not registered");
                }
                else{
                    var otp = this.responseText.trim();
                    var encryptedotp = CryptoJS.AES.encrypt(otp, secret);
                    sendOTP(mobile,otp);
                    
                    document.getElementById("forgotForm").style.display = "none";
                    sessionStorage.setItem("t", encryptedotp);
                    document.getElementById("mobile").disabled = true;
                    document.getElementById("forgetOtpForm").style.display = "block";
                    document.getElementById("otpmessage").style.display = "block";
                    document.getElementById("otp").focus();
                    document.getElementById("myNumber").innerHTML = "+91" + mobile;
                }
                
            }
        };
        xhttp.open("POST", ip + "/patient/forget_password", true);
        xhttp.send(formData);
    }else{
        mytoast("Enter correct mobile number")
    }

}

function verifyOTP() {
    var temp = sessionStorage.getItem("t");
    var decrypted = CryptoJS.AES.decrypt(temp, secret);
    var input = document.getElementById("otp").value;
    var otp = decrypted.toString(CryptoJS.enc.Utf8);
    if (otp == input) {
        // console.log("verified");
        mytoast("OTP verified", "var(--success)");
        document.getElementById("forgetOtpForm").style.display = "none";
        document.getElementById("otpmessage").style.display = "none";
        document.getElementById("createPassword").style.display = "block";

    } else {
        mytoast("Incorrect OTP")
    }
}

function forgotpassword(newpass) {
    var formData = new FormData();
    var mobile = document.getElementById("mobile").value;

    formData.append("mob_num", mobile);
    formData.append("new_pass", newpass);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // console.log(this.responseText);
            if(this.responseText == "pass"){
                mytoast("Password Changed back to login page.","");
                document.getElementById("newpassword").value = "";
                document.getElementById("confirmpassword").value = "";
            }
        }
    };
    xhttp.open("POST", ip + "/patient/forget2_password", true);
    xhttp.send(formData);
}

function editNumber() {
    document.getElementById("otpmessage").style.display = "none";
    document.getElementById("forgotForm").style.display = "block";
    document.getElementById("mobile").disabled = false;
    document.getElementById("forgetOtpForm").style.display = "none";
    document.getElementById("otp").value = "";
}

function passwordcheck() {
    var newpass = document.getElementById("newpassword").value;
    var confirmpass = document.getElementById("confirmpassword").value;

    if(newpass == "" || newpass == null || confirmpass == "" || confirmpass == null ){
        mytoast("Fields should not be empty");
    }
    else if (!validatePassword(newpass)) {
        mytoast("Please enter password in correct format")
    }
    else if (newpass != confirmpass) {
        mytoast("Password not match")
    }
    else {
        forgotpassword(newpass);
    }
}
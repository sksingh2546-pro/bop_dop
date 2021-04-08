function validateNumber(number) {
    let regexNumber = /^\d{10}$/;
    console.log(regexNumber.test(number));
    return regexNumber.test(number);
}

function validDate(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("dob").setAttribute('max', today);
}

function validatePassword(password) {
    var regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/;
    console.log(regexPassword.test(password));
    return regexPassword.test(password);
}

function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

function otpValidate(otp) {
    var numregex = /^[0-9]+$/;
    var otplength = /^\d{4}$/;
    if ((otp.value).match(numregex) == null || (otp.value).match(otplength) == null) {
        otp.focus();
        return false;
    }
    else {
        return true;
    }
}

function validateOTP() {
    var otp = document.getElementById("otp");
    var numregex = /^[0-9]+$/;
    var otplength = /^\d{4}$/

    if (otp.value == "") {
        document.getElementById("otpBtn").style.opacity = "0.5";
        document.getElementById("otpBtn").style.cursor = "not-allowed";
        document.getElementById("otpBtn").disabled = true;
        otp.focus();
    }
    else if ((otp.value).match(numregex) == null || (otp.value).match(otplength) == null) {
        document.getElementById("otpBtn").style.opacity = "0.5";
        document.getElementById("otpBtn").style.cursor = "not-allowed";
        document.getElementById("otpBtn").disabled = true;
        otp.focus();
    }
    else {
        document.getElementById("otpBtn").style.opacity = "1";
        document.getElementById("otpBtn").style.cursor = "pointer";
        document.getElementById("otpBtn").disabled = false;
    }
}

function readcheck() {
    if (document.getElementById("morning").checked == true) {
        document.getElementById("morningTiming").style.display = "block";
    } else {
        document.getElementById("morningTiming").style.display = "none";
    }

    if (document.getElementById("afternoon").checked == true) {
        document.getElementById("afternoonTiming").style.display = "block";
    } else {
        document.getElementById("afternoonTiming").style.display = "none";
    }

    if (document.getElementById("evening").checked == true) {
        document.getElementById("eveningTiming").style.display = "block";
    } else {
        document.getElementById("eveningTiming").style.display = "none";
    }
}



function validateProfile() {
    var degree = document.getElementById("degree").value;
    var specialisation = document.getElementById("specialisation").value;
    var clinic_location = document.getElementById("location").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var email = document.getElementById("email").value;
    var no_of_handlers = document.getElementById("handlers").value;
    var alt_contact_num = document.getElementById("otherNumber").value;
    var experience = document.getElementById("experience").value;
    var reg_num  = document.getElementById("registrationNumber").value;

    if (degree != "" && specialisation != "" && clinic_location != "" && city != "" && state != "" &&
        no_of_handlers != "" && alt_contact_num != "" && validateNumber(alt_contact_num) && experience != "" && email != "" && reg_num !=""
        && validateEmail(email)
        ) {
        if (no_of_handlers > -1 && no_of_handlers < 4 ) { 
            document.getElementById("createProfileBtn").style.opacity = "1";
            document.getElementById("createProfileBtn").style.cursor = "pointer";
            document.getElementById("createProfileBtn").disabled = false;
        }
    }
    else {
        document.getElementById("createProfileBtn").style.opacity = "0.5";
        document.getElementById("createProfileBtn").style.cursor = "not-allowed";
        document.getElementById("createProfileBtn").disabled = true;
    }
}
function validateDate(dob){
    var today = new Date().toISOString().split('T')[0];
    if(dob.localecompare(today) == 1){
        return false;
    }
    return true;
}

function validateUserProfile() {
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var location = document.getElementById("location").value;
    var mobile = document.getElementById("mobile").value;

    if (name != "" && dob != "" && city != "" && state != "" && location != "" && mobile != "" &&
        (document.getElementsByName("gender")[0].checked == true ||
            document.getElementsByName("gender")[1].checked == true ||
            document.getElementsByName("gender")[2].checked == true) 
    ) {
        document.getElementById("userProfileCreate").style.opacity = "1";
        document.getElementById("userProfileCreate").style.cursor = "pointer";
        document.getElementById("userProfileCreate").disabled = false;

    }
    else {
        document.getElementById("userProfileCreate").style.opacity = "0.5";
        document.getElementById("userProfileCreate").style.cursor = "not-allowed";
        document.getElementById("userProfileCreate").disabled = true;
    }

}
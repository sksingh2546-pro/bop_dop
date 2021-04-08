function checkuserRegister(){
    var name = document.getElementById("userregname").value;
    var mobile = document.getElementById("userregmobile").value;
    var password = document.getElementById("userregpassword").value;

    if(name != "" && validateNumber(mobile) && validatePassword(password)){
        document.getElementById("userRegisterBtn").style.opacity = "1";
        document.getElementById("userRegisterBtn").style.cursor = "pointer";
        document.getElementById("userRegisterBtn").disabled = false;
       
    }
    else{
        document.getElementById("userRegisterBtn").style.opacity = "0.5";
        document.getElementById("userRegisterBtn").style.cursor = "not-allowed";
        document.getElementById("userRegisterBtn").disabled = true;
    }
}

function checkdoctorRegister(){
    var name = document.getElementById("docregname").value;
    var mobile = document.getElementById("docregmobile").value;
    var password = document.getElementById("docregpassword").value;

    if(name != "" && validateNumber(mobile) && validatePassword(password)){
        document.getElementById("doctorRegisterBtn").style.opacity = "1";
        document.getElementById("doctorRegisterBtn").style.cursor = "pointer";
        document.getElementById("doctorRegisterBtn").disabled = false;
    }
    else{
        document.getElementById("doctorRegisterBtn").style.opacity = "0.5";
        document.getElementById("doctorRegisterBtn").style.cursor = "not-allowed";
        document.getElementById("doctorRegisterBtn").disabled = true;
    }
}

var userfields = document.getElementById("userRegisterForm").getElementsByTagName("input");
console.log(userfields);
for (var i = 0; i < userfields.length; i++) {
    userfields[i].addEventListener('input', (event) => {
        console.log("input");
        checkuserRegister();
    });
    
}


var docterfields = document.getElementById("doctorRegisterForm").getElementsByTagName("input");
console.log(docterfields);
for (var i = 0; i < docterfields.length; i++) {
    docterfields[i].addEventListener('input', (event) => {
        console.log("input");
        checkdoctorRegister();
    })
}

try{
function checkFields() {

    var name = document.getElementById("name");
    var mobile = document.getElementById("mobile");
    var password = document.getElementById("password");
   
    if (name.value != "" && mobile.value != "" && validateNumber(mobile.value) &&
        password.value != "" && validatePassword(password.value) ) {

        document.getElementById("registerBtn").style.opacity = "1";
        document.getElementById("registerBtn").style.cursor = "pointer";
        document.getElementById("registerBtn").disabled = false;
    }
    
}
    var fields = document.getElementById("registerForm").getElementsByTagName("input");
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener('input', (event) => {
            if (event.target.value == "" || event.target.value == null) {
                event.target.style.border = "1px solid red";
                document.getElementById("registerBtn").style.opacity = "0.5";
                document.getElementById("registerBtn").style.cursor = "not-allowed";
                document.getElementById("registerBtn").disabled = true;
            }
            checkFields();
        })
    }
}
catch(e){
    console.log(e);
}


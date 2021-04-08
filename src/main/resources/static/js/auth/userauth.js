
    
function logout() {
    // alert("clicked");
    // sessionStorage.removeItem("usermobile");
    sessionStorage.clear();
    localStorage.clear();
    window.open("authentication/login.html","_self") 
}

function getPName(){
    var pName = document.getElementsByClassName("pName");
    for(var i= 0 ;i<pName.length;i++){
        pName[i].innerHTML = localStorage.getItem("user_name");
    }
}


try{
    if (sessionStorage.getItem('usermobile') === null) {

        document.getElementsByClassName("loginLI")[0].style.display = "inline-block";
        document.getElementsByClassName("loginLI")[1].style.display = "inline-block";
        document.getElementsByClassName("logined")[0].style.display = "none";
    }
    //Is their authentication token still valid?
    //  else if (Date.now > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
    //        window.open("AccessDenied.html", "_self");
    //  }
    else {
        document.getElementsByClassName("logined")[0].style.display = "inline-block";
        document.getElementsByClassName("logined")[1].style.display = "inline-block";
        document.getElementsByClassName("loginLI")[0].style.display = "none";
    }
}catch(err){
    console.log(err);
}


document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
});
var loginoption = document.querySelectorAll(".loginOption a");
for(let i = 0; i < loginoption.length; i++){
    loginoption[i].addEventListener("click",(event)=>{
        
        if(i == 0){
            loginoption[i].classList.add("loginactive");
            loginoption[i+1].classList.remove("loginactive");
            document.getElementById("userlogin").style.display = "block";
            document.getElementById("doctorlogin").style.display = "none";
        }else{
            loginoption[i].classList.add("loginactive");
            loginoption[i-1].classList.remove("loginactive");
            document.getElementById("userlogin").style.display = "none";
            document.getElementById("doctorlogin").style.display = "block";
        }
    });
}

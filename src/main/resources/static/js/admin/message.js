function textMessage() {
    if(localStorage.getItem("fName") != null ){
        var message =   localStorage.getItem("fName") + " " + localStorage.getItem("lName") +" is want to use your BOPDOP ";

        document.getElementsByClassName("box")[0].innerHTML += 
        '<div class="message" >'+
            '<img src="assets/img/message.png" style="border-radius:50%;">'+
            '<span class="mesText">Hey amit, '+ message +' please confirm it.</span>'+
            '<span>20 Nov</span>'+
        '</div>';
    }
    else{
        document.getElementsByClassName("box")[0].innerHTML += 
        '<div class="message">'+
            '<h5 class="ml-4">No message</h5>'+
        '</div>'; 
    }
    document.getElementsByClassName("message")[0].addEventListener("click",()=>{
        location.href = 'messagePortal.html?sender='+ localStorage.getItem("fName") +'&message='+ localStorage.getItem("fName") + " " + localStorage.getItem("lName") +" is want to use your BOPDOP ";
    })
}


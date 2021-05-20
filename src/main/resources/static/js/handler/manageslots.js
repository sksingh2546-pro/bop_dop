

document.getElementsByClassName("checkBtn")[0].addEventListener("click", () => {
    if (document.getElementById("check").checked == true) {
        document.getElementsByClassName("sideNavbar")[0].style.left = "-100%"
    }
    else if (document.getElementById("check").checked == false) {
        document.getElementsByClassName("sideNavbar")[0].style.left = "0px"
    }
});

function togglelock(element) {
    if (element.firstElementChild.checked == true) {
        element.lastElementChild.classList.remove("fa-unlock");
        element.lastElementChild.classList.add("fa-lock");
        element.style.color = "#222";
        element.style.background = "#eee";
        element.firstElementChild.checked = false;
    } else {
        element.lastElementChild.classList.remove("fa-lock");
        element.lastElementChild.classList.add("fa-unlock");
        element.firstElementChild.checked = true;
        element.style.background = "";
    }
}

function dateToggle(element) {
    if (element.parentNode.lastElementChild.checked == true) {
        
        //close Date function Call
        closeDate(element.parentNode.lastElementChild.value);

        element.setAttribute("title", "close");
        element.parentNode.firstElementChild.classList.remove("fa-unlock");
        element.parentNode.firstElementChild.classList.add("fa-lock");
        element.parentNode.style.color = "#aaa";
        element.parentNode.lastElementChild.checked = false;
       
        

    } else {
        openDate(element.parentNode.lastElementChild.value);
        element.title = "open";
        element.parentNode.firstElementChild.classList.remove("fa-lock");
        element.parentNode.firstElementChild.classList.add("fa-unlock");
        element.parentNode.lastElementChild.checked = true;
        element.parentNode.style.color = "";
    }
}

function closeDate(date){
    
    var mob_num = localStorage.getItem("doc_mobile");
    var formdata = new FormData();
    formdata.append("date",date);
    formdata.append("mob_num",mob_num);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        //    console.log(this.responseText);
           if(this.responseText == "Successfull"){
               mytoast("Date closed");
           }else{
            mytoast("Date can't closed SERVER ERROR","red");
           }
        }
    };
    xhttp.open("POST", ip + "/slot/closingDate", true);
    xhttp.send(formdata);
}

function openDate(date){
    
    var mob_num = localStorage.getItem("doc_mobile");
    var formdata = new FormData();
    formdata.append("date",date);
    formdata.append("mob_num",mob_num);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        //    console.log(this.responseText);
           if(this.responseText == "Deleted"){
            mytoast("Opened Successfully")
           }else{
               mytoast("Not opened SERVER ERROR","red");
           }
        }
    };
    xhttp.open("POST", ip + "/slot/delete", true);
    xhttp.send(formdata);
}



$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        animation: true
    });
});

var dateSlot = document.getElementsByClassName("day");
for (let i = 0; i < dateSlot.length; i++) {
    dateSlot[i].parentElement.addEventListener("click", (event) => {
        $("#instruction").hide();
        $(".timeSlot").hide();
        document.getElementsByClassName("loader")[0].style.display = "flex";

        var timeout = setTimeout(displaySlots, 1000);
    })
}

var pick = document.getElementsByClassName("day");
for (var i = 0; i < pick.length; i++) {
    pick[i].parentElement.addEventListener('click', (event) => {
        for (var n = 0; n < pick.length; n++) {
            pick[n].parentElement.classList.remove("picked");
        }
        if (event.target.className == "day" || event.target.className == "week") {
            event.target.parentElement.classList.add("picked");
            var paramdate = event.target.parentElement.nextElementSibling.value;
            var checkdate = event.target.parentElement.nextElementSibling.checked;
            getTimeSlot(paramdate,checkdate);
        }
        else {
            event.target.classList.add("picked");
            var paramdate = event.target.nextElementSibling.value;
            var checkdate = event.target.nextElementSibling.checked;
            getTimeSlot(paramdate,checkdate);
        }
    })
}

function displaySlots() {
    document.getElementsByClassName("loader")[0].style.display = "none";
    $(".timeSlot").fadeIn(1000);
}


function addslots() {
    document.getElementsByClassName("loaderimg")[0].style.display = "inline";
    var slot = "";
    var lock = document.getElementsByClassName("lock");
    var date = document.getElementsByClassName("picked")[0].nextElementSibling.value;
    for (let i = 0; i < lock.length; i++) {
        if (lock[i].checked == false) {
            slot = slot + lock[i].value + ",";
        }
    }
    console.log(slot + date);

    var mob_num = localStorage.getItem("doc_mobile");
    var formdata = new FormData();
    formdata.append("date", date);
    formdata.append("mob_num", mob_num);
    formdata.append("slot", slot);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementsByClassName("loaderimg")[0].style.display = "none";
            mytoast("Update slots successfully");
        }
    };
    xhttp.open("POST", ip + "/slot/closing", true);
    xhttp.send(formdata);
}

$('#slothelp').popover({
    html: true,
    animation: true,
    content: '<ul><li><i class="fas fa-unlock mr-2" ></i> means open slot</li>  <li><i class="fas fa-lock mr-2" ></i> means close slot</li></ul>'
})

function restrictDate(datearray) {
    var manageDate = document.getElementsByClassName("apdate");
    // console.log(manageDate[0])
    datearray.forEach(date => {
        for (let i = 0; i < manageDate.length; i++) {
            if (date.dates == manageDate[i].value) {
                // console.log(manageDate[i])
                // console.log(manageDate[i].parentNode.firstElementChild)
                manageDate[i].parentNode.firstElementChild.classList.remove("fa-unlock");
                manageDate[i].parentNode.firstElementChild.classList.add("fa-lock");
                manageDate[i].parentNode.style.color = "#aaa";
                manageDate[i].parentNode.lastElementChild.checked = false;
                manageDate[i].setAttribute("title", "close");
            }
        }
    });
}

function getDateSlot() {
    var mob_num = localStorage.getItem("doc_mobile");
    var formdata = new FormData();
    formdata.append("mob_num", mob_num)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText != ""){
                var result = JSON.parse(this.responseText);
                // console.log(result)
                restrictDate(result);
            }
        }
    };
    xhttp.open("POST", ip + "/slot/get_closed_date", true);
    xhttp.send(formdata);
}

function restrictTime(timearray) {
    var manageSlot = document.getElementsByClassName("lock");

    timearray.forEach(time => {
        for (let i = 0; i < manageSlot.length; i++) {
            if (time == manageSlot[i].value) {
                // console.log(manageSlot[i])
                manageSlot[i].parentElement.lastElementChild
                manageSlot[i].parentElement.lastElementChild.classList.remove("fa-unlock");
                manageSlot[i].parentElement.lastElementChild.classList.add("fa-lock");
                manageSlot[i].parentElement.style.color = "#222";
                manageSlot[i].parentElement.style.background = "#eee";
                manageSlot[i].parentElement.firstElementChild.checked = false;
            }
        }
    });
}

function getTimeSlot(dateparam,check) {
    var date = dateparam;
    var mob_num = localStorage.getItem("doc_mobile");
    var formdata = new FormData();
    formdata.append("mob_num", mob_num);
    formdata.append("date", date);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            reset();
            if(this.responseText != ""){
                var result = JSON.parse(this.responseText)[0].closed_slots;
                result = result.split(",");
                // console.log(result);
                //
                restrictTime(result);
            }else{
                // console.log(check)
                if(check == false){
                    document.getElementById("overlay").style.display = "flex";
                }
            }   
        }
    };
    xhttp.open("POST", ip + "/slot/get_closed_slot", true);
    xhttp.send(formdata);
}

function reset(){
    var element = document.getElementsByClassName("slot");
    document.getElementById("overlay").style.display = "none";
    for(let i=0;i<element.length;i++){
        element[i].lastElementChild.classList.remove("fa-lock");
        element[i].lastElementChild.classList.add("fa-unlock");
        element[i].firstElementChild.checked = true;
        element[i].style.background = "";

    }
}

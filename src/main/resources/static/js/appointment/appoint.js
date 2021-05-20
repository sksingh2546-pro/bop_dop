
var d = new Date();
document.getElementsByClassName("Showmonth")[0].innerHTML = d.toDateString()
// d.setDate(30);
// d.setMonth(11);
var next = new Date();

function isLeapYear(Year) {
    if (((Year % 4) === 0) && ((Year % 100) !== 0)
        || ((Year % 400) === 0)) {
        return (true);
    } else {
        return (false);
    }
}

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayPerMonth = [31, isLeapYear(d.getFullYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var week = document.getElementsByClassName("week");
var day = document.getElementsByClassName("day");
var apdate = document.getElementsByClassName("apdate");
var j = d.getDay();
var k = d.getDate();


for (var i = 0; i < week.length; i++) {

    if (j > 6) {
        j = 0;
    }
    week[i].innerHTML = days[j];
    if (k > dayPerMonth[d.getMonth()]) {
        k = 1;
        d.setMonth(d.getMonth() + 1);
        d.setDate(1);
    }
    day[i].innerHTML = k;
    apdate[i].value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + k;

    // console.log(apdate[i]);
    j++;
    k++;
}
function clickListener() {
    var checks = document.getElementsByClassName("slot");
    for (var i = 0; i < checks.length; i++) {
        checks[i].addEventListener("click", (event) => {
            for (var m = 0; m < checks.length; m++) {
                checks[m].getElementsByTagName("i")[0].classList.remove("fas");
                checks[m].getElementsByTagName("i")[0].style.display = "none";
                checks[m].getElementsByTagName("i")[0].style.color = "grey";
                checks[m].style.border = "1px solid #eee";
                checks[m].classList.remove("pickedTime");
            }

            if (event.target.className == "singleSlot") {
                event.path[1].getElementsByTagName("i")[0].classList.add("fas");
                event.path[1].getElementsByTagName("i")[0].style.display = "inline";
                event.path[1].getElementsByTagName("i")[0].style.color = "var(--secondary)";
                event.path[1].style.border = "1px solid var(--secondary)";
                event.path[1].classList.add("pickedTime");
            } else {
                event.target.getElementsByTagName("i")[0].classList.add("fas");
                event.target.getElementsByTagName("i")[0].style.color = "var(--secondary)";
                event.target.getElementsByTagName("i")[0].style.display = "inline";
                event.target.style.border = "1px solid var(--secondary)";
                event.target.classList.add("pickedTime");
            }
        });
    }
    var pick = document.getElementsByClassName("pick");
    for (var i = 0; i < pick.length; i++) {
        pick[i].addEventListener('click', (event) => {

            for (var n = 0; n < pick.length; n++) {
                pick[n].classList.remove("picked");
            }
            if (event.target.className == "day" || event.target.className == "week") {
                event.path[1].classList.add("picked");
                var paramdate = event.target.parentElement.lastElementChild.value;

                var checkdate = event.target.parentElement.lastElementChild.checked;
                // console.log(paramdate)
                $("#instruction").hide();
                $(".timeSlot").hide();
                document.getElementsByClassName("loader")[0].style.display = "flex";

                fetchSlot(paramdate, checkdate);
                var d2 = new Date();
                var tempDate = d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
                if (paramdate == tempDate) {
                    slotHideByCurrentTime();
                }
            }

            else {
                event.target.classList.add("picked");
            }
        })
    }

    /*********************** checkout data *************************/
    document.getElementById("nextBtn").addEventListener('click', () => {
        // console.log(document.getElementsByClassName("picked").length);
        var status = "";
        if (document.getElementsByClassName("picked").length <= 0) {
            mytoast("ERROR: Select Appointment Date !! ", "red");

        }
        else if (document.getElementsByClassName("pickedTime").length <= 0) {
            mytoast("ERROR: Select Appointment Slot !! ", "red")

        }
        else {
            try {
                var ap_date = document.getElementsByClassName("picked")[0].getElementsByTagName("input")[0].value;
                // console.log(ap_date);
                var ap_time = document.getElementsByClassName("pickedTime")[0].getElementsByClassName("slotvalue")[0].value;
                // console.log(ap_time)
                var temp = document.getElementsByClassName("picked")[0].getElementsByTagName("span");
                // var date = temp[0].innerHTML + " " + temp[1].innerHTML + " " + d.getFullYear();
                // console.log(document.getElementsByClassName("pickedTime")[0].getElementsByClassName("singleSlot")[0].innerHTML);
                takeAppointment(ap_date, ap_time);
            }
            catch (err) {
                // console.log(err.message);
            }

        }
    });
}
function getAppointData() {
    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams.get('dname'));

    let myDiv = document.getElementsByClassName("doctorENTITY")[0];
    // console.log(myDiv.getElementsByClassName("docSpecs")[0].innerText);

    myDiv.getElementsByClassName("docSpecs")[0].innerHTML = decodeURI(urlParams.get('dspec')) + ", " + decodeURI(urlParams.get('degree').toUpperCase());
    myDiv.getElementsByClassName("doc_name")[0].innerHTML = "Dr. " + decodeURI(urlParams.get('dname'));
    document.getElementsByClassName("cName")[0].innerHTML = decodeURI(urlParams.get('clinicname'));

}

function takeAppointment(date, time) {


    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);

    var patient_name = localStorage.getItem("user_name");
    var mob_numb = localStorage.getItem("user_mobile");
    var doc_id = urlParams.get('dnum');

    var form = new FormData();
    form.append("date", date);
    form.append("time", time);
    form.append("patient_name", patient_name);
    form.append("mob_numb", mob_numb);
    form.append("doc_id", parseInt(doc_id));
    // console.log(parseInt(doc_id))
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);

            if (this.responseText == "Successfull") {
                mytoast("Successfully save your details");
                // console.log("Done");
                location.href = "success.html";
                localStorage.removeItem("t");
            } else if (this.responseText == "Exist") {
                mytoast("You have already applied for an appointment. Back to home");
            } else {
                // console.log("No");
            }
        }
    };
    xhttp.open("POST", ip + "/appointment/take_apt", true);
    xhttp.send(form);

}
function fetchSlot(date, dateStatus) {

    if (dateStatus) {
        reset();
        var queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        var doc_id = urlParams.get("dnum");

        var formdata = new FormData();
        formdata.append("date", date);
        formdata.append("doc_id", doc_id);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);

                if (this.responseText != "") {
                    var result = JSON.parse(this.responseText)[0].closed_slots.split(",");
                    var slots = document.getElementsByClassName("slotvalue");
                    // console.log(slots);
                    for (let i = 1; i < slots.length; i++) {
                        result.forEach(element => {
                            if (slots[i].value == element) {
                                // console.log("in")
                                slots[i].parentElement.style.display = "none";
                            }
                        });
                    }

                }
                var timeout = setTimeout(displaySlots, 100);
            }
        };
        xhttp.open("POST", ip + "/patient/get_closed_slot", true);
        xhttp.send(formdata);

    }
    else {
        document.getElementsByClassName("loader")[0].style.display = "none";
        document.getElementById("overlay").style.display = "flex";
        mytoast("Doctor is not avialable");
    }
}

function lockDate(datearray) {
    var manageDate = document.getElementsByClassName("apdate");
    // console.log(manageDate[0])
    datearray.forEach(date => {
        for (let i = 0; i < manageDate.length; i++) {
            if (date.dates == manageDate[i].value) {
                // console.log(manageDate[i].value);
                manageDate[i].parentElement.style.color = "#ccc";
                manageDate[i].parentElement.style.cursor = "not-allowed";
                manageDate[i].parentElement.lastElementChild.checked = false;
            }
        }
    });
}

function fetchDate() {
    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);

    var doc_id = parseInt(urlParams.get('dnum').trim());
    var formdata = new FormData();
    formdata.append("doc_id", doc_id);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                // console.log(result);
                lockDate(result);
            }
        }
    };
    xhttp.open("POST", ip + "/patient/get_closed_date", true);
    xhttp.send(formdata);
}

function reset() {
    var element = document.getElementsByClassName("slot");
    document.getElementById("overlay").style.display = "none";
    for (let i = 0; i < element.length; i++) {

        element[i].style.display = "block";
    }
}
function displaySlots() {
    document.getElementsByClassName("loader")[0].style.display = "none";
    $(".timeSlot").fadeIn(1000);
}

function slotHideByCurrentTime() {
    // console.log("hide");
    var d = new Date().getHours();
    var slots = document.getElementsByClassName("slotvalue");
    // console.log(slots);
    for (let i = 0; i < slots.length; i++) {

        if (parseInt(slots[i].value.split(":")[0]) <= d+1) {
            // console.log("in")
            slots[i].parentElement.style.display = "none";
        }

    }
}

// var inter = setInterval(slotHideByCurrentTime,1000);
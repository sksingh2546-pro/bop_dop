
function getLive_opd_handler() {
    var xml = new XMLHttpRequest();
    var mob = localStorage.getItem("doc_mobile");
    
    var formdata = new FormData();
    formdata.append("mob_num", mob.trim());

    xml.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            document.getElementById("liveOPD").value = this.responseText;
        }
    }
    xml.open("POST",ip+ "/live/live_info", true);
    xml.send(formdata);
}


function addOPD() {
    var live = document.getElementById("liveOPD").value;
    var addValue = parseInt(live) + 1;
    document.getElementById("liveOPD").value = addValue;
    console.log("value is : " + addValue)

    var xml = new XMLHttpRequest();
    var mob = localStorage.getItem("doc_mobile");
    var livopd = addValue;

    var formData = new FormData();
    formData.append("mob_num", mob);
    formData.append("live_opd", livopd);

    xml.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            alert("current token number is " + livopd)
        }
    }

    xml.open("POST", ip+"/live/updates", true);
    console.log("sending data !")
    xml.send(formData);
}

function minusOPD() {
    var live = document.getElementById("liveOPD").value;
    if (parseInt(live) > 0) {
        var minusValue = parseInt(live) - 1;
        document.getElementById("liveOPD").value = minusValue;
    }
    else { minusValue = 0; }
    

    var xml = new XMLHttpRequest();

    var mob = localStorage.getItem("doc_mobile");
    var livopd = minusValue;

    var formData = new FormData();
    formData.append("mob_num", mob);
    formData.append("live_opd", livopd);

    xml.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            alert("current token number is " + livopd)
        }
    }
    xml.open("POST", ip+"/live/updates", true);
    console.log("sending minus value !")
    xml.send(formData);
}

function appointed() {
    //var doc_name = localStorage.getItem("name");
    var mob_num = localStorage.getItem("doc_mobile");
    var formData = new FormData();

    //formData.append("doc_name", doc_name);
    formData.append("mob_num", mob_num);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(element => {
                    document.getElementById("appointedTable").innerHTML +=
                        '<tr>' +
                        '<td><span class="token-number">' + element.token_no_reason + '</span></td>' +
                        '<td>' + element.patient_name + '</td>' +
                        '<td>' + element.gender + '</td>' +
                        '<td>' + element.age + '</td>' +
                        '<td>' + element.contact + '</td>' +
                        '<td>' + element.apt_date + '</td>' +
                        '<td>' + element.slot + '</td>' +
                        '<td><button class="btn btn-outline-success" data-key="' + element.apt_id +
                        '" onclick="visited(this)">Mark Visited <i class="fas fa-check"></i></button></td>' +
                        '</tr>';
                });

            }
            $("#dataTable").DataTable();

        }
    };
    xhttp.open("POST", ip + "/appointment/approved_appointments", true);
    xhttp.send(formData);
}

function visited(element) {
    var action = confirm("Are You Sure");
    if (action == true) {
        var formData = new FormData();
        var key = element.getAttribute("data-key");
        formData.append("apt_id", key);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                if (this.responseText == "Done") {

                    location.reload();
                }
            }
        };
        xhttp.open("POST", ip + "/appointment/done_appointment", true);
        xhttp.send(formData);
    }
}

function visitedPatientList() {
    var formData = new FormData();
    var mob_num = localStorage.getItem("doc_mobile")
    formData.append("mob_num", mob_num);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(element => {
                    document.getElementById("totalPatientTable").innerHTML +=
                        '<tr>' +
                        '<td>' + element.token_no_reason + '</td>' +
                        '<td>' + element.patient_name + '</td>' +
                        '<td>' + element.gender + '</td>' +
                        '<td>' + element.age + '</td>' +
                        '<td>' + element.contact + '</td>' +
                        '<td>' + element.apt_date + '</td>' +
                        '<td>' + element.slot + '</td>' +

                        '</tr>';
                });
            }

        }
    };
    xhttp.open("POST", ip + "/appointment/visited_patients_data", true);
    xhttp.send(formData);

}

function allPatients() {
    var formData = new FormData();
    var mob_num = localStorage.getItem("doc_mobile")
    formData.append("mob_num", mob_num);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(element => {
                    document.getElementById("totalPatientTable").innerHTML +=
                        '<tr>' +
                        '<td>' + element.patient_name + '</td>' +
                        '<td>' + element.gender + '</td>' +
                        '<td>' + element.age + '</td>' +
                        '<td>' + element.contact + '</td>' +
                        '<td>' + element.apt_date + '</td>' +
                        '<td>' + element.slot + '</td>' +
                        '<td><span class="status status-' + element.status + '">' + element.status + '</span></td>' +
                        '</tr>';
                });
                
            }
            $("#dataTable").DataTable();

        }
    };
    xhttp.open("POST", ip + "/doctor/all_patients_list", true);
    xhttp.send(formData);

}

function todayPatients(){
    var formData = new FormData();
    var mob_num = localStorage.getItem("doc_mobile")
    formData.append("mob_num", mob_num);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(element => {
                    document.getElementById("todayPatientTable").innerHTML +=
                        '<tr>' +
                        '<td>' + element.patient_name + '</td>' +
                        '<td>' + element.gender + '</td>' +
                        '<td>' + element.age + '</td>' +
                        '<td>' + element.contact + '</td>' +
                        '<td>' + element.apt_date + '</td>' +
                        '<td>' + element.slot + '</td>' +
                        '<td><span class="status status-' + element.status + '">' + element.status + '</span></td>' +
                        '</tr>';
                });
                
            }
            $("#dataTable").DataTable();

        }
    };
    xhttp.open("POST", ip + "/doctor/all_today_patients", true);
    xhttp.send(formData);
}
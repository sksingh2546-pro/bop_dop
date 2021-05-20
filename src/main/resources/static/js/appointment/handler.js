
function seeDoctor() {
    var doctor = localStorage.getItem("doc_name");
    document.getElementById("doctor_name").value = "Dr. " + doctor;
}

function awaitingList() {
    var formData = new FormData();
    formData.append("mob_num", localStorage.getItem("doc_mobile"));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                // console.log(result);
                result.forEach(element => {
                    let slot = tConvert(element.slot);
                    let apt_date = moment(element.apt_date,"YYYY MM DD").format("LL");
                    document.getElementById("requestedTable").innerHTML +=
                        '<tr>' +
                        '<td>' + element.patient_name + '</td>' +
                        '<td>' + element.gender + '</td>' +
                        '<td>' + element.age + '</td>' +
                        '<td>' + element.contact + '</td>' +
                        '<td>' + apt_date + '</td>' +
                        '<td>' + slot + '</td>' +
                        '<td>' +
                        '<button class="btn btn-warning" data-toggle="modal" data-target="#acceptModal" data-key="' + element.apt_id + 
                        '" onclick="getkey(this)">Accept <i class="fas fa-check ml-2"></i></button>' +
                        '<button class="btn btn-danger ml-2" data-toggle="modal" data-target="#rejectModal" data-key="' + element.apt_id + 
                        '" onclick="getkey(this)">Reject <i class="fas fa-times ml-2"></i></button>' +
                        '</td>' +
                        '</tr>';
                });
            }
            $('#dataTable').DataTable(); //Table Initialization
        }
    };
    xhttp.open("POST", ip + "/appointment/awaiting_appointments", true);
    xhttp.send(formData);
}


function getkey(element) {
    var key = element.getAttribute("data-key");
    document.getElementById("approveBtn").setAttribute("onclick", "giveToken(this)");
    document.getElementById("approveBtn").setAttribute("data-key", key);
    document.getElementById("cancelBtn").setAttribute("onclick", "giveReason(this)");
    document.getElementById("cancelBtn").setAttribute("data-key", key);
}

function giveToken(element) {
    var token = document.getElementById("tokenNumber").value;
	if(token.trim() != ""){
    var formData = new FormData();
    formData.append("apt_id", parseInt(element.getAttribute("data-key")));
    formData.append("token", token)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            location.reload();
        }
    };
    xhttp.open("POST", ip + "/appointment/apt_status_approve", true);
    xhttp.send(formData);
    }else{
    	alert("Field should not be empty");
    }
}

function giveReason(element) {
    var reason = document.getElementById("reason").value;
	if(reason.trim() != ""){
    var formData = new FormData();
    formData.append("apt_id", parseInt(element.getAttribute("data-key")));
    formData.append("reason", reason)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            location.reload();
        }
    };
    xhttp.open("POST", ip + "/appointment/apt_status_cancel", true);
    xhttp.send(formData);
    }else{
    	alert("Field should not be empty");
    }
}

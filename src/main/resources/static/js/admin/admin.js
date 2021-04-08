
function getdoctorlist() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(data => {
                    document.getElementById("doctor_data").innerHTML +=
                        '<tr>' +
                        '<td>' + data.doctor_name + '</td>' +
                        '<td>' + data.degree + '</td>' +
                        '<td>' + data.registration_number + '</td>' +
                        '<td>' + data.specialisation + '</td>' +
                        '<td>' + data.applied_date + '</td>' +
                        '<td>' +
                        '<i class="fas fa-money-check text-primary detailBtn" onclick="getDoctorDetail(this)" data-details="' + data.doctor_id + '">' +
                        '</i>' +
                        '</td>' +
                        '</tr>';
                });
                clickOnRow();

            }
            $("#dataTable").DataTable({
                "order": [[4, "desc"]]
            });
        }
    };
    xhttp.open("GET", ip + "/admin/on_hold_doctors", true);
    xhttp.send();
}

function getDoctorDetail(element) {
    var doc_id = element.getAttribute("data-details");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            document.getElementById("odoctor_name").innerHTML = "Dr. " + result.doctor_name;
            document.getElementById("oclinicName").innerHTML = result.clinic_name;
            document.getElementById("oqualification").innerHTML = result.degree;
            document.getElementById("ospecialization").innerHTML = result.specialisation;
            document.getElementById("oyear").innerHTML = "experience : " + result.experience + "years";
            document.getElementById("omobile").innerHTML = result.mob_number;
            document.getElementById("oemail").innerHTML = result.emial;
            document.getElementById("ohandlers").innerHTML = "Handlers : " + result.no_of_handlers;
            document.getElementById("oaddress").innerHTML = result.clinic_location;
            document.getElementById("ocity").innerHTML = result.city;
            document.getElementById("ostate").innerHTML = result.state;
            document.getElementById("oaltNumber").innerHTML = result.alt_contact_num;
            document.getElementById("oregistrationNumber").innerHTML = "Registration Number : " + result.registration_number;
            document.getElementById("acceptBtn").setAttribute("onclick", "acceptdoctor(" + result.doctor_id + ")");
            document.getElementById("rejectBtn").setAttribute("onclick", "rejectdoctor(" + result.doctor_id + ")");
        }
    };
    xhttp.open("GET", ip + "/admin/get_doctor_data?doc_id=" + doc_id, true);
    xhttp.send();
}

function acceptdoctor(id) {
    document.getElementsByClassName("loaderimg")[1].style.display = "inline";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "Successfull") {
                mytoast("Accepted")
                location.reload();
            } else {
                mytoast("Error in accept")
                document.getElementsByClassName("loaderimg")[1].style.display = "none";
            }
        }
    };
    xhttp.open("GET", ip + "/admin/accept?doc_id=" + id, true);
    xhttp.send();
}
function rejectdoctor(id) {
    document.getElementsByClassName("loaderimg")[2].style.display = "inline";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "Successfull") {
                mytoast("Accepted")
                location.reload();
            } else {
                mytoast("Error in accept");
                document.getElementsByClassName("loaderimg")[2].style.display = "none";
            }
        }
    };
    xhttp.open("GET", ip + "/admin/decline?doc_id=" + id, true);
    xhttp.send();
}

function adminlogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var formData = new FormData();
    formData.append("u_name", username);
    formData.append("password", password);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "admin") {
                mytoast("Login Successfully");
                sessionStorage.setItem("AdminAuth", "Authenticated");
                location.href = "index.html";
            } else {
                mytoast("check you username or password", "red");
            }
        }
    };
    xhttp.open("POST", ip + "/admin/admin_login", true);
    xhttp.send(formData);
}

function adminlogout() {
    sessionStorage.clear();
    location.href = "login.html"
}

function addDoctor() {
    document.getElementsByClassName("loaderimg")[0].style.display = "inline";
    document.getElementById("createProfileBtn").disabled = "true";
    var doc_name = document.getElementById("name").value;
    var degree = document.getElementById("degree").value;
    var specialisation = document.getElementById("specialisation").value;
    var clinic_location = document.getElementById("location").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var emial = document.getElementById("email").value;
    var no_of_handlers = document.getElementById("handlers").value;
    var alt_contact_num = document.getElementById("otherNumber").value;
    var experience = document.getElementById("experience").value;
    var clinic_name = document.getElementById("clinicName").value;
    var mobile = document.getElementById("mobile").value;
    var reg_num = document.getElementById("registrationNumber").value;

    var opd_timing = "";
    if (document.getElementById("morning").checked == true) {
        opd_timing = "M=" + document.getElementById("morningTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("morningTiming").getElementsByTagName("input")[1].value;
    }
    if (document.getElementById("afternoon").checked == true) {
        opd_timing += "A=" + document.getElementById("afternoonTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("afternoonTiming").getElementsByTagName("input")[1].value;
    }
    if (document.getElementById("evening").checked == true) {
        opd_timing += "E=" + document.getElementById("eveningTiming").getElementsByTagName("input")[0].value + " to " +
            document.getElementById("eveningTiming").getElementsByTagName("input")[1].value;
    }

    var temp = {
        "doctor_name": doc_name,
        "mob_number": mobile,
        "degree": degree,
        "specialisation": specialisation,
        "clinic_location": clinic_location,
        "city": city,
        "state": state,
        "emial": emial,
        "no_of_handlers": parseInt(no_of_handlers),
        "experience": parseInt(experience),
        "alt_contact_num": alt_contact_num,
        "opd_timing": opd_timing,
        "mob_number": mobile,
        "clinic_name": clinic_name,
        "registration_number": reg_num,

    }
    console.log(temp);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "UnSuccessfull") {
                mytoast("Error in adding data")
            } else if (this.responseText == "Doctor_exist") {
                mytoast("doctor exist")
            } else {
                mytoast("Added " + this.responseText)
            }
            document.getElementsByClassName("loaderimg")[0].style.display = "none";
            document.getElementById("createProfileBtn").disabled = "false";
        }
    };
    xhttp.open("POST", ip + "/admin/add_doctor", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(temp));
}

function workingdoctorlist() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(data => {
                    document.getElementById("workingDoctorsTable").innerHTML +=
                        '<tr>' +
                        '<td>' + data.doctor_name + '</td>' +
                        '<td>' + data.degree + '</td>' +
                        '<td>' + data.patients_seen + '</td>' +
                        '<td>' + data.specialisation + '</td>' +
                        '<td>' + data.applied_date + '</td>' +
                        '<td>' +
                        '<i class="fas fa-money-check text-primary detailBtn" onclick="getWorkingDoctorDetail(this)" data-details="' + data.doctor_id + '">' +
                        '</i>' +
                        '</td>' +
                        '</tr>';
                });
                clickOnRow();

            }
            $("#dataTable").DataTable({
                "order": [[4, "desc"]]
            });
        }
    };
    xhttp.open("GET", ip + "/admin/working_doctors", true);
    xhttp.send();
}

function getWorkingDoctorDetail(element) {
    var doc_id = element.getAttribute("data-details");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            document.getElementById("doctor_name").innerHTML = "Dr. " + result.doctor_name;
            document.getElementById("clinicName").innerHTML = result.clinic_name;
            document.getElementById("qualification").innerHTML = result.degree;
            document.getElementById("specialization").innerHTML = result.specialisation;
            document.getElementById("year").innerHTML = "experience : " + result.experience + "years";
            document.getElementById("mobile").innerHTML = result.mob_number;
            document.getElementById("email").innerHTML = result.emial;
            document.getElementById("handlers").innerHTML = "Handlers : " + result.no_of_handlers;
            document.getElementById("address").innerHTML = result.clinic_location;
            document.getElementById("city").innerHTML = result.city;
            document.getElementById("state").innerHTML = result.state;
            document.getElementById("altNumber").innerHTML = result.alt_contact_num;
            document.getElementById("registrationNumber").innerHTML = "Registration Number : " + result.registration_number;
            document.getElementById("deleteBtn").innerHTML = "Delete";
            document.getElementById("deleteBtn").setAttribute("onclick", "deletedoctor(" + result.doctor_id + ")");
        }
    };
    xhttp.open("GET", ip + "/admin/get_doctor_data?doc_id=" + doc_id, true);
    xhttp.send();
}

function deletedoctor(id) {
    var res = confirm("Are you sure you want to delete this doctor");

    if (res == true) {
        // document.getElementsByClassName("loaderimg")[0].style.display = "inline";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                if (this.responseText == "Successfull") {
                    mytoast("Deleted")
                    location.reload();
                } else {
                    mytoast("Error in delete", "red");
                    // document.getElementsByClassName("loaderimg")[0].style.display = "none";
                }
            }
        };
        xhttp.open("GET", ip + "/admin/delete_doc?doc_id=" + id, true);
        xhttp.send();
    }
}

function counts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                document.getElementById("totalPatient").innerHTML = result.pt_count;
                document.getElementById("totalDoctor").innerHTML = result.doc_count;
            }
        }
    };
    xhttp.open("GET", ip + "/admin/counts", true);
    xhttp.send();

}

function deletedDoctorList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result);
                result.forEach(data => {
                    document.getElementById("deletedDoctorsTable").innerHTML +=
                        '<tr>' +
                        '<td>' + data.doctor_name + '</td>' +
                        '<td>' + data.degree + '</td>' +
                        '<td>' + data.patients_seen + '</td>' +
                        '<td>' + data.specialisation + '</td>' +
                        '<td>' + data.applied_date + '</td>' +
                        '<td>' +
                        '<i class="fas fa-money-check text-primary detailBtn" onclick="getDeletedDoctorDetail(this)" data-details="' + data.doctor_id + '">' +
                        '</i>' +
                        '</td>' +
                        '</tr>';
                });
                clickOnRow();

            }
            $("#dataTable2").DataTable({
                "order": [[4, "desc"]]
            });
        }
    };
    xhttp.open("GET", ip + "/admin/delete_doctors", true);
    xhttp.send();
}

function getDeletedDoctorDetail(element) {
    var doc_id = element.getAttribute("data-details");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            document.getElementById("doctor_name").innerHTML = "Dr. " + result.doctor_name;
            document.getElementById("clinicName").innerHTML = result.clinic_name;
            document.getElementById("qualification").innerHTML = result.degree;
            document.getElementById("specialization").innerHTML = result.specialisation;
            document.getElementById("year").innerHTML = "experience : " + result.experience + "years";
            document.getElementById("mobile").innerHTML = result.mob_number;
            document.getElementById("email").innerHTML = result.emial;
            document.getElementById("handlers").innerHTML = "Handlers : " + result.no_of_handlers;
            document.getElementById("address").innerHTML = result.clinic_location;
            document.getElementById("city").innerHTML = result.city;
            document.getElementById("state").innerHTML = result.state;
            document.getElementById("altNumber").innerHTML = result.alt_contact_num;
            document.getElementById("registrationNumber").innerHTML = "Registration Number : " + result.registration_number;
            document.getElementById("deleteBtn").innerHTML = "Activate";
            document.getElementById("deleteBtn").setAttribute("onclick", "activatedoctor(" + result.doctor_id + ")");
        }
    };
    xhttp.open("GET", ip + "/admin/get_doctor_data?doc_id=" + doc_id, true);
    xhttp.send();
}

function activatedoctor(id) {
    var res = confirm("Are you sure you want to activate this doctor");

    if (res == true) {
        // document.getElementsByClassName("loaderimg")[0].style.display = "inline";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                if (this.responseText == "Successfull") {
                    mytoast("Activated")
                    location.reload();
                } else {
                    mytoast("Error in activated", "red");
                    // document.getElementsByClassName("loaderimg")[0].style.display = "none";
                }
            }
        };
        xhttp.open("GET", ip + "/admin/reactive_doc?doc_id=" + id, true);
        xhttp.send();
    }
}

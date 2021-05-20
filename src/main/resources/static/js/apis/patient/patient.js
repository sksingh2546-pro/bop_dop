
function patientHistory() {
    var mobile = localStorage.getItem("user_mobile");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                

                document.getElementById("historyTable").innerHTML = "";
                result.forEach(data => {
                    if (data.apt_status == "approve") {
                        document.getElementById("historyTable").innerHTML += "<tr onclick='checkAppointmentStatus(" + data.apt_id + ")'> " +
                            '<td>' + moment(data.date,"YYYY MM DD").format("LL") + '</td>' +
                            '<td>' + tConvert(data.time_slot) + '</td>' +
                            '<td> Dr. ' + data.doctor + '</td>' +
                            '<td>' + data.clinic_name + '</td>' +
                            '<td><span class="status ' + data.apt_status + '1">' + data.apt_status + '</td>' +
                            '<tr>';
                    } 
                    else if(data.apt_status == "await"){
                        document.getElementById("historyTable").innerHTML += 
                        "<tr onclick='getAwaitData(this,"+ data.apt_id +")'" +
                        "data-toggle='modal' data-target='#cancelAppointment' data-id='" + data.apt_id + "'> " +
                            '<td>' + moment(data.date,"YYYY MM DD").format("LL") + '</td>' +
                            '<td>' + tConvert(data.time_slot) + '</td>' +
                            '<td> Dr. ' + data.doctor + '</td>' +
                            '<td>' + data.clinic_name + '</td>' +
                            '<td><span class="status ' + data.apt_status + '1">' + data.apt_status + '</td>' +
                        '<tr>';
                    }
                    else {
                        document.getElementById("historyTable").innerHTML += "<tr > " +
                            '<td>' + moment(data.date,"YYYY MM DD").format("LL") + '</td>' +
                            '<td>' + tConvert(data.time_slot) + '</td>' +
                            '<td> Dr. ' + data.doctor + '</td>' +
                            '<td>' + data.clinic_name + '</td>' +
                            '<td><span class="status ' + data.apt_status + '1">' + data.apt_status + '</td>' +
                            '<tr>';
                    }
                });
            }
        }
    };
    xhttp.open("GET", ip + "/patient/history?mob_num=" + mobile, true);
    xhttp.send();
}

function currentStatus() {
    document.getElementsByClassName("appointment")[0].style.display = "block";
    var mobile = localStorage.getItem("user_mobile");
    var formData = new FormData();
    formData.append("mob_num", mobile)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            if (this.responseText == "await") {
                document.getElementsByClassName("await")[0].style.display = "block";
                document.getElementsByClassName("appointmentExist")[0].style.display = "none";
                document.getElementsByClassName("appointment")[0].style.display = "none";
            }
            else if (this.responseText == "") {
                document.getElementsByClassName("await")[0].style.display = "none";
                document.getElementsByClassName("appointmentExist")[0].style.display = "none";
                document.getElementsByClassName("appointment")[0].style.display = "block";
            }
            else {
                document.getElementsByClassName("await")[0].style.display = "none";
                document.getElementsByClassName("appointmentExist")[0].style.display = "block";
                document.getElementsByClassName("appointment")[0].style.display = "none";

                var result = JSON.parse(this.responseText);
               
                document.getElementById("doc_name").innerHTML = "Dr. " + result.doc_name.toUpperCase();
                document.getElementById("time").innerHTML = "Time Slot : " + tConvert(result.time);
                document.getElementById("date").innerHTML = "Date : " +  moment(result.date,"YYYY MM DD").format("LL") ;
                document.getElementById("clinic_address").innerHTML = "Address : "+result.clinic + ", "  + result.location ;
                document.getElementById("token_no").innerHTML = "Token number : " + result.token;
                document.getElementById("live_opd").innerHTML = "Current Token Number : " + result.live;
                sessionStorage.setItem("did", result.doc_id);
            }
        }
    };
    xhttp.open("POST", ip + "/appointment/latest_apt", true);
    xhttp.send(formData);
}

// User Profile Data
function getProfileData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            var result = JSON.parse(this.responseText);
            if (this.responseText != "") {
                document.getElementById("name").value = result.patient_name;
                document.getElementById("city").value = result.city;
                document.getElementById("state").value = result.state;
                document.getElementById("mobile").value = result.mob_number;
                document.getElementById("address").value = result.address;
                document.getElementById("email").value = result.email;
                document.getElementById("gender").value = result.gender;
                document.getElementById("dob").value = result.age;
            }
        }
    };
    xhttp.open("GET", ip + "/patient/pt_profile?mob_num=" + localStorage.getItem("user_mobile"), true);
    xhttp.send();
}
// Disable Enable Fields
function editUserProfile() {
    var inputs = document.getElementById("profile").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id == "mobile" ||
            inputs[i].id == "gender" ||
            inputs[i].id == "name"
        ) {

        }
        else {
            inputs[i].disabled = false;
        }
    }
}

function updateUserProfile() {
    // var name = document.getElementById("name") ;
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var mobile = document.getElementById("mobile");
    var address = document.getElementById("address");
    var email = document.getElementById("email");
    var gender = document.getElementById("gender");
    var dob = document.getElementById("dob");

    var temp = {
        // "name": name.value,
        "city": city.value,
        "state": state.value,
        "mob_number": mobile.value,
        "address": address.value,
        "email": email.value,
        "gender": gender.value,
        "age": dob.value
    }

    

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            if (this.responseText == "updated") {
                mytoast("Profile Updated");
                location.reload();
            }
            else {
                mytoast("SERVER ERROR !!", "crimson");
            }
        }
    };
    xhttp.open("POST", ip + "/patient/update_info", true);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(temp));

}

function checkAppointmentStatus(apt_id) {
    

    var formData = new FormData();
    formData.append("apt_id", apt_id)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            if (this.responseText == "await") {
                console.log("await")
                document.getElementsByClassName("await")[0].style.display = "block";
                document.getElementsByClassName("appointmentExist")[0].style.display = "none";
                document.getElementsByClassName("appointment")[0].style.display = "none";
            }
            else if (this.responseText == "") {
                console.log("no")
                document.getElementsByClassName("await")[0].style.display = "none";
                document.getElementsByClassName("appointmentExist")[0].style.display = "none";
                document.getElementsByClassName("appointment")[0].style.display = "block";
            }
            else {
                console.log("sy")
                document.getElementsByClassName("await")[0].style.display = "none";
                document.getElementsByClassName("appointmentExist")[0].style.display = "block";
                document.getElementsByClassName("appointment")[0].style.display = "none";

                var result = JSON.parse(this.responseText);
               
                document.getElementById("doc_name").innerHTML = "Dr. " + result.doc_name.toUpperCase();
                document.getElementById("time").innerHTML = "Time Slot : " + tConvert(result.time);
                document.getElementById("date").innerHTML = "Date : " + moment(result.date,"YYYY MM DD").format("LL");
                document.getElementById("clinic_address").innerHTML = "Address : "+result.clinic + ", "  + result.location ;
                document.getElementById("token_no").innerHTML = "Token number : " + result.token;
                document.getElementById("live_opd").innerHTML = "Current Token Number : " + result.live;
                sessionStorage.setItem("did", result.doc_id);
            }
        }
    };
    xhttp.open("POST", ip + "/appointment/particular_apt", true);
    xhttp.send(formData);
}

function deleteUserAccount() {
    var res = confirm("Are you sure you want to delete your account");
    
    if (res == true) {
        var formdata = new FormData();
        formdata.append("mob_num",localStorage.getItem("user_mobile"));

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.responseText == "successful"){
                    mytoast("Account Deleted Successfully");
                    userlogout();
                }else{
                    mytoast("Server Error");
                }
            }
        };
        xhttp.open("POST", ip + "/patient/delete", true);
        xhttp.send(formdata);
 
    }
    
}

function cancelAppointment(apt_id){
    var res = confirm("Are you sure you want to delete your account");
    
    if (res == true) {
        var formdata = new FormData();
        formdata.append("apt_id",apt_id);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.responseText == "successfull"){
                    mytoast("Appointment Canceled Successfully");
                    location.reload();
                }else{
                    mytoast("Server Error");
                }
            }
        };
        xhttp.open("PUT", ip + "/patient/cancel", true);
        xhttp.send(formdata);
    }
}

function getAwaitData(element,apt_id){
    
    document.getElementById("cancelAptBtn").setAttribute("onclick","cancelAppointment("+apt_id+")");
    var data = element.getElementsByTagName("td");
    var aptData = document.getElementById("aptTable").getElementsByTagName("tr");
    for(let i=0;i<data.length;i++){
        aptData[i].getElementsByTagName("td")[1].innerHTML = data[i].innerHTML;
    }
    
}

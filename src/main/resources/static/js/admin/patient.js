function patientList(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                console.log(result)
                
                result.forEach(data => {
                    document.getElementById("patientTable").innerHTML +=
                        '<tr>' +
                        '<td>' + data.patient_name + '</td>' +
                        '<td>' + data.age + '</td>' +
                        '<td>' + data.gender + '</td>' +
                        '<td class="hide">' + data.patient_id + '</td>' +
                        '<td>' + data.city + '</td>' +
                        '<td>' + data.state + '</td>' +
                        '<td>' + data.mob_number + '</td>' +
                        '<td>' + data.visits + '</td>' +

                        '<td> <button class="btn btn-danger" onclick="deletePatient(' + data.patient_id +
                        ')">Deactivate</button></td>' +
                         '<td> <button class="btn btn-danger deleteMe"(' + data.patient_id +
                                                                        ')">Delete</button></td>' +
                        '</tr>';
                });
                

            }
            $("#dataTable").DataTable({
                "order": [[4, "desc"]]
            });
        }
    };
    xhttp.open("GET", ip + "/admin/patients", true);
    xhttp.send();
}
$("#patientTable").on("click",".deleteMe",function(){
 var patientId = $(this).parents("tr").find("td:eq(3)").text()
  console.log(patientId)
    var v = confirm("Are You Sure Want To delete This Patient?")
                if (v == true) {
                            $.ajax({
                                url: "/patient/deletePatient?patient_id="+ patientId,
                                type: 'DELETE',
                                dataType: 'json',
                                success: function(data) {
                                   console.log("success");
                                   location.reload()
                                },
                                error: function(error) {
                                   alert('fail' + status.code);
                                },
                            });
                } else {
//                    doc = "Cancel was pressed.";
                }

})
function deletePatientList(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                
                result.forEach(data => {
                    document.getElementById("deletedPatientTable").innerHTML +=
                        '<tr>' +
                        '<td>' + data.patient_name + '</td>' +
                        '<td>' + data.age + '</td>' +
                        '<td>' + data.gender + '</td>' +
                        '<td>' + data.city + '</td>' +
                        '<td>' + data.state + '</td>' +
                        '<td>' + data.mob_number + '</td>' +
                        '<td>' + data.visits + '</td>' +
                        '<td> <button class="btn btn-success" onclick="reactivatePatient(' + data.patient_id +
                        ')">Activate</button></td>' +
                        '</tr>';
                });
                

            }
            $("#dataTable2").DataTable({
                "order": [[4, "desc"]]
            });
        }
    };
    xhttp.open("GET", ip + "/admin/delete_patients", true);
    xhttp.send();
}

function deletePatient(patient_id){
    var res = confirm("Are you sure you want to delete this user");
    
    if (res == true) {
        var formdata = new FormData();
        formdata.append("pt_id",patient_id);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                if(this.responseText == "successful"){
                    mytoast("Account Deleted Successfully");
                    location.reload();
                }else{
                    mytoast("Server Error");
                }
            }
        };
        xhttp.open("POST", ip + "/admin/patient_delete", true);
        xhttp.send(formdata);
    }
}

function reactivatePatient(patient_id){
    var res = confirm("Are you sure you want to delete this user");
    
    if (res == true) {
        var formdata = new FormData();
        formdata.append("pt_id",patient_id);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               
                if(this.responseText == "successful"){
                    mytoast("Account Deleted Successfully");
                    location.reload();
                }else{
                    mytoast("Server Error");
                }
            }
        };
        xhttp.open("POST", ip + "/admin/patient_reactivate", true);
        xhttp.send(formdata);
    }
}
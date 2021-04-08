
function editProfile() {
  var inputs = document.getElementById("profile").getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].id == "registrationNumber" ||
      inputs[i].id == "experience" ||
      inputs[i].id == "degree" ||
      inputs[i].id == "name1" ||
      inputs[i].id == "specialisation"
    ) {

    }
    else {
      inputs[i].disabled = false;
    }
  }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === true) {
          event.preventDefault();
          updateProfile()
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


function getProfile() {
  try {

    var mob_num = localStorage.getItem("doc_mobile")

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        var result = JSON.parse(this.responseText)[0];
        console.log(result);
        document.getElementById("name1").value = result.doctor_name;
        document.getElementById("experience").value = result.experience;
        document.getElementById("degree").value = result.qualification;
        document.getElementById("specialisation").value = result.specialisation;
        document.getElementById("city").value = result.city;
        document.getElementById("state").value = result.state;
        document.getElementById("mobile").value = result.phone_numb;
        document.getElementById("clinicName").value = result.clinic_name;
        document.getElementById("clinicAddress").value = result.clinic_address;
        document.getElementById("email").value = result.email;
        document.getElementById("doctorTitle").innerHTML = result.doctor_name;
        document.getElementById("clinicTiming").value = result.timing;
        document.getElementById("handlers").value = result.number_of_handlers;
        document.getElementById("registrationNumber").value = result.reg_number;
      }
    };
    xhttp.open("GET", ip + "/doctor/doctor_profile?mob_num=" + mob_num, true);
    xhttp.send();
  } catch (e) {
    console.warn(e);
  }
}

function deleteAccount() {
  var res = confirm("Are you sure you want to delete your account");
  
  if (res == true) {
      var formdata = new FormData();
      formdata.append("mob_num",localStorage.getItem("doc_mobile"));

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              if(this.responseText == "successfull"){
                  mytoast("Account Deleted Successfully");
                  logout();
              }else{
                  mytoast("Server Error");
              }
          }
      };
      xhttp.open("POST", ip + "/doctor/delete", true);
      xhttp.send(formdata);

  }
  
}
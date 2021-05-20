
function getProfileData() {
    var queryString = location.search;
    const urlParams = queryString.split("?d=")[1];
    var decrypted = CryptoJS.AES.decrypt(urlParams, "mybopdopapp");

    var d_num = decrypted.toString(CryptoJS.enc.Utf8).trim();
    // urlParams.get('d');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText)[0];
            // console.log(result)
            var dspec = encodeURIComponent(result.specialisation);
            var degree = encodeURIComponent(result.degree);
            var timing = result.timing;
            var doc_name = encodeURIComponent(result.doctor_name);
            var clinic_name = encodeURIComponent(result.clinic_name);

            if (sessionStorage.getItem("usermobile") != null) {
                document.getElementById("getAppoint").setAttribute("onclick",
                    "location.href='new-appointment.html?dname=" + doc_name + "&dspec=" + dspec + "&degree=" + degree + "&dnum=" + result.doctor_id +
                    "&clinicname=" + clinic_name + "'");
            }
            else {
                document.getElementById("getAppoint").setAttribute("onclick",
                    "location.href='../authentication/login.html'");
            }
            // console.log(timing);
            localStorage.setItem("t",timing);
            document.getElementsByClassName("backBox")[0].innerHTML =
                '<div class="bopdopDoctor">' +
                '<div class="flexSeparate">' +
                '<h2 class="font-weight-bold px-4 pb-3">Profile: </h2>' +
                '<i class="fas fa-check-circle mx-4 selectBOPDOP" onclick="selectDoctor()"></i>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-2 mb-2">' +
                '<div class="boppdopDoctorImage">' +
                '<img src="assets/img/user.png" class="responsive" />' +
                '</div>' +
                '</div>' +
                '<div class="col-md-10 mb-2">' +
                '<div class="boppdopDoctorDetails">' +
                '<h5 class="DName m-0 font-weight-bold">' +
                'Dr.' + result.doctor_name +
                '</h5>' +
                '<small class="DSpec font-weight-bold text-muted">' + result.specialisation + '</small>' +
                '<h6 class="DExp">' + result.experience + ' years experience</h6>' +
                '<p class="DAddress my-0">' +
                '<span class="DClinic">' + result.clinic_name + '</span>,' +
                '<span class="DClinicLocation">' + result.clinic_location + '</span>,' +
                '<span class="DCity">' + result.city + '</span>,' +
                '<span class="DState">' + result.state + '</span>' +
                '</p>' +
                '<p class="my-2">' +
                '<i class="fas fa-phone-square-alt"></i>' +
                '<span class="Dphone mx-2">' + result.alt_numb + '</span>' +
                '</p>' +
                '</div>' +
                '</div>' +
                ' </div>' +
                '</div>';


        }
    };
    xhttp.open("GET", ip + "/patient/pt_doctor_profile?mob_num=" + d_num, true);
    xhttp.send();
}
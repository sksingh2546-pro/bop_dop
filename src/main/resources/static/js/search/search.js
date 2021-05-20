
function getlocation() {
    document.getElementsByClassName("suggestions")[0].innerHTML =
        '<div class="location">' +
        '<img src="assets/svg/loc.svg" />' +
        '<span class="locationName"> wait for location.. </span>' +
        '</div>';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);

                document.getElementsByClassName("suggestions")[0].innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    document.getElementsByClassName("suggestions")[0].innerHTML +=
                        '<div class="location">' +
                        '<img src="assets/svg/loc.svg" />' +
                        '<span class="locationName">' + result[i].city + '</span>' +
                        '</div>';
                }
                addLocationListen();
            } else {
                document.getElementsByClassName("suggestions")[0].innerHTML =
                    '<div class="location">' +
                    '<img src="assets/svg/loc.svg" />' +
                    '<span class="locationName"> No Location available </span>' +
                    '</div>';
            }

        }
    };
    xhttp.open("GET", ip + "/patient/cities", true);
    xhttp.send();
}
var secret = "mybopdopapp";

function getSpecialityList() {
    document.getElementsByClassName("suggestions")[1].innerHTML =
        '<div class="doctors">' +
        '<img src="assets/svg/circle-search.svg" />' +
        '<span class="doctorName"> <img src="assets/loader/blueloader.svg" height="25px"> </span>' +
        '</div>';

    var formData = new FormData();
    formData.append("city", document.getElementById("searchLocation").value)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);

                document.getElementsByClassName("suggestions")[1].innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    document.getElementsByClassName("suggestions")[1].innerHTML +=
                        '<div class="doctors">' +
                        '<img src="assets/svg/circle-search.svg" />' +
                        '<span class="doctorName">' + result[i].speciality + '</span>' +
                        '</div>';
                }
                addDoctorListen();
            } else {
                document.getElementsByClassName("suggestions")[1].innerHTML =
                    '<div class="doctors">' +
                    '<img src="assets/svg/circle-search.svg" />' +
                    '<span class="doctorName"> First select city </span>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", ip + "/patient/search_city", true);
    xhttp.send(formData);
}

function getDoctorNameList() {
    document.getElementsByClassName("suggestions")[1].innerHTML =
        '<div class="doctors">' +
        '<img src="assets/svg/circle-search.svg" />' +
        '<span class="doctorName"> <img src="assets/loader/blueloader.svg" height="25px"> </span>' +
        '</div>';

    var formData = new FormData();
    formData.append("city", document.getElementById("searchLocation").value)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                // console.log(result);
                document.getElementsByClassName("suggestions")[1].innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    document.getElementsByClassName("suggestions")[1].innerHTML +=
                        '<div class="doctors">' +
                        '<img src="assets/svg/circle-search.svg" />' +
                        '<span class="doctorName">' + result[i].name + '</span>' +
                        '</div>';
                }
                addDoctorListen();
            } else {
                document.getElementsByClassName("suggestions")[1].innerHTML =
                    '<div class="doctors">' +
                    '<img src="assets/svg/circle-search.svg" />' +
                    '<span class="doctorName">First select city </span>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", ip + "/patient/search_docName", true);
    xhttp.send(formData);
}

function getHospitalList() {
    document.getElementsByClassName("suggestions")[1].innerHTML =
        '<div class="doctors">' +
        '<img src="assets/svg/circle-search.svg" />' +
        '<span class="doctorName"> <img src="assets/loader/blueloader.svg" height="25px"> </span>' +
        '</div>';

    var formData = new FormData();
    formData.append("city", document.getElementById("searchLocation").value)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                // console.log(result);
                document.getElementsByClassName("suggestions")[1].innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    document.getElementsByClassName("suggestions")[1].innerHTML +=
                        '<div class="doctors">' +
                        '<img src="assets/svg/circle-search.svg" />' +
                        '<span class="doctorName">' + result[i] + '</span>' +
                        '</div>';
                }
                addDoctorListen();
            } else {
                document.getElementsByClassName("suggestions")[1].innerHTML =
                    '<div class="doctors">' +
                    '<img src="assets/svg/circle-search.svg" />' +
                    '<span class="doctorName">First select city </span>' +
                    '</div>';
            }
        }
    };
    xhttp.open("POST", ip + "/patient/search_hospi", true);
    xhttp.send(formData);
}

function resultHide() {
    document.getElementsByClassName("searchResult")[0].innerHTML =
        '<div class="flexSeparate ">' +
        '<h2 class="font-weight-bold">Results: </h2>' +
        '<i class="fas fa-times" onclick="resultHide()" ></i>' +
        '</div>';

    document.getElementsByClassName("searchResult")[0].style.display = "none";
}

function getAllDoctors(searchtype) {
    
    document.getElementsByClassName("searchResult")[0].innerHTML =

        '<div class="flexSeparate ">' +
        '<h2 class="font-weight-bold">Results: </h2>' +
        '<i class="fas fa-times" onclick="resultHide()" ></i>' +
        '</div>' +
        '<div class="text-center">' +
        '<span id="preloader">' +
        '<img src="assets/svg/black-loader.svg">' +
        '</span>' +
        '</div>';

    //Start Preloader
   // openPreLoader();
    window.scrollTo(document.getElementById("searchDoctor").offsetLeft, document.getElementById("results").offsetTop);
    var formData = new FormData();

    formData.append("city", document.getElementById("searchLocation").value);

    if (searchtype == "name_and_city") {
        formData.append("name", document.getElementById("searchDoctor").value);
    }
    else if (searchtype == "hospi_and_city") {
        formData.append("hospital", document.getElementById("searchDoctor").value);
    }
    else if (searchtype == "search_spclty_city") {
        formData.append("specialty", document.getElementById("searchDoctor").value);
    }
    else {
       if(document.getElementById("searchDoctor").value != ""){
        searchtype = "search_spclty_city";
        formData.append("specialty", document.getElementById("searchDoctor").value);
       }else{
        searchtype = "search_city_only";
       }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText != "") {
                var result = JSON.parse(this.responseText);
                // console.log(result);
                var stringDoctor = "";
                document.getElementsByClassName("searchResult")[0].style.display = "block";
                for (let i = 0; i < result.length; i++) {
                    stringDoctor = result[i].doctor_name;
                    var encryptedM = CryptoJS.AES.encrypt(result[i].doc_number, secret);
                    let timing = JSON.parse(result[i].timing);
                    timing = JSON.stringify(timing);
                    document.getElementsByClassName("searchResult")[0].innerHTML +=
                        '<div class="bopdopDoctor">' +
                        '<div class="row">' +
                        ' <div class="col-md-2 mb-2">' +
                        '<div class="boppdopDoctorImage">' +
                        '<img src="assets/img/user.png" class="responsive" />' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-md-10 mb-2">' +
                        '<div class="boppdopDoctorDetails">' +
                        '<h5 class="m-0">' +
                        '<a href="watch-doctor-profile.html?d=' + encryptedM + '">' +
                        'Dr. <span class="DName">' + stringDoctor + '</span>' +
                        '</a>' +
                        '</h5>' +
                        '<small class="DSpec font-weight-bold text-muted">' + result[i].specialty + '</small>' +
                        '<h6><span class="DExp">' + result[i].experience + '</span> years experience</h6>' +
                        '<p class="DAddress my-0">' +
                        '<span class="DClinic">' + result[i].clinic_name + '</span>,' +
                        '<span class="DClinicLocation">' + result[i].clinic_location + '</span>,' +
                        '<span class="DCity">' + result[i].city + '</span>,' +
                        '<span class="DState">' + result[i].state + '</span>' +
                        '</p>' +
                        '<p class="my-2">' +
                        '<i class="fas fa-phone-square-alt"></i>' +
                        '<span class="Dphone mx-2">' + result[i].alt_number + '</span>' +
                        `<button class="btn btn-success m-2" id="redirectBtn" data-time=${timing} onmouseup=setOpd(this) onclick=location.href="new-appointment.html?dname=` +
                        encodeURI(stringDoctor) + "&dspec=" + encodeURI(result[i].specialty) + "&degree=" + encodeURI(result[i].degree) + "&dnum=" + result[i].doc_id +
                        "&clinicname=" + encodeURI(result[i].clinic_name)+ '">' +
                        '<i class="fas fa-calendar-check text-light mr-2" ></i>' +
                        'BOOK APPOINTMENT' +
                        '</button>' +
                        '<button class="btn bg-theme text-light m-2" onclick=location.href="consultant.html">' +
                        'Consult' +
                        '<i class="fas fa-comment-medical text-light ml-2"></i>' +
                        '</button>' +
                        '</p>' +
                        '<a href="watch-doctor-profile.html?d=' + encryptedM + '">view profile</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            } else {
                document.getElementsByClassName("searchResult")[0].innerHTML =
                    '<div class="bopdopDoctor">' +
                    '<div class="row justify-content-center align-items-center">' +
                    '<div class="col-md-4">' +
                    'No doctor avilable' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    ;
            }
            //Close Preloader
            //closePreLoader();
            
        }
    };
    xhttp.open("POST", ip + "/patient/" + searchtype, true);
    xhttp.send(formData);
}
function setOpd(element){
    let time = element.getAttribute("data-time");
    localStorage.setItem("t",time);
}

function searchType() {
    var type = document.getElementById("searchType");
    if (type.value == "name") {
        document.getElementById("searchDoctor").placeholder = "Search By Doctor Name";
        document.getElementById("searchDoctor").setAttribute("onfocus", 'openDoctorSuggestion(getDoctorNameList)');
        document.getElementsByClassName("searchBtn")[0].setAttribute("onclick", "getAllDoctors('name_and_city')");
    }
    else if (type.value == "hospital") {
        document.getElementById("searchDoctor").placeholder = "Search By Hospital Name";
        document.getElementById("searchDoctor").setAttribute("onfocus", "openDoctorSuggestion(getHospitalList)");
        document.getElementsByClassName("searchBtn")[0].setAttribute("onclick", "getAllDoctors('hospi_and_city')");
    }
    else if(type.value == "speciality"){
        document.getElementById("searchDoctor").placeholder = "Search By Speciality";
        document.getElementById("searchDoctor").setAttribute("onfocus", "openDoctorSuggestion(getSpecialityList)");
        document.getElementsByClassName("searchBtn")[0].setAttribute("onclick", "getAllDoctors('search_spclty_city')");
    }
    document.getElementById("searchDoctor").value = "";
}

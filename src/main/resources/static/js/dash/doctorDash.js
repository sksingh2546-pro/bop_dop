
function getCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            document.getElementById("loading").style.display = "none";
            var count = this.responseText.split(":");
            document.getElementById("todayTotalPatient").innerHTML = count[0];
            document.getElementById("todayCompletedPatient").innerHTML = count[1];
            document.getElementById("todayNotCompletedPatient").innerHTML = count[2];
            document.getElementById("todayRegisteredPatient").innerHTML = count[3];
        }
    };
    xhttp.open("GET",ip+ "/doctor/dashboard?mob_num="+localStorage.getItem("doc_mobile"), true);
    xhttp.send();
}
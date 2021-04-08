var loc = document.getElementById("searchLocation");
var doctor = document.getElementById("searchDoctor");


function openLocationSuggestion(){
	loc.value = "";
  document.getElementsByClassName("suggestions")[1].style.zIndex = "50";
  document.getElementsByClassName("suggestions")[0].style.display = "block";
  document.getElementsByClassName("suggestions")[1].style.display = "none";

}
function closeSuggestion(){
  document.getElementsByClassName("suggestions")[1].style.zIndex = "1";
  document.getElementsByClassName("suggestions")[1].style.zIndex = "1";
    document.getElementsByClassName("suggestions")[0].style.display = "none";
    document.getElementsByClassName("suggestions")[1].style.display = "none";
}

function openDoctorSuggestion(func){
	doctor.value = "";
  document.getElementsByClassName("suggestions")[1].style.zIndex = "30";
  document.getElementsByClassName("suggestions")[1].style.display = "block";
  document.getElementsByClassName("suggestions")[0].style.display = "none";
  func();
}
function addLocationListen(){

  var locations = document.getElementsByClassName("location");
  for(let i=0;i<locations.length;i++){
      locations[i].addEventListener("click",()=>{
          console.log("click")
          document.getElementById("searchLocation").value = locations[i].innerText.trim();
          document.getElementsByClassName("suggestions")[0].style.display = "none";
      })
  }
  
}

function addDoctorListen(){
  
  var doctors = document.getElementsByClassName("doctors");
  for(let i=0;i<doctors.length;i++){
      doctors[i].addEventListener("click",()=>{
          console.log("click")
          document.getElementById("searchDoctor").value = doctors[i].innerText.trim();
          document.getElementsByClassName("suggestions")[1].style.display = "none";
      })
  }
}


function filterFunction() {
    var input, filter, a, i;
    console.log("Lfunction");
    input = document.getElementById("searchLocation");
    filter = input.value.toUpperCase();
    divs = document.getElementsByClassName("location");
    a = document.getElementsByClassName("locationName");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  }
  function filterDoctor() {
    var input, filter, a, i;
    console.log("Dfunction");
    input = document.getElementById("searchDoctor");
    filter = input.value.toUpperCase();
    divs = document.getElementsByClassName("doctors");
    a = document.getElementsByClassName("doctorName");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  }
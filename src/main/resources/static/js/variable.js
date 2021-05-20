//var ip="http://192.168.1.36:8811";
 var ip="";

function validateNumber(number) {
    let regexNumber = /^\d{10}$/;
    // console.log(regexNumber.test(number));
    return regexNumber.test(number);
}

function enquiry(element) {
    var num = document.getElementById("enqMobile").value;
    var name = document.getElementById("enqName").value;
    var msg = document.getElementById("enqMessage").value;
    if (num != "" && name != "" && msg != "") {
    	if(validateNumber(num)){
	        element.innerHTML = "Sending <img src='assets/img/loader3.gif' height='20px'>";
	        element.disabled = true;
	        var xml = new XMLHttpRequest();
	
	        var formData = new FormData();
	        formData.append("mob_num", num);
	        formData.append("msg", msg);
	        formData.append("name", name);
	
	        xml.onreadystatechange = function () {
	            if (this.status == 200 && this.readyState == 4) {
	                document.getElementById("enqMobile").value = "";
	                document.getElementById("enqName").value = "";
	                document.getElementById("enqMessage").value = "";
	                element.innerHTML = "Send";
	                element.disabled = false;
	                mytoast("Enquiry Send Successfully");
	            }
	        }
	        xml.open("POST", ip + "/enquiry/send", true);
	        xml.send(formData);
	      }else{
	        	mytoast("Enter 10 digit number","tomato");
	      }
    } else {
        mytoast("Fill all Fields");
    }
}
function openEnquiry(){
    if(document.getElementsByClassName("enquiry")[0].style.bottom == "0px"){
        document.getElementsByClassName("enquiry")[0].style.bottom = "-450px";
    }else{
        document.getElementsByClassName("enquiry")[0].style.bottom = "0px";
    }
    
}
function closeEnqForm(){
    
    document.getElementsByClassName("enquiry")[0].style.bottom = "-450px";
}

function openPreLoader(){
    // console.log("open Loader");

    var loader = document.getElementById("preloader");
    loader.style.display = "inline";
    loader.parentElement.disabled = true;
}
function closePreLoader(){
    // console.log("close Loader");

    var loader = document.getElementById("preloader");
    loader.style.display = "none";
    loader.parentElement.disabled = false;
}
// helper funtion for 24hours to 12hours
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
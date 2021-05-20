var url = new URL(window.location.href);
var c = url.searchParams.get("vp");
// console.log(c);
document.getElementsByClassName("custom-select")[0].value = c; 
if(c == "PP"){
    document.getElementById("viewPatientHead").innerHTML = "Pending Patients";
} 
else if(c == "CP"){
    document.getElementById("viewPatientHead").innerHTML = "Completed Patients";
}
else if(c == "TP"){
    document.getElementById("viewPatientHead").innerHTML = "Total Patients";
}
else{
    document.getElementById("viewPatientHead").innerHTML = "Overall Patients";
}

function viewPatient(element){
    if(element.value == "PP"){
        document.getElementById("viewPatientHead").innerHTML = "Pending Patients";
    } 
    else if(element.value == "CP"){
        document.getElementById("viewPatientHead").innerHTML = "Completed Patients";
    }
    else if(element.value == "TP"){
        document.getElementById("viewPatientHead").innerHTML = "Total Patients";
    }
    else{
        document.getElementById("viewPatientHead").innerHTML = "Overall Patients";
    }
}
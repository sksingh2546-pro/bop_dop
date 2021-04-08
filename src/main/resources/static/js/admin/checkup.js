document.getElementById("appointedPatients").getElementsByTagName("tr")[0].addEventListener('click',()=>{
    document.getElementById("patientCheckupModal").classList.add("animate__bounceIn");
    document.getElementById("patientCheckupModal").style.display = "block";
    document.getElementById("backBlack").style.display = "block";
});
console.log(document.getElementsByClassName("popupHeader")[0].getElementsByClassName("i"))
document.getElementsByClassName("popupHeader")[0].getElementsByTagName("i")[0].addEventListener('click',()=>{
    document.getElementById("patientCheckupModal").style.display = "none";
    document.getElementById("backBlack").style.display = "none";
})
document.getElementById("backBlack").addEventListener('click',()=>{
    document.getElementById("patientCheckupModal").style.display = "none";
    document.getElementById("backBlack").style.display = "none";
})
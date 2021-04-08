function addMedicine(){
    var medicine = document.getElementById("medicine").value,
    quantity = document.getElementById("quantity").value;
    if(medicine == "" || medicine == null){
        document.getElementById("medicine").style.border = "1px solid red";
        return false;
    }
    if( quantity == null || quantity == ""){
        document.getElementById("quantity").style.border = "1px solid red";
        return false;
    }
    document.getElementById("medTable").innerHTML += "<tr><td>"+ medicine +"</td><td >"+ quantity +"</td><td ><i class='fas fa-times' id='removeMed' onclick='deleteRow(this)'></i></td></tr>";
   
}
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function specialityFilter(){
    var dCount = document.getElementsByClassName("degree").length;
    var selected = document.getElementById("speciality").value;
    if(selected == "all"){
        for(var i=0;i<dCount;i++){
            document.getElementsByClassName("degree")[i].parentElement.parentElement.style.display = "flex";
        }
    }else{
        selected = '('+selected+')';
        for(var i=0;i<dCount;i++){
            document.getElementsByClassName("degree")[i].parentElement.parentElement.style.display = "flex";
            if( selected != document.getElementsByClassName("degree")[i].innerHTML){
                document.getElementsByClassName("degree")[i].parentElement.parentElement.style.display = "none";
            }
        }
    }
}
function starFilter(element){
    document.getElementById("starFilter").getElementsByClassName("fa-star");
    
    console.log(element)
    element.classList.add("checked");
}

function cityFilter(){

}

function searchByName() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchByName');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('dName');
    for (i = 0; i < li.length; i++) {
      a = li[i];
      txtValue = a.textContent.trim() || a.innerText.trim();
      console.log(txtValue.trim());
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].parentElement.style.display = "";
      } else {
        li[i].parentElement.style.display = "none";
      }
    }
}
function openPopup(){
    document.getElementById("doctorDetailPopup").style.display = "block";
    document.getElementById("backCover").style.display = "block";
}
function closePopup(){
    document.getElementById("doctorDetailPopup").style.display = "none";
    document.getElementById("backCover").style.display = "none";
}

function selectDoctor(){
   var select = document.getElementsByClassName("selectBOPDOP")[0];
   if(select.style.color="#777"){
    select.setAttribute("style", "color:var(--secondary)");
    select.parentElement.parentElement.setAttribute("style", "border:2px solid var(--secondary)");
   }else if(select.style.color="var(--secondary)"){
    select.removeAttribute("style");
    select.parentElement.parentElement.removeAttribute("style");
   }
  
}
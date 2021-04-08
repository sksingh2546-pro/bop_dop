function loadcities() {
    var state = document.getElementById("state").value.trim();
    document.getElementById("city").innerHTML =' <option id="loadingCities">Loading Cities...</option>'; 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText !=""){
                // document.getElementById("loadingCities").remove();
                var result = JSON.parse(this.responseText);
                document.getElementById("city").innerHTML =''; 
                result.forEach(element => {
                    document.getElementById("city").innerHTML += 
                    '<option value="'+ element.city +'">'+ element.city +'</option>'
                });
                
            }else{
                document.getElementById("city").innerHTML = 
                '<option value="">No City Available</option>'
            }
        }
    };
    xhttp.open("GET", ip + "/in/cities?state="+state, true);
    xhttp.send();
}
function loadstates() {
    document.getElementById("state").innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText !=""){
                
                var result = JSON.parse(this.responseText);
                result.forEach(element => {
                    document.getElementById("state").innerHTML += 
                    '<option value="'+ element.state +'">'+ element.state +'</option>'
                });
                
            }
            
        }
    };
    xhttp.open("GET", ip + "/in/states", true);
    xhttp.send();
}
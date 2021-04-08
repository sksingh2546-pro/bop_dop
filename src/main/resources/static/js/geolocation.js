if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCity);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  
// Step 2: Get city name 
function getCity(coordinates) { 
    var xhr = new XMLHttpRequest();   
    // Paste your LocationIQ token below. 
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.7ed973b31453e41a36da184b9d3d8f82&lat=" + 
    coordinates.coords.latitude + "&lon=" + coordinates.coords.longitude + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var city = response.address.city; 
			document.getElementById("searchLocation").value=response.address.state;
            console.log(response); 
            return; 
        } 
    } 
} 
  

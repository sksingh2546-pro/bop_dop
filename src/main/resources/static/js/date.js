var d = new Date();
var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var message = "";
var time = d.getHours();

if(time >= 4 && time < 12){
    wish = "Good Morning";
}
else if(time>=12 && time<17){
    message = "Good Afternoon";
}
else if(time >=17 && time<20){
    message = "Good Evening";
}
else{
    message = "Good Night";
}
document.getElementById("wish").innerHTML = message;
document.getElementById("todayDate").innerHTML = days[d.getDay()]+", " + d.getDate()+" " + months[d.getMonth()] +" " +d.getFullYear() ;
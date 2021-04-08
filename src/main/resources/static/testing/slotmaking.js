// create slots GUI

// var activeTab = null;
// $(document).ready(function () {
//     $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//         activeTab = e.target.href.split("#")[1];
//     })
// });

function myconsole(a){
    console.log(a);
}

$('.edit-link').click(function(e){
    if( e.target.className == "fas fa-plus-circle"){
        var active = e.target.parentNode.parentNode.parentNode.id;
    }else{
        var active = e.target.parentNode.parentNode.id;
    }
    myconsole(active)
    $("#saveBtn").attr("onclick", "createSlots("+active+")");
})

function removeSlot(element){
    element.parentNode.remove();
}

function createSlots(activeTab) {
    console.log(activeTab)
    var duration = document.getElementById("duration");
    var start_time = document.getElementById("start-time");
    var end_time = document.getElementById("end-time");
    
    var slot_array = createSlotsArray(duration.value, start_time.value, end_time.value);
    console.log(slot_array)
    activeTab.lastElementChild.remove();
    activeTab.innerHTML += '<div class="doc-times"></div>';
    
    slot_array.forEach(element => {
        document.querySelector("#"+activeTab.id + " .doc-times").innerHTML +=
        '<div class="doc-slot-list">'+element+
            '<a href="javascript:void(0)" class="delete_schedule"  onclick="removeSlot(this)" >'+
                '<i class="fa fa-times"></i>'+
            '</a>'+
        '</div>';
    });
}

// create array of time slots
function createSlotsArray(duration, start_time, end_time) {
    if (duration != "" && start_time != "" && end_time != "") {
        var slot_array = [];
        var start = hourToMinutes(start_time);
        var end = hourToMinutes(end_time);
        var dur = parseInt(duration);
        var i = 0;
        while (start < end) {
            start = start + dur;
            slot_array[i] = timeConvert(start);
            i++;
        }

        return slot_array;
    } else {
        mytoast("Please fill all fields", "tomato");

    }
}

function addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = 
    ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) ;
    return tempTime;
  }
  
  

// hour To minutes
function hourToMinutes(hour) {
    var temp = hour.split(":");
    var minutes = parseInt(temp[0]) * 60 + parseInt(temp[1]);
    return minutes;
}

// minutes to hour
function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    if (rhours < 10)
        rhours = "0" + rhours;

    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes < 10)
        rminutes = "0" + rminutes;
    return rhours + ":" + rminutes;
}


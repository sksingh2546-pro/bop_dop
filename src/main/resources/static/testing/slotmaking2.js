
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
    
    var slot_array = createSlotsArray( start_time.value, end_time.value,duration.value);
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

function createSlotsArray(starttime,endtime,interval) {
    // var starttime = "11:50";
    // var interval = "30";
    // var endtime = "10:50";
    var timeslots = [starttime];
    while (starttime != endtime) {

        starttime = addMinutes(starttime, interval);
        timeslots.push(starttime);

    }
    return timeslots;

}


function addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime =
        ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
        ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes());
    return tempTime;
}


// get OPD Timing of OPD in doctor Portal
function getDoctorOpdTiming(){
    let mobNumber = localStorage.getItem("doc_mobile");
    
    $.get(ip+"/doctor/opdTiming?mob_number="+mobNumber,function(data, status){
        if(status == "success"){
            slots(data);
        }
        else{
            mytoast("Error in getting opd Timing");
        }
      });
}
// make slots in doctor Portal
function slots(data) {

    var t = JSON.parse(data);

    var morningSlots = []
    var afternoonSlots = [];
    var eveningSlots = [];
    
    var morningSlotsDiv = document.getElementsByClassName("slotBoxMorning")[0];
    var eveningSlotsDiv = document.getElementsByClassName("slotBoxEvening")[0];
    var afternoonSlotsDiv = document.getElementsByClassName("slotBoxAfternoon")[0];
    var noslots = "<p>No slots</p>";

    t.map((time) => {
        switch (time.type) {
            case 'M': morningSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
                morningSlots.pop();
                break;
            case 'A': afternoonSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
                afternoonSlots.pop();
                break;
            case 'E': eveningSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
                eveningSlots.pop();
                break;
            default:console.log("nothing")
        }

    });
    if (morningSlots.length > 0) {
        slotRender(morningSlots, morningSlotsDiv);
    } else {
        morningSlotsDiv.innerHTML = noslots;
    }

    if (afternoonSlots.length > 0) {
        slotRender(afternoonSlots, afternoonSlotsDiv);
    } else {
        afternoonSlotsDiv.innerHTML = noslots;
    }

    if (eveningSlots.length > 0) {
        slotRender(eveningSlots, eveningSlotsDiv);
    } else {
        eveningSlotsDiv.innerHTML = noslots;
    }

}
// for rendering slots in UI doctor Portal
function slotRender(slots, element) {
    slots.map((time) => {
        let newTime = tConvert(time);
        element.innerHTML +=
            '<div class="slot ml-1 shadow-sm" onclick="togglelock(this)">' +
            '<input type="checkbox" class="lock" checked value="' + time + '">' +
            '<span class="singleSlot">' + newTime + '</span>' +
            '<i class="fas fa-unlock"></i>' +
            '</div>';
    });
}

// make slots in patint Portal
function patientSlots() {

    var t = JSON.parse(localStorage.getItem("t"));
    // console.log(t);
    var morningSlots = []
    var afternoonSlots = [];
    var eveningSlots = [];
    
    var morningSlotsDiv = document.getElementsByClassName("slotBoxMorning")[0];
    var eveningSlotsDiv = document.getElementsByClassName("slotBoxEvening")[0];
    var afternoonSlotsDiv = document.getElementsByClassName("slotBoxAfternoon")[0];
    var noslots = "<p>No slots</p>";

    t.forEach((time) => {
        switch (time.type) {
            case 'M': morningSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
            morningSlots.pop();
                break;
            case 'A': afternoonSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
            afternoonSlots.pop();
                break;
            case 'E': eveningSlots = createSlotsArray(time.Stime, time.Etime, time.duration);
            eveningSlots.pop();
                break;
            default:console.log("nothing");
        }
    });
    if (morningSlots.length > 0) {
        patientSlotRender(morningSlots, morningSlotsDiv);
    } else {
        morningSlotsDiv.innerHTML = noslots;
    }

    if (afternoonSlots.length > 0) {
        patientSlotRender(afternoonSlots, afternoonSlotsDiv);
    } else {
        afternoonSlotsDiv.innerHTML = noslots;
    }

    if (eveningSlots.length > 0) {
        patientSlotRender(eveningSlots, eveningSlotsDiv);
    } else {
        eveningSlotsDiv.innerHTML = noslots;
    }
    clickListener();
}

// for rendering slots in UI Patient Portal
function patientSlotRender(slots,element){
    slots.map((time) => {
        let newTime = tConvert(time);
        element.innerHTML +=
       `<div class="slot mx-1"><input type="hidden" class="slotvalue" value="${time}">
            <i class="fa-check-circle mr-1"></i>
            <span class="singleSlot">${newTime}</span>
        </div>`;
    });
}

// return slots array
function createSlotsArray(starttime, endtime, interval) {
    // var starttime = "08:00";
    // var interval = "30";
    // var endtime = "10:05";

    var timeslots = [starttime];

    while (starttime.localeCompare(endtime) == -1 ) {

        starttime = addMinutes(starttime, interval);
        timeslots.push(starttime);

    }
    return timeslots;
}

// retun one slot at a time
function addMinutes(time, minutes) {
    minutes = parseInt(minutes);
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime =
        ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
        ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes());
    return tempTime;
}

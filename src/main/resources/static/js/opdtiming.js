function fetchOpdTime() {

    let mobNumber = localStorage.getItem("doc_mobile");

    $.get(ip + "/doctor/opdTiming?mob_number=" + mobNumber, function (data, status) {
        if (status == "success") {
            // console.log(data)
            setOpdtiming(data);
        }
        else {
            mytoast("Error in getting opd Timing");
        }
    });
}

function setOpdtiming(opd_timing) {

    if (opd_timing != "") {
        opd_timing = JSON.parse(opd_timing);
        var morningTiming = document.getElementById("morningTiming").getElementsByClassName("timing");
        var eveningTiming = document.getElementById("eveningTiming").getElementsByClassName("timing");
        var afternoonTiming = document.getElementById("afternoonTiming").getElementsByClassName("timing");
        for (let i = 0; i < opd_timing.length; i++) {
            if (opd_timing[i].type == "M") {
                document.getElementById("morning").checked = true;
                morningTiming[0].value = opd_timing[i].Stime;
                morningTiming[1].value = opd_timing[i].Etime;
                morningTiming[2].value = opd_timing[i].duration;
            } else if (opd_timing[i].type == "A") {
                document.getElementById("afternoon").checked = true;
                afternoonTiming[0].value = opd_timing[i].Stime;
                afternoonTiming[1].value = opd_timing[i].Etime;
                afternoonTiming[2].value = opd_timing[i].duration;

            } else if (opd_timing[i].type == "E") {
                document.getElementById("evening").checked = true;
                eveningTiming[0].value = opd_timing[i].Stime;
                eveningTiming[1].value = opd_timing[i].Etime;
                eveningTiming[2].value = opd_timing[i].duration;
            }
        }
    }
    $('.timing,button,input[type=checkBox]').attr("disabled", true);
    $('.contentLoader').hide();
    $(".addTimingBox").fadeIn();

}
function editopd() {
    // console.log($('.timing').attr("disabled"))
    if ($('.timing').attr("disabled") == 'disabled') {
        $('.timing,button,input[type=checkBox]').attr("disabled", false);
    } else {
        $('.timing,button,input[type=checkBox]').attr("disabled", true);
    }

}
function getOPDTiming() {
    var opd_timing = [];
    var morningTiming = document.getElementById("morningTiming").getElementsByClassName("timing");
    var eveningTiming = document.getElementById("eveningTiming").getElementsByClassName("timing");
    var afternoonTiming = document.getElementById("afternoonTiming").getElementsByClassName("timing");

    if (document.getElementById("morning").checked == true) {
        if (morningTiming[0].value != "" && morningTiming[1].value && morningTiming[2].value) {
            opd_timing.push({
                "type": "M", "Stime": morningTiming[0].value, "Etime": morningTiming[1].value, "duration": morningTiming[2].value
            });
        } else {
            return [];
        }
    }

    if (document.getElementById("afternoon").checked == true) {
        if (afternoonTiming[0].value != "" && afternoonTiming[1].value && afternoonTiming[2].value) {
            opd_timing.push({
                "type": "A", "Stime": afternoonTiming[0].value, "Etime": afternoonTiming[1].value, "duration": afternoonTiming[2].value
            });
        } else {
            return [];
        }
    }
    if (document.getElementById("evening").checked == true) {
        if (eveningTiming[0].value != "" && eveningTiming[1].value && eveningTiming[2].value) {
            opd_timing.push({
                "type": "E", "Stime": eveningTiming[0].value, "Etime": eveningTiming[1].value, "duration": eveningTiming[2].value
            });
        } else {
            return [];
        }
    }
    return opd_timing;
}

function updateOpdTimeService() {
    let mobNumber = localStorage.getItem("doc_mobile");
    let opd_timing = getOPDTiming();
    var params = {
        "opd_timing": JSON.stringify(opd_timing),
        "mob_number": mobNumber
    }
    // console.log(opd_timing)
    if (opd_timing.length > 0) {
        $.post(ip + "/doctor/updateDoctorOpdTime", params, function (data, status) {
            if (status == "success") {
                location.reload();
            }
            else {
                mytoast("Error in updating opd Timing");
            }
        });
    } else {
        mytoast("Please fill the fields", "tomato");
    }

}

// var startDate = new Date(2018, 11, 24, 6, 0, 0, 0);
// var EndHour = 12;
// var interval = 30;

function fillTime(divName,startDate, EndHour, interval) {
    var d = startDate;
    var hour = startDate.getHours();
    $(`#${divName} .from`).append(` <option value="">- open -</option>`);
    $(`#${divName} .to`).append(` <option value="">- close -</option>`);
    while (hour < EndHour) {
        d = moment(d).add(interval, 'minutes');
        hour = parseInt(d.format('H'));
        var t24 = moment(d).format("HH:mm");
        var t12 = moment(d).format("hh:mm a");
        $(`#${divName} .from`).append(` <option value="${t24}">${t12}</option>`);
        $(`#${divName} .to`).append(` <option value="${t24}">${t12}</option>`);
        
        console.log(parseInt(d.format('H')));
    }
}


function validateTime(element){
    let i=1;
    // console.log("fun")
    let value = element.value;
    // console.log(value);
    let child = element.nextElementSibling.children[1];
    // console.log(child)
    while(value.localeCompare(child.value) == 1){
        child = element.nextElementSibling.children[i];
        child.disabled = true;
        // console.log(child)
        i++;
    }
    
}
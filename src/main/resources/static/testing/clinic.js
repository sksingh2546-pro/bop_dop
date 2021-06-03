
$(document).ready(function () {
    $(".submitTime").click(function () {
        if ($(this).val() == "add") {
            addClinicTiming($(this));
        } else {
            editClinicTiming($(this));
        }
    });
})


// add addClinicTiming
function addClinicTiming(element) {
    console.log(element)

    var id = '#' + element.parent().parent().parent().parent().attr('id');
    console.log(id);
    var start = $(id + ' .startTime');
    var end = $(id + '  .endTime');
    var duration = $(id + '  .duration');

    if (start.val() != "" && end.val() != "" && duration.val() != "") {
        $(id + " input[type=time]," + id + " select").attr("disabled", true);

        // api insert timing
        insertTiming(start.val(), end.val(), duration.val());

        element.val("edit");
    } else {
        mytoast("please fill all fields","red")
    }
}

// edit function
function editClinicTiming(element) {
    var id = '#' + element.parent().parent().parent().parent().attr('id');
    console.log(id);
    $(id + " input[type=time]," + id + " select").attr("disabled", false);
    element.val("add");
}

// api funtion for insert timing
function insertTiming(start, end, duration) {

    var data = {
        start: start,
        end: end,
        duration: duration
    }
    alert(JSON.stringify(data))
    $.ajax({
        url: 'url',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            mytoast("Insert Successfully")
        },

    });
}
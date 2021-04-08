

var d = new Date();
// d.setDate(30);
// d.setMonth(11);
var next = new Date();

function isLeapYear(Year) {
    if (((Year % 4) === 0) && ((Year % 100) !== 0)
        || ((Year % 400) === 0)) {
        return (true);
    } else {
        return (false);
    }
}

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayPerMonth = [31, isLeapYear(d.getFullYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var week = document.getElementsByClassName("week");
var day = document.getElementsByClassName("day");
var apdate = document.getElementsByClassName("apdate");
var j = d.getDay();
var k = d.getDate();

for (var i = 0; i < week.length; i++) {

    if (j > 6) {
        j = 0;
    }
    week[i].innerHTML = days[j];
    if (k > dayPerMonth[d.getMonth()]) {
        k = 1;
        d.setMonth(d.getMonth() + 1);
        d.setDate(1);
    }
    day[i].innerHTML = k;
    apdate[i].value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + k;
    console.log(apdate[i]);
    j++;
    k++;
}
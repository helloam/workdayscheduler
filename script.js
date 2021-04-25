//JQuery
$(document).ready(function () {

//Variables for rendering date and time on the header
    var currentDate = moment().format('MMMM D, YYYY<br>h:mm a');
    var currentTime = moment().format("HH");

    var hoursDayfull = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    var hoursDay = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
    var timeArr = ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four", "five", "six", "seven"];

    $("#currentDay").append(currentDate);

  //Timeblocks
    for (var i = 0; i < hoursDay.length; i++) {
        var newRow = $("<row>");
        $(".container").append(newRow);
        var newCol1 = $("<col>");
        var newCol2 = $("<col>");
        newRow.append(newCol1, newCol2);
        newCol1.attr("class", "col-2 hour");
        newCol2.attr("class", "col-9 input");
        newCol2.attr("id", timeArr[i]);
        newCol2.html("<textarea rows='3'style='width: 100%; margin-left:-2rem; height: 100%'></textarea>");
        newRow.addClass("time-block row");
        newRow.attr("id", hoursDayfull[i]);
        var newBtn = $("<button>");
        newBtn.attr("id", hoursDay[i]);
        newBtn.attr("class", "saveBtn fas fa-save col-1");
        newRow.append(newBtn);
        if (hoursDay[i] === 12) {
            newCol1.text(hoursDay[i] + "PM");
        } else if (hoursDay[i] > 8) {
            newCol1.text(hoursDay[i] + "AM");
        } else { newCol1.text(hoursDay[i] + "PM") };
    }

    $("row").each(function () {
        var getId = parseInt($(this).attr("id"));
        console.log("id= " + getId);

// To change the color of the time blocks based on past and present tasks
        if (parseInt(currentTime) < 9 || parseInt(currentTime) > 19) {
            $(this).addClass("past");
        } if (getId < parseInt(currentTime)) {
            $(this).addClass("past");
        } if (getId > parseInt(currentTime)) {
            $(this).addClass("future");
        } if (getId === parseInt(currentTime)) {
            $(this).addClass("present");

        }

    })
//Saving values to local storage when the save icon is clicked
    var saveBtn = $(".saveBtn");
    saveBtn.on("click", function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        console.log($(this).siblings(".input").children("textarea"));
        console.log($(this).siblings(".input").children("textarea").val());

        var hour = $(this).attr("id");
        var note = $(this).siblings(".input").children("textarea").val();

        localStorage.setItem(hour, note);
    })

    for (var i=0; i < hoursDay.length; i++) {
    $("#"+timeArr[i]).children("textarea").text(localStorage.getItem(hoursDay[i]));
    }
})

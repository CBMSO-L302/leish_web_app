document.addEventListener("DOMContentLoaded", function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: new Date(),
        defaultView: 'basicWeek',
        navLinks: true,
        editable: true,
        eventLimit: true,
        firstDay: 1
    });

    // Modify the font size of the calendar
    $('#calendar').css('font-size', '12px');
});

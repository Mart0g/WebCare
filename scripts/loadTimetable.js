function loadTimetable()
{
    var dp = new DayPilot.Calendar("dp");

    // behavior and appearance
    dp.theme = "calendar_transparent";

    // view
    dp.startDate = "2017-06-01";  // or just dp.startDate = "2013-03-25";
    dp.days = 1;
    dp.viewType = "Week";
    dp.allDayEventHeight = 25;
    dp.initScrollPos = 9 * 40;
    dp.moveBy = 'Full';
    
    // bubble, with async loading
    dp.bubble = new DayPilot.Bubble({
        cssClassPrefix: "bubble_default",
        onLoad: function(args) {
            var ev = args.source;
            args.async = true;  // notify manually using .loaded()
            
            // simulating slow server-side load
            setTimeout(function() {
                args.html = "Пациент: <br>" + ev.text();
                args.loaded();
            }, 500);
        }
    });
    
    dp.contextMenu = new DayPilot.Menu({
        cssClassPrefix: "menu_default",
        items: [
        // {text:"Show event ID", onclick: function() {alert("Event value: " + this.source.value());} },
        {text:"Виж име на пациент", onclick: function() {alert("Име на пациент: " + this.source.text());} },
        {text:"Начало на посещението", onclick: function() {alert("Начало на посещението: " + this.source.start().toStringSortable());} },
        {text:"Изтрий", onclick: function() { dp.events.remove(this.source); } }
        ]});

    // event moving
    dp.onEventMoved = function (args) {
        dp.message("Часът/Денят на посещението е успешно променен/о");
    };
    
    // event resizing
    dp.onEventResized = function (args) {
        dp.message("Продължителността на посещението е успешно променена");
    };

    // event creating
    dp.onTimeRangeSelected = function (args) {
        var name = prompt("Резервация на посещение в болница. Моля въведете име на пациент.");
        if (!name) return;
        var e = new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: name,
            //modal.style.display = "block";
        });


        dp.events.add(e);
        dp.clearSelection();
        dp.message("Посещението е записано");
    };
    
    dp.onTimeRangeDoubleClicked = function(args) {
        alert("DoubleClick: start: " + args.start + " end: " + args.end + " resource: " + args.resource);
    };
    
    // dp.onEventClick = function(args) {
    //     alert("Часът вече e запазен");
    // };
    
    dp.init();

    var e = new DayPilot.Event({
        start: new DayPilot.Date("2013-03-25T12:00:00"),
        end: new DayPilot.Date("2013-03-25T12:00:00").addHours(3),
        id: DayPilot.guid(),
        text: "Special event"
    });
    dp.events.add(e);

}
//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();


$("#chooseThis").on("click", function (event) {
    event.preventDefault();
    console.log("hello");
    flightInformation = getAirlineInfo();
    console.log(flightInformation);
    for (var e = 0; e < flightInformation.length; e++) {
        var info = $("<p>");
        info.text(flightInformation[e]);
        info.attr("class", "flightInformation");
        var putHere = $("#PUTHERE");
        putHere.append(info);
    }
});

$("#next").on("click", function () {
    next();
    flightInformation = getAirlineInfo();
});

$("#previous").on("click", function () {
    previous();
    flightInformation = getAirlineInfo();
});

$("#saveFlight").on("click", function () {
    if (flightInformation) {
        storeFlight(flightInformation);
    }
});



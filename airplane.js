//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();
console.log(flightInformation);

$("#chooseThis").on("click", function (event) {
    event.preventDefault();
    flightInformation = getAirlineInfo();
    console.log(flightInformation);
    displayAirlineInfo(flightInformation);
});

function displayAirlineInfo(flightInformation) {

    for (var a=0; a<flightInformation.length; a++) {
        var infoPrice = $("<p class='flightInformation'>");
        var infoCarrierOut = $("<p class='flightInformation'>");
        var infoCarrierIn = $("<p class='flightInformation'>");

        infoPrice.attr("class", "flightInformation");
        var flightShow = $("#availableFlights");

        var cost = flightInformation[a].thisFlight;
        var direct = flightInformation[a].direct;
        infoPrice.text("Cost: $ " + cost + " Direct Flight: " + direct);
        flightShow.append(infoPrice);

        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;
        infoCarrierOut.text("Outbound Airline: " + outFly + " Leaving on: " + depart);
        flightShow.append(infoCarrierOut);

        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text(inFly);
        flightShow.append("Inbound Airline: " + inFly + " Leaving on: " + arrive);

        var horizontalRule = $("<hr style: color='yellow'>");
        flightShow.append(horizontalRule);
    }
}

var flightStuff = getAirlineInfo();

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



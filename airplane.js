//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();


$("#chooseThis").on("click", function (event) {
    event.preventDefault();
    flightInformation = getAirlineInfo();
    console.log(flightInformation);

    for (var a=0; a<flightInformation.length; a++) {
        var infoPrice = $("<p class='flightInformation'>");
        var infoDirect = $("<p class='flightInformation'>");
        var infoCarrierOut = $("<p class='flightInformation'>");
        var infoCarrierIn = $("<p class='flightInformation'>");
        var infoDepart = $("<p class='flightInformation'>");
        var infoArrive = $("<p class='flightInformation'>");

        infoPrice.attr("class", "flightInformation");
        var flightShow = $("#availableFlights");

        var cost = flightInformation[a].thisFlight;
        infoPrice.text(cost);
        flightShow.append(infoPrice);

        var direct = flightInformation[a].direct;
        infoDirect.text(direct);
        flightShow.append(infoDirect);

        var outFly = flightInformation[a].carrierOut;
        infoCarrierOut.text(outFly);
        flightShow.append(infoCarrierOut);

        var leave = flightInformation[a].depart;
        infoDepart.text(leave);
        flightShow.append(infoDepart);

        var inFly = flightInformation[a].carrierIn;
        infoCarrierIn.text(inFly);
        flightShow.append(infoCarrierIn);

        var arrive = flightInformation[a].arrive;
        infoArrive.text(arrive);
        flightShow.append(infoArrive);

        var horizontalRule = $("<hr style: color='yellow'>");
        flightShow.append(horizontalRule);
    }
});

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



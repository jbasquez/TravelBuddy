//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();

$("#chooseThis").on("click", function (event) {
    event.preventDefault();
    getAirlineInfo();
    setTimeout(function() {
    flightInformation = returnFlight();
    displayAirlineInfo(flightInformation);
    }, 2000);
});

function displayAirlineInfo(flightInformation) {

    console.log(flightInformation);

    var flightShow = $("#availableFlights");

    if (flightInformation.length > 0) {
        flightShow.empty();
    }

    for (var a=0; a<flightInformation.length; a++) {

        var infoPrice = $("<p class='flightInformation'>");
        var infoCarrierOut = $("<p class='flightInformation'>");
        var infoCarrierIn = $("<p class='flightInformation'>");

        infoPrice.attr("class", "flightInformation");
        
        var cost = flightInformation[a].thisFlight;
        var direct = flightInformation[a].direct;
        infoPrice.text("Cost: $ " + cost + " Direct Flight: " + direct);
        infoPrice.attr("value",cost+" "+direct);
        flightShow.append(infoPrice);

        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;
      
        infoCarrierOut.text("Outbound Airline: " + outFly + " Leaving on: " + depart + " ");
        flightShow.append(infoCarrierOut);
        

        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text(inFly);
        flightShow.append("Inbound Airline: " + inFly + " Leaving on: " + arrive + "<br />");

        var button = $("<button>");
        button.attr("class","saveFlight");
        button.attr("value",cost + "/" + direct + "/" + outFly + "/" + depart + "/" + inFly + "/" + arrive);
        button.attr("onClick","saveFlight($(this).val())");
        button.text("Click to Save");
        flightShow.append(button);

        var horizontalRule = $("<hr style: color='yellow'>");
        flightShow.append(horizontalRule);
    }
}

$("#next").on("click", function () {
    if (allFlights.length > 0) {
    next();
    flightInformation = returnFlight();
    displayAirlineInfo(flightInformation);
    }
});

$("#previous").on("click", function () {
    if (counter > 4) {
    previous();
    flightInformation = returnFlight();
    displayAirlineInfo(flightInformation);
    }
});

function saveFlight(saveThis) {
    storeFlight(saveThis);
}

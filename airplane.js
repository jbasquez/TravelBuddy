//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();
var goHotel = false;
var outDay;
var inDay;

function showSavedFlight() {
    var storedFlightInfo = localStorage.getItem("flight");

    var flightArray = storedFlightInfo.split("~");
    var appendFlight = $(".savedFlight");
    appendFlight.empty();

    var thisPrice = $("<p>");
    var carryOut = $("<p>");
    var carryIn = $("<p>");
    var thisHeader = $("<h2>");
    thisHeader.attr("class", "flightHeader");

    thisHeader.text("Your Flight Information");
    thisPrice.text("Cost: $ " + flightArray[0] + " Direct Flight: " + flightArray[1]);
    carryOut.text("Outbound Airline: " + flightArray[2] + " Leaving on: " + flightArray[3] + " ");
    carryIn.text("Inbound Airline: " + flightArray[4] + " Leaving on: " + flightArray[5]);

    appendFlight.append(thisHeader);
    appendFlight.append(thisPrice);
    appendFlight.append(carryOut);
    appendFlight.append(carryIn);
}

showSavedFlight();

$("#searchBtn").on("click", function (event) {
    var clearHere = $(".savedFlight");
    clearHere.empty();

    event.preventDefault();
    getAirlineInfo();
    setTimeout(function () {
        flightInformation = returnFlight();
        if (flightInformation.length > 1) {
            displayAirlineInfo(flightInformation);
        }
        else {
            noFlights();
        }
    }, 2000);
    goHotel = false;
});

function noFlights() {
    var flightArea = $("#flightsAndHotels");
    var noFly = $("<p>");
    noFly.text("I am sorry, there don't appear to be any flights at the requested Time");
    flightArea.append(noFly);
}

function displayAirlineInfo(flightInformation) {

    var flightShow = $("#flightsAndHotels");

    if (flightInformation.length > 0) {
        flightShow.empty();
    }

    for (var a = 0; a < flightInformation.length; a++) {

        var infoCard = $("<div>");
        infoCard.attr("class", "card ml-2 mt-4 mr-2 mb-2 p-5");
        flightShow.append(infoCard);

        var infoPrice = $("<p class='flightInformation'>");
        var infoCarrierOut = $("<p class='flightInformation'>");
        var infoCarrierIn = $("<p class='flightInformation'>");

        infoPrice.attr("class", "flightInformation");

        var cost = flightInformation[a].thisFlight;
        var direct = flightInformation[a].direct;
        infoPrice.text("Cost: $ " + cost + " Direct Flight: " + direct);
        infoPrice.attr("value", cost + " " + direct);
        flightShow.append(infoPrice);

        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;

        infoCarrierOut.text("Outbound Airline: " + outFly + " Leaving on: " + depart + " ");
        flightShow.append(infoCarrierOut);


        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text("Return Airline: " + inFly + " Leaving on: " + arrive);
        infoCard.append(infoCarrierIn);

        var button = $("<button>");
        button.attr("class", "saveFlight");
        button.attr("value", cost + "~" + direct + "~" + outFly + "~" + depart + "~" + inFly + "~" + arrive);
        button.attr("onClick", "saveFlight($(this).val()), callHotels(), showSavedFlight(), moveOn()");
        button.text("Click to Save");
        infoCard.append(button);

        // var horizontalRule = $("<hr style: color='yellow'>");
        // infoCard.append(horizontalRule);
    }
}

$("#next").on("click", function (event) {
    event.preventDefault();
    if (goHotel === false) {
        if (allFlights.length > 0) {
            next();
            flightInformation = returnFlight();
            displayAirlineInfo(flightInformation);
        }
    }

    if (goHotel === true) {
        if (hotelArray.length > 0) {
            getMoreInfo();
            next();
        }
    }
});

$("#previous").on("click", function (event) {
    event.preventDefault();
    if (goHotel === false) {
        if (counter > 4) {
            previous();
            flightInformation = returnFlight();
            displayAirlineInfo(flightInformation);
        }
    }

    if (goHotel === true) {
        if (counter > 4) {
            previous();
            getMoreInfo();
        }
    }
});

function saveFlight(saveThis) {
    storeFlight(saveThis);
    console.log(saveThis);

    var getTheDay = saveThis.split("~");

    var leaveDay = getTheDay[3];
    inDay = leaveDay.slice(-2);
    console.log("INDAY IS " + inDay);
    var returnDay = getTheDay[5];
    outDay = returnDay.slice(-2);
    console.log(outDay);
}

function moveOn() {
    goHotel = true;
}
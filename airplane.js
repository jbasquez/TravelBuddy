//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();
var goHotel = false;
var outDay;
var inDay;

function showSavedFlight() {
    var storedFlightInfo = localStorage.getItem("flight");

    if (storedFlightInfo) {
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
}

showSavedFlight();

function appendButtons() {
    // append page buttons
    preBtn = $("<button>");
    preBtn.attr("id", "previous");
    preBtn.attr("class", "mr-1 mt-5 btn btn-primary btn-sm");
    preBtn.text("Previous");
    preBtn.attr("onClick", "previousButton()");
    nxtBtn = $("<button>");
    nxtBtn.attr("id", "next");
    nxtBtn.attr("class", "ml-1 mt-5 btn btn-primary btn-sm");
    nxtBtn.attr("onClick", "nextButton()");
    nxtBtn.text("Next");
    $("#pageButtons").append(preBtn);
    $("#pageButtons").append(nxtBtn);
}


$("#searchBtn").on("click", function (event) {
    $("#pageButtons").empty();
    $(".savedFlight").empty();
    $(".savedHotel").empty();
    event.preventDefault();
    getAirlineInfo();
    $("#startMessage").hide();
    setTimeout(function () {
        flightInformation = returnFlight();
        displayAirlineInfo(flightInformation);
        appendButtons();
    }, 2000);
    goHotel = false;
});


function noFlights() {
    var flightArea = $("#flightsAndHotels");
    var noFly = $("<p>");
    noFly.text("I am sorry, there don't appear to be any flights at the requested Time");
    flightArea.append(noFly);
}

function nextButton() {
    if (goHotel === false) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (allFlights.length > 0) {
            next();
            flightInformation = returnFlight();
            displayAirlineInfo(flightInformation);
        }
    }
    if (goHotel === true) {
        if (hotelArray.length > 0) {
            next();
            getMoreInfo();
        }
    }
}

function previousButton() {
    if (goHotel === false) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
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
        infoCard.append(infoPrice);

        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;

        infoCarrierOut.text("Outbound Airline: " + outFly + " Leaving on: " + depart + " ");
        infoCard.append(infoCarrierOut);


        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text("Return Airline: " + inFly + " Leaving on: " + arrive);
        infoCard.append(infoCarrierIn);

        var button = $("<button>");
        button.attr("class", "saveFlight mt-2 btn btn-primary btn-sm btn-success");
        button.attr("value", cost + "~" + direct + "~" + outFly + "~" + depart + "~" + inFly + "~" + arrive);
        button.attr("onClick", "saveFlight($(this).val()), callHotels(), showSavedFlight(), moveOn()");
        button.text("Click to Save");
        infoCard.append(button);
    }
}

function saveFlight(saveThis) {
    storeFlight(saveThis);
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
//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();
var goHotel = false;

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    getAirlineInfo();
    $("#startMessage").hide();

    setTimeout(function() {
    flightInformation = returnFlight();
    displayAirlineInfo(flightInformation);

        // append page buttons
        preBtn = $("<button>");
        preBtn.attr("id", "previous");
        preBtn.attr("class", "mr-1 mt-5 btn btn-primary btn-sm");
        preBtn.text("Previous");
        nxtBtn = $("<button>");
        nxtBtn.attr("id", "next");
        nxtBtn.attr("class", "ml-1 mt-5 btn btn-primary btn-sm");
        nxtBtn.text("Next");
        $("#pageButtons").append(preBtn);
        $("#pageButtons").append(nxtBtn);
    

    }, 2000);
    goHotel = false;
});

$("#next").on("click", function (event) {
    event.preventDefault();
    if (goHotel === false) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (allFlights.length > 0) {
        next();
        flightInformation = returnFlight();
        console.log(flightInformation);
        displayAirlineInfo(flightInformation);
        }
    }
    if (goHotel === true) {
        if (hotelArray.length > 0) {
            next();
        }
    }
});

$("#previous").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if (counter > 4) {
    previous();
    flightInformation = returnFlight();
    console.log(flightInformation);
    displayAirlineInfo(flightInformation);
    }
});

function displayAirlineInfo(flightInformation) {

    var flightShow = $("#flightsAndHotels");

    if (flightInformation.length > 0) {
        flightShow.empty();
    }

    for (var a=0; a<flightInformation.length; a++) {

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
        infoPrice.attr("value",cost+" "+direct);
        infoCard.append(infoPrice);

        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;
      
        infoCarrierOut.text("Departure Airline: " + outFly + " Leaving on: " + depart + " ");
        infoCard.append(infoCarrierOut);
        

        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text("Return Airline: " + inFly + " Leaving on: " + arrive);
        infoCard.append(infoCarrierIn);

        var button = $("<button>");
        button.attr("class","saveFlight mt-2 btn btn-primary btn-sm btn-success");
        button.attr("value",cost + "/" + direct + "/" + outFly + "/" + depart + "/" + inFly + "/" + arrive);
        button.attr("onClick","saveFlight($(this).val()), callHotels(), showSaved(), moveOn()"); //Need to hide "page buttons" (preBtn, nxtBtn)
        button.text("Click to Save");
        infoCard.append(button);

        // var horizontalRule = $("<hr style: color='yellow'>");
        // infoCard.append(horizontalRule);
    }

}


function saveFlight(saveThis) {
    storeFlight(saveThis);
}

function showSaved() {
    var storedFlightInfo = localStorage.getItem("flight");
    console.log(storedFlightInfo);
    console.log("Hi");
    var flightArray = storedFlightInfo.split("/")
    console.log(flightArray);
    var saveThisHere = $(".savedFlight");
    var titleSave = $("<h3>");
    var thisPrice = $("<p>");
    var carryOut = $("<p>");
    var carryIn = $("<p>");

    titleSave.text("Current Flight:")
    thisPrice.text("Cost: $ " + flightArray[0] + " Direct Flight: " + flightArray[1]);
    carryOut.text("Outbound Airline: " + flightArray[2] + " Leaving on: " + flightArray[3] + " ");
    carryIn.text("Inbound Airline: " + flightArray[4] + " Leaving on: " + flightArray[5]);

    var infoCard1 = $("<div>");
    infoCard1.attr("class", "card ml-2 mt-4 mr-2 mb-2 p-4");
    saveThisHere.append(infoCard1);

    infoCard1.append(titleSave);
    infoCard1.append(thisPrice);
    infoCard1.append(carryOut);
    infoCard1.append(carryIn);
}

function moveOn() {
    goHotel =  true;
}
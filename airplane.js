//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getFlight();

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    getAirlineInfo();
    $("#startMessage").empty();

    setTimeout(function() {
    flightInformation = returnFlight();
    displayAirlineInfo(flightInformation);

        // append page buttons
        preBtn = $("<button>");
        preBtn.attr("id", "previous");
        preBtn.attr("class", "mr-1 btn btn-primary btn-sm");
        preBtn.text("Previous");
        nxtBtn = $("<button>");
        nxtBtn.attr("id", "next");
        nxtBtn.attr("class", "ml-1 btn btn-primary btn-sm");
        nxtBtn.text("Next");
        $("#pageButtons").append(preBtn);
        $("#pageButtons").append(nxtBtn);
    
        $("#next").on("click", function (event) {
            event.preventDefault();
            if (allFlights.length > 0) {
            next();
            flightInformation = returnFlight();
            console.log(flightInformation);
            displayAirlineInfo(flightInformation);
            }
        });
    
        $("#previous").on("click", function (event) {
            event.preventDefault();
            if (counter > 4) {
            previous();
            flightInformation = returnFlight();
            console.log(flightInformation);
            displayAirlineInfo(flightInformation);
            }
        });

    }, 2000);
});

function displayAirlineInfo(flightInformation) {

    var flightShow = $("#flightsAndHotels");

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
        button.attr("onClick","saveFlight($(this).val()), callHotels(), showSaved()"); //Need to hide "page buttons" (preBtn, nxtBtn)
        button.text("Click to Save");
        flightShow.append(button);

        var horizontalRule = $("<hr style: color='yellow'>");
        flightShow.append(horizontalRule);
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
    var thisPrice = $("<p>");
    var carryOut = $("<p>");
    var carryIn = $("<p>");

    thisPrice.text("Cost: $ " + flightArray[0] + " Direct Flight: " + flightArray[1]);
    carryOut.text("Outbound Airline: " + flightArray[2] + " Leaving on: " + flightArray[3] + " ");
    carryIn.text("Inbound Airline: " + flightArray[4] + " Leaving on: " + flightArray[5]);

    saveThisHere.append(thisPrice);
    saveThisHere.append(carryOut);
    saveThisHere.append(carryIn);
}
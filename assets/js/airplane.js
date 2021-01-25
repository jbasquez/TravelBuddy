//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]

// show starting message
message = $("<h2>");
message.attr("class", "p-5");
message.text("Travel Buddy helps you find the best prices on flights and hotels!");
$("#startMessage").append(message);

function showSavedFlight() {

    var storedFlightInfo = localStorage.getItem("flight");

    if (storedFlightInfo) {
        var flightArray = storedFlightInfo.split("~");
        var appendFlight = $(".savedFlight");
        appendFlight.empty();

        //Place to show the stored Flight information
        var infoCard = $("<div>");
        infoCard.attr("class", "card saveCard ml-5 mt-2 mb-2 pl-5 pt-3 pr-5 pb-5");
        infoCard.attr("id", "flightsCard");
        infoCard.hide().fadeIn(700);
        appendFlight.append(infoCard);

        var thisPrice = $("<p>");
        var thisPrice2 = $("<p>");
        var carryOut = $("<p>");
        var carryOut2 = $("<p>");
        var carryIn = $("<p>");
        var carryIn2 = $("<p>");
        var thisHeader = $("<h2>");
        thisHeader.attr("class", "flightHeader");

        thisHeader.text("Your Flight Information:");
        thisPrice.text("Cost: $ " + flightArray[0]);
        thisPrice2.text("Direct Flight: " + flightArray[1]);
        carryOut.text("Outbound Airline: " + flightArray[2]);
        carryOut2.text("Leaving on: " + flightArray[3]);
        carryIn.text("Inbound Airline: " + flightArray[4]);
        carryIn2.text("Leaving on: " + flightArray[5]);

        infoCard.append(thisHeader);
        infoCard.append(thisPrice);
        infoCard.append(thisPrice2);
        infoCard.append(carryOut);
        infoCard.append(carryOut2);
        infoCard.append(carryIn);
        infoCard.append(carryIn2);
    }
}
//Append page buttons and set stylings and functions
function appendButtons() {
 
    preBtn = $("<button>");
    preBtn.attr("id", "previous");
    preBtn.attr("class", "mr-1 mt-5 btn btn-primary btn-sm");
    preBtn.text("Previous");
    //Runs previousButton function
    preBtn.attr("onClick", "previousButton()");
    nxtBtn = $("<button>");
    nxtBtn.attr("id", "next");
    nxtBtn.attr("class", "ml-1 mt-5 btn btn-primary btn-sm");
    //Runs nextButton function
    nxtBtn.attr("onClick", "nextButton()");
    nxtBtn.text("Next");
    $("#pageButtons").append(preBtn);
    $("#pageButtons").append(nxtBtn);
}

//Initiates the program with user input in place
$("#searchBtn").on("click", function (event) {
    //Emptying any irrelivant information to focus on the current query
    $("#errorPlace").empty();
    $("#pageButtons").empty();
    $("#startMessage").empty();
    $(".savedFlight").empty();
    $(".savedHotel").empty();
    event.preventDefault();
    //runs the API
    getAirlineInfo();
    $("#startMessage").hide();
    //Give time for the ajax call to run
    setTimeout(function () {
        flightInformation = returnFlight();
        //If there are no flights found inform the user, otherwise show the flights
        if (flightInformation.length > 1) {
        displayAirlineInfo(flightInformation);
        appendButtons();
        } else {
            noFlights();
        }
    }, 2000);
    //tells program to run Flight parts
    goHotel = false;
});

//Tells the user if no flights meet the criteria chosen
function noFlights() {
    var flightArea = $("#flightsAndHotels");
    var noFly = $("<p>");
    noFly.text("I am sorry, there don't appear to be any flights at the requested Time");
    flightArea.append(noFly);
}

//Shows the next set of Flights or Hotels
function nextButton() {
    //Runs for the flights
    if (goHotel === false) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        //If there are flights to display, show them
        if (allFlights.length > 0) {
            next();
            flightInformation = returnFlight();
            displayAirlineInfo(flightInformation);
        }
    }
    //Runs for the hotels
    if (goHotel === true) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        //If there are hotels to display, show them
        if (hotelArray.length > 0) {
            next();
            getMoreInfo();
        }
    }
}

//Shows the previous set of Flights or Hotels
function previousButton() {
    //Runs for the flights
    if (goHotel === false) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (counter > 4) {
            previous();
            flightInformation = returnFlight();
            displayAirlineInfo(flightInformation);
        }
    }
    //Runs for the hotels
    if (goHotel === true) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if (counter > 4) {
            previous();
            getMoreInfo();

        }
    }
}

//Appending the flight information
function displayAirlineInfo(flightInformation) {

    var flightShow = $("#flightsAndHotels");
    
    //Empty out old flight information
    if (flightInformation.length > 1) {
        flightShow.empty();
    }

    var titleH2 = $("<h2>");
    titleH2.text("Flights:");
    titleH2.hide().fadeIn(700);
    flightShow.append(titleH2);

    //Appending things to appropriate place
    for (var a = 0; a < flightInformation.length; a++) {
        //Creates info card for flight information
        var infoCard = $("<div>");
        $("<div>").fadeIn(700);
        infoCard.attr("class", "card ml-2 mt-4 mr-2 mb-2 p-5");
        infoCard.hide().fadeIn(700);
        flightShow.append(infoCard);


        var infoPrice = $("<p class='flightInformation'>");
        var infoCarrierOut = $("<p class='flightInformation'>");
        var infoCarrierIn = $("<p class='flightInformation'>");

        infoPrice.attr("class", "flightInformation");

        //Cost and whether flight is Direct
        var cost = flightInformation[a].thisFlight;
        var direct = flightInformation[a].direct;
        infoPrice.text("Cost: $ " + cost + " Direct Flight: " + direct);
        infoPrice.attr("value", cost + " " + direct);
        infoCard.append(infoPrice);

        //Departure Airline and Date
        var outFly = flightInformation[a].carrierOut;
        var depart = flightInformation[a].depart;
        infoCarrierOut.text("Outbound Airline: " + outFly + " Leaving on: " + depart + " ");
        infoCard.append(infoCarrierOut);

        //Arrival Airline and Date
        var inFly = flightInformation[a].carrierIn;
        var arrive = flightInformation[a].arrive;
        infoCarrierIn.text("Return Airline: " + inFly + " Leaving on: " + arrive);
        infoCard.append(infoCarrierIn);

        //Save Button
        var button = $("<button>");
        button.attr("class", "mt-2 btn btn-light btn-sm clickToSave");
        button.attr("value", cost + "~" + direct + "~" + outFly + "~" + depart + "~" + inFly + "~" + arrive);
        button.attr("onClick", "saveFlight($(this).val()), callHotels(), showSavedFlight(), moveOn()");
        button.text("Click to Save");
        infoCard.append(button);
    }
}

//Saves and formats information when User Clicks Save Button
function saveFlight(saveThis) {
    storeFlight(saveThis);
    var getTheDay = saveThis.split("~");

    //Formats day user leaves to use in Hotle API
    var leaveDay = getTheDay[3];
    inDay = leaveDay.slice(-2);

    //Formats day user arrives to use in Hotel API
    var returnDay = getTheDay[5];
    outDay = returnDay.slice(-2);
}

//Changes program from Flights to Hotels
function moveOn() {
    goHotel = true;
}
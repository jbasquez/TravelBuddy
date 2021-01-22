var counter = 0;
var current = counter;
var allFlights = [];
var thisQuery;

// show starting message
message = $("<h2>");
message.attr("class", "m-1 ml-4 mr-4 p-5");
message.text("Travel Buddy helps you find the best prices on flights and hotels!");
$("#startMessage").append(message);

function getAirlineInfo() {

    // Format for each input:
    var country = "US";
    var currency = "USD";
    var locale = "en-US";
    // var origin = "RDU-sky";
    // var destination = "LAX-sky";
    // var outboundDate = "2021-12-30";
    // var inboundDate = "2021-12-30";


    var origin = $("#origin").val();
    origin = origin.toUpperCase();
    origin = origin + "-sky";
    var destination = $("#destination").val();
    var destination = destination.toUpperCase();
    var destination = destination + "-sky";
    var outboundY = $("#outboundY").val();
    var outboundM = $("#outboundM").val();
    // var outboundD = $("#outboundD").val();
    var outboundDate = (outboundY + "-" + outboundM).trim();
    console.log(outboundDate);
    var inboundY = $("#inboundY").val();
    var inboundM = $("#inboundM").val();
    // var inboundD = $("#inboundD").val();
    var inboundDate = (inboundY + "-" + inboundM).trim();
    console.log(inboundDate);

    var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/" + country + "/" + currency + "/" + locale + "/" + origin + "/" + destination + "/" + outboundDate + "/" + inboundDate;
    console.log(queryURL);

    //Using Skyscanner API to get flight information
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "timeout": 2000,
        "headers": {
            "x-rapidapi-key": "45049d9fb6msh17ba1e94f9859eep1817c7jsn5b1c2edaf89d",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        },
        "success": function (response) {
            console.log("hello");
            thisQuery = response;
            console.log(thisQuery);
        },
        "fail": function () {
            alert("Error Getting Airline Information");
        }
    };

    $.ajax(settings).done(function (response) {
    console.log("Hello");
    thisQuery = response;
    console.log(thisQuery);

});
}

function returnFlight() {
          
    allFlights = [];

    var options = thisQuery.Quotes.length;

    //5 = 5
    current = counter;
        //5 = 5             5 < 5+5                  5<30               5+1
    for (counter = current; current < counter + 5 && current < options; current++) {
        //Number
        var quotesPrice = thisQuery.Quotes[current].MinPrice;
        var thisCarrierOut = thisQuery.Quotes[current].InboundLeg.CarrierIds[0];
        var thisCarrierIn = thisQuery.Quotes[current].OutboundLeg.CarrierIds[0];
        //Assigns a name based on carrier code given for flight
        var carrierNames = thisQuery.Carriers.length;
        for (var i = 0; i < carrierNames; i++) {
            var thisCarrierOutName = thisQuery.Carriers[i].CarrierId;
            var thisCarrierInName = thisQuery.Carriers[i].CarrierId;

            if (thisCarrierOut === thisCarrierOutName) {
                thisCarrierOut = thisQuery.Carriers[i].Name;
            }

            if (thisCarrierIn === thisCarrierInName) {
                thisCarrierIn = thisQuery.Carriers[i].Name;
            }
        }
        //String
        var thisDepartureDate = thisQuery.Quotes[current].OutboundLeg.DepartureDate;
        var thisDepartureDate = thisDepartureDate.slice(0, 10);
        var thisArrivalDate = thisQuery.Quotes[current].InboundLeg.DepartureDate;
        var thisArrivalDate = thisArrivalDate.slice(0, 10);
        //Boolean
        var directFlight = thisQuery.Quotes[current].Direct;

        var thisFlight = {
            thisFlight: quotesPrice,
            carrierOut: thisCarrierOut,
            carrierIn: thisCarrierIn,
            depart: thisDepartureDate,
            arrive: thisArrivalDate,
            direct: directFlight
        };

        allFlights.push(thisFlight);
    }

    return allFlights;

}

function getFlight() {
    var storedFlightInfo = localStorage.getItem("flight");
    if (storedFlightInfo) {
        return storedFlightInfo;
    }
}

function previous() {
    counter = counter - 5;
}

function next() {
    counter = counter + 5;
}

function storeFlight(flightInfo) {
    localStorage.setItem("flight", flightInfo);
}

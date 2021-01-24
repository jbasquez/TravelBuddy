var counter = 0;
var current = counter;

var allFlights = [];
var thisQuery;

var outboundY;
var outboundM;
var inboundY;
var inboundM;

var errorPlace  = $("#errorPlace");
var errorMessage = $("<p>");

var goHotel = false;
var outDay;
var inDay;

function getAirlineInfo() {

    // Format for each input:
    var country = "US";
    var currency = "USD";
    var locale = "en-US";
    // var origin = "RDU-sky";
    // var destination = "LAX-sky";
    // var outboundDate = "2021-12 or 2021-12-31 or anytime";
    // var inboundDate = "2021-12-30 or 2021-12-31 or anytime";


    var origin = $("#origin").val();
    origin = origin.toUpperCase();
    origin = origin + "-sky";
    var destination = $("#destination").val();
    var destination = destination.toUpperCase();
    var destination = destination + "-sky";
    outboundY = $("#outboundY").val();
    outboundM = $("#outboundM").val();

    var outboundDate = (outboundY + "-" + outboundM).trim();
    inboundY = $("#inboundY").val();
    inboundM = $("#inboundM").val();
    var inboundDate = (inboundY + "-" + inboundM).trim();

    var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/" + country + "/" + currency + "/" + locale + "/" + origin + "/" + destination + "/" + outboundDate + "/" + inboundDate;

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
        statusCode: {
            404: function() {
                errorMessage.text("Server Not Found");
                errorPlace.append(errorMessage);
            },
            400: function() {
                errorMessage.text("Bad Request, Please Check Your Spelling and Try Again");
                errorPlace.append(errorMessage);
            }
        }
    };

    $.ajax(settings).done(function (response) {
        thisQuery = response;
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

function previous() {
    counter = counter - 5;
}

function next() {
    counter = counter + 5;
}

function storeFlight(flightInfo) {
    $("#pageButtons").empty();
    localStorage.setItem("flight", flightInfo);
}

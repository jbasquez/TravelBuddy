//flightInformation = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight]
var flightInformation = getAirlineInfo();
    
//$("#button").on("click", getAirlineInfo(); function(event) { 
//event.preventDefault();
for (var e=0;e<flightInformation.length;e++) {
    var info = $("<p>");
    info.text(flightInformation[e]);
    info.attr("class","flightInformation");
    var putHere = $("#PUTHERE");
    putHere.append(info);
}
// });

$("#next").on("click", next()); 

$("#previous").on("click", previous()); 

$("#saveFlight").on("click", function (){
    if (flightInformation) {
        storeFlight(flightInformation);
    }
});



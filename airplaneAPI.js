    var counter = 0;

    function storeFlight(flightInfo) {
        localStorage.setItem("flight", JSON.stringify(flightInfo))
    }

    function getAirlineInfo() {
        // Format for each input:
        var country = "US";
        var currency = "USD";
        var locale = "en-US";
        var origin = "RDU-sky";
        var destination = "LAX-sky";
        var outboundDate = "2021-01";
        var inboundDate = "2021-01";


        // var country = $("#country").val();
        //var currency = $("#currency").val();
        //var locale = $("#locale").val();
        // var origin = $("#origin").val() + "-sky";
        // var destination = $("#destination").val() + "-sky";
        // var outboundY = $("#outboundY").val();
        // var outboundM = $("#outboundM").val();
        //var outboundD = $("#outboundD").val();
        // var outboundDate = (outboundY + outboundM + outboundD).trim();
        // console.log(outboundDate);
        // var inboundY = $("#inboundY").val();
        // var inboundM = $("#inboundM").val();
        // var inboundD = $("#inboundD").val();
        // var inboundDate = (inboundY + inboundM + inboundD).trim();
        // console.log(inboundDate);

        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/" + country + "/" + currency + "/" + locale + "/" + origin + "/" + destination + "/" + outboundDate + "/" + inboundDate;

        //Using Skyscanner API to get flight information
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "45049d9fb6msh17ba1e94f9859eep1817c7jsn5b1c2edaf89d",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        };

        $.ajax(settings).done(function (response) {
            var options = response.Quotes.length;
            for (counter;counter < counter + 5 && counter < options;counter++) {
            //Number
            var quotesPrice = response.Quotes[counter].MinPrice;
            var thisCarrierOut = response.Quotes[counter].InboundLeg.CarrierIds[0];
            var thisCarrierIn = response.Quotes[counter].OutboundLeg.CarrierIds[0];
            //Assigns a name based on carrier code given for flight
            var carrierNames = response.Carriers.length;
            for (var i=0; i<carrierNames;i++) {
                var thisCarrierOutName = response.Carriers[i].CarrierId;
                var thisCarrierInName = response.Carriers[i].CarrierId;
    
                if  (thisCarrierOut === thisCarrierOutName) {
                thisCarrierOut = response.Carriers[i].Name;
                }

                if  (thisCarrierIn === thisCarrierInName) {
                thisCarrierIn = response.Carriers[i].Name;
                }
            }
            //String
            var thisDepartureDate = response.Quotes[counter].OutboundLeg.DepartureDate;
            var thisDepartureDate = thisDepartureDate.slice(0,10);
            var thisArrivalDate = response.Quotes[counter].InboundLeg.DepartureDate;
            var thisArrivalDate = thisArrivalDate.slice(0,10);
            //Boolean
            var directFlight = response.Quotes[counter].Direct;

            var thisFlight = [quotesPrice,thisCarrierOut,thisCarrierIn,thisDepartureDate,thisArrivalDate,directFlight];
            console.log(thisFlight);
            return thisFlight;
            }
        });
    }

    flightInformation = getAirlineInfo();
    console.log(flightInformation);

    function getFlight() {
        var storedFlightInfo = JSON.parse(localStorage.getItem("flight"));
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

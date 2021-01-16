$("document").ready(function () {

    getLocal();

    // $("#button").on("click", function (event) {
    //     event.preventdefault();
    //     getAirlineInfo();
    // });

    getAirlineInfo();

    function getAirlineInfo() {
        // Format for each input:
        var country = "US"
        var currency = "USD"
        var locale = "en-US"
        var origin = "LAX-sky"
        var destination = "SFO-sky"
        var outboundDate = "2021-01-15"
        var inboundDate = "2021-01-20"

        // var country = $("#country").val();
        //var currency = $("#currency").val();
        //var locale = $("#locale").val();
        // var origin = $("#origin").val() + "-sky";
        // var destination = $("#destination").val() + "-sky";
        // var outboundY = $("#outboundY").val();
        // var outboundM = $("#outboundM").val();
        // var outboundD = $("#outboundD").val();
        // var outboundDate = outboundY + outboundM + outboundD;
        // console.log(outboundDate)
        // var inboundY = $("#inboundY").val();
        // var inboundM = $("#inboundM").val();
        // var inboundD = $("#inboundD").val();
        // var inboundDate = inboundY + inboundM + inboundD;
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
            console.log(response);
            setLocal(queryURL);
        });
    }

    function setLocal(thisURL) {
        var storeThis = thisURL;
        localStorage.setItem("flight", JSON.stringify(storeThis))
    }

    function getLocal() {
        var thisURL = JSON.parse(localStorage.getItem("flight"));
        if (thisURL) {
            queryURL = thisURL;
        }
    }

});
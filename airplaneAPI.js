$("document").ready(function () {

    getLocal();

    // Format for each input:
        // country = "US"
        // currency = "USD"
        // locale = "en-US"
        // origin = "LAX-sky"
        // destination = "SFO-sky"
        // outboundDate = "2021-01-15"
        // inboundDate = "2021-01-20"

        var country = $("#country").val();
        var currency = $("#currency").val();
        var locale = $("#locale").val();
        var origin = $("#origin").val();
        var destination = $("#destination").val();
        var outboundDate = $("#outboundDate").val();
        var inboundDate = $("#inboundDate").val();

        var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/" + country + "/" + currency + "/" + locale + "/" + origin + "/" + destination + "/" + outboundDate + "/" + inboundDate,

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
    });

    function setLocal() {
        
    }

    function getLocal(thisURl) {
        queryURL = JSON.stringify(localStorage.getItem("flight"));
    }

});
$("document").ready(function () {
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

    const settings = {
        "async": true,
        "crossDomain": true,

        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/LAX-sky/SFO-sky/2021-01-15/2021-01-20",

        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/" + country + "/" + currency + "/" + locale + "/" + origin + "/" + destination + "/" + outboundDate + "/" + inboundDate,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "45049d9fb6msh17ba1e94f9859eep1817c7jsn5b1c2edaf89d",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

});
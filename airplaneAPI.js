$("document").ready(function () {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-01-22?inboundpartialdate=2021-01-22&outboundDate=2021-01-26",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "h4hwyekXxImshM8IfqJdMeam7njTp1o5CQFjsnqXKP9CEM9iDD",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

});
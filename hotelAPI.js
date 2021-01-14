$("document").ready(function(){
    var city = "miami";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?query="+ city + "&locale=en_US",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9f5a975ae6mshbca34daf924fdecp158a23jsn28c8dc4d8933",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    };

    // function updatePage(response) {
    //     var results = response;
    //     var 


    // for (var i=0; i <)
    // }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });








});




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

    function updatePage(response) {
        var results = response;
        var hotels = response.suggestions[1].entities;
        console.log(results);
        console.log(hotels);

        for (var i = 0; i < hotels.length; i++) {
            var hotelName = hotels[i].name;
            console.log(hotelName);
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    }).then(function(response) {
        updatePage(response)
    })
    ;

    
    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=1178275040",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "9f5a975ae6mshbca34daf924fdecp158a23jsn28c8dc4d8933",
    //         "x-rapidapi-host": "hotels4.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });






});




$("document").ready(function(){
    var city = "miami";
    var hotelName;
    var destinationId;
    var destinationIDs = [];
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
            var destinationId = hotels[i].destinationId;
            console.log(hotelName, destinationId);
            destinationIDs.push(destinationId);

        }
        console.log(destinationIDs);
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    }).then(function(response) {
        updatePage(response)
        getInfo(response);
    });

    function getInfo(response) {
        var checkIn = "2020-01-08";
        var checkOut= "2020-01-15";

        for (var i = 0; i < destinationIDs.length; i++) {
            var destinationNum = destinationIDs[i];
        
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId=" + destinationNum + "&pageNumber=1&checkIn=" + checkIn + "&checkOut=" + checkOut + "&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE",
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "9f5a975ae6mshbca34daf924fdecp158a23jsn28c8dc4d8933",
                    "x-rapidapi-host": "hotels4.p.rapidapi.com"
                }
            }
        
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        };
    }






});




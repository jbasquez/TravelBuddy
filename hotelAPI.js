    function callHotels() { 
        
    var hotels = $("#flightsAndHotels");
    hotels.empty();

    var city = "miami";
    var hotelName;
    var hotelPic;
    var rating;
    var image;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?query="+ city + "&locale=en_US",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0cded407b3mshf97093a75a9b392p13a5a5jsn15012c150eb9",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
    }).then(function(response) {
        updatePage(response);
    });
    }

    function updatePage(response) {
        var location = response.suggestions[0].entities[0].destinationId;
        var checkIn = "2020-01-20";
        var checkOut= "2020-01-25";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId=" + location + "&pageNumber=1&checkIn=" + checkIn + "&checkOut=" + checkOut + "&pageSize=5&adults1=1&currency=USD&starRatings=4&locale=en_US&sortOrder=PRICE&guestRatingMin=6",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "0cded407b3mshf97093a75a9b392p13a5a5jsn15012c150eb9",
                "x-rapidapi-host": "hotels4.p.rapidapi.com"
            }
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response);
        }).then(function(response) {
            getMoreInfo(response);
        });

    }

    function getMoreInfo(response) {
        var results = response;
        var suggestions = results.data.body.searchResults.results;

        for (var i = 0; i < suggestions.length; i++) {
            var hotelName = suggestions[i].name;
            var rating = suggestions[i].guestReviews.rating + "/10";
            var hotelPic = suggestions[i].thumbnailUrl;
            console.log(hotelName, hotelPic, rating);
        }
        // displayResults();
    }

    function displayResults() {
        $("#").append(hotelName);
        $("#").append(rating);
        var image = $("<img>");
        image.attr("src", hotelPic);
        $("#").append(image);
    }





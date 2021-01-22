var hotelArray = [];
var hotelQuery;

function callHotels() { 
    counter = 0;
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
    var checkIn = "2021-02-20";
    var checkOut= "2021-02-25";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId=" + location + "&pageNumber=1&checkIn=" + checkIn + "&checkOut=" + checkOut + "&pageSize=25&adults1=1&currency=USD&starRatings=4&locale=en_US&sortOrder=PRICE&guestRatingMin=6",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0cded407b3mshf97093a75a9b392p13a5a5jsn15012c150eb9",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    }

    $.ajax(settings).done(function (response) {
    }).then(function(response) {
        hotelQuery = response;
        getMoreInfo();
    });

}

function getMoreInfo() {
    var suggestions = hotelQuery.data.body.searchResults.results;
    hotelArray = [];
    current = counter;

    for (counter = current; current < counter + 5 && current < suggestions.length; current++) {

        var hotelName = suggestions[current].name;
        var rating = suggestions[current].guestReviews.rating + "/10";
        var hotelPic = suggestions[current].thumbnailUrl;

        var hotelObject = {
            thisName: hotelName,
            thisRating: rating,
            thisUrl: hotelPic
        };
        hotelArray.push(hotelObject);

    }
    if (hotelArray.length > 0) {
        displayResults();
    } else {
        displayEmpty();
    }

}

function displayEmpty() {
    var noHotels = $("#flightsAndHotels");
    var hotelsP = $("<p>");
    hotelsP.text("No hotels available at this time!");
    noHotels.append(hotelsP);
}

function displayResults() {
    // $("#").append(hotelName);
    // $("#").append(rating);
    // var image = $("<img>");
    // image.attr("src", hotelPic);
    // $("#").append(image);

    for (var z=0; z < hotelArray.length; z++) {

        var image = hotelArray[z].thisUrl;
        var name = hotelArray[z].thisName;
        var newRating = hotelArray[z].thisRating;
        var test = $("<img>");
        test.attr("src", image);
        var nameP = $("<p>");
        var ratingP = $("<p>");
        nameP.text(name);
        ratingP.text(newRating);
        var appendHotel = $("#flightsAndHotels");
        appendHotel.append(test);
        appendHotel.append(nameP);
        appendHotel.append(ratingP);
        var button = $("<button>");
        button.attr("class","saveHotel");
        button.attr("value", name + "~" + newRating + "~" + image);
        button.attr("onClick", "saveHotel($(this).val()), showSavedHotel()");
        button.text("Click to Save");
        appendHotel.append(button);
    }    
}

function saveHotel(hotelInfo) {
    localStorage.setItem("hotel", hotelInfo);
}






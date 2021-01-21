var hotelArray = [];
var hotelQuery;

function callHotels() {
    counter = 0;

    var hotelPlace = $("#flightsAndHotels");
    hotelPlace.empty();

    var city = "miami";

    var location;
    var hotelName;
    var hotelPic;
    var rating;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?query=" + city + "&locale=en_US",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0cded407b3mshf97093a75a9b392p13a5a5jsn15012c150eb9",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function () {
    }).then(function (response) {
        updatePage(response);
    });
}

function updatePage(response) {
    var location = response.suggestions[0].entities[0].destinationId;
    var checkIn = "2020-01-20";
    var checkOut = "2020-01-25";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId=" + location + "&pageNumber=1&checkIn=" + checkIn + "&checkOut=" + checkOut + "&pageSize=10&adults1=1&currency=USD&starRatings=4&locale=en_US&sortOrder=PRICE&guestRatingMin=6",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0cded407b3mshf97093a75a9b392p13a5a5jsn15012c150eb9",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    }

    $.ajax(settings).done(function (response) {
    }).then(function (response) {
        hotelQuery = response;
        getMoreInfo();
    });

}

function getMoreInfo() {
    hotelArray = [];

    var suggestions = hotelQuery.data.body.searchResults.results;

    current = counter;

    //5 = 5             5 < 5+5                  5<30               5+1
    for (counter = current; current < counter + 5 && current < suggestions.length; current++) {
        console.log("counter = " + counter);
        console.log("current = " + current);
        var hotelName = suggestions[current].name;
        var rating = suggestions[current].guestReviews.rating + "/10";
        var hotelPic = suggestions[current].thumbnailUrl;

        var hotelObject = {
            thisName: hotelName,
            thisRating: rating,
            thisURL: hotelPic
        };

        hotelArray.push(hotelObject);
    }
    console.log(hotelArray);
    if (hotelArray.length > 0) {
    appendHotel();
    }
}

function appendHotel() {

    var appendHotel = $("#flightsAndHotels");
    appendHotel.empty();

    for (var e = 0; e < hotelArray.length; e++) {
        var nameP = $("<p>");
        var newName = hotelArray[e].thisName;
        nameP.text(newName);

        var ratingP = $("<p>");
        var newRating = hotelArray[e].thisRating;
        ratingP.text(newRating);

        var newImage = $("<img>");
        var image = hotelArray[e].thisURL;
        newImage.attr("src", image);

        appendHotel.append(nameP);
        appendHotel.append(ratingP);
        appendHotel.append(newImage);
    }
}

function storeHotel(hotelInfo) {
    localStorage.setItem("flight", flightInfo);
}


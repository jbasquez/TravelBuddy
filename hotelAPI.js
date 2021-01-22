var hotelArray = [];
var hotelQuery;

function showSavedHotel() {

    var hideInfo = $("#flightsAndHotels");
    hideInfo.empty();

    var storedHotelInfo = localStorage.getItem("hotel");
    var storedHotelArray = storedHotelInfo.split("~");

    var appendHotel = $(".savedFlight");

    var thisHotelName = $("<p>");
    var thisHotelRating = $("<p>");
    var thisHotelUrl = $("<img>");
    var thisHeading = $("<h2>");
    thisHeading.attr("class","hotelHeader");

    thisHeading.text("Your Hotel Information")
    thisHotelName.text("Name: " + storedHotelArray[0]);
    thisHotelRating.text("User Rating: " + storedHotelArray[1]);
    thisHotelUrl.attr("src",storedHotelArray[2]);

    appendHotel.append(thisHeading);
    appendHotel.append(thisHotelName);
    appendHotel.append(thisHotelRating);
    appendHotel.append(thisHotelUrl);


}

showSavedHotel();

function callHotels() {
    counter = 0;

    var hotelPlace = $("#flightsAndHotels");
    hotelPlace.empty();

    var city = "miami";

    var location;
    var hotelName;
    var hotelPic;
    var rating;
    var image;
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
    var checkIn = "2020-02-10";
    //var checkIn = outDay;
    var checkOut = "2020-02-15";
    //var checkOut = inDay;

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
    
    if (hotelArray.length > 0) {
    appendHotel();
    }
}

function appendHotel() {

    var hotelShow = $("#flightsAndHotels");
    hotelShow.empty();

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

        var button = $("<button>");
        button.attr("class", "saveFlight");
        button.attr("value", newName + "~" + newRating + "~" + image);
        button.attr("onClick", "saveHotel($(this).val()), showSavedHotel()");
        button.text("Click to Save");
        
        hotelShow.append(nameP);
        hotelShow.append(ratingP);
        hotelShow.append(newImage);
        hotelShow.append(button);
    }
}

function saveHotel(hotelInfo) {
    localStorage.setItem("hotel", hotelInfo);
}
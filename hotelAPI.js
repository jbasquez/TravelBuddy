var hotelArray = [];
var hotelQuery;
var suggestions;


function showSavedHotel() {
    var showHotels = $(".savedHotel");
    var hideHotels = $("#flightsAndHotels");
    hideHotels.empty();
    var getHotelInfo = localStorage.getItem("hotel");
    var getHotelArray = getHotelInfo.split("~");
    var hotelNameP = $("<p>");
    var ratingPTag = $("<p>");
    var imageTag = $("<img>");
    var hotelHeading = $("<h2>");
    hotelNameP.text("Name: " + getHotelArray[0]);
    ratingPTag.text("Guest Rating: " + getHotelArray[1]);
    imageTag.attr("src", getHotelArray[2]);
    hotelHeading.text("Your Hotel Information: ");
    showHotels.append(hotelHeading);
    showHotels.append(hotelNameP);
    showHotels.append(ratingPTag);
    showHotels.append(imageTag);
}

function callHotels() { 
    counter = 0;
    var hotels = $("#flightsAndHotels");
    hotels.empty();

    var city = $("#city").val();
    
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
    var checkIn = inboundY + "-" + inboundM + "-" + inDay;
    var checkOut = outboundY + "-" + outboundM + "-" + outDay;
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
    }).then(function(response) {
        hotelQuery = response;
        var check = hotelQuery.data.body.searchResults.results;
        if (check.length > 0) {
            getMoreInfo();
        } else {
            displayEmpty();
        }
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

    console.log(hotelArray);
    displayResults();
}

function displayEmpty() {
    var noHotels = $("#flightsAndHotels");
    var hotelsP = $("<h2>");
    hotelsP.text("No hotels available at this time!");
    noHotels.append(hotelsP);
}

function displayResults() {
    var appendHotel = $("#flightsAndHotels");
    if (hotelArray.length > 0) {
        appendHotel.empty();
    }
    for (var z=0; z < hotelArray.length; z++) {
        var image = hotelArray[z].thisUrl;
        console.log(image);
        var name = hotelArray[z].thisName;
        var newRating = hotelArray[z].thisRating;

        var test = $("<img>");
        test.attr("src", image);

        var nameP = $("<p>");
        nameP.text(name);

        var ratingP = $("<p>");
        ratingP.text(newRating);

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
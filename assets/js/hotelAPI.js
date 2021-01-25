var hotelArray = [];
var hotelQuery;
var suggestions;


function showSavedHotel() {
    var showHotels = $(".savedHotel");
    $("#hotels").empty();
    showHotels.empty();
    var getHotelInfo = localStorage.getItem("hotel");
    if (getHotelInfo) {
        var getHotelArray = getHotelInfo.split("~");

        var infoCard = $("<div>");
        // var columns = $("<table><row class='info'><col id='25'><col id='26'>");
        infoCard.attr("class", "card saveCard ml-5 mt-2 mr-n2 mb-2 pl-5 pt-3 pr-5 pb-5");
        infoCard.hide().fadeIn(700);
        showHotels.append(infoCard);

        var hotelNameP = $("<p>");
        var ratingPTag = $("<p>");
        var imageTag = $("<img>");
        imageTag.attr("id", "hotelPic");
        var hotelHeading = $("<h2>");
        hotelNameP.text("Name: " + getHotelArray[0]);
        ratingPTag.text("Guest Rating: " + getHotelArray[1]);
        imageTag.attr("src", getHotelArray[2]);
        hotelHeading.text("Your Hotel Information: ");
        // infoCard.append(columns);

        // var infoCol = $("#25");
        // var picCol = $("#26");
        infoCard.append(hotelHeading);
        infoCard.append(hotelNameP);
        infoCard.append(ratingPTag);
        infoCard.append(imageTag);
    }
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
        "beforeSend": function () {
            $("#loadingGif").show();
        },
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "45049d9fb6msh17ba1e94f9859eep1817c7jsn5b1c2edaf89d",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        },
        // "success": function () {
        //     $("#loadingGif").hide();

        // },
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
        "url": "https://hotels4.p.rapidapi.com/properties/list?destinationId=" + location + "&pageNumber=1&checkIn=" + checkIn + "&checkOut=" + checkOut + "&pageSize=25&adults1=1&currency=USD&starRatings=4&locale=en_US&sortOrder=PRICE&guestRatingMin=6",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "45049d9fb6msh17ba1e94f9859eep1817c7jsn5b1c2edaf89d",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    }

    $.ajax(settings).done(function () {
    }).then(function (response) {
        $("#loadingGif").hide();
        hotelQuery = response;
        var check = hotelQuery.data.body.searchResults.results;
        console.log(check);
        if (check.length > 0) {
            getMoreInfo();
        } else {
            displayEmpty();
        }
    });

}

function getMoreInfo() {
    var suggestions = hotelQuery.data.body.searchResults.results;
    console.log(current + " < " + suggestions.length);
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
    console.log(counter);
    if (hotelArray.length > 1) {
    displayResults();
    }
}

function displayEmpty() {
    var noHotels = $("#flightsAndHotels");
    var hotelsP = $("<h2>");
    hotelsP.text("No hotels available at this time!");
    noHotels.append(hotelsP);
}

function displayResults() {
    $("#pageButtons").empty();
    $("#hotels").empty();

    var appendHotel = $("#hotels");

    for (var z = 0; z < hotelArray.length; z++) {
        var image = hotelArray[z].thisUrl;
        var name = hotelArray[z].thisName;
        var newRating = hotelArray[z].thisRating;
        var infoCard = $("<div>");
        infoCard.attr("class", "card ml-2 mt-4 mr-2 mb-2 p-5");
        infoCard.hide().fadeIn(700);
        appendHotel.append(infoCard);
        var hotelImg = $("<img>");
        hotelImg.attr("id", "hotelPic");
        hotelImg.attr("class", "mb-2");
        hotelImg.attr("src", image);

        var nameP = $("<p>");
        nameP.text(name);

        var ratingP = $("<p>");
        ratingP.text(newRating);
        infoCard.append(nameP);
        infoCard.append(ratingP);
        infoCard.append(hotelImg);

        var button = $("<button>");
        button.attr("class", "mt-2 btn btn-light btn-sm clickToSave");
        button.attr("value", name + "~" + newRating + "~" + image);
        button.attr("onClick", "saveHotel($(this).val()), showSavedHotel()");
        button.text("Click to Save");

        infoCard.append(button);
    }

    appendButtons();
}

function saveHotel(hotelInfo) {
    $("#pageButtons").empty();
    localStorage.setItem("hotel", hotelInfo);
}

$("#showBtn").on("click", function(event) {
    event.preventDefault();
    $("#startMessage").empty();
    showSavedHotel();
    showSavedFlight();
});
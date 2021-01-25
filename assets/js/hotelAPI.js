var hotelArray = [];
var hotelQuery;
var suggestions;


function showSavedHotel() {

    var showHotels = $(".savedHotel");

    //Clearing out the previous hotels being shown
    $("#hotels").empty();
    showHotels.empty();

    var getHotelInfo = localStorage.getItem("hotel");
    if (getHotelInfo) {
        var getHotelArray = getHotelInfo.split("~");

        //Creating a div for the hotels to append to
        var infoCard = $("<div>");
        infoCard.attr("class", "card saveCard ml-5 mt-2 mr-n2 mb-2 pl-5 pt-3 pr-5 pb-5");
        infoCard.attr("id", "hotelsCard");

        infoCard.hide().fadeIn(700);

        showHotels.append(infoCard);

        $("#hotelsCard").hide();
        $("#hotelsCard").show(700);

        //Creating variables to append
        var hotelNameP = $("<p>");
        var ratingPTag = $("<p>");
        var imageTag = $("<img>");
        imageTag.attr("id", "hotelPic");

        //Formatting for hotel information
        var hotelHeading = $("<h2>");
        hotelNameP.text("Name: " + getHotelArray[0]);
        ratingPTag.text("Guest Rating: " + getHotelArray[1]);
        imageTag.attr("src", getHotelArray[2]);
        hotelHeading.text("Your Hotel Information: ");

        //Appending all the hotel information to the card
        infoCard.append(hotelHeading);
        infoCard.append(hotelNameP);
        infoCard.append(ratingPTag);
        infoCard.append(imageTag);
    }
}

//Runs after user saves a flight
function callHotels() {
    
    counter = 0;
    var hotels = $("#flightsAndHotels");
    hotels.empty();

    var city = $("#city").val();

    //Ajax call to get hotel city
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?query=" + city + "&locale=en_US",
        "beforeSend": function () {
            $("#loadingGif").show();
        },
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "172a12658dmsh8efc0e1a3ac3685p1055f7jsn29d703b0b8d7",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        },
    };

    $.ajax(settings).done(function () {
    }).then(function (response) {
        updatePage(response);
    });
}

//Ajax call to get information based on previous hotel city
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
            "x-rapidapi-key": "172a12658dmsh8efc0e1a3ac3685p1055f7jsn29d703b0b8d7",
            "x-rapidapi-host": "hotels4.p.rapidapi.com"
        }
    }

    $.ajax(settings).done(function () {
    }).then(function (response) {
        $("#loadingGif").hide();
        hotelQuery = response;
        var check = hotelQuery.data.body.searchResults.results;
        //if there are no responses inform the user of such
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
    //Keeps track of the users position the in the returned array
    //Exits loop after 5 things are appended or the limit of 25 hotel options is reached
    //  5=5                 5<10                     5<25                          5+1
    for (counter = current; current < counter + 5 && current < suggestions.length; current++) {
        var hotelName = suggestions[current].name;
        var rating = suggestions[current].guestReviews.rating + "/10";
        var hotelPic = suggestions[current].thumbnailUrl;
        //Creates an object for each hotel entry
        var hotelObject = {
            thisName: hotelName,
            thisRating: rating,
            thisUrl: hotelPic
        };
        //Pushes the hotel information into an array for later use
        hotelArray.push(hotelObject);

    }
    //If anything was pushed into the array, show it to user
    if (hotelArray.length > 1) {
    displayResults();
    }
}

//Informs the user that no hotels were found for the chosen city
function displayEmpty() {
    var noHotels = $("#flightsAndHotels");
    var hotelsP = $("<h2>");
    hotelsP.text("No hotels available at this time!");
    noHotels.append(hotelsP);
}

//Displays the hotel information for the chosen city
function displayResults() {
    $("#pageButtons").empty();
    $("#hotels").empty();

    var appendHotel = $("#hotels");

    var titleH2 = $("<h2>");
    titleH2.text("Hotels:");
    titleH2.hide().fadeIn(700);
    appendHotel.append(titleH2);
    
    //Appends hotel information to a created card for each hotel in array
    for (var z = 0; z < hotelArray.length; z++) {
        var image = hotelArray[z].thisUrl;
        var name = hotelArray[z].thisName;
        var newRating = hotelArray[z].thisRating;
        //Creates the card to hold information
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
        ratingP.text("Guest Rating: " + newRating);
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
    //Adds the Previous and Next buttons to the card
    appendButtons();
}

//Saves the chosen hotel information to local storage
function saveHotel(hotelInfo) {
    $("#pageButtons").empty();
    localStorage.setItem("hotel", hotelInfo);
}

//Shows the most recently saved Flight and Hotel
$("#showBtn").on("click", function(event) {
    event.preventDefault();
    $("#startMessage").empty();
    showSavedHotel();
    showSavedFlight();
});
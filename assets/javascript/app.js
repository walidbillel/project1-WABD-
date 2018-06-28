



// Event Handler for the first API that pulls the events when clicking the submit button
$("#submit").on("click", function () {


  // using the Animate lib to do some fun stuff
  $(".eventAnime").addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass("animated rollOut");
  });


  event.preventDefault();

  // Creating a variable that holds the performers and then get the value entered
  var artistAjax = $("#performers").val();
  // Replacing spaces with dashes so the callback works proprely
  artistAjax = artistAjax.split(" ").join("-");
  artistAjax = artistAjax.toLowerCase();

  // Creating a variable that holds the city and then get the value entered
  var cityAjax = $("#where").val();
  // Replacing spaces with dashes so the callback works proprely
  cityAjax = cityAjax.split(" ").join("-");
  // changing it to lower case
  cityAjax = cityAjax.toLowerCase();



  // Creating a variable that holds the wordkey and then get the value enetered
  var keywordAjax = $("#keywords").val();
  keywordAjax = keywordAjax.split(" ").join("-");
  keywordAjax = keywordAjax.toLowerCase();

  
  // Creating the callback queryURL based on the parameters eneterd
  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artistAjax + "&q=" + keywordAjax + "&venue.city=" + cityAjax + "&client_id=MTIwMDM0Mjl8MTUyOTUzNDYwOS42&per_page=1000";


  // Creating the Ajax call for the first API (seatgeek)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response1) {
    console.log(queryURL);
    // empty the result so each time it loads with new results and not putting them over each other
    $("#results").empty();

    // creating a variable that holds the events
    var results = response1.events;

    // looping over the results
    for (var i = 0; i < results.length; i++) {

      // creating a div that holds the results
      var ourDiv = $("<div>");

      // Getting the title from the ajax call then append it to the results with some css touches
      var title = $("<p>");
      title.append("<b> Event Name: </b>" + results[i].title);
      title.css("font-family", "Roboto, sans-serif");
      title.css("padding", "15px");
      title.css("font-size", "16px");
      title.css("background-color", "#0080FF");
      title.css("border-radius", "25px");
      title.css("color", "white");
      title.css("text-align", "center");

      ourDiv.append(title, "<hr>");

      // Creating a type var and getting the results from the ajax call
      var type = $("<p>");
      type.append("<b>Event Type: </b>" + results[i].type);
      ourDiv.append(type);

      // getting the image from the call and appending it to the results
      var image = $("<img>");
      // console.log(results[i].performers[0].image);
      image.attr("src", results[i].performers[0].image);
      // console.log(image);
      ourDiv.append(image);


      // getting the date and time from the call and appending it to the results
      var dateAndTime = $("<p>");
      // getting the date and time with the ajax format
      var timeDefault = results[i].datetime_local;
      // console.log(timeDefault);
      // using moment js to change the format to LLLL
      var timeFixed = moment(timeDefault).format("LLLL");
      // console.log(timeFixed);
      // appending the timefixed to our results
      dateAndTime.append("<hr>", "<b> Date & Time: </b>" + timeFixed);
      // appending to our div
      ourDiv.append(dateAndTime);
      


      // getting the venue name and appending it to the results
      var venueName = $("<p>");
      venueName.append("<b>Venue Name: </b>" + results[i].venue.name);
      ourDiv.append(venueName);

      // creating a p tag that will hold the address
      var venueAddress = $("<p>");
      // appending the address with the results from the ajax call
      venueAddress.append("<b>Venue Address: </b>" + results[i].venue.address + ", " + results[i].venue.extended_address);
      // giving it an attribute of address so we can print it laster
      venueAddress.attr("address", results[i].venue.address + ", " + results[i].venue.extended_address);
      // adding a class to use for the event handler down below
      venueAddress.addClass("address");
      // event handler that execute the function below when the address is clicked
      $(document).on("click", ".address", function(){
        // Getting the value from the attribute we gave above
        var dest = $(this).attr("address");
        // console.log(dest);
        // putting the value in the destination box
        $("#destination").val(dest);
        // Using animate css to do some fun stuff when the address is clicked
        $(".address").addClass("animated rollOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass("animated rollOut");
        });
      });
      // appending our address to the div
      ourDiv.append(venueAddress);

      // getting the prices and appending them to the results
      var pricesRange = $("<h6>");
      // if the prices are not available print out what's below
      if (results[i].stats.lowest_price == null && results[i].stats.average_price == null, results[i].stats.lowest_price === null) {
        ourDiv.append(" <b> Prices are unavailable! Check the link below for more information.</b>","<br><br><br><br>");
        // else (if prices are available print them out)
      } else {
        pricesRange.append("Lowest Price: $" + results[i].stats.lowest_price, "<br>");
        pricesRange.append("average Price: $" + results[i].stats.average_price, "<br>");
        pricesRange.append("highest Price: $" + results[i].stats.highest_price);
        ourDiv.append(pricesRange);
      }



      // getting the ticket url and appending it to the results as an embeded link in a button
      var ticketUrl = $("<button>");
      ticketUrl.addClass("btn btn-");
      ticketUrl.attr("id", "ticket")
      ticketUrl.css("position", "relative");
      ticketUrl.css("bottom", "2px");
      ticketUrl.append("<a href=" + "'" + results[i].url + "'" + ">" + "<b> Buy Tickets! </b>" + "</a>");
      ourDiv.append(ticketUrl,  "<hr>");

      // showing our results on the page
      $("#results").append(ourDiv);
    }
  });
});






// Event Handler for the second API that pulls the directions when clicking the submit button
$("#submit-direction").on("click", function () {

  // using the Animate lib to do some fun stuff
  $(".directionAnime").addClass("animated zoomOutDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass("animated zoomOutDown");
  });

  event.preventDefault();

  // creating a variable that holds the current location then getting the value enetered
  var currentLocaAjax2 = $("#current-location").val();
  // replacing spaces with "+" so the ajax call works proprely
  currentLocaAjax2 = currentLocaAjax2.split(" ").join("+");
 
  // creating a variable that holds the destination then getting the value enetered
  var destinationAjax2 = $("#destination").val();
  destinationAjax2 = destinationAjax2.split(" ").join("+");
  // console.log(destinationAjax2);


  //  Creating the second callback queryURL from mapquest based on the parameters eneterd
  queryURL = "http://www.mapquestapi.com/directions/v2/route?key=DZcQ6A8PzsQFGMHAqxissAvWHreJTluG&from=" + currentLocaAjax2 + "&to=" + destinationAjax2 + "&enhancedNarrative=true"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response2) {
    console.log(queryURL);

    // empty the result so each time it loads with new results and not putting them over each other
    $("#direction-result").empty();

    // creating a variable that holds the results
    var results = response2.route;

    // creating a p tag
    var totalDistance = $("<p>");
    // getting the data for total distance from the ajax call
    totalDistance = results.distance;
    // Appending the information to the results (on webpage)
    $("#direction-result").append(" <b> Total Distance: </b>" + totalDistance + " Miles. " + "<hr>");


    // creating a variable that holds maneuvers and getting the data from the ajax call
    var maneuversDir = results.legs[0].maneuvers;
    // console.log(maneuversDir);

    // looping over the array and getting information
    for (var i = 0; i <= maneuversDir.length - 1; i++) {

      // if we are in the last maneuver we print without miles and append to our results
      if (i == maneuversDir.length - 1) {
        var narrativeDirection = $("<li>");
        var narrativeDistance = maneuversDir[i].distance;
        narrativeDirection.append(maneuversDir[i].narrative);
        $("#direction-result").append(narrativeDirection);

        // else we append results with each maneuver's miles
      } else if (i < maneuversDir.length - 1) {
        var narrativeDirection = $("<li>");
        var narrativeDistance = maneuversDir[i].distance;
        narrativeDirection.append(maneuversDir[i].narrative + " for: " + narrativeDistance + " Miles. " + "<hr>");
        $("#direction-result").append(narrativeDirection);
      }
    }
  });
});



// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-8hqysBzeElEDP5mjEFa2BpJsM3W8eTk",
  authDomain: "project-happenin.firebaseapp.com",
  databaseURL: "https://project-happenin.firebaseio.com",
  projectId: "project-happenin",
  storageBucket: "project-happenin.appspot.com",
  messagingSenderId: "167007450235"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

$("#submit-direction").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var currentLocationFirebase = $("#current-location").val().trim();
  var destinationFirebase = $("#destination").val().trim();

  // Creates local temp object
  var userLocationInput = {
    startingLocation: currentLocationFirebase,
    destination: destinationFirebase
  };

  // pushing the locations entered as an /locations 
  database.ref("/locations").push(userLocationInput);

  $("#current-location").val("");
  $("#destination").val("");
});

database.ref("/locations").on("child_added", function (locSnapshot) {

  var currentLocationFirebase = locSnapshot.val().currentLocation;
  var destinationFirebase = locSnapshot.val().destination;
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// Initial Values
//var locFirebase = "";
//var artistFirebase = "";

// Capture Button Click
$("#submit").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var whereFirebase = $("#where").val().trim();
  var performersFirebase = $("#performers").val().trim();
  var keywordsFirebase = $("#keywords").val().trim();

  // Creates local temp object
  var userInput = {
    artist: performersFirebase,
    where: whereFirebase,
    keywords: keywordsFirebase,
  };

  //Uploads to database as under /events
  database.ref("/events").push(userInput);

  // console.log(userInput.artist);
  // console.log(userInput.where);
  // console.log(userInput.when);
  // console.log(userInput.keywords);

  // Clears all of the text-boxes
  $("#where").val("");
  $("#performers").val("");
  $("#keywords").val("");
});

//Firebase watcher + initial loader

database.ref("/events").on("child_added", function (childSnapshot) {
  //console.log(childSnapshot.val().locFirebase);
  // console.log(childSnapshot.val());

  // Store everything into a variable

  var whereFirebase = childSnapshot.val().where;
  var performersFirebase = childSnapshot.val().artist;
  var keywordsFirebase = childSnapshot.val().keywords;
  // console.log(whereFirebase);
  // console.log(whenFirebase);
  // console.log(performersFirebase);
  // console.log(keywordsFirebase);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



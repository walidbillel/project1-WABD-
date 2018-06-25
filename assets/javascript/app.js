



// Event Handler for the first API that pulls the events when clicking the submit button
$("#submit").on("click", function () {

  // show the results divs when clicking on the sumbit buttons
  // $(".resultShow").show();
  // $(".directionShow").show();
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


  // Creating a variable that holds the datetime and get the value entered for the ajax call
  var datePicked = $("#when").val();
  datePicked = (moment(datePicked).format("YYYY[-]MM[-]DD"));

  // console.log(dateFixed);

  // console.log(datePicked);


  // Creating the callback queryURL based on the parameters eneterd
  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artistAjax + "&q=" + keywordAjax + "&venue.city=" + cityAjax + "&datetime_local=" + datePicked + "T19:00:00&client_id=MTIwMDM0Mjl8MTUyOTUzNDYwOS42";


  // Creating the Ajax call for the first API seatgeek
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

      // Getting the title from the ajax call then append it to the results
      var title = $("<p>");
      title.append("<b>Event Name: </b>" + results[i].title);
      ourDiv.append(title, "<hr>");

      // getting the image from the call and appending it to the results
      var image = $("<img>");
      // console.log(results[i].performers[0].image);
      image.attr("src", results[i].performers[0].image);
      // console.log(image);
      ourDiv.append(image);


      // getting the date and time from the call and appending it to the results
      var dateAndTime = $("<p>");
      dateAndTime.append("<hr>", "<b>Date & Time: </b>" + results[i].datetime_local);
      ourDiv.append(dateAndTime);


      // getting the venue name and appending it to the results
      var venueName = $("<p>");
      venueName.append("<b>Venue Name: </b>" + results[i].venue.name);
      ourDiv.append(venueName);

      var venueAddress = $("<p>");
      venueAddress.append("<b>Venue Address: </b>" + results[i].venue.address + ", " + results[i].venue.extended_address);
      ourDiv.append(venueAddress);

      // getting the prices and appending them to the results
      var pricesRange = $("<p>");
      pricesRange.append("Lowest Price: $" + results[i].stats.lowest_price, "<br>");
      pricesRange.append("average Price: $" + results[i].stats.average_price, "<br>");
      pricesRange.append("highest Price: $" + results[i].stats.highest_price);
      ourDiv.append(pricesRange);


      // getting the ticket url and appending it to the results as an embeded link in a text
      var ticketUrl = $("<p>");
      ticketUrl.append("<a href=" + "'" + results[i].url + "'" + ">" + "<b> Get Your Ticket Now! </b>" + "</a>", "<hr>");
      ourDiv.append(ticketUrl);

      // showing our results on the page
      $("#results").append(ourDiv);
    }

  });

});


// Event Handler for the second API that pulls the directions when clicking the submit button
$("#submit-direction").on("click", function () {

  event.preventDefault();

  // creating a variable that holds the current location then getting the value enetered
  var currentLocaAjax2 = $("#current-location").val();
  // replacing spaces with "+" so the ajax call works proprely
  currentLocaAjax2 = currentLocaAjax2.split(" ").join("+");
  // Event Handler for the first API that pulls the events when clicking the submit button
  console.log(currentLocaAjax2);

  // creating a variable that holds the destination then getting the value enetered
  var destinationAjax2 = $("#destination").val();
  destinationAjax2 = destinationAjax2.split(" ").join("+");
  console.log(destinationAjax2);




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
    for (var i = 0; i < maneuversDir.length; i++) {

      if (i > maneuversDir.length) {
        var narrativeDirection = $("<li>");
        var narrativeDistance = maneuversDir[i].distance;
        // Appending our directions to the results (on webpage)
        narrativeDirection.append(maneuversDir[i].narrative + "<hr>");
        $("#direction-result").append(narrativeDirection);
      } else {
        var narrativeDirection = $("<li>");
        var narrativeDistance = maneuversDir[i].distance;
        // Appending our directions to the results (on webpage)
        narrativeDirection.append(maneuversDir[i].narrative + " for: " + narrativeDistance + " Miles. " + "<hr>");
        $("#direction-result").append(narrativeDirection);
      }
    }

  });

});


// -----------------------------------------------------------
// DatePicker
$(".datepicker").pickadate();
// ------------------------------------------------------------


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

// Initial Values
//var locFirebase = "";
//var artistFirebase = "";

// Capture Button Click
$("#submit").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var whereFirebase = $("#where").val().trim();
  var whenFirebase = $("#when").val().trim();
  var performersFirebase = $("#performers").val().trim();
  var keywordsFirebase = $("#keywords").val().trim();
  var currentLocationFirebase = $("#current-location").val().trim();
  var destinationFirebase = $("#destination").val().trim();

  // Creates local temp object

  var userInput = {
    artist: performersFirebase,
    where: whereFirebase,
    when: whenFirebase,
    keywords: keywordsFirebase,
    currentLocation: currentLocationFirebase,
    destination: destinationFirebase
  };

  //Uploads to database
  database.ref().push(userInput);

  // console.log(userInput.artist);
  // console.log(userInput.where);
  // console.log(userInput.when);
  // console.log(userInput.keywords);

  // Clears all of the text-boxes
  $("#where").val("");
  $("#when").val("");
  $("#performers").val("");
  $("#keywords").val("");
  $("#current-location").val("");
  $("#destination").val();
});

//Firebase watcher + initial loader

database.ref().on("child_added", function (childSnapshot) {
  //console.log(childSnapshot.val().locFirebase);
  // console.log(childSnapshot.val());

  // Store everything into a variable

  var whereFirebase = childSnapshot.val().where;
  var whenFirebase = childSnapshot.val().when;
  var performersFirebase = childSnapshot.val().artist;
  var keywordsFirebase = childSnapshot.val().keywords;
  var currentLocationFirebase = childSnapshot.val().currentLocation;
  var destinationFirebase = childSnapshot.val().destination;

  // console.log(whereFirebase);
  // console.log(whenFirebase);
  // console.log(performersFirebase);
  // console.log(keywordsFirebase);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



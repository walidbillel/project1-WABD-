//Testing Header Slideshow

// Building up the ajax call




$("#submit").on("click", function () {

  event.preventDefault();

  var artistAjax = $("#performers").val();
  artistAjax = artistAjax.split(" ").join("-");
  artistAjax = artistAjax.toLowerCase();

  var cityAjax = $("#where").val();
  cityAjax = cityAjax.split(" ").join("-");
  cityAjax = cityAjax.toLowerCase();

  // var dateAjax = $("#when").val();

  var keywordAjax = $("#keywords").val();
  keywordAjax = keywordAjax.split(" ").join("-");
  keywordAjax = keywordAjax.toLowerCase();





  // console.log(artistAjax);
  // console.log(cityAjax);

  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artistAjax + "&q=" + keywordAjax + "&venue.city=" + cityAjax + "&client_id=MTIwMDM0Mjl8MTUyOTUzNDYwOS42";

  // console.log(queryURL);
  // Performing the ajax request with the queryURL



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response1) {
    // console.log(queryURL);
    $("#results").empty();

    var results = response1.events;

    for (var i = 0; i < results.length; i++) {

      var ourDiv = $("<div>");

      var title = $("<h3>");
      title.append(results[i].title);
      ourDiv.append(title, "<hr>");

      var image = $("<img>");
      // console.log(results[i].performers[0].image);
      image.attr("src", results[i].performers[0].image);
      // console.log(image);
      ourDiv.append(image);


      var dateAndTime = $("<p>");
      dateAndTime.append("<hr>", "<b>Date & Time: </b>" + results[i].datetime_local);
      ourDiv.append(dateAndTime);


      var venueName = $("<p>");
      venueName.append("<b>Venue Name: </b>" + results[i].venue.name);
      ourDiv.append(venueName);

      var venueAddress = $("<p>");
      venueAddress.append("<b>Venue Address: </b>" + results[i].venue.address + ", " + results[i].venue.extended_address);
      ourDiv.append(venueAddress);

      var pricesRange = $("<p>");
      pricesRange.append("Lowest Price: $" + results[i].stats.lowest_price, "<br>");
      pricesRange.append("average Price: $" + results[i].stats.average_price, "<br>");
      pricesRange.append("highest Price: $" + results[i].stats.highest_price);
      ourDiv.append(pricesRange);

      var ticketUrl = $("<p>");
      ticketUrl.append("<a href=" + "'" + results[i].url + "'" + ">" + "<b> Get Your Ticket Now! </b>" + "</a>", "<hr>");
      ourDiv.append(ticketUrl);


      $("#results").append(ourDiv);
    }


  });

});



$("#submit-direction").on("click", function () {

  event.preventDefault();

  var currentLocaAjax2 = $("#current-location").val();
  currentLocaAjax2 = currentLocaAjax2.split(" ").join("+");
  console.log(currentLocaAjax2);

  var destinationAjax2 = $("#destination").val();
  destinationAjax2 = destinationAjax2.split(" ").join("+");
  console.log(destinationAjax2);





  queryURL = "http://www.mapquestapi.com/directions/v2/route?key=DZcQ6A8PzsQFGMHAqxissAvWHreJTluG&from=" + currentLocaAjax2 + "&to=" + destinationAjax2 + "&enhancedNarrative=true"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response2) {
    console.log(queryURL);
    $("#results").empty();

    var results = response2.route;


    var totalDistance = results.distance + " miles";

    console.log("Total Distance is: " + totalDistance);
    $("#direction-result").append("Total Distance: " + totalDistance);

    var maneuversDir = results.legs[0].maneuvers;
    // console.log(maneuversDir);

    for (var i = 0; i < maneuversDir.length; i++) {


      var narrativeDir = maneuversDir[i].narrative;
      // console.log(narrativeDir)
      var narrDistance = maneuversDir[i].distance;


      step = narrativeDir + " For " + narrDistance + " miles, then =>";
      console.log(step)


      $("#direction-result").append(step);


      // console.log(maneuversDir[i].narrative);
      // console.log(maneuversDir[i].distance);
    }


  });

});





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

  // Creates local temp object

  var userInput = {
    artist: performersFirebase,
    where: whereFirebase,
    when: whenFirebase,
    keywords: keywordsFirebase
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

  // console.log(whereFirebase);
  // console.log(whenFirebase);
  // console.log(performersFirebase);
  // console.log(keywordsFirebase);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



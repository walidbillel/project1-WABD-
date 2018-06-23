//Testing Header Slideshow

// Building up the ajax call






// creating our queryUrl variables so we can target the right API when the inputs are entered
// // var locationAjax = $("#location").val().trim();
// var locationAjax = "New+York";

// // .replaceSpace.replace(" ", "+");
// console.log("should be here"+ locationAjax);
// var categoryAjax = "art";
// // var categoryAjax = $("#category").val().trim();
// // var keywordAjax = $("#keyword").val().trim();
// var keywordAjax = "art";
// // the time needs to be entered in a specific format like (This+weekend or 29+December+2018) 
// // either we need to tell the user the correct format or figure out something else
// var dateAjax = "this+weekend";

// // var perimeterAjax = $("#within").val().trim();
// var perimeterAjax = "10";

// var queryURL = "https://api.eventful.com/json/events/search?app_key=3GWqGbZzG2zBx9Z3&l=" + locationAjax + "&c=" + categoryAjax + "&q=" + keywordAjax + "&t=" + dateAjax + "&within=" + perimeterAjax + "&units=miles";

// console.log(queryURL);
// // Performing the ajax request with the queryURL



// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response1) {
//     console.log(queryURL)
    
    
//     var results = response1.events;
    

//     console.log(results);
//     // The response will go here
// });



$("#submit").on("click", function () {

    event.preventDefault();
  
    var artistAjax = $("#where").val();
    artistAjax = artistAjax.split(" ").join("-");
    console.log(artistAjax);
    console.log(artistAjax);
    var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artistAjax + "&client_id=MTIwMDM0Mjl8MTUyOTUzNDYwOS42";
  
    // console.log(queryURL);
    // Performing the ajax request with the queryURL
  
  
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response1) {
      console.log(queryURL);
      $("#results").empty();
  
      var results = response1.events;
  
      for (var i = 0; i< results.length; i++) {
  
        var ourDiv = $("<div>");
  
        var title = $("<h3>");
        title.append(results[i].title);
        ourDiv.append(title, "<hr>");
  
        var image = $("<img>");
        console.log(results[i].performers[0].image);
        image.attr("src", results[i].performers[0].image);
        // console.log(image);
        ourDiv.append(image);
  
  
        var dateAndTime = $("<p>");
        dateAndTime.append("<hr>" ,"<b>Date & Time: </b>" + results[i].datetime_local);
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
  
        var ticketUrl =  $("<p>");
        ticketUrl.append("<a href=" + "'" + results[i].url + "'" + ">" + "<b> Get Your Ticket Now! </b>" + "</a>", "<hr>");
        ourDiv.append(ticketUrl);
  
        
        $("#results").append(ourDiv);
      }
      // The response will go here
    
    }); 
  
  });






// Initializing the firebase 

// var config = {
//     apiKey: "AIzaSyB-8hqysBzeElEDP5mjEFa2BpJsM3W8eTk",
//     authDomain: "project-happenin.firebaseapp.com",
//     databaseURL: "https://project-happenin.firebaseio.com",
//     projectId: "project-happenin",
//     storageBucket: "project-happenin.appspot.com",
//     messagingSenderId: "167007450235"
//   };

//   firebase.initializeApp(config);

//   var database = firebase.database();


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
    




    console.log(artistAjax);
    console.log(cityAjax);
    
    var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artistAjax + "&q=" + keywordAjax + "&venue.city=" + cityAjax +  "&client_id=MTIwMDM0Mjl8MTUyOTUzNDYwOS42";
  
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
      
    
    }); 
  
  });



//  $("#submit").on("click", function () {

//     event.preventDefault();

//     var whereEvent = $("#where").val();
//     var whereEvent = $("#where").val();
//     var whereEvent = $("#where").val();
//     var whereEvent = $("#where").val();
//     var whereEvent = $("#where").val();

//     var queryURL = "https://api.meetup.com/2/events?key=16351e665c576a156b307a6f5b2e6f35&group_urlname=ny-tech&sign=true";


//  });






























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


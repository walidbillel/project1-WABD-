// Building up the ajax call

// creating our queryUrl variables so we can target the right API when the inputs are entered
var locationAjax = $("#location").val().trim();
var categoryAjax = $("#category").val().trim();
var keywordAjax = $("#keyword").val().trim();
// the time needs to be entered in a specific format like (This+weekend or 29+December+2018) 
// either we need to tell the user the correct format or figure out something else
var dateAjax = $("#date").val().trim();

var perimeterAjax = $("#within").val().trim();

var queryURL = "http://api.eventful.com/json/events/search?app_key=3GWqGbZzG2zBx9Z3&l=" + locationAjax + "&c=" + categoryAjax + "&t=" + dateAjax + "&within=" + perimeterAjax + "&units=miles";

// Performing the ajax request with the queryURL

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response1){
    console.log(queryURL)

    // The response will go here
});


// Initializing the firebase 

var config = {
    apiKey: "AIzaSyB-8hqysBzeElEDP5mjEFa2BpJsM3W8eTk",
    authDomain: "project-happenin.firebaseapp.com",
    databaseURL: "https://project-happenin.firebaseio.com",
    projectId: "project-happenin",
    storageBucket: "project-happenin.appspot.com",
    messagingSenderId: "167007450235"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
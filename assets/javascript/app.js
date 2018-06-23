//Testing Header Slideshow

// Building up the ajax call






// creating our queryUrl variables so we can target the right API when the inputs are entered
// var locationAjax = $("#location").val().trim();
var locationAjax = "New+York";

// .replaceSpace.replace(" ", "+");
console.log("should be here"+ locationAjax);
var categoryAjax = "art";
// var categoryAjax = $("#category").val().trim();
// var keywordAjax = $("#keyword").val().trim();
var keywordAjax = "art";
// the time needs to be entered in a specific format like (This+weekend or 29+December+2018) 
// either we need to tell the user the correct format or figure out something else
var dateAjax = "this+weekend";

// var perimeterAjax = $("#within").val().trim();
var perimeterAjax = "10";

var queryURL = "https://api.eventful.com/json/events/search?app_key=3GWqGbZzG2zBx9Z3&l=" + locationAjax + "&c=" + categoryAjax + "&q=" + keywordAjax + "&t=" + dateAjax + "&within=" + perimeterAjax + "&units=miles";

console.log(queryURL);
// Performing the ajax request with the queryURL



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response1) {
    console.log(queryURL)
    
    
    var results = response1.events;
    

    console.log(results);
    // The response will go here
});










// Initializing the firebase 

<<<<<<< HEAD
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

=======
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
>>>>>>> Ana-Marte

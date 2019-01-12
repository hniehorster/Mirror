
/******** SETTINGS **********/

var weatherApiKey       = "05d9ad8ca2695dac2a39514be2ad28e2"; // code for amsterdam
var weatherLatitude     = "52.370216";
var weatherLongtitude   = "4.895168";

/******** END SETTINGS **********/

var weatherURL = "https://api.darksky.net/forecast/" + weatherApiKey + "/" + weatherLatitude + "," + weatherLongtitude;

/*
var jqxhr = $.getJSON( weatherURL, function() {
    console.log( "success" );
})
    .done(function(data) {
        console.log( "second success" );
        console.log(data);
    })
    .fail(function(data) {
        console.log( "error" );
        console.log(data);
        console.log(weatherURL);
    })
    .always(function() {
        console.log( "complete" );
    });

// Perform other work here ...

// Set another completion function for the request above
jqxhr.complete(function() {
    console.log( "second complete" );
});
*/

$.ajax({url: weatherURL, success: function(result){
        console.log(result);
    }});
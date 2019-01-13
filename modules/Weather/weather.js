
/******** SETTINGS **********/

var weatherApiKey       = "05d9ad8ca2695dac2a39514be2ad28e2"; // code for amsterdam
var weatherLatitude     = "52.370216";
var weatherLongtitude   = "4.895168";

var iconLocation        = "modules/Weather/icons/";

/******** END SETTINGS **********/

var weatherURL = "https://api.darksky.net/forecast/" + weatherApiKey + "/" + weatherLatitude + "," + weatherLongtitude +"?units=si";

var weatherWidget =

$.when(
    $.ajax({ url: weatherURL, type: 'GET', dataType: 'jsonp'})
).then(function( data, textStatus, jqXHR ){

    //let's do some rounding
    var temperature = Math.round(data.currently.temperature);

    var today       = new Date();
    var tomorrow    = new Date();
    var tomorrow1    = new Date();
    var tomorrow2    = new Date();
    var tomorrow3    = new Date();
    var tomorrow4    = new Date();
    var tomorrow5    = new Date();
    var tomorrow6    = new Date();

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    tomorrow.setDate(today.getDate()+1);

    var tomorrowLow = Math.round(data.daily.data[0].temperatureLow);
    var tomorrowHigh = Math.round(data.daily.data[0].temperatureHigh);

    tomorrow1.setDate(tomorrow.getDate()+1);
    tomorrow2.setDate(tomorrow1.getDate()+1);
    tomorrow3.setDate(tomorrow2.getDate()+1);
    tomorrow4.setDate(tomorrow3.getDate()+1);
    tomorrow5.setDate(tomorrow4.getDate()+1);
    tomorrow6.setDate(tomorrow5.getDate()+1);

    $("#Weather > div.app_content").html('<div class="weatherWidget">' +
        '<div class="weatherHeader">' +
            '<div class="weatherCurrentlyIcon"><img src="' + iconLocation + data.currently.icon + '.png" /></div>' +
            '<div class="weatherCurrentlyText">' + temperature + ' &#8451;' +
                '<br>' +
                    '<small>' + data.currently.summary +'</small>' +
            '</div>' +
        '</div>' +
        '<div class="weatherForecast">' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow + ' &#8451; / ' + tomorrowHigh + ' &#8451;</div>' +
                '<div class="forecastIcon"><img src="' + iconLocation + data.daily.data[0].icon + '.png"</div>' +
            '</div>' +
        '</div>');

    console.log(data.daily);
});


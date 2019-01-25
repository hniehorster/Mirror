
/******** SETTINGS **********/

var weatherApiKey       = "05d9ad8ca2695dac2a39514be2ad28e2"; // code for amsterdam
var weatherLatitude     = "52.370216";
var weatherLongtitude   = "4.895168";

var iconLocation        = "modules/Weather/icons/";

/******** END SETTINGS **********/

var weatherURL = "https://api.darksky.net/forecast/" + weatherApiKey + "/" + weatherLatitude + "," + weatherLongtitude +"?units=si";
//DEBUG-LOCAL var weatherURL = "modules/Weather/weather.json";

console.log(weatherURL);

/*** START FUNCTION ****/
$.when(
    $.ajax({ url: weatherURL, type: 'GET', dataType: 'jsonp'})
    //$.getJSON(weatherURL)
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

    var tomorrowLow1 = Math.round(data.daily.data[1].temperatureLow);
    var tomorrowHigh1 = Math.round(data.daily.data[1].temperatureHigh);

    tomorrow2.setDate(tomorrow1.getDate()+1);

    var tomorrowLow2 = Math.round(data.daily.data[2].temperatureLow);
    var tomorrowHigh2 = Math.round(data.daily.data[2].temperatureHigh);

    tomorrow3.setDate(tomorrow2.getDate()+1);

    var tomorrowLow3 = Math.round(data.daily.data[3].temperatureLow);
    var tomorrowHigh3 = Math.round(data.daily.data[3].temperatureHigh);

    tomorrow4.setDate(tomorrow3.getDate()+1);

    var tomorrowLow4 = Math.round(data.daily.data[4].temperatureLow);
    var tomorrowHigh4 = Math.round(data.daily.data[4].temperatureHigh);


    $("#Weather > div.app_content").html('<div class="weatherWidget">' +
        '<div class="weatherHeader">' +
            '<div class="weatherCurrentlyIcon">' +
                '<div class="todayIcon">'+
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.currently.icon + '"></use>\n' +
                    '</svg>' +
                '</div>'+
                '<div class="todayDescription">' + data.currently.summary +'<br />' + temperature + ' <sup>&#8451;</sup></div>' +
            '</div>' +
        '</div>' +
        '<div class="weatherForecast">' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow + ' <sup>&#8451;</sup> / ' + tomorrowHigh + ' <sup>&#8451;</sup></div>' +
                '<div class="forecastIcon">' +
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.daily.data[0].icon + '"></use>\n' +
                    '</svg>' +
                '</div>' +
            '</div>' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow1.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow1 + ' <sup>&#8451;</sup> / ' + tomorrowHigh1 + ' <sup>&#8451;</sup></div>' +
                '<div class="forecastIcon">' +
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.daily.data[1].icon + '"></use>\n' +
                    '</svg>' +
                '</div>' +
            '</div>' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow2.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow2 + ' <sup>&#8451;</sup> / ' + tomorrowHigh2 + ' <sup>&#8451;</sup></div>' +
                '<div class="forecastIcon">' +
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.daily.data[2].icon + '"></use>\n' +
                    '</svg>' +
                '</div>' +
            '</div>' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow3.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow3 + ' <sup>&#8451;</sup> / ' + tomorrowHigh3 + ' <sup>&#8451;</sup></div>' +
                '<div class="forecastIcon">' +
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.daily.data[3].icon + '"></use>\n' +
                    '</svg>' +
                '</div>' +
            '</div>' +
            '<div class="forecastDay">' +
                '<div class="forecastText">' + weekday[tomorrow4.getDay()] + '</div>' +
                '<div class="forecastTemperature">' + tomorrowLow4 + ' <sup>&#8451;</sup> / ' + tomorrowHigh4 + ' <sup>&#8451;</sup></div>' +
                '<div class="forecastIcon">' +
                    '<svg viewBox="0 0 75 75" class="weatherCurrentlyIcon">\n' +
                    '   <use xlink:href="' + iconLocation + 'weather_sprite.svg#' + data.daily.data[4].icon + '"></use>\n' +
                    '</svg>' +
                '</div>' +
            '</div>' +
        '</div>');
});

/*** END START FUNCTION ***/

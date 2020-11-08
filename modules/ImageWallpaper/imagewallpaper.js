
var imageWallpaperBaseUrl = "https://api.unsplash.com/photos/random";
var appSettings;
var newImage = "";

appSettings = localStorage.getItem('ImageWallpaper');
appSettings = JSON.parse(appSettings);

var backgroundOverlayColor = hexToRgb(appSettings.vars.background_color);

var rgbaCol = 'rgba(' + backgroundOverlayColor.r + ',' + backgroundOverlayColor.g + ',' + backgroundOverlayColor.b +','+ appSettings.vars.background_opacity+')';

$('.body_layer').css('background-color', rgbaCol);

function grabNewImage(appSettings) {

    $.ajax({
        url: imageWallpaperBaseUrl,
        type: 'GET',
        data: {
                query: "Nature calm",
                client_id: appSettings.vars.access_key,
                orientation: "landscape",
                per_page: "1"
        },
        async: false,
        dataType: 'json', // added data type
        success: function (unSplash) {

            newImage = unSplash.urls.raw;

            $('body').css('background-image', 'url(' + newImage + ')').fadeIn(2000);

            console.log('Change BG3 to ' + newImage);

            return newImage;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

grabNewImage(appSettings);



/*
function grabNewBackground(appSettings){

    $.when(
        $.ajax({
            url: imageWallpaperBaseUrl,
            type:'GET',
            data: { query:"Nature", client_id:appSettings.vars.access_key, orientation:"landscape", per_page:"1"},
            dataType: 'jsonp'
        })
    ).then(function(data, textStatus, jqXHR) {
        console.log(data);
    });

}*/
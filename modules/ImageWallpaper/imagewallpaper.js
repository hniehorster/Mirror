
var imageWallpaperBaseUrl = "https://api.unsplash.com/photos/random";
var imageWallpaperAppSettings;
var newImage = "";

imageWallpaperAppSettings = localStorage.getItem('ImageWallpaper');
imageWallpaperAppSettings = JSON.parse(imageWallpaperAppSettings);

var backgroundOverlayColor = hexToRgb(imageWallpaperAppSettings.vars.background_color);

var rgbaCol = 'rgba(' + backgroundOverlayColor.r + ',' + backgroundOverlayColor.g + ',' + backgroundOverlayColor.b +','+ imageWallpaperAppSettings.vars.background_opacity+')';

$('.body_layer').css('background-color', rgbaCol);

function grabNewImage(imageWallpaperAppSettings) {

    $.ajax({
        url: imageWallpaperBaseUrl,
        type: 'GET',
        data: {
                query: "Nature calm",
                client_id: imageWallpaperAppSettings.vars.access_key,
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

grabNewImage(imageWallpaperAppSettings);

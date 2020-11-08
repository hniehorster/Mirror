//?autoplay=1&showinfo=0&controls=0

var videoURL = "https://www.youtube.com/embed/L_LUpnjgPso/?autoplay=1&mute=1&controls=0"

$("#Fireplace > div.app_content").html('' +
    '<div id="FireplaceClose">' +
    '</div>'+
    '<div class="FireplaceWidget">' +
        '<div class="FirePlace">' +
            '<iframe src="" width="100%" height="100%" frameborder="0" id="FireplaceSrc" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
        '</div>'+
    '</div>');

//As this App is fullscreen, create touch area to close app.


//When Fireplace Open trigger start video
$( document ).on( "Fireplace:open", function(){
    console.log('Fireplace open triggered');
    $("#FireplaceSrc").attr('src', videoURL);
});

//When Fireplace Close trigger stop video
$(document).on("Fireplace:close", function(){
    $("#FireplaceSrc").attr('src', "");
});

$(document).on('click', '#FireplaceClose', function(){
    closeApp('Fireplace');
});

var cams = [];
cams.push('<iframe src="https://www.youtube.com/embed/BTYXpHelk8M?autoplay=1&mute=1&controls=0" frameborder="0" class="beachCamItem" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
cams.push('<iframe src="https://www.youtube.com/embed/nS7FlgPNydc?autoplay=1&mute=1&controls=0" frameborder="0" class="beachCamItem" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')

var beachCamContent = '';

$( document ).on( "BeachCam:open", function(){

    $.each(cams, function (index, beachCamURL) {

        console.log(beachCamURL);

        $("#BeachCam > div.app_content").append(beachCamURL)
    });

});

$(document).on("BeachCam:close", function(){

    //Hide all the info so that the cams stop
    $("#BeachCam > div.app_content").empty();

});


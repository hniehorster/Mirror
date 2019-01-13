var settings        = "";
var draggables      = [];

console.log('test');

$.getJSON("config/settings.json", function(json){

    settings = json;

    $.each(json.modules, function (i, index) {

        var appDetails = json.modules[i];
        var d = new Date();
        var appUniqueId = appDetails.app_name;

        console.info(appDetails);

        if(appDetails.is_app){
            $( ".apps_container" ).append('<div class="app" data-app-div="' + appUniqueId + '">' +
                '<img src="modules/'+ appDetails.app_name +'/' + appDetails.app_icon + '" />' +
                '<p>' + appDetails.app_name + '</p>' +
                '</div>');

            var appVisibility, appWindowWidth, appWindowHeight = "";

            if(!appDetails.default_visibility){
                appVisibility = "display:none;";
            }

            if(appDetails.main_window_width){
                appWindowWidth = "width: " + appDetails.main_window_width + "px;";
            }

            if(appDetails.main_window_height){
                appWindowHeight = "height: " + appDetails.main_window_height + "px;";
            }

            $( ".container").append('' +
                '<div class="ui-widget-content" id="' + appUniqueId + '" style="' + appVisibility + appWindowWidth + appWindowHeight + '">' +
                '<img src="images/x.png" id="close_app" />' +
                '<div class="app_content"><p>' + appUniqueId + '</p></div>' +
                '</div>');

            $("#" + appUniqueId + "").draggable();
        }else{
            console.info(appDetails.app_name + " is not an App");
        }

        //load remote scripts
        if(appDetails.external){

            console.log(appDetails.external.script +" Script");

            jQuery.getScript("modules/"+appDetails.app_name+"/"+appDetails.external.script+"?window_id="+appUniqueId)
                .done(function() {
                    console.log('Remote Script loaded');
                })
                .fail(function() {
                    console.log("Not loaded, failed")
                });

            if(appDetails.external.css){
                $('head').append('<link id="' + appDetails.app_name + '_css" href="modules/' + appDetails.app_name + '/'  + appDetails.external.css + '" type="text/css" rel="stylesheet" />');
            }
        }

    });
})
    .error(function() { alert("error"); });

$(document).on('click','.app', function()
{
    var appDiv = $(this).data('app-div');

    $("#" + appDiv + "").toggle();

});

$(document).on('click','#close_app', function()
{
    var appDiv = $(this).closest('div');

    console.log(appDiv);
    console.log(this);

    $(appDiv).toggle();
});

function grabExternalData(url) {

    var returnData = "";



    return returnData;
}
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
            $( ".apps_container" ).append('<div class="app defaultText shadowed" data-app-div="' + appUniqueId + '">' +
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

            //'<img src="images/x.png" id="close_app" />' +

            $( ".container").append('' +
                '<div class="ui-widget-content" id="' + appUniqueId + '" style="' + appVisibility + appWindowWidth + appWindowHeight + '">' +
                    '<div class="app_title center">' +
                        '<h3>' + appDetails.app_name +'</h3>' +
                    '</div>' +
                    '<div class="app_content">' +
                    '</div>' +
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
.error(function()
{
    alert("Could not properly load the settings.json");
}
);

$(document).on('click','.app', function()
{
    var appDiv = $(this).data('app-div');
    $("div[id^='" + appDiv + "']").toggle();



});

$(document).on('click','#close_app', function()
{
    var appDiv = $(this).closest('div');

    console.log(appDiv);
    console.log(this);

    $(appDiv).toggle();
});

/** HELPER FUNCTIONS **/

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function moneyFormat(labelValue)
{
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                : Math.abs(Number(labelValue));

}
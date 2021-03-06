var settings        = "";
var draggables      = [];
var mirror          = [];
var appSettings     = [];

$.getJSON("config/settings.json", function(json){

    settings = json;

    $.each(json.modules, function (i, index) {

        var appDetails = json.modules[i];
        var d = new Date();
        var appUniqueId = appDetails.app_name;

        localStorage.setItem(appDetails.app_name, JSON.stringify(appDetails));

        if(appDetails.is_app){
            $( ".apps_container" ).append('<div class="app defaultText shadowed" data-app-div="' + appUniqueId + '">' +
                '<img src="modules/'+ appDetails.app_name +'/' + appDetails.app_icon + '" />' +
                '<p>' + appDetails.app_name + '</p>' +
                '</div>');

            var appVisibility, appWindowWidth, appPosition, appWindowHeight = "";

            if(!appDetails.default_visibility){
                appVisibility = "display:none;";
            }

            if(appDetails.main_window_width){
                appWindowWidth = "width: " + appDetails.main_window_width + "px;";
            }

            if(appDetails.main_window_height){
                appWindowHeight = "min-height: " + appDetails.main_window_height + "px;";
            }else{
                appWindowHeight = "height: auto";
            }

            if(appDetails.default_position){
                var appPosition = "position:relative;";

                var positions = appDetails.default_position.split("-");

                switch(positions[0]){
                    case "top":
                        appPosition += "top: 15px;";
                        break;
                    case "middle":
                        appPosition += "top:45%;";
                        break;
                    case "bottom":
                        appPosition += "bottom: 145px;"; //includes the footer
                        break;
                }

                switch(positions[1]){
                    case "right":
                        appPosition += "right:15px;";
                        break;
                    case "left":
                        appPosition += "left:15px;";
                        break;
                }

            }
            //'<img src="images/x.png" id="close_app" />' +


            var appScreen = '<div class="ui-widget-content" id="' + appUniqueId + '" style="' + appVisibility + appWindowWidth + appWindowHeight + appPosition + '">';

            if(appDetails.show_app_title  !== !1){
                appScreen += '<div class="app_title center">' +
                    '<h3>' + appDetails.app_name +'</h3>' +
                    '</div>';
            }

            appScreen += '<div class="app_content"></div>';
            appScreen += '</div>';

            $(".container").append(appScreen);

            $("#" + appUniqueId + "").draggable();
        }else{
            console.info(appDetails.app_name + " is not an App");
        }

        //load remote scripts
        if(appDetails.external){

            var externalJSScripts = appDetails.external.script;
            externalJSScripts = externalJSScripts.split(",");

            $.each(externalJSScripts, function (i, index){

                /*if(appDetails.config){
                    console.log(appDetails.app_name);

                    var storageName = "settings." + appDetails.app_name;

                    console.log("LocalStorage data item: " + storageName);
                    console.log(JSON.stringify(appDetails.config));

                    localStorage.setItem(storageName, JSON.stringify(appDetails.config));

                    console.log(JSON.parse(localStorage.getItem(storageName)));
                }*/

                var scriptURL = "modules/"+appDetails.app_name+"/" + index + "?window_id=" + appUniqueId;

                jQuery.getScript(scriptURL)
                    .done(function() {
                        console.log('Remote Script loaded: ' + scriptURL);

                        var appLaunch = appDetails.app_name + ':launch';
                        $( document ).trigger(appLaunch);

                    })
                    .fail(function(jqxhr, settings, exception) {
                        console.log('Not loaded, failed: ' + scriptURL);
                    });
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

    if($("div[id^='" + appDiv + "']").css('display') == 'none'){

        openApp(appDiv);

    }else if($("div[id^='" + appDiv + "']").css('display') == 'block'){

        closeApp(appDiv);
    }
});

function closeApp(appDiv){

    $("div[id^='" + appDiv + "']").hide();
    var customEvent = appDiv + ':close';
    $( document ).trigger(customEvent);
    console.log(customEvent);
}

function openApp(appDiv){

    $("div[id^='" + appDiv + "']").show();
    var customEvent = appDiv + ':open';
    $( document ).trigger(customEvent);
    console.log(customEvent);
}

// Closing App Sub Divs Through the Close Icon
$(document).on('click','#close_app', function() {

    var appDiv = $(this).closest('div').attr('id');
    closeApp(appDiv);

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

function moneyFormat(labelValue) {
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

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
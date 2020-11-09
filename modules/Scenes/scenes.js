console.log(window);

hassIOAuth  = window.appSettings['Scenes'].hassIOAuth;
hassIOURL   = window.appSettings['Scenes'].hassIOURL;
actionButtons  = window.appSettings['Scenes'].actionButtons;

console.log(actionButtons);

$( "#Scenes > div.app_content" ).append('' +
    '<div class="groups"></div>' +
    '<div class="actionButtons"></div>');

$( "#Scenes > div.app_content >div.groups" ).append('' +
    '<ul class="groupItems">' +
        '<li><i class="icon-lightbulb"></i></li>' +
        '<li><i class="icon-fireplace"></i></li>' +
    '</ul>'
);

$( "#Scenes > div.app_content >div.actionButtons" ).append('' +
    '<div class="sceneTile" data-tile-default-color="#fff">' +
        '<div class="sceneIcon"><i class="icon-lightbulb"></i></div>' +
        '<div class="sceneGroup" data-goup="Living Room">Downstairs</div>' +
        '<div class="sceneAction" data-action="scene.lights_off">Lights Off</div>' +
    '</div>' +
    '<div class="sceneTile" data-tile-default-color="#fff">' +
        '<div class="sceneIcon"><i class="icon-lightbulb"></i></div>' +
        '<div class="sceneGroup" data-group="Living Room">Downstairs</div>' +
        '<div class="sceneAction" data-action="scene.lights_full">Lights Full</div>' +
    '</div>' +
    '<div class="sceneTile" data-tile-default-color="#fff">' +
        '<div class="sceneIcon"><i class="icon-speaker"></i></div>' +
        '<div class="sceneGroup" data-group="Living Room">House</div>' +
        '<div class="sceneAction" data-action="scene.stop_all_music">Stop Music</div>' +
    '</div>' +
    '<div class="sceneTile" data-tile-default-color="#fff">' +
        '<div class="sceneIcon"><i class="icon-gittip"></i></div>' +
        '<div class="sceneGroup" data-group="Living Room">Living Room</div>' +
        '<div class="sceneAction" data-action="Lights Off">Lights Off</div>' +
    '</div>' +
    '<div class="sceneTile" data-tile-default-color="#fff">' +
        '<div class="sceneIcon"></div>' +
        '<div class="sceneGroup" data-group="Living Room">Living Room</div>' +
        '<div class="sceneAction" data-action="Lights Off">Lights Off</div>' +
    '</div>');

$(document).on('click','.sceneTile', function()
{
    $(this).animate({backgroundColor: '#D8D8D8'}, 80);

    var defaultColor    = $(this).attr('data-tile-default-color');
    var sceneGroup      = $(this).find('.sceneGroup').attr('data-group');
    var sceneAction     = $(this).find('.sceneAction').attr('data-action');

    $.ajax({
        url: hassIOURL + 'services/scene/turn_on',
        type: 'post',
        data: JSON.stringify({ "entity_id": sceneAction } ),
        headers: {
            Authorization: hassIOAuth   //If your header name has spaces or any other char not appropriate
        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    });

    $.notify("Scene " + sceneAction + " for " + sceneGroup +" activated", "normal");

    $(this).animate({backgroundColor: defaultColor}, 80);


});
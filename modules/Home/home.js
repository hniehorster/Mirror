
var hassURL     = "http://192.168.1.77:8123/lovelace/default_view";
var frameWidth  = 1500;
var frameHeight = 700;

$( "#Home > div.app_content" ).append('<iframe src="' + hassURL + '" style="width: ' + frameWidth + 'px; height: ' + frameHeight + 'px; border:0px;"></iframe>');
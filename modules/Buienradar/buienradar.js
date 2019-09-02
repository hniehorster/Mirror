var widgetWidth = 550;
var widgetHeight = 512;

$("#Buienradar > div.app_content").html('' +
    '<iframe ' +
        'src="https://gadgets.buienradar.nl/gadget/zoommap/?lat=52.37403&lng=4.88969&overname=2&zoom=8&naam=Amsterdam&size=3&voor=0" ' +
        'scrolling=no ' +
        'width="' + widgetWidth + '"' +
        'height="' + widgetHeight + '"' +
        'frameborder="no"' +
    '>' +
    '</iframe>');
/**
 * TODO:  Break the each loop for limited items
 * TODO: refresh the feed when nwes is openend.
 * TODO
 */

/********* SETTINGS **********/

var newsURL     = "modules/News/nu.xml";
var itemCount   = 4;
var refreshRate = 12000;

/******** END SETTINGS **********/
$("#News > div.app_content").html('<div class="newsWidget">' +
        '<div class="newsItems"></div>'+
    '</div>');


/*** START FUNCTION ****/
setInterval(function() {
    $.when(
        $.ajax({url: newsURL, type: 'GET', dataType: 'xml'})
    ).then(function (data, textStatus, jqXHR) {

        $('.newsItems').empty();

        var items = [];
        $('item', data).each(function () {
            var item = {};
            item.title = $(this).find('title').eq(0).text();
            item.link = $(this).find('link').eq(0).text();
            item.description = $(this).find('description').eq(0).text();
            item.image = $(this).find('enclosure').eq(0).attr('url');
            item.id = $(this).find('guid').eq(0).text();

            //var updated = $(this).find('pubDate').eq(0).text();

            //var cleanUpdated = new Date(updated);

            //item.updated = cleanUpdated.getDate() + " "+cleanUpdated.getTime();
            item.updated = item.updated = $(this).find('pubDate').eq(0).text();

            items.push(item);


            $('.newsItems').append('' +
                '<div class="newsItem">' +
                '<div class="newsImage"><img src="' + item.image + '" /></div>' +
                '<div class="newsTitle defaultText"><p>' + item.title + '</p></div>' +
                '<div class="newsUpdated smallSubText"><p>' + item.updated + '</p></div>' +
                '<div id="additionalNewsData" data-description="' + item.description + '"></div>' +
                '</div>'
            );

        });


        $(".container").append('' +
            '<div class="ui-widget-content" id="NewsItems" style="display: none; width: 400px; height: 400px;">' +
            '<img src="images/x.png" id="close_app" />' +
            '<div class="app_content">' +
            '<div class="newsItemImage mrD mbD"><img src="" /></div>' +
            '<div class="newsItemTitle mediumText"></div>' +
            '<div class="newsItemDate smallSubText mtD mbD"></div>' +
            '<div class="newsItemDescription defaultText"></div>' +
            '</div>' +
            '</div>');

        $("#NewsItems").draggable();
    });

}, refreshRate);
/*** END START FUNCTION ***/


$(document).on('click','.newsItem', function()
{

    var newsTitle       = $(this).find('.newsTitle').text();
    var newsImage       = $(this).find('.newsImage img').attr('src');
    var newsDescription = $(this).find('#additionalNewsData').attr('data-description');
    var newsDate        = $(this).find('.newsUpdated').text();

    console.log(newsTitle);
    console.log(newsDescription);

    $(".newsItemTitle").text(newsTitle);
    $(".newsItemImage img").attr('src', newsImage);
    $(".newsItemDescription").text(newsDescription);
    $(".newsItemDate").text(newsDate);

    $("#NewsItems").show();

});
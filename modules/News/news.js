/**
 * TODO:  Break the each loop for limited items
 * TODO: refresh the feed when nwes is openend.
 * TODO
 */

/********* SETTINGS **********/

var googleNewsAPIKey    = "3a7373730ccc41d5bf43555a596dd0e8";
var newsURLBase         = "https://newsapi.org/v2/top-headlines?country=nl&apiKey=";
var itemCount           = 7;
var refreshRate         = 5000;

/******** END SETTINGS **********/

$("#News > div.app_content").html('<div class="newsWidget">' +
        '<div class="newsItems"></div>'+
    '</div>');

var newsURL = newsURLBase + googleNewsAPIKey;



/*** START FUNCTION ****/
function grabNews() {
    $.when(
        //$.ajax({url: newsURL, type: 'GET', dataType: 'json'})
        $.getJSON(newsURL)
    ).then(function (data, textStatus, jqXHR) {

        $('.newsItems').empty();

        var items = [];
        var counter = 0;
        $.each(data.articles, function (index, element) {

            if(counter == itemCount){
                return false;
            }

            console.log('Element found ' + index + element);

            var item = {};
            item.title = element.title;
            item.description = element.content;
            item.image = element.urlToImage;
            item.source = element.source;

            //item.updated = cleanUpdated.getDate() + " "+cleanUpdated.getTime();
            item.updated = item.updated = $(this).find('pubDate').eq(0).text();

            items.push(item);


            $('.newsItems').append('' +
                '<div class="newsItem">' +
                '<div class="newsImage"><img src="' + item.image + '" /></div>' +
                '<div class="newsTitle defaultText"><p>' + item.title + '</p></div>' +
                '<div class="newsUpdated tinySubText"><p>' + item.updated + '</p></div>' +
                '<div id="additionalNewsData" data-description="' + item.description + '"></div>' +
                '</div>'
            );

            counter++;

        });


        $(".container").append('' +
            '<div class="ui-widget-content" id="NewsItems" style="display: none; width: 400px; height: 400px;">' +
            '<img src="images/x.png" id="close_app" />' +
            '<div class="app_content">' +
            '<div class="newsItemImage mrD mbD"><img src="" class="mrD mbD" /></div>' +
            '<div class="newsItemTitle mediumText"></div>' +
            '<div class="newsItemDate tinySubText mtD mbD"></div>' +
            '<div class="newsItemDescription defaultText"></div>' +
            '</div>' +
            '</div>');

        $("#NewsItems").draggable();
    });
}

grabNews();
setInterval(grabNews, refreshRate);
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
/**
 * TODO: Update Styling
 * TODO: hide image in overview if there is none
 */

newsAppSettings = localStorage.getItem('News');
newsAppSettings = JSON.parse(newsAppSettings);

/********* SETTINGS **********/

var googleNewsAPIKey    = newsAppSettings.config.news_api_key;
var newsURLBase         = "https://newsapi.org/v2/top-headlines?domains=nu.nl,telegraaf.nl&country=nl&apiKey=";
var itemCount           = 10;
var refreshRate         = 50000;
var newsCategories      = ["business","entertainment","general","health","science", "sports", "technology"];
var newsCategoriesHTML  = "";
var defaultNewsCategory = "general";
/******** END SETTINGS **********/

$.each(newsCategories, function(key, value) {
    newsCategoriesHTML += '<li data-category="' + value +'" class="newsCategory">' + value + '</li>';
});

$("#News > div.app_content").html('' +
    '<div class="newsWidget">' +
    '   <div class="newsCategories">' +
        '       <ul>' + newsCategoriesHTML + '</ul>' +
        '</div>' +
    '   <div class="newsItems"></div>'+
    '</div>');

var newsURL = newsURLBase + googleNewsAPIKey;

/*** START FUNCTION ****/
function grabNews(category = 'general') {

    console.log(newsURL  + '&category=' + category);

    $.when(
        //$.ajax({url: newsURL, type: 'GET', dataType: 'json'})
        $.getJSON(newsURL  + '&category=' + category)
    ).then(function (data, textStatus, jqXHR) {

        $('.newsItems').empty();

        var items       = [];
        var counter     = 0;
        var newsImage   = "";

        $.each(data.articles, function (index, element) {

            var item = {};
            item.title          = element.title;
            item.description    = element.content;
            item.image          = element.urlToImage;
            item.source         = element.source;

            if(counter == itemCount){
                return false;
            }

            if(index == 0){
                $('.newsItems').append('' +
                    '<div class="mainNewsItemContent newsItemClick">' +
                        '<div class="mainNewsItemImage">' +
                            '<img src="' + item.image + '" style="border-radius:6px; width: 100%; height: auto" />' +
                            '<div class="mainNewsItemTitle"><h3>' + item.title + '</h3></div>' +
                        '</div>' +
                    '</div>'
                );
            }else{
                //item.updated = cleanUpdated.getDate() + " "+cleanUpdated.getTime();
                item.updated        = item.updated = $(this).find('pubDate').eq(0).text();

                items.push(item);

                $('.newsItems').append('' +
                    '<div class="newsItem newsItemClick">' +
                    '<div class="newsImage"><img src="' + item.image + '" /></div>' +
                    '<div class="newsTitle defaultText"><p>' + item.title + '</p></div>' +
                    '<div class="newsUpdated tinySubText"><p>' + item.updated + '</p></div>' +
                    '<div id="additionalNewsData" data-description="' + item.description + '"></div>' +
                    '</div>'
                );

                counter++;
            }
        });

    });

}

if($('#itemContent').length){}else{

    $(".container").append('' +
        '<div class="ui-widget-content ui-draggable" id="itemContent" style="display: none; width: 400px; height: 400px;">' +
            '<img src="images/x.png" id="close_app" />' +
            '<div class="app_content">' +
                '<div class="newsItemImage w-50 mrD mbD fl-left">' +
                    '<img src="" class="mrD mbD" />' +
                '</div>' +
                '<div class="newsContent fl-left">' +
                        '<div class="newsItemTitle largeText"></div>' +
                    '<div class="newsItemDate tinySubText mtD mbD"></div>' +
                    '<div class="newsItemDescription defaultText"></div>' +
                '</div>' +
            '</div>' +
        '</div>');
}
$("#itemContent").draggable();

grabNews(defaultNewsCategory);
setInterval(grabNews, refreshRate);
/*** END START FUNCTION ***/


$(document).on('click','.newsItemClick', function()
{
    var customEvent = 'nwesItem:clicked';
    $( document ).trigger(customEvent);

    var newsTitle       = $(this).find('.newsTitle').text();
    var newsImage       = $(this).find('.newsImage img').attr('src');
    var newsDescription = $(this).find('#additionalNewsData').attr('data-description');
    var newsDate        = $(this).find('.newsUpdated').text();

    console.log(newsTitle);
    console.log(newsDescription);
    console.log(newsImage);

    $(".newsItemTitle").text(newsTitle);

    console.log(typeof newsImage);

    $(".newsItemImage img").hide();
    
    if((newsImage.startsWith("http"))){ //Some news images do not have an image
        console.log('Image: ' + newsImage);
        $(".newsItemImage img").attr('src', newsImage);
        $(".newsItemImage img").show();
    }else{
        console.log('No Image: ' + newsImage);
    }
    
    $(".newsItemDescription").text(newsDescription);
    $(".newsItemDate").text(newsDate);

    $("#itemContent").show();

});

$(document).on('click','.newsCategory', function()
{
    $( document ).trigger('newsCategory:clicked');

    $('.activeCategory').removeClass('activeCategory');
    $(this).addClass('activeCategory');

    //TODO: add the UX click response
    var newsCategory = $(this).attr('data-category');

    defaultNewsCategory = newsCategory;

    grabNews(newsCategory);

});


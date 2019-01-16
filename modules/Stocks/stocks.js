/**
 * TODO: add a graph when you click an item
 */

/** SETTINGS **/

var apiEndpoint = "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=";
var assets = ['AAPL','SHOP','FIT','TWTR','FB','MT.AS','ING.AS'];
var refreshInterval = 5000;

/** END settings **/

$("#Stocks > div.app_content").html('<div class="stocksWidget">' +
    '<div class="stockItems"></div>'+
    '</div>');

//build Stock Data URL

var stocksURL = apiEndpoint + assets;


function grabStockData(){

    $.when(
        $.ajax({url: stocksURL, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR){

        $('.stockItems').empty();

        console.log(data);

        var stocks = [];

        $.each(data, function(index, item){
            var stock = {};

            stock.symbol        = item.symbol;
            stock.currentPrice  = item.latestPrice;
            stock.changePercent = item.changePercent;
            stock.ytdChange     = item.ytdChange;

            $('.stockItems').append('' +
                '<div class="stockItem">' +
                    '<div class="stockSymbol">' + stock.symbol + ' </div>' +
                    '<div class="stockCurrentPrice">' + stock.currentPrice + '</div>' +
                    '<div class="stockChangePercent"><span>' + stock.changePercent + '</span></div>' +
                    '<div class="stockChangePercentYTD"><span>' + stock.ytdChange + '</span></div>' +
                '</div>');
        });
    });

}

grabStockData();

setInterval(grabStockData(), refreshInterval);
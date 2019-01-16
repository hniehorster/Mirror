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

var stocksURL = apiEndpoint + assets.join();


function grabStockData(){

    $.when(
        $.ajax({url: stocksURL, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR){

        $('.stockItems').empty();

        console.log(data);

        var stocks = [];

        $.each(data, function(index, item){
            var stock = {};

            stock.symbol        = item.quote.symbol;
            stock.currentPrice  = item.quote.latestPrice.toFixed(2);
            stock.changePercent = ((item.quote.changePercent)*100).toFixed(2);
            stock.ytdChange     = ((item.quote.ytdChange)*100).toFixed(2);

            var stockChangePercentClass     = "positive";
            var stockChangePercentClassYTD  = "positive";

            if(stock.changePercent < 0){
                stockChangePercentClass     = "negative";
            }

            if(stock.ytdChange < 0){
                stockChangePercentClassYTD  = "negative";
            }

            $('.stockItems').append('' +
                '<div class="stockItem">' +
                    '<div class="stockSymbol">' + stock.symbol + ' </div>' +
                    '<div class="stockCurrentPrice">' + stock.currentPrice + '</div>' +
                    '<div class="stockChangePercent"><span class="' + stockChangePercentClass + '">' + stock.changePercent + ' %</span></div>' +
                    '<div class="stockChangePercentYTD"><span class="' + stockChangePercentClassYTD +'">' + stock.ytdChange + ' %</span></div>' +
                '</div>');
        });
    });

}

grabStockData();

setInterval(grabStockData(), refreshInterval);
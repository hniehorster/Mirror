/**
 * TODO: add a graph when you click an item
 */

/** SETTINGS **/

var apiEndpoint = "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=";
var assets = ['AAPL','SHOP','FIT','TWTR','FB','SQ','NVDA','TSLA','ZUO','MDB'];
var refreshInterval = 5000;

/** END settings **/

$("#Stocks > div.app_content").html('<div class="stocksWidget">' +
        '<div class="stockItems">' +
            '<table class="stockItemTable">' +
                '<tr>' +
                    '<td>Loading</td>' +
                '</tr>' +
            '</table>' +
        '</div>'+
    '</div>');

//build Stock Data URL

var stocksURL = apiEndpoint + assets.join();


function grabStockData(){

    $.when(
        $.ajax({url: stocksURL, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR){

        $('.stockItemTable').empty();

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

            $('.stockItemTable').append('' +
                '<tr>' +
                    '<td class="stockSymbol">' + stock.symbol + ' </td>' +
                    '<td class="stockCurrentPrice">' + stock.currentPrice + '</td>' +
                    '<td class="stockChangePercent smallSubText"><span class="' + stockChangePercentClass + '">' + stock.changePercent + ' %</span></td>' +
                    '<td class="stockChangePercentYTD smallSubText"><span class="' + stockChangePercentClassYTD +'">' + stock.ytdChange + ' % YTD</span></td>' +
                '</tr>');
        });
    });

}

grabStockData();

setInterval(grabStockData(), refreshInterval);
/**
 * TODO: add a graph when you click an item
 */

/** SETTINGS **/

var baseURL         = "https://cloud.iexapis.com/";
var stockURL        = "stock/market/batch?types=quote&symbols=";
var intraURL        = "stock/[SYMBOL]/intraday-prices/";
var apiVersion      = "stable";
var assets          = ['AAPL','SHOP','FIT','TWTR','FB','SQ','NVDA','TSLA','ZUO','MDB'];
var IEXToken        = "sk_57c881be33e94dae91b38cb538afbbed";
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

var stocksURL = baseURL + '/' + apiVersion + '/' +stockURL + assets.join() + '&token=' + IEXToken;

console.log(stocksURL);


function grabStocksData(){

    $.when(
        $.ajax({url: stocksURL, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR) {

        $('.stockItemTable').empty();

        console.log(data);

        var stocks = [];

        $.each(data, function (index, item) {
            var stock = {};

            stock.symbol = item.quote.symbol;
            stock.currentPrice = item.quote.latestPrice.toFixed(2);
            stock.changePercent = ((item.quote.changePercent) * 100).toFixed(2);
            stock.ytdChange = ((item.quote.ytdChange) * 100).toFixed(2);

            var stockChangePercentClass = "positive";
            var stockChangePercentClassYTD = "positive";

            if (stock.changePercent < 0) {
                stockChangePercentClass = "negative";
            }

            if (stock.ytdChange < 0) {
                stockChangePercentClassYTD = "negative";
            }

            $('.stockItemTable').append('' +
                '<tr data-stock-symbol="' + stock.symbol + '" class="stockRow">' +
                '<td class="stockSymbol">' + stock.symbol + ' </td>' +
                '<td class="stockCurrentPrice">' + stock.currentPrice + '</td>' +
                '<td class="stockChangePercent smallSubText"><span class="' + stockChangePercentClass + '">' + stock.changePercent + ' %</span></td>' +
                '<td class="stockChangePercentYTD smallSubText"><span class="' + stockChangePercentClassYTD + '">' + stock.ytdChange + ' % YTD</span></td>' +
                '</tr>');
        });


        $(".container").append('' +
            '<div class="ui-widget-content" id="stockItemContent" style="display: none; width: 500px; height: 300px;">' +
            '<img src="images/x.png" id="close_app" />' +
            '<div class="app_content">' +
                '<div class="stockSymbolTitle largeText bold center">LOADING DATA...</div>' +
                '<div class="stockItemGraphData">' +
                    '<div id="chartContainer" style="height: 200px; width: 100%;"></div>'+
                '</div>' +
                '<div class="stockItemDailyData">' +
                    '<div class="stockItemDailyDataCol1 defaultText">' +
                        '<table style="width: 100%;">' +
                            '<tr><td>Open</td><td class="stockItemDailyOpen bold right"></td></tr>' +
                            '<tr><td>High</td><td class="stockItemDailyHigh bold right"></td></tr>' +
                            '<tr><td>Low</td><td class="stockItemDailyLow bold right"></td></tr>' +
                        '</table>' +
                    '</div>' +
                    '<div class="stockItemDailyDataCol2 defaultText">' +
                        '<table style="width: 100%;">' +
                            '<tr><td>Volume</td><td class="stockItemDailyVolume bold right"></td></tr>' +
                            '<tr><td>P/E</td><td class="stockItemDailyPE bold right"></td></tr>' +
                            '<tr><td>Mkt Cap</td><td class="stockItemMarketCap bold right"></td></tr>' +
                        '</table>' +
                    '</div>' +
                    '<div class="stockItemDailyDataCol3 defaultText">' +
                        '<table style="width: 100%;">' +
                            '<tr><td>52W High</td><td class="stockItem52WHigh bold right"></td></tr>' +
                            '<tr><td>52W Low</td><td class="stockItem52WLow bold right"></td></tr>' +
                            '<tr><td>Avg Vol</td><td class="stockItemAvgVol bold right"></td></tr>' +
                        '</table>' +
                    '</div>' +
                '</div>' +
                '<div class="stockItemDataSource smallSubText"></div>' +
            '</div>' +
            '</div>');

        $("#stockItemContent").draggable();



        $(document).on('stockItemContent:open', function(){

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                backgroundColor: "transparent",
                height: 200,
                axisY:{
                    includeZero: false,
                    titleFontColor: "white"
                },
                data: [{
                    type: "area",
                    dataPoints: [
                        { y: 450 },
                        { y: 414},
                        { y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
                        { y: 460 },
                        { y: 450 },
                        { y: 500 },
                        { y: 480 },
                        { y: 480 },
                        { y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
                        { y: 500 },
                        { y: 480 },
                        { y: 510 }
                    ]
                }]
            });
            chart.render();
        });

    });
}


function grabIntraData(stockSymbol){

    intraURL = intraURL.replace('[SYMBOL]', stockSymbol);

    var intraDataURL = baseURL + '/' + apiVersion + '/' + intraURL + '?token=' + IEXToken;

    $.when(
        $.ajax({url: intraDataURL, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR){
        console.log(data);
    });

}

function grabStockData(stockSymbol){




}

grabStocksData();

setInterval(grabStocksData(), refreshInterval);

$(document).on('click','.stockRow', function(){

    var customEvent = 'stockItemContent:open';
    $( document ).trigger(customEvent);

    var stockSymbol = $(this).data('stock-symbol');

    var stockData = baseURL + '/' + apiVersion + '/' +stockURL + stockSymbol + '&token=' + IEXToken;

    $.when(
        $.ajax({url: stockData, type:'GET', dataType: 'jsonp'})
    ).then(function(data, textStatus, jqXHR) {

        var stockDataResult = data[stockSymbol].quote; n

        console.log(stockDataResult);

        $(".stockSymbolTitle").text(stockDataResult.companyName);

        //Col 1
        $(".stockItemDailyOpen").text(stockDataResult.open);
        $(".stockItemDailyHigh").text(stockDataResult.high);
        $(".stockItemDailyLow").text(stockDataResult.low);

        //Col 2
        $(".stockItemDailyVolume").text(stockDataResult.volume);
        $(".stockItemDailyPE").text(stockDataResult.peRatio);

        var marketValue = moneyFormat(stockDataResult.marketCap);
        marketValue = parseFloat(marketValue)
        marketValue = marketValue.toFixed(2);

        $(".stockItemMarketCap").text(marketValue +' B');

        //Col 3
        $(".stockItem52WHigh").text(stockDataResult.week52High);
        $(".stockItem52WLow").text(stockDataResult.week52Low);

        var totalVolume = addCommas(stockDataResult.avgTotalVolume);

        $(".stockItemAvgVol").text(totalVolume);

        //Source
        $(".stockItemDataSource").text(stockDataResult.latestSource + ' ' +stockDataResult.latestTime);

    });

   $("#stockItemContent").show();

});

// Load Remote JS

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
$("body").append(s);
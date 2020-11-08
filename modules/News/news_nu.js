/*$(document).ready(function(){
    $.ajax({
        type: "GET" ,
        url: "https://www.nu.nl/rss" ,
        dataType: "xml" ,
        success: function(xml) {

            //var xmlDoc = $.parseXML( xml );   <------------------this line
            //if single item
            //var items = $(xml).find('items').text();
            //but if it's multible items then loop
            $(xml).find('items').each(function(){
                console.log(this);
                $("#temp").append('<li>' + $(this).text() + '</li>');
            });
        }
    });
});*/
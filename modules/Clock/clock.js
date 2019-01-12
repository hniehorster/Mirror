setInterval(function() {

    var dt = new Date();

    var seconds = dt.getSeconds();

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + seconds;

    $( "#Clock > div.app_content" ).text(time);
}, 1000);


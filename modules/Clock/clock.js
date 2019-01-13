setInterval(function() {

    var dt = new Date();

    var seconds = dt.getSeconds();
    var minutes = dt.getMinutes();
    var hours   = dt.getHours();

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    if(minutes < 10){
        minutes = '0' + minutes;
    }

    if(hours < 10){
        hours = '0' + hours;
    }


    var time = hours + ":" + minutes + ":" + seconds;

    $( "#Clock > div.app_content" ).text(time);
}, 1000);


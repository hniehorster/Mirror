var blackOutTimer   = 0;
var blackOutActive  = true;
var blackoutOffset  = 45;

$(document).on('click','body', function(){

    blackOutTimer = 0;

    if(blackOutActive){

        var blackoutInterval = setInterval(function(){

            /** Prevent double timer to run **/
            blackOutActive = false;

            blackOutTimer++;

            if(blackOutTimer > blackoutOffset){

                $('.blackout').fadeIn(500);

                /** Reset blackout period. **/

                blackOutActive = true;

                clearInterval(blackoutInterval);
            }
        }, 1000);
    }
});

$(document).on('click', '.blackout', function(){
    $('.blackout').fadeOut(500);
});
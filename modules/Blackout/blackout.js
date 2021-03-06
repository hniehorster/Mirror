var blackOutTimer   = 0;
var blackOutActive  = true;
var blackoutOffset  = 45;
var blackoutFadeIn  = 1500;
var blackoutFadeOut = 500;

$(".container").append('<div class="blackoutButton"></div>');

$(document).on('click','body', function(){

    blackOutTimer = 0;

    if(blackOutActive){

        var blackoutInterval = setInterval(function(){

            /** Prevent double timer to run **/
            blackOutActive = false;

            blackOutTimer++;

            if(blackOutTimer > blackoutOffset){

                $('.blackout').fadeIn(blackoutFadeIn);

                /** Reset blackout period. **/

                blackOutActive = true;

                clearInterval(blackoutInterval);
            }
        }, 1000);
    }
});

$(document).on('click', '.blackout', function(){
    $('.blackout').fadeOut(blackoutFadeOut);
});

$(document).on('click', '.blackoutButton', function(){
    $('.blackout').fadeIn(blackoutFadeIn);
});
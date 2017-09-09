

var opacity = 0.85;
var increment = 0.05;
var pulse = setInterval(function () {
    var el =  document.getElementsByClassName('entry-title')[0];
    opacity += increment;
    if (!document.body.classList.contains('loaded') && (!(opacity.toFixed(2) === '0.95' || opacity.toFixed(2) === '0.55')) ) {
        el.style.color = 'rgba(255%,255%,255%,' + opacity + ')';
    }
    else if (!document.body.classList.contains('loaded') && (opacity.toFixed(2) === '0.95' || opacity.toFixed(2) === '0.55')) {
        increment = -increment;
    }
    else {
    clearInterval(pulse);
}
}, 100);

window.onload = function () {
    var $start = setTimeout(function () {
    $('body').addClass('loaded');
    $('footer').css('display', 'block');
    $('.entry-title,#loader,#loader:before,#loader:after').stop().css('display', 'none');
    Amplitude.init({
        "songs":
        [
            {
                "name": "Cantaloupe Island",
                "artist": "Herbie Hancock",
                "album": "Then&Now The Definitive Herbie",
                "url": " https://yovchenko.github.io/music/smoothMusic.mp3",
            }
        ],
        "volume": 40
    });
}, 2500);
}

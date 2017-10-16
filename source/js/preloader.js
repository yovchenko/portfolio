import Amplitude from "amplitude";
import main from './canvasSphere.js'
"use strict";
let opacity = 0.55;
let increment = 0.05;
let pulse = setInterval(function () {
    const el =  document.getElementsByClassName('entry-title')[0];
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
  
/*I'm giving you some extra time to enjoy my preloader*/
window.onload = setTimeout(function () {
    document.body.className = " loaded";
    main();    
    document.getElementsByClassName('footer')[0].style.display = 'flex';
    $('#loader').add('.entry-title').add('#loader:before').add('#loader:after').stop().css('display', 'none');
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
}, 2000);


import Amplitude from "amplitude";
import main from './canvasSphere.js';
import {
    resizeContent
} from './resize.js';
import {
    anim
} from './jsonAnimation.js';
"use strict";
let opacity = 0.55;
let increment = 0.05;
let pulse = setInterval(function () {
    const el = document.getElementsByClassName('entry-title')[0];
    opacity += increment;
    if (!document.body.classList.contains('loaded') && (!(opacity.toFixed(2) === '0.95' || opacity.toFixed(2) === '0.55'))) {
        el.style.color = 'rgba(255%,255%,255%,' + opacity + ')';
    } else if (!document.body.classList.contains('loaded') && (opacity.toFixed(2) === '0.95' || opacity.toFixed(2) === '0.55')) {
        increment = -increment;
    } else {
        clearInterval(pulse);
    }
}, 100);
/*I'm giving you some extra time to enjoy my preloader*/
window.onload = setTimeout(function () {
    main();
    anim.stop();
    resizeContent('#figure', '#wrapperCanvas', 800, 900);
    document.body.className = " loaded";
    document.getElementsByClassName('footer')[0].style.display = 'flex';
    $('#loader').add('.entry-title').add('#loader:before').add('#loader:after').stop().css('display', 'none');
    Amplitude.init({
        "songs": [{
            "name": "Cantaloupe Island",
            "artist": "Herbie Hancock",
            "album": "Then&Now The Definitive Herbie",
            "url": " https://yovchenko.github.io/music/smoothMusic.mp3",
        }],
        "volume_increment": 10,
        "volume_decrement": 10
    });
    if (document.images) {
        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
         img1.src = "./images/book-page-1.jpg";
         img2.src = "./images/book-page-2.jpg";
         img3.src = "./images/book-page-3.jpg";
         img4.src = "./images/book-page-4.jpg";
     }
}, 2000);

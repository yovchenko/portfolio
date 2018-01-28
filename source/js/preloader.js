import main from './canvasSphere.js';
import {
    resizeContent
} from './resize.js';
import {
    anim
} from './jsonAnimation.js';

let opacity = 0.55;
let increment = 0.05;
let str = '';
let el = document.getElementsByClassName('entry-title')[0];
let pulse = setInterval(function () {
    opacity += increment;
    str = opacity.toFixed(2);
    if (str === '0.95' || str === '0.55') increment = -increment;
    else el.style.color = 'rgba(255%,255%,255%,' +  str + ')'; 
}, 100);

document.addEventListener('DOMContentLoaded', delay);

/*I'm giving you some extra time to enjoy my preloader*/
let delay = setTimeout(function () {
    clearInterval(pulse);
    main();
    anim.stop();
    resizeContent('#figure', '#wrapperCanvas', 800, 900);
    $(document.getElementsByClassName('footer')[0]).add(document.body).addClass("is--visible");
    $(document.getElementsByClassName('loader-section')).add(document.getElementById('loader')).add(el).stop().addClass('is--invisible');
    pulse = increment = opacity = str = el = null;  /*there is no place for the garbage collection*/
    if (document.images) {
        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
        let img5 = new Image();
        let img6 = new Image();
        let img7 = new Image();
        img1.src = "./images/book-page-1.jpg";
        img2.src = "./images/book-page-2.jpg";
        img3.src = "./images/book-page-3.jpg";
        img4.src = "./images/book-page-4.jpg";
        img5.src = "./images/letter_bg.png";
        img6.src = "./images/before.png";
        img7.src = "./images/after.png";
    }
}, 2000);


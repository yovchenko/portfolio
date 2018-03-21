const Trianglify = require('trianglify');
import mainCanvas from './canvasSphere';
import {
    resizeContent
} from './resize';
import {
    anim
} from './jsonAnimation';

let pattern,
    encode,
    count = 0,
    svgString = '',
    opacity = 51,
    title = document.getElementsByClassName('entry-title')[0],
    pulse = setInterval(function () {
        if (count < 60) {
            if (document.documentElement.className.indexOf('wf-active') !== -1) {
                if (opacity <= 245) {
                    opacity += 10;
                    title.style.color = 'rgb(' + opacity + ',' + opacity + ',' + opacity + ')';
                } else {
                    init();
                    clearInterval(pulse);
                }
            } else if (count > 40 && title.className !== 'entry-title title-backup' && document.documentElement.className.indexOf('wf-active') === -1) {
                title.className += ' title-backup';
            }
        } else {
            init();
            clearInterval(pulse);
        }
        count++;
    }, 100);

export let page = Object.create(null);
page.home = true;
page.about = false;
page.work = false;
page.contacts = false;
page.keyboard = false;
Object.defineProperty(page, "elements", {
    value: {},
    configurable: true
});
page.elements.fps = document.getElementsByClassName('fps')[0];
page.elements.btnHamburger = document.getElementsByClassName('btn-hamburger')[0];
page.elements.flipbook = document.getElementsByClassName('book')[0];
page.elements.wrapperCanvas = document.getElementsByClassName('canvas-box')[0];
page.elements.article = document.getElementsByClassName('about')[0];
page.elements.container = document.getElementsByClassName('containerForm')[0];
page.elements.logoOne = document.getElementsByClassName('svg-logo-one')[0];
page.elements.logoTwo = document.getElementsByClassName('svg-logo-two')[0];
page.elements.touch = document.getElementsByClassName('touch')[0];
page.elements.home = document.getElementsByClassName('menu__home')[0];
page.elements.footer = document.getElementsByClassName('footer')[0];
Object.defineProperty(page.elements, "header", {
    value: document.getElementsByClassName('header')[0],
    enumerable: false
});
Object.defineProperty(page.elements, "background", {
    value: document.getElementsByClassName('canvasBackground')[0],
    enumerable: false
});
Object.defineProperty(page.elements, "grid", {
    value: document.getElementsByClassName('grid-container')[0],
    enumerable: false
});
Object.defineProperty(page.elements, "main", {
    value: document.getElementById('main'),
    enumerable: false
});
Object.defineProperty(page, "pattern", {
    value: {},
    enumerable: false
});

page.pattern.colorX = 'YlGnBu';
page.pattern.colorY = 'GnBu';
Object.defineProperty(page, "setBackground", {
    get: function () {
        this.pattern.canvas = new Trianglify({
            cell_size: 95,
            variance: 0.75,
            x_colors: this.pattern.colorX,
            y_colors: this.pattern.colorY,
            width: window.innerWidth,
            height: window.innerHeight,
            palette: Trianglify.colorbrewer,
            stroke_width: 0.2,
        });
        this.pattern.svg = new XMLSerializer().serializeToString(this.pattern.canvas.svg());
        this.pattern.encode = window.btoa(page.pattern.svg);
        return this.elements.background.style.backgroundImage = 'url("data:image/svg+xml;base64,' + this.pattern.encode + '")';
    },
    enumerable: false
});
pattern = new Trianglify({
    cell_size: 75,
    variance: 0.75,
    x_colors: 'YlOrBr',
    y_colors: 'Purples',
    width: window.innerWidth,
    height: 65,
    palette: Trianglify.colorbrewer,
    stroke_width: 0.2,
});
// Serialize the SVG object to a String
svgString = new XMLSerializer().serializeToString(pattern.svg());
// Perform the base64 encoding of the String
encode = window.btoa(svgString);
// Set the background image property
page.elements.footer.style.backgroundImage = 'url("data:image/svg+xml;base64,' + encode + '")';
page.elements.header.style.backgroundImage = 'url("data:image/svg+xml;base64,' + encode + '")';

function init() {
    /*I'm giving you some extra time to enjoy my preloader*/
    document.addEventListener('DOMContentLoaded', delay);
    let delay = setTimeout(function () {
        mainCanvas();
        anim.stop();
        $(document.getElementsByClassName('footer')[0]).add(document.body).addClass("is--visible");
        $(document.getElementsByClassName('loader-section')).add(document.getElementById('loader'))
            .add(title).stop().addClass('is--invisible');
        page.setBackground;
        resizeContent('#figure', '#wrapperCanvas', 800, 900);
        Object.defineProperty(page.elements, "curtainLeft", {
            value: document.getElementsByClassName('section-left is--invisible')[0],
            enumerable: false
        });
        Object.defineProperty(page.elements, "curtainRight", {
            value: document.getElementsByClassName('section-right is--invisible')[0],
            enumerable: false
        });
        delete page.elements.footer;
        let z,
            img = [];
        for (z = 0; z <= 6; z++) {
            img[z] = new Image();
        }
        img[0].src = "./images/book-page-1.jpg";
        img[1].src = "./images/book-page-2.jpg";
        img[2].src = "./images/book-page-3.jpg";
        img[3].src = "./images/book-page-4.jpg";
        img[4].src = "./images/letter_bg.png";
        img[5].src = "./images/before.png";
        img[6].src = "./images/after.png";
        img = pulse = count = opacity = title = pattern = svgString = encode = null; /*there is no place for the garbage collection here*/
    }, 100);
}


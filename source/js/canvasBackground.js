
'use strict';
let Trianglify = require('trianglify'); 
let pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight
});
let canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
canvasBackground.setAttribute("id", "canvasPic");
pattern = Trianglify({
    cell_size: 105,
    variance:  0.3,
    x_colors: 'random',
    y_colors: 'match_x',
    palette: Trianglify.colorbrewer,
    stroke_width: 0.3,
});

// Serialize the SVG object to a String
let m = new XMLSerializer().serializeToString(pattern.svg());
// Perform the base64 encoding of the String
let k = window.btoa(m);
// Query the element to set the background image property
let elementTop = document.getElementsByTagName('header')[0];
let elementBottom = document.getElementsByTagName('footer')[0];
// Set the background image property, including the encoding type header
elementTop.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';
elementBottom.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';

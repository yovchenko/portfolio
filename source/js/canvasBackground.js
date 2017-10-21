'use strict';
import {resizeContent} from './resize.js';
let Trianglify = require('trianglify'); 
let pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight
});
const canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
canvasBackground.setAttribute("id", "canvasPic");
pattern = Trianglify({
    cell_size: 95,
    variance: 0.75,
    x_colors: 'random',
    y_colors: 'match_x',
    palette: Trianglify.colorbrewer,
    stroke_width: 0.2,
});
// Serialize the SVG object to a String
let m = new XMLSerializer().serializeToString(pattern.svg());
// Perform the base64 encoding of the String
let k = window.btoa(m);
// Query the element to set the background image property
const elementTop = document.getElementsByClassName('header')[0];
const elementBottom = document.getElementsByClassName('footer')[0];
// Set the background image property, including the encoding type header
//elementTop.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';
//elementBottom.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")'; 
window.onresize = function(event){
    document.getElementById('canvasPic').remove();
    let pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    const canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
    canvasBackground.setAttribute("id", "canvasPic");
    pattern = Trianglify({
        cell_size: 95,
        variance: 0.75,
        x_colors: 'random',
        y_colors: 'match_x',
        palette: Trianglify.colorbrewer,
        stroke_width: 0.2,
    });

    let originalSize = $(window).width() + $(window).height()
    if ($('.envelope').is(':visible') === true) {
            if($(window).width() + $(window).height() != originalSize){
                if (window.matchMedia("all and (max-width: 576px)").matches || window.matchMedia("all and (max-width: 767px) and (min-width: 577px)").matches) {
                    document.getElementsByClassName('envelope')[0].style.cssText = 'width:150%;height:150%;top:80%'; 	
                    document.getElementsByClassName('footer')[0].style.display = 'none';	
                    resizeContent('.envelope','#wrap',530,630);		 	  		
            }
            }else{
                     document.getElementsByClassName('envelope')[0].style.cssText = 'width:90%;height:80%;top:50%'; 	
                     document.getElementsByClassName('footer')[0].style.display = 'flex';	
                     resizeContent('.envelope','#wrap',530,630);	
            }
    }
    else if ($('.canvas-box').is(':visible') === true) {
    resizeContent('#figure','#wrapperCanvas',800,900);
    }
};
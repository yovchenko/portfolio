var pattern = Trianglify({
		width: window.innerWidth,
		height: window.innerHeight
	});
	var canvasBackground = document.getElementById("wrapperCanvas").appendChild(pattern.canvas());
  canvasBackground.setAttribute("id", "canvasPic");
	  pattern = Trianglify({
    cell_size: 30,
    variance: 0.75,
    x_colors: 'random',
    y_colors: 'match_x',
    palette: Trianglify.colorbrewer,
    stroke_width: 1.51,
});
// Serialize the SVG object to a String
var m = new XMLSerializer().serializeToString(pattern.svg());
// Perform the base64 encoding of the String
var k = window.btoa(m);
// Query the element to set the background image property
var elementTop = document.getElementsByTagName('header')[0];
var elementBottom = document.getElementsByTagName('footer')[0];
// Set the background image property, including the encoding type header
elementTop.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';
elementBottom.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';
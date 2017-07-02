var pattern = Trianglify({
		width: window.innerWidth,
		height: window.innerHeight
	});
	var canvasBackground = document.getElementById("wrapperCanvas").appendChild(pattern.canvas());
  canvasBackground.setAttribute("id", "canvasPic");
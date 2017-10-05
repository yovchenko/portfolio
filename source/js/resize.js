import _ from 'jquery';
var pageWidth, pageHeight;

	var basePage = {
		width: 530,
		height: 600,
		scale: 1,
		scaleX: 1,
		scaleY: 1
	};

export var $resizeContent = function e() {
		var $page = $('#wrap');
		getPageSize();
		scalePages($page, pageWidth, pageHeight);

	$('input,#message').focus(function() {
	if ($(window).width() < 570) {
	   basePage = {
		width: 530,
		height: 450,
		scale: 1,
		scaleX: 1,
		scaleY: 1
	};
	getPageSize();
	scalePages($page, pageWidth, pageHeight);
	}
});

//using underscore to delay resize method till finished resizing window
		$(window).resize(function () {
			getPageSize();
			scalePages($page, pageWidth, pageHeight);
		});


		function getPageSize() {
			pageHeight = $('.envelope').height();
			pageWidth = $('.envelope').width();
		}

		function scalePages(page, maxWidth, maxHeight) {
			var scaleX = 1, scaleY = 1;

			scaleX = maxWidth / basePage.width;
			scaleY = maxHeight / basePage.height;
			basePage.scaleX = scaleX;
			basePage.scaleY = scaleY;
			basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

			var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
			var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

			page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');right:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
		}
	};

$(window).on('orientationchange', function (event) {
		$('.containerForm').css({
			'padding': '115% 0 0 0',
			'margin-bottom' : '15%'
	});
});
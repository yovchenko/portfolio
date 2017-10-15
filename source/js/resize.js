'use strict';
import _ from 'jquery';
let pageWidth, pageHeight;

	let basePage = {
		width: 530,
		height: 600,
		scale: 1,
		scaleX: 1,
		scaleY: 1
	};

export let $resizeContent = function e() {
		const $page = $('#wrap');
		getPageSize();
		scalePages($page, pageWidth, pageHeight);

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
			let scaleX = 1; 
			let scaleY = 1;

			scaleX = maxWidth / basePage.width;
			scaleY = maxHeight / basePage.height;
			basePage.scaleX = scaleX;
			basePage.scaleY = scaleY;
			basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

			let newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
			let newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

			page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');right:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
		}
	};

	
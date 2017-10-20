'use strict';
import _ from 'jquery';
export function resizeContent(objDiv,objWrap,objWidth,objHeight) {
	let pageWidth, pageHeight;
	
		let basePage = {
			width: objWidth,
			height: objHeight,
			scale: 1,
			scaleX: 1,
			scaleY: 1
		};
		let $page = $(objWrap);
		getPageSize();
		scalePages($page, pageWidth, pageHeight);

//using underscore to delay resize method till finished resizing window
		function getPageSize() {
			pageHeight = $(objDiv).height();
			pageWidth = $(objDiv).width();
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

	
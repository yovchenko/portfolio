import _ from 'jquery';
export function resizeContent(obj, wrap, width, height) {
	let pageWidth, pageHeight;
	
		let basePage = {
			width: width,
			height: height,
			scale: 1,
			scaleX: 1,
			scaleY: 1
		};
		let $page = $(wrap);
		getPageSize();
		scalePages($page, pageWidth, pageHeight);

//using underscore to delay resize method till finished resizing window
		function getPageSize() {
			pageHeight = $(obj).height();
			pageWidth = $(obj).width();
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

			page.attr('style', '-webkit-transform:scale(' + basePage.scale.toFixed(2) + ');right:' + newLeftPos + 'px;top:' + newTopPos + 'px;' + 'transform:scale(' + basePage.scale.toFixed(2) + ');');
		}
		return basePage.scale.toFixed(2);
	};

	
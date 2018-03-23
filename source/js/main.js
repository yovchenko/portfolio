import {
	resizeContent
} from './resize';
import {
	anim
} from './jsonAnimation';
import {
	page
} from './preloader';
import mainCanvas from './canvasSphere';

document.addEventListener('DOMContentLoaded', mainPage);
export var scaleValue = 1;

function mainPage() {
	var size,
		device = '',
		supportsGrid = typeof page.elements.grid.style.grid === 'string',
		supportsIE = detectIE();

	if (!(supportsIE === false)) {
		document.documentElement.className += ' ie-edge__detected';
	}

	function detectIE() {
		var ua = window.navigator.userAgent;

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			var rv = ua.indexOf('rv:');
			if (parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) === 11) return 'Trident';
			else return false;
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) return 'Edge';
		return false;
	}

	/*header text animation*/
	const $home = $('.js-home'),
		$about = $('.js-about'),
		$work = $('.js-work'),
		$contact = $('.js-contact');

	AttachEvent(page.elements.btnHamburger, "click", EventHandler.bind(page.elements.header));

	function AttachEvent(element, type, handler) {
		if (element.addEventListener) element.addEventListener(type, handler, false);
		else element.attachEvent("on" + type, handler);
	}

	function EventHandler(e) {
		e.preventDefault();
		if (String(this.classList) === 'header') {
			this.classList.add('is--active');
			headerText();
		} else {
			this.classList.remove('is--active');
		}
	}

	let headerText = function () {
		let s,
			textLetters = {
				settings: {
					lettersAbout: $about,
					lettersWork: $work,
					lettersContact: $contact,
				},
				init: function () {
					s = this.settings;
					this.bindEvents();
				},
				bindEvents: function () {
					$about.text('About');
					$work.text('Work');
					$contact.text('Contact'); {
						s.lettersAbout.html(function (i, el) {
							let text = $.trim(el).split("");
							return '<span>' + text.join('</span><span>') + '</span>';
						});
						s.lettersWork.html(function (i, el) {
							let text = $.trim(el).split("");
							return '<span>' + text.join('</span><span>') + '</span>';
						});
						s.lettersContact.html(function (i, el) {
							let text = $.trim(el).split("");
							return '<span>' + text.join('</span><span>') + '</span>';
						});
					}
				},
			};
		textLetters.init();
	};

	/* replace content onclick */
	$home.on('click', {
		case: 1
	}, content);
	$about.on("click", {
		case: 2
	}, content);
	$work.on('click', {
		case: 3
	}, content);
	$contact.on('click', {
		case: 4
	}, content);

	function content(event) {
		event.preventDefault();
		for (let key in page) {
			page[key] = false;
		}
		const pageNum = event.data.case;
		$(page.elements.curtainRight).add(page.elements.curtainLeft).removeClass('is--opening').addClass('is--closing');
		let $timerCurtains = setTimeout(function () {
			anim.stop();
			switch (pageNum) {
				case 4:
					for (let key in page.elements) {
						if (key !== 'container' && key !== 'touch' && key !== 'home')
							page.elements[key].style.display = 'none';
						else page.elements[key].style.display = 'flex';
					}
					page.pattern.colorX = 'Paired';
					page.pattern.colorY = 'Spectral';
					resizeContent('.envelope', '#wrap', 530, 630);
					page['contacts'] = true; //page contacts
					break;
				case 3:
					for (let key in page.elements) {
						if (key !== 'flipbook' && key !== 'touch' && key !== 'home')
							page.elements[key].style.display = 'none';
						else page.elements[key].style.display = 'flex';
					}
					page.pattern.colorX = 'Greys';
					page.pattern.colorY = 'Greys';
					scaleValue = resizeContent('.bookWrap', '#flipbook', 960, 600);
					page['work'] = true; //page work
					break;
				case 2:
					for (let key in page.elements) {
						if (key !== 'article' && key !== 'home')
							page.elements[key].style.display = 'none';
						else page.elements[key].style.display = 'flex';
					}
					page.pattern.colorX = 'PuOr';
					page.pattern.colorY = 'Pastel2';
					anim.play();
					page['about'] = true; //page about
					break;
				case 1:
					for (let key in page.elements) {
						if (key === 'article' || key === 'flipbook' || key === 'touch' || key === 'container' || key === 'home')
							page.elements[key].style.display = 'none';
						else {
							if (supportsGrid) page.elements[key].style.display = 'grid';
							else if (supportsIE === 'Trident') page.elements[key].style.display = '-ms-grid';
							else page.elements[key].style.display = 'flex';
						}
					}
					page.elements.header.classList.remove('is--active');
					page.pattern.colorX = 'YlGnBu';
					page.pattern.colorY = 'GnBu';
					resizeContent('#figure', '#wrapperCanvas', 800, 900);
					mainCanvas();
					page['home'] = true; // page home 
					break;
				default:
					document.write('Oops, something went wrong!');
			}
			page.setBackground;
			$(page.elements.curtainRight).add(page.elements.curtainLeft).stop()
				.removeClass('is--closing').addClass('is--opening');
		}, 1500);
	}

	window.addEventListener("resize", resizeScreenObj, false);

	if (document.documentElement.className.indexOf('mobile') !== -1) device = 'mobile';
	else if (document.documentElement.className.indexOf('tablet') !== -1) device = 'tablet';
	else device = 'desktop';
	size = getWindowSize();
	setPageHeight(page.elements.main);

	function setPageHeight(el) {
		if (device === 'mobile' || device === 'tablet') {
			if (size[0] > size[1]) el.style.height = (size[0] - 65) + 'px';
			else el.style.height = (size[1] - 65) + 'px';
		} else el.height = (size[1] - 65) + 'px';
	}

	function resizeScreenObj() {
		setPageHeight(page.elements.main);
		if (page.contacts) {
			resizeContent('.envelope', '#wrap', 530, 630);
		} else if (page.home) {
			resizeContent('#figure', '#wrapperCanvas', 800, 900);
		} else if (page.work) {
			scaleValue = resizeContent('.bookWrap', '#flipbook', 960, 600);
		}
	};
}

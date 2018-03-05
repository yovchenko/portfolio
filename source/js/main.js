import {
	resizeContent
} from './resize';
import {
	anim
} from './jsonAnimation';
import {
	page
} from './preloader';
var version = detectIE();

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

document.addEventListener('DOMContentLoaded', mainPage);
export var scaleValue = 1;

function mainPage() {
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

	/*header text animation*/
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
							page.elements[key].style.display = 'grid';
							if (version === 'Trident') page.elements[key].style.display = '-ms-grid';
						}
					}
					page.elements.header.classList.remove('is--active');
					page.pattern.colorX = 'YlGnBu';
					page.pattern.colorY = 'GnBu';
					resizeContent('#figure', '#wrapperCanvas', 800, 900);
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

	window.addEventListener("orientationchange", function () {
		if (page.keyboard) {
			window.lastOrientation = true;
		}
	}, false);

	function updateWindowSize() {
		window.lastInnerWidth = window.innerWidth;
		window.lastInnerHeight = window.innerHeight;
		// Stays the same for iOS, so that's our ticket to detect iOS keyboard
		window.lastOrientation = false;
		window.lastBodyHeight = document.body.clientHeight;
	};

	function detectKeyboard() {
		function orientationChange() {
			if (window.lastOrientation) {
				return !window.lastOrientation;
			} else {
				return window.lastOrientation;
			}
		}

		// No orientation change, keyboard opening
		if ((window.lastInnerHeight - window.innerHeight > 150) && window.innerWidth == window.lastInnerWidth) {
			let keyboardHeight = window.lastInnerHeight - window.innerHeight;
			updateWindowSize();
			return keyboardHeight;
		}
		// Orientation change with keyboard already opened
		if (orientationChange() && page.keyboard) {
			let keyboardHeight = screen.height - window.topBarHeight - window.innerHeight;
			updateWindowSize();
			return keyboardHeight;
		}

		// No orientation change, keyboard closing
		if ((window.innerHeight - window.lastInnerHeight > 150) && window.innerWidth == window.lastInnerWidth) {
			let keyboardHeight = -1;
			updateWindowSize();
			return keyboardHeight;
		}

		// Orientation change or regular resize, no keyboard action
		let keyboardHeight = 0;
		updateWindowSize();
		return keyboardHeight;
	};

	function keyboardShift(keyboardHeight) {
		page.elements.grid.style.cssText = 'grid-template-rows:65px calc(100vh + ' + keyboardHeight + 'px) auto;';
		page.keyboard = true;
		resizeScreenObj(event, keyboardHeight);
	};

	function removeKeyboardShift() {
		page.elements.grid.style.cssText = 'grid-template-rows:65px calc(100vh - 65px) auto;';
		page.keyboard = false;
		resizeScreenObj(event, 0);
	};

	// OnStart innit
	(function () {
		updateWindowSize();
		window.topBarHeight = screen.height - window.innerHeight;
		window.addEventListener("resize", resizeThrottler, false);

		let resizeTimeout;

		function resizeThrottler() {
			// ignore resize events as long as an actualResizeHandler execution is in the queue
			if (!resizeTimeout) {
				resizeTimeout = setTimeout(function () {
					resizeTimeout = null;
					actualResizeHandler();
					// The actualResizeHandler will execute at a rate of 15fps
				}, 66);
			}
		}

		function actualResizeHandler() {
			let keyboardHeight = detectKeyboard();
			if (keyboardHeight > 0) {
				keyboardShift(keyboardHeight);
			} else if (keyboardHeight == -1) {
				removeKeyboardShift();
			}
		}
	}());

	window.onresize = resizeScreenObj;
	let resizeTimer;

	function resizeScreenObj(event, keyHeight) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			if (page.contacts) {
				resizeContent('.envelope', '#wrap', 530, 630);
			} else if (page.home) {
				resizeContent('#figure', '#wrapperCanvas', 800, 900);
			} else if (page.work) {
				scaleValue = resizeContent('.bookWrap', '#flipbook', 960, 600);
			}
		}, 122);
	};
}

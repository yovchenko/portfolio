import {
	resizeContent
} from './resize';
let Trianglify = require('trianglify');
import {
	anim
} from './jsonAnimation.js';

/* hamburger menu */
const btnHamburger = document.getElementsByClassName('btn-hamburger')[0];
const init = document.getElementById('menu__init');
const menuAbout = document.getElementsByClassName('menu__about')[0];
const menuWork = document.getElementsByClassName('menu__work')[0];
const menuContact = document.getElementsByClassName('menu__contact')[0];

AttachEvent(btnHamburger, "click", EventHandler);

function AttachEvent(element, type, handler) {
	if (element.addEventListener) element.addEventListener(type, handler, false);
	else element.attachEvent("on"+type, handler);
}

function EventHandler(e) {
	if (this.classList.value === 'btn-hamburger') {
		this.classList.add('active');
		animateMenuToArrow();
	} else {
		this.classList.remove('active');
		animateArrowToMenu();
	}
}

function animateMenuToArrow() {
	document.getElementById('menu-to-arrow').beginElement();
	init.style.display = 'none';
	$(menuAbout).add(menuWork).add(menuContact).css('display', 'flex');
	headerText();
}

function animateArrowToMenu() {
	document.getElementById('arrow-to-menu').beginElement();
	$(menuAbout).add(menuWork).add(menuContact).css('display', 'none');
	init.style.display = 'flex';
}

/*header text animation*/
const $home = $('.menu__home');
const $about = $('.js-about');
const $work = $('.js-work');
const $contact = $('.js-contact');
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

let page = {
	home: true,
	about: false,
	work: false,
	contacts: false,
	keyboard: false,
};

Object.defineProperty(page, "elements", {
	value: {},
	configurable: true
});

page.elements.fps = document.getElementsByClassName('fps')[0];
page.elements.grid = document.getElementsByClassName('grid-container')[0];
page.elements.flipbook = document.getElementsByClassName('book')[0];
page.elements.wrapperCanvas = document.getElementsByClassName('canvas-box')[0];
page.elements.article = document.getElementsByClassName('about')[0];
page.elements.container = document.getElementsByClassName('containerForm')[0];
page.elements.logoOne = document.getElementsByClassName('svg-logo-one')[0];
page.elements.logoTwo = document.getElementsByClassName('svg-logo-two')[0];
page.elements.touch = document.getElementsByClassName('touch')[0];

const $curtainRight = $('#curtain-section-right');
const $curtainLeft = $('#curtain-section-left');

function content(event) {
	$curtainRight.add($curtainLeft).css('width', '100%');
	$curtainRight.stop().css('transform', 'translateX(50%)');
	$curtainLeft.stop().css('transform', 'translateX(-50%)');
	let $pageMain = event.data.case;
	let $timerCurtain = setTimeout(function () {
		if ($pageMain === 4) {
			$(init).add(btnHamburger).add(page.elements.article).add(page.elements.logoOne)
				.add(page.elements.logoTwo).add(page.elements.fps)
				.add(page.elements.flipbook).add(page.elements.wrapperCanvas).stop().css('display', 'none');
			$(page.elements.container).add($home).css('display', 'flex');
			page.elements.touch.style.display = 'block';
			anim.stop();
			resizeContent('.envelope', '#wrap', 530, 630);
			for (let key in page) {
				if (key !== 'contacts') { //page contacts
					page[key] = false;
				} else {
					page[key] = true;
				}
			}
			anim.stop();
		} else if ($pageMain === 3) {
			$(init).add(btnHamburger).add(page.elements.logoOne).add(page.elements.logoTwo).add(page.elements.wrapperCanvas)
				.add(page.elements.fps).add(page.elements.article).add(page.elements.container).stop().css('display', 'none');
			$home.css('display', 'flex');
			$(page.elements.flipbook).add(page.elements.touch).css('display', 'block');
			anim.stop();
			resizeContent('.bookWrap', '#flipbook', 960, 600);
			for (let key in page) {
				if (key !== 'work') { //page work
					page[key] = false;
				} else {
					page[key] = true;
				}
			}
		} else if ($pageMain === 2) {
			$(init).add(btnHamburger).add(page.elements.logoOne).add(page.elements.touch)
				.add(page.elements.flipbook).add(page.elements.logoTwo)
				.add(page.elements.wrapperCanvas).add(page.elements.fps).add(page.elements.container).stop().css('display', 'none');
			page.elements.article.style.display = 'grid';
			$home.css('display', 'flex');
			anim.play();
			for (let key in page) {
				if (key !== 'about') { //page about 
					page[key] = false;
				} else {
					page[key] = true;
				}
			}
		} else {
			$(page.elements.wrapperCanvas).add(btnHamburger).add(page.elements.logoOne)
				.add(page.elements.logoTwo).add(page.elements.fps).css('display', 'grid');
			$home.add(page.elements.article).add(page.elements.flipbook).add(page.elements.touch)
				.add(page.elements.container).stop().css('display', 'none');
			animateArrowToMenu();
			btnHamburger.classList = 'btn-hamburger';
			anim.stop();
			resizeContent('#figure', '#wrapperCanvas', 800, 900);
			for (let key in page) {
				if (key !== 'home') { // page home 
					page[key] = false;
				} else {
					page[key] = true;
				}
			}
		}
		document.getElementsByClassName('canvasPic')[0].remove();
		let pattern = Trianglify({
			width: window.innerWidth,
			height: window.innerHeight
		});

		const canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
		canvasBackground.setAttribute("class", "canvasPic");
		pattern = Trianglify({
			cell_size: 95,
			variance: 0.75,
			x_colors: 'random',
			y_colors: 'match_x',
			palette: Trianglify.colorbrewer,
			stroke_width: 0.2,
		});
		$curtainRight.stop().css({
			'-webkit-transform': 'translateX(100%)',
			'-moz-transform': 'translateX(100%)',
			'transform': 'translateX(100%)'
		});
		$curtainLeft.stop().css({
			'-webkit-transform': 'translateX(-100%)',
			'-moz-transform': 'translateX(-100%)',
			'transform': 'translateX(-100%)'
		});
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
		document.getElementsByClassName('canvasPic')[0].remove();
		let pattern = Trianglify({
			width: window.innerWidth,
			height: window.innerHeight
		});
		const canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
		pattern = Trianglify({
			cell_size: 95,
			variance: 0.75,
			x_colors: 'random',
			y_colors: 'match_x',
			palette: Trianglify.colorbrewer,
			stroke_width: 0.2,
		});
		canvasBackground.setAttribute("class", "canvasPic");
		if (page.contacts) {
			resizeContent('.envelope', '#wrap', 530, 630);
		} else if (page.home) {
			resizeContent('#figure', '#wrapperCanvas', 800, 900);
		} else if (page.work) {
			resizeContent('.bookWrap', '#flipbook', 960, 600);
		}
	}, 122);
};

/* the form is getting bigger when the on-screen keyboard opens */
$(document.getElementById('message')).add(document.getElementById('email'))
.add(document.getElementById('name')).focus(function () {
	document.getElementsByClassName('containerForm')[0].classList += ' scaleForm';
});
$(document.getElementById('message')).add(document.getElementById('email'))
.add(document.getElementById('name')).focusout(function () {
	document.getElementsByClassName('containerForm')[0].classList = 'containerForm';
});

import {
	resizeContent
} from './resize';
import {
	anim
} from './jsonAnimation';
import {
	page
} from './preloader';

const btnHamburger = document.getElementsByClassName('btn-hamburger')[0],
	initText = document.getElementsByClassName('menu__init')[0],
	$home = $('.js-home'),
	$about = $('.js-about'),
	$work = $('.js-work'),
	$contact = $('.js-contact');

AttachEvent(btnHamburger, "click", EventHandler);

function AttachEvent(element, type, handler) {
	if (element.addEventListener) element.addEventListener(type, handler, false);
	else element.attachEvent("on" + type, handler);
}

function EventHandler(e) {
	e.preventDefault();
	if (String(this.classList) === 'btn-hamburger') {
		this.classList.add('btn-is--active');
		animateMenuToArrow();
	} else {
		animateArrowToMenu();
		this.classList.remove('btn-is--active');
	}
}

function animateMenuToArrow() {
	initText.classList.add('init-is--invisible');
	$($about).add($work).add($contact).addClass('is--visible');
	headerText();
}

function animateArrowToMenu() {
	initText.classList.remove('init-is--invisible');
	$($about).add($work).add($contact).removeClass('is--visible');
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
	const pageNum = event.data.case;
	$(page.elements.curtainRight).add(page.elements.curtainLeft).removeClass('is--opening').addClass('is--closing');
	let $timerCurtains = setTimeout(function () {
		switch (pageNum) {
			case 4:
				$(initText).add(btnHamburger).add(page.elements.article).add(page.elements.logoOne)
					.add(page.elements.logoTwo).add(page.elements.fps)
					.add(page.elements.flipbook).add(page.elements.wrapperCanvas).stop().addClass('is--visible');
				$(page.elements.container).add($home).css('display', 'flex');
				page.elements.touch.style.display = 'block';
				anim.stop();
				resizeContent('.envelope', '#wrap', 530, 630);
				for (let key in page) {
					if (key !== 'contacts') page[key] = false; //page contacts
					else page[key] = true;
				}
				anim.stop();
				break;
			case 3:
				$(initText).add(btnHamburger).add(page.elements.logoOne).add(page.elements.logoTwo).add(page.elements.wrapperCanvas)
					.add(page.elements.fps).add(page.elements.article).add(page.elements.container).stop().css('display', 'none');
				$home.css('display', 'flex');
				$(page.elements.flipbook).add(page.elements.touch).css('display', 'block');
				anim.stop();
				resizeContent('.bookWrap', '#flipbook', 960, 600);
				for (let key in page) {
					if (key !== 'work') page[key] = false; //page work
					else page[key] = true;
				}
				break;
			case 2:
				$(initText).add(btnHamburger).add(page.elements.logoOne).add(page.elements.touch)
					.add(page.elements.flipbook).add(page.elements.logoTwo)
					.add(page.elements.wrapperCanvas).add(page.elements.fps).add(page.elements.container).stop().css('display', 'none');
				page.elements.article.style.display = 'grid';
				$home.css('display', 'flex');
				anim.play();
				for (let key in page) {
					if (key !== 'about') page[key] = false; //page about 
					else page[key] = true;
				}
				break;
			case 1:
				$(page.elements.wrapperCanvas).add(btnHamburger).add(page.elements.logoOne)
					.add(page.elements.logoTwo).add(page.elements.fps).css('display', 'grid');
				$home.add(page.elements.article).add(page.elements.flipbook).add(page.elements.touch)
					.add(page.elements.container).stop().css('display', 'none');
				animateArrowToMenu();
				btnHamburger.classList.remove('active');
				anim.stop();
				resizeContent('#figure', '#wrapperCanvas', 800, 900);
				for (let key in page) {
					if (key !== 'home') page[key] = false; // page home 
					else page[key] = true;
				}
				break;
			default:
				document.write('Oops, something went wrong!');
		}
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
		page.setBackground;
		if (page.contacts) {
			resizeContent('.envelope', '#wrap', 530, 630);
		} else if (page.home) {
			resizeContent('#figure', '#wrapperCanvas', 800, 900);
		} else if (page.work) {
			resizeContent('.bookWrap', '#flipbook', 960, 600);
		}
	}, 122);
};


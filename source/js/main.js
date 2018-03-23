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
export var size,
device = '',
scaleValue = 1,
supports_grid = typeof page.elements.grid.style.grid === 'string';
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
							if (supports_grid) page.elements[key].style.display = 'grid';
							else if (version === 'Trident') page.elements[key].style.display = '-ms-grid';
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

	if(document.documentElement.className.indexOf('mobile') !== -1) device = 'mobile';
	else if(document.documentElement.className.indexOf('tablet') !== -1) device = 'tablet';
	else device = 'desktop';
	size = getWindowSize();
	if(device === 'mobile' || device === 'tablet') {
		if(size[0] > size[1]) page.elements.main.style.height = (size[0] - 65) + 'px';
		else page.elements.main.style.height = (size[1] - 65) + 'px';
	}
	else page.elements.main.style.height = (size[1] - 65) + 'px';

	function resizeScreenObj() {
		if(device === 'mobile' || device === 'tablet') {
			if(size[0] > size[1]) page.elements.main.style.height = (size[0] - 65) + 'px';
			else page.elements.main.style.height = (size[1] - 65) + 'px';
		} 
			if (page.contacts) {
				resizeContent('.envelope', '#wrap', 530, 630);
			} else if (page.home) {
				resizeContent('#figure', '#wrapperCanvas', 800, 900);
			} else if (page.work) {
				scaleValue = resizeContent('.bookWrap', '#flipbook', 960, 600);
			}
	};
}

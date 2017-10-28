'use strict';
import {
	resizeContent
} from './resize.js';
let Trianglify = require('trianglify');
import Amplitude from "amplitude";
import {
	anim
} from './jsonAnimation.js';

$(document).ready(function (e) {
	/* music player buttons */
	document.getElementsByClassName('svgIcons')[0].onclick = function () {
		const stop = document.getElementById('stopMusic');
		const play = document.getElementById('playMusic');
		const $volume = $('.volume');
		if (stop.style.display === 'none') {
			stop.style.display = 'block'
			play.style.display = 'none';
			$volume.stop().fadeIn('slow');
			Amplitude.play();
		} else {
			stop.style.display = 'none'
			play.style.display = 'block';
			$volume.stop().fadeOut('slow');
			Amplitude.pause();
		}
	}

	/* hamburger menu */
	const btnHamburger = document.getElementsByClassName('btn-hamburger')[0];
	const init = document.getElementById('menu__init');
	const menuToArrow = document.getElementById('menu-to-arrow');
	const arrowToMenu = document.getElementById('arrow-to-menu');
	const menuAbout = document.getElementsByClassName('menu__about')[0];
	const menuWork = document.getElementsByClassName('menu__work')[0];
	const menuContact = document.getElementsByClassName('menu__contact')[0];
	btnHamburger.onclick = function () {
		if (this.classList.value === 'btn-hamburger') {
			this.classList += ' active';
			animateMenuToArrow();
		} else {
			this.classList = 'btn-hamburger';
			animateArrowToMenu();
		}
	}

	function animateMenuToArrow() {
		menuToArrow.beginElement();
		init.style.display = 'none';
		$(menuAbout).add(menuWork).add(menuContact).css('display', 'flex');
		headerText();
	}

	function animateArrowToMenu() {
		arrowToMenu.beginElement();
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
	let flagForm = false;
	let flagHome = true;
	const grid = document.getElementsByClassName('grid-container')[0];

	function content(event) {
		const $wrapperCanvas = $('.canvas-box');
		const $article = $('.about');
		const $curtainRight = $('#curtain-section-right');
		const $curtainLeft = $('#curtain-section-left');
		const $container = $('.containerForm');
		const $logoOne = $('.svg-logo-one');
		const $logoTwo = $('.svg-logo-two');
		let $pageMain = event.data.case;
		$curtainRight.add($curtainLeft).css('width', '100%');
		$curtainRight.stop().css('transform', 'translateX(50%)');
		$curtainLeft.stop().css('transform', 'translateX(-50%)');
		let $timerCurtain = setTimeout(function () {
			grid.classList = 'grid-container';
			document.getElementsByClassName('canvasPic')[0].classList = 'canvasPic';
			if ($pageMain === 4) {
				$(init).add(btnHamburger).add($article).add($logoOne).add($logoTwo).add($wrapperCanvas).stop().css('display', 'none');
				$container.add($home).css('display', 'flex');
				resizeContent('.envelope', '#wrap', 530, 630);
				flagForm = true;
				flagHome = false;
				anim.stop();
			} else if ($pageMain === 3) {
				$(init).add(btnHamburger).add($logoOne).add($logoTwo).add($wrapperCanvas).add($article).add($container).stop().css('display', 'none');
				$home.css('display', 'flex');
				anim.stop();
				flagForm = false;
				flagHome = false;
			} else if ($pageMain === 2) {
				$(init).add(btnHamburger).add($logoOne).add($logoTwo).add($wrapperCanvas).add($container).stop().css('display', 'none');
				$article.css('display', 'grid');
				$home.css('display', 'flex');
				anim.play();
				flagForm = false;
				flagHome = false;
			} else {
				($wrapperCanvas).add(btnHamburger).add($logoOne).add($logoTwo).css('display', 'grid');
				$home.add($article).add($container).stop().css('display', 'none');
				animateArrowToMenu();
				resizeContent('#figure', '#wrapperCanvas', 800, 900);
				btnHamburger.classList = 'btn-hamburger';
				anim.stop();
				flagForm = false;
				flagHome = true;
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

	/* the form is getting bigger when the on-screen keyboard opens */
	$(window).on("orientationchange", function (event) {
		if (flagForm === true && grid.classList.value === 'grid-container') {
			grid.classList += ' resize';
			document.getElementsByClassName('canvasPic')[0].classList += ' resize';
		} else if (flagForm === true && grid.classList.value === 'grid-container resize') {
			grid.classList = 'grid-container';
			document.getElementsByClassName('canvasPic')[0].classList = 'canvasPic';
		}
	});

	let originalSize = $(window).width() + $(window).height();
	$(window).resize(function () {
		let newSize = $(window).width() + $(window).height();
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
		if (flagForm === true) {
			if (newSize !== originalSize && grid.classList.value === 'grid-container') {
				grid.classList += ' resize';
				document.getElementsByClassName('canvasPic')[0].classList += ' resize';
			} else {
				grid.classList = 'grid-container';
				document.getElementsByClassName('canvasPic')[0].classList = 'canvasPic';
			}
		} else if (flagHome === true) {
			resizeContent('#figure', '#wrapperCanvas', 800, 900);
		}
		resizeContent('.envelope', '#wrap', 530, 630);
	});
});
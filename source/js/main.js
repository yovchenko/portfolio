'use strict';
import {$resizeContent} from './resize.js';
let Trianglify = require('trianglify'); 
$( document ).ready(function() {
/* music player buttons */
document.getElementsByClassName('svgIcons')[0].onclick = function () {
	const stop = document.getElementById('stopMusic');
	const play = document.getElementById('playMusic');
	if (stop.style.display === 'none') {
	stop.style.display = 'block'
	play.style.display = 'none';
	}
	else {
	stop.style.display = 'none'
	play.style.display = 'block';
	}
}
/* hamburger menu */
document.getElementsByClassName('btn-hamburger')[0].onclick = function () {
const menuToArrow = document.getElementById('menu-to-arrow');
const arrowToMenu = document.getElementById('arrow-to-menu');

if (this.classList == 'btn-hamburger') {
this.classList += ' active';
animateMenuToArrow();
function animateMenuToArrow(){
  menuToArrow.beginElement();
}
}
else {
this.classList = 'btn-hamburger';
animateArrowToMenu();
function animateArrowToMenu(){
  arrowToMenu.beginElement();
}
}
}

/*header text*/
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
					$contact.text('Contact');
					{
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
	
/* change content onclick function */
$home.on('click', { case: 1 }, content);
$about.on("click", { case: 2 }, content);
$work.on('click', { case: 3 }, content);
$contact.on('click', { case: 4 }, content);

	function content(event) {
		const $wrapperCanvas = $('#wrapperCanvas');
		const $article = $('article');
		const $footer = $('.footer');
		const $curtainRight = $('#curtain-section-right');
		const $curtainLeft = $('#curtain-section-left');
		const $container = $('.containerForm');
		let $pageMain = event.data.case;
		$curtainRight.add($curtainLeft).css('width', '100%');
		$curtainRight.stop().css('transform', 'translateX(50%)');
		$curtainLeft.stop().css('transform', 'translateX(-50%)');
		let $timerCurtain = setTimeout(function () {

			if ($pageMain === 4) {
				$menuToggle.add($init).add($article).add($wrapperCanvas).stop().css('display', 'none');
				$container.add($home).css('display', 'flex');
				$resizeContent();
			}
			else if ($pageMain === 3) {
				$menuToggle.add($init).add($wrapperCanvas).add($article).add($container).stop().css('display', 'none');
				$home.css('display', 'flex');
			}
			else if ($pageMain === 2) {
				$menuToggle.add($init).add($wrapperCanvas).add($container).stop().css('display', 'none');
				$home.add($article).css('display', 'flex');
			}
			else {
				$menuToggle.add($wrapperCanvas).css('display', 'flex');
				$home.add($article).add($container).stop().css('display', 'none');
			}
			$('#canvasPic').remove();
			let pattern = Trianglify({
				width: window.innerWidth,
				height: window.innerHeight
			});
			const canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
			canvasBackground.setAttribute("id", "canvasPic");
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
});




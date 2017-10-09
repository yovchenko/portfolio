'use strict';
import {$resizeContent} from './resize.js';
let Trianglify = require('trianglify'); 
$( document ).ready(function() {
/* music player buttons */
function player() {
	let stop = document.getElementById('stopMusic');
	let play = document.getElementById('playMusic');
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
let $menuToggle = $('.menuToggle');
$menuToggle.hover(function () {
		$('.menuToggle span').toggleClass('spanWithShadow');
		$(this).toggleClass('menuTransform');
	});
let $init = $('#menu__init');
	$menuToggle.click(function () {
		let $this = $(this);
		let $menuClasses = $('.menu__about,.menu__work,.menu__contact');
		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$menuClasses.stop().addClass('fadeOut');
			$init.css('display', 'none');
			let $set = setTimeout(function () {
				$('.fadeOut').css('display', 'none');
				if (!$menuClasses.is(':visible')) {
					$init.stop().fadeIn(500);
				}
				else {
					clearTimeout($set);
				}
			}, 1500);
		}
		else {
			$this.addClass('active');
			$menuClasses.css('display', 'none');
			$menuClasses.fadeIn(1500);
			$menuClasses.removeClass('fadeOut').css('display', 'flex');
			headerText();
			if ($init.is(':visible')) {
				$init.stop().fadeOut(500);

			}
			else {
				clearTimeout($set);
			}
		}
	});

/*header text*/
	let $home = $('.menu__home');
	let $about = $('.js-about');
	let $work = $('.js-work');
	let $contact = $('.js-contact');
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
		let $wrapperCanvas = $('#wrapperCanvas');
		let $article = $('article');
		let $footer = $('footer');
		let $curtainRight = $('#curtain-section-right');
		let $curtainLeft = $('#curtain-section-left');
		let $container = $('.containerForm');
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
			let canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
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




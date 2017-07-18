/*preloader*/
$(document).ready(function () {
	var opacity = 0.55;
	var pulse = setInterval(function () {
		if (opacity < 0.95) {
			$('.entry-title').css('color', 'rgba(255%,255%,255%,' + opacity + ')');
			opacity += 0.05;
		}
		else {
			clearInterval(pulse);
		}
	}, 100);

	var $start = setTimeout(function () {
		$('body').addClass('loaded');
		$('footer').css('display', 'block');
		$('.entry-title,#loader,#loader:before,#loader:after').stop().css('display', 'none');
		Amplitude.init({
			"songs":
			[
				{
					"name": "Cantaloupe Island",
					"artist": "Herbie Hancock",
					"album": "Then&Now The Definitive Herbie",
					"url": " https://yovchenko.github.io/music/smoothMusic.mp3",
				}
			],
			"volume": 40
		});
	}, 2500);
	/*canvas background*/
	var pattern = Trianglify({
		width: window.innerWidth,
		height: window.innerHeight
	});
	var canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
	canvasBackground.setAttribute("id", "canvasPic");
	pattern = Trianglify({
		cell_size: 95,
		variance: 0.75,
		x_colors: 'random',
		y_colors: 'match_x',
		palette: Trianglify.colorbrewer,
		stroke_width: 0.2,
	});

	// Serialize the SVG object to a String
	var m = new XMLSerializer().serializeToString(pattern.svg());
	// Perform the base64 encoding of the String
	var k = window.btoa(m);
	// Query the element to set the background image property
	var elementTop = document.getElementsByTagName('header')[0];
	var elementBottom = document.getElementsByTagName('footer')[0];
	// Set the background image property, including the encoding type header
	elementTop.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';
	elementBottom.style.backgroundImage = 'url("data:image/svg+xml;base64,' + k + '")';

	/* hamburger menu */
	$('.menuToggle').hover(function () {
		$('.menuToggle span').toggleClass('spanWithShadow');
		$(this).toggleClass('menuTransform');
	});

	$('.menuToggle').click(function () {
		var $this = $(this);
		var $menuClasses = $('.menu__about,.menu__work,.menu__contact');
		var $init = $('#menu__init');
		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$menuClasses.addClass('fadeOut');
			$init.css('display', 'none');
			var $set = setTimeout(function () {
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
	var $home = $('.menu__home');
	var $about = $('.js-about');
	var $work = $('.js-work');
	var $contact = $('.js-contact');
	var headerText = function () {
		var s,
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
							var text = $.trim(el).split("");
							return '<span>' + text.join('</span><span>') + '</span>';
						});
						s.lettersWork.html(function (i, el) {
							text = $.trim(el).split("");
							return '<span>' + text.join('</span><span>') + '</span>';
						});
						s.lettersContact.html(function (i, el) {
							text = $.trim(el).split("");
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
		var $page = event.data.case;
		$('#curtain-section-right,#curtain-section-left').css('width', '100%');
		$('#curtain-section-right').stop().css('transform', 'translateX(50%)');
		$('#curtain-section-left').stop().css('transform', 'translateX(-50%)');
		var $timerCurtain = setTimeout(function () {

			if ($page === 3 || $page === 4) {
				$('.menuToggle,#canvas,.myPhoto').stop().css('display', 'none');
				$home.css('display', 'flex');
				$('article').css('display', 'none');
			}
			else if ($page === 2) {
				$('.menuToggle,#canvas,.myPhoto').stop().css('display', 'none');
				$('.menu__home,article').css('display', 'flex');
				$('#wrapperCanvas').css('display', 'none')
			}
			else {
				$('.menuToggle,#canvas,.myPhoto').css('display', 'flex');
				$home.css('display', 'none');
				$('article').css('display', 'none');
				$('#wrapperCanvas').css('display', 'flex')
			}
			$('#canvasPic').remove();
			pattern = Trianglify({
				width: window.innerWidth,
				height: window.innerHeight
			});
			canvasBackground = document.getElementById("main").appendChild(pattern.canvas());
			canvasBackground.setAttribute("id", "canvasPic");
			pattern = Trianglify({
				cell_size: 95,
				variance: 0.75,
				x_colors: 'random',
				y_colors: 'match_x',
				palette: Trianglify.colorbrewer,
				stroke_width: 0.2,
			});
			$('#curtain-section-right').stop().css({
				'-webkit-transform': 'translateX(100%)',
				'-moz-transform': 'translateX(100%)',
				'transform': 'translateX(100%)'
			});
			$('#curtain-section-left').stop().css({
				'-webkit-transform': 'translateX(-100%)',
				'-moz-transform': 'translateX(-100%)',
				'transform': 'translateX(-100%)'
			});
		}, 1200);
	}

	/* music player buttons */
	var stop = $('.stopMusic');
	var play = $('.playMusic');
	play.click(function () {
		stop.show();
		play.hide();
	});
	stop.click(function () {
		stop.hide();
		play.show();
	});
});



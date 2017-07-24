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
	var $menuToggle = $('.menuToggle');
	$menuToggle.hover(function () {
		$('.menuToggle span').toggleClass('spanWithShadow');
		$(this).toggleClass('menuTransform');
	});

	$menuToggle.click(function () {
		var $this = $(this);
		var $menuClasses = $('.menu__about,.menu__work,.menu__contact');
		var $init = $('#menu__init');
		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$menuClasses.stop().addClass('fadeOut');
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
		var $wrapperCanvas = $('#wrapperCanvas');
		var $article = $('article');
		var $curtainRight = $('#curtain-section-right');
		var $curtainLeft = $('#curtain-section-left');
		var $container = $('.container');
		var $pageMain = event.data.case;
		$curtainRight.add($curtainLeft).css('width', '100%');
		$curtainRight.stop().css('transform', 'translateX(50%)');
		$curtainLeft.stop().css('transform', 'translateX(-50%)');
		var $timerCurtain = setTimeout(function () {

			if ($pageMain === 4) {
				$menuToggle.add('#canvas,.myPhoto').add($article).add($wrapperCanvas).stop().css('display', 'none');
				$container.add($home).css('display', 'flex');
				$resizeContent();
			}
			else if ($pageMain === 3) {
				$menuToggle.add('#canvas,.myPhoto').add($article).add($container).stop().css('display', 'none');
				$home.css('display', 'flex');
			}
			else if ($pageMain === 2) {
				$menuToggle.add('#canvas,.myPhoto').add($wrapperCanvas).add($container).stop().css('display', 'none');
				$('.menu__home,article').css('display', 'flex');
			}
			else {
				$menuToggle.add('#canvas,.myPhoto').add($wrapperCanvas).css('display', 'flex');
				$home.add($article).add($container).css('display', 'none');
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

	/* music player buttons */
	var stop = $('.stopMusic');
	var play = $('.playMusic');
	play.click(function () {
		stop.show();
		$(this).hide();
	});
	stop.click(function () {
		$(this).hide();
		play.show();
	});

	/*envelope resize*/
	var pageWidth, pageHeight;

	var basePage = {
		width: 530,
		height: 583,
		scale: 1,
		scaleX: 1,
		scaleY: 1
	};

	var $resizeContent = function e() {
		var $page = $('#wrap');

		$('input,#message').focus(function () {
			if ($(window).width() < 570) {
				basePage = {
					width: 530,
					height: 323,
					scale: 1,
					scaleX: 1,
					scaleY: 1
				};
				getPageSize();
				scalePages($page, pageWidth, pageHeight);
			}
		});
		getPageSize();
		scalePages($page, pageWidth, pageHeight);

		//using underscore to delay resize method till finished resizing window
		$(window).resize(function () {
			getPageSize();
			scalePages($page, pageWidth, pageHeight);
		});


		function getPageSize() {
			pageHeight = $('.envelope').height();
			pageWidth = $('.envelope').width();
		}

		function scalePages(page, maxWidth, maxHeight) {
			var scaleX = 1, scaleY = 1;

			scaleX = maxWidth / basePage.width;
			scaleY = maxHeight / basePage.height;
			basePage.scaleX = scaleX;
			basePage.scaleY = scaleY;
			basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

			var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
			var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight) / 2));

			page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');right:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
		}
	};
	$(window).on('orientationchange', function (event) {
		$('.container').css({
			'padding': '115% 0 0 0',
			'top': '-100px'
		});

	});

	/*feedback $form*/
	var $contactForm = $('#contactForm');
	$contactForm.submit(function (e) {
		var form = document.querySelector('#message');
		if (form.checkValidity()) {
			e.preventDefault();
			$.ajax({
				url: "https://formspree.io/gascentr.service@gmail.com",
				method: "POST",
				data: {
					textarea: $('#message').val()
				},
				dataType: "json"
			}).done(function () {
				$('form').html('<h1><span class="message">Thank you!</span></h1>');
			});
		}
	});
});











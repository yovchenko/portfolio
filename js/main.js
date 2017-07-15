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

	setTimeout(function () {
		$('body').addClass('loaded');
		$('.entry-title,#loader').css('display', 'none');
	}, 2500);
	
/* hamburger menu */
	$('.menuToggle').hover(function () {
		$('.menuToggle span').toggleClass('spanWithShadow');
		$(this).toggleClass('menuTransform');
	});
});

	$('.menuToggle').click(function () {
			var $this = $(this);
			if ($this.hasClass('active')) {
				$this.removeClass('active');
				$('.menu__about,.menu__work,.menu__contact').addClass('fadeOut');
				headerText();
				setTimeout(function () {
					$('.menu__init').css('display','none');
					$('.fadeOut').css('display','none');
	             }, 1800);
			}
			else {
				$this.addClass('active');
				$('.menu__init').css('display','none');
				$('.menu__about,.menu__work,.menu__contact').removeClass('fadeOut').css('display','flex');
				headerText();
			}
		});

/*header text*/
var headerText = function () {
	var $about, $work, $contact;
	var s,
		textLetters = {
			settings: {
				lettersAbout: $('.js-about'),
				lettersWork: $('.js-work'),
				lettersContact: $('.js-contact'),
			},
			init: function () {
				s = this.settings;
				this.bindEvents();
			},
			bindEvents: function () {
				$about = $('.js-about').text('About');
				$work = $('.js-work').text('Work');
				$contact = $('.js-contact').text('Contact');
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


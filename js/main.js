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
		$('.entry-title,#loader,#loader:before,#loader:after').stop().css('display','none');
	}, 2500);

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
			$init.css('display','none');
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

$('.menu__about,.menu__work,.menu__contact').click(function () {
    $('#curtain-section-right,#curtain-section-left').css('width','100%');
	$('#curtain-section-right').stop().css('transform','translateX(50%)');
	$('#curtain-section-left').stop().css('transform','translateX(-50%)');
 	var $timerCurtain = setTimeout(function () {
	$('.menuToggle,#canvas,.myPhoto').stop().css('display','none');
	$('.menu__home').css('display','flex');
	$('#curtain-section-right').stop().css({
  	'-webkit-transform' : 'translateX(100%)',
  	'-moz-transform'    : 'translateX(100%)',
  	'transform'         : 'translateX(100%)'
});
	$('#curtain-section-left').stop().css({
  	'-webkit-transform' : 'translateX(-100%)',
  	'-moz-transform'    : 'translateX(-100%)',
  	'transform'         : 'translateX(-100%)'
});
 }, 1200);
});

$('.menu__home').click(function () {
    $('#curtain-section-right,#curtain-section-left').css('width','100%');
	$('#curtain-section-right').stop().css('transform','translateX(50%)');
	$('#curtain-section-left').stop().css('transform','translateX(-50%)');
 	var $timerCurtain = setTimeout(function () {
	$('.menuToggle,#canvas,.myPhoto').css('display','flex');
	$('.menu__home').css('display','none');
	$('#curtain-section-right').stop().css({
  	'-webkit-transform' : 'translateX(100%)',
  	'-moz-transform'    : 'translateX(100%)',
  	'transform'         : 'translateX(100%)'
});
	$('#curtain-section-left').stop().css({
  	'-webkit-transform' : 'translateX(-100%)',
  	'-moz-transform'    : 'translateX(-100%)',
  	'transform'         : 'translateX(-100%)'
});
 }, 1200);
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
});



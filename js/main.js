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
		$('.entry-title').css('display', 'none');
	}, 2500);
});

/* hamburger menu */
$(document).ready(function () {
	$('.menuToggle').on('click', function () {
		$(this).toggleClass('active');
	  headerText();
	});
	$('.menuToggle').hover(function () {
		$('.menuToggle span').toggleClass('spanWithShadow');
		$(this).toggleClass('menuTransform');
	});
});

/*header text*/
  var headerText = function() {
  var s;
  textLetters = {
    settings: {
      lettersAbout: $('.js-about'),
			lettersWork: $('.js-work'),
			lettersContact: $('.js-contact'),
    },
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    bindEvents: function(){
	  	var about =	$('.js-about').text('About');
			var work =	$('.js-work').text('Work');	
			var contact =	$('.js-contact').text('Contact');	
      s.lettersAbout.html(function (i, el) {
        var text = $.trim(el).split("");
        return '<span>' + text.join('</span><span>') + '</span>';
      });
 			s.lettersWork.html(function (i, el) {
        var text = $.trim(el).split("");
        return '<span>' + text.join('</span><span>') + '</span>';
      });
			 s.lettersContact.html(function (i, el) {
        var text = $.trim(el).split("");
        return '<span>' + text.join('</span><span>') + '</span>';
      });
    },
  };
  textLetters.init();
};


(function loadApp() {
    var flipbook = $('.sj-book'),
    slider = document.getElementById('js-slider');
    slider.background = 0;
    slider.oninput = function() {
        updateHandleValues(this ,this.value, flipbook);
    }
      
    document.getElementsByClassName('volume-up')[0].onclick = function (e) {
        e.preventDefault();
        flipbook.turn('next');
    }
  
    document.getElementsByClassName('volume-down')[0].onclick = function (e) {
        e.preventDefault();
        flipbook.turn('previous');
    }

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {
            var page = parts[1];
            if (page !== undefined) {
                if ($('.sj-book').turn('is'))
                    $('.sj-book').turn('page', page);
            }

        },
        nop: function (path) {
            if ($('.sj-book').turn('is'))
                $('.sj-book').turn('page', 1);
        }
    });

    flipbook.turn({
        elevation: 50,
        acceleration: !isChrome(),
        autoCenter: true,
        gradients: true,
        duration: 1000,
        when: {
            turning: function (e, page, view) {
                var book = $(this),
                    currentPage = book.turn('page'),
                    pages = book.turn('pages');
                if (currentPage > 3 && currentPage < pages - 3) {
                    if (page == 1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (page == pages) {
                        book.turn('page', pages - 1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                } else if (page > 3 && page < pages - 3) {
                    if (currentPage == 1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (currentPage == pages) {
                        book.turn('page', pages - 1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                }
                if (page >= 2)
                    $('.sj-book .p2').addClass('fixed');
                else
                    $('.sj-book .p2').removeClass('fixed');

                if (page < book.turn('pages'))
                    $('.sj-book .p5').addClass('fixed');
                else
                    $('.sj-book .p5').removeClass('fixed');

                Hash.go('page/' + page).update();
                setTimeout(function () {
                    slider.value = getViewNumber(book);
                    moveBar(page, pages, currentPage, slider);
              }, 1);
            },
            turned: function (e, page, view) {
                var book = $(this);
                slider.value = getViewNumber(book, page);
                updateDepth(book);
                book.turn('center');
            },
            end: function (e, pageObj) {
                var book = $(this);
                updateDepth(book);
            },

            missing: function (e, pages) {
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], $(this));
                }
            }
        }
    });

    flipbook.addClass('animated');
})();

function updateDepth(book, newPage) {

}

function moveBar(page, pages, currentPage, slider) {
   var percentage = 100 / pages * 2,
   scaleBook =  document.getElementsByClassName('align')[0];
   if(page === 1 || page === pages) scaleBook.classList.add('resized');
   else scaleBook.classList.remove('resized');
   slider.background = percentage * (slider.value - 1);
   slider.style.backgroundSize = slider.background.toFixed(2) + '% 100%';
}

function getViewNumber(book, page) {
    return parseInt(book.turn('page') / 2 + 1, 10);
}

function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

function updateHandleValues(slider, sliderValue, flipbook) {
    var pageNum = getViewNumber(flipbook),
    percentage = 100 / flipbook.turn('pages') * 2;
    if (pageNum > sliderValue) {
        while (pageNum != sliderValue) {
            flipbook.turn('previous');
            pageNum--;
        }
    } else if (pageNum < sliderValue) {
        while (pageNum != sliderValue) {
            flipbook.turn('next');
            pageNum++;
        }
    }
    slider.background = percentage * (slider.value - 1);
    slider.style.backgroundSize = slider.background.toFixed(2) + '% 100%';
}

function loadPage(page) {

}

function addPage(page, book) {
    var id, pages = book.turn('pages');
    if (!book.turn('hasPage', page)) {
        var element = $('<div />', {
            'class': 'own-size',
            css: {
                width: 460,
                height: 582
            }
        }).
        html('<div class="loader"></div>');
        if (book.turn('addPage', element, page)) {
            loadPage(page);
        }
    }
}

var version = detectIE();

if (!(version === false)) {
    document.getElementsByClassName('slider__range')[0].classList.add('ie-edge__detected');
} 

function isChrome() {
    // Chrome's unsolved bug
    // http://code.google.com/p/chromium/issues/detail?id=128488
    return navigator.userAgent.indexOf('Chrome') != -1;
}

function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  return false;
}
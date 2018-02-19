(function loadApp() {
    var flipbook = $('.sj-book');
    var slider = document.getElementById('js-slider');

    slider.oninput = function() {
        updateHandleValues(this.value, flipbook);
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
                moveBar(page,slider);
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
                setTimeout(function () {
                      slider.value = getViewNumber(book);
                }, 1);
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

function moveBar(pageNum,slider) {
   var scaleBook =  document.getElementsByClassName('align')[0];
   if(pageNum === 1 || pageNum === 6) scaleBook.classList.add('resized');
   else  scaleBook.classList.remove('resized');
   if (pageNum === 1) {
         slider.style.backgroundSize = '0% 100%';
   }
   else if (pageNum === 2 || pageNum === 3) {
         slider.style.backgroundSize = '33% 100%';
   }
   else if (pageNum === 4 || pageNum === 5) {
    slider.style.backgroundSize = '66% 100%';
}
else if (pageNum === 6) {
    slider.style.backgroundSize = '99% 100%';
}
}

function getViewNumber(book, page) {
    return parseInt(book.turn('page') / 2 + 1, 10);
}

function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

function updateHandleValues(sliderValue, flipbook) {
    let pageNum = getViewNumber(flipbook);
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

function isChrome() {
    // Chrome's unsolved bug
    // http://code.google.com/p/chromium/issues/detail?id=128488
    return navigator.userAgent.indexOf('Chrome') != -1;
}
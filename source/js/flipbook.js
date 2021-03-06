(function loadApp() {
    var flipbook = $('.sj-book'),
        slider = document.getElementById('js-slider');
    slider.background = 0;
    slider.oninput = function () {
        updateHandleValues(this, this.value, flipbook);
    }

    slider.onmousemove = function () {
        updateHandleValues(this, this.value, flipbook);
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
                    $('.sj-book .p7').addClass('fixed');
                else
                    $('.sj-book .p7').removeClass('fixed');

                Hash.go('page/' + page).update();
                setTimeout(function () {
                    slider.value = getViewNumber(book);
                    moveBar(page, pages, currentPage, slider);
                }, 1);
            },
            turned: function (e, page, view) {
                var book = $(this);
                slider.value = getViewNumber(book, page);
                book.turn('center');
            },
            end: function (e, pageObj) {
                var book = $(this);
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

function moveBar(page, pages, currentPage, slider) {
    var percentage = 100 / pages * 2;
    if (page === 1 || page === pages) document.getElementById('align').className = 'align';
    else document.getElementById('align').className += ' resized';
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
        }
    }
}

function isChrome() {
    // Chrome's unsolved bug
    // http://code.google.com/p/chromium/issues/detail?id=128488
    return navigator.userAgent.indexOf('Chrome') != -1;
}

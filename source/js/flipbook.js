(function loadApp() {
    var flipbook = $('.sj-book');
    var bookSlider = $('#slider');
    bookSlider.slider({
        orientation: "horizontal",
        min: 1,
        max: 4,
        value: 1,
        animate: "slow",
        range: false,
        create: function (event, ui) {

        },
        slide: function (event, ui) {
            updateHandleValues(ui, flipbook);
        //    return updateHandlePos(event.target, ui.value);
        },
    });

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

    // Arrows
    $(document).keydown(function (e) {
        var previous = 37,
            next = 39;
        switch (e.keyCode) {
            case previous:
                $('.sj-book').turn('previous');
                break;
            case next:
                $('.sj-book').turn('next');
                break;
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

            },

            turned: function (e, page, view) {
                var book = $(this);
                $("#slider").slider('value', getViewNumber(book, page));
                updateDepth(book);
                book.turn('center');
            },
            start: function (e, pageObj) {
                moveBar(true);
            },
            end: function (e, pageObj) {
                var book = $(this);
                updateDepth(book);
                setTimeout(function () {
                    $('#slider').slider('value', getViewNumber(book));
                }, 1);
                moveBar(false);
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

/* function updateHandlePos(slider, handlePos) {
    console.log(handlePos)
    let handleOffset = -2;
    $(slider).find('.ui-slider-handle').css("margin-left", handleOffset);
    if (handlePos === 2) {
        $(slider).find('.ui-slider-handle').css("margin-left", handleOffset - 5);
    } else if (handlePos === 3) {
        $(slider).find('.ui-slider-handle').css("margin-left", handleOffset - 10);
    } else if (handlePos === 4) {
        $(slider).find('.ui-slider-handle').css("margin-left", handleOffset - 15);
    }
};
*/
function updateDepth(book, newPage) {

}

function moveBar(yes) {
       $('#slider .ui-slider-handle').css({
          zIndex: yes ? -1 : 10000
    });
}

function getViewNumber(book, page) {
    return parseInt(book.turn('page') / 2 + 1, 10);
}

function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

function updateHandleValues(ui, flipbook) {
    let pageNum = getViewNumber(flipbook);
    if (pageNum > ui.value) {
        while (pageNum != ui.value) {
            flipbook.turn('previous');
            pageNum--;
        }
    } else if (pageNum < ui.value) {
        while (pageNum != ui.value) {
            flipbook.turn('next');
            pageNum++;
        }
    }
}

function loadPage(page) {}

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
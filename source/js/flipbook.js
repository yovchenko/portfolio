loadApp();

function loadApp() {
    var flipbook = $('.sj-book');
    $('#slider').slider({
        min: 1,
        max: 4,
        value: 0,
        slide: function (event, ui) {
            updateHandleValues(ui);
        }
    });

    function updateHandleValues(ui) {
        $('.sj-book').turn('page', ui.value);
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

    // Arrows
    $(document).keydown(function (e) {
        var previous = 37, next = 39;
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
        pages: 0,
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
                if (page==2 || page==3) {
					book.turn('peel', 'br');
				}

                updateDepth(book);
                book.turn('center');
            },
            start: function (e, pageObj) {},
            end: function (e, pageObj) {},

            missing: function (e, pages) {
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], $(this));
                }
            }
        }
    });

    flipbook.addClass('animated');
};

function updateDepth(book, newPage) {
    var page = book.turn('page');
    $('#slider').slider("value", page);
    var data = book.data();
    if(data.opts.page === 3) {
       console.log(true)
      }

}


function loadPage(page) {}

function addPage(page, book) {
    var id, pages = book.turn('pages');
    
        if (!book.turn('hasPage', page)) {
    
            var element = $('<div />',
                {'class': 'own-size',
                    css: {width: 460, height: 582}
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
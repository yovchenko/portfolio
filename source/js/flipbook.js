(function loadApp () {
        'use strict';
        var flipbook = $('.sj-book');
        var module = {
            ratio: 1.6,
            init: function (id) {
                var me = this;
    
                // if older browser then don't run javascript
                if (document.addEventListener) {
                    this.el = document.getElementById(id);
                    this.resize();
                    this.plugins();
    
                    // on window resize, update the plugin size
                    window.addEventListener('resize', function (e) {
                        var size = me.resize();
                        $(me.el).turn('size', size.width, size.height);
                    });
                }
            },
            resize: function (e) {
                // reset the width and height to the css defaults
                this.el.style.width = '';
                this.el.style.height = '';
    
                var width = this.el.clientWidth,
                    height = Math.round(width / this.ratio),
                    padded = Math.round(document.body.clientHeight * 1);
    
                // if the height is too big for the window, constrain it
                if (height > padded) {
                    height = padded;
                    width = Math.round(height * this.ratio);
                }
    
                // set the width and height matching the aspect ratio
                this.el.style.width = width + 'px';
                this.el.style.height = height + 'px';
    
                return {
                    width: width,
                    height: height
                };
            },
            plugins: function () {
                // run the plugin
                $(this.el).turn({
                    elevation: 50,
                    acceleration: !isChrome(),
                    autoCenter: true,
                    gradients: true,
                    duration: 1000,
                    pages: 0,
                    when: {
                        turning: function(e, page, view) {
                            var book = $(this),
                                currentPage = book.turn('page'),
                                pages = book.turn('pages');
            
                            if (currentPage>3 && currentPage<pages-3) {
                            
                                if (page==1) {
                                    book.turn('page', 2).turn('stop').turn('page', page);
                                    e.preventDefault();
                                    return;
                                } else if (page==pages) {
                                    book.turn('page', pages-1).turn('stop').turn('page', page);
                                    e.preventDefault();
                                    return;
                                }
                            } else if (page>3 && page<pages-3) {
                                if (currentPage==1) {
                                    book.turn('page', 2).turn('stop').turn('page', page);
                                    e.preventDefault();
                                    return;
                                } else if (currentPage==pages) {
                                    book.turn('page', pages-1).turn('stop').turn('page', page);
                                    e.preventDefault();
                                    return;
                                }
                            }
            
                            updateDepth(book, page);
                            
                            if (page>=2)
                                $('.sj-book .p2').addClass('fixed');
                            else
                                $('.sj-book .p2').removeClass('fixed');
            
                            if (page<book.turn('pages'))
                                $('.sj-book .p5').addClass('fixed');
                            else
                                $('.sj-book .p5').removeClass('fixed');
            
                            Hash.go('page/'+page).update();
                                
                        },
            
                        turned: function(e, page, view) {
            
                            var book = $(this);
            
                            if (page==2 || page==3) {
                                book.turn('peel', 'br');
                            }
            
                            updateDepth(book);
                            
                            book.turn('center');
            
                        },
            
                        missing: function (e, pages) {
            
                            for (var i = 0; i < pages.length; i++) {
                                addPage(pages[i], $(this));
                            }
            
                        }
                    }
                });
                // hide the body overflow
                document.body.className = 'hide-overflow';
            }
        };
    
        module.init('sj-book');
        flipbook.addClass('animated');
    }());

 Hash.on('^page\/([0-9]*)$', {
        yep: function(path, parts) {

            var page = parts[1];

            if (page!==undefined) {
                if ($('.sj-book').turn('is'))
                    $('.sj-book').turn('page', page);
            }

        },
        nop: function(path) {

            if ($('.sj-book').turn('is'))
                $('.sj-book').turn('page', 1);
        }
    });

    // Arrows
    $(document).keydown(function(e){

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
   
function updateDepth(book, newPage) {
    
        var page = book.turn('page'),
            pages = book.turn('pages'),
            depthWidth = 16*Math.min(1, page*2/pages);
    
            newPage = newPage || page;
    
        if (newPage>3)
            $('.sj-book .p2 .depth').css({
                width: depthWidth,
                left: 20 - depthWidth
            });
        else
            $('.sj-book .p2 .depth').css({width: 0});
    
            depthWidth = 16*Math.min(1, (pages-page)*2/pages);
    
        if (newPage<pages-3)
            $('.sj-book .p5 .depth').css({
                width: depthWidth,
                right: 20 - depthWidth
            });
        else
            $('.sj-book .p4 .depth').css({width: 0});
    
    }

function loadPage(page) {
}

function addPage(page, book) {

    var id, pages = book.turn('pages');

    if (!book.turn('hasPage', page)) {

        var element = $('<div />',
            {'class': 'own-size',
                css: {width: 480, height: 600}
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

    return navigator.userAgent.indexOf('Chrome')!=-1;

}
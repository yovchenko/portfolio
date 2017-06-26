 $(document).ready(function () {
      var stop = $('.stopMusic');
      var play = $('.playMusic');
      play.click(function () {
        stop.show();
        play.hide();
      });
      stop.click(function () {
        stop.hide();
        play.show();
      });
    });
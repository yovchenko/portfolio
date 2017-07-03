$(document).ready(function() {
	 var opacity = 0.55;
     var pulse = setInterval( function() {
		   if (opacity < 0.95) {
	       $('.entry-title').css('color','rgba(255%,255%,255%,'+ opacity + ')');
		   opacity += 0.05;
		   }
		   else { 
           clearInterval(pulse);
		   }
    }, 100);
	setTimeout(function(){
		$('body').addClass('loaded');
		$('.entry-title').css('display','none');
	}, 2500);
});

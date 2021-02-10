;(function () {
	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
			scrlTop = $(this).scrollTop();
			
			if ( scrlTop > 70 && scrlTop < 500) {
				header.hide();
			}else{
				header.show();
			}
			
		});
	};
	// Document on load.
	$(function(){
		windowScroll();
	});

}());
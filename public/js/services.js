/**
 * Services scripts
 */ 

// Readmore
/*$('.services-row .readmoreContent').readmore();*/

// SlideTo Sections
var hash = document.location.hash;
var offset = $(hash).offset();
if(offset) $("html, body").animate({scrollTop : (offset.top-120)}, 1000);

$('.menu .menu-item_has_sub-nav a').click(function(event) {
	event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top-120}, 500);
    document.location.hash = $(this).attr('href').split("#")[1];
});

$('.services-toggle div a').click(function() {
	var self = $(this);
	var offset = $(self.attr('href')).offset();
	$("html, body").animate({scrollTop : (offset.top-120)}, 1000);
	
	document.location.hash = self.attr('href').replace('#', '');
	return false;
});

var animated = false;
$(window).scroll(function() {
	// var offsetLastOne = $('.services-row div:last-child').offset();
	var scrollTopCurrent = $(this).scrollTop();
	var docHeight = $(document).innerHeight() * 3 / 5;
	
	if(scrollTopCurrent > docHeight && animated != true) {
		$('.services-toggle').animate({ opacity : 0 }, 500);
		animated = true;
	} else if(scrollTopCurrent < docHeight  && animated == true) {
		$('.services-toggle').animate({ opacity : 1 }, 500);
		animated = false;
	}
});

// toggle services tooltip

$('.services-toggle a').tooltip();


// history.pushState({}, '', 'services/'+document.location.hash.replace('#', ''));

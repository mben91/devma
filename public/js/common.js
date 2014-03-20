
;(function($){

    "use strict";

    $(document).ready(function() {
        // Remove no-js class
        $('html').removeClass('no-js');


        // Init ThemePile UI Plugins
        $('.themepile-ui__tabs').themepileUITabs();
        $('.themepile-ui__accordion').themepileUIAccordion();
        $('.themepile-ui__alert').themepileUIAlert();
        $('.themepile-ui__back-to-top').themepileUIBackToTop();

        $('.scrolled').themepileStepsShowing(
            {
                'onStartAnimation' : function(){

                    if($(this.element).hasClass('infographic')) {
                        $('.infographic__item__circle').themepileInfographic();
                    }
                }
            }
        );


        // Validation
        $.validator.setDefaults({
            ignore: ":hidden"
        });
        $.validator.addClassRules({
            required: {
                required: true
            },
            email: {
                email: true
            }
        });
        $('.form').validate();

        // Sliders
        // Main Slider
        $('.slider').themepileSlider(
            {
                "effect":"fade",
                "easing": "easeInCubic",
                "interval": 9000,
                "onSlide" : function (index, slides) {
                    slides.removeClass('current');
                    slides.eq(index).addClass('current');
                }
            },
            {
                "wrapper": $('.slider__thumbs')
            }
        );


        // Creating tweet container
        // Twitter settings
        $('.twitter__container').tweet({
            username: 'SteDevma',
            join_text: 'auto',
            count: 1,
            loading_text: "Loading tweets...",
            template: '<h3>{text}</p></h3>'
        });

        // Init Google Map
        if($('.map').length!==0) {

            var google = window.google;
            var lat = $('.map').attr('data-lat');
            var lng = $('.map').attr('data-lng');
            var mapOptions = {
                zoom: 16,
                scrollwheel: false,
                center: new google.maps.LatLng(lat,lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($('.map').get(0), mapOptions);
            var myLatLng = new google.maps.LatLng(lat,lng);
            var marker = new google.maps.Marker({
                position: myLatLng,
                animation: google.maps.Animation.BOUNCE,
            });

            marker.setMap(map);
        }

        // Countdown
        var note = $('.coming-soon__countdown'),
            // Date of Start
            ts = new Date(2015, 0, 1);

        $('.coming-soon__countdown').countdown({
            timestamp	: ts,
            callback	: function(days, hours, minutes, seconds){

                var message = "";

                message += days + " day" + ( days===1 ? '':'s' ) + ", ";
                message += hours + " hour" + ( hours===1 ? '':'s' ) + ", ";
                message += minutes + " minute" + ( minutes===1 ? '':'s' ) + " and ";
                message += seconds + " second" + ( seconds===1 ? '':'s' ) + " <br />";

                note.html(message);
            }
        });

        // Portfolio Sortable
        $('.toolbar__filter__list__item__link').on('click', function(){

            if($(this).attr('data-portfolio-link')) {
                var category = $(this).attr('data-portfolio-link');
                 $('.toolbar__filter__list__item__link').removeClass('toolbar__filter__list__item__link_state_active');
                 $(this).addClass('toolbar__filter__list__item__link_state_active');

                 $('.projects__item').hide();

                 if(category === "all") {
                     $('.projects__item').fadeIn();
                 }
                 else  {
                     $('.projects__item[data-portfolio-type="'+category+'"]').fadeIn();
                 }

                return false;
            } else {
                return true;
            }

        });

        // Simple Parallax
        $(window).bind('scroll', parallaxScroll);

        function parallaxScroll(){
            var k = $(document).height() / 400;
            var opacity =  parseFloat(('0.'+Math.floor(($(window).scrollTop() /$(document).height() )*10)))+ 0.1;
            $('.body__overlay').stop().animate({'opacity' : opacity});
            $('body').css({
                "background-position": "0 " + -(Math.floor($(window).scrollTop() / k)) + 'px'
            });
        }

        parallaxScroll();
        
    	$('blockquote').quovolver();
    	
        /**
         * Services scripts
         */ 
    	
    	// Readmore
    	$('.services-row .content').readmore();
    	
    	// SlideTo Sections
    	$('.services-toggle div a').click(function() {
    		var self = $(this);
    		var offset = $(self.attr('href')).offset();
    		$("html, body").animate({scrollTop : (offset.top-120)}, 1000);
    		
    		return false;
    	});
    	
    	var animated = false;
    	$(window).scroll(function() {
    		// var offsetLastOne = $('.services-row div:last-child').offset();
    		var scrollTopCurrent = $(this).scrollTop();
    		var docHeight = $(document).innerHeight() * 3 / 5;
    		
    		console.log(docHeight);
    		console.log(scrollTopCurrent);
    		console.log('-----------------------------');
    		
    		if(scrollTopCurrent > docHeight && animated != true) {
    			$('.services-toggle').animate({ opacity : 0 }, 500);
    			animated = true;
    		} else if(scrollTopCurrent < docHeight  && animated == true) {
    			$('.services-toggle').animate({ opacity : 1 }, 500);
    			animated = false;
    		}
    	});
    	
    	
    });
})(window.jQuery);
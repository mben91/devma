var oVideo = {
	
	autoPlay : true,

	total : 23,
	
	current : 0,
	
	container : "jwp",
	
	init : false,
	
	buildPlayer : function(){
		jwplayer("jwp").setup({
	         flashplayer:'/js/medias/jwplayer/jwplayer.flash.swf',
			 skin:'/js/medias/jwplayer/skins/skunkus.zip',
		     height:438,
		     width:754,
   		     events:{
		     	onReady:function(){
					
		     	},
		     	onComplete:function(){
		     		if(oVideo.current < oVideo.total){
		     			oVideo.current++;
		     			oVideo.read(oVideo.current);
		     		}else{
		     			oVideo.stop();
		     			$('.close').click();
		     		}
		     	},
		     	onResize:function(){
		     		Win_resize();
		     	}
		     },
		     logo: {
        		hide: false
    		 }    
        });
	},		
	setMedia : function(media){
		jwplayer(this.container).load(media);
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
		if(isiPad){
			
		   if(oVideo.init==false){	
		   	  oVideo.init=true;		   
		   }else{
		   	  setTimeout(function(){
				 jwplayer(this.container).play(true);
			  }, 1000);
		   }
		}else{
		   setTimeout(function(){
			 jwplayer(this.container).play(true);
		   }, 1000);
		}
		
	},
	read : function(id)
	{
		if(oVideo.current < oVideo.total){
			$('#next').show();
			if(oVideo.current < 2)
			{
				$('#prev').hide();
			}else{
				$('#prev').show();
			}
		}else{
 			$('#next').hide();
		}
		oVideo.current=id;
		var data= JSON.parse($("#index_"+id).find('.js-data').text());
		//this.resize(parseInt(data.width),parseInt(data.height));
		if(data.vidIsImg == false) {
			$('div#jwp').css('display', 'block');
			$('div#jwp_wrapper').css('display', 'block');
			$('div#p-player').css('display', 'block');
			$('.video #vidImg').hide();
			var media={
				 file:data.video,
				 image:data.thumbnail
			};
			this.setMedia(media);
		} else {

			$('div#jwp').css('display', 'none');
			$('div#jwp_wrapper').css('display', 'none');
			$('div#p-player').css('display', 'none');
			$('.video #vidImg').show();
			$('.video #vidImg').attr('src', data.video);
		}
		$('#videoContent').html(data.director+'<br>'+data.client+'<br>"'+data.title+'"');
		$('#videoNavigation p').html(oVideo.current + "/" + oVideo.total);
		if(oVideo.current < this.total) {
		   oVideo.current = id;
		}
	},
	resize : function(width, height){
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
		if(width>800){
			height=height*800/width;
			width=800;
		}		
		jwplayer(oVideo.container).resize(width, height);	
		if(isiPad){
           $('.video').css('background','none');
           if(width<=640){
           	  width=640;
			  height=height*(width+30)/(width+30);
			  width=(width+30);
		   }
		}
		$('.video').attr('style','width:'+(width+34)+'px !important'+';height:'+(height+34)+'px !important');
	},	
	play   : function(){
		jwplayer(this.container).play(true);
	},	
	pause  : function(){
		jwplayer(this.container).pause(true);
	},	
	stop  : function(){
		jwplayer(this.container).stop(true);
	},
	next  : function(){
		
		
		
 		if(oVideo.current < oVideo.total){
 	
 			console.log(oVideo.current);
 			oVideo.current++;
 			oVideo.read(oVideo.current);
 		}else{
 			oVideo.stop();
 		}
	},
	prev  : function(){
		
 		if(oVideo.current > 1){
 			oVideo.current--;
 			oVideo.read(oVideo.current);
 		}else{
 			oVideo.stop();
 			
 		}
	}
};
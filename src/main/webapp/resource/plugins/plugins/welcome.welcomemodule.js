;(function(){
	"use strict"; // jshint ;_;
	
	$.welcome.welcomemodule = {
			url : "welcome.welcomemodule.html",
			modulehash : '#module=welcome.welcomemodule|{param1:"1",param2:"2"}',
			init:init
	};
	
	function init(param){
		if(param){
			if(param.data){
			}
		}
		$(".live-tile").liveTile({
	  		playOnHover:true,
		    repeatCount: 0,
		    delay: 0,
		    startNow:false,
		    bounce:true,
		    click: function($tile, tileData){
		    	location.hash = $tile.attr("modulehash");
	        }
	  	});
	}
})();

;(function(){
	"use strict"; // jshint ;_;
	
	$.demo.demofeedbackmodule = {
			url : "demo.demofeedbackmodule.html",
			modulehash : '#module=demo.demofeedbackmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){}
	}
	
})();

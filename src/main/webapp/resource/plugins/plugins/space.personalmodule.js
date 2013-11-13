;(function(){
	//"use strict"; // jshint ;_;
	
	$.space.personalmodule = {
			url : "space.personalmodule.html",
			modulehash : '#module=space.personalmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		
		$content.find(".datepicker").datepicker({
			format:'yyyy-mm-dd'
		}).on('changeDate', function(ev){
			$content.find(".datepicker").datepicker('hide');
		}).datepicker('setValue', new Date());
		
		$('.selectpicker',$content).selectpicker();
	}
})();

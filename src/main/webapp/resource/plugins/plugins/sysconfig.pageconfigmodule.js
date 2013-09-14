;(function(){
	"use strict"; // jshint ;_;
	
	$.sysconfig.pageconfigmodule = {
			url : "sysconfig.pageconfigmodule.html",
			modulehash:"#module=sysconfig.pageconfigmodule|{}",
			init:init
	};
	
	function init(param){
		var id = "sysconfig-pageconfigmodule";
		if(param){
			if(param.data){
				if(param.data.id){
					id = "sysconfig-pageconfigmodule-"+param.data.id;
				}
			}
		}
		
		var $contentDiv = $("#content-"+id);
		
		$("input:radio[name='showtab']",$contentDiv).on('click', function(e){
			var val = $(this).val();
			var $target = $("#appTabNav");
			if(val == "0"){
				$target.hide();
				
				__checkStyle();
				$("input:radio[name='tabposition']",$contentDiv).attr("disabled", true); 
				//$("input:radio[name='tabposition']",$contentDiv)[0].checked = true;
				
			}else if(val == "1"){
				$target.show();
				
				__checkStyle();
				$("input:radio[name='tabposition']",$contentDiv).attr("disabled", false); 
			}
			
			function __checkStyle(){
				if($("#appTabNav").hasClass("cross")){
						$("#appSideNav").addClass("cross");
						$("#appMainContent").addClass("cross");
				}else{
					if($("#appTabNav").is(":visible")){
						$("#appSideNav").removeClass("cross");
						$("#appMainContent").removeClass("cross");
					}else{
						$("#appSideNav").addClass("cross");
						$("#appMainContent").addClass("cross");
					}
				}
				$.checkWindowSize();
			}
	      	
	  	});
		
		
		$("input:radio[name='tabposition']",$contentDiv).on('click', function(e){
			var val = $(this).val();
			var $target = $("#appTabNav");
			if(val == "top"){
				$target.insertBefore("#appSideNav");
	  			$target.removeClass("cross");
	  			$("#appSideNav").removeClass("cross");
	  			$("#appMainContent").removeClass("cross");
			}else if(val == "cross"){
				$target.appendTo("#appTabNavPlaceHolder");
	  			$target.addClass("cross");
	  			$("#appSideNav").addClass("cross");
	  			$("#appMainContent").addClass("cross");
			}
	      	
	  	});
		
		$("input:radio[name='navstyle']",$contentDiv).on('click', function(e){
			var $target = $("#appSideNav");
			var val = $(this).val();
			if(val == "normal"){
				$(".skin-left").removeClass("nav-vertical");
	      		$target.removeClass("nav-vertical");
	      		$("#appMainContent").removeClass("nav-vertical");
			}else if(val == "simple"){
				$(".skin-left").addClass("nav-vertical");
	  			$target.addClass("nav-vertical");
	  			$("#appMainContent").addClass("nav-vertical");
			}
	      	
	  	});
		
	}
})();

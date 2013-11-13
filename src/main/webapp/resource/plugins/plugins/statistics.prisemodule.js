;(function(){
	//"use strict"; // jshint ;_;
	
	var chance = new Chance(function() { return Math.random(); });
	
	$.statistics.prisemodule = {
			url : "statistics.prisemodule.html",
			modulehash : '#module=statistics.prisemodule|{}',
			init:init
	};
	
    function buildMajorCondition($target, isMultiple, $content){
    	$target.select2({
			placeholder:"请选择要统计的专业，默认为所有专业",
		    multiple: isMultiple,
		    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: "testdata/test.json",
		        data: function (term, page) {
		            return {
		                q: term, // search term
		                page_limit: 10,
		                page: page
		            };
		        },
		        results: function (data, page) { // parse the results into the format expected by Select2.
		             return {results: data};			        
		       }
		    }
		}).on("change",function(e) {
			//buildResultTable($content);
    		var datas = $(this).select2("data");
    		if(datas.length == 0){
    			$(this).removeClass("multicol");
    			$('.grade',$content).select2("val","",true).unbind().closest("tr").hide();
    		}else if(datas.length == 1){
    			$(this).removeClass("multicol");
    			$('.grade',$content).closest("tr").show().end().select2("val","",true); 
    			buildGradeCondition($('.grade',$content), true, $content);
    		}else if(datas.length >= 2){
    			$(this).addClass("multicol");
    			$('.grade',$content).closest("tr").hide().end().select2("val","",true); 
    			//buildGradeCondition($('.grade',$content), false, $content); 
    		}
		});
    }
	
    function buildGradeCondition($target, isMultiple, $content){
    	$target.select2({
			placeholder:"请选择要统计的年级，默认为所有年级",
        	multiple: isMultiple,
        	ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: "testdata/test.json",
		        data: function (term, page) {
		            return {
		                q: term, // search term
		                page_limit: 10,
		                page: page
		            };
		        },
		        results: function (data, page) { // parse the results into the format expected by Select2.
		             return {results: data};			        
		       }
		    }
		}).on("change",function(e) {
			//buildResultTable($content);
    		var datas = $(this).select2("data");
    		if(datas.length == 0){
    			$('.clazz',$content).select2("val","",true).unbind().closest("tr").hide();
    		}else if(datas.length == 1){
    			$(this).removeClass("multicol");
    			$('.clazz',$content).closest("tr").show().end().select2("val","",true); 
    			buildClazzCondition($('.clazz',$content), true, $content);
    		}else if(datas.length >= 2){
    			$(this).addClass("multicol");
    			$('.clazz',$content).closest("tr").hide().end().select2("val","",true); 
    			//buildClazzCondition($('.clazz',$content), false, $content); 
    		}
		});  
    }
    
    function buildClazzCondition($target, isMultiple, $content){
    	$target.select2({
			placeholder:"请选择要统计的班级，默认为所有班级",
		    multiple: isMultiple,
		    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: "testdata/test.json",
		        data: function (term, page) {
		            return {
		                q: term, // search term
		                page_limit: 10,
		                page: page
		            };
		        },
		        results: function (data, page) { // parse the results into the format expected by Select2.
		             return {results: data};			        
		       }
		    }
		}).on("change",function(e) {
			var datas = $(this).select2("data");
    		if(datas.length == 0){
    			$('.clazz',$content).closest("tr").hide();
    		}else if(datas.length == 1){
    			$(this).removeClass("multicol");
    		}else if(datas.length >= 2){
    			$(this).addClass("multicol");
    		}
			//buildResultTable($content);
		});
    }
    
	function init(param){

		$.mockjax({
			  url: 'prise.do',
			  status: 200,
			  responseTime: 750,
			  //proxy: 'testdata/test.json'
			  contentType: 'text/json',
			 // responseText: [[12],[12]],
			  response:function(){
				  var responseObj = new Object();
				  
				  var rowSum = $('.y-year:checked',$content).length;
				  
				  var jzmArray = new Array();
				  for(var i = 0; i < rowSum; i ++){
					  var array = new Array();
					  for(var j = 0; j < 3; j++){
						  var inte = chance.integer({min: 200, max: 2000});
						  array.push(inte);
					  }
					  jzmArray.push(array);
				  }
				  responseObj.jzm = jzmArray;
				 
				  var priseArray = new Array();
				  for(var i = 0; i < rowSum; i ++){
					  var array = new Array();
					  for(var j = 0; j < 8; j++){
						  var inte = chance.integer({min: 200, max: 2000});
						  array.push(inte);
					  }
					  priseArray.push(array);
				  }
				  responseObj.prise = priseArray;
				  
				  var punishArray = new Array();
				  for(var i = 0; i < rowSum; i ++){
					  var array = new Array();
					  for(var j = 0; j < 6; j++){
						  var inte = chance.integer({min: 200, max: 2000});
						  array.push(inte);
					  }
					  punishArray.push(array);
				  }
				  responseObj.punish = punishArray;
				  
				  this.responseText = responseObj;
			  }
			});
		
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			
			buildMajorCondition($('.major',$content), true, $content);
			
    		$('.grade',$content).closest("tr").hide(); 
    		$('.clazz',$content).closest("tr").hide(); 
			
    		$('input',$content).on("ifChanged",function(){
    			buildResultTable($content);
    		}).iCheck({checkboxClass: 'icheckbox_square-blue',radioClass: 'iradio_square-blue'});
    		
    		$('.save',$content).click(function(){
    			$(this).button('loading');
    			var $that = $(this);
    			$.ajax( {
        	        "url": "prise.do",
        	        "dataType":"json",
        	        "success": function(data){
        	        	$that.button('reset');
        	        	console.log(data);
        	        	
        	        	//填充数据
        	        	var jzmData = data.jzm;
        	        	var priseData = data.prise;
        	        	var punishData = data.punish;
        	        	
        	        	var $jzmTableBody = $('.jzm-table tbody',$content);
        	        	$(jzmData).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			var $ttr = $jzmTableBody.find("tr:nth-child("+(i+1)+")");
        	        			$ttr.find("td:nth-child("+(j+2)+")").text(this);
        	        		});	        			
        	        	});
        	        	
        	        	var $priseTableBody = $('.prise-table tbody',$content);
        	        	$(priseData).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			var $ttr = $priseTableBody.find("tr:nth-child("+(i+1)+")");
        	        			$ttr.find("td:nth-child("+(j+2)+")").text(this);
        	        		});	        			
        	        	});
        	        	
        	        	var $punishTableBody = $('.punish-table tbody',$content);
        	        	$(punishData).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			var $ttr = $punishTableBody.find("tr:nth-child("+(i+1)+")");
        	        			$ttr.find("td:nth-child("+(j+2)+")").text(this);
        	        		});	        			
        	        	});
        	        	
        	        },
        	        "error":function(data){
        			}
        	      });
    		});
    		
		}
	}
	
	function buildResultTable($content){
		//console.log($('.table',$content).length);
		$('.table',$content).each(function(){
			console.log($(this));
			var $thead = $('thead',$(this));
			var $tbody = $('tbody',$(this)).empty();
			$('.y-year:checked',$content).each(function(){
				var $tr = $("<tr>").append($("<td>").text($(this).attr("data-label")));
				$($thead.find("tr:eq(1) th")).each(function(i){
					if(i != 0){
						$tr.append($("<td>"));
					}
				});
				$tbody.append($tr);
			});
		});
	}
	
})();
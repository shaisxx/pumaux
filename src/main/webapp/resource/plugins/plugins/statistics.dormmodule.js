;(function(){
	//"use strict"; // jshint ;_;
	
	var chance = new Chance(function() { return Math.random(); });
	
	$.statistics.dormmodule = {
			url : "statistics.dormmodule.html",
			modulehash : '#module=statistics.dormmodule|{}',
			init:init
	};
	
    function buildBuildingCondition($target, isMultiple, $content){
    	$target.select2({
			placeholder:"请选择要统计的楼栋，默认为所有楼",
		    multiple: isMultiple,
		    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: "testdata/building.json",
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
    			$(this).removeClass("multicol");
    			$('.floor',$content).select2("val","",true).unbind().closest("tr").hide();
    		}else if(datas.length == 1){
    			$(this).removeClass("multicol");
    			$('.floor',$content).closest("tr").show().end().select2("val","",true); 
    			buildFloorCondition($('.floor',$content), true, $content);
    		}else if(datas.length >= 2){
    			$(this).addClass("multicol");
    			$('.floor',$content).closest("tr").hide().end().select2("val","",true); 
    		}
    		buildResultTable($content);
		});
    }
	
    function buildFloorCondition($target, isMultiple, $content){
    	$target.select2({
			placeholder:"请选择要统计的楼层，默认为所有",
        	multiple: isMultiple,
        	ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: "testdata/floor.json",
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
    			$(this).removeClass("multicol");
    		}else if(datas.length == 1){
    			$(this).removeClass("multicol");
    		}else if(datas.length >= 2){
    			$(this).addClass("multicol");
    		}
    		buildResultTable($content);
		});  
    }
    
	function init(param){

		$.mockjax({
			  url: 'test.do',
			  status: 200,
			  responseTime: 750,
			  //proxy: 'testdata/test.json'
			  contentType: 'text/json',
			 // responseText: [[12],[12]],
			  response:function(){
				  var baseArray = new Array();
				  
				  var colSum = 1;
				  if($('.multicol',$content).length > 0){
					  colSum = $('.multicol',$content).select2("data").length;
				  }
				  var rowSum = $('.y-year:checked',$content).length;
				 
				  for(var i = 0; i < rowSum; i ++){
					  var rowArray = new Array();
					  for(var j = 0; j < colSum; j++){
						  var inte = chance.integer({min: 200, max: 2000});
						  rowArray.push(inte);
					  }
					  baseArray.push(rowArray);
				  }
				  this.responseText = baseArray;
			  }
			});
		
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			
			//buildGraph();
			
			buildBuildingCondition($('.building',$content), true, $content);
			
    		$('.floor',$content).closest("tr").hide(); 
			
    		$('input',$content).on("ifChanged",function(){
    			buildResultTable($content);
    		}).iCheck({checkboxClass: 'icheckbox_square-blue',radioClass: 'iradio_square-blue'});
    		
    		$('.save',$content).click(function(){
    			$(this).button('loading');
    			var $that = $(this);
    			$.ajax( {
        	        "url": "test.do",
        	        "dataType":"json",
        	        "success": function(data){
        	        	$that.button('reset');
        	        	
        	        	return;
        	        	//填充数据
        	        	var $resultTable = $('.result-table tbody',$content);
        	        	$(data).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			var $ttr = $resultTable.find("tr:nth-child("+(i+1)+")");
        	        			$ttr.find("td:nth-child("+(j+2)+")").text(this);
        	        		});	        			
        	        	});
        	        	
        	    		//进行二维数组转置
        	    		var b = new Array();
        	    		$(data).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			if(!b[j]){
        	        				b[j] = new Array();
        	        			}
        	        			b[j][i] = this.valueOf();
        	        		});	        			
        	        	});
        	    		//进行二维数组转置
        	    		
        	    		
        	        	//根据数据生成图形
        	        	 var xTicks = new Array();
        	             
        	        	 var colors = new Array();
        	        	 for(var p = 0; p < b.length; p ++){
        	        		 var c = chance.color();
        	        		 colors.push(c);
        	        		 var $ttd = $('.result-table thead',$content).find("tr:first th:nth-child("+(p+2)+")").css("background-color",c).css("color","white");
        	        	 }
        	        	 
        	             $('.y-year:checked',$content).each(function(){
        	             	xTicks.push($(this).attr("data-label"));
        	     		});
        	        	buildGraph(b, xTicks, colors, $content);
        	        },
        	        "error":function(data){
        			}
        	      });
    		});
    		
		}
	}
	
	function buildGraph(data, xTicks, colors, $content){
		
	var barWidth = 30;
		/*console.log(data.length);
		console.log(xTicks.length);*/
	var gWidth = (barWidth+10) * data.length * xTicks.length + 200;
	console.log(gWidth);
	 var id = $.util.generateRandomString(5);
	 $(".report", $content).attr("id",id).width(gWidth).empty();
	 
      var  plot2 = $.jqplot(id, data/*[s1, s2, s3]*/, {
        	animate: !$.jqplot.use_excanvas,
        	seriesColors:colors,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels:{show: true},
                rendererOptions: {
                	barWidth:barWidth,
                	//barMargin: 30,
                    animation: {
                        speed: 500
                    }
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: xTicks
                },
            }/*,
            legend: {
                show: true,
                location: 'ne',
                placement: 'inside'
            }*/
        });
	}
	
	function getColText(i){
		switch(i){
		case 0:
			return "违纪";
		case 1:
			return "损坏公物";
		case 2:
			return "评优";
		}
	}
	
	function getColStyle(i){
		switch(i){
		case 0:
			return "background-color:red;color:white;";
		case 1:
			return "background-color:green;color:white;";
		case 2:
			return "background-color:blue;color:white;";
		}
	}
	
	function buildResultTable($content){
		var $multicol = $('.multicol',$content);
		var $resultTable = $('.result-table',$content);
		$resultTable.empty();
		
		var $thead = $("<thead><tr><th width='100px'></th></tr><tr><th width='100px'></th></tr></thead>");
		$thead.appendTo($resultTable);
		
		
		if($multicol.length > 0){
			var multipleData = $multicol.select2("data");
			$(multipleData).each(function(){
				$thead.find("tr:eq(0)").append($("<th>"+this.text+"</th>").attr("colspan", "3"));
				var $secondtr = $thead.find("tr:eq(1)");
				for(var  i = 0; i < 3; i++){
					$secondtr.append($("<th width='80px' style='"+getColStyle(i)+"'>"+getColText(i)+"</th>"));
				}
			});
		}else{
			var data = [];
			if($('.floor',$content).is(":visible") && $('.floor',$content).select2("data").length > 0){
				data = $('.floor',$content).select2("data");
			}else if($('.building',$content).is(":visible") && $('.building',$content).select2("data").length > 0){
				data = $('.building',$content).select2("data");
			}
			if(data[0]){
				$thead.find("tr:eq(0)").append($("<th width='50px'>"+data[0].text+"</th>").attr("colspan", "3"));
			}else{
				$thead.find("tr:eq(0)").append($("<th>统计结果</th>").attr("colspan", "3"));
			}
			var $secondtr = $thead.find("tr:eq(1)");
			for(var  i = 0; i < 3; i++){
				$secondtr.append($("<th width='80px' style='"+getColStyle(i)+"'>"+getColText(i)+"</th>"));
			}
			
		}
		
		var $tbody = $("<tbody></tbody>");
		$tbody.appendTo($resultTable);
		$('.y-year:checked',$content).each(function(){
			var $tr = $("<tr>").append($("<td>").text($(this).attr("data-label")));
			$($thead.find("tr:eq(1) th")).each(function(i){
				if(i != 0){
					$tr.append($("<td>"));
				}
			});
			$tbody.append($tr);
		});
		
	}
})();
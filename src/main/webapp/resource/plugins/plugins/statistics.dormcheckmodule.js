;(function(){
	//"use strict"; // jshint ;_;
	
	var chance = new Chance(function() { return Math.random(); });
	
	$.statistics.dormcheckmodule = {
			url : "statistics.dormcheckmodule.html",
			modulehash : '#module=statistics.dormcheckmodule|{}',
			init:init
	};
	
	
	function init(param){

		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			
			$(".result-table",$content).hide();
			
			$content.find(".datepicker").datepicker({
				format:'yyyy-mm-dd'
			}).on('changeDate', function(ev){
				$content.find(".datepicker").datepicker('hide');
			}).datepicker('setValue', new Date());
			
			
			$.mockjax({
				  url: 'test.do',
				  status: 200,
				  responseTime: 750,
				  //proxy: 'testdata/test.json'
				  contentType: 'text/json',
				 // responseText: [[12],[12]],
				  response:function(){
					  var baseArray = new Array();
					  
					  this.responseText = baseArray;
				  }
				});
    		$('.save',$content).click(function(){
    			$(this).button('loading');
    			var $that = $(this);
    			$.ajax( {
        	        "url": "test.do",
        	        "dataType":"json",
        	        "success": function(data){
        	        	$that.button('reset');
        	        	
        	        	buildGraph($content);
        	        	$(".result-table",$content).show();
        	        },
        	        "error":function(data){
        			}
        	      });
    		});
    		
		}
	}
	
	function buildGraph($content){
		
	 var id = $.util.generateRandomString(5);
	 
	 var xTicks = ['全校', '一栋', '二栋', '三栋', '四栋'];
	 var width = xTicks.length * 80;
	  var s1 = [2, 6, 7, 10,12];
	  var s2 = [7, 5, 3, 4,7];
	 $(".check-report", $content).attr("id",id).width(width).empty();
      var  plot1 = $.jqplot(id, [s1, s2], {
    	  title: '考勤表统计信息',
        	animate: !$.jqplot.use_excanvas,
        	stackSeries: true,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels:{show: true},
                rendererOptions: {
                	//barWidth:barWidth,
                	barMargin: 30,
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
            }
        });
      
      xTicks = ['全校', '一栋', '二栋', '三栋', '四栋'];
 	 width = xTicks.length * 80;
 	  s1 = [2, 6, 7, 10,12];
 	  s2 = [7, 5, 3, 4,7];
      id = $.util.generateRandomString(5);
      $(".violate-report", $content).attr("id",id).width(width).empty();
      var  plot1 = $.jqplot(id, [s1, s2], {
    	  title: '违规统计信息',
        	animate: !$.jqplot.use_excanvas,
        	stackSeries: true,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels:{show: true},
                rendererOptions: {
                	//barWidth:barWidth,
                	barMargin: 30,
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
            }
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
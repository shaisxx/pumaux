;(function(){
	//"use strict"; // jshint ;_;
	
	var chance = new Chance(function() { return Math.random(); });
	
	$.statistics.basicmodule = {
			url : "statistics.basicmodule.html",
			modulehash : '#module=statistics.basicmodule|{}',
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
    		buildResultTable($content);
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
    		buildResultTable($content);
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
				  //var rowSum = $('.y-year:checked',$content).length;
				  var rowSum = 1 ;
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
        	        "url": "test.do",
        	        "dataType":"json",
        	        "success": function(data){
        	        	$that.button('reset');
        	        	//填充数据
        	        	var $resultTable = $('.result-table tbody',$content);
        	        	$(data).each(function(i){//tr
        	        		$(this).each(function(j){//td
        	        			var $ttr = $resultTable.find("tr:nth-child("+(i+1)+")");
        	        			$ttr.find("td:nth-child("+(j+1)+")").text(this);
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
        	        	 xTicks.push("");
        	        	 var colors = new Array();
        	        	 for(var p = 0; p < b.length; p ++){
        	        		 var c = chance.color();
        	        		 colors.push(c);
        	        		 var $ttd = $('.result-table thead',$content).find("tr:first th:nth-child("+(p+2)+")").css("background-color",c).css("color","white");
        	        	 }
        	        	 
        	             /*$('.y-year:checked',$content).each(function(){
        	             	xTicks.push($(this).attr("data-label"));
        	     		});*/
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
	//var gWidth = (barWidth+10) * data.length * xTicks.length + 200;
	 var id = $.util.generateRandomString(5);
	 $(".report", $content).attr("id",id).empty();
	 
      var  plot2 = $.jqplot(id, data/*[s1, s2, s3]*/, {
        	animate: !$.jqplot.use_excanvas,
        	seriesColors:colors,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels:{show: true},
                rendererOptions: {
                	//barWidth:barWidth,
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
	
	function buildResultTable($content){
		var $multicol = $('.multicol',$content);
		var $resultTable = $('.result-table',$content);
		$resultTable.empty();
		
		var $thead = $("<thead><tr></tr></thead>");
		$thead.appendTo($resultTable);
		
		
		if($multicol.length > 0){
			var multipleData = $multicol.select2("data");
			$(multipleData).each(function(){
				$thead.find("tr").append($("<th>"+this.text+"</th>"));
			});
		}else{
			var data = [];
			if($('.clazz',$content).is(":visible") && $('.clazz',$content).select2("data").length > 0){
				data = $('.clazz',$content).select2("data");
			}else if($('.grade',$content).is(":visible") && $('.grade',$content).select2("data").length > 0){
				data = $('.grade',$content).select2("data");
			}else if($('.major',$content).is(":visible") && $('.major',$content).select2("data").length > 0){
				data = $('.major',$content).select2("data");
			}
			if(data[0]){
				$thead.find("tr").append($("<th>"+data[0].text+"</th>"));
			}else{
				$thead.find("tr").append($("<th>统计结果</th>"));
			}
			
		}
		
		var $tbody = $("<tbody></tbody>");
		$tbody.appendTo($resultTable);
		var $tr = $("<tr>").append($("<td>").text($(this).attr("data-label")));
		$($thead.find("th")).each(function(i){
			if(i != 0){
				$tr.append($("<td>"));
			}
		});
		$tbody.append($tr);
		
		/*var $tbody = $("<tbody></tbody>");
		$tbody.appendTo($resultTable);
		$('.y-year:checked',$content).each(function(){
			var $tr = $("<tr>").append($("<td>").text($(this).attr("data-label")));
			$($thead.find("th")).each(function(i){
				if(i != 0){
					$tr.append($("<td>"));
				}
			});
			$tbody.append($tr);
		});*/
		
	}
})();

//TODO for future use
/*
 * 
 * function movieFormatResult(movie) {
        var markup = "<table class='movie-result'><tr>";
        if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
            markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
        }
        markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
        if (movie.critics_consensus !== undefined) {
            markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
        }
        else if (movie.synopsis !== undefined) {
            markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
        }
        markup += "</td></tr></table>";
        return markup;
    }

    function movieFormatSelection(movie) {
        return movie.title;
    }
    
    $('.major',$content).select2({
    placeholder: "Search for a movie",
    multiple: true,
    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: "testdata/movies.json",
        data: function (term, page) {
            return {
                q: term, // search term
                page_limit: 10,
                page: page
            };
        },
        results: function (data, page) { // parse the results into the format expected by Select2.
        	 var more = (page * 10) < data.total; // whether or not there are more results available

             return {results: data.movies, more: more};			        
       }
    },
    formatResult: movieFormatResult, 
    formatSelection: movieFormatSelection
});*/

/*$('.major',$content).select2({
		placeholder:"请选择要统计的专业，默认为所有专业",
    	multiple: true,
    	ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
            url: "testdata/test.json",
            dataType: 'jsonp',
            quietMillis: 100,
            data: function (term, page) {
                return {
                    q: term, // search term
                    page_limit: 10,
                    page: page// page number
                };
            },
            results: function (data, page) { // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to alter remote JSON data
            	console.log(data);
            	var more = (page * 10) < data.total; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: data.movies, more: more};
            }
        }
    })*/

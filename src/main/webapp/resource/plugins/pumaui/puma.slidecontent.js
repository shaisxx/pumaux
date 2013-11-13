;(function($){
	
	function showmain(target, opts){
		var activeItem = $(target).next(".slide-item.active");
		activeItem.find("form.parsley-form").parsley( 'destroy' );
		activeItem.css("position","absolute").css("left","0").animate({
	 		   left: "100%"
		 }, {
			complete : function() {
				$(this).removeClass("active").css("position","relative");
			},
			duration : 100
		});
		
	 	$(target).addClass("active").css("position","absolute").css("left","-100%").animate({
	 		   left: "0"
		 },{complete : function() {
				$(this).css("position","relative");
			},
			duration:100
		});
	}
	
	function showsub(target, params){
		var opts = $.data(target, 'slidecontent').options;
		opts = $.extend(opts, params);
		_loadSubitem(target, opts);
	}
	
	function createSlidecontent(target){
		$(target).addClass('slide-item main-item active');
	}
	
	function _loadSubitem(target, opts){
		var $loadingDiv = $('<div class="loading-slide-content" style="position:absolute;background-color:#4CCAF2;color:white;padding-left:10px;height:30px;line-height:30px;right:0px;width:90px;"><img width="16" height="11" alt="加载中。。。" src="../style/shtdUI/themes/img/loader.gif"><span style="padding-left:10px;">加载中...</span></div>');
		var t = $(target).height()/3+"px";
		$loadingDiv.css("top",t);
		$(target).append($loadingDiv);
		$loadingDiv.animate({right: '0px'}, "fast");

		var $subitem = $(target).next('.sub-item');
		if($subitem.length == 0){
			$subitem = $('<div class="slide-item sub-item">').height($(target).outerHeight());
			
			/*var $contentDiv = $('<div class="subitem-content-page" style="padding-left:10px;width:100%;height:100%;">');
			var $backBtnDiv = $('<div class="back-btn" style="width:10px;height:100%;float:left;vertical-align:middle;">').text("a").click(function(){
				showmain(target, opts);
			}).hover(function(){
				$(this).css("width","30px").css("cursor","pointer");
				$contentDiv.css("padding-left","30px");
			},function(){
				$(this).css("width","10px").css("cursor","none");
				$contentDiv.css("padding-left","10px");
			});
			$subitem.append($backBtnDiv).append($contentDiv);*/
			
			$(target).after($subitem);
		}
		
		if(opts.url){
		    //$.loading("正在加载数据...");
			$.ajax( {
		        "dataType": 'html',
		        "type": 'post',
		        "url": opts.url,
		        "data": opts.queryParams,
		        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
		        "success": function(data){
		        	//$.unloading();
		        	$subitem.find(".subitem-content-page").end().html(data).find("form.parsley-form").parsley();
		        	
		        	//var $scrollItem = $('div.scrollable',$subitem).animate({scrollTop: 0}, 300);
		        	
		        	if(opts.callback && typeof opts.callback == 'function'){
		        		opts.callback.call(null, $subitem);
		        	}
		        	
		        	$(target).find("form.parsley-form").parsley( 'destroy' );
		        	
		        	$(target).css("position","absolute").css("left","0").animate({
		        		   left: "-100%"
		        		 }, {complete : function() {
		     					$(this).removeClass("active").css("position","relative");
			     			},
			     			duration:100
			     		});
		        	$(target).next(".sub-item").css("position","absolute").css("left","100%").addClass("active").animate({
		        		   left: "0"
		        		 }, {complete : function() {
		     					$(this).css("position","relative");
			     			},
			     			duration:100
			     		});
		        	
		        	$(".loading-slide-content",$(target)).remove();
		        	
		        	$('div.scrollable',$subitem).animate({scrollTop: 0}, 300).on('scroll',function(e){
						var top = $(this).scrollTop();
				  		if(top > 0){
				  			$(this).css("box-shadow","0 2px 5px rgba(0, 0, 0, 0.176) inset");
				  		}else{
				  			$(this).css("box-shadow","none");
				  		}
				  	});
		        	
		        	var e = jQuery.Event("resize",[{force:true}]);
	        		$(window).trigger(e);
		        	/*setTimeout(function(){
		        		//we need to force the window to resize
		        		var e = jQuery.Event("resize",[{force:true}]);
		        		$(window).trigger(e);
		        	}, 300);*/
		        },
		        "error":function(data){
		        	alert("加载内容失败,请重试！");
		        	//$.unloading();
		        	$(".loading-slide-content").remove();
		        	return;
				}
		      } );
		}
	}
	
	$.fn.slidecontent = function(options, param){
		if (typeof options == 'string'){
			return $.fn.slidecontent.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'slidecontent');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'slidecontent', {
					options: $.extend({}, $.fn.slidecontent.defaults, $.fn.slidecontent.parseOptions(this), options)
				});
			}
			
			createSlidecontent(this);
		});
	};
	
	$.fn.slidecontent.methods = {
		options: function(jq){
			return $.data(jq[0], 'datagrid').options;
		},
		showsub: function(jq,params){
			return jq.each(function(){
				showsub(this, params);
			});
		},
		showmain: function(jq){
			return jq.each(function(){
				showmain(this);
			});
		}
	};
	
	$.fn.slidecontent.parseOptions = function(target){
		//var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.slidecontent.defaults = {
		url:null,/*string id string*/
		queryParams:{},/*object When request remote data, sending additional parameters*/
		content:null,/*string selector*/
		callback:undefined
	};
	
})(jQuery);

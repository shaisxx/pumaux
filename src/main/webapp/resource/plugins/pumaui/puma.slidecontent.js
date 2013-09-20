;(function($){
	
	function showmain(target, opts){
		$(target).parent().find(".slide-item.active").removeClass("active");
		$(target).parent().find(".main-item").addClass("active");
	}
	
	function showsub(target, params){
		if(params && params.url){
			_loadSubitem(target, params);
		}
		$(target).parent().find(".slide-item.active").removeClass("active");
		$(target).parent().find(".sub-item").addClass("active");
		
		
		//var offsettop = $('div.scrollable',$(target).parent().find(".sub-item")).offset().top;
		$('div.scrollable',$(target).parent().find(".sub-item")).animate({scrollTop: 0}, 500);
		
	}
	
	function createSlidecontent(target){
		var opts = $.data(target, 'slidecontent').options;
		
		$(target).addClass('slide-item main-item active');
		
		_loadSubitem(target, opts);
		
		//var $subitem = $('<div class="slide-item sub-item">');
		//$(target).after($subitem);
	}
	
	function _loadSubitem(target, opts){
		//var opts = $.data(target, 'slidecontent').options;
		
		var $subitem = $(target).next('.sub-item');
		if($subitem.length == 0){
			$subitem = $('<div class="slide-item sub-item">').height("calc(100% - 90px)");
			$(target).after($subitem);
		}
		
		if(opts.url){
			$.loading("正在加载数据...");
			$.ajax( {
		        "dataType": 'html',
		        "type": 'post',
		        "url": opts.url,
		        "data": opts.queryParams,
		        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
		        "success": function(data){
		        	$.unloading();
		        	$subitem.html(data);
		        	$('div.scrollable',$subitem).scrollTop();
		        	
		        	if(opts.callback && typeof opts.callback == 'function'){
		        		opts.callback.call(null, $subitem);
		        	}
		        	
					$('div.scrollable',$subitem).on('scroll',function(e){
						var top = $(this).scrollTop();
				  		if(top > 0){
				  			$(this).css("box-shadow","0 2px 5px rgba(0, 0, 0, 0.176) inset");
				  		}else{
				  			$(this).css("box-shadow","none");
				  		}
				  	});
		        },
		        "error":function(data){
		        	alert("加载内容失败,请重试！");
		        	$.unloading();
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

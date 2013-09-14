;(function($){
	
	function showmain(target, opts){
	}
	
	function createSearchinput(target){
		var opts = $.data(target, 'searchinput').options;
		
		$(target).addClass('slide-item main-item active').height("calc(100% - 90px)");
		
	}
	
	$.fn.searchinput = function(options, param){
		if (typeof options == 'string'){
			return $.fn.searchinput.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'searchinput');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'searchinput', {
					options: $.extend({}, $.fn.searchinput.defaults, $.fn.searchinput.parseOptions(this), options)
				});
			}
			
			createSearchinput(this);
		});
	};
	
	$.fn.searchinput.methods = {
		options: function(jq){
			return $.data(jq[0], 'searchinput').options;
		},
		showsub: function(jq){
			return jq.each(function(params){
				showsub(this, params);
			});
		}
	};
	
	$.fn.searchinput.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.searchinput.defaults = {
		url:null,/*string id string*/
		queryParams:{},/*object When request remote data, sending additional parameters*/
		content:null,/*string selector*/
		callback:undefined
	};
	
})(jQuery);

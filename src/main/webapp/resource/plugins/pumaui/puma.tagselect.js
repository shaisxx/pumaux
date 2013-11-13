;(function($){
	
	function createTagselect(target){
		var opts = $.data(target, 'tagselect').options;
		
		opts.name = $(target).attr("name");
		
		if($(target).is("input")){
			//var $ul = $(target).after('<ul class="tagedit-list">');
			$(target).hide().attr("disabled",true);
			var $ul = $('<ul class="tagedit-list">');
			$(target).after($ul);
			
			$ul.append($('<li class="btn btn-primary btn-xs" style="float:left;">')).find("li").append('<b class="icon-search"></b>')
						.click(function(){
								if(typeof opts.selectfun == 'function'){
				    				opts.selectfun.call(target);
				    			}
							});
			
			if(opts.singleSelect){
				$ul.children("li:not(.btn)").remove();
			}
		}
	}
	
	/*<li class="tagedit-listelement tagedit-listelement-old">
	<span dir="ltr">Hazel Grouse</span>
	<input type="hidden" value="Hazel Grouse" name="formdata[tags][3-a]">
	<a	title="Remove from list." class="tagedit-close">x</a>
</li>
*/
	function _addTag(target, param){
		var opts = $.data(target, 'tagselect').options;
		var name = opts.name;
		
		var $ul = $(target).next("ul.tagedit-list");
		
		if(opts.singleSelect){
			$ul.children("li:not(.btn)").remove();
		}
		
		$li = $('<li class="tagedit-listelement tagedit-listelement-old">')
				.append('<span>'+param.text+'</span>')
				.append('<input type="hidden" value="'+param.value+'" name="'+name+'">')
				.append($('<a title="删除" class="tagedit-close">x</a>').click(function(){$(this).parent('li').remove();}));
		$("li.btn",$ul).before($li);
	}
	
	
	$.fn.tagselect = function(options, param){
		if (typeof options == 'string'){
			return $.fn.tagselect.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			//var state = $.data(this, 'tagselect');
			/*if (state){
				$.extend(state.options, options);
			} else {*/
			var o = $.extend($.fn.tagselect.defaults, $.fn.tagselect.parseOptions(this), options);
				$.data(this, 'tagselect', {
					options: o
				});
			/*}*/
			
			createTagselect(this);
		});
	};
	
	$.fn.tagselect.methods = {
		options: function(jq){
			return $.data(jq[0], 'tagselect').options;
		},
		add: function(jq, param){
			return jq.each(function(){
				_addTag(this, param);
			});
		}
	};
	
	$.fn.tagselect.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.tagselect.defaults = {
		selectfun:undefined,
		singleSelect:false
	};
	
})(jQuery);

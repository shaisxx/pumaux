;(function($){
	
	var templateurl = {};
	templateurl['template-search-student-widget'] = "querystudenttemplate.html";
	templateurl['template-search-dormitory-widget'] = "querydormitorytemplate.html";
	
	function createSearchinput(target){
		var opts = $.data(target, 'searchinput').options;
		if($(target).is("input")){
			$(target).addClass("form-control query-input").css("padding-right","30px")
					  .wrap($('<form>').addClass("input-group"))
					  .after('<div class="input-group-btn"><button tabindex="-1"  class="btn btn-success dropdown-toggle" type="submit"><b class="icon-search"></b></button></div>')
					 .after('<div class="dropdown-toggle advanced-search-caret-btn"><b class="caret"></b></div>');
		}
		
		var $form = $(target).parent('form');
		if($form.length > 0){
			$form.on('submit',function(e){
				if (e) e.preventDefault();
				
				if(opts.callback && typeof opts.callback == 'function'){
					var formData = $form.serializeJson();
					if(opts.callback.call($form, formData)){
						if($('.cacel-search',$form).is(":visible")){
							$('.advanced-search-caret-btn',$form).popover('toggle');
						}
					}
				}
			}).on('click','.cacel-search',function(){
				$('.advanced-search-caret-btn',$form).popover('toggle');
			}).on('click','.do-search',function(){
				$form.submit();
			});
		}
		
		var selectPopupContentTemplate = $($.getTemplateById(opts.templateid)).html();
		if(selectPopupContentTemplate == undefined){
			$.ajax( {
		        "dataType": 'html',
		        "type": 'post',
		        "url": templateurl[opts.templateid],
		        "data": opts.templateQeryParams,
		        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
		        "success": function(html){
		        	_initPopupSearch(target, html, opts);
		        	$.addTemplate(opts.templateid, html);
		        },
		        "error":function(data){
		        	alert("加载查询页面失败,请刷新后重试！");
		        	return;
				}
		      } );
		}else{
			_initPopupSearch(target, selectPopupContentTemplate, opts);
		}
		
	}
	
	function _initPopupSearch(target, templateContent, opts){
		$form = $(target).parent('form');
		if($form.length == 0){
			return;
		}
		var options = {
				html:true,
				placement:opts.placement,
				content:templateContent,
				template:_getSelectPopupTemplate(),
				container: $form
		};
		$('.advanced-search-caret-btn',$(target).parent('form')).popover(options)
																.on('shown.bs.popover', function (e) {
																	console.log($('.selectpicker',$(target).parent('form')));
																		$('.selectpicker',$(target).parent('form')).selectpicker();
																		$('input.query-input',$(target).parent('form')).addClass("disabled").attr("disabled",true);
																	})
																.on('hide.bs.popover', function (e) {
																		//$('.selectpicker',$(target).parent('form')).selectpicker("destroy");
																		$('input.query-input',$(target).parent('form')).removeClass("disabled").attr("disabled",false);
																	});
	}
	
	function _getSelectPopupTemplate(){
		return '<div class="popover">'
			+	'<div class="arrow"></div><h3 class="popover-title"></h3>'
			+	'<div class="popover-content"></div>'
			+	'<div class="modal-footer">'
			+		'<button type="button" class="btn btn-primary do-search">查&nbsp;&nbsp;询</button>'
			+		'<button type="button"class="btn cacel-search">取&nbsp;&nbsp;消</button>'
			+	'</div>'
			+ '</div>';
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
		}
	};
	
	$.fn.searchinput.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.searchinput.defaults = {
		templateid:'template-search-student-widget',/*string 'template-search-student-widget' | 'template-search-dormitory-widget' */
		//templateurl:null,/*string will get template from server and store it*/
		templateQeryParams:{},/*object When request remote data, sending additional parameters*/
		callback:undefined,
		placement:'bottom' /*"bottom | bottom-right"*/
		//actionurl:null
		//container:false /*string | false Appends the popover to a specific element container: 'body'*/
	};
	
})(jQuery);

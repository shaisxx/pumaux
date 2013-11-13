;(function($){
	
	function createSearchinput(target){
		var opts = $.data(target, 'searchinput').options;
		var $wrapper = $('<form>').addClass("input-group");
		if($(target).is("input")){
			$(target)//.attr("placeholder",opts.placeholder)
					  .addClass("form-control query-input").css("float","left")
					  .wrap($wrapper)
					  .after('<div class="input-group-btn"><button style="float:left;" tabindex="-1"  class="btn btn-success dropdown-toggle" type="submit"><b class="icon-search"></b></button></div>');
			if(opts.advancedSearch == true){
				$(target).css("padding-right","30px").after('<div class="dropdown-toggle advanced-search-caret-btn"><b class="caret"></b></div>');
			}
		}
		
		var $form = $(target).parent('form');
		if($form.length > 0){
			$form.on('submit',function(e){
				if (e) e.preventDefault();
				//避免非高级查询状态下，用户进行空查询
        		if(!$('input.query-input',$(target).parent('form')).hasClass("disabled") && $(target).val().length == 0){
        			alert("请输入查询关键字！");
        			return;
        		}
        		
				var formData = $form.serializeJson();
				formData = $.extend({}, formData, opts.actiondata);
				var labelArray = $form.formToLabelArray();
				
				var url = opts.actionurl;
				if(!url){
					alert("您没有指定查询地址，请确认已设置actionurl属性");
					return;
				}
				
				$.ajax( {
			        "dataType": 'json',
			        "type": 'post',
			        "url": url,
			        "data": formData,
			        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
			        "success": function(data){
			        	if(opts.success && typeof opts.success == 'function'){
							if(opts.success.call(null, data, labelArray)){
								if(opts.advancedSearch == true){
									if($('.cacel-search',$form).is(":visible")){
										$('input.query-input',$form).val("");
										$('.advanced-search-caret-btn',$form).popover('toggle');
									}
								}
							}
						}
			        },
			        "error":function(data){
			        	if(opts.error && typeof opts.error == 'function'){
			        		opts.error.call(null,data);
							if(opts.advancedSearch == true){
								if($('.cacel-search',$form).is(":visible")){
									$('.advanced-search-caret-btn',$form).popover('toggle');
								}
							}
						}
					}
			      });
				
			}).on('click','.cacel-search',function(){
				if(opts.advancedSearch == true){
					$('.advanced-search-caret-btn',$form).popover('toggle');
				}
			}).on('click','.do-search',function(){
				$form.submit();
			});
		}
		
		if(opts.advancedSearch == true){
			var templateUrl = opts.advancedSearchConfig.templateUrl;
			if(templateUrl){
				var selectPopupContentTemplate = $($.getTemplateById(templateUrl)).html();
				if(selectPopupContentTemplate == undefined){
					$.ajax( {
				        "dataType": 'html',
				        "type": 'post',
				        "url": templateUrl,
				        "data": opts.advancedSearchConfig.templateInitData,
				        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
				        "success": function(html){
				        	$.addTemplate(templateUrl, html);
				        	_initPopupSearch(target, html, opts);
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
		}
	}
	
	function _initPopupSearch(target, templateContent, opts){
		var $form = $(target).parent('form');
		if($form.length == 0){
			return;
		}
		var options = {
				html:true,
				placement:opts.advancedSearchConfig.placement,
				content:templateContent,
				template:_getSelectPopupTemplate(),
				container: $form
		};
		$('.advanced-search-caret-btn',$form).popover(options)
																.on('shown.bs.popover', function (e) {
																		$('input.query-input',$form).addClass("disabled").attr("disabled",true);
																		
																		if(opts.advancedSearchConfig.showCallback && typeof opts.advancedSearchConfig.showCallback == 'function'){
																			var formData = $form.serializeJson();
																			opts.advancedSearchConfig.showCallback.call(null,$form);
																		}
																	})
																.on('hide.bs.popover', function (e) {
																		$('input.query-input',$form).removeClass("disabled").attr("disabled",false);
																		if(opts.advancedSearchConfig.hideCallback && typeof opts.advancedSearchConfig.hideCallback == 'function'){
																			var formData = $form.serializeJson();
																			opts.advancedSearchConfig.hideCallback.call(null,$form);
																		}
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
	
	/**
	 * advancedSearchConfig:
	 * {
	 * 		templateUrl:null,
	 * 		templateInitData:{},
	 * 		showCallback:function($container){},
	 * 		hideCallback:function($container){},
	 * 		placement:'bottom' /"bottom | bottom-right"/}
	 * 
	 * */
	$.fn.searchinput.defaults = {
		actionurl:null,/**查询表单要提交到的url**/
		actiondata:null,
		placeholder:'请输入关键字',
		label:'关键字',
		advancedSearch:false,/*是否支持高级查询*/
		advancedSearchConfig:null,//见上面注释
		success:function(data){},
		error:function(data){}
	};
	
})(jQuery);

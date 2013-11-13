;(function($){
	/**
	 * @param  page string or number
	 * 
	 * 'prev', 'next', 3
	 * */
	function gotoPage(target, page){
		var pn = $.data(target, 'datagrid').options.pageNumber;
		
		if(typeof page == 'string'){
			if(page == 'prev'){
				$.data(target, 'datagrid').options.pageNumber = pn - 1;
			}
			if(page == 'next'){
				$.data(target, 'datagrid').options.pageNumber = pn + 1;
			}
		}else if(typeof page == 'number'){
			if(page > 0){
				$.data(target, 'datagrid').options.pageNumber = page;
			}else{
				alert("invalid page number!");
			}
		}
		
		reload(target);
	}
	
	function _checkNavButtonStatus(target, total){
		var opts = $.data(target, 'datagrid').options;
		var pageSize = opts.pageSize;
		var pageNumber = opts.pageNumber;
		var hasNext = false;
		var hasPrev = false;
		
		var tPageNumber  = Math.floor(total/pageSize);
		if(total%pageSize != 0){
			tPageNumber += 1;
		}
		
		//var tPageNumber  = Math.floor(total/pageSize) + 1;
		
		_updateRecordSize(target, total, tPageNumber, pageNumber);
		
		if(pageNumber == 1){
			hasPrev = false;
		}else{
			hasPrev = true;
		}
		hasNext = pageNumber >= tPageNumber ? false : true;
		
		if(!hasNext){
			$(target).find(".puma-datagrid-paginator-next").addClass("disabled").css("cursor","text");
		}else{
			$(target).find(".puma-datagrid-paginator-next").removeClass("disabled").css("cursor","pointer");
		}
		if(!hasPrev){
			$(target).find(".puma-datagrid-paginator-prev").addClass("disabled").css("cursor","text");
		}else{
			$(target).find(".puma-datagrid-paginator-prev").removeClass("disabled").css("cursor","pointer");
		}
	}
	
	function _updateRecordSize(target, total, allPageSize, currentPageNumber){
		
		$(target).find(".record-size-text > span.record-size").text(total);
		
		$(target).find(".current-page-dropdown")
		$(target).find(".current-page-dropdown .current-page-dropdown-button > span.current-page-text").text(currentPageNumber + "/"+allPageSize);
		
		var $ulDropdown = $(target).find(".current-page-dropdown .dropdown-menu");
		
		$ulDropdown.empty();
		for(var i = 1; i <= allPageSize; i ++){
			$("<li>").append($("<a data-currentpage='"+i+"'>").text(i+"/"+allPageSize)).appendTo($ulDropdown).end()
			.click(function(){gotoPage(target,Number($(this).find("a").attr("data-currentpage")))});
		}
		
	}
	
	function _nextHandler(target){
		var $next = $(target).find(".puma-datagrid-paginator-next");
		if($next && !$next.hasClass("disabled")){
			$next.addClass("disabled").css("cursor","pointer");
			gotoPage(target,"next");
		}
	}
	
	function _prevHandler(target){
		var $prev = $(target).find(".puma-datagrid-paginator-prev");
		if($prev && !$prev.hasClass("disabled")){
			$prev.addClass("disabled").css("cursor","text");
			gotoPage(target,"prev");
		}
	}
	
	function reload(target, param){
		_load(target, param, true);
	}
	
	function load(target, param){
		_load(target, param, false);
	}
	
	function _getPaginationParams(target, opts,isReload){
		var paginationParams = {
				pageNumber:isReload?opts.pageNumber:$.data(target, 'datagrid').options.pageNumber=1,
				pageSize:opts.pageSize
		};
		if(opts.sortName != null){
			paginationParams.sortName = opts.sortName;
			paginationParams.sortOrder = opts.sortOrder;
		}
		
		return paginationParams;
	}
	
	function _loadData(target, data){
		
		$.data(target, 'datagrid').options.pageNumber=1;
		
		var opts = $.data(target, 'datagrid').options;
		
		_createTableContent(opts, target, data);
		
	}
	
	
	function _load(target, param, isReload){
		var opts = $.data(target, 'datagrid').options;
		var queryParams = opts.queryParams;
		
		var paginationParams = _getPaginationParams(target, opts,isReload);
		
		if(opts.pagination){
			queryParams = $.extend({}, opts.queryParams, paginationParams);
		}
		
		if(param){
			queryParams = $.extend({}, queryParams, param);
		}
		
		var filterData = _getGridFilterData(target);
		queryParams = $.extend({}, queryParams, filterData);
		
		$.loading(opts.loadMsg);
		$.ajax( {
	        "dataType": 'JSON',
	        "type": opts.method,
	        "url": opts.url,
	        "data": queryParams,
	        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
	        "success": function(data){
	        	_createTableContent(opts, target, data);
	        	if(opts.fitparent){
	        		fitparent(target);
	        	}else if(opts.resizable){
	        		resize(target);
	        	}
	        	/*setTimeout(function(){
	        		if(opts.fitparent){
		        		fitparent(target);
		        	}else if(opts.resizable){
		        		resize(target);
		        	}
	        	},200);*/
	        	$.unloading();
	        },
	        "error":function(data){
	        	console.log(data);
	        	alert("加载表格数据失败,请重试！");
	        	$.unloading();
	        	return;
			}
	      } );
	}
	
	function _createTableContent(opts,target, data){
		var total = data.total;
    	if(opts.pagination){
    		//enable/disable prev/next button
    		_checkNavButtonStatus(target, total);
    	}
    	
		$('div.scrollable',$(target)).animate({scrollTop: 0}, 300);
		
		var opts = $.data(target, 'datagrid').options;
		var $table = $(target).find('table.dynamic-table');
		
		if(opts.columns){
			//create table header
			var $tr = $table.html("<thead><tr></tr></thead>").find("tr");
			
			var a = 0;
			$(opts.columns).each(function(){
				var $th = $("<th>").text(this.title).appendTo($tr);
				var b = a++;
				if(opts.columns[b]['width']){
					$th.attr("width", opts.columns[b]['width']);
				}
				
			});
			
			if(opts.rownumbers){
				$tr.prepend('<th width="30px">#</th>');
			}
			
			
			if(opts.checkbox){
				if(opts.singleSelect){
					//singleSelect
					$('<th width="30px"></th>').prependTo($tr);
				}else{
					//multiple select
					$('<th width="30px"><input type="checkbox" class="check-all"/></th>').find("input[type='checkbox']").change(function(){
						
						if($(this).is(":checked")){
							$(".check-item",$table).each(function(){
								this.checked = true;
							});
						}else{
							$(".check-item",$table).removeAttr("checked");
						}
					}).end().prependTo($tr);
				}
			}
			
			if(opts.orderable){
				$('<th width="2px;" style="padding:0px;"></th>').prependTo($tr);
			}
			//createTbody
			var $tbody = $("<tbody>").appendTo($table);
			
			var rows = data.rows;
			var index = 0;
			
			if($(rows).length == 0){
				$tr = $("<tr><td colspan='"+$tr.find("th").length+"'>无记录</td></tr>").appendTo($tbody);
				$(target).find('.puma-datagrid-detail-panel').fadeIn(200);
				return;
			}
	    	$(rows).each(function(){
	    		index++;
	    		$tr = $("<tr class='draggable'>").data("data",this).appendTo($tbody);
	    		if(opts.rownumbers){
					$tr.prepend('<td>'+index+'</td>');
				}
	    		
	    		
				if(opts.checkbox){
					if(opts.singleSelect){
						$tr.prepend('<td><input type="radio" class="radio-item" name="radio-item"/></td>');
					}else{
						$tr.prepend('<td><input type="checkbox" class="check-item" name="check-item"/></td>');
					}
					
				}
				
				if(opts.orderable){
					$tr.prepend('<td class="orderable" style="padding:10px 0px 10px 5px;"><span class="dragitem">&nbsp;&nbsp;</span></td>');/*<i class="icon-sort-by-order"></i>*/
					$tbody.sortable({
						handle: ".orderable",
						cursor: "move",
						helper: "clone",
						start: function( event, ui ) {
							//console.log($(ui.item).index());
						},
						stop: function( event, ui ) {
							//$tbody.index($(ui.item));
						}
					});
					/*$tbody.find('.draggable').draggable({
						//connectToSortable: $tbody,
						//helper: "clone",
						revert: "invalid"
					});*/
				}
				
				
				
	    		for(var i = 0; i < opts.columns.length; i++){
	    			if(typeof opts.columns[i]['formatter'] == 'function'){
	    				var str = opts.columns[i]['formatter'].call(null, this[opts.columns[i]['field']], this, index);
	    				$("<td>").html(str).appendTo($tr);
	    			}else{
	    				$("<td>").html(this[opts.columns[i]['field']]).appendTo($tr);
	    			}
	    		}
	    	});
	    	if(opts.orderable){
				$tbody.find(".orderable").dblclick(function(){
					$(this).parent("tr").find("input.check-item, input.radio-item").attr("checked",true);
					var specifyConfiguration = {
							toolbar:null,/*string html*/
							orderable:false,/*enable drag to order support*/
							checkbox:true,/*boolean show checkbox in the first column or not*/
							nowrap:true,/*boolean True to display data in one line. Set to true can improve loading performance. */
							loadMsg: '正在获取数据 …',/*string When loading data from remote site, show a prompt message.*/
							pagination:true,/*boolean True to show a pagination toolbar on datagrid bottom.*/
							singleSelect:true,/*boolean True to select just one. False to enable multiple select.*/
							showBottomPagination:false,/*boolean will take effect if pagination is true. True to show a pagination toolbar on datagrid bottom. False not show it*/
							rownumbers:true,/*boolean True to show a row number column.*/
							showSearch:false
							
					};
					var configuration = $.extend({}, opts, specifyConfiguration);
					var $ordergrid = $(_getOrderGridTemplate()).appendTo("body").modal().find(".order-datagrid").datagrid(configuration).end();
					$ordergrid.find(".save").click(function(){
						var selVal = $ordergrid.datagrid("getChecked");
						if(selVal.length == 0){
							alert("请选择排序项目！");
						}else{
							//console.log(selVal);
						}
					});
					$(window).trigger('resize.modal');
				});
			}
		}
		$(target).find('.puma-datagrid-detail-panel').fadeIn(200);
	}
	
	function _getOrderGridTemplate(){
		return  '<div data-backdrop="static" data-focus-on="input:first" class="modal fade">'
				+'<div class="modal-header">'
				+	'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
				+	'<h4>选择排序</h4>'
				+'</div>'
				+'<div class="modal-body">'
				+	  '<div class="order-datagrid" style="position:relative;height:300px;"></div>'
				+'</div>'
				+'<div class="modal-footer">'
				+	'<button type="button" class="btn btn-primary save">确&nbsp;&nbsp;定</button>'
				+	'<button type="button" data-dismiss="modal" class="btn">取&nbsp;&nbsp;消</button>'
				+'</div>'
				+'</div>';
	}
	
	function _getGridFilterData(target){
		return $(".datagrid-conditionpanel > form.child-container",$(target)).serializeJson();
	}
	
	
	function createDatagrid(target){
		var opts = $.data(target, 'datagrid').options;
		$(target).empty();
		
		$(target).addClass('puma-datagrid');
		var $toolbarContainer = $('<div class="puma-datagrid-toolbar"></div>');
		var $customToolbarContainer = $('<div class="puma-datagrid-custom-toolbar">').html(opts.toolbar).appendTo($toolbarContainer);
		var $topNavigator = $('<div class="puma-datagrid-toppaginator">').appendTo($toolbarContainer);
		
		$toolbarContainer.appendTo($(target));
		
		var $conditionPanel = $('<div class="alert-warning datagrid-conditionpanel"><form class="child-container"></form></div>').appendTo($(target)).height(0);
		//var height = $(target).height()-$conditionPanel.outerHeight()-$toolbarContainer.outerHeight();
		var $detailContainer = $('<div class="puma-datagrid-detail-panel scrollable">').hide().appendTo($(target))
								.scroll(function(e){
									var top = $(this).scrollTop();
							  		if(top > 0){
							  			$(this).css("box-shadow","0 2px 5px rgba(0, 0, 0, 0.176) inset");
							  			//conditionPanel.height(0);
							  		}else{
							  			$(this).css("box-shadow","none");
							  			//conditionPanel.height(conditionPanel.find(".child-container").height());
							  		}
							  	});
		if (opts.resizable){
			$(window).resize(function() {
				if($(target).is(":visible")){
					resize(target);
				}
		  	});
		}
		
		var $table = $('<table class="table table-hover dynamic-table">').appendTo($detailContainer);
		
		if (opts.pagination){
			if(opts.showSearch){
				if(opts.showSearchConfig.standalone){
					var $wrapper = $("<div style='padding:0px 10px;'>");
					$wrapper.insertBefore($(target));
				}else{
					var $wrapper = $("<div style='float:left;padding:0px 10px;'>").css("width",opts.showSearchConfig.width);
					$wrapper.appendTo($topNavigator);
				}
				
				var $searchInput = $('<input type="text" class="simplesearchinput" name="searchkey" data-label="'+opts.showSearchConfig.label+'">').appendTo($wrapper);
				$searchInput.searchinput({
						placeholder:opts.showSearchConfig.placeholder,
						actionurl:opts.url,
						//actionurl:'testdata/group-lists.json', //for debug use
						actiondata: _getPaginationParams(target, opts,true),
						advancedSearch:opts.showSearchConfig.advancedSearch,
						advancedSearchConfig:opts.showSearchConfig.advancedSearchConfig,
						success:function(data,labelArray){
							_loadData(target, data);
							
							var $childContainer = $conditionPanel.find(".child-container");
							$childContainer.empty().html(
									$("<span class='btn btn-danger btn-sm clear-all-filter' style='margin-right:5px;border-radius:0px;'>当前查询条件：<b class='icon-remove' style='padding-left:5px;'></b></span>")
									.click(function(){
										$childContainer.empty();
										//$conditionPanel.height(0);
										$conditionPanel.animate({ 
										    height: 0
										  }, {complete:function(){resize(target);}, duration:200} );
										
										load(target);
									})
							);
							$(labelArray).each(function(){
								var $filterItem = $('<span class="btn btn-warning btn-xs filteritem" style="margin:5px;"></span>').text(this.label+"："+this.labelValue)
													.append('<b class="icon-remove" style="padding-left:5px;"></b>')
													.append($('<input type="hidden" name="'+this.name+'" value="'+this.value+'">'))
													.click(function(){
														$(this).remove();
														if($conditionPanel.find(".filteritem").length == 0){
															//$conditionPanel.height(0);
															$conditionPanel.animate({ 
															    height: 0
															  }, {complete:function(){resize(target);}, duration:200} );
															
															
															//var height = $(target).height()-$conditionPanel.outerHeight()-$toolbarContainer.outerHeight();
															//$detailContainer.css('height',height);
														}
														load(target);
													});
								$childContainer.append($filterItem);
							});
								
							$(target).css("overflow","hidden");
							$conditionPanel.animate({ 
								    height: $conditionPanel.find(".child-container").outerHeight()
								  }, {complete:function(){$(target).css("overflow","auto");resize(target);}, duration:200} );

							
							//setTimeout(function(){resize(target);},1000);
							
							//var height = $(target).height()-$conditionPanel.outerHeight()-$toolbarContainer.outerHeight();
							//$detailContainer.css('height',height);
							return true;
						},
						error:function(data){
							console.log(data);
							alert("查询错误!");
						}
					
					});
			}
			var $currentPageText = $('<div class="record-size-text">共<span class="record-size">0</span>条记录</div>').appendTo($topNavigator);
			var $pageSelector = $('<div class="btn-group current-page-dropdown" style="float:left;">')
							.append('<button type="button" class="btn btn-default btn-noboder dropdown-toggle current-page-dropdown-button" data-toggle="dropdown"><span class="current-page-text">0/0</span><span class="caret"></span></button>')
							.append('<ul class="dropdown-menu pull-right"></ul>')
							.appendTo($topNavigator);
			
			var $navSectionTemplate = $('<section class="gallery">'
									+	'<ul style="text-align:center;">'
									+		'<li><a class="button button-circle button-flat xs puma-datagrid-paginator-prev" style="cursor:pointer;"><i class="icon-arrow-left"></i></a></li>'
									+		'<li><a class="button button-circle button-flat xs puma-datagrid-paginator-next" style="cursor:pointer;"><i class="icon-arrow-right"></i></a></li>'
									+	'</ul>'
									+	'</section>');
			$navSectionTemplate.find('.puma-datagrid-paginator-prev').click(function(){_prevHandler(target);});
			$navSectionTemplate.find('.puma-datagrid-paginator-next').click(function(){_nextHandler(target);});
			
			var $navSectionTop = $navSectionTemplate.clone(true).addClass("puma-datagrid-topnav").appendTo($topNavigator);
			if(opts.showBottomPagination){
				var $navSectionBottom = $navSectionTemplate.clone(true).addClass("puma-datagrid-bottomnav").appendTo($detailContainer);
			}
		} 
		
		if (opts.url){
			reload(target);
		}
	}
	
	function getChecked(target){
		var i = 0;
		var rows = new Array();
		$("input:checked:not('.check-all')",$(target)).each(function(){
			i++;
			rows.push($(this).closest("tr").data("data"));
		});
		return rows;
	}
	
	function resize(target){
		var $toolbarContainer = $('div.puma-datagrid-toolbar', $(target));
		var $conditionPanel = $('div.datagrid-conditionpanel',$(target));
		var height = $(target).outerHeight(true);
		height = height -$conditionPanel.outerHeight(true)-$toolbarContainer.outerHeight(true);
		$('div.puma-datagrid-detail-panel',$(target)).css('height',height);
	}
	
	function fitparent(target){
		var $toolbarContainer = $('div.puma-datagrid-toolbar', $(target));
		var $conditionPanel = $('div.datagrid-conditionpanel',$(target));
		var height = $(target).parent().outerHeight(true);
		height = height -$conditionPanel.outerHeight(true)-$toolbarContainer.outerHeight(true);
		$('div.puma-datagrid-detail-panel',$(target)).css('height',height);
	}
	
	$.fn.datagrid = function(options, param){
		if (typeof options == 'string'){
			return $.fn.datagrid.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			/*var state = $.data(this, 'datagrid');
			if (state){
				state.options = $.extend(true, {}, state.options, options);
			} else {*/
				$.data(this, 'datagrid', {
					options: $.extend(true, {}, $.fn.datagrid.defaults, $.fn.datagrid.parseOptions(this), options)
				});
			/*}*/
			
			createDatagrid(this);
		});
	};
	
	$.fn.datagrid.methods = {
		options: function(jq){
			return $.data(jq[0], 'datagrid').options;
		},
		reload: function(jq, param){
			return jq.each(function(){
				reload(this, param);
			});
		},
		load: function(jq, param){
			return jq.each(function(){
				load(this, param);
			});
		},
		getChecked: function(jq){
			return getChecked(jq);
		},
		resize: function(jq){
			return jq.each(function(){
				resize(this);
			});
		},
		fitparent: function(jq){
			return jq.each(function(){
				fitparent(this);
			});
		}
	};
	
	$.fn.datagrid.parseOptions = function(target){
		//var t = $(target);
		return $.extend(true, {}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.datagrid.defaults = {
		resizable:true,
		toolbar:null,/*string html*/
		orderable:false,/*enable drag to order support*/
		method:"post",/*string post or get*/
		fitparent:false,
		checkbox:true,/*boolean show checkbox in the first column or not*/
		nowrap:true,/*boolean True to display data in one line. Set to true can improve loading performance. */
		url: null,/*string A URL to request data from remote site.*/
		loadMsg: '正在获取数据 …',/*string When loading data from remote site, show a prompt message.*/
		pagination:true,/*boolean True to show a pagination toolbar on datagrid bottom.*/
		singleSelect:false,/*boolean True to select just one. False to enable multiple select.*/
		showBottomPagination:false,/*boolean will take effect if pagination is true. True to show a pagination toolbar on datagrid bottom. False not show it*/
		rownumbers:true,/*boolean True to show a row number column.*/
		pageNumber:1,/*number When set pagination property, initialize the page number.*/
		pageSize:10,/*number When set pagination property, initialize the page size.*/
		pageList:[10,20,30,40,50],/*array When set pagination property, initialize the page size selecting list.*/
		queryParams:{},/*object When request remote data, sending additional parameters*/
		sortName:null,/*string Defines which column can be sorted.*/
		sortOrder:'asc',/*string Defines the column sort order, can only be 'asc' or 'desc'.*/
		columns:undefined,/*array The datagrid columns config object, see column properties for more details.*/
		showSearch:false,
		showSearchConfig:{
			standalone:false,/*是否在表格顶部显示*/
			advancedSearch:false,/*是否支持高级查询*/
			advancedSearchConfig:null,//见searchinput空间的注释
			label:"关键字2",
			width:$.ismsie?"200px":"250px",/*输入框宽度**/
			actionurl:null,/**查询表单要提交到的url**/
			success:function(data){},
			error:function(data){},
			placeholder:"请输入关键字"
		}
	};
	
})(jQuery);

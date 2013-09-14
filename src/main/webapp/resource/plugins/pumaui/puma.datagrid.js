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
			$(target).find(".puma-datagrid-paginator-next").addClass("disabled");
		}else{
			$(target).find(".puma-datagrid-paginator-next").removeClass("disabled");
		}
		if(!hasPrev){
			$(target).find(".puma-datagrid-paginator-prev").addClass("disabled");
		}else{
			$(target).find(".puma-datagrid-paginator-prev").removeClass("disabled");
		}
	}
	
	function _updateRecordSize(target, total, allPageSize, currentPageNumber){
		
		$(target).find(".record-size-text > span.record-size").text(total);
		
		$(target).find(".current-page-dropdown")
		$(target).find(".current-page-dropdown .current-page-dropdown-button > span.current-page-text").text(currentPageNumber + "/"+allPageSize);
		
		var $ulDropdown = $(target).find(".current-page-dropdown .dropdown-menu");
		
		$ulDropdown.empty();
		for(var i = 1; i <= allPageSize; i ++){
			$("<li>").append($("<a href='javascript:void(0)' data-currentpage='"+i+"'>").text(i+"/"+allPageSize)).appendTo($ulDropdown).end()
			.click(function(){gotoPage(target,Number($(this).find("a").attr("data-currentpage")))});
		}
		
	}
	
	function _nextHandler(target){
		if(!$(target).find(".puma-datagrid-paginator-next").hasClass("disabled")){
			$(target).find(".puma-datagrid-paginator-next").addClass("disabled")
			gotoPage(target,"next");
		}
	}
	
	function _prevHandler(target){
		if(!$(target).find(".puma-datagrid-paginator-prev").hasClass("disabled")){
			$(target).find(".puma-datagrid-paginator-prev").addClass("disabled");
			gotoPage(target,"prev");
		}
	}
	
	function reload(target, param){
		_load(target, param, true);
	}
	
	function load(target, param){
		_load(target, param, false);
	}
	
	
	function _load(target, param, isReload){
		var opts = $.data(target, 'datagrid').options;
		var queryParams = opts.queryParams;
		
		var paginationParams = {
				pageNumber:isReload?opts.pageNumber:$.data(target, 'datagrid').options.pageNumber=1,
				pageSize:opts.pageSize
		};
		if(opts.soutName != null){
			paginationParams.sortName = opts.soutName;
			paginationParams.sortOrder = opts.sortOrder;
		}
		
		if(opts.pagination){
			queryParams = $.extend({}, opts.queryParams, paginationParams);
		}
		
		if(param){
			queryParams = $.extend({}, queryParams, param);
		}
		
		$.loading(opts.loadMsg);
		$.ajax( {
	        "dataType": 'JSON',
	        "type": opts.method,
	        "url": opts.url,
	        "data": queryParams,
	        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
	        "success": function(data){
	        	var total = data.total;
	        	if(opts.pagination){
	        		//enable/disable prev/next button
	        		_checkNavButtonStatus(target, total);
	        	}
	        	
	        	_createTableContent(target, data);
	        	
	        	$.unloading();
	        },
	        "error":function(data){
	        	alert("加载表格数据失败,请手动刷新后重试！");
	        	$.unloading();
	        	return;
			}
	      } );
	}
	
	function _createTableContent(target, data){
		var opts = $.data(target, 'datagrid').options;
		var $table = $(target).find('table');
		
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
				$tr.prepend('<th width="30px;">#</th>');
			}
			
			if(opts.checkbox){
				if(opts.singleSelect){
					//singleSelect
					$('<th width="30px;"></th>').prependTo($tr);
				}else{
					//multiple select
					$('<th width="30px;"><input type="checkbox" class="check-all"/></th>').find("input[type='checkbox']").change(function(){
						
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
			//createTbody
			var $tbody = $("<tbody>").appendTo($table);
			
			var rows = data.rows;
			var index = 0;
	    	$(rows).each(function(){
	    		index++;
	    		$tr = $("<tr>").data("data",this).appendTo($tbody);
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
	    		for(var i = 0; i < opts.columns.length; i++){
	    			if(typeof opts.columns[i]['formatter'] == 'function'){
	    				var str = opts.columns[i]['formatter'].call(null, this[opts.columns[i]['field']], this, index);
	    				$("<td>").html(str).appendTo($tr);
	    			}else{
	    				$("<td>").html(this[opts.columns[i]['field']]).appendTo($tr);
	    			}
	    		}
	    	});
		}
	}
	
	function createDatagrid(target){
		var opts = $.data(target, 'datagrid').options;
		$(target).empty();
		
		$(target).addClass('puma-datagrid');
		var $toolbarContainer = $('<div class="puma-datagrid-toolbar">').appendTo($(target));
		var $customToolbarContainer = $('<div class="puma-datagrid-custom-toolbar">').html(opts.toolbar).appendTo($toolbarContainer);
		var $topNavigator = $('<div class="puma-datagrid-toppaginator">').appendTo($toolbarContainer);
		
		var $detailContainer = $('<div class="puma-datagrid-detail-panel">').appendTo($(target))
								.scroll(function(e){
									var top = $(this).scrollTop();
							  		if(top > 0){
							  			$(this).css("box-shadow","0 2px 5px rgba(0, 0, 0, 0.176) inset");
							  		}else{
							  			$(this).css("box-shadow","none");
							  		}
							  	});
		var $table = $('<table class="table table-hover">').html("正在加载...").appendTo($detailContainer);
		
		if (opts.pagination){
			var $currentPageText = $('<div class="record-size-text">共<span class="record-size">0</span>条记录</div>').appendTo($topNavigator);
			var $pageSelector = $('<div class="btn-group current-page-dropdown" style="float:left;">')
							.append('<button type="button" class="btn btn-default btn-noboder dropdown-toggle current-page-dropdown-button" data-toggle="dropdown"><span class="current-page-text">?/?</span><span class="caret"></span></button>')
							.append('<ul class="dropdown-menu pull-right"></ul>')
							.appendTo($topNavigator);
			
			var $navSectionTemplate = $('<section class="gallery">'
									+	'<ul style="text-align:center;">'
									+		'<li><a class="button button-circle button-flat xs puma-datagrid-paginator-prev" href="javascript:void(0);"><i class="icon-arrow-left"></i></a></li>'
									+		'<li><a class="button button-circle button-flat xs puma-datagrid-paginator-next"  href="javascript:void(0);"><i class="icon-arrow-right"></i></a></li>'
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
	
	function setDisabled(target, disabled){
		
	}
	
	$.fn.datagrid = function(options, param){
		if (typeof options == 'string'){
			return $.fn.datagrid.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'datagrid');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'datagrid', {
					options: $.extend({}, $.fn.datagrid.defaults, $.fn.datagrid.parseOptions(this), options)
				});
			}
			
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
		}
	};
	
	$.fn.datagrid.parseOptions = function(target){
		//var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, []), {});
	};
	
	$.fn.datagrid.defaults = {
		idField:null,/*string id string*/
		toolbar:null,/*string html*/
		/*style:null,string style css*/
		method:"post",/*string post or get*/
		checkbox:true,/*boolean show checkbox in the first column or not*/
		nowrap:true,/*boolean True to display data in one line. Set to true can improve loading performance. */
		idField:null,/*Indicate which field is an identity field.*/
		url: null,/*string A URL to request data from remote site.*/
		loadMsg: '正在获取数据 …',/*string When loading data from remote site, show a prompt message.*/
		pagination:true,/*boolean True to show a pagination toolbar on datagrid bottom.*/
		singleSelect:false,/*boolean True to select just one. False to enable multiple select.*/
		showBottomPagination:true,/*boolean will take effect if pagination is true. True to show a pagination toolbar on datagrid bottom. False not show it*/
		rownumbers:true,/*boolean True to show a row number column.*/
		pageNumber:1,/*number When set pagination property, initialize the page number.*/
		pageSize:10,/*number When set pagination property, initialize the page size.*/
		pageList:[10,20,30,40,50],/*array When set pagination property, initialize the page size selecting list.*/
		queryParams:{},/*object When request remote data, sending additional parameters*/
		sortName:null,/*string Defines which column can be sorted.*/
		sortOrder:'asc',/*string Defines the column sort order, can only be 'asc' or 'desc'.*/
		columns:undefined/*array The datagrid columns config object, see column properties for more details.*/
	};
	
})(jQuery);

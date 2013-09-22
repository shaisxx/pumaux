;(function(){
	//"use strict"; // jshint ;_;
	
	$.dormitory.dormcheckmodule = {
			url : "dormitory.dormcheckmodule.html",
			modulehash : '#module=dormitory.dormcheckmodule|{}',
			init:init
	};
	
	function checkShowDisplayAll($subitem){
		var $li = $("ul.dormlist.deletable li:not('.display-all')",$subitem);
		if($li.length >= 2){
			$(".display-all",$subitem).show();
		}else{
			$(".display-all",$subitem).hide();
		}
		
	}
	
	//根据isotope区域中的状态确定已选宿舍学生名称
	function checkDormStudentSum($subitem){
		var $isotopeContainer = $(".isotope-container",$subitem);
		var shouldBeThereSum = $(".element",$isotopeContainer).length;
		var exactThereSum = $(".element.indorm",$isotopeContainer).length;
		var notThereSum = $(".element.notindorm",$isotopeContainer).length;
		console.log(shouldBeThereSum);
		console.log(exactThereSum);
		console.log(notThereSum);
		
		$(".detail-check .shouldbetheresum", $subitem).text(shouldBeThereSum);
		$(".detail-check .exacttheresum", $subitem).text(exactThereSum);
		$(".detail-check .nottheresum", $subitem).text(notThereSum);
	}
	
	function selectDorm(isSingleSelect, $subitem){
		var $isotopeContainer = $(".isotope-container",$subitem);
		
		var option = {
				url: 'selectdorm.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".select-dorm-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择宿舍!");
								return false;
							}
						//	<li class="list-group-item"><a href="javascript:void(0);" data-filter=".metal">第二宿舍</a></li>
							$(selectedData).each(function(){
								var $ul = $("ul.dormlist.deletable",$subitem);
								var $a = $("<a>").attr("href","javascript:void(0);").attr("data-filter","."+this.id).text(this.name).click(function(){
									var selector = $(this).attr('data-filter');
									$isotopeContainer.isotope({ filter: selector });
									  return false;
								});
								var $b = $('<b class="icon-minus-sign-alt close-tab-btn">').click(function(){
									bootbox.confirm("确定要删除吗？", function(result) {
										if(result == true){
											$tobeRemovedLi = $b.parent("li");
											var dormid = $tobeRemovedLi.attr("data-dormid");
											$isotopeContainer.isotope( 'remove', $(".element."+dormid,$isotopeContainer) ,function(){
												$tobeRemovedLi.remove();
												checkDormStudentSum($subitem);
												checkShowDisplayAll($subitem);
											});
										}
									}); 
									
									
								});
								var $li = $("<li>").attr("data-dormid",this.id).addClass("list-group-item");
								$li.append($a).append($b).appendTo($ul);
								
								var that = this;
								$(this.member).each(function(){
									var $element = $('<div>').attr("data-category",that.id).addClass("element").addClass(that.id);
									var $nameElement = $('<div style="width:100px;height:30px;line-height:30px;text-align:center;font-size:20px;">').text(this.name);
									var $dormElement = $('<div style="width:100px;height:20px;line-height:20px;text-align:center;font-size:10px;">').text(that.name);
									var $checkElement = $('<input type="checkbox" class="icheck" data-dormid="'+that.id+'" checked="checked"/>');
									if($checkElement[0].checked){
										if($checkElement[0].checked){
											$element.addClass("indorm");
										}else{
											$element.addClass("notindorm");
										}
									}
									$element.append($nameElement).append($dormElement).append($checkElement);//.appendTo($isotopeContainer);
									$isotopeContainer.isotope( 'insert', $element );
									$checkElement.iButton({
									    labelOn: "已到"
									  , labelOff: "缺勤"
									  , change: function ($input){
											console.log($input.attr("data-dormid")+"----"+$input[0].checked);
											console.log($input.parentsUntil(".element"));
											if($input[0].checked){
												$input.closest("div.element").removeClass("notindorm").addClass("indorm");
											}else{
												$input.closest("div.element").removeClass("indorm").addClass("notindorm");
											}
											checkDormStudentSum($subitem);
										}
									});
								});
								
							});
							$modal.find("button[data-dismiss='modal']").click();
							checkDormStudentSum($subitem);
							checkShowDisplayAll($subitem);
						});
						
						$(".searchinput", $modal).searchinput({
							templateid:'template-search-dormitory-widget',
							actionurl:"querydorm.do",
							placement:"bottom-right",
							callback:function(formData){
								updateDatagrid(formData);
								return true;
							}
						});
						
						var $datagrid = $(".select-dorm-datagrid", $modal);
						
						function updateDatagrid(formData){
							$datagrid.datagrid({
								url:'testdata/dorm-search-list.json',
								queryParams:formData
							});
							//$datagrid.datagrid("reload", formData);
						}
						
						$datagrid.datagrid({
							//url:'testdata/student-search-list.json',
							showBottomPagination:false,
							singleSelect:isSingleSelect,
							columns:[
										{field:'name',title:'宿舍名称',width:'40%'},
										{field:'member',title:'宿舍人数',formatter:function(value,row,index){
											return row.member.length;
										}}
									]
						
						});
						
				}
			};
		$.ajaxModal(option);
	}
	
	function init(param){
		
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		
		if($content.length > 0){
			//新建考勤
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-dormcheck"><span style="font-weight:bold;">+</span>&nbsp; 新增考勤</button>').click(function(){
				$(".dormcheck-datagrid", $content).slidecontent({
					url:'dormitory.dormcheckmodule.new.html',
					queryParams:{},
					callback:function($subitem){
						
						checkShowDisplayAll($subitem);
						
						//初始化新建考勤页面的日期选择器，并赋值到当前日期
						$subitem.find(".datepicker").datepicker({
							format:'yyyy-mm-dd'
						}).on('changeDate', function(ev){
							$subitem.find(".datepicker").datepicker('hide');
						}).datepicker('setValue', new Date());
						
						//初始化排序人员排序
						var $container = $(".isotope-container",$subitem);
						
						$('ul.dormlist.deletable a,.detail-check a',$subitem).click(function(){
							  var selector = $(this).attr('data-filter');
								  $container.isotope({ filter: selector });
								  return false;
							});
						
						$container.isotope({
						      itemSelector : '.element',
						      layoutMode : 'categoryRows',
						      categoryRows : {
						        gutter : 20
						      },
						      getSortData : {
						        category : function( $elem ) {
						          return $elem.attr('data-category');
						        }
						      },
						      sortBy: 'category'
						    });
						
						//返回按钮功能
						$subitem.find(".btn-back").click(function(){
							$(".dormcheck-datagrid", $content).slidecontent("showmain");
						});
						//初始化所有的复选框
						$(".icheck", $subitem).each(function(){
							console.log($(this));
							if($(this)[0].checked){
								$(this).closest("div.element").removeClass("notindorm").addClass("indorm");
							}else{
								$(this).closest("div.element").removeClass("indorm").addClass("notindorm");
							}
						});
						$(".icheck", $content).iButton({
						    labelOn: "已到"
						  , labelOff: "缺勤"
						  , change: function ($input){
								console.log($input.attr("data-dormid")+"----"+$input[0].checked);
								console.log($input.parentsUntil(".element"));
								if($input[0].checked){
									$input.closest("div.element").removeClass("notindorm").addClass("indorm");
								}else{
									$input.closest("div.element").removeClass("indorm").addClass("notindorm");
								}
								
							}
						});
						
						//宿舍选择按钮
						$subitem.find(".select-dorm-btn").click(function(){
							selectDorm(false, $subitem);
						});
						
					}
				});
				$(".dormcheck-datagrid", $content).slidecontent("showsub");
			});
			
			var $deleteButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除所选考勤</button>').click(function(){
								var selectedData = $(".dormcheck-datagrid", $content).datagrid("getChecked");
								if(selectedData.length == 0){
									alert("请选择考勤记录!");
									return;
								}
								bootbox.confirm("该操作会删除所选考勤日的所有考勤记录，确定要删除吗？", function(result) {
										if(result == true){
											alert("确认删除！");
										}
									});
								}); 
			
			var $searchDormButton = $('<div style="float:right;width:220px;">').append($('<input type="text" class="searchdormitoryinput" name="dormitoryname" placeholder="请输入宿舍号">')).find("input").searchinput({
						templateid:'template-search-dormitory-widget',
						actionurl:"querydorm.do",
						placement:"bottom-right",
						callback:function(formData){
							console.log(formData);
							return false;
						}
			}).end();
			var $toolbar = [$toolbarButton1,$deleteButton,$searchDormButton];
			
			$(".dormcheck-datagrid", $content).datagrid({
				url:'testdata/dormcheck-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'dormname',title:'宿舍名称',width:'40%',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									//alert(rowData.id);
									$(".dormcheck-datagrid", $content).slidecontent({
										url:'dormitory.dormcheckmodule.view.html',
										queryParams:{},
										callback:function($subitem){
											$subitem.find(".btn-back").click(function(){
												$(".dormcheck-datagrid", $content).slidecontent("showmain");
											});
										}
									});
									$(".dormcheck-datagrid", $content).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'resulttype',title:'检查结果',width:'80px'},
							{field:'checkdate',title:'检查时间'}
						]
			
			});
			
		}
	}
})();

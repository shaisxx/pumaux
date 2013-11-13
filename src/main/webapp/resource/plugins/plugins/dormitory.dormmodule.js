;(function(){
	//"use strict"; // jshint ;_;
	
	$.dormitory.dormmodule = {
			url : "dormitory.dormmodule.html",
			modulehash : '#module=dormitory.dormmodule|{}',
			init:init
	};
	
	
	function init(param){
		
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		
		if($content.length > 0){
			$(".dorm-datagrid", $content).datagrid({
				url:'testdata/dorm-list.json',
				//toolbar:$toolbar,
				columns:[
							{field:'dorm-no',title:'宿舍号',width:'150px',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									$(".dorm-datagrid", $content).slidecontent({
										url:'dormitory.dormmodule.view.html',
										queryParams:{},
										callback:function($subitem){
											//添加宿舍成员按钮
											var $addDormMemberBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增宿舍成员</button>').click(function(){
												//TODO 添加宿舍人员的操作，返回true关闭窗口，false保持窗口
												selectStudent(false, function(selectedData){
													console.log(selectedData);
													return true;
												});
											});
											//移除宿舍成员按钮
											var $deleteDormMemberButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除所选成员</button>').click(function(){
												var selectedData = $(".dorm-student-datagrid", $subitem).datagrid("getChecked");
												if(selectedData.length == 0){
													alert("请选择要删除的宿舍成员!");
													return;
												}
												bootbox.confirm("该操作会删除所选择的宿舍成员，确定要删除吗？", function(result) {
														if(result == true){
															alert("确认删除！");
														}
													});
												}); 
											
											var $toolbar = [$addDormMemberBtn,$deleteDormMemberButton];
											
											$(".dorm-student-datagrid", $subitem).datagrid({
												toolbar:$toolbar,
												url:'testdata/dorm-student-list.json',
												columns:[
															{field:'student-no',title:'学号',width:'150px'},
															{field:'name',title:'姓名',width:'100px'},
															{field:'checkin-date',title:'入住时间'}
														]
											});
											
											$subitem.find(".btn-back").click(function(){
												$(".dorm-datagrid", $content).slidecontent("showmain");
											});
										}
									});
									$(".dorm-datagrid", $content).slidecontent("showsub");
								});
								return $str;
							}},
							{field:'dorm-floor',title:'楼层',width:'100px'},
							{field:'student-sum',title:'人数',width:'100px'},
							{field:'violation',title:'违规次数',width:'100px'},
							{field:'damage',title:'损坏公物',width:'100px'},
							{field:'score',title:'评分'}
						]
			
			});
		}
	}
	
	function selectStudent(isSingleSelect, callbackfunc){
		var option = {
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".puma-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择学生!");
							}
							if(typeof callbackfunc == 'function'){
								if(callbackfunc.call(null, selectedData)){
									$modal.find("button[data-dismiss='modal']").click();
									return;
								}
			    			}else{
			    				$modal.find("button[data-dismiss='modal']").click();
			    				return;
			    			}
							//
						});
						
						$(".searchinput", $modal).searchinput({
							templateid:'template-search-student-widget',
							actionurl:"querydorm.do",
							placement:"bottom-right",
							callback:function(formData){
								console.log(formData);
								updateDatagrid(formData);
								return true;
							}
						});
						
						var $datagrid = $(".puma-datagrid", $modal);
						
						function updateDatagrid(formData){
							$datagrid.datagrid({
								url:'testdata/student-search-list.json',
								queryParams:formData
							});
							//$datagrid.datagrid("reload", formData);
						}
						
						$datagrid.datagrid({
							//url:'testdata/student-search-list.json',
							showBottomPagination:false,
							singleSelect:isSingleSelect,
							columns:[
										{field:'name',title:'姓名',width:'40%'},
										{field:'student-no',title:'学号'}
									]
						
						});
						
				}
			};
		$.ajaxModal(option);
	}
})();

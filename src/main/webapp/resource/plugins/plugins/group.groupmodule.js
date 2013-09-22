;(function(){
	//"use strict"; // jshint ;_;
	
	$.group.groupmodule = {
			url : "group.groupmodule.html",
			modulehash : '#module=group.groupmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			//新建社团
			var $addNewGroupBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增社团</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'group.groupmodule.new.html',
					width: '550px',
					callback: function($modal){$modal.on('click', '.save', function(){
						alert("save");
						$modal.find("button[data-dismiss='modal']").click();
					});}
				};
				$.ajaxModal(option);
			});
			
			var $deleteButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除所选社团</button>').click(function(){
				var selectedData = $(".group-datagrid", $content).datagrid("getChecked");
				if(selectedData.length == 0){
					alert("请选择要删除的社团!");
					return;
				}
				bootbox.confirm("该操作会删除所选择的社团信息，确定要删除吗？", function(result) {
						if(result == true){
							alert("确认删除！");
						}
					});
				}); 
			
			var $toolbar = [$addNewGroupBtn,$deleteButton];
			
			$(".group-datagrid", $content).datagrid({
				url:'testdata/group-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'name',title:'社团名称',width:'40%',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									$(".group-datagrid", $content).slidecontent({
										url:'group.groupmodule.view.html',
										queryParams:{},
										callback:function($subitem){
											
											buildMemberMgtGrid($subitem);
											
											//检查是否有编辑权限
											var $groupbasicinfoarea = $subitem.find(".groupbasicinfoarea");
											if($groupbasicinfoarea.length > 0 && $groupbasicinfoarea.attr("data-editable") == "enable"){
												$.fn.editable.defaults.mode = 'inline';
												$.fn.editable.defaults.url = '/post'; 
												$('.editable',$subitem).editable({
														 url: 'updateGroupInfo.do',
														 //name: 'groupname',
														 //type:'text',
														 //inputclass:'form-control',
														 //pk:'id',
														 success: function(data, config) {
															 
														 },
														 error: function(errors) {
															 console.log(errors);
														 }
												});
											}
											
											//人员管理和资源管理的表格功能切换
											$("input[type='radio'][name='grid-function']",$subitem).change( function() {
												var val = $(this).val();
												if(val == "membermgt"){
													buildMemberMgtGrid($subitem);
												}else if(val == "resourcemgt"){
													buildResourceMgtGrid($subitem);
												}
											});
											
											$subitem.find(".btn-back").click(function(){
												$(".puma-datagrid", $content).slidecontent("showmain");
											});
										}
									});
									$(".group-datagrid", $content).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'sum',title:'人数',width:'80px'},
							{field:'guider',title:'辅导员'}
						]
			
			});
		}
	}
	
	function buildMemberMgtGrid($subitem){
		var $addNewMemberBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增社团成员</button>').click(function(){
			var $datagrid = $(".group-member-datagrid", $subitem);
			
			groupAddStudent($datagrid);
			/*var id = $.util.generateRandomString(5);
			var option = {
				id: id,
				url: 'group.groupmodule.new.html',
				width: '550px',
				callback: function($modal){$modal.on('click', '.save', function(){
					alert("save");
					$modal.find("button[data-dismiss='modal']").click();
				});}
			};
			$.ajaxModal(option);*/
		});
		
		var $deleteMemberButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除社团成员</button>').click(function(){
			var selectedData = $(".group-member-datagrid", $subitem).datagrid("getChecked");
			if(selectedData.length == 0){
				alert("请选择要删除的人员!");
				return;
			}
			bootbox.confirm("该操作会删除所选择的社团人员，确定要删除吗？", function(result) {
					if(result == true){
						alert("确认删除！");
					}
				});
			}); 
		
		var $toolbar = [$addNewMemberBtn,$deleteMemberButton];
		
		$subitem.find(".group-member-datagrid").datagrid({
			url:'testdata/group-student-search-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'姓名',width:'100px'},
						{field:'student-no',title:'学号',width:'100px'},
						{field:'title',title:'职务',width:'100px',formatter:function(value,row,index){
							return $('<div data-type="select" class="editable editable-click"></div>').text(row.title).editable({
								url: 'updateGroupPosition.do',
								pk: row.id,
								name:"position",
						        prepend: [
						                  {value: 0, text: '无职位'},
						              ],
						        showbuttons: false,
						        source:"testdata/group-position.json",
						        success: function(data, config) {
									 
								 },
								 error: function(errors) {
									 console.log(errors);
								 }
						    }); 
						}},
						{field:'join-time',title:'加入时间'}
					]
		
		});
	}
	
	function buildResourceMgtGrid($subitem){
		var $addNewResourceBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增社团资源</button>').click(function(){
			var id = $.util.generateRandomString(5);
			var option = {
				id: id,
				url: 'group.groupmodule.view.addresource.html',
				width: '550px',
				callback: function($modal){$modal.on('click', '.save', function(){
					alert("save");
					
					//新增资源后关闭模态窗口
					$modal.find("button[data-dismiss='modal']").click();
					//并刷新资源列表
					$subitem.find(".group-member-datagrid").datagrid("load");
				});}
			};
			$.ajaxModal(option);
		});
		
		var $deleteResourceButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除社团资源</button>').click(function(){
			var selectedData = $(".group-member-datagrid", $subitem).datagrid("getChecked");
			if(selectedData.length == 0){
				alert("请选择要删除的资源!");
				return;
			}
			bootbox.confirm("该操作会删除所选择的资源，确定要删除吗？", function(result) {
					if(result == true){
						alert("确认删除！");
					}
				});
			}); 
		
		var $toolbar = [$addNewResourceBtn,$deleteResourceButton];
		
		$subitem.find(".group-member-datagrid").datagrid({
			url:'testdata/group-resource-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'资源名称',width:'40%'},
						{field:'member',title:'发布人'},
						{field:'datetime',title:'发布时间'}
					]
		
		});
	}
	
	function groupAddStudent($memberdatagrid){
		var option = {
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".puma-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择学生!");
							}
							console.log(selectedData);
							//TODO ajax添加学生操作
							var queryParams = "ids=";
							var i = 0;
							$(selectedData).each(function(){
								queryParams += (i==0 ? this.id:","+this.id);
								i++;
							});
							$.loading("正在新增社团成员...");
							$.ajax( {
						        "dataType": 'JSON',
						        "type": "POST",
						        "url": "addGroupMember.do",
						        "data": queryParams,//example: ids=a09sdf,isdfiajs,asjsdfak,akdsfa
						        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
						        "success": function(data){
						        	$.unloading();
						        	//添加完学生后，刷新学生列表
									$memberdatagrid.datagrid("load");
									//并关闭选择窗口
									$modal.find("button[data-dismiss='modal']").click();
						        },
						        "error":function(data){
						        	$.unloading();
						        	alert("添加社团成员失败,请重试！");
						        	return;
								}
						      } );
							
							//$modal.find("button[data-dismiss='modal']").click();
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

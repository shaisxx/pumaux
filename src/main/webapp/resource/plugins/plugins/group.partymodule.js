;(function(){
	//"use strict"; // jshint ;_;
	
	$.group.partymodule = {
			url : "group.partymodule.html",
			modulehash : '#module=group.partymodule|{}',
			init:init
	};
	
	function demoTagSelectStudent($target){
		var option = {
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".puma-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择指导老师!");
								return false;
							}else{
								$(selectedData).each(function(){
									$target.prev("span.guider").html(this.name+"<input type='hidden' value='"+this.id+"' name='guider'>");
								});
							}
							$modal.find("button[data-dismiss='modal']").click();
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
							url:'testdata/student-search-list.json',
							singleSelect:true,
							columns:[
										{field:'name',title:'姓名',width:'40%'},
										{field:'student-no',title:'学号'}
									],
							showSearch:true,
							showSearchConfig:{
									advancedSearch:true,
									advancedSearchConfig:{
										standalone:true,
										templateUrl:'querystudenttemplate.html',
										templateInitData:{key:'123'},
										showCallback:function($container){
											$('.selectpicker',$container).selectpicker();
										},
										hideCallback:function($container){
										},
										placement:'bottom'
									}
							},
							success:function(data){
								updateDatagrid(data);
								return true;
							},
							error:function(data){
								console.log(data);
								alert("查询错误!");
							}
						
						});
						
				}
			};
		$.ajaxModal(option);
	}
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			
			buildMemberMgtGrid($content);
			
			$(".guider-search-btn",$content).click(function(){
				demoTagSelectStudent($(this));
			});
			
			$(".save",$content).click(function(){
				alert("保存");
			});
			
			//人员管理和资源管理的表格功能切换
			$("input[type='radio'][name='grid-function']",$content).change( function() {
				var val = $(this).val();
				if(val == "membermgt"){
					buildMemberMgtGrid($content);
				}else if(val == "resourcemgt"){
					buildResourceMgtGrid($content);
				}
			});
			
		}
	}
	
	function buildMemberMgtGrid($subitem){
		var $addNewMemberBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增社团成员</button>').click(function(){
			var $datagrid = $(".party-member-datagrid", $subitem);
			
			partyAddStudent($datagrid);
		});
		
		var $deleteMemberButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除团委成员</button>').click(function(){
			var selectedData = $(".party-member-datagrid", $subitem).datagrid("getChecked");
			if(selectedData.length == 0){
				alert("请选择要删除的人员!");
				return;
			}
			bootbox.confirm("该操作会删除所选择的团委人员，确定要删除吗？", function(result) {
					if(result == true){
						alert("确认删除！");
					}
				});
			}); 
		
		var $toolbar = [$addNewMemberBtn,$deleteMemberButton];
		
		$subitem.find(".party-member-datagrid").datagrid({
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
	
	function buildResourceMgtGrid($content){
		var $addNewResourceBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增团委资源</button>').click(function(){
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
					$content.find(".party-member-datagrid").datagrid("load");
				});}
			};
			$.ajaxModal(option);
		});
		
		var $deleteResourceButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除团委资源</button>').click(function(){
			var selectedData = $(".party-member-datagrid", $content).datagrid("getChecked");
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
		
		$content.find(".party-member-datagrid").datagrid({
			url:'testdata/group-resource-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'资源名称',width:'40%',formatter: function(value,row,index){
							var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
								var rowData = $(this).closest("tr").data("data");
							});
							
							return $str;
						}},
						{field:'member',title:'发布人'},
						{field:'datetime',title:'发布时间'}
					]
		
		});
	}
	
	function partyAddStudent($memberdatagrid){
		var option = {
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".puma-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择学生!");
							}
							//TODO ajax添加学生操作
							var queryParams = "ids=";
							var i = 0;
							$(selectedData).each(function(){
								queryParams += (i==0 ? this.id:","+this.id);
								i++;
							});
							$.loading("正在新增团委成员...");
							$.ajax( {
						        "dataType": 'JSON',
						        "type": "POST",
						        "url": "addPartyMember.do",
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

;(function(){
	"use strict"; // jshint ;_;
	
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
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增社团</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'test.html',
					width: '650px',
					callback: function($modal){$modal.on('click', '.save', function(){
						alert("save");
						$modal.find("button[data-dismiss='modal']").click();
					});}
				};
				$.ajaxModal(option);
			});
			
			var $toolbarButton2 = $('<button type="button" class="btn btn-default create-group" style="margin-left:20px;">带条件刷新</button>').click(function(){
				$(".puma-datagrid", $content).datagrid("reload");
			});
			
			var $toolbarButton3 = $('<button type="button" class="btn btn-default create-group" style="margin-left:20px;">重新加载</button>').click(function(){
				$(".puma-datagrid", $content).datagrid("load");
			});
			
			var $toolbar = [$toolbarButton1,$toolbarButton2,$toolbarButton3];
			
			$(".puma-datagrid", $content).datagrid({
				url:'testdata/group-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'name',title:'社团名称',width:'40%',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									//alert(rowData.id);
									$(".puma-datagrid", $content).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'sum',title:'人数',width:'80px'},
							{field:'guider',title:'辅导员',}
						]
			
			}).slidecontent({
				url:'slidecontent.html',
				queryParams:{},
				callback:function($subitem){
					$subitem.find(".btn-back").click(function(){
						$(".puma-datagrid", $content).slidecontent("showmain");
					}).end().find(".demo-single-select-student").click(function(){
						demoSelectStudent(true);
					}).end().find(".demo-multi-select-student").click(function(){
						demoSelectStudent(false);
					}).end().find(".searchstudentinput").searchinput({
						actionurl:"querystudent.do",
						callback:function(formData){
							console.log(formData);
							return false;
						}
					}).end().find(".searchdormitoryinput").searchinput({
						templateid:'template-search-dormitory-widget',
						actionurl:"querydorm.do",
						placement:"bottom-right",
						callback:function(formData){
							return false;
						}
					}).end().find(".demo-prompt-alert").click(function(){
						bootbox.alert("操作成功!", function(result) {
						}); 
					}).end().find(".demo-prompt-confirm").click(function(){
						bootbox.confirm("确定要删除吗？", function(result) {
							alert("选择结果: "+result);
						}); 
					}).end().find(".demo-prompt-prompt").click(function(){
						bootbox.prompt("随便输入点什么吧！", function(result) {
							if (result === null) {
								alert("啥都没输入呢！");
							} else {
								alert("Hi <b>"+result+"</b>");
							}
						});
					}).end().find(".demo-prompt-custom").click(function(){
						bootbox.dialog({
							message: "这是个自定义对话框",
							title: "自定义标题",
							buttons: {
								success: {
								label: "Success!",
								className: "btn-success",
								callback: function() {
										alert("great success");
									}
								},
								danger: {
									label: "Danger!",
									className: "btn-danger",
									callback: function() {
										alert("Danger!");
									}
								},
								main: {
									label: "Click ME!",
									className: "btn-primary",
									callback: function() {
										alert("Click ME!!");
									}
								}
							}
						});
					}).end().find(".demo-loading-btn").click(function(){
						$.loading("显示加载状态信息");
					}).end().find(".demo-unloading-btn").click(function(){
						$.unloading();
					}).end().find(".demo-messaging-btn").click(function(){
						$.messaging("显示自定义信息!");
					}).end().find(".demo-success-messaging-btn").click(function(){
						$.messaging("显示自定义信息!",true);
					}).end().find(".demo-info-messaging-btn").click(function(){
						$.messaging("显示自定义信息,显示自定义信息,显示自定义信息，显示自定义信息，显示自定义信息显示自定义信息!");
					}).end().find(".tagselect").tagselect({
						selectfun:function(){
							demoTagSelectStudent($(this));
							//$(this).tagselect("add",{value:'123123',text:'haha'});
						}
					}).end().find(".demo-check-tagselect-form").click(function(){
						var formSerialize = $(this).closest('form').formSerialize();
						alert(formSerialize);
					});
				}
			});
			
		}
	}
	
	function demoTagSelectStudent($target){
		var option = {
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						$modal.on('click', '.save', function(){
							var selectedData = $(".puma-datagrid", $modal).datagrid("getChecked");
							if(selectedData.length == 0){
								alert("请选择学生!");
								return false;
							}else{
								$(selectedData).each(function(){
									$target.tagselect("add",{value:this.id,text:this.name});
								});
							}
							$modal.find("button[data-dismiss='modal']").click();
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
								url:'testdata/student-search-list.json'
							});
							$datagrid.datagrid("reload", formData);
						}
						
						$datagrid.datagrid({
							//url:'testdata/student-search-list.json',
							showBottomPagination:false,
							singleSelect:false,
							columns:[
										{field:'name',title:'姓名',width:'40%'},
										{field:'student-no',title:'学号'}
									]
						
						});
						
				}
			};
		$.ajaxModal(option);
	}
	
	
	function demoSelectStudent(isSingleSelect){
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
								url:'testdata/student-search-list.json'
							});
							$datagrid.datagrid("reload", formData);
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

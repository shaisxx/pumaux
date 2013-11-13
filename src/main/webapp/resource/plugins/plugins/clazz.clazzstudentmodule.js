;(function(){
	//"use strict"; // jshint ;_;
	
	$.clazz.clazzstudentmodule = {
			url : "clazz.clazzstudentmodule.html",
			modulehash : '#module=clazz.clazzstudentmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			buildClazzGrid($content, true);
		}
	}
	
	function buildClazzGrid($content, isMyClazz){
		var $clazzGroup = $('<div class="btn-group" data-toggle="buttons" style="padding-right:20px;">'
			+ 	'<label class="btn btn-primary '+(isMyClazz?"active":"")+'">'
					+		'<input type="radio" name="grid-function" value="myclazz"> &nbsp;&nbsp;我的班级&nbsp;&nbsp;'
					+	'</label>'
					+	'<label class="btn btn-primary '+(isMyClazz?"":"active")+'">'
					+		'<input type="radio" name="grid-function" value="allclazz"> &nbsp;&nbsp;所有班级&nbsp;&nbsp;'
					+	'</label>'
					+'</div>');
		//var $clazzGroup = $(clazzGroup);
		$("input[type='radio'][name='grid-function']", $clazzGroup).change( function() {
				var val = $(this).val();
				if(val == "myclazz"){
					buildClazzGrid($content, true);
				}else if(val == "allclazz"){
					buildClazzGrid($content, false);
				}
			});
		
		var $toolbar = [$clazzGroup];
		
		$(".clazz-datagrid", $content).datagrid({
			url:'testdata/clazz-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'班级名称',width:'30%',formatter: function(value,row,index){
							var $str = $('<button type="button" class="btn btn-primary btn-xs view-group">').text(value).click(function(){
								var rowData = $(this).closest("tr").data("data");
								$(".clazz-datagrid", $content).slidecontent({
									url:'clazz.clazzstudentmodule.viewstudent.html',
									queryParams:{id:rowData.id},
									callback:function($subitem){
										buildClazzStudentGrid($content, $subitem, isMyClazz);
									}
								});
								$(".clazz-datagrid", $content).slidecontent("showsub");
							});
							
							return $str;
						}},
						{field:'studentsum',title:'人数',width:'80px'},
						{field:'teacher',title:'班主任'},
						{field:'major',title:'专业'},
						{field:'grade',title:'年级'}
					]
		
		});
	}
	
	function buildClazzStudentGrid($content, $subitem, isMyClazz){
		
		var $backButton = $('<button type="button" class="btn btn-success btn-back"><b class="icon-reply"></b>&nbsp;&nbsp;返回</button>').click(function(){
			$(".clazz-datagrid", $content).slidecontent("showmain");
		}); 
		
		var $exportButton = $('<div class="btn-group" style="padding:0 20px;">'
							+	'<button class="btn btn-default export-action" type="button">导出学生信息</button>'
							+	'<button class="btn btn-default export-config" type="button">'
							+		'<span class="icon-cog"></span>'
							+	'</button>'
							+'</div>');
		$(".export-action",$exportButton).click(function(){
			alert("导出");
		});
		$(".export-config",$exportButton).click(function(){
			//alert("设置");
			var option = {
					url: 'clazz.clazzstudentmodule.viewstudent.exportconfig.html',
					width: '1000px',
					fullwidth:true,
					callback: function($modal){
							$('input',$modal).iCheck({checkboxClass: 'icheckbox_square-blue'});
							$modal.on('click', '.save', function(){
								var js = $("form",$modal).serializeJson();
								console.log(js);
								alert("保存");
							});
					}
				};
			$.ajaxModal(option);
		});
		
		var $importScoreButton = $('<button type="button" class="btn btn-default btn-back">导入学生成绩</button>').click(function(){
			alert("导入学生成绩");
		}); 
		var $toolbar = [$backButton, $exportButton, $importScoreButton];
		
		$subitem.find(".clazzstudent-datagrid").datagrid({
			url:'testdata/clazz-student-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'学生',formatter: function(value,row,index){
							var $str = $('<button type="button" class="btn btn-primary btn-xs view-group">').text(value).click(function(){
								var rowData = $(this).closest("tr").data("data");
								$(".clazzstudent-datagrid", $subitem).slidecontent({
									url:'clazz.clazzstudentmodule.viewstudent.detail.html',
									queryParams:{},
									callback:function($subitem2){
										$subitem2.find(".edit-score").click(function(){
											alert("编辑成绩");
										}).end().find(".edit-basic-btn").click(function(){
											alert("编辑学生基本信息");
										}).end().find(".export-basic-btn").click(function(){
											alert("导出学生基本信息");
										}).end().find(".edit-commuication-btn").click(function(){
											alert("编辑学生联系信息");
										});
										
										
										
										
										$subitem2.find(".btn-back").click(function(){
											$(".clazzstudent-datagrid", $subitem).slidecontent("showmain");
										});
									}
								});
								$(".clazzstudent-datagrid", $subitem).slidecontent("showsub");
							});
							
							return $str;
						}},
						{field:'student-no',title:'学号'},
						{field:'sex',title:'性别',formatter: function(value,row,index){
							
							return value=="0"?"男":"女";
						}},
						{field:'major',title:'专业'},
						{field:'clazz',title:'班级'},
						{field:'grade',title:'年级'},
						{field:'teacher',title:'班主任'},
					]
		
		});
	}
	
})();

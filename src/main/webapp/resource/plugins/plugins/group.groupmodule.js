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
							{field:'name',title:'社团名称',rowspan:2,width:'40%',formatter: function(value,row,index){
								var str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									//alert(rowData.id);
									$(".puma-datagrid", $content).slidecontent("showsub");
								});
								return str;
							}},
							{field:'sum',title:'人数',rowspan:2,width:'80px'},
							{field:'guider',title:'辅导员',rowspan:2}
						]
			
			});
			
			$(".puma-datagrid", $content).slidecontent({
				url:'slidecontent.html',
				queryParams:{},
				callback:function($subitem){
					$subitem.find(".btn-back").click(function(){
						$(".puma-datagrid", $content).slidecontent("showmain");
					});
					
					$subitem.find(".demo-single-select-student").click(function(){
						demoSelectStudent(true);
					});
					
					$subitem.find(".demo-multi-select-student").click(function(){
						demoSelectStudent(false);
					});
				}
			});
			
		}
	}
	
	
	var searchStudentTemplate = '<table class="form-table" style="width:300px">'
								+ '<tbody>'
								+		'<tr>'
								+			'<th width="80px"></th>'
								+			'<th></th>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'姓名：'
								+			'</td>'
								+			'<td align="left">'
								+				'<input type="text" class="form-control">'
								+			'</td>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'学号：'
								+			'</td>'
								+			'<td align="left">'
								+				'<input type="text" class="form-control">'
								+			'</td>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'年级：'
								+			'</td>'
								+			'<td align="left">'
								+				'<select class="selectpicker">'
								+					'<option value="2012">2012</option>'
								+					'<option value="2013">2013</option>'
								+				'</select>'
								+			'</td>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'系：'
								+			'</td>'
								+			'<td align="left">'
								+				'<select class="selectpicker">'
								+					'<option>Mustard</option>'
								+					'<option>Ketchup</option>'
								+					'<option>Relish</option>'
								+				'</select>'
								+			'</td>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'专业：'
								+			'</td>'
								+			'<td align="left">'
								+				'<select class="selectpicker">'
								+					'<option>Mustard</option>'
								+					'<option>Ketchup</option>'
								+					'<option>Relish</option>'
								+				'</select>'
								+			'</td>'
								+		'</tr>'
								+		'<tr>'
								+			'<td align="right" style="padding-right:10px; color:#000;">'
								+			'班级：'
								+			'</td>'
								+			'<td align="left">'
								+				'<select class="selectpicker">'
								+					'<option>Mustard</option>'
								+					'<option>Ketchup</option>'
								+					'<option>Relish</option>'
								+				'</select>'
								+			'</td>'
								+		'</tr>'
								+	  ' </tbody>'
								+	'</table>';
	var selectStudentPopupTemplate = '<div class="popover">'
									+	'<div class="arrow"></div><h3 class="popover-title"></h3>'
									+	'<div class="popover-content"></div>'
									+	'<div class="modal-footer">'
									+		'<button type="button" class="btn btn-primary do-search">查&nbsp;&nbsp;询</button>'
									+		'<button type="button"class="btn cacel-search">取&nbsp;&nbsp;消</button>'
									+	'</div>'
									+ '</div>';
	function demoSelectStudent(isSingleSelect){
		var id = $.util.generateRandomString(5);
		var option = {
				id: id,
				url: 'selectstudent.html',
				width: '400px',
				callback: function($modal){
						var options = {
								html:true,
								placement:'bottom',
								content:searchStudentTemplate,
								template:selectStudentPopupTemplate,
								container: $modal
						};
						$('.advanced-search-caret-btn',$modal).popover(options)
																.on('shown.bs.popover', function (e) {
																		$('.selectpicker').selectpicker();
																	});
						
						$modal.on('click','.cacel-search',function(){
							$('.advanced-search-caret-btn',$modal).popover('toggle');
						}).on('click','.do-search',function(){
							$('.selectpicker').selectpicker();
							alert("开始查询");
							//$('.advanced-search-caret-btn',$modal).popover('toggle');
						}).on('click', '.save', function(){
							alert("save");
							$modal.find("button[data-dismiss='modal']").click();
						});
						
						$(".puma-datagrid", $modal).datagrid({
							url:'testdata/group-list.json',
							showBottomPagination:false,
							singleSelect:isSingleSelect,
							columns:[
										{field:'name',title:'社团名称',rowspan:2,width:'40%'},
										{field:'sum',title:'人数',rowspan:2,width:'80px'},
										{field:'guider',title:'辅导员',rowspan:2}
									]
						
						});
						
				}
			};
		$.ajaxModal(option);
	}
	
})();

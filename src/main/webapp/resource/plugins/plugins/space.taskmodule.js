;(function(){
	//"use strict"; // jshint ;_;
	
	$.space.taskmodule = {
			url : "space.taskmodule.html",
			modulehash : '#module=space.taskmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			//弹出窗口
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增任务</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'space.taskmodule.new.html',
					width: '650px',
					callback: function($modal){
						$modal.find(".datepicker").datepicker({
							format:'yyyy-mm-dd'
						}).on('changeDate', function(ev){
							$modal.find(".datepicker").datepicker('hide');
						}).datepicker('setValue', new Date());
						
						
						$('.selectpicker',$modal).selectpicker();
						$('input',$modal).iCheck({checkboxClass: 'icheckbox_square-blue',radioClass: 'iradio_square-blue'});
						
						$modal.on('click', '.save', function(){
						alert("save");
						$modal.find("button[data-dismiss='modal']").click();
					});}
				};
				$.ajaxModal(option);
			});
			
			var $deleteButton = $('<button type="button" class="btn btn-danger create-group" style="margin-left:20px;">删除所选任务</button>').click(function(){
				var selectedData = $(".task-datagrid", $content).datagrid("getChecked");
				if(selectedData.length == 0){
					alert("请选择要删除的任务!");
					return;
				}
				bootbox.confirm("该操作会删除所选任务记录，确定要删除吗？", function(result) {
						if(result == true){
							alert("确认删除！");
						}
					});
			});
			
			var $toolbar = [$toolbarButton1,$deleteButton];
			
			$(".task-datagrid", $content).datagrid({
				url:'testdata/task-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'name',title:'任务名称',width:'40%',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-primary btn-xs">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									$(".task-datagrid", $content).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'endtime',title:'截止时间',width:'200px'},
							{field:'status',title:'状态',width:'80px'},
							{field:'taskto',title:'分配至'}
						],
				showSearch:true,
				showSearchConfig:{
					placeholder:'请输入demo关键字',
					actionurl:"querydorm.do",
					advancedSearch:true,
					advancedSearchConfig:{
							templateUrl:'querystudenttemplate.html',
							templateInitData:{key:'123'},
							showCallback:function($container){
								$('.selectpicker',$container).selectpicker();
							},
							hideCallback:function($container){
							},
							placement:'bottom'},
					success:function(data){
						console.log(data);
						return false;
					},
					error:function(data){
						console.log(data);
						alert("查询错误!");
					}
				}
			
			}).slidecontent({
				url:'space.taskmodule.view.html',
				queryParams:{},
				callback:function($subitem){
					$subitem.find(".btn-back").click(function(){
						$(".task-datagrid", $content).slidecontent("showmain");
					}).end().find(".task-member-datagrid").datagrid({
						orderable:false,
						checkbox:false,
						url:'testdata/task-member-list.json',
						columns:[
									{field:'name',title:'姓名',width:'80px'},
									{field:'delivertime',title:'提交时间',width:'200px'},
									{field:'status',title:'状态',width:'80px'},
									{field:'relatedoc',title:'相关文档',formatter:function(value,row,index){
										var $link = $('<span class="label label-success" style="cursor:pointer;">'+value+'</span>').click(function(){
											//console.log(row.docurl);
											window.open(row.docurl,"_blank");
										});
										return $link;
										}
									},
									{field:'description',title:'描述',formatter:function(value,row,index){
										var options = {title:"",content:value,placement:'left'};
										var $link = $('<div style="cursor:pointer;">')
													.css("width","100px")
													.css("height","20px")
													.css("overflow","hidden")
													.css("white-space","nowrap")
													.css("text-overflow","ellipsis")
													.text(value)
													.popover(options)
													.hover(function(){
														$(this).popover('show');
													},function(){
														$(this).popover('hide');
													});
										return $link;
										}
									}
								]
					});
				}
			});
			
		}
	}
})();

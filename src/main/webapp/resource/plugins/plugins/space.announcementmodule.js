;(function(){
	//"use strict"; // jshint ;_;
	
	$.space.announcementmodule = {
			url : "space.announcementmodule.html",
			modulehash : '#module=space.announcementmodule|{}',
			init:init
	};
	
	function init(param){

		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			//弹出窗口
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增通知</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'space.announcementmodule.new.html',
					width: '650px',
					callback: function($modal){
						$('.selectpicker',$modal).selectpicker();
						$('input',$modal).iCheck({checkboxClass: 'icheckbox_square-blue',radioClass: 'iradio_square-blue',});
						$modal.on('click', '.save', function(){
						alert("save");
						$modal.find("button[data-dismiss='modal']").click();
					});}
				};
				$.ajaxModal(option);
			});
			
			var $deleteButton = $('<button type="button" class="btn btn-danger create-group" style="margin-left:20px;">删除所选通知</button>').click(function(){
				var selectedData = $(".announcement-datagrid", $content).datagrid("getChecked");
				if(selectedData.length == 0){
					alert("请选择要删除的通知!");
					return;
				}
				bootbox.confirm("该操作会删除所选通知记录，确定要删除吗？", function(result) {
						if(result == true){
							alert("确认删除！");
						}
					});
			});
			
			var $toolbar = [$toolbarButton1,$deleteButton];
			
			$(".announcement-datagrid", $content).datagrid({
				url:'testdata/announcement-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'title',title:'通知标题',width:'40%',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-primary btn-xs">').text(value).click(function(){
									$(".announcement-datagrid", $content).slidecontent({
										url:'space.announcementmodule.view.html',
										queryParams:{},
										callback:function($subitem){
											$subitem.find(".btn-back").click(function(){
												$(".announcement-datagrid", $content).slidecontent("showmain");
											});
										}
									}).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'publishtime',title:'发布时间',width:'200px'},
							{field:'publisher',title:'发布人',width:'80px'},
							{field:'status',title:'状态',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-primary btn-xs">').text(value).click(function(){
									alert("取消置顶");
								});
								
								return $str;
							}}
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
			
			});
			
		}
	
	}
})();

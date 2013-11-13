;(function(){
	//"use strict"; // jshint ;_;
	
	$.space.recruitmodule = {
			url : "space.recruitmodule.html",
			modulehash : '#module=space.recruitmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			//弹出窗口
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增职位</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'space.recruitmodule.newposition.html',
					width: '650px',
					callback: function($modal){$modal.on('click', '.save', function(){
						alert("save");
						$modal.find("button[data-dismiss='modal']").click();
					});}
				};
				$.ajaxModal(option);
			});
			
			var $deleteButton = $('<button type="button" class="btn btn-danger create-group" style="margin-left:20px;">删除所选职位</button>').click(function(){
				var selectedData = $(".recruit-datagrid", $content).datagrid("getChecked");
				if(selectedData.length == 0){
					alert("请选择要删除的职位!");
					return;
				}
				bootbox.confirm("该操作会删除所选职位记录，确定要删除吗？", function(result) {
						if(result == true){
							alert("确认删除！");
						}
					});
			});
			
			var $toolbar = [$toolbarButton1,$deleteButton];
			
			function _tempFunc($subitem, $content, row){

				var $backButton = $('<button type="button" class="btn btn-success btn-back"><b class="icon-reply"></b>&nbsp;&nbsp;当前职位：<strong>'+row.name+'</strong></button>');
				
				var $toolbar = [$backButton];
				
				$subitem.find(".recruitmodule-view-datagrid").datagrid({
					orderable:false,
					checkbox:false,
					toolbar:$toolbar,
					url:'testdata/recruit-member-list.json',
					columns:[
								{field:'name',title:'学生姓名',width:'150px'},
								{field:'clazz',title:'学生班级',width:'100px'},
								{field:'delivertime',title:'提交时间',width:'200px'},
								{field:'status',title:'状态',width:'80px',formatter: function(value,row,index){
									var $str = $('<button type="button" class="btn btn-primary btn-xs view-group">').text(value).click(function(){
										var rowData = $(this).closest("tr").data("data");
										var id = $.util.generateRandomString(5);
										var option = {
											id: id,
											url: 'space.recruitmodule.viewresume.html',
											width: '650px',
											callback: function($modal){$modal.on('click', '.save', function(){
												alert("save");
												$modal.find("button[data-dismiss='modal']").click();
											});}
										};
										$.ajaxModal(option);
									});
									
									return $str;
								}},
								{field:'score',title:'分数'}
							],
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
				
				}).find(".btn-back").click(function(){
					$(".recruit-datagrid", $content).slidecontent("showmain");
				});
			}
			
			$(".recruit-datagrid", $content).datagrid({
				url:'testdata/recruit-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'name',title:'职位名称',width:'200px',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-primary btn-xs">').text(value).click(function(){
									$(".recruit-datagrid", $content).slidecontent({
										url:'space.recruitmodule.viewposition.html',
										callback:function($subitem){
											$subitem.find(".btn-back").click(function(){
												$(".recruit-datagrid", $content).slidecontent("showmain");
											}).end().find(".view-member-list").click(function(){
												$(".recruit-datagrid", $content).slidecontent({
													url:'space.recruitmodule.viewmemberlist.html',
													callback:function($subitem){ _tempFunc($subitem, $content, row);}
												}).slidecontent("showsub");
											});
											
											
										}
									}).slidecontent("showsub");
									
								});
								
								return $str;
							}},
							{field:'companyname',title:'公司名称',width:'200px'},
							{field:'endtime',title:'截止时间',width:'150px'},
							{field:'publisher',title:'发布人',width:'80px'},
							{field:'status',title:'状态',width:'80px'},
							{field:'sum',title:'应聘人数',formatter:function(value,row,index){

								var $str = $('<button type="button" class="btn btn-primary btn-xs">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									$(".recruit-datagrid", $content).slidecontent({
										url:'space.recruitmodule.viewmemberlist.html',
										callback:function($subitem){_tempFunc($subitem, $content, row);}
									}).slidecontent("showsub");
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

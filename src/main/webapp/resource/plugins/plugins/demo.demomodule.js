;(function(){
	//"use strict"; // jshint ;_;
	
	$.demo.demomodule = {
			url : "demo.demomodule.html",
			modulehash : '#module=demo.demomodule|{}',
			init:init
	};
	
	function openModal($modal){
		$(".open-modal",$modal).click(function(){
			var option2 = {
					url: 'test.html',
					width: '400px',
					callback: function($submodal){
						openModal($submodal);
					}
			};
			$.ajaxModal(option2);
		});
	}
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			//弹出窗口
			var $toolbarButton1 = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 弹出窗口按钮</button>').click(function(){
				var option = {
					url: 'test.html',
					width: '650px',
					callback: function($modal){
						
						$modal.on('click', '.save', function(){
							alert("save");
							$modal.find("button[data-dismiss='modal']").click();
						});
						
						openModal($modal);
						
					}
				};
				$.ajaxModal(option);
			});
			
			var $toolbarButton2 = $('<button type="button" class="btn btn-default create-group" style="margin-left:20px;">表格带条件刷新</button>').click(function(){
				$(".puma-datagrid", $content).datagrid("reload");
			});
			
			var $toolbarButton3 = $('<button type="button" class="btn btn-default create-group" style="margin-left:20px;">表格重新加载</button>').click(function(){
				$(".puma-datagrid", $content).datagrid("load");
			});
			
			var $toolbar = [$toolbarButton1,$toolbarButton2,$toolbarButton3];
			
			function infiniteSlide($target){
				$target.slidecontent({
					url:'infiniteslidecontent.html',
					queryParams:{},
					callback:function($subitem2){
						$subitem2.find(".btn-back").click(function(){
							$target.slidecontent("showmain");
						});
					}
				}).slidecontent("showsub");
			}
			
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
							{field:'guider',title:'辅导员'}
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
				url:'slidecontent.html',
				queryParams:{},
				callback:function($subitem){
					$subitem.find(".slideit").click(function(){
						var $target = $(this).closest(".slide-item");
						infiniteSlide($target);
					});
					
					$subitem.find(".btn-back").click(function(){
						$(".puma-datagrid", $content).slidecontent("showmain");
					}).end().find(".demo-single-select-student").click(function(){
						demoSelectStudent(true);
					}).end().find(".demo-multi-select-student").click(function(){
						demoSelectStudent(false);
					}).end().find(".searchstudentinput").searchinput({
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
					}).end().find(".searchdormitoryinput").searchinput({
						actionurl:"querydorm.do",
						advancedSearch:true,
						advancedSearchConfig:{
								templateUrl:'querydormitorytemplate.html',
								templateInitData:{key:'123'},
								showCallback:function($container){
									$('.selectpicker',$container).selectpicker();
								},
								hideCallback:function($container){
								},
								placement:'bottom-right'
						},
						success:function(data){
							console.log(data);
							return false;
						},
						error:function(data){
							console.log(data);
							alert("查询错误!");
						}
					}).end().find(".simplesearchinput").searchinput({
						actionurl:"querystudent.do",
						actiondata:{key:'123123',keys:'2334234'},
						success:function(data){
							console.log(data);
							return false;
						},
						error:function(data){
							console.log(data);
							alert("查询错误!");
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
	
	
	/*function demoTagSelectStudent($target){
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
								updateDatagrid(data);
								return true;
							},
							error:function(data){
								console.log(data);
								alert("查询错误!");
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
							singleSelect:false,
							columns:[
										{field:'name',title:'姓名',width:'40%'},
										{field:'student-no',title:'学号'}
									]
						
						});
						
				}
			};
		$.ajaxModal(option);
	}*/
	
	
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

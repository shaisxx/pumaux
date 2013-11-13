;(function(){
	//"use strict"; // jshint ;_;
	
	$.dormitory.dormfeedbackmodule = {
			url : "dormitory.dormfeedbackmodule.html",
			modulehash : '#module=dormitory.dormfeedbackmodule|{}',
			init:init
	};
	
	
	function init(param){
		
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		
		if($content.length > 0){
			//新建反馈
			var $addNewGroupBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增反馈</button>').click(function(){
				var id = $.util.generateRandomString(5);
				var option = {
					id: id,
					url: 'dormitory.dormfeedbackmodule.newfeedback.html',
					width: '550px',
					callback: function($modal){
						$modal.on('click', '.save', function(){
							alert("save");
							$modal.find("button[data-dismiss='modal']").click();
						});
						
						var typeaheadUrl = 'testdata/chief-teacher-search-by-stuorteachername-list.json';
						$('.typeahead',$modal).typeaheadmap({
							"source" : function(q, process) { 
							     $.ajax({url: typeaheadUrl, 
							               dataType: 'json',
							               success: function(data) { 
							            	   process(data);
							            	}
							     });
							},
							"notfound": new Array({'name' :"Capital Does Not Exist?", 'teacherid': "",'d': "You typed something that is not in the list"}),
							"key" : "name",
							"value" : "teacherid",
							"items": 11,
							"updater": function (item) {
								return item.teachername;
							 },
							"listener" : function(k, v, element) {
								element.val(v).change();
								var $hiddenInput = element.siblings("input[type='hidden']");
								if($hiddenInput.length == 0){
									$hiddenInput = $("<input type='hidden' name='"+element.attr("name")+"' value='"+v+"'>"); 
									element.after($hiddenInput);
									element.removeAttr("name");
								}else{
									$hiddenInput.val(v);
								}
							},
							"displayer": function(that, item, highlighted) {
								/*console.log(that.value);
								console.log(item);
								console.log(highlighted);*/
								var isTeacher = item.type == "teacher";
								var $str = $("<div>").css("padding","5px 10px").css("width","200px");
								var $teacher = $("<div>").css("font-size","12px").css("float","right").css("color","#CCCCCC");
								var $main = $("<div>").css("font-size","14px");
								var $mainNo = $("<div>").css("font-size","10px");
								
								isTeacher?$str.append($main.html(highlighted+"(班主任)")).append($mainNo.html("工号："+item.workorstudentno)):
										  $str.append($teacher.html("班主任："+item.teachername)).append($main.html(highlighted+"(学生)")).append($mainNo.html("学号："+item.workorstudentno));
									
								
								$str.append($teacher).append($main).append($mainNo);
								/*var str = "<div style='padding:5px 10px; width:200px;'>"
										+		"<div style='font-size:12px;float:right;color:#CCCCCC'>"
										+			"班主任：李老师"
										+		"</div>"
										+		"<div style='font-size:14px;'>"
										+			"张三(学生)"
										+		"</div>"
										+		"<div style='font-size:10px;'>"
										+			"员工号：2222"
										+		"</div>"
										+ "</div>";*/
								return $str;
							}
						    });
					}
				};
				$.ajaxModal(option);
			});
			
			var $deleteButton = $('<button class="btn btn-danger" type="button" style="margin-left:10px;margin-right:10px;">删除所选反馈消息</button>').click(function(){
				var selectedData = $(".dorm-feedback-datagrid", $content).datagrid("getChecked");
				if(selectedData.length == 0){
					alert("请选择要删除的反馈消息!");
					return;
				}
				bootbox.confirm("该操作会删除所选择的反馈消息，确定要删除吗？", function(result) {
						if(result == true){
							alert("确认删除！");
						}
					});
				}); 
			
			var $toolbar = [$addNewGroupBtn,$deleteButton];
			
			$(".dorm-feedback-datagrid", $content).datagrid({
				url:'testdata/dorm-feedback-list.json',
				toolbar:$toolbar,
				columns:[
							{field:'message',title:'反馈内容',width:'400px',formatter: function(value,row,index){
								var $str = $('<button type="button" class="btn btn-default btn-noboder-inrow btn-noboder view-group">').text(value).click(function(){
									var rowData = $(this).closest("tr").data("data");
									$(".dorm-feedback-datagrid", $content).slidecontent({
										url:'dormitory.dormfeedbackmodule.viewfeedback.html',
										queryParams:{},
										callback:function($subitem){
											
											$subitem.find(".btn-back").click(function(){//返回按钮操作
												$(".dorm-feedback-datagrid", $content).slidecontent("showmain");
											}).end().find(".send-message").click(function(){//点击按钮发送消息
												sendMessage();
											}).end().find(".message-content").ctrlSubmit(function(event){//ctrl+enter发送消息
												sendMessage();
											});
											
											function sendMessage(){
												var val = $subitem.find(".message-content").val();
												if(val.length == 0){
													alert("请输入消息！");
													return;
												}
												var $messageContainer = $subitem.find(".message-container");
											      var $messageItem = $('<div class="form-group message-item my-message">');
											      var $messageContent = $('<div class="my-message inf_con_box bdr_r inf_con inf_con_wid">').text(val);
											      var $messageTime = $('<div class="pull-left inf_time_wid padl_15">').html('<span class="loading-icon" style="float:right;"></span>');
											      
											      setTimeout(function(){
											    	  //TODO 模拟等待时间，改为ajax发送数据，该代码放到ajax的success操作里。
											    	  $messageTime.text(new Date().format('yyyy-mm-dd hh:mm'));
											      },1500);
											      $messageItem.append($messageContent).append($messageTime).appendTo($messageContainer);
											      $subitem.find(".message-content").val("");
											}
										}
									});
									$(".dorm-feedback-datagrid", $content).slidecontent("showsub");
								});
								
								return $str;
							}},
							{field:'sender',title:'反馈人',width:'80px'},
							{field:'receiver',title:'接收人'},
							{field:'feedback-time',title:'反馈时间'}
						]
			
			});
		}
	}
})();

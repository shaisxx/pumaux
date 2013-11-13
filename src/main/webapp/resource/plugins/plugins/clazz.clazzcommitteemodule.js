;(function(){
	"use strict"; // jshint ;_;
	
	$.clazz.clazzcommitteemodule = {
			url : "clazz.clazzcommitteemodule.html",
			modulehash : '#module=clazz.clazzcommitteemodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			buildClazzCommitteeGrid($content);
		}
	}
	
	function buildClazzCommitteeGrid($content){
		//新增班委成员
		var $addNewMemberBtn = $('<button type="button" class="btn btn-success create-group"><span style="font-weight:bold;">+</span>&nbsp; 新增班委成员</button>').click(function(){
			var id = $.util.generateRandomString(5);
			var option = {
				id: id,
				url: 'clazz.clazzcommitteemodule.newmember.html',
				width: '550px',
				callback: function($modal){
					$('.selectpicker',$modal).selectpicker();
					
					$modal.on('click', '.save', function(){
					alert("save");
					$modal.find("button[data-dismiss='modal']").click();
				});}
			};
			$.ajaxModal(option);
		});
		
		var $toolbar = [$addNewMemberBtn];
		
		$(".clazz-committee-datagrid", $content).datagrid({
			url:'testdata/clazz-committee-list.json',
			toolbar:$toolbar,
			columns:[
						{field:'name',title:'姓名',width:'120',formatter: function(value,row,index){
							var $str = $('<button type="button" class="btn btn-primary btn-xs view-group">').text(value).click(function(){
								var rowData = $(this).closest("tr").data("data");
								$(".clazz-committee-datagrid", $content).slidecontent({
									url:'clazz.clazzcommitteemodule.editmember.html',
									queryParams:{id:rowData.id},
									callback:function($subitem){
										$(".btn-back",$subitem).click(function(){
											$(".clazz-committee-datagrid", $content).slidecontent("showmain");
										});
										
										$('.selectpicker',$subitem).selectpicker();
										
										
										$('.save',$subitem).click(function(){
											alert("保存团员信息");
										});
									}
								});
								$(".clazz-committee-datagrid", $content).slidecontent("showsub");
							});
							
							return $str;
						}},
						{field:'student-no',title:'学号',width:'120px'},
						{field:'position',title:'职位'},
						{field:'teacher',title:'班主任'}
					]
		
		});
	}
})();

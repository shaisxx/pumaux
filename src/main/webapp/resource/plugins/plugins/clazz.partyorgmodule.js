;(function(){
	"use strict"; // jshint ;_;
	
	$.clazz.partyorgmodule = {
			url : "clazz.partyorgmodule.html",
			modulehash : '#module=clazz.partyorgmodule|{}',
			init:init
	};
	
	function init(param){
		var contentId = param.contentId;
		var $content = $('#'+contentId);
		if($content.length > 0){
			buildPartyOrgGrid($content);
		}
	}
	
	function buildPartyOrgGrid($content){
		
		//var $toolbar = [$clazzGroup];
		
		$(".clazz-partyorg-datagrid", $content).datagrid({
			url:'testdata/clazz-partyorg-list.json',
			//toolbar:$toolbar,
			columns:[
						{field:'name',title:'姓名',width:'120',formatter: function(value,row,index){
							var $str = $('<button type="button" class="btn btn-primary btn-xs view-group">').text(value).click(function(){
								var rowData = $(this).closest("tr").data("data");
								$(".clazz-partyorg-datagrid", $content).slidecontent({
									url:'clazz.partyorgmodule.edit.html',
									queryParams:{id:rowData.id},
									callback:function($subitem){
										$(".btn-back",$subitem).click(function(){
											$(".clazz-partyorg-datagrid", $content).slidecontent("showmain");
										});
										
										$('.selectpicker',$subitem).selectpicker();
										
										//初始化新建考勤页面的日期选择器，并赋值到当前日期
										$subitem.find(".datepicker").datepicker({
											format:'yyyy-mm-dd'
										}).on('changeDate', function(ev){
											$subitem.find(".datepicker").datepicker('hide');
										}).datepicker('setValue', new Date());
										
										$('.save',$subitem).click(function(){
											alert("保存团员信息");
										});
									}
								});
								$(".clazz-partyorg-datagrid", $content).slidecontent("showsub");
							});
							
							return $str;
						}},
						{field:'student-no',title:'学号',width:'120px'},
						{field:'type',title:'类别',width:'120px'},
						{field:'position',title:'职位'}
					]
		
		});
	}
})();

;(function($){
	"use strict"; // jshint ;_;
	
	$.initExtensionPoints = function(){
		$.demo = {
				title : "UI控件Demo",
				closable : true,
				defaultmodule:"demomodule"
		};
		$.welcome = {
				title : "首页",
				closable : false,
				defaultmodule:"welcomemodule"
		};
		$.sysconfig = {
				title : "设置",
				closable : true,
				defaultmodule:"pageconfigmodule"
		};
		$.group = {
				title : "社团管理",
				closable : true,
				defaultmodule:"groupmodule"
		};
		$.dormitory = {
				title : "宿舍管理",
				closable : true,
				defaultmodule:"groupmodule"
		};
		$.space = {
				title : "个人空间",
				closable : true,
				defaultmodule:"groupmodule"
		};
		$.clazz = {
				title : "班级管理",
				closable : true,
				defaultmodule:"clazzstudentmodule"
		};
		$.community = {
				title : "社团管理",
				closable : true,
				defaultmodule:"groupmodule"
		};
		$.statistics = {
				title : "统计汇总",
				closable : true,
				defaultmodule:"basicmodule"
		};
	};
})(jQuery);
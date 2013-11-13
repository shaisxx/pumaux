/**************************************************************************
 * 
 * 					Framework init js
 * 
 * 1. Variables declaration
 * 2. framework js API 
 * 3. framework js utils
 * 4. private functions 
 * 5. utils functions
 * 
 * @author wangfan
 * @date 2013-3-23
 * @version 1.0
 * 
 ************************************************************************* */

/**
 * The semi-colon before the function invocation is a safety
 * net against concatenated scripts and/or other plugins
 * that are not closed properly.
 */
/**
 * 
 * 统一处理ajax事件
 * 
 * */
/*;(function($){  
	$.ajaxSetup({
		"contentType": "application/x-www-form-urlencoded; charset=UTF-8",
		 type: "POST"
	});

	
    var ajax=$.ajax;  
    $.ajax=function(s){  
    	//console.log(s);
    	//console.log(s.error);
        var old=s.error;  
        var oldSuccess = s.success;
        
        s.beforeSend=function(){
        	$.loading("正在加载...");
        };
        s.complete=function(){
        	$.unloading();
        };
        s.success=function(msg){
        	if(msg != undefined){
        		if(msg.status != undefined && (msg.status == "error" || msg.status == "warning")){
        			$.messaging(msg.message,"false",5000);
        		}
        	}
        	if(oldSuccess != undefined){
        		oldSuccess(msg);
			}
        };
        //var errHeader=s.errorHeader||"Error-Json";  
        s.error=function(XMLHttpRequest, textStatus, errorThrown){  
            //var errMsg = window["eval"]("(" + xhr.getResponseHeader(errHeader) + ")");
        	$.unloading();
			if(XMLHttpRequest.status == 403){
				$.messaging("您没有该权限！","false",5000);
				if($(".panel-loading").length > 0){
					var forbiden = $("<div>").addClass("forbidenDiv")
					.append($("<p>").addClass("forbidenP").append($("<img>").attr("src","resources/themes/img/forbidden.jpg"))) 
					.append($("<p>").addClass("forbidenP").html("您没有该权限!"));
					$(".panel-loading").removeClass("panel-loading").html(forbiden);
				}
			}else if(XMLHttpRequest.status == 800){//session kick out status
				$.messaging("您已经在其它地方登陆,5秒后返回登录页！","false",5000);
				setTimeout(function(){
					location.href = "login.html?status=800";
				}, 5000);
				if($(".panel-loading").length > 0){
					var forbiden = $("<div>").addClass("forbidenDiv")
					.append($("<p>").addClass("forbidenP").append($("<img>").attr("src","resources/themes/img/forbidden.jpg"))) 
					.append($("<p>").addClass("forbidenP").html("您已经在其它地方登陆,5秒后返回登录页"));
					$(".panel-loading").removeClass("panel-loading").html(forbiden);
				}
			}else if(XMLHttpRequest.status == 801){//session timeout status
				$.messaging("会话已经过期,5秒后返回登录页！","false",5000);
				setTimeout(function(){
					location.href = "login.html?status=801";
				}, 5000);
				if($(".panel-loading").length > 0){
					var forbiden = $("<div>").addClass("forbidenDiv")
					.append($("<p>").addClass("forbidenP").append($("<img>").attr("src","resources/themes/img/forbidden.jpg"))) 
					.append($("<p>").addClass("forbidenP").html("会话已经过期,5秒后返回登录页!"));
					$(".panel-loading").removeClass("panel-loading").html(forbiden);
				}
			}else if(XMLHttpRequest.status == 803){//user not login but want to access resources
				$.messaging("您还没有登录,5秒后返回登录页！","false",5000);
				setTimeout(function(){
					location.href = "login.html?status=801";
				}, 5000);
				if($(".panel-loading").length > 0){
					var forbiden = $("<div>").addClass("forbidenDiv")
					.append($("<p>").addClass("forbidenP").append($("<img>").attr("src","resources/themes/img/forbidden.jpg"))) 
					.append($("<p>").addClass("forbidenP").html("会话已经过期,5秒后返回登录页!"));
					$(".panel-loading").removeClass("panel-loading").html(forbiden);
				}
			}else if(XMLHttpRequest.status == 500){//server internal error
				$.messaging("系统错误","false",5000);
				if($(".panel-loading").length > 0){
					var forbiden = $("<div>").addClass("forbidenDiv")
					.append($("<p>").addClass("forbidenP").append($("<img>").attr("src","resources/themes/img/forbidden.jpg"))) 
					.append($("<p>").addClass("forbidenP").html("系统错误!"));
					$(".panel-loading").removeClass("panel-loading").html(forbiden);
				}
			}
		
			
            //old(xhr,status,errMsg||err);  
			if(old != undefined){
				old(XMLHttpRequest, textStatus, errorThrown);
			}
        };
        ajax(s);  
    };
  
})(jQuery);*/

var AC = new Object();
var w_width,w_height = 0;
;(function($){  
	
	//used to store messaging timer
	var messagingTimer = new Array();
	/********************************************************/
	/*                2. Puma framework js API              */
	/********************************************************/
	
	/**
	 * $.loading方法是用来在界面的左上角显示加载的信息
	 * 
	 * @param title	需要显示的加载信息
	 * 
	 * @since 1.0
	 * */
	$.loading = function(title) {
		_loading(title);
	};
	
	/**
	 * $.unloading方法是去掉在界面的左上角显示加载的信息
	 * 
	 * @since 1.0
	 * */
	$.unloading = function(){
		_unloading();
	};
	
	/**
	 * $.messaging方法是用来在界面的正上方显示提示信息
	 * 
	 * 调用方式比较灵活：
	 * 1. $.messaging("hello world");显示hello world 2秒
	 * 2. $.messaging("hello world",true);显示hello world 2秒，背景为绿色
	 * 3. $.messaging("hello world",5000);显示hello world 5秒
	 * 4. $.messaging("hello world",true,5000);显示hello world 5秒， 背景为绿色
	 * 
	 * @param title	需要显示的信息
	 * @param bool success	参数类型为布尔类型，是否显示为成功的样式，即背景为绿色， 默认值为false，意思为普通信息提示。
	 * @param number time	停留时间，默认为2000毫秒
	 * 
	 * @since 1.0
	 * */
	$.messaging = function(title, success, time) {
		_messaging(title, success, time);
	};
	
	/**
	 * $.unloading方法是去掉界面正上方的信息提示
	 * 
	 * @since 1.0
	 * */
	$.unmessaging = function(){
		_unmessaging();
	};
	
	/********************************************************/
	/*                3. Puma framework js utils            */
	/********************************************************/
	$.util = {};
	/**
	 * $.isEmptyObj方法是用来判断一个对象是否有值。
	 * 
	 * 比如var obj = {};那么 $.isEmptyObj(obj)返回的值就是true, 
	 * 如果var obj = {"data":"value"},那么返回值就是false
	 * 
	 * @param obj	需要判断的对象
	 * 
	 * @since 1.0
	 * */
	$.util.isEmptyObj = function(obj){
		return _isEmptyObj(obj);
	};
	
	/**
	 * $.util.json2str方法是将JSON对象转成字符串
	 * 因为IE7不支持JSON.stringify(json)方法，所以添加该方法
	 * 
	 * @param obj	需要转型的JSON对象
	 * 
	 * @since 1.0
	 * */
	$.util.json2str = function(obj){
		return _json2str(obj);
	};
	
	/**
	 * $.generateRandomString方法用来产生随机字符串。
	 * 
	 * @param length	要产生随机串的长度，如果不设置该参数，会自动产生长度为32的随机字符串
	 * 
	 * @since 1.0
	 * */
	$.util.generateRandomString = function(length){ 
	    length = length || 32; 
	    //var source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`0123456789-=//[];',./~!@#$%^&*()_+|{}:/<>?"; 
	    var source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    var s = ""; 
	    for(var i = 0;i < length; i++)  { 
	        s += source.charAt(Math.ceil(Math.random()*1000)%source.length); 
	    }
	    return s; 
	};
	
	
	/********************************************************/
	/*                Puma utils functions              */
	/********************************************************/
	function _isEmptyObj(obj){
		var n = 0;
		for(i in obj){
			n++;
			if(n > 0){
				break;
			}
		}
		return n == 0;
	}
	
	function _loading(title) {
		if($("#loading-indicator").length == 0)
		{
			$("<div>").addClass("loading-indicator").attr("id","loading-indicator")
				.append($("<span>").addClass("loading-icon"))
				.append($("<span>").addClass("loading-text"))
				.appendTo("body");
		}
		$("span.loading-text",$("#loading-indicator")).html(title);
		$("#loading-indicator").fadeIn();
	};
	
	function _unloading(){
		$("#loading-indicator").fadeOut();
	};
	
	function _messaging(title, success, time) {
		if(success && typeof(success) == "number"){
			time = success;
		}
		if(!time){
			time = 2000;
		}
		if($("#messaging-indicator").length == 0)
		{
			$("<div>").attr("id","messaging-indicator")
				.html(title)
				.appendTo("body");
		}
		
		$("#messaging-indicator").removeClass("messaging-indicator-suc").addClass("messaging-indicator-normal");
		
		if(success){
			$("#messaging-indicator").removeClass("messaging-indicator-normal").addClass("messaging-indicator-suc");
		}
		$("#messaging-indicator").html(title);
		var w = $(window).width();
		var w2 = $("#messaging-indicator").width();
		var left = (w-w2)/2;
		$("#messaging-indicator").css("left",left).slideDown("fast");
		
		if(messagingTimer.length>0){
			clearTimeout(messagingTimer[0]);
			messagingTimer.pop();
		}
		var id = setTimeout(function(){
			_unmessaging();
			messagingTimer.pop();
		}, time);
		messagingTimer.push(id);
	};
	
	function _unmessaging(){
		$("#messaging-indicator").slideUp();
	};
	
	function _json2str(o) {
	    var arr = [];
	    var fmt = function(s) {
	        if (typeof s == 'object' && s != null) return json2str(s);
	        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	     };
	    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	    return '{' + arr.join(',') + '}';
	 }
	
	function _json2str2(o) {
	   var arr = [];
	   var fmt = function(s) {
	       if (typeof s == 'object' && s != null) return json2str(s);
	       return /^(string|number)$/.test(typeof s) ? s : s;
	    };
	   for (var i in o) arr.push(i + ":" + fmt(o[i]));
	   return '{' + arr.join(',') + '}';
	}
	
})(jQuery);

;(function($, window, document, undefined){
	/********************************************************/
	/*               1. Puma Variables declaration          */
	/********************************************************/
	$.checkWindowSize = function() {
		_checkWindowSize();
	};
	
	$.changeSelectedTabTitle = function(title) {
		_changeSelectedTabTitle(title);
	};
	
	$.addTemplate = function(templateId, html){
		_addTemplate(templateId, html);
	};
	
	$.getTemplateById = function(templateId){
		return _getTemplateById(templateId);
	};
	
		
	//var pluginPath = "resource/plugins/plugins/",
	
	templateManager = new Map();
	
	tabIdPrefix = "tab-",
	
	//menuIdPrefix = "menu-";
	
	contentIdPrefix = "content-";
	
	//used to store system preopened plugins
	var preOpenedModulesHash = ['#module=welcome.welcomemodule|{param1:"1",param2:"2"}'];
	
	/********************************************************/
	/*                 4. Puma private functions            */
	/********************************************************/
	
	function _closeTab($tab, tabId){
		var $childSize = $tab.find("li");
		var len = $childSize.size();
		for(var i = 0; i <len; i++){
			var options = $($childSize[i]).data("data");
			if(options && options.id){
				if(options.id == tabId){
					$($childSize[i]).remove();
				}
			}
		}
		return false;
	}
	
	function _addNewTab($tab, customOptions){
		var defaultOption = {
				id: null,
				closable: false,
				title: '',
				iconCls: null,
				modulehash : null,
				iconAlign: 'left'
			};
		var options = $.extend({}, defaultOption, customOptions);
		var $str = $('<li><a href="#" data-toggle="tab">'+options.title+'</a></li>');
		if(options.closable == true){
			$str.append('<b class="icon-minus-sign-alt close-tab-btn"></b>');
		}
		var target = "#appTabNav .nav li a.config-dropdown";
		$str.insertBefore($(target).parent()).data("data", options);
		
		//add nav dropdown sub menu
		var $dropDownItem = $('<li class="nav-dropdown-menu"><a class="sub-menu-tab" a href="#"><span>'+options.title+'</span></a></li>').data("data", options);
		if(options.closable == true){
			$dropDownItem.find("a").prepend('<b class="icon-remove hover-close-action" title="点击关闭"></b>');
			$dropDownItem.appendTo($("#appTabNav ul.nav-tabs ul.dropdown-menu"));
		}else{
			$dropDownItem.insertBefore($("#appTabNav ul.nav-tabs ul.dropdown-menu li.closable-section"));
		}
		
	}
	
	$('#appTabNavDropdwon').on('show.bs.dropdown', function () {
		var selectedTabOption = $("#appTabNav .nav li.active").data("data");
		var title = $("#appTabNav .nav li.active").text();
		var dropdownList = $('#appTabNavDropdwon').find("li.nav-dropdown-menu");
		for(var i = 0; i < dropdownList.size(); i++){
			var option = $(dropdownList[i]).data("data");
			if(option){
				if(option.id == selectedTabOption.id){
					$(dropdownList[i]).find("a").prepend('<b class="icon-hand-right icon-indicator"></b>').find("span").text(title);
				}
			}
		}
	});
	$('#appTabNavDropdwon').on('hide.bs.dropdown', function () {
		$("#appTabNavDropdwon b.icon-hand-right").remove();
	});
	
	function _changeSelectedTabTitle(title){
		$("#appTabNav ul.nav-tabs > li.active > a[data-toggle='tab']").html(title);
	}
	
	function _selectTab($tab, customOptions){
		if(customOptions){
			if(customOptions.id){
				var tabIndex = _getTabIndexById($tab, customOptions.id);
				if(tabIndex >= 0){
					$('li:eq('+tabIndex+') a',$tab).tab('show');
					$('li:eq('+tabIndex+')',$tab).data("data",customOptions);
				}else{
					_addNewTab($tab, customOptions);
					_selectTab($tab, customOptions);
				}
			}
		}
	}
	
	function _selectMenu(hash){
		if(hash){
			var obj = _getParamObjFromHash(hash);
			
			var $sideMenuList = $("#appSideNav ul.nav > li");
			$sideMenuList.each(function(){
				var href = $("a",$(this)).attr("href");
				var obj2 = _getParamObjFromHash(href);
				if(obj2.appName == obj.appName){
					if(!$(this).hasClass("active")){
						$(this).addClass("active");
						$("a",$(this)).focus();
					}
				}else{
					if($(this).hasClass("active")){
						$(this).removeClass("active");
					}
				}
			});
			
			var $moduleMenuList = $("section.gallery.header-nav > ul > li");
			$moduleMenuList.each(function(){
				var href = $("a",$(this)).attr("href");
				var obj2 = _getParamObjFromHash(href);
				if(obj2.appName == obj.appName && obj2.moduleName == obj.moduleName){
					if(!$(this).hasClass("active")){
						$(this).addClass("active");
						$("a",$(this)).addClass("glow").focus();
					}
				}else{
					if($(this).hasClass("active")){
						$(this).removeClass("active");
						$("a",$(this)).removeClass("glow");
					}
				}
			});
		}
	}
	
	function _getTabIndexById($tab, id){
		var $childSize = $tab.find("li:not(.nav-dropdown-menu)");
		var len = $childSize.size();
		for(var i = 0; i <len; i++){
			var options = $($childSize[i]).data("data");
			//console.log(options.id +"======="+id);
			if(options){
				if(options.id == id){
					return i;
				}
			}
		}
		return -1;
	}
	
	function _loadPreloadModule(title){
		for(var i = 0; i < preOpenedModulesHash.length; i ++){
			var hash = preOpenedModulesHash[i];
			var obj = _getParamObjFromHash(hash);
			
			var tid = obj.appName + "-" + obj.moduleName;
			if(obj.paramObj){
				if(obj.paramObj.id){
					tid += "-"+obj.paramObj.id;
				}
			}
			var appObj = eval("$."+obj.appName);
			var option = {
					id : tabIdPrefix + tid,
					closable: false,
					title: appObj.title,
					modulehash : hash
				};
			if(title && typeof option == 'string'){
				option.title = title;
			}
			_addNewTab($("#appTabNav ul.nav-tabs"), option);
		}
	}
	
	//一般在第一次初始化的时候，有可能设定isLoadContent为false，基本情况下都是不用设置，默认为true
	function _loadModule(title){
		//TODO 验证是否合法app module，不然会发送404的js请求
		
		var obj = _getParamObjFromHash(location.hash);
		
		var tid = obj.appName + "-" + obj.moduleName;
		if(obj.paramObj){
			if(obj.paramObj.id){
				tid += "-"+obj.paramObj.id;
			}
		}
		
		var contentId = contentIdPrefix+tid;
		var tabId = tabIdPrefix + tid;
		var $content = $("#"+contentId);
		
		var appObj = eval("$."+obj.appName);
		
		var tabOptions = {
			id : tabId,
			closable : appObj.closable,
			title : appObj.title,
			modulehash : location.hash
		};
		if(title && typeof title == 'string'){
			tabOptions.title = title;
		}
		if(obj.paramObj && obj.paramObj.title){
			tabOptions.title = obj.paramObj.title;
		}
		
		var moduleObj = eval("$."+obj.appName+"."+obj.moduleName);
		if(!moduleObj){
			pumaloader.load([obj.appName + "."+obj.moduleName], function(){
				/*jQuery.parser.parse();*/
				moduleObj = eval("$."+obj.appName+"."+obj.moduleName);
				__load(moduleObj, contentId, obj);
			});
		}else{
			__load(moduleObj, contentId, obj);
		}
		
		function __load(moduleObj, contentId, obj){
			_selectTab($("#appTabNav ul.nav-tabs"), tabOptions);
			if($content.length > 0){
				//select content
				$("body > #appMainContent > .app-main-stack:visible").hide().find("form.parsley-form").parsley( 'destroy' );
				$content.show();
				
				_checkWindowSize();
				_selectMenu(location.hash);
			}else{
				_loadUrlFromModule(moduleObj, contentId, obj);
			}
		}
	}
	
	function _addTemplate(templateId, html){
		var tempId = $.util.generateRandomString(5);
		templateManager.put(templateId, tempId);
		$("<div id="+tempId+">").append(html).appendTo($("#templateHolder"));
	}
	
	function _getTemplateById(templateId){
		var tempId = templateManager.get(templateId);
		if( tempId != null){
			var $templateHtml = $("#"+tempId, $("#templateHolder"));
			if($templateHtml.length > 0 ){
				return  $templateHtml[0];
			}else{
				return undefined;
			}
		}
		return undefined;
	}
	
	function _loadUrlFromModule (moduleObj, contentId, obj){
		/*var templateId = "template-"+obj.appName+"-"+obj.moduleName;
		var html = _getTemplateById(templateId);
    	if(html){
    		__initModule(moduleObj, html);
    	}else{*/
    		if(moduleObj.url){
    			$("#appMainContent").addClass("gif");
    			$.ajax( {
        	        "dataType": 'html',
        	        "url": moduleObj.url,
        	        "success": function(data){
        	        	__initModule(moduleObj, data);
        	        	//_addTemplate(templateId, data);
        	        	$("#appMainContent").removeClass("gif");
        	        },
        	        "error":function(data){
        	        	$("#appMainContent").removeClass("gif");
        	        	alert("加载系统模块失败,请手动刷新后重试！");
        	        	return;
        			}
        	      } );
    		}else{
    			__initModule(moduleObj);
    		}
    	//}
    	
    	function __initModule(moduleObj, html){
    		if(html){
    			$("<div>").attr("id",contentId).attr("class","app-main-stack").append(html).appendTo($("#appMainContent")).find("form.parsley-form").parsley();
            	$("body > #appMainContent > .app-main-stack:visible").hide().find("form.parsley-form").parsley( 'destroy' );
            	$("#"+contentId).show();
            	
            	$('div.scrollable',$("#"+contentId)).on('scroll',function(e){
					var top = $(this).scrollTop();
			  		if(top > 0){
			  			$(this).css("box-shadow","0 2px 5px rgba(0, 0, 0, 0.176) inset");
			  		}else{
			  			$(this).css("box-shadow","none");
			  		}
			  	});
            	
            	_checkWindowSize();
    		}
        	
        	if(moduleObj.init){
        		obj.contentId = contentId;
				moduleObj.init(obj);
			}
        	
        	_selectMenu(location.hash);
    	}
	};
	
	function _getParamObjFromHash(hash){
		//example hash: #module=moduleName|{param1:"1",param2:"2"}
		var paramObj = new Object();
		paramObj.appName = "welcome";
		paramObj.moduleName = "welcomemodule";
		paramObj.paramObj = null;
		hash = $.trim(hash);
		
		if(hash.substring(0,1) == "#"){
			hash = hash.substring(1, hash.length);
	    }
		if(hash.indexOf("|") == -1){
			return paramObj;
		}
		var arr = hash.split("|");
		var moduleNameString = arr[0];
		var paramString = arr[1];
		
		if(moduleNameString.indexOf("=") != -1){
			moduleNameString = moduleNameString.split("=")[1];
			if(moduleNameString.indexOf(".") != -1){
				paramObj.appName =  moduleNameString.split(".")[0];
				paramObj.moduleName =  moduleNameString.split(".")[1];
			}
		}
		
		try {
			eval("var theJsonValue = "+paramString);
			if($.util.isEmptyObj(theJsonValue)){
				paramObj.paramObj = null;
			}else{
				paramObj.paramObj = theJsonValue;
			}
		}catch(e) {
		  console.error(e);
    	  alert("The parameter used to initialize module "+ paramObj.moduleName + ". The passed parameter in hash is not a valid JSON format. Please check it and repass the initialize parameter.");
    	}
		return paramObj;
	}
	
	
  	function _checkWindowSize(e){
  		var w_w =  $(window).width(),
			w_h = $(window).height();
  		
  		//有时候尺寸不变的时候，也需要重新计算尺寸，如果要强制刷新，要加入force：true参数
  		if(e){
  			var obj = e[0];
  			if(obj){
  				if(!obj.force){
  					if(w_w == w_width && w_h == w_height){
  			  			return;
  			  		}
  				}
  			}
  		}
  		
  		w_width = w_w;
  		w_height = w_h;
  			
  		var $sidebar = $("#appSideNav");
  		var $target = $("body > #appMainContent > .app-main-stack:visible");
  		var height = $(window).height();
  		$sidebar.find("nav.viewport").height(height - $("#appHeader").outerHeight(true));
  		//_initSideScrollbar();
  		$sidebar.tinyscrollbar_update();
  		
  		var offset = 0;
  		if($("#appHeader").is(":visible")){
  			offset = $("#appHeader").outerHeight(true);
  		}
  		//not count it when tab is hide
  		if($("#appTabNav").is(":visible")){
  			offset += $("#appTabNav").outerHeight(true);
  		}
  		height = height - offset;
  		
  		if($target.outerHeight(true) != height){
  			$target.height(height);
  		}
  		
  		var $stackContent = $(".stack-content",$target);
  		if($stackContent.length > 0){
  			var stackContentHeight = $target.outerHeight(true)-90;
  	  		$stackContent.height(stackContentHeight);
  		}
  		
  		var $pContent = $(".page-content",$target);
  		if($pContent.length > 0){
  			var pageContentHeight = $pContent.parent().outerHeight(true);
  			
  			if($(".page-toolbar",$target).length > 0){
  				pageContentHeight = pageContentHeight - $(".page-toolbar",$target).outerHeight(true);
  			}
  	  		$pContent.height(pageContentHeight);
  		}
  		
  		var $subitem = $(".sub-item",$target);
  		if($subitem.length > 0){
  			$subitem.height($subitem.prev(".main-item").outerHeight(true));
  		}
  		
  		//$(".puma-datagrid",$("body > #appMainContent > .app-main-stack:visible")).trigger("resize");
  		
  		//_selectMenu(location.hash);
  	}
  	
  	function _initNavListener(){
		var selectTarget = "#appTabNav .nav li a:not(.config-dropdown), #appSideNav .nav-primary li a, div.metro-item";
		$(document).on('click', selectTarget , function(e){
	  		e && e.preventDefault();
	  		
	  		if($(this).parent("li").data("data")){
	  			
	  		}
	  		var hash =  $(this).attr("hash");
	  		if(!hash){
	  			if($(this).parent("li").data("data")){
	  				hash = $(this).parent("li").data("data").modulehash;
	  			}
	  		}
	  		if(hash){
	  			location.hash = hash;
	  		}
	  	});
		
		var closeTarget = "#appTabNav .nav li > b.close-tab-btn, #appTabNav .nav li a > b.hover-close-action";
		$(document).on('click', closeTarget , function(e){
	  		e && e.preventDefault();
	  		var $tab = $("#appTabNav .nav");
	  		var tabId = null;
	  		if($(this).parent().is("li")){
	  			tabId = $(this).parent().data("data").id;
	  		}else if($(this).parent().is("a")){
	  			tabId = $(this).parent().parent().data("data").id;
	  		}
	  		if($("#appTabNav .nav > li.active").data("data").id == tabId){
	  			history.back();
	  			/*var options = $("#appTabNav .nav > li.active").prev("li").data("data");
	  			_selectTab($tab, options);*/
	  		}
	  		_closeTab($tab, tabId);
	  	});
		
		var closeAllTarget = "#appTabNav .nav li a.close-all-nav-tabs";
		$(document).on('click', closeAllTarget , function(e){
	  		e && e.preventDefault();
	  		_gotoHome();
	  		var $allClosableItems = $("#appTabNav ul.nav-tabs ul.dropdown-menu li.closable-section").nextAll("li");
	  		for(var i = 0; i < $allClosableItems.length; i ++){
	  			_closeTab($("#appTabNav .nav"), $($allClosableItems[i]).data("data").id);
	  		}
	  	});
	}
  	
  	function _gotoHome(){
  		location.hash = "#module=welcome.welcomemodule|{}"
  	}
  	
	function _initHashChangeListener(){
		$(window).hashchange( function(){
			_loadModule();
			
			//hide nav dropdown
			//$("#appTabNavDropdwon").removeClass("open");
			//$("#appTabNavDropdwon b.icon-hand-right").remove();
		});
		
	}
	
	function _parseOptions(target, properties){
		var t = $(target);
		var options = {};
		
		var s = $.trim(t.attr('data-options'));
		if (s){
			var first = s.substring(0,1);
			var last = s.substring(s.length-1,1);
			if (first != '{') s = '{' + s;
			if (last != '}') s = s + '}';
			options = (new Function('return ' + s))();
		}
			
		if (properties){
			var opts = {};
			for(var i=0; i<properties.length; i++){
				var pp = properties[i];
				if (typeof pp == 'string'){
					if (pp == 'width' || pp == 'height' || pp == 'left' || pp == 'top'){
						opts[pp] = parseInt(target.style[pp]) || undefined;
					} else {
						opts[pp] = t.attr(pp);
					}
				} else {
					for(var name in pp){
						var type = pp[name];
						if (type == 'boolean'){
							opts[name] = t.attr(name) ? (t.attr(name) == 'true') : undefined;
						} else if (type == 'number'){
							opts[name] = t.attr(name)=='0' ? 0 : parseFloat(t.attr(name)) || undefined;
						}
					}
				}
			}
			$.extend(options, opts);
		}
		return options;
	}
	
	function _checkMessage(){
		var $a = $("#appHeader > a.notification-menu-item");
		if($a.length == 1){
			var intervalId = setInterval(function(){
				var $i = $a.find("i");
				var c = $i.attr("class");
				switch(c){
				case 'icon-volume-off':
					$i.attr("class","icon-volume-down");
					break;
				case 'icon-volume-down':
					$i.attr("class","icon-volume-up");
					break;
				case 'icon-volume-up':
					$i.attr("class","icon-volume-off");
					break;
				}
			},600);
			var s = $("#dd").html();
			console.log(s);
			var options = {html:true,trigger:"click",placement:"bottom",content: s};
			$a.popover(options).click(function(){
				$a.find("i").attr("class","icon-volume-up");
				window.clearInterval(intervalId);
			})/*.hover(function(){
				console.log(11);
				$(this).popover('show');
			},function(){
				console.log(22);
				$(this).popover('hide');
			})*/;
		}
	}
	
	function _initSystem(){
		$("#appSideNav").tinyscrollbar({autohide: true});
		$.ajax( {
	        "dataType": 'json',
	        "type":"post",
	       "url": 'get_user_permission_json.do',
	       // "url":'../testdata/ac.json',
	        "success": function(data){
	        	if(AC && data){
	        		AC = data[0];
	        		//console.log(AC.DormMgt.DormAttend.add);
	        	}
	        	$.initExtensionPoints();
	    		
	    		_initHashChangeListener();
	    		
	    		_initNavListener();
	    		
	    		_loadPreloadModule();
	    		
	    		_loadModule();
	    		
	    		$.unloading();
	    		
	    		if(window.Pace){
    				Pace.stop();
    				$(".loading-status",$("#loading-system")).text("加载完毕！");
    			}
	    		setTimeout(function(){
	    			$("#loading-system").fadeOut(500);
	    			//$("#loading-system").addClass("fadeOutRightBig animated");
	    		},500);
	    		_checkMessage();
	        },
	        "error":function(data){
	        	$.unloading();
	        	alert("用户权限加载失败,请刷新后重试！");
	        	return;
			}
	      } );
		
		$(document).on('click', function ( e ) {
			if($(e.target).is("label")){
				if(!$(e.target).attr("for")){
					$(e.target).attr("for","abc");
				}
				$("input",$(e.target)).click();
				e.stopPropagation();
			}
		});
		
		/*$(document).on('click', 'label>input', function ( e ) {
			e.stopPropagation();
		});*/
	  	/*$(window).resize(function(e) {
	  		_checkWindowSize(e);
	  	});*/
	  	$(window).resize( $.throttle( 250, function() {
	  		_checkWindowSize();
	  	} ) ); 
	}
	
	//Initializing of the Puma System
	$(document).ready(function() {
		_initSystem();
	});
	
	window.onbeforeunload = function(e){
		 e = e || window.event;
		  // 兼容IE8和Firefox 4之前的版本
		  if (e) {
		    e.returnValue = '确定退出学工系统吗?';
		  }
		  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
		  return '确定退出学工系统吗?';
	};
	
})(this.jQuery, window, document);

/**
 * 
 * 统一处理ajax事件
 * 
 * */


;(function($){  
	var $noauthString = '<div class="noauth" style="width:100%;height:100%;padding:50px;text-align:center;color:#5BC0DE">'
					+		'<h1>'
					+			'<i class="icon-lock"  data-dismiss="modal" style="font-size:100px;"></i>'
					+		'</h1>'
					+		'<h2 style="margin-bottom:40px;">'
					+		'您没有权限使用该功能！'
					+		'</h2>'
					+			'<a class="btn btn-lg btn-primary" href="./index.do" style="margin-right:20px;">'
					+				'<i class="icon-home" style="margin-right:10px;font-size:18px;"></i>'
					+				'返回首页'
					+			'</a>'
					+			'<a class="btn btn-lg btn-default" href="./login.do">'
					+				'<i class="icon-unlock" style="margin-right:10px;font-size:18px;"></i>'
					+				'重新登录'
					+			'</a>'
					+	'</div>';
    var ajax=$.ajax;  
    $.ajax=function(s){  
        var old=s.error;  
        var oldSuccess = s.success;
        s.success=function(msg){
        	if(msg != undefined){
        		//TODO 根据自己返回内容定义，可以有多个if
        		if(msg == "no-auth" || msg == "no-login"){
        			//TODO 可以返回到登录也，也可以使弹出登录窗口，目前选择跳转登录页面
        			/*$.messaging("您没有权限使用该模块,3秒后返回登录页！","false",3000);
        			setTimeout(function(){
        				window.location.href="./login.do";
        			}, 3000);*/
        			msg = $noauthString;
        		}
        	}
        	if(oldSuccess != undefined){
        		oldSuccess(msg);
			}
        };
        //var errHeader=s.errorHeader||"Error-Json";  
        s.error=function(XMLHttpRequest, textStatus, errorThrown){  
            //var errMsg = window["eval"]("(" + xhr.getResponseHeader(errHeader) + ")");
			if(XMLHttpRequest.status == 403){
				//TODO 出错代码可以集中写在这里
			}
		
            //old(xhr,status,errMsg||err);  
			if(old != undefined){
				old(XMLHttpRequest, textStatus, errorThrown);
			}
        };
        ajax(s);  
    };
  
})(jQuery);
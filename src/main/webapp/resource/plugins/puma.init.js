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
	
		
	var pluginPath = "resource/plugins/plugins/",
	
	templateManager = new Array();
	
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
				$(".app-main-stack:visible").hide();
				$content.show();
				
				_checkWindowSize();
			}else{
				_loadUrlFromModule(moduleObj, contentId, obj);
			}
		}
	}
	
	function _addTemplate(templateId, html){
		templateManager.push(templateId);
		$("<div id="+templateId+">").append(html).appendTo($("#templateHolder"));
	}
	
	function _getTemplateById(templateId){
		var $templateHtml = $("#"+templateId, $("#templateHolder"));
		if($templateHtml.length > 0 ){
			return  $templateHtml[0];
		}else{
			return undefined;
		}
	}
	
	function _loadUrlFromModule (moduleObj, contentId, obj){
		var templateId = "template-"+obj.appName+"-"+obj.moduleName;
		var html = _getTemplateById(templateId);
    	if(html){
    		__initModule(moduleObj, html);
    	}else{
    		if(moduleObj.url){
    			$.ajax( {
        	        "dataType": 'html',
        	        "url": moduleObj.url,
        	        "success": function(data){
        	        	__initModule(moduleObj, data);
        	        	_addTemplate(templateId, data);
        	        },
        	        "error":function(data){
        	        	alert("加载系统模块失败,请手动刷新后重试！");
        	        	return;
        			}
        	      } );
    		}else{
    			__initModule(moduleObj);
    		}
    	}
    	
    	function __initModule(moduleObj, html){
    		if(html){
    			$("<div>").attr("id",contentId).attr("class","app-main-stack").append(html).appendTo($("#appMainContent"));
            	
            	$(".app-main-stack:visible").hide();
            	$("#"+contentId).show();
            	_checkWindowSize();
    		}
        	
        	if(moduleObj.init){
        		obj.contentId = contentId;
				moduleObj.init(obj);
			}
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
	
  	function _checkWindowSize(){
  		var $target = $(".app-main-stack:visible");
  		var height = $(window).height();
  		var offset = $("#appHeader").height();
  		//not count it when tab is hide
  		if($("#appTabNav").is(":visible")){
  			offset += $("#appTabNav").height();
  		}
  		height = height - offset;
  		if($(".app-main-stack:visible").height() != height){
  			$target.height(height);
  		}
  		
  		_selectMenu(location.hash);
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
			$("#appTabNavDropdwon").removeClass("open");
			$("#appTabNavDropdwon b.icon-hand-right").remove();
			
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
	
	function _initSystem(){
		
		$.loading("系统加载中...");
		
		$.initExtensionPoints();
		
		_initHashChangeListener();
		
		_initNavListener();
		
		_loadPreloadModule();
		
		_loadModule();
		
	  	$(window).resize(function() {
	  		_checkWindowSize();
	  	});
	  	
	  	$.unloading();
		$.messaging("系统加载成功,进入系统!",true);
	}
	
	//Initializing of the Puma System
	$(document).ready(function() {
		_initSystem();
		
	});
})(this.jQuery, window, document);
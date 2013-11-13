(function(){
	var modules = {
		'jquery.ui.core':{
			js:'jquery/jquery.ui.core.min.js'
		},
		'jquery.ui.widget':{
			js:'jquery/jquery.ui.widget.min.js',
			dependencies:['jquery.ui.core']
		},
		'jquery.ui.mouse':{
			js:'jquery/jquery.ui.mouse.min.js',
			dependencies:['jquery.ui.widget']
		},
		'jquery.ui.draggable':{
			js:'jquery/jquery.ui.draggable.min.js',
			dependencies:['jquery.ui.mouse']
		},
		'jquery.ui.sortable':{
			js:'jquery/jquery.ui.sortable.min.js',
			dependencies:['jquery.ui.mouse']
		},
		'jquery.isotope':{
			js:'jquery/jquery.isotope.min.js',
			css:'isotope/isotope.css'
		},
		'jquery.easing':{
			js:'jquery/jquery.easing.1.3.js'
		},
		'jquery.metadata':{
			js:'ibutton/jquery.metadata.js'
		},
		'jquery.ibutton':{
			js:'ibutton/jquery.ibutton.js',
			css:'ibutton/jquery.ibutton.css',
			dependencies:['jquery.metadata','jquery.easing']
		},
		'jquery.mousewheel':{
			js:'jquery/jquery.mousewheel.js'
		},
		'jquery.event.move':{
			js:'jquery/jquery.event.move.js'
		},
		'jquery.tinyscroll':{
			js:'jquery/jquery.tinyscrollbar.js',
			css:'tinyscroll/jquery.tinyscroll.css',
			dependencies:['jquery.event.move']
		},
		'jquery.parsley.extend':{
			js:'validator/parsley.extend.js'
		},
		'jquery.parsley':{
			js:'validator/parsley.js',
			dependencies:['jquery.parsley.extend']
		},
		'hogan':{
			js:'typeahead/hogan-2.0.0.js'
		},
		'jquery.typeahead':{
			js:'typeahead/typeaheadmap.js',
			css:'typeahead/typeaheadmap.css',
			dependencies:['hogan']
		},
		'jquery.icheck':{
			js:'jquery/jquery.icheck.min.js',
			css:'icheck/square/blue.css'
		},
		'jquery.pin':{
			js:'jquery/jquery.pin.js'
		},
		'jquery.cascadingdropdown':{
			js:'jquery/jquery.cascadingdropdown.js'
		},
		'bootstrap':{
			js:'bootstrap/bootstrap.js',
			css:['bootstrap/buttons.css']
		},
		'bootstrap.editable':{
			js:'bootstrap/bootstrap-editable.js',
			css:'bootstrap/bootstrap-editable.css',
			dependencies:['bootstrap']
		},
		'bootstrap.modalmanager':{
			js:'bootstrap/bootstrap-modalmanager.js',
			//css:'bootstrap/bootstrap-modal-bs3patch.css',
			dependencies:['bootstrap']
		},
		'bootstrap.modal':{
			js:'bootstrap/bootstrap-modal.js',
			css:['bootstrap/bootstrap-modal.css','bootstrap/bootstrap-modal-bs3patch.css'],
			dependencies:['bootstrap.modalmanager']
		},
		'bootstrap.datepicker':{
			js:'bootstrap/bootstrap-datepicker.js',
			css:['bootstrap/datepicker.css'],
			dependencies:['bootstrap','bootstrap.datepicker.zhcn']
		},
		'bootstrap.bootbox':{
			js:'bootstrap/bootstrap-bootbox.js',
			dependencies:['bootstrap']
		},
		'metrojs':{
			js:'metrojs/MetroJs.min.js',
			css:'metrojs/MetroJs.min.css'
		},
		'parser':{
			js:'puma.parser.js'
		},
		'datagrid':{
			js:'pumaui/puma.datagrid.js',
			dependencies:[/*'bootstrap.select',*/'jquery.ui.draggable','jquery.ui.sortable','searchinput']
		},
		/* 统计部分新增 begin */
		'jquery.jqplot':{
				js:'jqplot/jquery.jqplot.min.js',
				css:['jqplot/jquery.jqplot.min.css']
			},
		'jquery.jqplot.barRenderer':{
			js:'jqplot/jqplot.barRenderer.min.js'
		},
		'jquery.jqplot.categoryAxisRenderer':{
			js:'jqplot/jqplot.categoryAxisRenderer.min.js'
		},
		'jquery.jqplot.pointLabels':{
			js:'jqplot/jqplot.pointLabels.min.js'
		},
		'jquery.jqplot.highlighter':{
			js:'jqplot/jqplot.highlighter.min.js'
		},
		'bootstrap.select2':{
			js:'bootstrap/select2.js',
			css:['bootstrap/select2.css'],
			dependencies:['bootstrap']
		},
		/* 统计部分新增 end */
		'slidecontent':{
			js:'pumaui/puma.slidecontent.js'
		},
		'searchinput':{
			js:'pumaui/puma.searchinput.js',
			dependencies:['jquery.cascadingdropdown']
		},
		'tagselect':{
			js:'pumaui/puma.tagselect.js',
			css:'puma.tagedit.css'
		},
		'pumabase':{
			js:'puma.app.js',
			css:'app.css',
			dependencies:['parser','bootstrap']
		},
		'extensisionpoints':{
			js:'plugins/extensionpoints.js'
		},
		'puma.init':{
			js:'puma.init.js',
			dependencies:['pumabase','extensisionpoints','jquery.tinyscroll','jquery.parsley']
		},
 		
	    'ckEditor':{
			js:'../../common/ckeditor/ckeditor.js'
			
		},
		'utils':{
			js:'../../common/js/utils.js'
		},
		'jquery.uploadify':{
			js:'../../common/js/jquery.mutiup.js',
			css:'../../../common/css/mutiup.css'
		},
		'uploadifysimple':{ //单独上传一个文件
			js:'../../common/js/jquery.uploadify.js',
			css:'../../../common/css/uploadify.css'
		},
		'ckup':{//ckEditor 富文本插件
			js:'../../common/js/ckup.js',
			dependencies:['ckEditor','jquery.uploadify','utils']
		},
		'page.util':{
			js:'../../common/js/page.util.js'
		},
		
		
		/*********below are custom modules************/
		'welcome.welcomemodule':{
			js:'plugins/welcome.welcomemodule.js',
			css:'welcome.welcomemodule.css',
			dependencies:['puma.init','metrojs']
		},
		'demo.demomodule':{
			js:'plugins/demo.demomodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect']
		},
		'sysconfig.pageconfigmodule':{
			js:'plugins/sysconfig.pageconfigmodule.js',
			dependencies:['puma.init']
		},
		'group.groupmodule':{
			js:'plugins/group.groupmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect','bootstrap.editable']
		},
		'group.groupinfoviewmodule':{
			js:'plugins/group.groupinfoviewmodule.js',
			dependencies:['puma.init']
		},
		
		/**个人空间**/
		//个人信息
		'space.personalmodule':{
			js:'plugins/space/space.personalmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'bootstrap.editable','bootstrap.datepicker']
		},
		//任务管理
		'space.taskmodule':{
			js:'plugins/space/space.taskmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','slidecontent', 'searchinput','bootstrap.datepicker']
		},
		//职业生涯辅导管理
		'space.careercoachmodule':{
			js:'plugins/space/space.careercoachmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','slidecontent', 'searchinput','bootstrap.datepicker',
			              'jquery.icheck']
		},
		//模拟招聘
		'space.recruitmodule':{
			js:'plugins/space/space.recruitmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','slidecontent', 'searchinput']
		},
		
		//通知公告
		'space.noticemodule':{
			js:'plugins/space/space.noticemodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
			             'slidecontent', 'searchinput', 'tagselect', 'ckup', 'bootstrap.datepicker']
		},
		
		//消息中心
		'space.messagecentermodule':{
			js:'plugins/space/space.messagecentermodule.js'
		},
		
		/** 宿舍管理 **/
		'dorm.attendmodule':{
			js:'plugins/dorm/dorm.attendmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect','jquery.ibutton','jquery.isotope','bootstrap.datepicker','jquery.pin']
		},
		'dorm.brokemodule':{
			js:'plugins/dorm/dorm.brokemodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		'dorm.evaluatemodule':{
			js:'plugins/dorm/dorm.evaluatemodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		//宿舍情况反馈
		'dorm.feedbackmodule':{
			js:'plugins/dorm/dorm.feedbackmodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect','jquery.typeahead']
		},
		//宿舍管理
		'dorm.managermodule':{
			js:'plugins/dorm/dorm.managermodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect','jquery.typeahead']
		},
		'dorm.showmodule':{
			js:'plugins/dorm/dorm.showmodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.editable']
		},
		
		/** 班级事务 **/
		
		'clazz.clazzstudentmodule':{//班务管理-班级学生管理
			js:'plugins/clazz/clazz.clazzstudentmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','slidecontent','searchinput','tagselect',
			              'bootstrap.datepicker','page.util']
		},
		/** 党团组织 **/
		'clazz.partydutymodule':{
			js:'plugins/clazz/clazz.partydutymodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		/** 班委会 **/
		'clazz.classdutymodule':{
			js:'plugins/clazz/clazz.classdutymodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		/** 学生惩罚 **/
		'clazz.rewardpenaltymodule':{
			js:'plugins/clazz/clazz.rewardpenaltymodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		/** 学生评优 **/
		'clazz.appraisefinemodule':{
			js:'plugins/clazz/clazz.appraisefinemodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		/** 勤工助学 **/
		'clazz.studentjobmodule':{
			js:'plugins/clazz/clazz.studentjobmodule.js',
			dependencies:['puma.init','bootstrap.modal', 'bootstrap.bootbox','datagrid','slidecontent','searchinput','bootstrap.datepicker','tagselect']
		},
		/**班务管理-班级空间**/
		'clazz.clazzspacemodule':{
			js:'plugins/clazz/clazz.clazzspacemodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','slidecontent','searchinput','bootstrap.datepicker',
			              'bootstrap.editable']
		},
		/**班务管理-学生科资源审批**/
		'clazz.resourceapprmodule':{
			js:'plugins/clazz/clazz.resourceapprmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox',
			              'datagrid','searchinput',
			              'bootstrap.editable']
		},
		
		//班级公告
		'clazz.clazznoticemodule':{
			js:'plugins/clazz/clazz.clazznoticemodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
			             'slidecontent', 'searchinput', 'tagselect', 'ckup', 'bootstrap.datepicker']
		},
		
		/** 社团管理-社团 **/
		'group.clubmodule':{
			js:'plugins/group/group.clubmodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
				          'slidecontent', 'searchinput', 'tagselect', 'ckup', 'uploadifysimple', 'bootstrap.datepicker']
		},
		/** 社团管理-团委 **/
		'group.youthleaguemodule':{
			js:'plugins/group/group.youthleaguemodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
				          'slidecontent', 'searchinput', 'tagselect', 'ckup', 'uploadifysimple', 'bootstrap.datepicker']
		},
		/** 社团管理-学生会 **/
		'group.studentsunionmodule':{
			js:'plugins/group/group.studentsunionmodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
				          'slidecontent', 'searchinput', 'tagselect', 'ckup', 'uploadifysimple', 'bootstrap.datepicker']
		},
		/** 社团管理-第二课堂 **/
		'group.secondclazzmodule':{
			js:'plugins/group/group.secondclazzmodule.js',
			dependencies:['puma.init', 'bootstrap.modal', 'bootstrap.bootbox', 'datagrid',
				          'slidecontent', 'searchinput', 'tagselect', 'ckup', 'uploadifysimple', 'bootstrap.datepicker']
		},
		
		/**统计汇总 **/
		/* 基本信息统计 */
		'statistics.basicmodule':{
			js:'plugins/statistics/statistics.basicmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		},
		//统计汇总-奖惩信息统计
		'statistics.prisemodule':{
			js:'plugins/statistics/statistics.prisemodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		},
		//统计汇总-成绩信息统计
		'statistics.scoremodule':{
			js:'plugins/statistics/statistics.scoremodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		},
		//统计汇总-评优信息统计
		'statistics.goodmodule':{
			js:'plugins/statistics/statistics.goodmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		},
		
		//统计汇总-宿舍信息统计
		'statistics.dormmodule':{
			js:'plugins/statistics/statistics.dormmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		},
		
		//统计汇总-宿舍考勤统计
		'statistics.dormcheckmodule':{
			js:'plugins/statistics/statistics.dormcheckmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','jquery.icheck','bootstrap.select2','bootstrap.datepicker','jquery.jqplot','jquery.jqplot.barRenderer','jquery.jqplot.categoryAxisRenderer','jquery.jqplot.pointLabels','jquery.jqplot.highlighter']
		}
		
	};
	
	var locales = {
		'zh_CN':'lang-zh_CN.js'
	};
	
	var queues = {};
	
	function loadJs(url, callback){
		/*if($.loading){
			$.loading("系统模块加载中...");
		}*/
		var done = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')){
				done = true;
				script.onload = script.onreadystatechange = null;
				if (callback){
					callback.call(script);
					/*if($.unloading){
						$.unloading();
					}*/
				}
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	function runJs(url, callback){
		loadJs(url, function(){
			document.getElementsByTagName("head")[0].removeChild(this);
			if (callback){
				callback();
			}
		});
	}
	
	function loadCss(url, callback){
		/*if($.loading){
			$.loading("系统模块加载中...");
		}*/
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'screen';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if (callback){
			callback.call(link);
			/*if($.unloading){
				$.unloading();
			}*/
		}
	}
	
	function showLogo(){
		$("img.logo").show();
		$("img.module").hide();
	}
	
	function showLoading(){
		$("img.module").show();
		$("img.logo").hide();
	}
	
	function loadSingle(name, callback){
		showLoading();
		
		var csses = [];
		
		queues[name] = 'loading';
		
		var module = modules[name];
		var jsStatus = 'loading';
		var cssStatus = (pumaloader.css && module['css']) ? 'loading' : 'loaded';
		
		function addCss(uurl){
			if (/^http/i.test(module['css'])){
				var cssurl = uurl;
			} else {
				var cssurl = pumaloader.base + 'themes/' + pumaloader.theme + '/' + uurl;
			}
			csses.push(cssurl);
		}
		
		function loadAllCsses(){
			for(var i=0; i<csses.length; i++){
				loadCss(csses[i], function(){
					cssStatus = 'loaded';
					if (jsStatus == 'loaded' && cssStatus == 'loaded' && i == csses.length - 1){
						finish();
					}
				});
			}
		}
		
		if (pumaloader.css && module['css']){
			
			if (typeof module['css'] == 'string'){
				addCss(module['css']);
			} else {
				for(var i=0; i<module['css'].length; i++){
					addCss(module['css'][i]);
				}
			}
			
			loadAllCsses();
		}
		
		//maybe we just want load some css styles
		if(module['js']){
			if (/^http/i.test(module['js'])){
				var jsurl = module['js'];
			} else {
				var jsurl = pumaloader.base + 'plugins/' + module['js'];
			}
			loadJs(jsurl, function(){
				jsStatus = 'loaded';
				if (jsStatus == 'loaded' && cssStatus == 'loaded'){
					finish();
				}
			});
		}else{
			jsStatus = 'loaded';
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				finish();
			}
		}
		
		function finish(){
			showLogo();
			queues[name] = 'loaded';
			pumaloader.onProgress(name);
			if (callback){
				callback();
			}
		}
	}
	
	function loadModule(name, callback){
		var mm = [];
		var doLoad = false;
		
		if (typeof name == 'string'){
			add(name);
		} else {
			for(var i=0; i<name.length; i++){
				add(name[i]);
			}
		}
		
		function add(name){
			if (!modules[name]) return;
			var d = modules[name]['dependencies'];
			if (d){
				for(var i=0; i<d.length; i++){
					add(d[i]);
				}
			}
			mm.push(name);
		}
		
		function finish(){
			if (callback){
				callback();
			}
			pumaloader.onLoad(name);
		}
		
		var time = 0;
		function loadMm(){
			if (mm.length){
				var m = mm[0];	// the first module
				if (!queues[m]){
					doLoad = true;
					loadSingle(m, function(){
						mm.shift();
						loadMm();
					});
				} else if (queues[m] == 'loaded'){
					mm.shift();
					loadMm();
				} else {
					if (time < pumaloader.timeout){
						time += 10;
						setTimeout(arguments.callee, 10);
					}
				}
			} else {
				if (pumaloader.locale && doLoad == true && locales[pumaloader.locale]){
					var url = pumaloader.base + 'locale/' + locales[pumaloader.locale];
					runJs(url, function(){
						finish();
					});
				} else {
					finish();
				}
			}
		}
		
		loadMm();
	}
	
	pumaloader = {
		modules:modules,
		locales:locales,
		
		base:'.',
		theme:'default',
		css:true,
		locale:null,
		timeout:2000,
	
		load: function(name, callback){
			if (/\.css$/i.test(name)){
				if (/^http/i.test(name)){
					loadCss(name, callback);
				} else {
					loadCss(pumaloader.base + name, callback);
				}
			} else if (/\.js$/i.test(name)){
				if (/^http/i.test(name)){
					loadJs(name, callback);
				} else {
					loadJs(pumaloader.base + name, callback);
				}
			} else {
				loadModule(name, callback);
			}
		},
		
		onProgress: function(name){},
		onLoad: function(name){}
	};

	var scripts = document.getElementsByTagName('script');
	for(var i=0; i<scripts.length; i++){
		var src = scripts[i].src;
		if (!src) continue;
		var m = src.match(/puma.loader\.js(\W|$)/i);
		if (m){
			pumaloader.base = src.substring(0, m.index);
		}
	}

	window.using = pumaloader.load;
	
	if (window.jQuery){
		jQuery(function(){
			pumaloader.load(['parser','puma.init'], function(){
				//jQuery.parser.parse();
			});
		});
	}
	
})();
